import { mount } from '@vue/test-utils';
import { h, nextTick, ref } from 'vue';
import {
  beforeEach, describe, expect, it, vi,
} from 'vitest';
import MatLoading from '../src/components/mat-loading/MatLoading.vue';
import MatPullToRefresh from '../src/components/mat-pull-to-refresh/MatPullToRefresh.vue';
import MatScrollArea from '../src/components/mat-scroll-area/MatScrollArea.vue';
import { MAT_SCROLL_AREA_KEY } from '../src/components/scroll-area-context';

function createScroller(orientation = 'vertical', position = 0) {
  const element = document.createElement('div');
  const positionName = orientation === 'horizontal' ? 'scrollLeft' : 'scrollTop';

  Object.defineProperty(element, positionName, {
    configurable: true,
    value: position,
    writable: true,
  });

  return element;
}

function mountComponent(props = {}, orientation = 'vertical', scroller = createScroller(orientation)) {
  const refreshing = ref(props.modelValue ?? false);
  const wrapper = mount(MatPullToRefresh, {
    props: { ...props, modelValue: refreshing.value },
    attrs: {
      'onUpdate:modelValue': (value) => {
        refreshing.value = value;
        wrapper.setProps({ modelValue: value });
      },
    },
    global: {
      provide: {
        [MAT_SCROLL_AREA_KEY]: {
          getScroller: () => scroller,
          scrollTo: () => {},
          scroller: ref(scroller),
          orientation: ref(orientation),
        },
      },
    },
  });

  return { wrapper, scroller, refreshing };
}

function dispatchPointer(target, type, options = {}) {
  const event = new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    button: 0,
    buttons: type === 'pointerup' || type === 'pointercancel' ? 0 : 1,
    clientX: options.clientX ?? 0,
    clientY: options.clientY ?? 0,
  });

  Object.defineProperties(event, {
    pointerId: { value: options.pointerId ?? 1 },
    pointerType: { value: options.pointerType ?? 'mouse' },
  });
  target.dispatchEvent(event);

  return event;
}

function dispatchWheel(target, deltas = {}) {
  const event = new MouseEvent('wheel', {
    bubbles: true,
    cancelable: true,
  });

  Object.defineProperties(event, {
    deltaX: { value: deltas.deltaX ?? 0 },
    deltaY: { value: deltas.deltaY ?? 0 },
  });
  target.dispatchEvent(event);

  return event;
}

describe('MatPullToRefresh', () => {
  let rafQueue;
  let rafNow;

  function flushFrames(maxFrames = 60) {
    for (let i = 0; i < maxFrames && rafQueue.size > 0; i += 1) {
      const callbacks = [...rafQueue.values()];
      const frameTime = rafNow + 16;

      rafQueue.clear();
      rafNow = frameTime;
      callbacks.forEach((callback) => callback(frameTime));
    }
  }

  beforeEach(() => {
    rafQueue = new Map();
    rafNow = 0;
    let frameId = 0;
    vi.stubGlobal('requestAnimationFrame', (callback) => {
      frameId += 1;
      rafQueue.set(frameId, callback);
      return frameId;
    });
    vi.stubGlobal('cancelAnimationFrame', (id) => {
      rafQueue.delete(id);
    });
  });

  it('在 scroll-area 外仍可渲染但手势不可用', () => {
    const wrapper = mount(MatPullToRefresh);

    expect(wrapper.find('[role="progressbar"]').exists()).toBe(true);

    dispatchPointer(wrapper.element, 'pointerdown', { clientY: 10 });
    dispatchPointer(wrapper.element, 'pointermove', { clientY: 300 });
    dispatchPointer(wrapper.element, 'pointerup', { clientY: 300 });
    dispatchWheel(wrapper.element, { deltaY: -80 });

    expect(wrapper.emitted('refresh')).toBeUndefined();
  });

  it('垂直方向在顶部拉动超过触发距离后释放触发刷新', async () => {
    const { wrapper, scroller } = mountComponent();

    dispatchPointer(scroller, 'pointerdown', { clientY: 100 });
    dispatchPointer(scroller, 'pointermove', { clientY: 270 });
    dispatchPointer(scroller, 'pointerup', { clientY: 270 });
    await nextTick();

    expect(wrapper.emitted('refresh')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]]);
  });

  it('拉动未达到触发距离时释放取消刷新，之后仍可再次触发', async () => {
    const { wrapper, scroller } = mountComponent();

    dispatchPointer(scroller, 'pointerdown', { clientY: 100 });
    dispatchPointer(scroller, 'pointermove', { clientY: 150 });
    dispatchPointer(scroller, 'pointerup', { clientY: 150 });
    flushFrames();
    await nextTick();

    expect(wrapper.emitted('refresh')).toBeUndefined();
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    dispatchPointer(scroller, 'pointerdown', { clientY: 100 });
    dispatchPointer(scroller, 'pointermove', { clientY: 270 });
    dispatchPointer(scroller, 'pointerup', { clientY: 270 });
    await nextTick();

    expect(wrapper.emitted('refresh')).toHaveLength(1);
  });

  it('不在起点边界时拖拽不触发刷新', () => {
    const { wrapper, scroller } = mountComponent(
      {},
      'vertical',
      createScroller('vertical', 40),
    );

    dispatchPointer(scroller, 'pointerdown', { clientY: 100 });
    dispatchPointer(scroller, 'pointermove', { clientY: 270 });
    dispatchPointer(scroller, 'pointerup', { clientY: 270 });

    expect(wrapper.emitted('refresh')).toBeUndefined();
  });

  it('先向内容方向拖动时放弃手势', () => {
    const { wrapper, scroller } = mountComponent();

    dispatchPointer(scroller, 'pointerdown', { clientY: 200 });
    dispatchPointer(scroller, 'pointermove', { clientY: 190 });
    dispatchPointer(scroller, 'pointermove', { clientY: 400 });
    dispatchPointer(scroller, 'pointerup', { clientY: 400 });

    expect(wrapper.emitted('refresh')).toBeUndefined();
  });

  it('pointercancel 取消进行中的拉动手势', () => {
    const { wrapper, scroller } = mountComponent();

    dispatchPointer(scroller, 'pointerdown', { clientY: 100 });
    dispatchPointer(scroller, 'pointermove', { clientY: 270 });
    dispatchPointer(scroller, 'pointercancel', { clientY: 270 });

    expect(wrapper.emitted('refresh')).toBeUndefined();
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('拉动手势接管后抑制紧随的点击', () => {
    const { scroller } = mountComponent();

    dispatchPointer(scroller, 'pointerdown', { clientY: 100 });
    dispatchPointer(scroller, 'pointermove', { clientY: 150 });
    dispatchPointer(scroller, 'pointerup', { clientY: 150 });

    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    scroller.dispatchEvent(clickEvent);

    expect(clickEvent.defaultPrevented).toBe(true);
  });

  it.each([
    ['120', 250, true],
    ['120', 170, false],
    ['abc', 170, true],
  ])('triggerDistance=%s 拉动 %s px 释放后应否触发为 %s', async (value, pull, shouldTrigger) => {
    const { wrapper, scroller } = mountComponent({ triggerDistance: value });

    dispatchPointer(scroller, 'pointerdown', { clientY: 100 });
    dispatchPointer(scroller, 'pointermove', { clientY: 100 + pull });
    dispatchPointer(scroller, 'pointerup', { clientY: 100 + pull });
    await nextTick();

    if (shouldTrigger) {
      expect(wrapper.emitted('refresh')).toHaveLength(1);
    } else {
      expect(wrapper.emitted('refresh')).toBeUndefined();
    }
  });

  it('透传 size、color、containment 给内部 loading', () => {
    const { wrapper } = mountComponent({
      size: 60,
      color: 'secondary',
      containment: true,
    });
    const loading = wrapper.findComponent(MatLoading);

    expect(loading.props('size')).toBe(60);
    expect(loading.props('color')).toBe('secondary');
    expect(loading.props('containment')).toBe(true);
  });

  it('未设置 loading 属性时使用 loading 默认值', () => {
    const { wrapper } = mountComponent();
    const loading = wrapper.findComponent(MatLoading);

    expect(loading.props('size')).toBe(48);
    expect(loading.props('containment')).toBe(false);
  });

  it('刷新中重复拉动不重复触发，结束后可再次触发', async () => {
    const { wrapper, scroller } = mountComponent();
    const pull = async () => {
      dispatchPointer(scroller, 'pointerdown', { clientY: 100 });
      dispatchPointer(scroller, 'pointermove', { clientY: 270 });
      dispatchPointer(scroller, 'pointerup', { clientY: 270 });
      flushFrames();
      await nextTick();
    };

    await pull();
    expect(wrapper.emitted('refresh')).toHaveLength(1);

    await pull();
    expect(wrapper.emitted('refresh')).toHaveLength(1);

    await wrapper.setProps({ modelValue: false });
    flushFrames();
    await pull();

    expect(wrapper.emitted('refresh')).toHaveLength(2);
  });

  it('外部把 modelValue 置回 false 后拉动手势仍可用', async () => {
    const { wrapper, scroller } = mountComponent();

    await wrapper.setProps({ modelValue: true });
    await wrapper.setProps({ modelValue: false });
    flushFrames();

    dispatchPointer(scroller, 'pointerdown', { clientY: 100 });
    dispatchPointer(scroller, 'pointermove', { clientY: 270 });
    dispatchPointer(scroller, 'pointerup', { clientY: 270 });
    await nextTick();

    expect(wrapper.emitted('refresh')).toHaveLength(1);
  });

  it('滚轮在顶部朝界外滚动累积到阈值后立即触发', () => {
    const { wrapper, scroller } = mountComponent();

    dispatchWheel(scroller, { deltaY: -60 });
    dispatchWheel(scroller, { deltaY: -60 });
    const third = dispatchWheel(scroller, { deltaY: -60 });

    expect(wrapper.emitted('refresh')).toHaveLength(1);
    expect(third.defaultPrevented).toBe(true);
  });

  it('滚轮反向滚动取消累积', () => {
    const { wrapper, scroller } = mountComponent();

    dispatchWheel(scroller, { deltaY: -60 });
    dispatchWheel(scroller, { deltaY: 60 });
    dispatchWheel(scroller, { deltaY: -60 });
    dispatchWheel(scroller, { deltaY: -60 });

    expect(wrapper.emitted('refresh')).toBeUndefined();
  });

  it('内容实际滚动时重置滚轮累积', () => {
    const { wrapper, scroller } = mountComponent();

    dispatchWheel(scroller, { deltaY: -60 });
    scroller.dispatchEvent(new Event('scroll'));
    dispatchWheel(scroller, { deltaY: -60 });
    dispatchWheel(scroller, { deltaY: -60 });

    expect(wrapper.emitted('refresh')).toBeUndefined();
  });

  it('水平方向在起点向右拉动触发刷新', async () => {
    const { wrapper, scroller } = mountComponent({}, 'horizontal');

    dispatchPointer(scroller, 'pointerdown', { clientX: 100 });
    dispatchPointer(scroller, 'pointermove', { clientX: 270 });
    dispatchPointer(scroller, 'pointerup', { clientX: 270 });
    await nextTick();

    expect(wrapper.emitted('refresh')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]]);
  });

  it('水平方向不在起点边界时不触发', () => {
    const { wrapper, scroller } = mountComponent(
      {},
      'horizontal',
      createScroller('horizontal', 40),
    );

    dispatchPointer(scroller, 'pointerdown', { clientX: 100 });
    dispatchPointer(scroller, 'pointermove', { clientX: 270 });
    dispatchPointer(scroller, 'pointerup', { clientX: 270 });

    expect(wrapper.emitted('refresh')).toBeUndefined();
  });

  it('水平方向滚轮朝界外滚动累积触发', () => {
    const { wrapper, scroller } = mountComponent({}, 'horizontal');

    dispatchWheel(scroller, { deltaX: -60 });
    dispatchWheel(scroller, { deltaX: -60 });
    dispatchWheel(scroller, { deltaX: -60 });

    expect(wrapper.emitted('refresh')).toHaveLength(1);
  });

  it('禁用时拖拽不触发刷新', () => {
    const { wrapper, scroller } = mountComponent({ disabled: true });

    dispatchPointer(scroller, 'pointerdown', { clientY: 100 });
    dispatchPointer(scroller, 'pointermove', { clientY: 270 });
    dispatchPointer(scroller, 'pointerup', { clientY: 270 });

    expect(wrapper.emitted('refresh')).toBeUndefined();
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('禁用时滚轮不触发也不吞掉滚动', () => {
    const { wrapper, scroller } = mountComponent({ disabled: true });

    const first = dispatchWheel(scroller, { deltaY: -60 });
    const second = dispatchWheel(scroller, { deltaY: -60 });
    const third = dispatchWheel(scroller, { deltaY: -60 });

    expect(wrapper.emitted('refresh')).toBeUndefined();
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    expect(first.defaultPrevented).toBe(false);
    expect(second.defaultPrevented).toBe(false);
    expect(third.defaultPrevented).toBe(false);
  });

  it('拉动手势进行中变为禁用时释放不再触发刷新', async () => {
    const { wrapper, scroller } = mountComponent();

    dispatchPointer(scroller, 'pointerdown', { clientY: 100 });
    dispatchPointer(scroller, 'pointermove', { clientY: 270 });
    await wrapper.setProps({ disabled: true });
    flushFrames();

    dispatchPointer(scroller, 'pointerup', { clientY: 270 });

    expect(wrapper.emitted('refresh')).toBeUndefined();
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('滚轮累积中变为禁用时取消累积', async () => {
    const { wrapper, scroller } = mountComponent();

    dispatchWheel(scroller, { deltaY: -60 });
    await wrapper.setProps({ disabled: true });

    dispatchWheel(scroller, { deltaY: -60 });
    dispatchWheel(scroller, { deltaY: -60 });

    expect(wrapper.emitted('refresh')).toBeUndefined();
  });

  it('禁用后重新启用可再次触发刷新', async () => {
    const { wrapper, scroller } = mountComponent({ disabled: true });

    dispatchPointer(scroller, 'pointerdown', { clientY: 100 });
    dispatchPointer(scroller, 'pointermove', { clientY: 270 });
    dispatchPointer(scroller, 'pointerup', { clientY: 270 });

    await wrapper.setProps({ disabled: false });

    dispatchPointer(scroller, 'pointerdown', { clientY: 100 });
    dispatchPointer(scroller, 'pointermove', { clientY: 270 });
    dispatchPointer(scroller, 'pointerup', { clientY: 270 });
    await nextTick();

    expect(wrapper.emitted('refresh')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]]);
  });

  it('与 mat-scroll-area 集成并跟随方向切换', async () => {
    const refreshing = ref(false);
    const wrapper = mount(MatScrollArea, {
      slots: {
        default: () => [
          h(MatPullToRefresh, {
            modelValue: refreshing.value,
            'onUpdate:modelValue': (value) => {
              refreshing.value = value;
            },
          }),
          h('ul', ['内容甲', '内容乙'].map((text) => h('li', text))),
        ],
      },
    });
    const scroller = wrapper.vm.getScroller();
    await nextTick();

    dispatchPointer(scroller, 'pointerdown', { clientY: 0 });
    dispatchPointer(scroller, 'pointermove', { clientY: 170 });
    dispatchPointer(scroller, 'pointerup', { clientY: 170 });
    await nextTick();

    expect(refreshing.value).toBe(true);

    refreshing.value = false;
    await nextTick();
    flushFrames();
    await wrapper.setProps({ orientation: 'horizontal' });
    await nextTick();

    dispatchPointer(scroller, 'pointerdown', { clientX: 0 });
    dispatchPointer(scroller, 'pointermove', { clientX: 170 });
    dispatchPointer(scroller, 'pointerup', { clientX: 170 });
    await nextTick();

    expect(refreshing.value).toBe(true);
  });
});
