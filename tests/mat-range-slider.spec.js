import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { MatRangeSlider } from '../src';

const componentSource = readFileSync(
  resolve('src/components/mat-range-slider/MatRangeSlider.vue'),
  'utf8',
);

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

    expect(wrapper.classes()).toEqual(expect.arrayContaining([
      'mat-range-slider',
      'mat-range-slider--horizontal',
      'mat-range-slider--size-extra-small',
    ]));
    expect(inputs).toHaveLength(2);
    expect(inputs.map((input) => input.attributes('aria-label'))).toEqual(['价格下限', '价格上限']);
    expect(inputs.map((input) => input.attributes('aria-valuenow'))).toEqual(['4', '10']);
    expect(inputs.map((input) => input.element.value)).toEqual(['4', '10']);
    expect(wrapper.attributes('style')).toContain('--mat-range-slider-start-position: 40%');
    expect(wrapper.attributes('style')).toContain('--mat-range-slider-end-position: 100%');
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

    expect(nextValue).toEqual([1, 8]);
    expect(nextValue).not.toBe(sourceValue);
    expect(wrapper.emitted('input')?.[0][0]).toBeInstanceOf(Event);
    expect(wrapper.emitted('change')?.[0][0]).toBeInstanceOf(Event);
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

  it('数值指示只显示当前活跃手柄，并支持方向、尺寸、停靠点、禁用和颜色', async () => {
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

    expect(wrapper.classes()).toEqual(expect.arrayContaining([
      'mat-range-slider--vertical',
      'mat-range-slider--size-large',
      'mat-range-slider--disabled',
    ]));
    expect(wrapper.findAll('.mat-range-slider__stop')).toHaveLength(5);
    expect(wrapper.attributes('style')).toContain('--mat-accent-color: var(--mat-sys-color-tertiary)');
    expect(inputs.every((input) => input.element.disabled)).toBe(true);

    await wrapper.setProps({ disabled: false });

    await inputs[1].trigger('focus');

    expect(wrapper.findAll('.mat-range-slider__value-indicator')).toHaveLength(1);
    expect(wrapper.find('.mat-range-slider__value-indicator').text()).toBe('3');
  });

  it('校验范围专有属性和共享的现代样式分支', () => {
    expect(MatRangeSlider.props.modelValue.validator([1, 2])).toBe(true);
    expect(MatRangeSlider.props.modelValue.validator([1])).toBe(false);
    expect(MatRangeSlider.props.ariaLabelStart.validator('起点')).toBe(true);
    expect(MatRangeSlider.props.ariaLabelStart.validator(1)).toBe(false);
    expect(MatRangeSlider.props.orientation.validator('vertical')).toBe(true);
    expect(MatRangeSlider.props.size.validator('medium')).toBe(true);
    expect(componentSource).toContain('clip-path: polygon(');
    expect(componentSource).toContain('@supports (border-shape:');
    expect(componentSource).toContain('@media (prefers-reduced-motion: reduce)');
    expect(componentSource).not.toContain('insetIcon');
    expect(componentSource).not.toContain('center:');
  });
});
