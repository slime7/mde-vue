import { mount } from '@vue/test-utils';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import { nextTick } from 'vue';
import { MatRangeSlider, MatTooltip } from '../src';

/**
 * @param {import('@vue/test-utils').VueWrapper} wrapper
 */
function mockInteractionRect(wrapper) {
  Object.defineProperty(
    wrapper.find('.mat-range-slider__interaction').element,
    'getBoundingClientRect',
    {
      value() {
        return {
          bottom: 20,
          height: 20,
          left: 0,
          right: 100,
          top: 0,
          width: 100,
          x: 0,
          y: 0,
        };
      },
    },
  );
}

/**
 * @param {import('@vue/test-utils').DOMWrapper} target
 * @param {string} type
 * @param {{clientX?: number, clientY?: number, pointerId: number}} options
 * @returns {Promise<void>}
 */
async function dispatchPointer(target, type, options) {
  const event = new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    clientX: options.clientX ?? 0,
    clientY: options.clientY ?? 0,
  });

  Object.defineProperty(event, 'pointerId', { value: options.pointerId });
  target.element.dispatchEvent(event);
  await nextTick();
}

describe('MatRangeSlider', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('使用两个原生 range 输入承载端点 slider 语义，并规范化顺序', () => {
    const wrapper = mount(MatRangeSlider, {
      props: {
        ariaLabelEnd: '价格上限',
        ariaLabelStart: '价格下限',
        max: 10,
        min: 0,
        modelValue: [9, 3],
        step: 2,
      },
    });
    const inputs = wrapper.findAll('input');

    expect(inputs).toHaveLength(2);
    expect(inputs.map((input) => input.attributes('aria-label'))).toEqual(['价格下限', '价格上限']);
    expect(inputs.map((input) => input.attributes('aria-valuenow'))).toEqual(['4', '10']);
    expect(inputs.map((input) => input.element.value)).toEqual(['4', '10']);
  });

  it('指针操作选择最近端点，发出新的不可变元组并在释放时发出 change', async () => {
    const sourceValue = [2, 8];
    const wrapper = mount(MatRangeSlider, {
      props: {
        max: 10,
        min: 0,
        modelValue: sourceValue,
        step: 1,
      },
    });
    const interaction = wrapper.find('.mat-range-slider__interaction');

    mockInteractionRect(wrapper);
    await dispatchPointer(interaction, 'pointerdown', {
      clientX: 10,
      pointerId: 1,
    });
    await dispatchPointer(interaction, 'pointerup', {
      clientX: 10,
      pointerId: 1,
    });

    const nextValue = wrapper.emitted('update:modelValue')?.[0][0];

    expect(nextValue).toEqual([0, 8]);
    expect(nextValue).not.toBe(sourceValue);
    expect(wrapper.emitted('input')?.[0][0]).toBeInstanceOf(Event);
    expect(wrapper.emitted('change')?.[0][0]).toBeInstanceOf(Event);
  });

  it('合并同帧端点拖动，并在释放前提交最新范围', async () => {
    const frames = new Map();
    let nextFrameId = 1;

    vi.stubGlobal('requestAnimationFrame', (callback) => {
      const frameId = nextFrameId;

      nextFrameId += 1;
      frames.set(frameId, callback);

      return frameId;
    });
    vi.stubGlobal('cancelAnimationFrame', (frameId) => {
      frames.delete(frameId);
    });

    const wrapper = mount(MatRangeSlider, {
      props: {
        max: 100,
        min: 0,
        modelValue: [0, 100],
        step: 1,
      },
    });
    const interaction = wrapper.find('.mat-range-slider__interaction');

    mockInteractionRect(wrapper);
    await dispatchPointer(interaction, 'pointerdown', { clientX: 0, pointerId: 8 });
    await dispatchPointer(interaction, 'pointermove', { clientX: 15, pointerId: 8 });
    await dispatchPointer(interaction, 'pointermove', { clientX: 35, pointerId: 8 });

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    expect(frames).toHaveLength(1);

    await dispatchPointer(interaction, 'pointerup', { clientX: 40, pointerId: 8 });

    expect(wrapper.emitted('update:modelValue')?.map(([value]) => value)).toEqual([
      [33, 100],
      [39, 100],
    ]);
    expect(wrapper.emitted('change')).toHaveLength(1);
    expect(frames).toHaveLength(0);
    wrapper.unmount();
  });

  it('键盘操作不能让两个端点越过彼此', async () => {
    const wrapper = mount(MatRangeSlider, {
      props: {
        max: 10,
        min: 0,
        modelValue: [4, 6],
        step: 1,
      },
    });
    const inputs = wrapper.findAll('input');

    await inputs[0].trigger('keydown', { key: 'End' });
    await inputs[1].trigger('keydown', { key: 'Home' });

    expect(wrapper.emitted('update:modelValue')?.map(([value]) => value)).toEqual([
      [6, 6],
      [4, 4],
    ]);
    expect(wrapper.emitted('input')?.every(([event]) => event instanceof Event)).toBe(true);
  });

  it('支持禁用状态和当前活跃手柄的数值提示', async () => {
    const wrapper = mount(MatRangeSlider, {
      props: {
        color: 'tertiary',
        disabled: true,
        max: 4,
        min: 0,
        modelValue: [1, 3],
        orientation: 'vertical',
        showStopIndicator: true,
        showValueIndicator: true,
        size: 'large',
        step: 1,
      },
    });
    const inputs = wrapper.findAll('input');

    expect(inputs.every((input) => input.element.disabled)).toBe(true);

    await wrapper.setProps({ disabled: false });

    await inputs[1].trigger('focus');
    await nextTick();

    const tooltip = wrapper.findComponent(MatTooltip);

    expect(tooltip.exists()).toBe(true);
    expect(tooltip.props('location')).toBe('right');
    expect(tooltip.props('modelValue')).toBe(true);
    expect(document.body.querySelector('[role="tooltip"]')?.textContent).toContain('3');
  });

  it('通过 indicator-label Slot 自定义当前端点的数值指示内容', async () => {
    const indicatorLabel = vi.fn(({ index, modelValue }) => `${index}:${modelValue}%`);
    const wrapper = mount(MatRangeSlider, {
      attachTo: document.body,
      props: {
        max: 10,
        min: 0,
        modelValue: [1.2, 8.7],
        showValueIndicator: true,
        step: 2,
      },
      slots: {
        'indicator-label': indicatorLabel,
      },
    });
    const inputs = wrapper.findAll('input');

    await inputs[1].trigger('focus');
    await nextTick();

    expect(indicatorLabel).toHaveBeenLastCalledWith(expect.objectContaining({
      index: 1,
      modelValue: 8,
    }));
    expect(document.body.querySelector('[role="tooltip"]')?.textContent).toContain('1:8%');

    await inputs[1].trigger('blur');
    await inputs[0].trigger('focus');
    await nextTick();

    expect(indicatorLabel).toHaveBeenLastCalledWith(expect.objectContaining({
      index: 0,
      modelValue: 2,
    }));
    expect(document.body.querySelector('[role="tooltip"]')?.textContent).toContain('0:2%');
    wrapper.unmount();
  });

  it('校验范围专有属性', () => {
    expect(MatRangeSlider.props.modelValue.validator([1, 2])).toBe(true);
    expect(MatRangeSlider.props.modelValue.validator([1])).toBe(false);
    expect(MatRangeSlider.props.ariaLabelStart.validator('起点')).toBe(true);
    expect(MatRangeSlider.props.ariaLabelStart.validator(1)).toBe(false);
    expect(MatRangeSlider.props.orientation.validator('vertical')).toBe(true);
    expect(MatRangeSlider.props.size.validator('medium')).toBe(true);
  });
});
