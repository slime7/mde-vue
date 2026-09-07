/* eslint-disable vue/one-component-per-file -- 测试内组件只用于读取同一布局上下文。 */
/* eslint-disable class-methods-use-this */
import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick } from 'vue';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import MatLayout from '../src/components/mat-layout/MatLayout.vue';
import MatAside from '../src/components/mat-aside/MatAside.vue';
import { useLayout } from '../src/components/mat-layout/layout-context';

function rect({
  bottom, height, left = 0, right, top = 0, width,
}) {
  return {
    bottom, height, left, right, top, width, x: left, y: top, toJSON() {},
  };
}

async function settle() {
  await nextTick();
  await nextTick();
}

describe('MatLayout 布局容器', () => {
  beforeEach(() => {
    vi.stubGlobal('requestAnimationFrame', (cb) => {
      cb();
      return 1;
    });
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    vi.stubGlobal('ResizeObserver', class {
      observe() {}

      unobserve() {}

      disconnect() {}
    });
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('默认渲染 div 容器，支持 as 属性定制根标签', () => {
    const defaultWrapper = mount(MatLayout);
    expect(defaultWrapper.element.tagName).toBe('DIV');
    expect(defaultWrapper.classes()).toContain('mat-layout');
    const sectionWrapper = mount(MatLayout, { props: { as: 'section' } });
    expect(sectionWrapper.element.tagName).toBe('SECTION');
  });

  it('提供 useLayout 上下文，无布局容器调用时抛出错误', () => {
    const Stray = defineComponent({
      setup() {
        useLayout();
        return () => null;
      },
    });
    expect(() => mount(Stray)).toThrow('useLayout() 必须在 MatLayout 内调用');
  });

  it('Top 在前、Left 在后时：Top 占满横向，Left 避让 Top', async () => {
    let layoutData;
    const Capture = defineComponent({
      setup() {
        layoutData = useLayout();
        return () => h('div', { class: 'main-content' }, 'content');
      },
    });

    const wrapper = mount(MatLayout, {
      attachTo: document.body,
      slots: {
        default: () => [
          h(MatAside, { location: 'top', blockSize: 64 }),
          h(MatAside, { location: 'left', blockSize: 200 }),
          h(Capture),
        ],
      },
    });

    const topElement = wrapper.element.querySelector('.mat-aside--top');
    const leftElement = wrapper.element.querySelector('.mat-aside--left');

    vi.spyOn(wrapper.element, 'getBoundingClientRect').mockReturnValue(rect({
      bottom: 600, height: 600, right: 800, width: 800,
    }));
    vi.spyOn(topElement, 'getBoundingClientRect').mockReturnValue(rect({
      bottom: 64, height: 64, right: 800, width: 800,
    }));
    vi.spyOn(leftElement, 'getBoundingClientRect').mockReturnValue(rect({
      bottom: 600, height: 536, right: 200, top: 64, width: 200,
    }));

    window.dispatchEvent(new Event('resize'));
    await settle();

    expect(layoutData.padding.top).toBe(64);
    expect(layoutData.padding.left).toBe(200);
    expect(topElement.style.getPropertyValue('--mat-aside-insets-left')).toBe('0px');
    expect(topElement.style.getPropertyValue('--mat-aside-insets-right')).toBe('0px');
    expect(leftElement.style.getPropertyValue('--mat-aside-insets-top')).toBe('64px');

    wrapper.unmount();
  });

  it('Left 在前、Top 在后时：Left 占满纵向，Top 避让 Left', async () => {
    let layoutData;
    const Capture = defineComponent({
      setup() {
        layoutData = useLayout();
        return () => h('div', { class: 'main-content' }, 'content');
      },
    });

    const wrapper = mount(MatLayout, {
      attachTo: document.body,
      slots: {
        default: () => [
          h(MatAside, { location: 'left', blockSize: 200 }),
          h(MatAside, { location: 'top', blockSize: 64 }),
          h(Capture),
        ],
      },
    });

    const leftElement = wrapper.element.querySelector('.mat-aside--left');
    const topElement = wrapper.element.querySelector('.mat-aside--top');

    vi.spyOn(wrapper.element, 'getBoundingClientRect').mockReturnValue(rect({
      bottom: 600, height: 600, right: 800, width: 800,
    }));
    vi.spyOn(leftElement, 'getBoundingClientRect').mockReturnValue(rect({
      bottom: 600, height: 600, right: 200, top: 0, width: 200,
    }));
    vi.spyOn(topElement, 'getBoundingClientRect').mockReturnValue(rect({
      bottom: 64, height: 64, left: 200, right: 800, width: 600,
    }));

    window.dispatchEvent(new Event('resize'));
    await settle();

    expect(layoutData.padding.top).toBe(64);
    expect(layoutData.padding.left).toBe(200);
    expect(leftElement.style.getPropertyValue('--mat-aside-insets-top')).toBe('0px');
    expect(leftElement.style.getPropertyValue('--mat-aside-insets-bottom')).toBe('0px');
    expect(topElement.style.getPropertyValue('--mat-aside-insets-left')).toBe('200px');

    wrapper.unmount();
  });

  it('四边缘同时存在时，内容区内边距正确累加各个方向厚度', async () => {
    let layoutData;
    const Capture = defineComponent({
      setup() {
        layoutData = useLayout();
        return () => h('div', 'content');
      },
    });

    const wrapper = mount(MatLayout, {
      attachTo: document.body,
      slots: {
        default: () => [
          h(MatAside, { location: 'top', blockSize: 50 }),
          h(MatAside, { location: 'bottom', blockSize: 60 }),
          h(MatAside, { location: 'left', blockSize: 70 }),
          h(MatAside, { location: 'right', blockSize: 80 }),
          h(Capture),
        ],
      },
    });

    const topEl = wrapper.element.querySelector('.mat-aside--top');
    const bottomEl = wrapper.element.querySelector('.mat-aside--bottom');
    const leftEl = wrapper.element.querySelector('.mat-aside--left');
    const rightEl = wrapper.element.querySelector('.mat-aside--right');

    vi.spyOn(wrapper.element, 'getBoundingClientRect').mockReturnValue(rect({
      bottom: 800, height: 800, right: 1000, width: 1000,
    }));
    vi.spyOn(topEl, 'getBoundingClientRect').mockReturnValue(rect({
      bottom: 50, height: 50, right: 1000, width: 1000,
    }));
    vi.spyOn(bottomEl, 'getBoundingClientRect').mockReturnValue(rect({
      bottom: 800, height: 60, top: 740, right: 1000, width: 1000,
    }));
    vi.spyOn(leftEl, 'getBoundingClientRect').mockReturnValue(rect({
      bottom: 740, height: 690, top: 50, right: 70, width: 70,
    }));
    vi.spyOn(rightEl, 'getBoundingClientRect').mockReturnValue(rect({
      bottom: 740, height: 690, top: 50, left: 920, right: 1000, width: 80,
    }));

    window.dispatchEvent(new Event('resize'));
    await settle();

    expect(layoutData.padding.top).toBe(50);
    expect(layoutData.padding.bottom).toBe(60);
    expect(layoutData.padding.left).toBe(70);
    expect(layoutData.padding.right).toBe(80);

    wrapper.unmount();
  });
});
