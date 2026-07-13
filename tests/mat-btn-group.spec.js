import { mount } from '@vue/test-utils';
import { h } from 'vue';
import {
  describe, expect, it, vi,
} from 'vitest';
import { MatBtn, MatBtnGroup, MatIconBtn } from '../src';

describe('MatBtnGroup', () => {
  it('级联尺寸、形状、颜色和禁用状态，子组件显式值优先', () => {
    const wrapper = mount(MatBtnGroup, {
      props: {
        size: 'large',
        shape: 'square',
        color: 'secondary',
        disabled: true,
      },
      slots: {
        default: () => [
          h(MatBtn, { value: 'one' }, () => '一'),
          h(MatBtn, {
            size: 'extra-small',
            shape: 'round',
            color: 'error',
            value: 'two',
          }, () => '二'),
        ],
      },
    });
    const buttons = wrapper.findAll('button');

    expect(buttons[0].classes()).toContain('mat-btn--size-large');
    expect(buttons[0].classes()).toContain('mat-btn--shape-square');
    expect(buttons[0].attributes('style')).toContain('--mat-sys-color-secondary');
    expect(buttons[0].attributes()).toHaveProperty('disabled');
    expect(buttons[1].classes()).toContain('mat-btn--size-extra-small');
    expect(buttons[1].classes()).toContain('mat-btn--shape-round');
    expect(buttons[1].attributes('style')).toContain('--mat-sys-color-error');
  });

  it('single 模式发出候选选择且不自行修改选中值', async () => {
    const wrapper = mount(MatBtnGroup, {
      props: {
        selection: 'single',
        selected: 'one',
      },
      slots: {
        default: () => [
          h(MatBtn, { value: 'one' }, () => '一'),
          h(MatBtn, { value: 'two' }, () => '二'),
        ],
      },
    });

    await wrapper.findAll('button')[1].trigger('click');

    expect(wrapper.emitted('select')).toHaveLength(1);
    expect(wrapper.emitted('select')[0][0]).toMatchObject({
      value: 'two',
      selected: true,
      nextSelected: 'two',
    });
    expect(wrapper.findAll('button')[0].attributes('aria-pressed')).toBe('true');
    expect(wrapper.findAll('button')[1].attributes('aria-pressed')).toBe('false');
  });

  it('required 阻止取消最后一项，multiple 返回新数组', async () => {
    const required = mount(MatBtnGroup, {
      props: {
        selection: 'multiple',
        selected: ['one'],
        required: true,
      },
      slots: {
        default: () => h(MatBtn, { value: 'one' }, () => '一'),
      },
    });

    await required.find('button').trigger('click');
    expect(required.emitted('select')).toBeUndefined();

    await required.setProps({ selected: ['one', 'two'] });
    await required.find('button').trigger('click');
    expect(required.emitted('select')[0][0].nextSelected).toEqual(['two']);
  });

  it('standard 按下项增宽 15%，释放后恢复且不修改邻项', async () => {
    const wrapper = mount(MatBtnGroup, {
      slots: {
        default: () => [
          h(MatBtn, null, () => '一'),
          h(MatBtn, null, () => '二'),
        ],
      },
    });
    const buttons = wrapper.findAll('button');
    vi.spyOn(buttons[0].element, 'getBoundingClientRect').mockReturnValue({ width: 100 });

    await buttons[0].trigger('pointerdown', { pointerId: 1 });
    expect(buttons[0].element.style.inlineSize).toBe('114.99999999999999px');
    expect(buttons[1].element.style.inlineSize).toBe('');

    await buttons[0].trigger('pointerup', { pointerId: 1 });
    expect(buttons[0].element.style.inlineSize).toBe('');
  });

  it('connected fullWidth 等分子按钮并保持独立 Tab 停靠点', () => {
    const wrapper = mount(MatBtnGroup, {
      props: {
        variant: 'connected',
        selection: 'multiple',
        selected: [],
        fullWidth: true,
      },
      slots: {
        default: () => [
          h(MatBtn, { value: 'one' }, () => '一'),
          h(MatIconBtn, { label: '二', value: 'two' }, () => '二'),
        ],
      },
    });

    expect(wrapper.classes()).toContain('mat-btn-group--full-width');
    wrapper.findAll('button').forEach((button) => {
      expect(button.attributes('tabindex')).toBeUndefined();
    });
  });
});
