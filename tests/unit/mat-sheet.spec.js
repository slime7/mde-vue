import { flushPromises, mount } from '@vue/test-utils';
import {
  afterEach, beforeAll, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { h, nextTick } from 'vue';
import {
  resolveBottomSheetDragGeometry,
  resolveBottomSheetDragTarget,
  resolveBottomSheetFlick,
  resolveBottomSheetGestureAction,
  resolveBottomSheetKeyboardTarget,
  resolveBottomSheetTiers,
} from '../../src/components/bottom-sheet-drag';
import MatSheetBase from '../../src/components/MatSheetBase.vue';
import MatBottomSheet from '../../src/components/mat-bottom-sheet/MatBottomSheet.vue';
import MatSideSheet from '../../src/components/mat-side-sheet/MatSideSheet.vue';

beforeAll(() => {
  Object.defineProperty(HTMLDialogElement.prototype, 'show', {
    configurable: true,
    value() {
      this.setAttribute('open', '');
    },
  });
  Object.defineProperty(HTMLDialogElement.prototype, 'close', {
    configurable: true,
    value() {
      this.removeAttribute('open');
    },
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  Reflect.deleteProperty(Element.prototype, 'getAnimations');
});

async function settleRender() {
  await nextTick();
  await nextTick();
}

function setViewportWidth(width) {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    value: width,
  });
}

function dispatchPointer(target, type, init) {
  const event = new Event(type, {
    bubbles: true,
    cancelable: true,
  });

  Object.entries(init).forEach(([name, value]) => {
    Object.defineProperty(event, name, {
      configurable: true,
      value,
    });
  });
  target.dispatchEvent(event);
}

function stubExtent(element, height) {
  vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
    bottom: height,
    height,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
  });
}

/**
 * 用可控的 ResizeObserver 替身替代浏览器实现，便于手动触发尺寸回调。
 */
function stubResizeObserver() {
  const instances = [];

  class FakeResizeObserver {
    constructor(callback) {
      this.callback = callback;
      this.targets = [];
      instances.push(this);
    }

    disconnect() {
      this.targets = [];
    }

    observe(target) {
      this.targets.push(target);
    }
  }

  vi.stubGlobal('ResizeObserver', FakeResizeObserver);

  return {
    instances,
    trigger() {
      instances.forEach((instance) => instance.callback([], instance));
    },
  };
}

/**
 * 给 Bottom sheet 模拟一次真实布局：面板高度与内容完整高度分别设定，供拖拽分档使用。
 * 窄屏可用高度为 768 - 72 = 696px，因此 normal 上限是 348px。
 */
function stubBottomSheetLayout(panel, { contentHeight, panelHeight }) {
  stubExtent(panel, panelHeight);

  const handle = panel.querySelector('.mat-sheet__drag-handle-target');
  const body = panel.querySelector('.mat-sheet__content-body');

  if (handle) {
    stubExtent(handle, 48);
  }

  if (body) {
    stubExtent(body, Math.max(0, contentHeight - 48));
  }
}

/**
 * 在把手上完成一次拖动；slow 为 true 时让拖动持续 2 秒，避免被判定为向下甩动。
 */
async function dragHandleTo(handle, {
  from,
  pointerId = 1,
  pointerType = 'touch',
  slow = true,
  target = window,
  to,
}) {
  dispatchPointer(handle, 'pointerdown', {
    button: 0,
    clientY: from,
    pointerId,
    pointerType,
  });

  if (slow) {
    await vi.advanceTimersByTimeAsync(2000);
  }

  dispatchPointer(target, 'pointermove', { clientY: to, pointerId });
  dispatchPointer(target, 'pointerup', { clientY: to, pointerId });
}

/**
 * 在内容区完成一次触摸拖动；slow 为 true 时让拖动持续 2 秒，避免被判定为甩动。
 */
async function dragContentTo(content, {
  from,
  pointerId = 1,
  pointerType = 'touch',
  slow = true,
  to,
}) {
  dispatchPointer(content, 'pointerdown', {
    button: 0,
    clientY: from,
    pointerId,
    pointerType,
  });

  if (slow) {
    await vi.advanceTimersByTimeAsync(2000);
  }

  dispatchPointer(window, 'pointermove', { clientY: to, pointerId });
  dispatchPointer(window, 'pointerup', { clientY: to, pointerId });
}

describe('MatBottomSheet', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    setViewportWidth(500);
  });

  it('standard 在声明位置与主内容共存，不锁滚动或主动移动焦点', async () => {
    const trigger = document.createElement('button');

    trigger.textContent = '页面操作';
    document.body.append(trigger);
    trigger.focus();
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        modelValue: true,
        variant: 'standard',
      },
      slots: {
        default: '<h2>筛选</h2><p>筛选条件</p>',
      },
    });

    await settleRender();

    const sheet = wrapper.get('aside');

    expect(sheet.text()).toContain('筛选');
    expect(sheet.text()).toContain('筛选条件');
    expect(document.documentElement.style.overflow).not.toBe('hidden');
    expect(document.activeElement).toBe(trigger);
  });

  it('公开 container-color 属性并转交给共享 Sheet 表面', () => {
    expect(MatBottomSheet.props.containerColor.default).toBe(false);
    expect(MatBottomSheet.props.containerColor.type).toBe(Boolean);

    const wrapper = mount(MatBottomSheet, {
      props: {
        containerColor: true,
      },
    });

    expect(wrapper.findComponent(MatSheetBase).props('containerColor')).toBe(true);
  });

  it('公开 shadow、rounded 和新的 expanded 类型与默认值', async () => {
    expect(MatBottomSheet.props.shadow.default).toBe(true);
    expect(MatBottomSheet.props.shadow.type).toBe(Boolean);
    expect(MatBottomSheet.props.rounded.default).toBe(true);
    expect(MatBottomSheet.props.rounded.type).toBe(Boolean);
    expect(MatBottomSheet.props.expanded.default).toBe('normal');
    expect(MatBottomSheet.props.expanded.type).toEqual([String, Number]);

    const isValidExpanded = MatBottomSheet.props.expanded.validator;

    expect(isValidExpanded('min')).toBe(true);
    expect(isValidExpanded('normal')).toBe(true);
    expect(isValidExpanded('max')).toBe(true);
    expect(isValidExpanded('full')).toBe(true);
    expect(isValidExpanded(320)).toBe(true);
    expect(isValidExpanded('320px')).toBe(true);
    expect(isValidExpanded('50dvh')).toBe(true);
    expect(isValidExpanded('invalid-height')).toBe(false);

    const wrapper = mount(MatBottomSheet, {
      props: {
        modelValue: true,
        shadow: false,
        rounded: false,
        variant: 'standard',
      },
    });
    await settleRender();

    const sheet = wrapper.find('aside');

    expect(wrapper.findComponent(MatSheetBase).props('rounded')).toBe(false);
    expect(wrapper.findComponent(MatSheetBase).props('shadow')).toBe(false);
    expect(sheet.classes()).toContain('mat-sheet--no-rounded');
    expect(sheet.classes()).toContain('mat-sheet--no-shadow');
  });

  it('自定义展开高度低于 64px 时只把渲染高度限制为 64px', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        expanded: '32px',
        modelValue: true,
        variant: 'standard',
      },
    });

    await settleRender();

    expect(wrapper.props('expanded')).toBe('32px');
    expect(wrapper.get('aside').element.style.getPropertyValue('--mat-sheet-expanded-block-size'))
      .toBe('max(64px, 32px)');
  });

  it('normal 与 max 使用实测内容高度，让各档位高度可以过渡', async () => {
    const { trigger } = stubResizeObserver();
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        content: '长内容',
        modelValue: true,
        variant: 'modal',
      },
      attrs: {
        'aria-label': '实测高度',
      },
    });

    await settleRender();

    const sheet = document.body.querySelector('dialog');
    const panel = sheet.querySelector('.mat-sheet__panel--bottom');

    stubExtent(sheet, 768);
    stubBottomSheetLayout(panel, { contentHeight: 500, panelHeight: 348 });
    trigger();
    await settleRender();

    expect(sheet.style.getPropertyValue('--mat-sheet-expanded-block-size'))
      .toBe('max(64px, min(500px, calc(var(--mat-sheet-full-block-size) / 2)))');

    await wrapper.setProps({ expanded: 'max' });
    await settleRender();

    expect(sheet.style.getPropertyValue('--mat-sheet-expanded-block-size'))
      .toBe('max(64px, min(500px, var(--mat-sheet-full-block-size)))');

    await wrapper.setProps({ expanded: 'min' });
    await settleRender();

    expect(sheet.style.getPropertyValue('--mat-sheet-expanded-block-size'))
      .toBe('var(--mat-sheet-min-block-size)');
  });

  it('内容高度变化后 normal 与 max 的实测高度随之更新', async () => {
    const { trigger } = stubResizeObserver();
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        content: '长内容',
        modelValue: true,
        variant: 'standard',
      },
    });

    await settleRender();

    const sheet = wrapper.get('aside').element;

    stubBottomSheetLayout(sheet, { contentHeight: 500, panelHeight: 348 });
    trigger();
    await settleRender();

    expect(sheet.style.getPropertyValue('--mat-sheet-expanded-block-size'))
      .toContain('500px');

    stubBottomSheetLayout(sheet, { contentHeight: 900, panelHeight: 348 });
    trigger();
    await settleRender();

    expect(sheet.style.getPropertyValue('--mat-sheet-expanded-block-size'))
      .toContain('900px');
  });

  it('无法测量内容高度时 normal 与 max 仍按内容自然高度渲染', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        modelValue: true,
        variant: 'standard',
      },
    });

    await settleRender();

    const sheet = wrapper.get('aside').element;

    expect(sheet.style.getPropertyValue('--mat-sheet-expanded-block-size')).toBe('');
    expect(sheet.style.getPropertyValue('--mat-sheet-max-block-size'))
      .toBe('calc(var(--mat-sheet-full-block-size) / 2)');
  });

  it('modal 使用原生 dialog，关闭完成后清理并恢复焦点', async () => {
    const trigger = document.createElement('button');

    trigger.textContent = '打开筛选';
    document.body.append(trigger);
    trigger.focus();
    const wrapper = mount(MatBottomSheet, {
      props: {
        modelValue: true,
        variant: 'modal',
      },
      attrs: {
        'aria-label': '筛选面板',
      },
      slots: {
        default: '<button>应用</button>',
      },
    });

    await settleRender();

    const sheet = document.body.querySelector('dialog');

    expect(sheet?.open).toBe(true);
    expect(document.documentElement.style.overflow).toBe('hidden');
    expect(document.activeElement?.textContent).toBe('应用');
    await vi.advanceTimersByTimeAsync(400);

    expect(wrapper.emitted('opened')).toHaveLength(1);

    await wrapper.setProps({ modelValue: false });

    expect(document.body.contains(sheet)).toBe(true);
    await vi.advanceTimersByTimeAsync(200);
    await nextTick();

    expect(document.body.contains(sheet)).toBe(false);
    expect(document.documentElement.style.overflow).not.toBe('hidden');
    expect(document.activeElement).toBe(trigger);
    expect(wrapper.emitted('closed')).toHaveLength(1);
  });

  it('退出动画尚未被浏览器报告时，仍保留 DOM 至后备时长结束', async () => {
    Object.defineProperty(Element.prototype, 'getAnimations', {
      configurable: true,
      value() {
        return [];
      },
    });

    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        modelValue: true,
        variant: 'standard',
      },
    });

    await settleRender();
    const sheet = wrapper.get('aside').element;

    await wrapper.setProps({ modelValue: false });
    await nextTick();

    expect(document.body.contains(sheet)).toBe(true);

    await vi.advanceTimersByTimeAsync(199);

    expect(document.body.contains(sheet)).toBe(true);

    await vi.advanceTimersByTimeAsync(1);
    await nextTick();

    expect(document.body.contains(sheet)).toBe(false);
  });

  it('auto 在窄屏使用 modal，在宽屏使用 standard', async () => {
    const compact = mount(MatBottomSheet, {
      props: {
        modelValue: true,
      },
      attrs: {
        'aria-label': '窄屏面板',
      },
    });

    await settleRender();

    expect(document.body.querySelector('dialog')).not.toBeNull();
    compact.unmount();
    document.body.replaceChildren();
    document.documentElement.removeAttribute('style');
    setViewportWidth(1200);

    const expanded = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        modelValue: true,
      },
      attrs: {
        'aria-label': '宽屏面板',
      },
    });

    await settleRender();

    expect(expanded.find('aside').exists()).toBe(true);
    expect(document.body.querySelector('dialog')).toBeNull();
  });

  it('auto 在打开期间跨越断点时切换 modal 与 standard', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        modelValue: true,
      },
      attrs: {
        'aria-label': '响应式切换面板',
      },
    });

    await settleRender();

    expect(document.body.querySelector('dialog')?.open).toBe(true);
    expect(document.documentElement.style.overflow).toBe('hidden');

    setViewportWidth(1200);
    window.dispatchEvent(new Event('resize'));
    await settleRender();

    expect(wrapper.find('aside').exists()).toBe(true);
    expect(document.body.querySelector('dialog')).toBeNull();
    expect(document.documentElement.style.overflow).not.toBe('hidden');

    setViewportWidth(500);
    window.dispatchEvent(new Event('resize'));
    await settleRender();

    expect(document.body.querySelector('dialog')?.open).toBe(true);
    expect(document.documentElement.style.overflow).toBe('hidden');
  });

  it('从自定义 drag-handle 向下拖动达到阈值时请求关闭', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        modelValue: true,
        variant: 'standard',
      },
      slots: {
        'drag-handle': '<span data-testid="drag-handle">拖动</span>',
      },
    });

    await settleRender();

    const handle = wrapper.get('[data-testid="drag-handle"]').element;

    dispatchPointer(handle, 'pointerdown', {
      button: 0,
      clientY: 100,
      pointerId: 1,
      pointerType: 'touch',
    });
    dispatchPointer(window, 'pointermove', {
      clientY: 220,
      pointerId: 1,
    });
    dispatchPointer(window, 'pointerup', {
      clientY: 220,
      pointerId: 1,
    });

    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
  });

  it('从 normal 向上拖动把手到 max 区时请求 max', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        content: '长内容',
        modelValue: true,
        variant: 'standard',
      },
    });

    await settleRender();

    stubBottomSheetLayout(wrapper.get('aside').element, {
      contentHeight: 1048,
      panelHeight: 348,
    });

    const handle = wrapper.get('button[aria-label="展开底部面板"]').element;

    dispatchPointer(handle, 'pointerdown', {
      button: 0,
      clientY: 300,
      pointerId: 4,
      pointerType: 'touch',
    });
    dispatchPointer(window, 'pointermove', {
      clientY: 0,
      pointerId: 4,
    });
    dispatchPointer(window, 'pointerup', {
      clientY: 0,
      pointerId: 4,
    });

    expect(wrapper.emitted('update:expanded')).toEqual([['max']]);
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('折叠档内容区滚轮向下请求展开并阻止默认滚动', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        content: '长内容预览',
        modelValue: true,
        variant: 'modal',
      },
      attrs: {
        'aria-label': '滚轮展开',
      },
    });

    await settleRender();

    const content = document.body.querySelector('dialog .mat-sheet__content');

    expect(content).not.toBeNull();
    expect(wrapper.props('expanded')).toBe('normal');
    expect(wrapper.emitted('update:expanded')).toBeUndefined();

    content.dispatchEvent(new WheelEvent('wheel', {
      bubbles: true,
      cancelable: true,
      deltaY: -20,
    }));

    expect(wrapper.emitted('update:expanded')).toBeUndefined();

    const wheelDownEvent = new WheelEvent('wheel', {
      bubbles: true,
      cancelable: true,
      deltaY: 40,
    });

    content.dispatchEvent(wheelDownEvent);

    expect(wheelDownEvent.defaultPrevented).toBe(true);
    expect(wrapper.emitted('update:expanded')).toEqual([['max']]);
  });

  it('已展开档内容区滚轮向下不请求展开', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        content: '长内容预览',
        expanded: 'full',
        modelValue: true,
        variant: 'modal',
      },
      attrs: {
        'aria-label': '已展开滚轮',
      },
    });

    await settleRender();

    const content = document.body.querySelector('dialog .mat-sheet__content');

    content.dispatchEvent(new WheelEvent('wheel', {
      bubbles: true,
      cancelable: true,
      deltaY: 40,
    }));

    expect(wrapper.emitted('update:expanded')).toBeUndefined();
  });

  it('折叠档内容区触摸向上拖动越入 max 区时请求 max', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        content: '长内容',
        modelValue: true,
        variant: 'standard',
      },
    });

    await settleRender();

    const sheet = wrapper.get('aside').element;

    stubBottomSheetLayout(sheet, { contentHeight: 1048, panelHeight: 348 });

    const content = sheet.querySelector('.mat-sheet__content');

    await dragContentTo(content, { from: 300, pointerId: 30, to: 0 });

    expect(wrapper.emitted('update:expanded')).toEqual([['max']]);
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('折叠档内容区在滚动顶部缓慢下拖越入 min 区时请求 min', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        content: '长内容',
        modelValue: true,
        variant: 'standard',
      },
    });

    await settleRender();

    const sheet = wrapper.get('aside').element;

    stubBottomSheetLayout(sheet, { contentHeight: 1048, panelHeight: 348 });

    const content = sheet.querySelector('.mat-sheet__content');

    await dragContentTo(content, { from: 200, pointerId: 31, to: 400 });

    expect(wrapper.emitted('update:expanded')).toEqual([['min']]);
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('内容区快速向下甩动请求关闭', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        content: '长内容',
        modelValue: true,
        variant: 'standard',
      },
    });

    await settleRender();

    const sheet = wrapper.get('aside').element;

    stubBottomSheetLayout(sheet, { contentHeight: 1048, panelHeight: 348 });

    await dragContentTo(sheet.querySelector('.mat-sheet__content'), {
      from: 200,
      pointerId: 32,
      slow: false,
      to: 400,
    });

    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
  });

  it('折叠档内容区快速向上甩动请求 max', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        content: '长内容',
        modelValue: true,
        variant: 'standard',
      },
    });

    await settleRender();

    const sheet = wrapper.get('aside').element;

    stubBottomSheetLayout(sheet, { contentHeight: 1048, panelHeight: 348 });

    await dragContentTo(sheet.querySelector('.mat-sheet__content'), {
      from: 400,
      pointerId: 33,
      slow: false,
      to: 200,
    });

    expect(wrapper.emitted('update:expanded')).toEqual([['max']]);
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('内容已滚动时向下拖动不拦截原生滚动', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        content: '长内容',
        modelValue: true,
        variant: 'standard',
      },
    });

    await settleRender();

    const sheet = wrapper.get('aside').element;

    stubBottomSheetLayout(sheet, { contentHeight: 1048, panelHeight: 348 });

    const content = sheet.querySelector('.mat-sheet__content');
    const viewport = content.querySelector('.mat-scroll-area__viewport');

    viewport.scrollTop = 200;

    await dragContentTo(content, { from: 200, pointerId: 34, to: 400 });

    expect(wrapper.emitted('update:expanded')).toBeUndefined();
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('已展开档内容区向上拖动不拦截原生滚动', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        content: '长内容',
        expanded: 'max',
        modelValue: true,
        variant: 'standard',
      },
    });

    await settleRender();

    const sheet = wrapper.get('aside').element;

    stubBottomSheetLayout(sheet, { contentHeight: 1048, panelHeight: 696 });

    await dragContentTo(sheet.querySelector('.mat-sheet__content'), {
      from: 400,
      pointerId: 35,
      to: 100,
    });

    expect(wrapper.emitted('update:expanded')).toBeUndefined();
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('内容区向上拖动超过可用高度后剩余位移交给内容滚动', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        content: '长内容',
        modelValue: true,
        variant: 'standard',
      },
    });

    await settleRender();

    const sheet = wrapper.get('aside').element;

    stubBottomSheetLayout(sheet, { contentHeight: 1048, panelHeight: 348 });

    const content = sheet.querySelector('.mat-sheet__content');
    const viewport = content.querySelector('.mat-scroll-area__viewport');

    Object.defineProperty(viewport, 'scrollHeight', { configurable: true, value: 1000 });
    Object.defineProperty(viewport, 'clientHeight', { configurable: true, value: 200 });

    await dragContentTo(content, { from: 600, pointerId: 36, to: 0 });

    // 可用高度 696，拖动请求 948 的可见高度，超出部分 252 交给内容滚动。
    expect(viewport.scrollTop).toBe(252);
    expect(wrapper.emitted('update:expanded')).toEqual([['max']]);
  });

  it('内容区交互元素上的触摸拖动不建立手势', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        content: '长内容',
        modelValue: true,
        variant: 'standard',
      },
      slots: {
        default: '<button type="button">内容按钮</button>',
      },
    });

    await settleRender();

    const sheet = wrapper.get('aside').element;

    stubBottomSheetLayout(sheet, { contentHeight: 1048, panelHeight: 348 });

    await dragContentTo(sheet.querySelector('.mat-sheet__content button'), {
      from: 200,
      pointerId: 37,
      to: 0,
    });

    expect(wrapper.emitted('update:expanded')).toBeUndefined();
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('standard 把手点击不切换，键盘在折叠档与 max 之间循环', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        modelValue: true,
        variant: 'standard',
      },
    });

    await settleRender();

    const handle = wrapper.get('button[aria-label="展开底部面板"]');

    await handle.trigger('click');

    expect(wrapper.emitted('update:expanded')).toBeUndefined();

    await handle.trigger('keydown', { key: 'Enter' });

    expect(wrapper.emitted('update:expanded')).toEqual([['max']]);

    await wrapper.setProps({ expanded: 'max' });

    expect(wrapper.get('button[aria-label="折叠底部面板"]')).toBeTruthy();
    await wrapper.get('button[aria-label="折叠底部面板"]').trigger('keydown', { key: 'Enter' });

    expect(wrapper.emitted('update:expanded')).toEqual([['max'], ['normal']]);
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('full 状态向下拖动落回 normal 区时请求 normal', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        content: '长内容',
        expanded: 'full',
        modelValue: true,
        variant: 'standard',
      },
    });

    await settleRender();

    stubBottomSheetLayout(wrapper.get('aside').element, {
      contentHeight: 1048,
      panelHeight: 696,
    });

    const handle = wrapper.get('button[aria-label="折叠底部面板"]').element;

    await dragHandleTo(handle, { from: 100, to: 300, pointerId: 3 });

    expect(wrapper.emitted('update:expanded')).toEqual([['normal']]);
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('BottomSheet 不声明旧标题、关闭按钮属性，也不转发旧布局 Slot', async () => {
    expect(MatBottomSheet.props.closable).toBeUndefined();
    expect(MatBottomSheet.props.closeLabel).toBeUndefined();
    expect(MatBottomSheet.props.title).toBeUndefined();

    const wrapper = mount(MatBottomSheet, {
      props: {
        closable: true,
        closeLabel: '关闭旧入口',
        modelValue: true,
        title: '旧标题',
        variant: 'standard',
      },
      slots: {
        actions: '<button data-testid="actions">操作</button>',
        header: '<div data-testid="header">头部</div>',
        title: '<h2 data-testid="title">标题</h2>',
      },
    });

    await settleRender();

    expect(wrapper.find('[data-testid="actions"]').exists()).toBe(false);
    expect(wrapper.find('[data-testid="header"]').exists()).toBe(false);
    expect(wrapper.find('[data-testid="title"]').exists()).toBe(false);
    expect(wrapper.find('button[aria-label="关闭"]').exists()).toBe(false);
    expect(wrapper.get('aside').attributes('title')).toBeUndefined();
  });

  it('展开的 modal 把手通过键盘请求关闭', async () => {
    const wrapper = mount(MatBottomSheet, {
      props: {
        expanded: 'full',
        modelValue: true,
        variant: 'modal',
      },
      attrs: {
        'aria-label': '全屏详情',
      },
    });

    await settleRender();

    const handle = document.body.querySelector('dialog button[aria-label="关闭底部面板"]');

    handle.click();

    expect(wrapper.emitted('update:expanded')).toBeUndefined();
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    handle.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }));

    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
  });

  it('Escape 与 cancel 跟随 closeOnBack 请求更新', async () => {
    const wrapper = mount(MatBottomSheet, {
      props: {
        modelValue: true,
        variant: 'modal',
      },
      attrs: {
        'aria-label': '关闭行为',
      },
    });

    await settleRender();

    const sheet = document.body.querySelector('dialog');
    const cancelEvent = new Event('cancel', { cancelable: true });

    sheet.dispatchEvent(cancelEvent);

    expect(cancelEvent.defaultPrevented).toBe(true);
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);

    const escapeEvent = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 'Escape',
    });

    sheet.dispatchEvent(escapeEvent);

    expect(escapeEvent.defaultPrevented).toBe(true);
    expect(wrapper.emitted('update:modelValue')).toHaveLength(2);

    await wrapper.setProps({ closeOnBack: false });

    const blockedCancel = new Event('cancel', { cancelable: true });

    sheet.dispatchEvent(blockedCancel);

    expect(blockedCancel.defaultPrevented).toBe(true);
    expect(wrapper.emitted('update:modelValue')).toHaveLength(2);

    const blockedEscape = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 'Escape',
    });

    sheet.dispatchEvent(blockedEscape);

    expect(blockedEscape.defaultPrevented).toBe(false);
    expect(wrapper.emitted('update:modelValue')).toHaveLength(2);

    sheet.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    sheet.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      clientX: 20,
      clientY: 20,
    }));

    expect(wrapper.emitted('update:modelValue')).toHaveLength(2);
  });

  it('非 props 属性透传到 modal 根元素并可用于可访问名称', async () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});

    mount(MatBottomSheet, {
      props: {
        modelValue: true,
        variant: 'modal',
      },
      attrs: {
        'aria-label': '筛选面板',
        'data-testid': 'bottom-sheet',
        class: 'custom-sheet',
      },
      slots: {
        default: '<h2>自定义内容</h2>',
      },
    });
    await settleRender();

    const sheet = document.body.querySelector('dialog');

    expect(sheet?.getAttribute('aria-label')).toBe('筛选面板');
    expect(sheet?.getAttribute('data-testid')).toBe('bottom-sheet');
    expect(sheet?.classList.contains('custom-sheet')).toBe(true);
    expect(sheet?.textContent).toContain('自定义内容');
    expect(warning).not.toHaveBeenCalledWith(
      'MatBottomSheet: 必须通过 aria-label 或 aria-labelledby 提供可访问名称',
    );
  });

  it('min 与 normal 使用展开名称，max、full 与自定义高度使用折叠名称', async () => {
    const wrapper = mount(MatBottomSheet, {
      props: {
        modelValue: true,
        variant: 'standard',
      },
    });

    await settleRender();

    expect(wrapper.find('button[aria-label="展开底部面板"]').exists()).toBe(true);

    await wrapper.setProps({ expanded: 'min' });

    expect(wrapper.find('button[aria-label="展开底部面板"]').exists()).toBe(true);

    await wrapper.setProps({ expanded: 'max' });

    expect(wrapper.find('button[aria-label="折叠底部面板"]').exists()).toBe(true);

    await wrapper.setProps({ expanded: '512px' });

    expect(wrapper.find('button[aria-label="折叠底部面板"]').exists()).toBe(true);
  });

  it('normal 向上拖动落回 normal 区时不切换档位', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        content: '长内容',
        modelValue: true,
        variant: 'standard',
      },
    });

    await settleRender();

    stubBottomSheetLayout(wrapper.get('aside').element, {
      contentHeight: 1048,
      panelHeight: 348,
    });

    await dragHandleTo(wrapper.get('button[aria-label="展开底部面板"]').element, {
      from: 300,
      to: 250,
      pointerId: 12,
    });

    expect(wrapper.emitted('update:expanded')).toBeUndefined();
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('normal 向下缓慢拖动到 min 区时请求 min', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        content: '长内容',
        modelValue: true,
        variant: 'standard',
      },
    });

    await settleRender();

    stubBottomSheetLayout(wrapper.get('aside').element, {
      contentHeight: 1048,
      panelHeight: 348,
    });

    await dragHandleTo(wrapper.get('button[aria-label="展开底部面板"]').element, {
      from: 200,
      to: 400,
      pointerId: 13,
    });

    expect(wrapper.emitted('update:expanded')).toEqual([['min']]);
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('向下快速甩动时请求关闭', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        content: '长内容',
        modelValue: true,
        variant: 'standard',
      },
    });

    await settleRender();

    stubBottomSheetLayout(wrapper.get('aside').element, {
      contentHeight: 1048,
      panelHeight: 348,
    });

    await dragHandleTo(wrapper.get('button[aria-label="展开底部面板"]').element, {
      from: 200,
      pointerId: 14,
      slow: false,
      to: 400,
    });

    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
  });

  it('鼠标快速下拉不请求关闭，拖进关闭分区才关闭', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        content: '长内容',
        modelValue: true,
        variant: 'standard',
      },
    });

    await settleRender();

    const sheet = wrapper.get('aside').element;

    stubBottomSheetLayout(sheet, { contentHeight: 1048, panelHeight: 348 });

    const handle = wrapper.get('button[aria-label="展开底部面板"]').element;

    await dragHandleTo(handle, {
      from: 200,
      pointerId: 15,
      pointerType: 'mouse',
      slow: false,
      to: 260,
    });

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    expect(wrapper.emitted('update:expanded')).toBeUndefined();

    await dragHandleTo(handle, {
      from: 200,
      pointerId: 16,
      pointerType: 'mouse',
      to: 200 + 330,
    });

    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
  });

  it('max 高于可用高度时向上拖动仍跟手并在松手后回到 max', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        content: '长内容',
        expanded: 'max',
        modelValue: true,
        variant: 'standard',
      },
    });

    await settleRender();

    const sheet = wrapper.get('aside').element;

    stubBottomSheetLayout(sheet, { contentHeight: 2000, panelHeight: 696 });

    await dragHandleTo(wrapper.get('button[aria-label="折叠底部面板"]').element, {
      from: 400,
      pointerId: 17,
      to: 100,
    });

    expect(wrapper.emitted('update:expanded')).toBeUndefined();
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('从把手向上拖拽并在帷幕内松手时不请求关闭', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        content: '长内容',
        modelValue: true,
        variant: 'modal',
      },
      attrs: {
        'aria-label': '拖拽落点回归',
      },
    });

    await settleRender();

    const sheet = document.body.querySelector('dialog');
    const panel = sheet.querySelector('.mat-sheet__panel');

    stubExtent(sheet, 768);
    stubBottomSheetLayout(panel, { contentHeight: 1048, panelHeight: 348 });

    await dragHandleTo(sheet.querySelector('button[aria-label="展开底部面板"]'), {
      from: 600,
      pointerId: 15,
      target: sheet,
      to: 300,
    });
    sheet.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      clientX: 20,
      clientY: 20,
    }));

    expect(wrapper.emitted('update:expanded')).toEqual([['max']]);
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('按下与抬起都在帷幕上时请求关闭', async () => {
    const wrapper = mount(MatBottomSheet, {
      props: {
        modelValue: true,
        variant: 'modal',
      },
      attrs: {
        'aria-label': '帷幕点击',
      },
    });

    await settleRender();

    const sheet = document.body.querySelector('dialog');

    dispatchPointer(sheet, 'pointerdown', {
      button: 0,
      clientX: 20,
      clientY: 20,
      pointerId: 16,
      pointerType: 'mouse',
    });

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    sheet.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      clientX: 20,
      clientY: 20,
    }));

    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
  });

  it('面板内按下并在帷幕上松开时不请求关闭', async () => {
    const wrapper = mount(MatBottomSheet, {
      props: {
        modelValue: true,
        variant: 'modal',
      },
      attrs: {
        'aria-label': '文本选择',
      },
    });

    await settleRender();

    const sheet = document.body.querySelector('dialog');
    const panel = sheet.querySelector('.mat-sheet__panel');

    dispatchPointer(panel, 'pointerdown', {
      button: 0,
      pointerId: 17,
      pointerType: 'mouse',
    });
    sheet.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      clientX: 20,
      clientY: 20,
    }));

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('把手方向键按 min、normal、max 步进档位', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        modelValue: true,
        variant: 'standard',
      },
    });

    await settleRender();

    const handle = () => document.body.querySelector('aside button[data-sheet-drag-handle]');

    await handle().dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowUp' }));

    expect(wrapper.emitted('update:expanded')).toEqual([['max']]);

    await handle().dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }));

    expect(wrapper.emitted('update:expanded')).toEqual([['max'], ['normal']]);

    await handle().dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }));

    expect(wrapper.emitted('update:expanded')).toEqual([['max'], ['normal'], ['min']]);

    await handle().dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }));

    expect(wrapper.emitted('update:expanded')).toHaveLength(3);

    await handle().dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowUp' }));

    expect(wrapper.emitted('update:expanded')).toEqual([['max'], ['normal'], ['min'], ['normal']]);
  });

  it('full 与自定义高度按方向键先回到 max', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        expanded: 'full',
        modelValue: true,
        variant: 'standard',
      },
    });

    await settleRender();

    const handle = wrapper.get('button[aria-label="折叠底部面板"]');

    await handle.trigger('keydown', { key: 'ArrowDown' });

    expect(wrapper.emitted('update:expanded')).toEqual([['max']]);

    await wrapper.setProps({ expanded: '320px' });
    await settleRender();

    await wrapper.get('button[aria-label="折叠底部面板"]').trigger('keydown', { key: 'ArrowDown' });

    expect(wrapper.emitted('update:expanded')).toEqual([['max'], ['max']]);

    await wrapper.get('button[aria-label="折叠底部面板"]').trigger('keydown', { key: 'ArrowUp' });

    expect(wrapper.emitted('update:expanded')).toEqual([['max'], ['max']]);
  });

  it('未监听 update:expanded 时组件仍更新内部档位与把手名称', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        modelValue: true,
        variant: 'standard',
      },
    });

    await settleRender();

    expect(wrapper.find('button[aria-label="展开底部面板"]').exists()).toBe(true);

    await wrapper.get('button[aria-label="展开底部面板"]').trigger('keydown', { key: 'Enter' });

    expect(wrapper.emitted('update:expanded')).toEqual([['max']]);
    expect(wrapper.find('button[aria-label="折叠底部面板"]').exists()).toBe(true);
  });

  it('virtualExpand 不再是公开属性', () => {
    expect(MatBottomSheet.props.virtualExpand).toBeUndefined();
  });

  it('min 档使用 64px 的显式高度', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        expanded: 'min',
        modelValue: true,
        variant: 'standard',
      },
    });

    await settleRender();

    expect(wrapper.get('aside').element.style.getPropertyValue('--mat-sheet-expanded-block-size'))
      .toBe('var(--mat-sheet-min-block-size)');
  });
});

describe('Bottom sheet 拖拽档位几何', () => {
  it('normal 取可用高度一半，max 取内容完整高度并以可用高度封顶', () => {
    expect(resolveBottomSheetTiers({ availableExtent: 696, contentExtent: 1048 }))
      .toEqual({ max: 696, min: 64, normal: 348 });
    expect(resolveBottomSheetTiers({ availableExtent: 696, contentExtent: 200 }))
      .toEqual({ max: 200, min: 64, normal: 200 });
    expect(resolveBottomSheetTiers({ availableExtent: 696, contentExtent: 20 }))
      .toEqual({ max: 64, min: 64, normal: 64 });
  });

  it('按松手高度吸附到最近档位，低于关闭边界返回关闭', () => {
    const geometry = {
      availableExtent: 696,
      contentExtent: 1048,
      currentExtent: 348,
      currentValue: 'normal',
    };

    expect(resolveBottomSheetDragTarget(geometry, 348))
      .toEqual({ close: false, size: 348, value: 'normal' });
    expect(resolveBottomSheetDragTarget(geometry, 600))
      .toEqual({ close: false, size: 696, value: 'max' });
    expect(resolveBottomSheetDragTarget(geometry, 120))
      .toEqual({ close: false, size: 64, value: 'min' });
    expect(resolveBottomSheetDragTarget(geometry, 31))
      .toEqual({ close: true, size: 0, value: null });
  });

  it('full 与自定义高度小幅拖动时保留当前高度', () => {
    expect(resolveBottomSheetDragTarget({
      availableExtent: 696,
      contentExtent: 1048,
      currentExtent: 696,
      currentValue: 'full',
    }, 690).size).toBe(696);

    expect(resolveBottomSheetDragTarget({
      availableExtent: 696,
      contentExtent: 1048,
      currentExtent: 500,
      currentValue: '500px',
    }, 480)).toEqual({ close: false, size: 500, value: '500px' });
  });

  it('跟手几何先缩到 min 再整体下移，向上不超过可用高度', () => {
    expect(resolveBottomSheetDragGeometry({ availableExtent: 696, extent: 200 }))
      .toEqual({ offset: 0, size: 200 });
    expect(resolveBottomSheetDragGeometry({ availableExtent: 696, extent: 20 }))
      .toEqual({ offset: 44, size: 64 });
    expect(resolveBottomSheetDragGeometry({ availableExtent: 696, extent: 900 }))
      .toEqual({ offset: 0, size: 696 });
  });

  it('超出可用高度后按阻尼继续放大并受上限封顶', () => {
    expect(resolveBottomSheetDragGeometry({
      availableExtent: 696,
      extent: 896,
      overshootLimit: 72,
    })).toEqual({ offset: 0, size: 696 + 200 * 0.25 });

    expect(resolveBottomSheetDragGeometry({
      availableExtent: 696,
      extent: 2000,
      overshootLimit: 72,
    })).toEqual({ offset: 0, size: 696 + 72 });
  });

  it('内容手势按方向与滚动位置决定拦截方式', () => {
    expect(resolveBottomSheetGestureAction({
      deltaY: -20, isCollapsed: true, scrollTop: 80,
    })).toBe('expand');
    expect(resolveBottomSheetGestureAction({
      deltaY: 20, isCollapsed: true, scrollTop: 0,
    })).toBe('collapse');
    expect(resolveBottomSheetGestureAction({
      deltaY: 20, isCollapsed: true, scrollTop: 120,
    })).toBe('scroll');
    expect(resolveBottomSheetGestureAction({
      deltaY: -20, isCollapsed: false, scrollTop: 0,
    })).toBe('scroll');
    expect(resolveBottomSheetGestureAction({
      deltaY: 4, isCollapsed: true, scrollTop: 0,
    })).toBe(null);
    expect(resolveBottomSheetGestureAction({
      deltaY: -4, isCollapsed: true, scrollTop: 0,
    })).toBe(null);
  });

  it('触控快速下甩请求关闭、快速上甩请求展开', () => {
    expect(resolveBottomSheetFlick({
      delta: 120, distance: 120, pointerType: 'touch', velocity: 1,
    })).toBe('close');
    expect(resolveBottomSheetFlick({
      delta: -120, distance: 120, pointerType: 'touch', velocity: 1,
    })).toBe('expand');
    expect(resolveBottomSheetFlick({
      delta: -120, distance: 120, pointerType: 'pen', velocity: 1,
    })).toBe('expand');
    expect(resolveBottomSheetFlick({
      delta: -120, distance: 120, pointerType: 'touch', velocity: 0.2,
    })).toBe(null);
    expect(resolveBottomSheetFlick({
      delta: -20, distance: 20, pointerType: 'touch', velocity: 1,
    })).toBe(null);
    expect(resolveBottomSheetFlick({
      delta: 0, distance: 120, pointerType: 'touch', velocity: 1,
    })).toBe(null);
  });

  it('鼠标拖动不参与甩动判定', () => {
    expect(resolveBottomSheetFlick({
      delta: 400, distance: 400, pointerType: 'mouse', velocity: 3,
    })).toBe(null);
    expect(resolveBottomSheetFlick({
      delta: -400, distance: 400, pointerType: 'mouse', velocity: 3,
    })).toBe(null);
  });

  it('键盘档位按 min、normal、max 步进，full 与自定义高度视作 max 之上', () => {
    expect(resolveBottomSheetKeyboardTarget('min', 1)).toBe('normal');
    expect(resolveBottomSheetKeyboardTarget('normal', 1)).toBe('max');
    expect(resolveBottomSheetKeyboardTarget('max', 1)).toBe(null);
    expect(resolveBottomSheetKeyboardTarget('max', -1)).toBe('normal');
    expect(resolveBottomSheetKeyboardTarget('normal', -1)).toBe('min');
    expect(resolveBottomSheetKeyboardTarget('min', -1)).toBe(null);
    expect(resolveBottomSheetKeyboardTarget('full', -1)).toBe('max');
    expect(resolveBottomSheetKeyboardTarget('full', 1)).toBe(null);
    expect(resolveBottomSheetKeyboardTarget('320px', -1)).toBe('max');
  });
});

describe('MatSideSheet', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    setViewportWidth(1200);
  });

  it('作为独立 standard 组件渲染标题、内容和操作', async () => {
    const wrapper = mount(MatSideSheet, {
      attachTo: document.body,
      props: {
        content: '订单详情内容',
        modelValue: true,
        title: '订单详情',
        variant: 'standard',
      },
      slots: {
        actions: '<button>保存</button>',
      },
    });

    await settleRender();

    const sheet = wrapper.get('aside');

    expect(sheet.text()).toContain('订单详情');
    expect(sheet.text()).toContain('订单详情内容');
    expect(sheet.text()).toContain('保存');
    expect(document.documentElement.style.overflow).not.toBe('hidden');
  });

  it('公开 container-color 属性并转交给共享 Sheet 表面', () => {
    expect(MatSideSheet.props.containerColor.default).toBe(false);
    expect(MatSideSheet.props.containerColor.type).toBe(Boolean);

    const wrapper = mount(MatSideSheet, {
      props: {
        containerColor: true,
      },
    });

    expect(wrapper.findComponent(MatSheetBase).props('containerColor')).toBe(true);
  });

  it('modal 在 position="end" 时面板不设置负偏移样式', async () => {
    mount(MatSideSheet, {
      props: {
        modelValue: true,
        position: 'end',
        title: '右侧面板',
        variant: 'modal',
      },
    });

    await settleRender();

    const panel = document.body.querySelector('dialog .mat-sheet__panel--side.mat-sheet__panel--position-end');

    expect(panel).not.toBeNull();
    expect(panel?.getAttribute('style') || '').not.toContain('--mat-sheet-modal-end-offset');
  });

  it('内置关闭按钮提供可访问名称并请求关闭', async () => {
    const wrapper = mount(MatSideSheet, {
      attachTo: document.body,
      props: {
        modelValue: true,
        title: '详情',
        variant: 'standard',
      },
    });

    await settleRender();
    await wrapper.get('button[aria-label="关闭"]')?.trigger('click');

    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
  });

  it('触摸用户向依附边缘滑动达到阈值时请求关闭', async () => {
    const wrapper = mount(MatSideSheet, {
      attachTo: document.body,
      props: {
        modelValue: true,
        title: '滑动关闭',
        variant: 'standard',
      },
    });

    await settleRender();

    const sheet = wrapper.get('aside').element;

    dispatchPointer(sheet, 'pointerdown', {
      button: 0,
      clientX: 100,
      pointerId: 2,
      pointerType: 'touch',
    });
    dispatchPointer(window, 'pointermove', {
      clientX: 220,
      pointerId: 2,
    });
    dispatchPointer(window, 'pointerup', {
      clientX: 220,
      pointerId: 2,
    });

    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
  });

  it('modal 支持 attach，并在无效目标时警告和请求关闭', async () => {
    const target = document.createElement('section');

    target.id = 'side-sheet-target';
    document.body.append(target);
    mount(MatSideSheet, {
      props: {
        attach: '#side-sheet-target',
        modelValue: true,
        title: '有效目标',
        variant: 'modal',
      },
    });

    await settleRender();

    expect(target.querySelector('dialog')).not.toBeNull();

    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const invalid = mount(MatSideSheet, {
      props: {
        attach: '#missing-side-sheet-target',
        modelValue: true,
        title: '无效目标',
        variant: 'modal',
      },
    });

    await settleRender();

    expect(invalid.emitted('update:modelValue')).toEqual([[false]]);
    expect(warning).toHaveBeenCalledWith(
      'MatSideSheet: attach 必须指向当前 document 中存在的 HTMLElement',
    );
  });

  it('校验响应模式、断点、边缘和尺寸属性', () => {
    expect(MatSideSheet.props.variant.validator('auto')).toBe(true);
    expect(MatSideSheet.props.variant.validator('temporary')).toBe(false);
    expect(MatSideSheet.props.breakpoint.validator(840)).toBe(true);
    expect(MatSideSheet.props.breakpoint.validator(0)).toBe(false);
    expect(MatSideSheet.props.position.validator('start')).toBe(true);
    expect(MatSideSheet.props.position.validator('left')).toBe(false);
    expect(MatSideSheet.props.width.validator(400)).toBe(true);
    expect(MatSideSheet.props.width.validator(401)).toBe(false);
    expect(MatSideSheet.props.width.validator('400')).toBe(true);
    expect(MatSideSheet.props.width.validator('500')).toBe(false);
    expect(MatSideSheet.props.width.validator('min(400px, 100%)')).toBe(true);
    expect(MatSideSheet.props.width.validator('')).toBe(false);
  });

  it('无标题或 aria 名称的 modal 会给出可访问性警告', async () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});

    mount(MatSideSheet, {
      props: {
        modelValue: true,
        variant: 'modal',
      },
    });
    await settleRender();

    expect(warning).toHaveBeenCalledWith(
      'MatSideSheet: 必须通过 title、title Slot、aria-label 或 aria-labelledby 提供可访问名称',
    );
  });

  it('activator Slot 作为 modal 关闭后的焦点恢复目标', async () => {
    const wrapper = mount(MatSideSheet, {
      attachTo: document.body,
      props: {
        title: '属性面板',
        variant: 'modal',
      },
      slots: {
        activator: () => h('button', {
          id: 'side-sheet-activator',
          type: 'button',
        }, '打开属性面板'),
      },
    });
    const activator = wrapper.get('#side-sheet-activator').element;

    activator.focus();
    await wrapper.setProps({ modelValue: true });
    await settleRender();
    await wrapper.setProps({ modelValue: false });
    await vi.advanceTimersByTimeAsync(200);
    await nextTick();

    expect(document.activeElement).toBe(activator);
  });

  it('非 props 属性透传到 modal 根元素', async () => {
    mount(MatSideSheet, {
      props: {
        modelValue: true,
        title: '属性面板',
        variant: 'modal',
      },
      attrs: {
        'aria-label': '属性面板',
        'data-testid': 'side-sheet',
      },
    });
    await settleRender();

    const sheet = document.body.querySelector('dialog');

    expect(sheet?.getAttribute('aria-label')).toBe('属性面板');
    expect(sheet?.getAttribute('data-testid')).toBe('side-sheet');
  });
});

describe.each([
  ['Bottom Sheet', MatBottomSheet, '筛选条件'],
  ['Side Sheet', MatSideSheet, '属性设置'],
])('%s modal 关闭动画', (name, Component, title) => {
  beforeEach(() => {
    vi.useFakeTimers();
    setViewportWidth(500);
  });

  it('点击 overlay 后保留 DOM 直到实际退出动画完成', async () => {
    let finishCloseAnimation;
    let closingAnimationQueries = 0;
    const closeFinished = new Promise((resolve) => {
      finishCloseAnimation = resolve;
    });

    Object.defineProperty(Element.prototype, 'getAnimations', {
      configurable: true,
      value() {
        if (!this.classList.contains('mat-sheet--closing')) {
          return [];
        }

        closingAnimationQueries += 1;
        return [{
          finished: closeFinished,
          playState: 'running',
        }];
      },
    });

    const isBottomSheet = Component === MatBottomSheet;
    const wrapper = mount(Component, {
      props: {
        modelValue: true,
        ...(isBottomSheet ? {} : { title }),
        variant: 'modal',
      },
      attrs: isBottomSheet ? { 'aria-label': title } : undefined,
    });

    await settleRender();
    const sheet = document.body.querySelector('dialog');

    sheet.getBoundingClientRect = () => ({
      bottom: 700,
      left: 100,
      right: 500,
      top: 100,
    });
    dispatchPointer(sheet, 'pointerdown', {
      button: 0,
      clientX: 20,
      clientY: 20,
      pointerId: 19,
      pointerType: 'mouse',
    });

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    sheet.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      clientX: 20,
      clientY: 20,
    }));

    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);

    await wrapper.setProps({ modelValue: false });
    await nextTick();

    expect(closingAnimationQueries).toBe(1);
    expect(document.body.contains(sheet)).toBe(true);

    finishCloseAnimation();
    await flushPromises();
    await nextTick();

    expect(document.body.contains(sheet)).toBe(false);
    expect(wrapper.emitted('closed')).toHaveLength(1);
  });
});
