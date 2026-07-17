import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { MatSwitch } from '../src';

describe('MatSwitch', () => {
  it('使用 switch 语义更新布尔模型', async () => {
    const wrapper = mount(MatSwitch, {
      props: {
        modelValue: false,
      },
      slots: {
        default: '同步通知',
      },
    });
    const input = wrapper.find('input');

    expect(input.attributes('role')).toBe('switch');
    expect(input.attributes('aria-checked')).toBe('false');
    expect(wrapper.text()).toContain('同步通知');

    input.element.checked = true;
    await input.trigger('change');

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
    expect(wrapper.emitted('change')?.[0][0]).toBeInstanceOf(Event);
  });

  it.each(['none', 'selected', 'both'])('icons=%s 保持固定图标结构并交给 CSS 控制状态', (icons) => {
    const wrapper = mount(MatSwitch, {
      props: {
        icons,
        modelValue: true,
      },
    });

    expect(wrapper.find('.mat-switch__handle-positioner').exists()).toBe(true);
    expect(wrapper.findAll('.mat-switch__icon')).toHaveLength(2);
    expect(wrapper.classes()).toContain(`mat-switch--icons-${icons}`);
  });

  it('支持禁用、选中状态和局部强调色', () => {
    const wrapper = mount(MatSwitch, {
      props: {
        color: '#6750a4',
        disabled: true,
        modelValue: true,
      },
    });

    expect(wrapper.classes()).toContain('mat-switch--checked');
    expect(wrapper.find('input').element.disabled).toBe(true);
    expect(wrapper.attributes('style')).toContain('--mat-accent-color');
  });
});
