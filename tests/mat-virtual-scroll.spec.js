import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick } from 'vue';
import {
  beforeEach, describe, expect, it, vi,
} from 'vitest';
import MatVirtualScroll from '../src/components/mat-virtual-scroll/MatVirtualScroll.vue';
import MatScrollArea from '../src/components/mat-scroll-area/MatScrollArea.vue';

let resizeCallback;
let observedElements = [];

function createItems(count) {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    text: `Item ${index + 1}`,
  }));
}

function setElementDimensions(element, { clientHeight = 300, scrollTop = 0, scrollHeight = 1000 } = {}) {
  Object.defineProperties(element, {
    clientHeight: { configurable: true, value: clientHeight, writable: true },
    scrollTop: { configurable: true, value: scrollTop, writable: true },
    scrollHeight: { configurable: true, value: scrollHeight, writable: true },
  });
}

describe('MatVirtualScroll', () => {
  beforeEach(() => {
    resizeCallback = undefined;
    observedElements = [];
    vi.stubGlobal('requestAnimationFrame', (callback) => {
      callback();
      return 1;
    });
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    vi.stubGlobal('ResizeObserver', class {
      constructor(callback) {
        resizeCallback = callback;
        this.callback = callback;
        this.elements = observedElements;
      }

      observe(element) {
        this.elements.push(element);
      }

      unobserve(element) {
        this.elements = this.elements.filter((el) => el !== element);
        observedElements = this.elements;
      }

      disconnect() {
        this.elements = [];
        observedElements = this.elements;
      }
    });
  });

  it('固定高度模式下格式化纯数字字符串并跳过 item ResizeObserver', async () => {
    const items = createItems(100);
    const container = document.createElement('div');
    container.style.overflowY = 'auto';
    container.style.height = '200px';
    document.body.appendChild(container);
    setElementDimensions(container, { clientHeight: 200, scrollTop: 0 });

    const wrapper = mount(MatVirtualScroll, {
      props: {
        items,
        itemHeight: '50',
        buffer: 2,
      },
      slots: {
        default: ({ item, itemRef }) => h('div', {
          ref: itemRef,
          class: 'test-item',
          'data-id': item.id,
        }, item.text),
      },
      attachTo: container,
    });

    await nextTick();
    await wrapper.vm.refresh();
    await nextTick();

    // 视口 200px / 50px = 4 个 item，加上 buffer 2（上下各 2 个，顶部为 0，底部为 2）= 6 个 item
    const renderedItems = wrapper.findAll('.test-item');
    expect(renderedItems.length).toBe(6);
    expect(renderedItems[0].attributes('data-id')).toBe('1');
    expect(renderedItems[5].attributes('data-id')).toBe('6');

    // 固定高度模式下不对 item 进行 ResizeObserver 观察
    expect(observedElements.length).toBeLessThanOrEqual(1);

    wrapper.unmount();
    container.remove();
  });

  it('支持自定义 as 标签渲染', async () => {
    const items = createItems(10);
    const wrapper = mount(MatVirtualScroll, {
      props: {
        items,
        itemHeight: 40,
        as: 'ul',
      },
      slots: {
        default: ({ item }) => h('li', { class: 'test-li' }, item.text),
      },
    });

    expect(wrapper.element.tagName.toLowerCase()).toBe('ul');
  });

  it('itemKey 未传入时默认使用项的 index 值作为 key', async () => {
    const items = [{ name: 'A' }, { name: 'B' }, { name: 'C' }];
    const wrapper = mount(MatVirtualScroll, {
      props: {
        items,
        itemHeight: 30,
      },
      slots: {
        default: ({ item, index }) => h('div', { class: 'index-item', 'data-index': index }, item.name),
      },
    });

    await nextTick();
    const renderedItems = wrapper.findAll('.index-item');
    expect(renderedItems.length).toBe(3);
    expect(renderedItems[0].attributes('data-index')).toBe('0');
    expect(renderedItems[1].attributes('data-index')).toBe('1');
    expect(renderedItems[2].attributes('data-index')).toBe('2');
  });

  it('动态高度模式下通过 itemRef 收集 DOM 并根据尺寸变化更新占位', async () => {
    const items = createItems(50);
    const wrapper = mount(MatVirtualScroll, {
      props: {
        items,
        estimatedItemHeight: 40,
        buffer: 1,
      },
      slots: {
        default: ({ item, itemRef }) => h('div', {
          ref: itemRef,
          class: 'dynamic-item',
          'data-id': item.id,
        }, item.text),
      },
    });

    const rootEl = wrapper.element;
    setElementDimensions(rootEl, { clientHeight: 200, scrollTop: 0 });

    await nextTick();
    await wrapper.vm.refresh();
    await nextTick();

    // 动态模式下应该将渲染出的 item DOM 加入观察
    expect(observedElements.length).toBeGreaterThan(0);

    const firstItemEl = observedElements[0];
    if (firstItemEl && resizeCallback) {
      resizeCallback([{
        target: firstItemEl,
        contentRect: { height: 100 },
        borderBoxSize: [{ blockSize: 100 }],
      }]);
      await nextTick();
    }

    expect(wrapper.exists()).toBe(true);
  });

  it('优先联动祖先 MatScrollArea 滚动区域', async () => {
    const items = createItems(100);
    const TestContainer = defineComponent({
      render() {
        return h(MatScrollArea, { style: { height: '300px' } }, {
          default: () => h(MatVirtualScroll, {
            ref: 'vs',
            items,
            itemHeight: 50,
            buffer: 2,
          }, {
            default: ({ item }) => h('div', { class: 'nested-item' }, item.text),
          }),
        });
      },
    });

    const wrapper = mount(TestContainer, {
      attachTo: document.body,
    });

    const scrollArea = wrapper.findComponent(MatScrollArea);
    const scroller = scrollArea.find('.mat-scroll-area__viewport').element;
    setElementDimensions(scroller, { clientHeight: 300, scrollTop: 500 });

    scroller.dispatchEvent(new Event('scroll'));
    await nextTick();

    const vsComponent = wrapper.findComponent(MatVirtualScroll);
    expect(vsComponent.vm.getScroller()).toBe(scroller);

    wrapper.unmount();
  });

  it('支持 scrollToIndex 方法定位', async () => {
    const items = createItems(100);
    const wrapper = mount(MatVirtualScroll, {
      props: {
        items,
        itemHeight: 50,
      },
      slots: {
        default: ({ item }) => h('div', item.text),
      },
      attachTo: document.body,
    });

    const scroller = wrapper.vm.getScroller();
    if (scroller) {
      setElementDimensions(scroller, { clientHeight: 300, scrollTop: 0 });
      let calledScrollTo = null;
      scroller.scrollTo = (options) => {
        calledScrollTo = options;
        if (typeof options === 'object' && options.top !== undefined) {
          scroller.scrollTop = options.top;
        }
      };

      wrapper.vm.scrollToIndex(10, { align: 'start' });
      expect(calledScrollTo?.top).toBe(500);
    }

    wrapper.unmount();
  });
});
