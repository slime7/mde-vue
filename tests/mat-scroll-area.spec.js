import { mount } from '@vue/test-utils';
import {
  beforeEach, describe, expect, it, vi,
} from 'vitest';
import MatScrollArea from '../src/components/mat-scroll-area/MatScrollArea.vue';

let resizeCallback;

function setScrollLayout(element, values) {
  Object.entries(values).forEach(([name, value]) => {
    Object.defineProperty(element, name, {
      configurable: true,
      value,
      writable: true,
    });
  });
}

async function syncLayout(wrapper) {
  resizeCallback?.();
  await wrapper.vm.$nextTick();
}

describe('MatScrollArea', () => {
  beforeEach(() => {
    resizeCallback = undefined;
    vi.stubGlobal('requestAnimationFrame', (callback) => {
      callback();
      return 1;
    });
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    vi.stubGlobal('ResizeObserver', class {
      constructor(callback) {
        resizeCallback = callback;
        this.callback = callback;
      }

      observe() {
        return this.callback;
      }

      disconnect() {
        this.callback = undefined;
      }
    });
  });

  it.each([
    ['vertical', 'scrollTop', 'scrollHeight', 'clientHeight'],
    ['y', 'scrollTop', 'scrollHeight', 'clientHeight'],
    ['v', 'scrollTop', 'scrollHeight', 'clientHeight'],
    ['horizontal', 'scrollLeft', 'scrollWidth', 'clientWidth'],
    ['x', 'scrollLeft', 'scrollWidth', 'clientWidth'],
    ['h', 'scrollLeft', 'scrollWidth', 'clientWidth'],
  ])('orientation=%s 使用正确滚动轴触发末端事件', async (
    orientation,
    positionName,
    scrollSizeName,
    clientSizeName,
  ) => {
    const wrapper = mount(MatScrollArea, {
      props: {
        orientation,
        reachThreshold: 20,
      },
    });
    const scroller = wrapper.vm.getScroller();

    setScrollLayout(scroller, {
      [clientSizeName]: 100,
      [positionName]: 0,
      [scrollSizeName]: 500,
    });
    await syncLayout(wrapper);

    scroller[positionName] = 381;
    await scroller.dispatchEvent(new Event('scroll'));

    expect(wrapper.emitted('reach-end')).toHaveLength(1);
    expect(wrapper.emitted('reach-end')[0][0]).toEqual({
      distance: 19,
      target: scroller,
    });
  });

  it('分侧阈值只在滚动进入对应区域时触发一次，并在离开后重新启用', async () => {
    const wrapper = mount(MatScrollArea, {
      props: {
        reachThreshold: { start: 30, end: 50 },
      },
    });
    const scroller = wrapper.vm.getScroller();

    setScrollLayout(scroller, {
      clientHeight: 100,
      scrollHeight: 500,
      scrollTop: 200,
    });
    await syncLayout(wrapper);

    scroller.scrollTop = 25;
    scroller.dispatchEvent(new Event('scroll'));
    scroller.scrollTop = 10;
    scroller.dispatchEvent(new Event('scroll'));

    expect(wrapper.emitted('reach-start')).toHaveLength(1);
    expect(wrapper.emitted('reach-start')[0][0]).toEqual({
      distance: 25,
      target: scroller,
    });

    scroller.scrollTop = 100;
    scroller.dispatchEvent(new Event('scroll'));
    scroller.scrollTop = 30;
    scroller.dispatchEvent(new Event('scroll'));

    expect(wrapper.emitted('reach-start')).toHaveLength(2);

    scroller.scrollTop = 351;
    scroller.dispatchEvent(new Event('scroll'));

    expect(wrapper.emitted('reach-end')).toHaveLength(1);
    expect(wrapper.emitted('reach-end')[0][0].distance).toBe(49);
  });

  it('横向滚动兼容 RTL 的负 scrollLeft', async () => {
    const wrapper = mount(MatScrollArea, {
      props: {
        orientation: 'horizontal',
        reachThreshold: 20,
      },
    });
    const scroller = wrapper.vm.getScroller();

    setScrollLayout(scroller, {
      clientWidth: 100,
      scrollLeft: 0,
      scrollWidth: 500,
    });
    await syncLayout(wrapper);

    scroller.scrollLeft = -381;
    scroller.dispatchEvent(new Event('scroll'));

    expect(wrapper.emitted('reach-end')).toHaveLength(1);
    expect(wrapper.emitted('reach-end')[0][0].distance).toBe(19);
  });

  it('初次布局和非滚动同步保持静默', async () => {
    const wrapper = mount(MatScrollArea, {
      props: { reachThreshold: 20 },
    });
    const scroller = wrapper.vm.getScroller();

    setScrollLayout(scroller, {
      clientHeight: 100,
      scrollHeight: 500,
      scrollTop: 390,
    });
    await syncLayout(wrapper);
    await wrapper.setProps({ reachThreshold: 30 });
    await syncLayout(wrapper);

    expect(wrapper.emitted('reach-start')).toBeUndefined();
    expect(wrapper.emitted('reach-end')).toBeUndefined();
  });

  it('公开滚动元素和 scrollTo，并把原生属性与监听器交给滚动元素', async () => {
    const onScroll = vi.fn();
    const wrapper = mount(MatScrollArea, {
      attrs: {
        'aria-label': '消息记录',
        class: 'consumer-area',
        onScroll,
        style: 'block-size: 240px',
        tabindex: '0',
      },
      slots: {
        default: '<p>滚动内容</p>',
        'fixed-start': '<strong>固定开头</strong>',
        'fixed-end': '<strong>固定结尾</strong>',
      },
    });
    const scroller = wrapper.vm.getScroller();
    const scrollTo = vi.fn();

    scroller.scrollTo = scrollTo;
    wrapper.vm.scrollTo({ top: 120, behavior: 'smooth' });
    scroller.dispatchEvent(new Event('scroll'));

    expect(scrollTo).toHaveBeenCalledWith({ top: 120, behavior: 'smooth' });
    expect(scroller.getAttribute('aria-label')).toBe('消息记录');
    expect(scroller.getAttribute('tabindex')).toBe('0');
    expect(wrapper.classes()).toContain('consumer-area');
    expect(wrapper.attributes('style')).toContain('block-size: 240px');
    expect(onScroll).toHaveBeenCalledOnce();
    expect(wrapper.text()).toContain('固定开头');
    expect(wrapper.text()).toContain('固定结尾');
    expect(wrapper.text()).toContain('滚动内容');
  });
});
