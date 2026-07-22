import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { MatSlider, MatTooltip } from '../src';
import {
  getSliderValueFromPointer,
  getSliderVisualPosition,
  SLIDER_TRACK_END_INSET,
} from '../src/components/slider-utils';

const componentSource = readFileSync(
  resolve('src/components/mat-slider/MatSlider.vue'),
  'utf8',
);
const tooltipComponentSource = readFileSync(
  resolve('src/components/mat-tooltip/MatTooltip.vue'),
  'utf8',
);
const stylesSource = readFileSync(resolve('src/styles/index.css'), 'utf8');
const sliderInsetIconExampleSource = readFileSync(
  resolve('docs/site/examples/slider/SliderInsetIconExample.vue'),
  'utf8',
);
const sliderSizeExampleSource = readFileSync(
  resolve('docs/site/examples/slider/SliderSizeExample.vue'),
  'utf8',
);

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
    expect(wrapper.attributes('style')).toContain('--mat-slider-position: calc(60% - 1.2px)');
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
    expect(clamped.attributes('style')).toContain('--mat-slider-position: calc(100% - 6px)');
    expect(centered.classes()).toContain('mat-slider--centered');
    expect(centered.attributes('style')).toContain('--mat-slider-center-position: 50%');
    expect(centered.attributes('style')).toContain('--mat-slider-position: calc(70% - 2.4px)');
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
    const tooltip = wrapper.findComponent(MatTooltip);

    expect(tooltip.exists()).toBe(true);
    expect(tooltip.props('content')).toBe('32');
    expect(tooltip.props('location')).toBe('top');
    expect(tooltip.props('modelValue')).toBe(false);

    await input.trigger('focus');
    await nextTick();

    expect(tooltip.props('modelValue')).toBe(true);
    expect(wrapper.find('.mat-slider__handle-shape').exists()).toBe(true);
    expect(componentSource).toContain('<MatTooltip');
    expect(componentSource).toContain('class="mat-slider__value-indicator"');
    expect(componentSource).toContain('data-slider-value-indicator');
    expect(componentSource).not.toContain('mat-slider--with-value-indicator');
    expect(tooltipComponentSource).toContain('.mat-tooltip[data-slider-value-indicator]');
    expect(tooltipComponentSource).not.toContain(
      '.mat-tooltip[data-slider-value-indicator]::after',
    );
    expect(stylesSource).not.toContain('--mat-slider-value-indicator-stem-');

    await input.trigger('blur');

    expect(tooltip.props('modelValue')).toBe(false);
    wrapper.unmount();
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
    expect(componentSource).toMatch(
      /\.mat-slider--vertical \.mat-slider__stop \{[\s\S]*?inset-block: auto var\(--mat-slider-stop-position\);/,
    );
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
    expect(wrapper.findAll('.mat-slider__inset-icon')).toHaveLength(2);
    expect(wrapper.findAll('.mat-slider__stop')).toHaveLength(5);
    expect(wrapper.attributes('style')).toContain('--mat-accent-color: light-dark(');

    mockInteractionRect(wrapper);
    await dispatchPointer(interaction, 'pointerdown', {
      clientY: 0,
      pointerId: 1,
    });

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('标准变体从最小值识别活动刻度，并按活动轨道覆盖范围切换图标颜色', () => {
    const stops = mount(MatSlider, {
      props: {
        max: 5,
        min: 1,
        modelValue: 2,
        showStopIndicator: true,
      },
    }).findAll('.mat-slider__stop');
    const icons = mount(MatSlider, {
      props: {
        color: 'tertiary',
        insetIcon: 'volume_up',
        modelValue: 70,
        size: 'medium',
      },
    }).findAll('.mat-slider__inset-icon');

    expect(stops.map((stop) => stop.classes('mat-slider__stop--active'))).toEqual([
      true,
      true,
      false,
      false,
      false,
    ]);
    expect(icons).toHaveLength(2);
    expect(icons[0].attributes('style')).toContain(
      'color: var(--mat-slider-inset-icon-inactive-color)',
    );
    expect(icons[1].attributes('style')).toContain(
      'color: var(--mat-on-accent-color, var(--mat-slider-inset-icon-color))',
    );
    expect(componentSource).toMatch(/\.mat-slider__inset-icon-layer--active \{[\s\S]*?clip-path: inset\(/);
  });

  it('使用三段轨道在手柄两侧保留断口，并完全重置纵向定位', () => {
    const wrapper = mount(MatSlider, {
      props: {
        modelValue: 50,
      },
    });

    expect(wrapper.findAll('.mat-slider__inactive-track')).toHaveLength(2);
    expect(wrapper.find('.mat-slider__active-track').exists()).toBe(true);
    expect(wrapper.attributes('style')).toContain('--mat-slider-active-visible-start:');
    expect(wrapper.attributes('style')).toContain('--mat-slider-inactive-after-start:');
    expect(componentSource).toMatch(/\.mat-slider--vertical \.mat-slider__track \{[\s\S]*?inset-inline: 50% auto;/);
    expect(componentSource).toMatch(/\.mat-slider--vertical \.mat-slider__active-track \{[\s\S]*?inset-block: auto var\(--mat-slider-active-visible-start\);/);
  });

  it('按住时将手柄收窄，并把裁剪形态限制在手柄形状层', () => {
    const handleStyles = componentSource.match(
      /\.mat-slider__handle \{(?<body>[\s\S]*?)\n\}/,
    )?.groups?.body;
    const shapeStyles = componentSource.match(
      /\.mat-slider__handle-shape \{(?<body>[\s\S]*?)\n\}/,
    )?.groups?.body;

    expect(stylesSource).toContain('--mat-slider-pressed-handle-width: 2px');
    expect(stylesSource).toContain('--mat-slider-handle-track-gap: 6px');
    expect(handleStyles).not.toContain('clip-path');
    expect(shapeStyles).toContain('clip-path');
    expect(componentSource).toContain('.mat-slider--dragging .mat-slider__handle {');
    expect(componentSource).toContain('.mat-slider--vertical.mat-slider--dragging .mat-slider__handle {');
  });

  it('拖动期间让轨道和手柄的位置立即跟随数值，同时保留状态尺寸过渡', () => {
    expect(componentSource).toMatch(
      /\.mat-slider--dragging \.mat-slider__active-track,[\s\S]*?\.mat-slider--dragging \.mat-slider__inactive-track \{[\s\S]*?transition-property: background-color;/,
    );
    expect(componentSource).toMatch(
      /\.mat-slider--dragging \.mat-slider__handle \{[\s\S]*?transition-property: inline-size, block-size;/,
    );
  });

  it('使用独立的次要色胶囊轮廓显示键盘焦点', () => {
    const handleStyles = componentSource.match(
      /\.mat-slider__handle \{(?<body>[\s\S]*?)\n\}/,
    )?.groups?.body;
    const focusStyles = componentSource.match(
      /\.mat-slider:has\(\.mat-slider__native-input:focus-visible\) \.mat-slider__handle \{(?<body>[\s\S]*?)\n\}/,
    )?.groups?.body;

    expect(stylesSource).toContain(
      '--mat-slider-focus-indicator-width: var(--mat-sys-interaction-focus-ring-width)',
    );
    expect(stylesSource).toContain(
      '--mat-slider-focus-indicator-offset: var(--mat-sys-interaction-focus-ring-offset)',
    );
    expect(stylesSource).toContain(
      '--mat-slider-focus-indicator-color: var(--mat-sys-color-secondary)',
    );
    expect(handleStyles).toContain(
      'border-radius: var(--mat-slider-current-track-corner)',
    );
    expect(focusStyles).toContain(
      'outline: var(--mat-slider-focus-indicator-width) solid var(--mat-slider-focus-indicator-color)',
    );
    expect(focusStyles).toContain(
      'outline-offset: var(--mat-slider-focus-indicator-offset)',
    );
    expect(componentSource).not.toContain(
      ':focus-visible) .mat-slider__handle-shape',
    );
  });

  it('始终在固定端部保护区域内显示终点，断口使用 2px 圆角且不绘制手柄背景层', () => {
    const continuous = mount(MatSlider, {
      props: {
        modelValue: 2,
      },
    });
    const wrapper = mount(MatSlider, {
      props: {
        max: 4,
        modelValue: 2,
        showStopIndicator: true,
      },
    });
    const atMaximum = mount(MatSlider, {
      props: {
        modelValue: 100,
      },
    });
    const unevenSteps = mount(MatSlider, {
      props: {
        max: 5,
        modelValue: 2,
        showStopIndicator: true,
        step: 2,
      },
    });
    const centered = mount(MatSlider, {
      props: {
        modelValue: 40,
        variant: 'centered',
      },
    });
    const pointerTarget = {
      getBoundingClientRect() {
        return {
          height: 16,
          left: 0,
          width: 100,
        };
      },
    };

    expect(continuous.findAll('.mat-slider__stop')).toHaveLength(1);
    expect(continuous.find('.mat-slider__stop').attributes('style')).toContain(
      '--mat-slider-stop-position: calc(100% - 6px)',
    );
    expect(atMaximum.attributes('style')).toContain(
      '--mat-slider-position: calc(100% - 6px)',
    );
    expect(
      centered.findAll('.mat-slider__stop').map((stop) => stop.attributes('style')),
    ).toEqual(expect.arrayContaining([
      expect.stringContaining('--mat-slider-stop-position: 6px'),
      expect.stringContaining('--mat-slider-stop-position: calc(100% - 6px)'),
    ]));
    expect(unevenSteps.findAll('.mat-slider__stop')).toHaveLength(4);
    expect(
      unevenSteps.findAll('.mat-slider__stop')
        .some((stop) => stop.attributes('style').includes(
          '--mat-slider-stop-position: calc(100% - 6px)',
        )),
    ).toBe(true);
    expect(
      getSliderValueFromPointer(
        { clientX: 6 },
        pointerTarget,
        { min: 0, max: 100 },
        1,
        'horizontal',
      ),
    ).toBe(0);
    expect(
      getSliderValueFromPointer(
        { clientX: 94 },
        pointerTarget,
        { min: 0, max: 100 },
        1,
        'horizontal',
      ),
    ).toBe(100);
    expect(wrapper.findAll('.mat-slider__stop')).toHaveLength(5);
    expect(wrapper.find('.mat-slider__state-layer').exists()).toBe(false);
    expect(SLIDER_TRACK_END_INSET).toBe(6);
    expect(getSliderVisualPosition(0)).toBe('6px');
    expect(getSliderVisualPosition(25)).toBe('calc(25% + 3px)');
    expect(getSliderVisualPosition(50)).toBe('50%');
    expect(getSliderVisualPosition(75)).toBe('calc(75% - 3px)');
    expect(getSliderVisualPosition(100)).toBe('calc(100% - 6px)');
    expect(stylesSource).toContain('--mat-slider-track-end-inset: 6px');
    expect(componentSource).not.toContain('mat-slider-current-track-corner) -');
    expect(componentSource).not.toContain(
      'clamp(calc(var(--mat-slider-stop-indicator-size) / 2)',
    );
    expect(componentSource).toContain('cursor: default;');
    expect(componentSource).toContain('.mat-slider--use-cursor .mat-slider__interaction');
    expect(componentSource).toContain('outline: var(--mat-slider-focus-indicator-width) solid');
    expect(stylesSource).toContain('--mat-slider-track-gap-corner: 2px');
    expect(stylesSource).toContain('--mat-slider-inset-icon-inactive-color: var(--mat-sys-color-on-secondary-container)');
  });

  it('固定外观示例改用可交互模型，尺寸示例共享同一个数值', () => {
    expect(sliderSizeExampleSource).toContain('const value = ref(50)');
    expect(sliderSizeExampleSource.match(/v-model="value"/g)).toHaveLength(5);
    expect(sliderSizeExampleSource).not.toContain('model-value=');
    expect(sliderInsetIconExampleSource).toContain('const volume = ref(55)');
    expect(sliderInsetIconExampleSource.match(/v-model=/g)).toHaveLength(3);
    expect(sliderInsetIconExampleSource).not.toContain('model-value=');
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
    expect(componentSource).toContain('clip-path: inset(');
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
    expect(stylesSource).toContain('--mat-slider-stop-indicator-color: var(--mat-sys-color-primary)');
  });
});
