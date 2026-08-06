import { mount } from '@vue/test-utils';
import {
  beforeAll, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { h, nextTick } from 'vue';
import MatBottomSheet from '../src/components/mat-bottom-sheet/MatBottomSheet.vue';
import MatSideSheet from '../src/components/mat-side-sheet/MatSideSheet.vue';

beforeAll(() => {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
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
        content: '筛选条件',
        modelValue: true,
        title: '筛选',
        variant: 'standard',
      },
    });

    await settleRender();

    const sheet = wrapper.get('aside');

    expect(sheet.text()).toContain('筛选');
    expect(sheet.text()).toContain('筛选条件');
    expect(document.documentElement.style.overflow).not.toBe('hidden');
    expect(document.activeElement).toBe(trigger);
  });

  it('modal 使用原生 dialog，关闭完成后清理并恢复焦点', async () => {
    const trigger = document.createElement('button');

    trigger.textContent = '打开筛选';
    document.body.append(trigger);
    trigger.focus();
    const wrapper = mount(MatBottomSheet, {
      props: {
        modelValue: true,
        title: '筛选',
        variant: 'modal',
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

  it('auto 在窄屏使用 modal，在宽屏使用 standard', async () => {
    const compact = mount(MatBottomSheet, {
      props: {
        modelValue: true,
        title: '窄屏',
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
        title: '宽屏',
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
        title: '响应式切换',
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
        title: '拖动关闭',
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

  it('从预览状态向上拖动把手达到阈值时请求展开', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        modelValue: true,
        title: '向上展开',
        variant: 'standard',
      },
    });

    await settleRender();

    const handle = wrapper.get('button[aria-label="展开底部面板"]').element;

    dispatchPointer(handle, 'pointerdown', {
      button: 0,
      clientY: 300,
      pointerId: 4,
      pointerType: 'touch',
    });
    dispatchPointer(window, 'pointermove', {
      clientY: 180,
      pointerId: 4,
    });
    dispatchPointer(window, 'pointerup', {
      clientY: 180,
      pointerId: 4,
    });

    expect(wrapper.emitted('update:expanded')).toEqual([[true]]);
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('standard 把手可以通过点击和键盘在预览与全屏状态间循环', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        modelValue: true,
        title: '高度状态',
        variant: 'standard',
      },
    });

    await settleRender();

    const handle = wrapper.get('button[aria-label="展开底部面板"]');

    await handle.trigger('click');

    expect(wrapper.emitted('update:expanded')).toEqual([[true]]);

    await wrapper.setProps({ expanded: true });

    expect(wrapper.get('button[aria-label="折叠底部面板"]')).toBeTruthy();
    await wrapper.get('button[aria-label="折叠底部面板"]').trigger('keydown', { key: 'Enter' });

    expect(wrapper.emitted('update:expanded')).toEqual([[true], [false]]);
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('全屏状态向下拖动时先回到预览状态', async () => {
    const wrapper = mount(MatBottomSheet, {
      attachTo: document.body,
      props: {
        expanded: true,
        modelValue: true,
        title: '全屏内容',
        variant: 'standard',
      },
    });

    await settleRender();

    const handle = wrapper.get('button[aria-label="折叠底部面板"]').element;

    dispatchPointer(handle, 'pointerdown', {
      button: 0,
      clientY: 100,
      pointerId: 3,
      pointerType: 'touch',
    });
    dispatchPointer(window, 'pointermove', {
      clientY: 220,
      pointerId: 3,
    });
    dispatchPointer(window, 'pointerup', {
      clientY: 220,
      pointerId: 3,
    });

    expect(wrapper.emitted('update:expanded')).toEqual([[false]]);
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('展开的 modal 默认不显示关闭按钮，closable 时显示', async () => {
    mount(MatBottomSheet, {
      props: {
        dragHandle: false,
        expanded: true,
        modelValue: true,
        title: '全屏详情',
        variant: 'modal',
      },
    });

    await settleRender();

    expect(document.body.querySelector('dialog button[aria-label="关闭"]')).toBeNull();

    const wrapper = mount(MatBottomSheet, {
      props: {
        dragHandle: false,
        expanded: true,
        modelValue: true,
        closable: true,
        title: '全屏详情',
        variant: 'modal',
      },
    });

    await settleRender();

    const closeButton = document.body.querySelector('dialog button[aria-label="关闭"]');

    expect(closeButton).not.toBeNull();
    closeButton.click();

    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
  });

  it('closable 在预览状态下也显示关闭按钮', async () => {
    const wrapper = mount(MatBottomSheet, {
      props: {
        modelValue: true,
        closable: true,
        title: '预览详情',
        variant: 'modal',
      },
    });

    await settleRender();

    const closeButton = document.body.querySelector('dialog button[aria-label="关闭"]');

    expect(closeButton).not.toBeNull();
    closeButton.click();

    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
  });

  it('展开的 modal 把手通过键盘请求关闭', async () => {
    const wrapper = mount(MatBottomSheet, {
      props: {
        expanded: true,
        modelValue: true,
        title: '全屏详情',
        variant: 'modal',
      },
    });

    await settleRender();

    const handle = document.body.querySelector('dialog button[aria-label="关闭底部面板"]');

    handle.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }));

    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
  });

  it('Escape 与帷幕点击按公共关闭规则请求更新', async () => {
    const wrapper = mount(MatBottomSheet, {
      props: {
        modelValue: true,
        title: '关闭行为',
        variant: 'modal',
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
        header: '<div>自定义头部</div>',
      },
    });
    await settleRender();

    const sheet = document.body.querySelector('dialog');

    expect(sheet?.getAttribute('aria-label')).toBe('筛选面板');
    expect(sheet?.getAttribute('data-testid')).toBe('bottom-sheet');
    expect(sheet?.classList.contains('custom-sheet')).toBe(true);
    expect(sheet?.textContent).toContain('自定义头部');
    expect(warning).not.toHaveBeenCalledWith(
      'MatBottomSheet: 必须通过 title、title Slot、aria-label 或 aria-labelledby 提供可访问名称',
    );
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
