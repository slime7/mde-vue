import { flushPromises, mount } from '@vue/test-utils';
import {
  afterEach, beforeAll, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { h, nextTick } from 'vue';
import {
  isBottomSheetFlick,
  resolveBottomSheetDragGeometry,
  resolveBottomSheetDragTarget,
  resolveBottomSheetPreviewOffset,
  resolveBottomSheetPreviewVisible,
  resolveBottomSheetTiers,
} from '../src/components/bottom-sheet-drag';
import MatSheetBase from '../src/components/MatSheetBase.vue';
import MatBottomSheet from '../src/components/mat-bottom-sheet/MatBottomSheet.vue';
import MatSideSheet from '../src/components/mat-side-sheet/MatSideSheet.vue';

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

  it('virtualExpand 开启且在预览状态时，内容区滚轮向下滚动自动请求展开', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        content: '长内容预览',
        modelValue: true,
        variant: 'modal',
        virtualExpand: true,
      },
      attrs: {
        'aria-label': '虚拟全高',
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

  it('virtualExpand 开启且在预览状态时，触控向上滑动内容区自动请求展开', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        content: '长内容预览',
        modelValue: true,
        variant: 'modal',
        virtualExpand: true,
      },
      attrs: {
        'aria-label': '虚拟全高触控',
      },
    });

    await settleRender();

    const content = document.body.querySelector('dialog .mat-sheet__content');

    dispatchPointer(content, 'pointerdown', {
      button: 0,
      clientY: 300,
      pointerId: 10,
      pointerType: 'touch',
    });
    dispatchPointer(content, 'pointermove', {
      clientY: 280,
      pointerId: 10,
      pointerType: 'touch',
    });
    dispatchPointer(content, 'pointerup', {
      clientY: 280,
      pointerId: 10,
      pointerType: 'touch',
    });

    expect(wrapper.emitted('update:expanded')).toEqual([['max']]);
  });

  it('virtualExpand 在已展开状态下滚动内容区不重复请求展开', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        content: '长内容预览',
        expanded: 'full',
        modelValue: true,
        variant: 'modal',
        virtualExpand: true,
      },
      attrs: {
        'aria-label': '虚拟全高已展开',
      },
    });

    await settleRender();

    const content = document.body.querySelector('dialog .mat-sheet__content');

    content.dispatchEvent(new WheelEvent('wheel', {
      bubbles: true,
      deltaY: 50,
    }));

    expect(wrapper.emitted('update:expanded')).toBeUndefined();
  });

  it('virtualExpand 开启且在 standard 模式预览状态时，内容区滚轮向下滚动自动请求展开', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        content: 'Standard 长内容',
        modelValue: true,
        variant: 'standard',
        virtualExpand: true,
      },
    });

    await settleRender();

    const sheet = wrapper.get('aside');
    const wheelDownEvent = new WheelEvent('wheel', {
      bubbles: true,
      cancelable: true,
      deltaY: 50,
    });

    sheet.element.dispatchEvent(wheelDownEvent);

    expect(wheelDownEvent.defaultPrevented).toBe(true);
    expect(wrapper.emitted('update:expanded')).toEqual([['max']]);
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

  it('Escape 与帷幕点击按公共关闭规则请求更新', async () => {
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

    sheet.getBoundingClientRect = () => ({
      bottom: 700,
      left: 0,
      right: 500,
      top: 300,
    });
    dispatchPointer(sheet, 'pointerdown', {
      button: 0,
      clientX: 20,
      clientY: 20,
      pointerId: 11,
      pointerType: 'mouse',
    });
    sheet.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      clientX: 20,
      clientY: 20,
    }));

    expect(wrapper.emitted('update:modelValue')).toHaveLength(2);

    await wrapper.setProps({ closeOnBack: false });
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

  it('按下与抬起都在帷幕上时仍然请求关闭', async () => {
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
    sheet.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      clientX: 20,
      clientY: 20,
    }));

    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
  });

  it('virtualExpand 从预览态向上拖动到 max 区时请求 max', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        content: '长内容',
        modelValue: true,
        variant: 'modal',
        virtualExpand: true,
      },
      attrs: {
        'aria-label': '虚拟预览拖动',
      },
    });

    await settleRender();

    const sheet = document.body.querySelector('dialog');
    const panel = sheet.querySelector('.mat-sheet__panel');

    stubExtent(sheet, 768);
    stubBottomSheetLayout(panel, { contentHeight: 1048, panelHeight: 696 });
    window.dispatchEvent(new Event('resize'));
    await settleRender();

    await dragHandleTo(sheet.querySelector('button[aria-label="展开底部面板"]'), {
      from: 600,
      pointerId: 17,
      to: 300,
    });

    expect(wrapper.emitted('update:expanded')).toEqual([['max']]);
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('virtualExpand 从预览态向上拖动不足时不改变档位', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        content: '长内容',
        modelValue: true,
        variant: 'modal',
        virtualExpand: true,
      },
      attrs: {
        'aria-label': '虚拟预览小幅拖动',
      },
    });

    await settleRender();

    const sheet = document.body.querySelector('dialog');
    const panel = sheet.querySelector('.mat-sheet__panel');

    stubExtent(sheet, 768);
    stubBottomSheetLayout(panel, { contentHeight: 1048, panelHeight: 696 });
    window.dispatchEvent(new Event('resize'));
    await settleRender();

    await dragHandleTo(sheet.querySelector('button[aria-label="展开底部面板"]'), {
      from: 600,
      pointerId: 18,
      to: 500,
    });

    expect(wrapper.emitted('update:expanded')).toBeUndefined();
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('virtualExpand 下 min 与 normal 都保留内容高度，只用位移控制可见高度', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        content: '长内容',
        expanded: 'normal',
        modelValue: true,
        variant: 'modal',
        virtualExpand: true,
      },
      attrs: {
        'aria-label': '虚拟预览档位',
      },
    });

    await settleRender();

    const sheet = document.body.querySelector('dialog');
    const panel = sheet.querySelector('.mat-sheet__panel');

    stubExtent(sheet, 768);
    stubBottomSheetLayout(panel, { contentHeight: 1048, panelHeight: 696 });
    window.dispatchEvent(new Event('resize'));
    await settleRender();

    // 可用高度 768 - 72 = 696：normal 露出 348，min 露出 64。
    expect(sheet.style.getPropertyValue('--mat-sheet-virtual-offset')).toBe('348px');
    expect(panel.classList.contains('mat-sheet__panel--sized')).toBe(false);
    expect(sheet.style.getPropertyValue('--mat-sheet-expanded-block-size')).toBe('');

    await wrapper.setProps({ expanded: 'min' });
    await settleRender();

    expect(sheet.style.getPropertyValue('--mat-sheet-virtual-offset')).toBe('632px');
    expect(panel.classList.contains('mat-sheet__panel--sized')).toBe(false);
    expect(sheet.style.getPropertyValue('--mat-sheet-expanded-block-size')).toBe('');
  });

  it('virtualExpand 关闭时 min 仍使用 64px 的显式高度', async () => {
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

  it('虚拟预览偏移把面板下半部分留在屏幕下方', () => {
    expect(resolveBottomSheetPreviewOffset({ panelExtent: 696, visibleExtent: 348 })).toBe(348);
    expect(resolveBottomSheetPreviewOffset({ panelExtent: 200, visibleExtent: 348 })).toBe(0);
    expect(resolveBottomSheetPreviewOffset({ panelExtent: 696, visibleExtent: -100 })).toBe(696);
  });

  it('虚拟预览拖动超出面板高度后改为负偏移并受上限封顶', () => {
    expect(resolveBottomSheetPreviewOffset({
      overshootLimit: 56,
      panelExtent: 696,
      visibleExtent: 796,
    })).toBe(-25);

    expect(resolveBottomSheetPreviewOffset({
      overshootLimit: 56,
      panelExtent: 696,
      visibleExtent: 2000,
    })).toBe(-56);
  });

  it('虚拟预览的可见高度按档位取 min 与可用高度一半', () => {
    expect(resolveBottomSheetPreviewVisible({ availableExtent: 664, value: 'min' })).toBe(64);
    expect(resolveBottomSheetPreviewVisible({ availableExtent: 664, value: 'normal' })).toBe(332);
  });

  it('只有触控向下位移达到 48px 且速度不小于 0.5px/ms 才算甩动', () => {
    expect(isBottomSheetFlick({
      distance: 120, draggingDown: true, pointerType: 'touch', velocity: 1,
    })).toBe(true);
    expect(isBottomSheetFlick({
      distance: 120, draggingDown: true, pointerType: 'touch', velocity: 0.2,
    })).toBe(false);
    expect(isBottomSheetFlick({
      distance: 120, draggingDown: false, pointerType: 'touch', velocity: 1,
    })).toBe(false);
    expect(isBottomSheetFlick({
      distance: 20, draggingDown: true, pointerType: 'touch', velocity: 1,
    })).toBe(false);
  });

  it('鼠标拖动不参与甩动判定', () => {
    expect(isBottomSheetFlick({
      distance: 400, draggingDown: true, pointerType: 'mouse', velocity: 3,
    })).toBe(false);
    expect(isBottomSheetFlick({
      distance: 400, draggingDown: true, pointerType: 'pen', velocity: 3,
    })).toBe(true);
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
