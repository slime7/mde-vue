/* eslint-disable vue/one-component-per-file -- 测试内组件只用于读取同一布局上下文。 */
import { mount } from '@vue/test-utils';
import {
  defineComponent, h, isReadonly, nextTick, onMounted,
} from 'vue';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import MatAppRoot from '../src/components/mat-app-root/MatAppRoot.vue';
import { useMatApp } from '../src/components/mat-app-root/mat-app-root-context';

function rect({
  bottom, height, left = 0, right, top = 0, width,
}) {
  return {
    bottom,
    height,
    left,
    right,
    top,
    width,
    x: left,
    y: top,
    toJSON() {},
  };
}

async function settleLayout() {
  await nextTick();
  await nextTick();
}

describe('MatAppRoot', () => {
  beforeEach(() => {
    vi.stubGlobal('requestAnimationFrame', (callback) => {
      callback();
      return 1;
    });
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    vi.stubGlobal('ResizeObserver', class {
      observe() {
        return this;
      }

      disconnect() {
        return this;
      }
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('提供同一个只读响应式布局对象，并按 AppRoot 宽度计算五档断点', async () => {
    let app;
    const Consumer = defineComponent({
      setup() {
        app = useMatApp();
        expect(useMatApp()).toBe(app);
        return () => h('span', app.layout.breakpoint);
      },
    });
    const wrapper = mount(MatAppRoot, {
      attachTo: document.body,
      slots: { default: () => h(Consumer) },
    });
    const sizes = [
      [599, 'compact', 0, 599],
      [600, 'medium', 600, 839],
      [840, 'expanded', 840, 1199],
      [1200, 'large', 1200, 1599],
      [1600, 'extra-large', 1600, Infinity],
    ];

    expect(isReadonly(app.layout)).toBe(true);
    expect(useMatApp).toBeTypeOf('function');

    const assertBreakpoint = async ([current, ...remaining]) => {
      if (!current) {
        return;
      }

      const [width, name, min, max] = current;

      vi.spyOn(wrapper.element, 'getBoundingClientRect').mockReturnValue(rect({
        bottom: 700,
        height: 700,
        right: width,
        width,
      }));
      window.dispatchEvent(new Event('resize'));
      await settleLayout();

      expect(app.layout.size.width).toBe(width);
      expect(app.layout.breakpoint).toBe(name);
      expect(app.layout.breakpointRange).toEqual({ min, max });
      await assertBreakpoint(remaining);
    };

    await assertBreakpoint(sizes);

    wrapper.unmount();
  });

  it('在上下文外调用 useMatApp 时抛出明确错误，并禁止嵌套 AppRoot', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const OutsideConsumer = defineComponent({
      setup() {
        useMatApp();
        return () => null;
      },
    });

    expect(() => mount(OutsideConsumer)).toThrow(
      'useMatApp() 必须在 MatAppRoot 内调用',
    );
    expect(() => mount(MatAppRoot, {
      slots: { default: () => h(MatAppRoot) },
    })).toThrow('MatAppRoot 不允许嵌套');
  });

  it('允许同一父级存在多个同级 AppRoot', () => {
    const wrapper = mount(defineComponent({
      setup() {
        return () => h('div', [
          h(MatAppRoot, { fillViewport: false }, () => '第一个'),
          h(MatAppRoot, { fillViewport: false }, () => '第二个'),
        ]);
      },
    }));

    expect(wrapper.text()).toContain('第一个');
    expect(wrapper.text()).toContain('第二个');
  });

  it('注册边缘后计算 padding、content 和同侧最大外延，并在更新与注销后同步', async () => {
    const topElement = document.createElement('header');
    const tallerTopElement = document.createElement('header');
    const handles = [];
    let app;
    const Consumer = defineComponent({
      setup() {
        app = useMatApp();
        onMounted(() => {
          handles.push(app.registerEdge({ edge: 'top', element: topElement }));
          handles.push(app.registerEdge({ edge: 'top', element: tallerTopElement }));
        });
        return () => null;
      },
    });
    const wrapper = mount(MatAppRoot, {
      props: { fillViewport: false },
      slots: { default: () => h(Consumer) },
    });

    vi.spyOn(wrapper.element, 'getBoundingClientRect').mockReturnValue(rect({
      bottom: 500,
      height: 500,
      left: 20,
      right: 820,
      top: 0,
      width: 800,
    }));
    vi.spyOn(topElement, 'getBoundingClientRect').mockReturnValue(rect({
      bottom: 64,
      height: 64,
      left: 20,
      right: 820,
      width: 800,
    }));
    const tallerRect = vi.spyOn(tallerTopElement, 'getBoundingClientRect')
      .mockReturnValue(rect({
        bottom: 80,
        height: 80,
        left: 20,
        right: 820,
        width: 800,
      }));

    handles[0].update();
    await settleLayout();

    expect(app.layout.padding).toEqual({
      bottom: 0,
      end: 0,
      start: 0,
      top: 80,
    });
    expect(app.layout.content).toEqual({ width: 800, height: 420 });

    tallerRect.mockReturnValue(rect({
      bottom: 48,
      height: 48,
      left: 20,
      right: 820,
      width: 800,
    }));
    handles[1].update();
    await settleLayout();
    expect(app.layout.padding.top).toBe(64);

    handles[0].unregister();
    await settleLayout();
    expect(app.layout.padding.top).toBe(48);

    wrapper.unmount();
  });

  it('按注册顺序把较早的正交边缘作为后注册组件的只读 inset', async () => {
    const topElement = document.createElement('header');
    const startElement = document.createElement('aside');
    let app;
    let startHandle;
    const Consumer = defineComponent({
      setup() {
        app = useMatApp();
        onMounted(() => {
          app.registerEdge({ edge: 'top', element: topElement });
          startHandle = app.registerEdge({ edge: 'start', element: startElement });
        });
        return () => null;
      },
    });
    const wrapper = mount(MatAppRoot, {
      props: { fillViewport: false },
      slots: { default: () => h(Consumer) },
    });

    vi.spyOn(wrapper.element, 'getBoundingClientRect').mockReturnValue(rect({
      bottom: 600,
      height: 600,
      right: 900,
      width: 900,
    }));
    vi.spyOn(topElement, 'getBoundingClientRect').mockReturnValue(rect({
      bottom: 64,
      height: 64,
      right: 900,
      width: 900,
    }));
    vi.spyOn(startElement, 'getBoundingClientRect').mockReturnValue(rect({
      bottom: 600,
      height: 536,
      right: 96,
      top: 64,
      width: 96,
    }));

    startHandle.update();
    await settleLayout();

    expect(isReadonly(startHandle.insets)).toBe(true);
    expect(startHandle.insets).toEqual({ start: 64, end: 0 });
    expect(app.layout.edges.start).toEqual({
      endInset: 0,
      size: 96,
      startInset: 64,
    });

    wrapper.unmount();
  });

  it('拒绝非法 edge、非 HTMLElement 和重复注销后的更新', async () => {
    let app;
    const Consumer = defineComponent({
      setup() {
        app = useMatApp();
        return () => null;
      },
    });
    const wrapper = mount(MatAppRoot, {
      slots: { default: () => h(Consumer) },
    });

    expect(() => app.registerEdge({ edge: 'left', element: document.body }))
      .toThrow('registerEdge() 的 edge 必须是 top、bottom、start 或 end');
    expect(() => app.registerEdge({ edge: 'top', element: {} }))
      .toThrow('registerEdge() 的 element 必须是当前 document 中的 HTMLElement');

    const handle = app.registerEdge({ edge: 'bottom', element: document.body });

    handle.unregister();
    expect(handle.unregister).not.toThrow();
    expect(handle.update).not.toThrow();

    wrapper.unmount();
  });

  it('默认采用文档滚动模式，并允许显式切换为内部滚动模式', () => {
    expect(MatAppRoot.props.fillViewport.default).toBe(true);
    expect(MatAppRoot.props.scrollable.default).toBe(false);

    const wrapper = mount(MatAppRoot, {
      props: { scrollable: true },
      slots: { default: () => h('p', '正文') },
    });

    expect(wrapper.attributes('data-scrollable')).toBe('true');
    expect(wrapper.text()).toContain('正文');
  });
});
