import { mount } from '@vue/test-utils';
import { h } from 'vue';
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

function dispatchPointer(target, type, options = {}) {
  const event = new MouseEvent(type, {
    bubbles: true,
    button: options.button ?? 0,
    buttons: options.buttons ?? (type === 'pointerup' ? 0 : 1),
    cancelable: true,
    clientX: options.clientX ?? 0,
  });

  Object.defineProperties(event, {
    pointerId: { value: options.pointerId ?? 1 },
    pointerType: { value: options.pointerType ?? 'mouse' },
  });
  target.dispatchEvent(event);

  return event;
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
    ['vertical', 'y mandatory'],
    ['y', 'y mandatory'],
    ['v', 'y mandatory'],
    ['horizontal', 'x mandatory'],
    ['x', 'x mandatory'],
    ['h', 'x mandatory'],
  ])('orientation=%s 为滚动元素设置对应轴的停靠模式', (orientation, expected) => {
    const wrapper = mount(MatScrollArea, {
      props: {
        orientation,
        snap: 'mandatory',
      },
    });

    expect(wrapper.vm.getScroller().style.scrollSnapType).toBe(expected);
  });

  it('支持切换停靠强度和关闭滚动停靠', async () => {
    const wrapper = mount(MatScrollArea, {
      props: { snap: 'proximity' },
    });
    const scroller = wrapper.vm.getScroller();

    expect(scroller.style.scrollSnapType).toBe('y proximity');

    await wrapper.setProps({ snap: 'mandatory' });
    expect(scroller.style.scrollSnapType).toBe('y mandatory');

    await wrapper.setProps({ snap: 'none' });
    expect(scroller.style.scrollSnapType).toBe('none');
  });

  it('在当前滚动轴两端设置停靠内边距，并随方向切换', async () => {
    const wrapper = mount(MatScrollArea, {
      props: {
        snap: 'mandatory',
        snapPadding: 24,
      },
    });
    const scroller = wrapper.vm.getScroller();

    expect(scroller.style.scrollPaddingTop).toBe('24px');
    expect(scroller.style.scrollPaddingBottom).toBe('24px');
    expect(scroller.style.scrollPaddingLeft).toBe('');
    expect(scroller.style.scrollPaddingRight).toBe('');

    await wrapper.setProps({ orientation: 'horizontal' });

    expect(scroller.style.scrollPaddingTop).toBe('');
    expect(scroller.style.scrollPaddingBottom).toBe('');
    expect(scroller.style.scrollPaddingLeft).toBe('24px');
    expect(scroller.style.scrollPaddingRight).toBe('24px');
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
    expect(wrapper.text()).not.toContain('固定开头');
    expect(wrapper.text()).not.toContain('固定结尾');
    expect(wrapper.text()).toContain('滚动内容');
  });

  it('默认不接管横向指针拖拽', () => {
    const onClick = vi.fn();
    const wrapper = mount(MatScrollArea, {
      props: { orientation: 'horizontal' },
      slots: {
        default: () => h('button', { onClick }, '内容'),
      },
    });
    const scroller = wrapper.vm.getScroller();
    const button = wrapper.get('button').element;

    setScrollLayout(scroller, { scrollLeft: 100 });
    dispatchPointer(button, 'pointerdown', { clientX: 100 });
    dispatchPointer(button, 'pointermove', { clientX: 60 });
    dispatchPointer(button, 'pointerup', { clientX: 60 });
    button.click();

    expect(scroller.scrollLeft).toBe(100);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it.each(['mouse', 'pen'])('%s 主操作可按住拖动横向滚动', (pointerType) => {
    const wrapper = mount(MatScrollArea, {
      props: {
        dragScroll: true,
        orientation: 'horizontal',
      },
    });
    const scroller = wrapper.vm.getScroller();
    const setPointerCapture = vi.fn();

    scroller.setPointerCapture = setPointerCapture;
    setScrollLayout(scroller, { scrollLeft: 100 });
    dispatchPointer(scroller, 'pointerdown', {
      clientX: 120,
      pointerId: 4,
      pointerType,
    });
    dispatchPointer(scroller, 'pointermove', {
      clientX: 90,
      pointerId: 4,
      pointerType,
    });

    expect(scroller.scrollLeft).toBe(130);
    expect(setPointerCapture).toHaveBeenCalledWith(4);
  });

  it('只在超过阈值后抑制紧随拖拽的点击', () => {
    const onClick = vi.fn();
    const wrapper = mount(MatScrollArea, {
      props: {
        dragScroll: true,
        orientation: 'horizontal',
      },
      slots: {
        default: () => h('button', { onClick }, '内容'),
      },
    });
    const scroller = wrapper.vm.getScroller();
    const button = wrapper.get('button').element;

    scroller.setPointerCapture = vi.fn();
    setScrollLayout(scroller, { scrollLeft: 100 });
    dispatchPointer(button, 'pointerdown', { clientX: 100, pointerId: 1 });
    dispatchPointer(button, 'pointermove', { clientX: 97, pointerId: 1 });
    dispatchPointer(button, 'pointerup', { clientX: 97, pointerId: 1 });
    button.click();

    expect(onClick).toHaveBeenCalledOnce();

    dispatchPointer(button, 'pointerdown', { clientX: 100, pointerId: 2 });
    dispatchPointer(button, 'pointermove', { clientX: 90, pointerId: 2 });
    dispatchPointer(scroller, 'pointerup', { clientX: 90, pointerId: 2 });
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });

    button.dispatchEvent(clickEvent);

    expect(clickEvent.defaultPrevented).toBe(true);
    expect(onClick).toHaveBeenCalledOnce();

    button.click();
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it.each([
    ['touch', 0],
    ['mouse', 2],
  ])('忽略 pointerType=%s、button=%s 的拖拽', (pointerType, button) => {
    const wrapper = mount(MatScrollArea, {
      props: {
        dragScroll: true,
        orientation: 'horizontal',
      },
    });
    const scroller = wrapper.vm.getScroller();

    setScrollLayout(scroller, { scrollLeft: 100 });
    dispatchPointer(scroller, 'pointerdown', {
      button,
      clientX: 100,
      pointerId: 3,
      pointerType,
    });
    dispatchPointer(scroller, 'pointermove', {
      button,
      clientX: 50,
      pointerId: 3,
      pointerType,
    });

    expect(scroller.scrollLeft).toBe(100);
  });

  it('忽略非活动 pointer，并在取消或关闭能力后允许后续点击', async () => {
    const onClick = vi.fn();
    const wrapper = mount(MatScrollArea, {
      props: {
        dragScroll: true,
        orientation: 'horizontal',
      },
      slots: {
        default: () => h('button', { onClick }, '内容'),
      },
    });
    const scroller = wrapper.vm.getScroller();
    const button = wrapper.get('button').element;

    scroller.setPointerCapture = vi.fn();
    setScrollLayout(scroller, { scrollLeft: 100 });
    dispatchPointer(button, 'pointerdown', { clientX: 100, pointerId: 1 });
    dispatchPointer(button, 'pointermove', { clientX: 50, pointerId: 2 });
    expect(scroller.scrollLeft).toBe(100);

    dispatchPointer(button, 'pointercancel', { clientX: 100, pointerId: 1 });
    button.click();
    expect(onClick).toHaveBeenCalledOnce();

    dispatchPointer(button, 'pointerdown', { clientX: 100, pointerId: 3 });
    dispatchPointer(button, 'pointermove', { clientX: 80, pointerId: 3 });
    await wrapper.setProps({ dragScroll: false });
    button.click();

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('失去 pointer capture 后结束拖拽并只抑制一次点击', () => {
    const onClick = vi.fn();
    const wrapper = mount(MatScrollArea, {
      props: {
        dragScroll: true,
        orientation: 'horizontal',
      },
      slots: {
        default: () => h('button', { onClick }, '内容'),
      },
    });
    const scroller = wrapper.vm.getScroller();
    const button = wrapper.get('button').element;

    scroller.setPointerCapture = vi.fn();
    setScrollLayout(scroller, { scrollLeft: 100 });
    dispatchPointer(button, 'pointerdown', { clientX: 100, pointerId: 8 });
    dispatchPointer(button, 'pointermove', { clientX: 80, pointerId: 8 });
    dispatchPointer(scroller, 'lostpointercapture', { pointerId: 8 });
    button.click();
    button.click();

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('卸载时释放活动 pointer capture', () => {
    const wrapper = mount(MatScrollArea, {
      props: {
        dragScroll: true,
        orientation: 'horizontal',
      },
    });
    const scroller = wrapper.vm.getScroller();
    const releasePointerCapture = vi.fn();

    scroller.setPointerCapture = vi.fn();
    scroller.hasPointerCapture = () => true;
    scroller.releasePointerCapture = releasePointerCapture;
    dispatchPointer(scroller, 'pointerdown', { clientX: 100, pointerId: 9 });
    dispatchPointer(scroller, 'pointermove', { clientX: 80, pointerId: 9 });
    wrapper.unmount();

    expect(releasePointerCapture).toHaveBeenCalledWith(9);
  });
});
