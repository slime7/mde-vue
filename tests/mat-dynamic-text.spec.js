import { mount } from '@vue/test-utils';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { nextTick } from 'vue';
import { MatDynamicText } from '../src';

/**
 * 推进虚拟时间并等待 Vue 完成响应式刷新。
 *
 * @param {number} ms
 */
async function flushAnimations(ms = 2000) {
  await vi.advanceTimersByTimeAsync(ms);
  await nextTick();
}

describe('MatDynamicText', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('默认以 span 渲染完整文本，不执行入场动画', () => {
    const wrapper = mount(MatDynamicText, {
      props: { text: 'Hello' },
    });

    expect(wrapper.element.tagName).toBe('SPAN');
    expect(wrapper.text()).toBe('Hello');
    expect(wrapper.attributes('aria-label')).toBe('Hello');
    expect(wrapper.findAll('.mat-dynamic-text__char--entering')).toHaveLength(0);
  });

  it('支持数字类型并转换为字符串展示', () => {
    const wrapper = mount(MatDynamicText, {
      props: { text: 12345 },
    });

    expect(wrapper.text()).toBe('12345');
    expect(wrapper.attributes('aria-label')).toBe('12345');
  });

  it('appear 首次挂载时执行入场动画', () => {
    const wrapper = mount(MatDynamicText, {
      props: { text: 'Hi', appear: true },
    });

    expect(wrapper.findAll('.mat-dynamic-text__char--entering')).toHaveLength(2);
  });

  it('通过 as 替换根标签并透传原生属性与事件', async () => {
    const handleClick = vi.fn();
    const wrapper = mount(MatDynamicText, {
      props: {
        as: 'h2',
        text: '标题动态文字',
      },
      attrs: {
        id: 'dynamic-title',
        onClick: handleClick,
      },
    });

    expect(wrapper.element.tagName).toBe('H2');
    expect(wrapper.attributes('id')).toBe('dynamic-title');
    expect(wrapper.text()).toBe('标题动态文字');

    await wrapper.trigger('click');
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('只接受合法的 HTML 标签名', () => {
    expect(MatDynamicText.props.as.validator('span')).toBe(true);
    expect(MatDynamicText.props.as.validator('h1')).toBe(true);
    expect(MatDynamicText.props.as.validator('p')).toBe(true);
    expect(MatDynamicText.props.as.validator('not a valid tag')).toBe(false);
  });

  it('响应 text 更新，动画结束后提交新文本', async () => {
    const wrapper = mount(MatDynamicText, {
      props: { text: 'Count: 1' },
    });

    expect(wrapper.text()).toBe('Count: 1');

    await wrapper.setProps({ text: 'Count: 2' });
    await nextTick();

    expect(wrapper.attributes('aria-label')).toBe('Count: 2');
    await flushAnimations();
    expect(wrapper.text()).toBe('Count: 2');
  });

  it('diff 模式仅动画变化字符，关闭 diff 时全量动画', async () => {
    const wrapper = mount(MatDynamicText, {
      props: { text: 'AAA' },
    });

    await wrapper.setProps({ text: 'ABB' });
    await nextTick();
    expect(wrapper.findAll('.mat-dynamic-text__char--entering')).toHaveLength(2);

    await flushAnimations();
    expect(wrapper.text()).toBe('ABB');

    await wrapper.setProps({ text: 'XYZ', diff: false });
    await nextTick();
    expect(wrapper.findAll('.mat-dynamic-text__char--entering')).toHaveLength(3);

    await flushAnimations();
    expect(wrapper.text()).toBe('XYZ');
  });

  it('处理空字符串、零值和多字节字符', async () => {
    const wrapper = mount(MatDynamicText, {
      props: { text: '' },
    });

    expect(wrapper.text()).toBe('');

    await wrapper.setProps({ text: 0 });
    await nextTick();
    await flushAnimations();
    expect(wrapper.text()).toBe('0');

    await wrapper.setProps({ text: '🚀 状态：成功 🎉' });
    await nextTick();
    await flushAnimations();
    expect(wrapper.text()).toBe('🚀 状态：成功 🎉');
  });

  it('连续快速更新时安全提交前一次动画', async () => {
    const wrapper = mount(MatDynamicText, {
      props: { text: 'Alpha' },
    });

    await wrapper.setProps({ text: 'Beta' });
    await nextTick();

    await wrapper.setProps({ text: 'Gamma' });
    await nextTick();
    expect(wrapper.attributes('aria-label')).toBe('Gamma');

    await flushAnimations();
    expect(wrapper.text()).toBe('Gamma');
  });

  it('字符列对屏幕阅读器隐藏，完整文本保留在 aria-label', () => {
    const wrapper = mount(MatDynamicText, {
      props: { text: '无障碍文本' },
    });

    expect(wrapper.attributes('aria-label')).toBe('无障碍文本');
    expect(wrapper.findAll('.mat-dynamic-text__column[aria-hidden=\'true\']').length).toBeGreaterThan(0);
  });

  it('减少动效偏好时立即切换文本', async () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn(() => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      onchange: null,
      dispatchEvent: vi.fn(),
    }));

    const wrapper = mount(MatDynamicText, {
      props: { text: 'Old' },
    });

    await wrapper.setProps({ text: 'New' });
    await nextTick();

    expect(wrapper.text()).toBe('New');
    expect(wrapper.findAll('.mat-dynamic-text__char--entering')).toHaveLength(0);
    expect(wrapper.findAll('.mat-dynamic-text__char--exiting')).toHaveLength(0);

    window.matchMedia = originalMatchMedia;
  });
});
