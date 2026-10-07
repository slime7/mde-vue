import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { MatDatePicker } from '../../src';

describe('MatDatePicker', () => {
  it('modelValue 默认 null 且只接受 Date 或 null', () => {
    expect(MatDatePicker.props.modelValue.default).toBeNull();

    const { validator } = MatDatePicker.props.modelValue;
    expect(validator(null)).toBe(true);
    expect(validator(new Date())).toBe(true);
    expect(validator('2026-10-15')).toBe(false);
  });

  it('渲染 6 行 7 列的日期网格，今天带 aria-current', () => {
    const wrapper = mount(MatDatePicker);
    const days = wrapper.findAll('[data-mat-date]');
    const grid = wrapper.find('[role="grid"]');

    expect(grid.exists()).toBe(true);
    expect(days).toHaveLength(42);

    const today = wrapper.find('[aria-current="date"]');
    expect(today.exists()).toBe(true);
    expect(today.attributes('data-mat-date')).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('点击日期发出本地零点 Date 的 update:modelValue', async () => {
    const wrapper = mount(MatDatePicker, {
      props: { modelValue: new Date(2026, 9, 15) },
    });

    const day = wrapper.find('[data-mat-date="2026-10-21"]');
    expect(day.exists()).toBe(true);
    await day.trigger('click');

    const emitted = wrapper.emitted('update:modelValue');
    expect(emitted).toHaveLength(1);
    const value = emitted[0][0];
    expect(value).toBeInstanceOf(Date);
    expect(value.getFullYear()).toBe(2026);
    expect(value.getMonth()).toBe(9);
    expect(value.getDate()).toBe(21);
    expect(value.getHours()).toBe(0);
    expect(value.getMinutes()).toBe(0);
    expect(value.getSeconds()).toBe(0);
  });

  it('modelValue 的日期在网格中呈现选中态', () => {
    const wrapper = mount(MatDatePicker, {
      props: { modelValue: new Date(2026, 9, 15) },
    });

    const selected = wrapper.find('[data-mat-date="2026-10-15"]');
    expect(selected.attributes('aria-pressed')).toBe('true');
    expect(wrapper.find('[data-mat-date="2026-10-16"]').attributes('aria-pressed')).toBe('false');
  });

  it('上一个与下一个月按钮切换显示月份且不发出选择', async () => {
    const wrapper = mount(MatDatePicker, {
      props: { modelValue: new Date(2026, 9, 15) },
    });

    const next = wrapper.find('[data-mat-calendar-action="next"]');
    const previous = wrapper.find('[data-mat-calendar-action="previous"]');

    await next.trigger('click');
    expect(wrapper.find('[data-mat-date="2026-11-01"]').exists()).toBe(true);
    expect(wrapper.find('[data-mat-date="2026-10-15"]').exists()).toBe(false);
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    await previous.trigger('click');
    await previous.trigger('click');
    expect(wrapper.find('[data-mat-date="2026-09-01"]').exists()).toBe(true);
  });

  it('头部按浏览器语言显示所选日期，未选择时显示今天', async () => {
    const wrapper = mount(MatDatePicker, {
      props: { modelValue: new Date(2026, 9, 15) },
    });

    const header = wrapper.find('.mat-date-picker__header');
    expect(header.exists()).toBe(true);
    expect(header.text()).toContain('15');

    await wrapper.find('[data-mat-date="2026-10-21"]').trigger('click');
    await wrapper.setProps({ modelValue: new Date(2026, 9, 21) });

    expect(wrapper.find('.mat-date-picker__header').text()).toContain('21');
  });

  it('标题按钮切换年份视图，选择年份后返回日视图', async () => {
    const wrapper = mount(MatDatePicker, {
      props: { modelValue: new Date(2026, 9, 15) },
    });

    expect(wrapper.find('[role="grid"]').exists()).toBe(true);

    await wrapper.find('[data-mat-calendar-action="toggle-year"]').trigger('click');
    expect(wrapper.find('[role="grid"]').exists()).toBe(false);

    const yearButton = wrapper.find('[data-mat-year="2027"]');
    expect(yearButton.exists()).toBe(true);
    await yearButton.trigger('click');

    expect(wrapper.find('[role="grid"]').exists()).toBe(true);
    expect(wrapper.find('[data-mat-date="2027-10-15"]').exists()).toBe(true);
  });

  it('点击月外日期选择该日期并切换到所在月份', async () => {
    const wrapper = mount(MatDatePicker, {
      props: { modelValue: new Date(2026, 9, 15) },
    });

    await wrapper.find('[data-mat-calendar-action="previous"]').trigger('click');
    const outside = wrapper.find('[data-mat-date="2026-10-01"]');
    expect(outside.exists()).toBe(true);
    await outside.trigger('click');

    const emitted = wrapper.emitted('update:modelValue');
    expect(emitted).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')[0][0].getDate()).toBe(1);
    expect(wrapper.find('[data-mat-date="2026-10-15"]').exists()).toBe(true);
  });
});
