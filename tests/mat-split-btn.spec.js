import { mount } from '@vue/test-utils';
import { h } from 'vue';
import {
  describe, expect, it, vi,
} from 'vitest';
import { MatBtn, MatSplitBtn } from '../src';

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
        trailing: () => h(MatBtn, {
          icon: 'arrow_drop_down',
          label: '展开操作菜单',
          variant: 'standard',
          size: 'extra-small',
          color: 'error',
        }),
      },
    });
    const buttons = wrapper.findAll('button');

    expect(buttons).toHaveLength(2);
    expect(buttons[1].attributes('aria-haspopup')).toBe('menu');
    expect(buttons[1].attributes('aria-expanded')).toBe('true');
    expect(buttons[1].attributes('aria-controls')).toBe('action-menu');
    expect(buttons[1].attributes('aria-pressed')).toBe('true');
    expect(wrapper.find('[role="menu"]').exists()).toBe(false);
  });

  it('trailing 接受 icon=true 默认 Slot 和 icon 字符串两种图标按钮写法', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const booleanIcon = mount(MatSplitBtn, {
      slots: {
        leading: () => h(MatBtn, null, () => '新建'),
        trailing: () => h(MatBtn, { icon: true, label: '更多' }, () => 'arrow_drop_down'),
      },
    });
    const stringIcon = mount(MatSplitBtn, {
      slots: {
        leading: () => h(MatBtn, null, () => '新建'),
        trailing: () => h(MatBtn, { icon: 'arrow_drop_down', label: '更多' }),
      },
    });

    expect(booleanIcon.findAll('button')).toHaveLength(2);
    expect(stringIcon.findAll('button')).toHaveLength(2);
    expect(warn).not.toHaveBeenCalledWith('MatSplitBtn: trailing slot 必须提供一个图标模式 MatBtn');
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
        trailing: () => h(MatBtn, {
          icon: 'arrow_drop_down',
          label: '更多',
          onClick: trailingClick,
        }),
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
        trailing: () => h(MatBtn, { icon: 'arrow_drop_down', label: '更多' }),
      },
    });

    wrapper.findAll('button').forEach((button) => {
      expect(button.attributes()).toHaveProperty('disabled');
    });
  });
});
