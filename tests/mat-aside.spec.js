/* eslint-disable vue/one-component-per-file -- 测试内组件只用于读取布局上下文。 */
import { mount } from '@vue/test-utils';
import { h, nextTick } from 'vue';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import MatAside from '../src/components/mat-aside/MatAside.vue';
import MatAppRoot from '../src/components/mat-app-root/MatAppRoot.vue';

function rect({ bottom, height, left = 0, right, top = 0, width }) {
  return { bottom, height, left, right, top, width, x: left, y: top, toJSON() {} };
}

async function settle() {
  await nextTick();
  await nextTick();
}

describe('MatAside 边缘组件', () => {
  beforeEach(() => {
    vi.stubGlobal('requestAnimationFrame', (cb) => { cb(); return 1; });
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    vi.stubGlobal('ResizeObserver', class { observe() {} unobserve() {} disconnect() {} });
  });
  afterEach(() => { vi.restoreAllMocks(); });

  it('默认渲染 aside 标签且默认 location 为 left，支持 as 属性定制根节点', () => {
    const defaultWrapper = mount(MatAside, { props: { blockSize: 64 } });
    expect(defaultWrapper.element.tagName).toBe('ASIDE');
    expect(defaultWrapper.classes()).toContain('mat-aside');
    expect(defaultWrapper.classes()).toContain('mat-aside--left');

    const navWrapper = mount(MatAside, { props: { as: 'nav', blockSize: 64 } });
    expect(navWrapper.element.tagName).toBe('NAV');

    const headerWrapper = mount(MatAside, { props: { as: 'header', blockSize: 64 } });
    expect(headerWrapper.element.tagName).toBe('HEADER');
  });

  it('根据 location 与 blockSize、safeAreaSize 计算总厚度与安全区内边距', () => {
    const wrapper = mount(MatAside, {
      props: {
        location: 'top',
        blockSize: '64px',
        safeAreaSize: '20px',
      },
    });

    expect(wrapper.classes()).toContain('mat-aside--top');
    expect(wrapper.element.style.getPropertyValue('--mat-aside-block-size')).toBe('64px');
    expect(wrapper.element.style.getPropertyValue('--mat-aside-safe-area-size')).toBe('20px');
    expect(wrapper.element.style.getPropertyValue('--mat-aside-total-block-size')).toBe('84px');
  });

  it('支持 bottom 与 right 边缘停靠方向及 zIndex 配置', () => {
    const bottomWrapper = mount(MatAside, {
      props: { location: 'bottom', blockSize: 80, zIndex: 99 },
    });
    expect(bottomWrapper.classes()).toContain('mat-aside--bottom');
    expect(bottomWrapper.element.style.zIndex).toBe('99');

    const rightWrapper = mount(MatAside, {
      props: { location: 'right', blockSize: 300 },
    });
    expect(rightWrapper.classes()).toContain('mat-aside--right');
  });

  it('bordered 属性添加边框修饰类', () => {
    const wrapper = mount(MatAside, {
      props: { blockSize: 64, bordered: true },
    });
    expect(wrapper.classes()).toContain('mat-aside--bordered');
  });

  it('modelValue 控制打开与关闭，并发出对应事件', async () => {
    vi.useFakeTimers();
    const wrapper = mount(MatAside, {
      props: { blockSize: 64, modelValue: true },
    });

    expect(wrapper.classes()).toContain('mat-aside--open');

    await wrapper.setProps({ modelValue: false });
    await settle();
    await vi.advanceTimersByTimeAsync(200);
    await settle();
    expect(wrapper.emitted('closed')).toBeTruthy();

    await wrapper.setProps({ modelValue: true });
    await settle();
    await vi.advanceTimersByTimeAsync(200);
    await settle();
    expect(wrapper.emitted('opened')).toBeTruthy();
    vi.useRealTimers();
  });

  it('在 MatAppRoot 下自动将 left 注册为 start 并获得 AppRoot 避让', async () => {
    const wrapper = mount(MatAppRoot, {
      attachTo: document.body,
      props: { fillViewport: false },
      slots: {
        default: () => [
          h(MatAside, { location: 'left', blockSize: 80 }),
        ],
      },
    });

    const asideElement = wrapper.element.querySelector('.mat-aside--left');
    vi.spyOn(wrapper.element, 'getBoundingClientRect').mockReturnValue(rect({
      bottom: 600, height: 600, right: 800, width: 800,
    }));
    vi.spyOn(asideElement, 'getBoundingClientRect').mockReturnValue(rect({
      bottom: 600, height: 600, right: 80, width: 80,
    }));

    window.dispatchEvent(new Event('resize'));
    await settle();

    expect(asideElement).toBeTruthy();
    wrapper.unmount();
  });
});
