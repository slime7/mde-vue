import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { MatSlider } from '../src';

const componentSource = readFileSync(
  resolve('src/components/mat-slider/MatSlider.vue'),
  'utf8',
);
const stylesSource = readFileSync(resolve('src/styles/index.css'), 'utf8');

/**
 * @param {import('@vue/test-utils').VueWrapper} wrapper
 */
function mockInteractionRect(wrapper) {
  Object.defineProperty(
    wrapper.find('.mat-slider__interaction').element,
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

describe('MatSlider', () => {
  it('使用隐藏原生 range 输入提供 slider 语义，并规范化初始数值', () => {
    const wrapper = mount(MatSlider, {
      attrs: {
        'aria-label': '音量',
        'data-test': 'volume-slider',
      },
      props: {
        max: 10,
        min: 0,
        modelValue: 5.3,
        step: 2,
      },
    });
    const input = wrapper.find('input');

    expect(wrapper.classes()).toEqual(expect.arrayContaining([
      'mat-slider',
      'mat-slider--horizontal',
      'mat-slider--size-extra-small',
      'mat-slider--standard',
    ]));
    expect(wrapper.attributes('data-test')).toBe('volume-slider');
    expect(input.attributes('type')).toBe('range');
    expect(input.attributes('aria-label')).toBe('音量');
    expect(input.attributes('aria-valuemin')).toBe('0');
    expect(input.attributes('aria-valuemax')).toBe('10');
    expect(input.attributes('aria-valuenow')).toBe('6');
    expect(input.element.value).toBe('6');
    expect(wrapper.attributes('style')).toContain('--mat-slider-position: 60%');
  });

  it('限制数值、按步长对齐，并为居中变体计算活动轨道基准', () => {
    const clamped = mount(MatSlider, {
      props: {
        max: 8,
        min: 0,
        modelValue: 99,
        step: 2,
      },
    });
    const centered = mount(MatSlider, {
      props: {
        center: 47,
        max: 100,
        min: 0,
        modelValue: 70,
        step: 10,
        variant: 'centered',
      },
    });

    expect(clamped.find('input').attributes('aria-valuenow')).toBe('8');
    expect(clamped.attributes('style')).toContain('--mat-slider-position: 100%');
    expect(centered.classes()).toContain('mat-slider--centered');
    expect(centered.attributes('style')).toContain('--mat-slider-center-position: 50%');
    expect(centered.attributes('style')).toContain('--mat-slider-position: 70%');
  });

  it('通过指针和键盘更新模型，并保留 input 与 change 事件语义', async () => {
    const wrapper = mount(MatSlider, {
      props: {
        max: 10,
        min: 0,
        modelValue: 5,
        step: 1,
      },
    });
    const interaction = wrapper.find('.mat-slider__interaction');
    const input = wrapper.find('input');

    mockInteractionRect(wrapper);
    await dispatchPointer(interaction, 'pointerdown', {
      clientX: 75,
      pointerId: 1,
    });
    await dispatchPointer(interaction, 'pointerup', {
      clientX: 75,
      pointerId: 1,
    });
    await input.trigger('keydown', { key: 'PageUp' });

    expect(wrapper.emitted('update:modelValue')?.map(([value]) => value)).toEqual([8, 10]);
    expect(wrapper.emitted('input')?.every(([event]) => event instanceof Event)).toBe(true);
    expect(wrapper.emitted('change')?.[0][0]).toBeInstanceOf(Event);
  });

  it('显示当前获得焦点或正在拖动的数值指示', async () => {
    const wrapper = mount(MatSlider, {
      props: {
        modelValue: 32,
        showValueIndicator: true,
      },
    });
    const input = wrapper.find('input');

    expect(wrapper.find('.mat-slider__value-indicator').exists()).toBe(false);

    await input.trigger('focus');

    expect(wrapper.find('.mat-slider__value-indicator').text()).toBe('32');

    await input.trigger('blur');

    expect(wrapper.find('.mat-slider__value-indicator').exists()).toBe(false);
  });

  it('纵向滑轨以底部为最小值、顶部为最大值', async () => {
    const wrapper = mount(MatSlider, {
      props: {
        max: 10,
        min: 0,
        modelValue: 5,
        orientation: 'vertical',
      },
    });
    const interaction = wrapper.find('.mat-slider__interaction');

    mockInteractionRect(wrapper);
    await dispatchPointer(interaction, 'pointerdown', {
      clientY: 0,
      pointerId: 1,
    });

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([10]);
  });

  it('支持方向、五档尺寸、内嵌图标、停靠点、禁用和局部强调色', async () => {
    const wrapper = mount(MatSlider, {
      props: {
        color: '#6750a4',
        disabled: true,
        insetIcon: 'volume_up',
        max: 4,
        min: 0,
        modelValue: 2,
        orientation: 'vertical',
        showStopIndicator: true,
        size: 'medium',
        step: 1,
      },
    });
    const interaction = wrapper.find('.mat-slider__interaction');

    expect(wrapper.classes()).toEqual(expect.arrayContaining([
      'mat-slider--vertical',
      'mat-slider--size-medium',
      'mat-slider--disabled',
    ]));
    expect(wrapper.find('input').element.disabled).toBe(true);
    expect(wrapper.find('.mat-slider__inset-icon').exists()).toBe(true);
    expect(wrapper.findAll('.mat-slider__stop')).toHaveLength(5);
    expect(wrapper.attributes('style')).toContain('--mat-accent-color: light-dark(');

    mockInteractionRect(wrapper);
    await dispatchPointer(interaction, 'pointerdown', {
      clientY: 0,
      pointerId: 1,
    });

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('校验公开属性，并在样式中保留官方尺寸、形态增强和减少动态效果分支', () => {
    expect(MatSlider.props.variant.validator('standard')).toBe(true);
    expect(MatSlider.props.variant.validator('centered')).toBe(true);
    expect(MatSlider.props.variant.validator('range')).toBe(false);
    expect(MatSlider.props.orientation.validator('horizontal')).toBe(true);
    expect(MatSlider.props.orientation.validator('diagonal')).toBe(false);
    expect(MatSlider.props.size.validator('extra-large')).toBe(true);
    expect(MatSlider.props.size.validator('compact')).toBe(false);
    expect(MatSlider.props.step.validator(1)).toBe(true);
    expect(MatSlider.props.step.validator(0)).toBe(false);
    expect(componentSource).toContain('clip-path: polygon(');
    expect(componentSource).toContain('@supports (border-shape:');
    expect(componentSource).toContain('@media (prefers-reduced-motion: reduce)');
    expect(stylesSource).toContain('--mat-slider-extra-small-track-height: 16px');
    expect(stylesSource).toContain('--mat-slider-small-track-height: 24px');
    expect(stylesSource).toContain('--mat-slider-medium-track-height: 40px');
    expect(stylesSource).toContain('--mat-slider-large-track-height: 56px');
    expect(stylesSource).toContain('--mat-slider-extra-large-track-height: 96px');
    expect(stylesSource).toContain('--mat-slider-extra-small-handle-height: 44px');
    expect(stylesSource).toContain('--mat-slider-small-handle-height: 44px');
    expect(stylesSource).toContain('--mat-slider-medium-handle-height: 52px');
    expect(stylesSource).toContain('--mat-slider-large-handle-height: 68px');
    expect(stylesSource).toContain('--mat-slider-extra-large-handle-height: 108px');
    expect(stylesSource).toContain('--mat-slider-extra-small-track-corner: 8px');
    expect(stylesSource).toContain('--mat-slider-medium-track-corner: 12px');
    expect(stylesSource).toContain('--mat-slider-large-track-corner: 16px');
    expect(stylesSource).toContain('--mat-slider-extra-large-track-corner: 28px');
    expect(stylesSource).toContain('--mat-slider-medium-inset-icon-size: 24px');
    expect(stylesSource).toContain('--mat-slider-extra-large-inset-icon-size: 32px');
  });
});
