import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { MatTimePicker } from '../../src';

function findDial(wrapper) {
  return wrapper.find('[role="slider"]');
}

describe('MatTimePicker', () => {
  it('modelValue 默认 null 且只接受 null 或 HH:mm 字符串', () => {
    expect(MatTimePicker.props.modelValue.default).toBeNull();

    const { validator } = MatTimePicker.props.modelValue;
    expect(validator(null)).toBe(true);
    expect(validator('00:00')).toBe(true);
    expect(validator('23:59')).toBe(true);
    expect(validator('24:00')).toBe(false);
    expect(validator('12:60')).toBe(false);
    expect(validator('9:41')).toBe(false);
    expect(validator('12:30pm')).toBe(false);
  });

  it('数字读出展示时与分，默认小时视图且表盘提供 slider 语义', () => {
    const wrapper = mount(MatTimePicker, {
      props: { modelValue: '13:45' },
    });

    const hourButton = wrapper.find('[data-mat-time-part="hour"]');
    const minuteButton = wrapper.find('[data-mat-time-part="minute"]');
    const dial = findDial(wrapper);

    expect(hourButton.text()).toBe('13');
    expect(minuteButton.text()).toBe('45');
    expect(hourButton.attributes('aria-pressed')).toBe('true');
    expect(minuteButton.attributes('aria-pressed')).toBe('false');
    expect(dial.attributes('aria-valuenow')).toBe('13');
    expect(dial.attributes('aria-valuemin')).toBe('0');
    expect(dial.attributes('aria-valuemax')).toBe('23');
    expect(dial.attributes('aria-label')).toBe('小时');
  });

  it('表盘方向键按 1 调整小时并发出零填充 HH:mm', async () => {
    const wrapper = mount(MatTimePicker, {
      props: { modelValue: '23:05' },
    });
    const dial = findDial(wrapper);

    await dial.trigger('keydown', { key: 'ArrowUp' });
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe('00:05');

    await wrapper.setProps({ modelValue: '08:05' });
    await dial.trigger('keydown', { key: 'ArrowDown' });
    expect(wrapper.emitted('update:modelValue')[1][0]).toBe('07:05');
  });

  it('点击分钟读出切换到分钟视图，方向键调整分钟', async () => {
    const wrapper = mount(MatTimePicker, {
      props: { modelValue: '13:45' },
    });

    await wrapper.find('[data-mat-time-part="minute"]').trigger('click');

    const dial = findDial(wrapper);
    expect(dial.attributes('aria-valuenow')).toBe('45');
    expect(dial.attributes('aria-valuemax')).toBe('59');
    expect(dial.attributes('aria-label')).toBe('分钟');
    expect(wrapper.find('[data-mat-time-part="minute"]').attributes('aria-pressed')).toBe('true');

    await dial.trigger('keydown', { key: 'ArrowUp' });
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe('13:46');
  });

  it('小时视图按 Enter 确认后进入分钟视图', async () => {
    const wrapper = mount(MatTimePicker, {
      props: { modelValue: null },
    });
    const dial = findDial(wrapper);

    expect(dial.attributes('aria-valuenow')).toBe('0');

    await dial.trigger('keydown', { key: 'Enter' });

    expect(findDial(wrapper).attributes('aria-label')).toBe('分钟');
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('modelValue 更新时读出与表盘同步', async () => {
    const wrapper = mount(MatTimePicker, {
      props: { modelValue: '09:30' },
    });

    await wrapper.setProps({ modelValue: '21:05' });

    expect(wrapper.find('[data-mat-time-part="hour"]').text()).toBe('21');
    expect(wrapper.find('[data-mat-time-part="minute"]').text()).toBe('05');
    expect(findDial(wrapper).attributes('aria-valuenow')).toBe('21');
  });

  it('支持 format="12h" 初始化，展示 12 小时制读数与 AM/PM 选择器', async () => {
    const wrapper = mount(MatTimePicker, {
      props: { modelValue: '14:20', format: '12h' },
    });

    expect(wrapper.find('[data-mat-time-part="hour"]').text()).toBe('02');
    expect(wrapper.find('[data-mat-time-part="minute"]').text()).toBe('20');

    const amBtn = wrapper.find('[data-mat-time-period="AM"]');
    const pmBtn = wrapper.find('[data-mat-time-period="PM"]');
    expect(amBtn.exists()).toBe(true);
    expect(pmBtn.exists()).toBe(true);
    expect(pmBtn.attributes('aria-checked')).toBe('true');
    expect(amBtn.attributes('aria-checked')).toBe('false');

    await amBtn.trigger('click');
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe('02:20');
  });

  it('支持 is24Hour=false 属性便捷初始化为 12 小时制', () => {
    const wrapper = mount(MatTimePicker, {
      props: { modelValue: '00:15', is24Hour: false },
    });

    expect(wrapper.find('[data-mat-time-part="hour"]').text()).toBe('12');
    expect(wrapper.find('[data-mat-time-period="AM"]').attributes('aria-checked')).toBe('true');
  });

  it('12 小时制下表盘为单环 12 个刻度，且点击刻度依据当前 AM/PM 转换为 24 小时制', async () => {
    const wrapper = mount(MatTimePicker, {
      props: { modelValue: '16:00', format: '12h' },
    });

    const dial = findDial(wrapper);
    expect(dial.attributes('aria-valuemin')).toBe('1');
    expect(dial.attributes('aria-valuemax')).toBe('12');
    expect(dial.attributes('aria-valuenow')).toBe('4');

    const tick8 = wrapper.findAll('.mat-time-picker__tick').find((t) => t.text() === '8');
    expect(tick8).toBeDefined();
    await tick8.trigger('click');
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe('20:00');
  });

  it('支持 mode="input" 初始化为输入模式，隐藏表盘并渲染 input 插槽', () => {
    const wrapper = mount(MatTimePicker, {
      props: { mode: 'input' },
      slots: {
        input: '<input class="custom-time-input" />',
      },
    });

    expect(findDial(wrapper).exists()).toBe(false);
    expect(wrapper.find('.custom-time-input').exists()).toBe(true);
  });

  it('开启 showModeToggle 后可点击模式按钮切换 mode 并发出 update:mode', async () => {
    const wrapper = mount(MatTimePicker, {
      props: { showModeToggle: true },
    });

    const toggleBtn = wrapper.find('[data-mat-time-action="toggle-mode"]');
    expect(toggleBtn.exists()).toBe(true);
    await toggleBtn.trigger('click');
    expect(wrapper.emitted('update:mode')[0][0]).toBe('input');
    expect(findDial(wrapper).exists()).toBe(false);
  });

  it('12 小时制下表盘方向键调整小时保持当前时段', async () => {
    const wrapper = mount(MatTimePicker, {
      props: { modelValue: '14:30', format: '12h' },
    });
    const dial = findDial(wrapper);

    await dial.trigger('keydown', { key: 'ArrowUp' });
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe('15:30');
  });
});
