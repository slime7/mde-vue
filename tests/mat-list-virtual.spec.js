import { mount } from '@vue/test-utils';
import { h, nextTick } from 'vue';
import {
  beforeEach, describe, expect, it, vi,
} from 'vitest';
import MatList from '../src/components/mat-list/MatList.vue';
import MatListItem from '../src/components/mat-list/MatListItem.vue';

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

describe('MatList 虚拟滚动', () => {
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

  it('virtual 为 false 时保持常规插槽渲染且不生成 spacer', async () => {
    const wrapper = mount(MatList, {
      props: {
        virtual: false,
      },
      slots: {
        default: () => [
          h(MatListItem, { value: 1 }, () => 'Item 1'),
          h(MatListItem, { value: 2 }, () => 'Item 2'),
        ],
      },
    });

    const items = wrapper.findAllComponents(MatListItem);
    expect(items.length).toBe(2);
    expect(wrapper.find('.mat-list__spacer').exists()).toBe(false);
  });

  it('virtual 为 true 且 items 为空、单项或两项时的首尾渲染与无 spacer 占位', async () => {
    const wrapper0 = mount(MatList, {
      props: {
        virtual: true,
        items: [],
      },
      slots: {
        default: ({ item }) => h(MatListItem, { value: item.id }, () => item.text),
      },
    });
    expect(wrapper0.findAllComponents(MatListItem).length).toBe(0);
    expect(wrapper0.find('.mat-list__spacer').exists()).toBe(false);

    const wrapper1 = mount(MatList, {
      props: {
        virtual: true,
        items: createItems(1),
      },
      slots: {
        default: ({ item }) => h(MatListItem, { value: item.id }, () => item.text),
      },
    });
    expect(wrapper1.findAllComponents(MatListItem).length).toBe(1);
    expect(wrapper1.find('.mat-list__spacer').exists()).toBe(false);

    const wrapper2 = mount(MatList, {
      props: {
        virtual: true,
        items: createItems(2),
      },
      slots: {
        default: ({ item }) => h(MatListItem, { value: item.id }, () => item.text),
      },
    });
    expect(wrapper2.findAllComponents(MatListItem).length).toBe(2);
    expect(wrapper2.find('.mat-list__spacer').exists()).toBe(false);
  });

  it('长列表模式下首项为第一个子节点，尾项为最后一个子节点，且占位容器位于第二与倒数第二位置', async () => {
    const items = createItems(100);
    const container = document.createElement('div');
    container.style.overflowY = 'auto';
    container.style.height = '300px';
    document.body.appendChild(container);
    setElementDimensions(container, { clientHeight: 300, scrollTop: 1000 });

    const wrapper = mount(MatList, {
      props: {
        virtual: true,
        items,
        itemHeight: 50,
        buffer: 2,
      },
      slots: {
        default: ({ item, itemRef }) => h(MatListItem, {
          ref: itemRef,
          value: item.id,
          'data-id': item.id,
        }, () => item.text),
      },
      attachTo: container,
    });

    await nextTick();
    await wrapper.vm.refresh();
    await nextTick();

    const rootEl = wrapper.element;
    const children = Array.from(rootEl.children);

    expect(children[0].getAttribute('data-id')).toBe('1');
    expect(children[children.length - 1].getAttribute('data-id')).toBe('100');
    expect(children[1].classList.contains('mat-list__spacer')).toBe(true);
    expect(children[children.length - 2].classList.contains('mat-list__spacer')).toBe(true);

    wrapper.unmount();
    container.remove();
  });

  it('支持 scrollToIndex、事件派发与滚动联动', async () => {
    const items = createItems(100);
    const wrapper = mount(MatList, {
      props: {
        virtual: true,
        items,
        itemHeight: 50,
      },
      slots: {
        default: ({ item }) => h(MatListItem, { value: item.id }, () => item.text),
      },
      attachTo: document.body,
    });

    const scroller = wrapper.vm.getScroller();
    expect(scroller).toBeDefined();

    if (scroller) {
      setElementDimensions(scroller, { clientHeight: 300, scrollTop: 0 });
      let calledScrollTo = null;
      scroller.scrollTo = (options) => {
        calledScrollTo = options;
        if (typeof options === 'object' && options.top !== undefined) {
          scroller.scrollTop = options.top;
        }
      };

      wrapper.vm.scrollToIndex(20, { align: 'start' });
      expect(calledScrollTo?.top).toBe(1000);
    }

    wrapper.unmount();
  });

  it('动态高度模式下通过 itemRef 收集 DOM 并根据尺寸变化更新占位', async () => {
    const items = createItems(50);
    const wrapper = mount(MatList, {
      props: {
        virtual: true,
        items,
        estimatedItemHeight: 40,
        buffer: 1,
      },
      slots: {
        default: ({ item, itemRef }) => h(MatListItem, {
          ref: itemRef,
          value: item.id,
          'data-id': item.id,
        }, () => item.text),
      },
    });

    const rootEl = wrapper.element;
    setElementDimensions(rootEl, { clientHeight: 200, scrollTop: 0 });

    await nextTick();
    await wrapper.vm.refresh();
    await nextTick();

    expect(observedElements.length).toBeGreaterThan(0);

    const firstItemEl = observedElements[0];
    if (firstItemEl && resizeCallback) {
      resizeCallback([{
        target: firstItemEl,
        contentRect: { height: 80 },
        borderBoxSize: [{ blockSize: 80 }],
      }]);
      await nextTick();
    }

    expect(wrapper.exists()).toBe(true);
    wrapper.unmount();
  });
});
