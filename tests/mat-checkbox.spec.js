import { mount } from '@vue/test-utils';
import {
  describe, expect, it, vi,
} from 'vitest';
import { MatCheckbox } from '../src';

describe('MatCheckbox', () => {
  it('渲染标签、原生语义和受控布尔值', async () => {
    const wrapper = mount(MatCheckbox, {
      props: {
        modelValue: false,
      },
      slots: {
        default: '接收通知',
      },
    });
    const input = wrapper.find('input');

    expect(wrapper.element.tagName).toBe('LABEL');
    expect(wrapper.text()).toContain('接收通知');
    expect(input.attributes('type')).toBe('checkbox');
    expect(input.element.checked).toBe(false);

    input.element.checked = true;
    await input.trigger('change');

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
    expect(wrapper.emitted('update:indeterminate')?.[0]).toEqual([false]);
    expect(wrapper.emitted('change')?.[0][0]).toBeInstanceOf(Event);
  });

  it('使用同一数组绑定多个值且不修改原数组', async () => {
    const selected = ['offline'];
    const wrapper = mount(MatCheckbox, {
      props: {
        modelValue: selected,
        value: 'shared',
      },
    });
    const input = wrapper.find('input');

    input.element.checked = true;
    await input.trigger('change');

    const nextSelected = wrapper.emitted('update:modelValue')?.[0][0];

    expect(nextSelected).toEqual(['offline', 'shared']);
    expect(nextSelected).not.toBe(selected);
    expect(selected).toEqual(['offline']);

    await wrapper.setProps({
      modelValue: nextSelected,
      value: 'offline',
    });
    input.element.checked = false;
    await input.trigger('change');

    expect(wrapper.emitted('update:modelValue')?.[1][0]).toEqual(['shared']);
  });

  it('同步不确定态并在交互时请求清除', async () => {
    const wrapper = mount(MatCheckbox, {
      props: {
        indeterminate: true,
        modelValue: false,
      },
    });
    const input = wrapper.find('input');

    expect(input.element.indeterminate).toBe(true);
    expect(input.attributes('aria-checked')).toBe('mixed');

    input.element.checked = true;
    await input.trigger('change');

    expect(wrapper.emitted('update:indeterminate')?.[0]).toEqual([false]);
  });

  it('把展示属性放在外层，把控件属性放在 input', () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mount(MatCheckbox, {
      attrs: {
        'aria-hidden': 'true',
        'aria-label': '展示选择状态',
        class: 'selection-marker',
        inert: '',
        name: 'ignored-form-contract',
      },
      props: {
        modelValue: true,
      },
    });

    expect(wrapper.classes()).toContain('selection-marker');
    expect(wrapper.attributes('aria-hidden')).toBe('true');
    expect(wrapper.attributes()).toHaveProperty('inert');
    expect(wrapper.find('input').attributes('aria-label')).toBe('展示选择状态');
    expect(wrapper.find('input').attributes('name')).toBe('ignored-form-contract');
    expect(warning).not.toHaveBeenCalled();
  });

  it('支持禁用和局部强调色', () => {
    const wrapper = mount(MatCheckbox, {
      props: {
        color: 'secondary',
        disabled: true,
      },
    });

    expect(wrapper.find('input').element.disabled).toBe(true);
    expect(wrapper.attributes('style')).toContain('--mat-accent-color: var(--mat-sys-color-secondary)');
  });
});
