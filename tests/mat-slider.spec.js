import { mount } from '@vue/test-utils';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import { defineComponent, nextTick } from 'vue';
import { MatSlider, MatTooltip } from '../src';

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
  afterEach(() => {
    vi.unstubAllGlobals();
  });

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

    expect(wrapper.attributes('data-test')).toBe('volume-slider');
    expect(input.attributes('type')).toBe('range');
    expect(input.attributes('aria-label')).toBe('音量');
    expect(input.attributes('aria-valuemin')).toBe('0');
    expect(input.attributes('aria-valuemax')).toBe('10');
    expect(input.attributes('aria-valuenow')).toBe('6');
    expect(input.element.value).toBe('6');
  });

  it('限制超出范围的数值', () => {
    const clamped = mount(MatSlider, {
      props: {
        max: 8,
        min: 0,
        modelValue: 99,
        step: 2,
      },
    });
    expect(clamped.find('input').attributes('aria-valuenow')).toBe('8');
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

  it('同一绘制帧只处理最新指针位置，并在释放前刷新最终值', async () => {
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

    const wrapper = mount(MatSlider, {
      props: {
        max: 100,
        min: 0,
        modelValue: 0,
        step: 1,
      },
    });
    const interaction = wrapper.find('.mat-slider__interaction');

    mockInteractionRect(wrapper);
    await dispatchPointer(interaction, 'pointerdown', { clientX: 0, pointerId: 7 });
    await dispatchPointer(interaction, 'pointermove', { clientX: 20, pointerId: 7 });
    await dispatchPointer(interaction, 'pointermove', { clientX: 80, pointerId: 7 });

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    expect(frames).toHaveLength(1);

    const [[frameId, callback]] = frames;

    frames.delete(frameId);
    callback(16);
    await nextTick();

    expect(wrapper.emitted('update:modelValue')?.map(([value]) => value)).toEqual([84]);

    await dispatchPointer(interaction, 'pointermove', { clientX: 90, pointerId: 7 });
    await dispatchPointer(interaction, 'pointerup', { clientX: 95, pointerId: 7 });

    expect(wrapper.emitted('update:modelValue')?.map(([value]) => value)).toEqual([84, 95, 100]);
    expect(wrapper.emitted('change')).toHaveLength(1);
    expect(frames).toHaveLength(0);
    wrapper.unmount();
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
    expect(tooltip.props('location')).toBe('top');
    expect(tooltip.props('modelValue')).toBe(false);

    await input.trigger('focus');
    await nextTick();

    expect(tooltip.props('modelValue')).toBe(true);
    expect(document.body.querySelector('[role="tooltip"]')?.textContent).toContain('32');

    await input.trigger('blur');

    expect(tooltip.props('modelValue')).toBe(false);
    wrapper.unmount();
  });

  it('通过 indicator-label Slot 自定义规范化后的数值指示内容', async () => {
    const indicatorLabel = vi.fn(({ modelValue }) => `${modelValue}°`);
    const wrapper = mount(MatSlider, {
      attachTo: document.body,
      props: {
        max: 10,
        min: 0,
        modelValue: 5.3,
        showValueIndicator: true,
        step: 2,
      },
      slots: {
        'indicator-label': indicatorLabel,
      },
    });

    await wrapper.find('input').trigger('focus');
    await nextTick();

    expect(indicatorLabel).toHaveBeenCalledWith(expect.objectContaining({ modelValue: 6 }));
    expect(document.body.querySelector('[role="tooltip"]')?.textContent).toContain('6°');
    wrapper.unmount();
  });

  it('通过模板中的 indicator-label Slot 自定义数值指示内容', async () => {
    const Example = defineComponent({
      components: { MatSlider },
      template: `
        <MatSlider :model-value="21" show-value-indicator>
          <template #indicator-label="{ modelValue }">
            {{ modelValue }}°
          </template>
        </MatSlider>
      `,
    });
    const wrapper = mount(Example, { attachTo: document.body });

    await wrapper.find('input').trigger('focus');
    await nextTick();

    expect(document.body.querySelector('[role="tooltip"]')?.textContent).toContain('21°');
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
  });

  it('disabled 时不响应指针更新', async () => {
    const wrapper = mount(MatSlider, {
      props: {
        disabled: true,
        max: 4,
        min: 0,
        modelValue: 2,
        orientation: 'vertical',
        step: 1,
      },
    });
    const interaction = wrapper.find('.mat-slider__interaction');

    expect(wrapper.find('input').element.disabled).toBe(true);

    mockInteractionRect(wrapper);
    await dispatchPointer(interaction, 'pointerdown', {
      clientY: 0,
      pointerId: 1,
    });

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('校验公开属性', () => {
    expect(MatSlider.props.variant.validator('standard')).toBe(true);
    expect(MatSlider.props.variant.validator('centered')).toBe(true);
    expect(MatSlider.props.variant.validator('range')).toBe(false);
    expect(MatSlider.props.orientation.validator('horizontal')).toBe(true);
    expect(MatSlider.props.orientation.validator('diagonal')).toBe(false);
    expect(MatSlider.props.size.validator('extra-large')).toBe(true);
    expect(MatSlider.props.size.validator('compact')).toBe(false);
    expect(MatSlider.props.step.validator(1)).toBe(true);
    expect(MatSlider.props.step.validator(0)).toBe(false);
  });
});
