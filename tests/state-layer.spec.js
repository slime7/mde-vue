import { mount } from '@vue/test-utils';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { nextTick } from 'vue';
import { StateLayer } from '../src/directives/state-layer';

function mountHost({
  as = 'button', attributes = '', binding = undefined, content = '目标', role = undefined,
} = {}) {
  return mount({
    data: () => ({ binding, role }),
    directives: { stateLayer: StateLayer },
    template: `<${as} v-state-layer="binding" :role="role" ${attributes}>${content}</${as}>`,
  });
}

function getLayer(wrapper) {
  return wrapper.element.querySelector('[aria-hidden="true"]');
}

function dispatchPointer(target, type, { button = 0, pointerId = 1 } = {}) {
  const event = new Event(type, { bubbles: true, cancelable: true });
  Object.defineProperties(event, {
    button: { value: button },
    pointerId: { value: pointerId },
  });
  target.dispatchEvent(event);
}

describe('v-state-layer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('CSS', {
      supports: vi.fn((property, value) => property === 'color' && value !== 'invalid-color'),
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('使用默认对象配置并响应式更新颜色且不重建状态层', async () => {
    const wrapper = mountHost();
    const layer = getLayer(wrapper);

    expect(layer).not.toBeNull();
    expect(layer.style.backgroundColor).toBe('currentcolor');

    await wrapper.setData({ binding: { color: 'var(--example-state-color)' } });

    expect(getLayer(wrapper)).toBe(layer);
    expect(layer.style.backgroundColor).toBe('var(--example-state-color)');
  });

  it('非法配置发出警告并回退默认颜色', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mountHost({ binding: 'red' });

    expect(getLayer(wrapper).style.backgroundColor).toBe('currentcolor');
    expect(warn).toHaveBeenCalled();

    await wrapper.setData({ binding: { colour: 'red', color: 'invalid-color' } });

    expect(getLayer(wrapper).style.backgroundColor).toBe('currentcolor');
    expect(warn.mock.calls.flat().join(' ')).toContain('colour');
  });

  it('保留宿主已有和生命周期内新增的 anchor-name', async () => {
    const wrapper = mountHost({ attributes: 'style="anchor-name: --existing"' });
    const assignedNames = wrapper.element.style.getPropertyValue('anchor-name');

    expect(assignedNames).toContain('--existing');
    expect(assignedNames).toMatch(/--mat-state-layer-\d+/);

    wrapper.element.style.setProperty('anchor-name', `${assignedNames}, --later`);
    wrapper.unmount();

    expect(wrapper.element.style.getPropertyValue('anchor-name')).toBe('--existing, --later');
  });

  it('无法容纳状态层的宿主会警告并跳过', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const input = mountHost({ as: 'input', content: '' });
    const contents = mountHost({ as: 'span', attributes: 'style="display: contents"' });

    expect(getLayer(input)).toBeNull();
    expect(getLayer(contents)).toBeNull();
    expect(warn).toHaveBeenCalledTimes(2);
  });

  it('主指针按压至少显示 150ms 且不捕获指针', async () => {
    const wrapper = mountHost();
    const setPointerCapture = vi.fn();
    wrapper.element.setPointerCapture = setPointerCapture;

    dispatchPointer(wrapper.element, 'pointerdown', { pointerId: 7 });
    expect(wrapper.element.getAttribute('data-mat-state-layer-pressed')).toBe('');
    expect(setPointerCapture).not.toHaveBeenCalled();

    dispatchPointer(window, 'pointerup', { pointerId: 7 });
    await vi.advanceTimersByTimeAsync(149);
    expect(wrapper.element.hasAttribute('data-mat-state-layer-pressed')).toBe(true);

    await vi.advanceTimersByTimeAsync(1);
    expect(wrapper.element.hasAttribute('data-mat-state-layer-pressed')).toBe(false);
  });

  it('按标签和 role 推导键盘按压语义', async () => {
    const button = mountHost();
    const link = mountHost({ as: 'a', attributes: 'href="#target"' });
    const customButton = mountHost({ as: 'div', role: 'button' });
    const plain = mountHost({ as: 'div' });

    await button.trigger('keydown', { key: ' ' });
    await link.trigger('keydown', { key: ' ' });
    await customButton.trigger('keydown', { key: 'Enter' });
    await plain.trigger('keydown', { key: 'Enter' });

    expect(button.element.hasAttribute('data-mat-state-layer-pressed')).toBe(true);
    expect(link.element.hasAttribute('data-mat-state-layer-pressed')).toBe(false);
    expect(customButton.element.hasAttribute('data-mat-state-layer-pressed')).toBe(true);
    expect(plain.element.hasAttribute('data-mat-state-layer-pressed')).toBe(false);
  });

  it('禁用时不启动且按压期间禁用会立即清理', async () => {
    const wrapper = mountHost();

    dispatchPointer(wrapper.element, 'pointerdown', { pointerId: 1 });
    wrapper.element.setAttribute('aria-disabled', 'true');
    await nextTick();
    await Promise.resolve();

    expect(wrapper.element.hasAttribute('data-mat-state-layer-pressed')).toBe(false);

    dispatchPointer(wrapper.element, 'pointerdown', { pointerId: 2 });
    expect(wrapper.element.hasAttribute('data-mat-state-layer-pressed')).toBe(false);
  });

  it('动态内容更新不会重复状态层且卸载会清理宿主', async () => {
    const wrapper = mount({
      data: () => ({ visible: true }),
      directives: { stateLayer: StateLayer },
      template: '<button v-state-layer><span v-if="visible">内容</span></button>',
    });
    const layer = getLayer(wrapper);

    await wrapper.setData({ visible: false });
    await wrapper.setData({ visible: true });

    expect(wrapper.element.querySelectorAll('[aria-hidden="true"]')).toHaveLength(1);
    expect(getLayer(wrapper)).toBe(layer);

    wrapper.unmount();
    expect(wrapper.element.hasAttribute('data-mat-state-layer-pressed')).toBe(false);
    expect(wrapper.element.style.getPropertyValue('anchor-name')).toBe('');
  });
});
