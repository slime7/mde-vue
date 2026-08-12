import { mount } from '@vue/test-utils';
import {
  afterEach, beforeAll, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { h, nextTick, ref } from 'vue';
import MatAppRoot from '../src/components/mat-app-root/MatAppRoot.vue';
import MatBottomSheet from '../src/components/mat-bottom-sheet/MatBottomSheet.vue';
import MatDialog from '../src/components/mat-dialog/MatDialog.vue';
import MatFab from '../src/components/mat-fab/MatFab.vue';
import MatMenu from '../src/components/mat-menu/MatMenu.vue';
import MatMenuItem from '../src/components/mat-menu/MatMenuItem.vue';
import MatSnackbar from '../src/components/mat-snackbar/MatSnackbar.vue';
import MatTooltip from '../src/components/mat-tooltip/MatTooltip.vue';
import { dialog } from '../src';

function elementRect({
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

async function settleRender() {
  await nextTick();
  await nextTick();
}

async function settleTimers(ms = 20) {
  await vi.advanceTimersByTimeAsync(ms);
  await settleRender();
}

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
  Object.defineProperty(HTMLElement.prototype, 'showPopover', {
    configurable: true,
    value() {
      this.setAttribute('data-popover-open', '');
    },
  });
  Object.defineProperty(HTMLElement.prototype, 'hidePopover', {
    configurable: true,
    value() {
      this.removeAttribute('data-popover-open');
    },
  });
});

describe('MatAppRoot 模态与浮层范围', () => {
  beforeEach(() => {
    vi.useFakeTimers();
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
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('Dialog 在 AppRoot 内省略 attach 时进入模态层，正文 inert 且外部内容仍可点击', async () => {
    const outside = document.createElement('button');
    const outsideSpy = vi.fn();
    const open = ref(true);

    outside.id = 'outside-taskbar';
    outside.addEventListener('click', outsideSpy);
    document.body.append(outside);

    const wrapper = mount(MatAppRoot, {
      attachTo: document.body,
      props: { fillViewport: false },
      slots: {
        default: () => [
          h('button', { id: 'app-content-button', type: 'button' }, '正文按钮'),
          h(MatDialog, {
            modelValue: open.value,
            title: '应用内 Dialog',
            'onUpdate:modelValue': (value) => {
              open.value = value;
            },
          }),
        ],
      },
    });

    await settleTimers();

    const dialogElement = wrapper.element.querySelector('dialog');

    expect(dialogElement).not.toBeNull();
    expect(dialogElement.open).toBe(true);
    expect(wrapper.element.contains(dialogElement)).toBe(true);
    expect(document.body.querySelector('body > dialog')).toBeNull();

    const inertContainer = wrapper.element.querySelector('[inert]');

    expect(inertContainer).not.toBeNull();
    expect(inertContainer.style.overflow).toBe('hidden');

    outside.click();
    expect(outsideSpy).toHaveBeenCalledTimes(1);

    open.value = false;
    await nextTick();
    await vi.advanceTimersByTimeAsync(200);
    await settleRender();

    expect(wrapper.element.querySelector('dialog')).toBeNull();
    expect(wrapper.element.querySelector('[inert]')).toBeNull();

    wrapper.unmount();
    outside.remove();
  });

  it('打开期间焦点被困在 Dialog 内，外部元素不会被聚焦', async () => {
    const outside = document.createElement('button');

    outside.id = 'dialog-outside-focus';
    document.body.append(outside);

    const wrapper = mount(MatAppRoot, {
      attachTo: document.body,
      props: { fillViewport: false },
      slots: {
        default: () => [
          h('button', { type: 'button' }, '正文'),
          h(MatDialog, { modelValue: true, title: '焦点' }, {
            actions: () => [
              h('button', { id: 'dialog-first', type: 'button' }, '第一个'),
              h('button', { id: 'dialog-last', type: 'button' }, '最后一个'),
            ],
          }),
        ],
      },
    });

    await settleTimers();

    const dialogElement = wrapper.element.querySelector('dialog');
    const first = wrapper.element.querySelector('#dialog-first');
    const last = wrapper.element.querySelector('#dialog-last');

    first.focus();
    expect(document.activeElement).toBe(first);

    last.dispatchEvent(new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 'Tab',
    }));
    expect(document.activeElement).toBe(first);

    first.dispatchEvent(new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 'Tab',
      shiftKey: true,
    }));
    expect(document.activeElement).toBe(last);

    outside.focus();
    expect(dialogElement.contains(document.activeElement)).toBe(true);

    wrapper.unmount();
    outside.remove();
  });

  it('显式 attach 指向 AppRoot 外元素时保持原有挂载行为', async () => {
    const target = document.createElement('section');

    target.id = 'dialog-attach-target';
    document.body.append(target);

    const wrapper = mount(MatAppRoot, {
      attachTo: document.body,
      props: { fillViewport: false },
      slots: {
        default: () => h(MatDialog, {
          attach: '#dialog-attach-target',
          modelValue: true,
          title: '显式挂载',
        }),
      },
    });

    await settleTimers();

    expect(target.querySelector('dialog')).not.toBeNull();
    expect(wrapper.element.querySelector('dialog')).toBeNull();
    expect(wrapper.element.querySelector('[inert]')).toBeNull();

    wrapper.unmount();
    target.remove();
  });

  it('attach 指向 AppRoot 根元素时进入该 AppRoot 的模态层', async () => {
    const wrapper = mount(MatAppRoot, {
      attachTo: document.body,
      props: { fillViewport: false },
      slots: {
        default: () => h('button', { type: 'button' }, '正文'),
      },
    });

    await settleTimers();

    const promise = dialog({ attach: wrapper.element, title: '命令式范围' });

    await settleTimers();

    const dialogElement = wrapper.element.querySelector('dialog');

    expect(dialogElement).not.toBeNull();
    expect(dialogElement.open).toBe(true);

    dialogElement.querySelector('button')?.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
    }));
    await vi.advanceTimersByTimeAsync(400);
    await settleRender();
    await promise;

    expect(wrapper.element.querySelector('dialog')).toBeNull();
    wrapper.unmount();
  });

  it('fullScreen Dialog 在 AppRoot 内仍位于应用范围内', async () => {
    const wrapper = mount(MatAppRoot, {
      attachTo: document.body,
      props: { fillViewport: false },
      slots: {
        default: () => h(MatDialog, {
          fullScreen: true,
          modelValue: true,
          title: '全屏',
        }),
      },
    });

    await settleTimers();

    const dialogElement = wrapper.element.querySelector('dialog');

    expect(dialogElement).not.toBeNull();
    expect(wrapper.element.contains(dialogElement)).toBe(true);
    expect(dialogElement.querySelector('.mat-dialog__panel')).not.toBeNull();

    wrapper.unmount();
  });

  it('modal Bottom sheet 进入 AppRoot 模态层，standard 保持原位', async () => {
    const open = ref(true);
    const modalWrapper = mount(MatAppRoot, {
      attachTo: document.body,
      props: { fillViewport: false },
      slots: {
        default: () => h(MatBottomSheet, {
          modelValue: open.value,
          title: '底部面板',
          variant: 'modal',
          'onUpdate:modelValue': (value) => {
            open.value = value;
          },
        }),
      },
    });

    await settleTimers();

    expect(modalWrapper.element.querySelector('dialog')).not.toBeNull();
    expect(document.body.querySelector('body > dialog')).toBeNull();
    expect(modalWrapper.element.querySelector('[inert]')).not.toBeNull();

    open.value = false;
    await nextTick();
    await vi.advanceTimersByTimeAsync(200);
    await settleRender();
    expect(modalWrapper.element.querySelector('dialog')).toBeNull();
    modalWrapper.unmount();

    const standardWrapper = mount(MatAppRoot, {
      attachTo: document.body,
      props: { fillViewport: false },
      slots: {
        default: () => h(MatBottomSheet, {
          modelValue: true,
          title: '标准面板',
          variant: 'standard',
        }),
      },
    });

    await settleRender();
    expect(standardWrapper.element.querySelector('aside')).not.toBeNull();
    expect(standardWrapper.element.querySelector('[inert]')).toBeNull();
    standardWrapper.unmount();
  });

  it('Menu 在 AppRoot 内按应用矩形夹紧并限定 scrim', async () => {
    const wrapper = mount(MatAppRoot, {
      attachTo: document.body,
      props: { fillViewport: false },
      slots: {
        default: () => [
          h('button', { id: 'app-menu-anchor', type: 'button' }, '菜单'),
          h(MatMenu, { modelValue: true, anchor: 'app-menu-anchor' }, {
            default: () => h(MatMenuItem, null, () => '操作'),
          }),
        ],
      },
    });

    const menu = wrapper.element.querySelector('[role="menu"]');

    vi.spyOn(wrapper.element, 'getBoundingClientRect').mockReturnValue(elementRect({
      bottom: 750,
      height: 700,
      left: 30,
      right: 530,
      top: 50,
      width: 500,
    }));
    vi.spyOn(menu, 'getBoundingClientRect').mockReturnValue(elementRect({
      bottom: 300,
      height: 200,
      left: 800,
      right: 1000,
      top: 100,
      width: 200,
    }));
    await settleTimers();

    const shiftX = Number.parseFloat(
      menu.style.getPropertyValue('--mat-menu-viewport-shift-x'),
    ) || 0;
    const shiftY = Number.parseFloat(
      menu.style.getPropertyValue('--mat-menu-viewport-shift-y'),
    ) || 0;

    expect(800 + 200 + shiftX).toBeLessThanOrEqual(530 - 8);
    expect(shiftY).toBe(0);

    const scrim = wrapper.element.querySelector('.mat-menu__scrim');

    expect(scrim.style.left).toBe('30px');
    expect(scrim.style.top).toBe('50px');
    expect(scrim.style.width).toBe('500px');
    expect(scrim.style.height).toBe('700px');

    wrapper.unmount();
  });

  it('点击 AppRoot 外的内容关闭菜单且不拦截事件', async () => {
    const outside = document.createElement('button');

    outside.id = 'menu-outside-target';
    document.body.append(outside);

    const wrapper = mount(MatAppRoot, {
      attachTo: document.body,
      props: { fillViewport: false },
      slots: {
        default: () => [
          h('button', { id: 'app-menu-anchor', type: 'button' }, '菜单'),
          h(MatMenu, { modelValue: true, anchor: 'app-menu-anchor' }, {
            default: () => h(MatMenuItem, null, () => '操作'),
          }),
        ],
      },
    });

    await settleTimers();

    const menuWrapper = wrapper.findComponent(MatMenu);
    const pointer = new PointerEvent('pointerdown', {
      bubbles: true,
      cancelable: true,
      clientX: 10,
      clientY: 10,
    });

    outside.dispatchEvent(pointer);

    expect(menuWrapper.emitted('update:modelValue')).toEqual([[false]]);
    expect(pointer.defaultPrevented).toBe(false);

    wrapper.unmount();
    outside.remove();
  });

  it('scoped Dialog 盖过 Snackbar/FAB，内部 Tooltip 仍显示在面板之上', async () => {
    const wrapper = mount(MatAppRoot, {
      attachTo: document.body,
      props: { fillViewport: false },
      slots: {
        default: () => [
          h(MatFab, {
            'data-app-fab': '',
            app: true,
            icon: 'add',
            label: '新建',
          }),
          h(MatSnackbar, {
            duration: 0,
            modelValue: true,
            text: '已保存',
          }),
          h(MatDialog, { modelValue: true, title: '层级' }, {
            default: () => h('button', {
              id: 'dialog-tooltip-target',
              type: 'button',
            }, '提示目标'),
          }),
          h(MatTooltip, {
            content: '内部提示',
            modelValue: true,
            target: '#dialog-tooltip-target',
          }),
        ],
      },
    });

    await settleTimers();

    const dialogElement = wrapper.element.querySelector('dialog');
    const tooltip = document.body.querySelector('[role="tooltip"]');
    const snackbar = wrapper.element.querySelector('[role="status"]');
    const fab = wrapper.element.querySelector('[data-app-fab]');

    expect(tooltip).not.toBeNull();
    expect(dialogElement.contains(tooltip)).toBe(true);
    expect(snackbar).not.toBeNull();
    expect(fab).not.toBeNull();
    expect(dialogElement.compareDocumentPosition(snackbar))
      .toBe(Node.DOCUMENT_POSITION_PRECEDING);
    expect(dialogElement.compareDocumentPosition(fab))
      .toBe(Node.DOCUMENT_POSITION_PRECEDING);

    wrapper.unmount();
  });
});
