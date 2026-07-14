import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { mount } from '@vue/test-utils';
import { h } from 'vue';
import {
  describe, expect, it, vi,
} from 'vitest';
import { MatBtn, MatIconBtn, MatSplitBtn } from '../src';

const splitButtonSource = readFileSync(
  resolve('src/components/mat-split-btn/MatSplitBtn.vue'),
  'utf8',
);

describe('MatSplitBtn', () => {
  it('将父组件外观传给两个按钮并建立菜单 ARIA', () => {
    const wrapper = mount(MatSplitBtn, {
      props: {
        variant: 'filled-tonal',
        size: 'large',
        color: '#6750a4',
        expanded: true,
        controls: 'action-menu',
      },
      slots: {
        leading: () => h(MatBtn, {
          variant: 'outlined',
          size: 'extra-small',
          shape: 'square',
          color: 'error',
        }, () => '新建'),
        trailing: () => h(MatIconBtn, {
          label: '展开操作菜单',
          variant: 'standard',
          size: 'extra-small',
          color: 'error',
        }, () => '⌄'),
      },
    });
    const buttons = wrapper.findAll('button');

    expect(buttons).toHaveLength(2);
    expect(buttons[0].classes()).toContain('mat-btn--filled-tonal');
    expect(buttons[0].classes()).toContain('mat-btn--size-large');
    expect(buttons[0].classes()).toContain('mat-btn--shape-round');
    expect(buttons[0].attributes('style')).toMatch(/--mat-accent-color: light-dark\(/);
    expect(buttons[1].classes()).toContain('mat-icon-btn--filled-tonal');
    expect(buttons[1].attributes('aria-haspopup')).toBe('menu');
    expect(buttons[1].attributes('aria-expanded')).toBe('true');
    expect(buttons[1].attributes('aria-controls')).toBe('action-menu');
    expect(buttons[1].attributes('aria-pressed')).toBe('true');
    expect(wrapper.find('[role="menu"]').exists()).toBe(false);
  });

  it('拒绝旧尺寸缩写和 tonal 变体', () => {
    expect(MatSplitBtn.props.size.validator('s')).toBe(false);
    expect(MatSplitBtn.props.variant.validator('tonal')).toBe(false);
  });

  it('保留子按钮 click 并发出分段事件和受控展开候选值', async () => {
    const leadingClick = vi.fn();
    const trailingClick = vi.fn();
    const wrapper = mount(MatSplitBtn, {
      slots: {
        leading: () => h(MatBtn, { onClick: leadingClick }, () => '执行'),
        trailing: () => h(MatIconBtn, { label: '更多', onClick: trailingClick }, () => '⌄'),
      },
    });
    const buttons = wrapper.findAll('button');

    await buttons[0].trigger('click');
    await buttons[1].trigger('click');

    expect(leadingClick).toHaveBeenCalledOnce();
    expect(trailingClick).toHaveBeenCalledOnce();
    expect(wrapper.emitted('leading-click')).toHaveLength(1);
    expect(wrapper.emitted('trailing-click')).toHaveLength(1);
    expect(wrapper.emitted('update:expanded')[0]).toEqual([true]);
    expect(wrapper.props('expanded')).toBe(false);
  });

  it('父级 disabled 禁用两个原生按钮', () => {
    const wrapper = mount(MatSplitBtn, {
      props: {
        disabled: true,
      },
      slots: {
        leading: () => h(MatBtn, null, () => '执行'),
        trailing: () => h(MatIconBtn, { label: '更多' }, () => '⌄'),
      },
    });

    wrapper.findAll('button').forEach((button) => {
      expect(button.attributes()).toHaveProperty('disabled');
    });
  });

  it('expanded trailing 的普通和按下状态四角均为 full', () => {
    const expandedRule = splitButtonSource.match(
      /\.mat-split-btn--expanded \.mat-split-btn__trailing :deep\(\.mat-button-base\) \{([\s\S]*?)\n\}/,
    )?.[1];
    const radiusProperties = [
      '--mat-button-start-start-radius',
      '--mat-button-start-end-radius',
      '--mat-button-end-start-radius',
      '--mat-button-end-end-radius',
      '--mat-button-pressed-start-start-radius',
      '--mat-button-pressed-start-end-radius',
      '--mat-button-pressed-end-start-radius',
      '--mat-button-pressed-end-end-radius',
    ];

    expect(expandedRule).toBeDefined();
    radiusProperties.forEach((property) => {
      expect(expandedRule).toContain(`${property}: var(--mat-button-full-radius);`);
    });
  });
});
