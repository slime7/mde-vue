import { mount } from '@vue/test-utils';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { nextTick } from 'vue';
import { Ripple } from '../../src/directives/ripple';

function mountHost({
  as = 'button', attributes = '', binding = undefined, content = '涟漪', role = undefined,
} = {}) {
  return mount({
    data: () => ({ binding, role }),
    directives: { ripple: Ripple },
    template: `<${as} v-ripple="binding" :role="role" ${attributes}>${content}</${as}>`,
  });
}

function getContainer(wrapper) {
  return wrapper.element.querySelector('[aria-hidden="true"]');
}

function getWaveCount(wrapper) {
  const container = getContainer(wrapper);

  return container ? container.childElementCount : 0;
}

function dispatchPointer(target, type, {
  button = 0, clientX = 24, clientY = 18, pointerId = 1,
} = {}) {
  const event = new Event(type, { bubbles: true, cancelable: true });
  Object.defineProperties(event, {
    button: { value: button },
    clientX: { value: clientX },
    clientY: { value: clientY },
    pointerId: { value: pointerId },
  });
  target.dispatchEvent(event);
}

describe('v-ripple', () => {
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

  it('主指针按压产生涟漪，长按保持，释放后淡出并完整清理', async () => {
    const wrapper = mountHost({ attributes: 'style="anchor-name: --existing"' });

    expect(getWaveCount(wrapper)).toBe(0);

    dispatchPointer(wrapper.element, 'pointerdown', { pointerId: 5 });
    expect(getWaveCount(wrapper)).toBe(1);

    await vi.advanceTimersByTimeAsync(300);
    expect(getWaveCount(wrapper)).toBe(1);

    dispatchPointer(window, 'pointerup', { pointerId: 5 });
    expect(getWaveCount(wrapper)).toBe(1);

    await vi.advanceTimersByTimeAsync(150);
    expect(getWaveCount(wrapper)).toBe(0);
    expect(getContainer(wrapper)).not.toBeNull();

    wrapper.unmount();
    expect(wrapper.element.querySelector('[aria-hidden="true"]')).toBeNull();
    expect(wrapper.element.style.getPropertyValue('anchor-name')).toBe('--existing');
  });

  it('键盘激活不产生涟漪', () => {
    const wrapper = mountHost();

    wrapper.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    wrapper.element.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true }));

    expect(getWaveCount(wrapper)).toBe(0);
  });

  it('快速短按等待进入时长结束后再淡出', async () => {
    const wrapper = mountHost();

    dispatchPointer(wrapper.element, 'pointerdown', { pointerId: 1 });
    dispatchPointer(window, 'pointerup', { pointerId: 1 });

    await vi.advanceTimersByTimeAsync(224);
    expect(getWaveCount(wrapper)).toBe(1);

    await vi.advanceTimersByTimeAsync(1);
    expect(getWaveCount(wrapper)).toBe(1);

    await vi.advanceTimersByTimeAsync(149);
    expect(getWaveCount(wrapper)).toBe(1);

    await vi.advanceTimersByTimeAsync(1);
    expect(getWaveCount(wrapper)).toBe(0);
  });

  it('快速连点产生新涟漪并让旧涟漪退出', async () => {
    const wrapper = mountHost();

    dispatchPointer(wrapper.element, 'pointerdown', { pointerId: 1 });
    dispatchPointer(window, 'pointerup', { pointerId: 1 });
    dispatchPointer(wrapper.element, 'pointerdown', { pointerId: 2 });

    expect(getWaveCount(wrapper)).toBe(2);

    dispatchPointer(window, 'pointerup', { pointerId: 2 });

    await vi.advanceTimersByTimeAsync(500);
    expect(getWaveCount(wrapper)).toBe(0);
  });

  it('禁用宿主不产生涟漪且按压中禁用立即结束', async () => {
    const disabled = mountHost({ attributes: 'disabled' });

    dispatchPointer(disabled.element, 'pointerdown', { pointerId: 1 });
    expect(getWaveCount(disabled)).toBe(0);

    const wrapper = mountHost();
    dispatchPointer(wrapper.element, 'pointerdown', { pointerId: 1 });
    expect(getWaveCount(wrapper)).toBe(1);

    wrapper.element.setAttribute('aria-disabled', 'true');
    await nextTick();
    await Promise.resolve();

    await vi.advanceTimersByTimeAsync(500);
    expect(getWaveCount(wrapper)).toBe(0);

    dispatchPointer(wrapper.element, 'pointerdown', { pointerId: 2 });
    expect(getWaveCount(wrapper)).toBe(0);
  });

  it('非法绑定值警告并回退，响应式更新颜色且不重建容器', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mountHost({ binding: 'red' });
    const container = getContainer(wrapper);

    expect(container.style.color).toBe('currentcolor');
    expect(warn).toHaveBeenCalled();

    await wrapper.setData({ binding: { colour: 'red', color: 'invalid-color' } });

    expect(getContainer(wrapper)).toBe(container);
    expect(container.style.color).toBe('currentcolor');
    expect(warn.mock.calls.flat().join(' ')).toContain('colour');

    await wrapper.setData({ binding: { color: 'var(--example-ripple-color)' } });

    expect(getContainer(wrapper)).toBe(container);
    expect(container.style.color).toBe('var(--example-ripple-color)');
  });

  it('disabled 选项跳过涟漪并支持动态启用', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mountHost({ binding: { disabled: true } });

    expect(getContainer(wrapper)).toBeNull();
    expect(warn).not.toHaveBeenCalled();

    await wrapper.setData({ binding: { disabled: false } });

    const container = getContainer(wrapper);

    expect(container).not.toBeNull();

    dispatchPointer(wrapper.element, 'pointerdown', { pointerId: 1 });
    expect(getWaveCount(wrapper)).toBe(1);

    await wrapper.setData({ binding: { disabled: true } });
    expect(getContainer(wrapper)).toBeNull();
  });

  it('disabled 非布尔值警告并按启用处理', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mountHost({ binding: { disabled: 'yes' } });

    expect(getContainer(wrapper)).not.toBeNull();
    expect(warn).toHaveBeenCalled();
  });

  it('默认渲染实心圆形波纹且无额外警告', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mountHost({ binding: {} });

    dispatchPointer(wrapper.element, 'pointerdown', { pointerId: 1 });

    expect(getWaveCount(wrapper)).toBe(1);
    expect(getContainer(wrapper).firstElementChild.style.backgroundImage).toBe('');
    expect(warn).not.toHaveBeenCalled();
  });

  it('variant 为 dots 时渲染波点阵列并遵循相同生命周期', async () => {
    const wrapper = mountHost({ binding: { variant: 'dots' } });

    dispatchPointer(wrapper.element, 'pointerdown', { pointerId: 5 });

    const wave = getContainer(wrapper).firstElementChild;

    expect(wave.style.backgroundColor).toBe('transparent');
    expect(wave.style.backgroundImage).toContain('radial-gradient');
    expect(wave.style.backgroundSize).toBe('12px 12px');
    expect(wave.style.backgroundRepeat).toBe('round');
    // 按压点 (24, 18) 处对齐一个圆点：偏移为按压点减去半个网格。
    expect(wave.style.backgroundPosition).toBe('18px 12px');
    expect(wave.style.borderRadius).toBe('0px');

    await vi.advanceTimersByTimeAsync(300);
    expect(getWaveCount(wrapper)).toBe(1);

    dispatchPointer(window, 'pointerup', { pointerId: 5 });
    await vi.advanceTimersByTimeAsync(150);
    expect(getWaveCount(wrapper)).toBe(0);
  });

  it('variant 为 glow 时渲染羽化光斑并保持到释放', async () => {
    const wrapper = mountHost({ binding: { variant: 'glow' } });

    dispatchPointer(wrapper.element, 'pointerdown', { pointerId: 5 });

    const wave = getContainer(wrapper).firstElementChild;

    expect(wave.style.backgroundColor).toBe('transparent');
    expect(wave.style.backgroundImage).toContain('radial-gradient');

    await vi.advanceTimersByTimeAsync(300);
    expect(getWaveCount(wrapper)).toBe(1);

    dispatchPointer(window, 'pointerup', { pointerId: 5 });
    await vi.advanceTimersByTimeAsync(149);
    expect(getWaveCount(wrapper)).toBe(1);

    await vi.advanceTimersByTimeAsync(1);
    expect(getWaveCount(wrapper)).toBe(0);
  });

  it('variant 为 rings 时渲染两圈细环，静止形态保持到释放后清理', async () => {
    const wrapper = mountHost({ binding: { variant: 'rings' } });

    dispatchPointer(wrapper.element, 'pointerdown', { pointerId: 5 });

    const wave = getContainer(wrapper).firstElementChild;

    expect(wave.style.backgroundColor).toBe('transparent');
    expect(wave.childElementCount).toBe(2);
    // 瞬时变体的容器不参与淡入，必须自己保持可见，否则被基类样式整体隐藏。
    expect(wave.style.opacity).toBe('1');
    expect(wave.children[0].style.border).toContain('2px');
    expect(wave.children[0].style.borderRadius).toBe('50%');

    // 静止形态（无 Web Animations 环境）没有自完成动画，保持到释放才清理。
    await vi.advanceTimersByTimeAsync(1000);
    expect(getWaveCount(wrapper)).toBe(1);

    dispatchPointer(window, 'pointerup', { pointerId: 5 });
    await vi.advanceTimersByTimeAsync(149);
    expect(getWaveCount(wrapper)).toBe(1);

    await vi.advanceTimersByTimeAsync(1);
    expect(getWaveCount(wrapper)).toBe(0);
  });

  it('variant 为 burst 时渲染八道放射光线并在释放后清理', async () => {
    const wrapper = mountHost({ binding: { variant: 'burst' } });

    dispatchPointer(wrapper.element, 'pointerdown', { pointerId: 5 });

    const wave = getContainer(wrapper).firstElementChild;

    expect(wave.style.backgroundColor).toBe('transparent');
    expect(wave.childElementCount).toBe(8);
    expect(wave.style.opacity).toBe('1');
    expect(wave.children[0].style.background).toBe('currentcolor');

    dispatchPointer(window, 'pointerup', { pointerId: 5 });
    await vi.advanceTimersByTimeAsync(400);
    expect(getWaveCount(wrapper)).toBe(0);
  });

  it('非法 variant 警告并回退为实心圆', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mountHost({ binding: { variant: 'speckle' } });

    dispatchPointer(wrapper.element, 'pointerdown', { pointerId: 1 });

    const warning = warn.mock.calls.flat().join(' ');

    expect(warning).toContain('variant');
    expect(warning).toContain("'glow'");
    expect(warning).toContain("'rings'");
    expect(warning).toContain("'burst'");
    expect(getContainer(wrapper).firstElementChild.style.backgroundImage).toBe('');
  });

  it('variant 动态切换不重建容器且只影响后续按压', async () => {
    const wrapper = mountHost({ binding: { variant: 'dots' } });
    const container = getContainer(wrapper);

    dispatchPointer(wrapper.element, 'pointerdown', { pointerId: 1 });
    expect(getContainer(wrapper).firstElementChild.style.backgroundImage).toContain('radial-gradient');

    await wrapper.setData({ binding: { variant: 'circle' } });

    expect(getContainer(wrapper)).toBe(container);

    dispatchPointer(wrapper.element, 'pointerdown', { pointerId: 2 });

    const waves = container.children;

    expect(waves[0].style.backgroundImage).toContain('radial-gradient');
    expect(waves[1].style.backgroundImage).toBe('');

    await wrapper.setData({ binding: { variant: 'dots' } });
    dispatchPointer(wrapper.element, 'pointerdown', { pointerId: 3 });

    expect(container.children[2].style.backgroundImage).toContain('radial-gradient');

    await wrapper.setData({ binding: { variant: 'glow' } });
    dispatchPointer(wrapper.element, 'pointerdown', { pointerId: 4 });
    expect(container.children[3].style.backgroundImage).toContain('radial-gradient');
    expect(container.children[3].style.backgroundColor).toBe('transparent');

    await wrapper.setData({ binding: { variant: 'rings' } });
    dispatchPointer(wrapper.element, 'pointerdown', { pointerId: 5 });
    expect(container.children[4].childElementCount).toBe(2);
  });

  it('无法容纳涟漪的宿主警告并跳过', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const input = mountHost({ as: 'input', content: '' });
    const contents = mountHost({ as: 'span', attributes: 'style="display: contents"' });

    expect(getContainer(input)).toBeNull();
    expect(getContainer(contents)).toBeNull();
    expect(warn).toHaveBeenCalledTimes(2);
  });
});
