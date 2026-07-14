import { mount } from '@vue/test-utils';
import { h } from 'vue';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import { MatBtn, MatBtnGroup, MatIconBtn } from '../src';

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

/**
 * @param {import('@vue/test-utils').DOMWrapper<HTMLButtonElement>[]} buttons
 * @param {number[]} widths
 */
function mockButtonWidths(buttons, widths) {
  buttons.forEach((button, index) => {
    vi.spyOn(button.element, 'getBoundingClientRect').mockReturnValue({
      width: widths[index],
    });
  });
}

/**
 * @param {import('@vue/test-utils').DOMWrapper<HTMLButtonElement>[]} buttons
 * @returns {(number | null)[]}
 */
function getInlineSizes(buttons) {
  return buttons.map((button) => (
    button.element.style.inlineSize
      ? Number.parseFloat(Number.parseFloat(button.element.style.inlineSize).toFixed(3))
      : null
  ));
}

/**
 * @param {number} duration
 */
function mockWidthTransitionDuration(duration = 150) {
  const getStyle = window.getComputedStyle;

  vi.spyOn(window, 'getComputedStyle').mockImplementation((element) => {
    const style = getStyle(element);

    Object.defineProperty(style, 'transitionDuration', {
      configurable: true,
      value: `${duration}ms`,
    });
    return style;
  });
}

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

  it('standard 首尾项和中间项按 15% 同步调整相邻项宽度', async () => {
    vi.useFakeTimers();
    mockWidthTransitionDuration();
    const wrapper = mount(MatBtnGroup, {
      slots: {
        default: () => [
          h(MatBtn, null, () => '一'),
          h(MatBtn, null, () => '二'),
          h(MatBtn, null, () => '三'),
        ],
      },
    });
    const buttons = wrapper.findAll('button');
    mockButtonWidths(buttons, [100, 100, 100]);

    await buttons[0].trigger('pointerdown', { pointerId: 1 });
    expect(getInlineSizes(buttons)).toEqual([115, 85, null]);

    await buttons[0].trigger('pointercancel', { pointerId: 1 });
    vi.advanceTimersByTime(113);
    expect(getInlineSizes(buttons)).toEqual([null, null, null]);

    await buttons[1].trigger('pointerdown', { pointerId: 2 });
    expect(getInlineSizes(buttons)).toEqual([92.5, 115, 92.5]);
  });

  it('快速释放在 75% 阈值前保持展开，到达阈值后恢复', async () => {
    vi.useFakeTimers();
    mockWidthTransitionDuration(200);
    const wrapper = mount(MatBtnGroup, {
      slots: {
        default: () => [
          h(MatBtn, null, () => '一'),
          h(MatBtn, null, () => '二'),
        ],
      },
    });
    const buttons = wrapper.findAll('button');
    mockButtonWidths(buttons, [100, 100]);

    await buttons[0].trigger('pointerdown', { pointerId: 1 });
    await buttons[0].trigger('pointerup', { pointerId: 1 });
    expect(getInlineSizes(buttons)).toEqual([115, 85]);

    vi.advanceTimersByTime(149);
    expect(getInlineSizes(buttons)).toEqual([115, 85]);

    vi.advanceTimersByTime(1);
    expect(getInlineSizes(buttons)).toEqual([null, null]);
  });

  it('长按超过阈值后在释放时立即恢复', async () => {
    vi.useFakeTimers();
    mockWidthTransitionDuration();
    const wrapper = mount(MatBtnGroup, {
      slots: {
        default: () => [
          h(MatBtn, null, () => '一'),
          h(MatBtn, null, () => '二'),
        ],
      },
    });
    const buttons = wrapper.findAll('button');
    mockButtonWidths(buttons, [100, 100]);

    await buttons[0].trigger('pointerdown', { pointerId: 1 });
    vi.advanceTimersByTime(113);
    expect(getInlineSizes(buttons)).toEqual([115, 85]);

    await buttons[0].trigger('pointerup', { pointerId: 1 });
    expect(getInlineSizes(buttons)).toEqual([null, null]);
  });

  it('Space、Enter、取消和失焦都请求恢复宽度', async () => {
    vi.useFakeTimers();
    mockWidthTransitionDuration();
    const wrapper = mount(MatBtnGroup, {
      slots: {
        default: () => [
          h(MatBtn, null, () => '一'),
          h(MatBtn, null, () => '二'),
        ],
      },
    });
    const buttons = wrapper.findAll('button');
    mockButtonWidths(buttons, [100, 100]);

    await buttons[0].trigger('keydown', { key: ' ' });
    expect(getInlineSizes(buttons)).toEqual([115, 85]);
    await buttons[0].trigger('keyup', { key: ' ' });
    vi.advanceTimersByTime(113);
    expect(getInlineSizes(buttons)).toEqual([null, null]);

    await buttons[1].trigger('keydown', { key: 'Enter' });
    expect(getInlineSizes(buttons)).toEqual([85, 115]);
    await buttons[1].trigger('focusout');
    vi.advanceTimersByTime(113);
    expect(getInlineSizes(buttons)).toEqual([null, null]);
  });

  it('单项 standard 和 connected 组不联动宽度', async () => {
    const single = mount(MatBtnGroup, {
      slots: {
        default: () => h(MatBtn, null, () => '一'),
      },
    });
    const singleButton = single.find('button');
    mockButtonWidths([singleButton], [100]);

    await singleButton.trigger('pointerdown', { pointerId: 1 });
    expect(singleButton.element.style.inlineSize).toBe('');

    const connected = mount(MatBtnGroup, {
      props: {
        variant: 'connected',
        selection: 'multiple',
      },
      slots: {
        default: () => [
          h(MatBtn, { value: 'one' }, () => '一'),
          h(MatBtn, { value: 'two' }, () => '二'),
        ],
      },
    });
    const connectedButtons = connected.findAll('button');
    mockButtonWidths(connectedButtons, [100, 100]);

    await connectedButtons[0].trigger('pointerdown', { pointerId: 2 });
    expect(getInlineSizes(connectedButtons)).toEqual([null, null]);
  });

  it('reduced motion 在释放时立即恢复，不等待阈值', async () => {
    vi.useFakeTimers();
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true })));
    const wrapper = mount(MatBtnGroup, {
      slots: {
        default: () => [
          h(MatBtn, null, () => '一'),
          h(MatBtn, null, () => '二'),
        ],
      },
    });
    const buttons = wrapper.findAll('button');
    mockButtonWidths(buttons, [100, 100]);

    await buttons[0].trigger('pointerdown', { pointerId: 1 });
    expect(getInlineSizes(buttons)).toEqual([115, 85]);
    await buttons[0].trigger('pointerup', { pointerId: 1 });
    expect(getInlineSizes(buttons)).toEqual([null, null]);
  });

  it('重新按下和卸载会清理计时器并恢复原有行内宽度', async () => {
    vi.useFakeTimers();
    mockWidthTransitionDuration();
    const wrapper = mount(MatBtnGroup, {
      slots: {
        default: () => [
          h(MatBtn, { style: { inlineSize: '90px' } }, () => '一'),
          h(MatBtn, { style: { inlineSize: '110px' } }, () => '二'),
        ],
      },
    });
    const buttons = wrapper.findAll('button');
    mockButtonWidths(buttons, [90, 110]);
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');

    await buttons[0].trigger('pointerdown', { pointerId: 1 });
    await buttons[0].trigger('pointerup', { pointerId: 1 });

    await buttons[1].trigger('pointerdown', { pointerId: 2 });
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(getInlineSizes(buttons)).toEqual([73.5, 126.5]);

    const clearCallsBeforeUnmount = clearTimeoutSpy.mock.calls.length;
    wrapper.unmount();
    expect(clearTimeoutSpy.mock.calls.length).toBeGreaterThan(clearCallsBeforeUnmount);
    expect(getInlineSizes(buttons)).toEqual([90, 110]);
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
