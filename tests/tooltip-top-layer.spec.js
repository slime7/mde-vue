import { mount } from '@vue/test-utils';
import {
  afterAll, beforeAll, describe, expect, it,
} from 'vitest';
import { h, nextTick } from 'vue';
import {
  MatBtn,
  MatDialog,
  MatFab,
  MatMenu,
  MatMenuItem,
  MatRangeSlider,
  MatSlider,
  MatTooltip,
} from '../src';

const originalDialogShowModal = Object.getOwnPropertyDescriptor(
  HTMLDialogElement.prototype,
  'showModal',
);
const originalDialogClose = Object.getOwnPropertyDescriptor(
  HTMLDialogElement.prototype,
  'close',
);
const originalShowPopover = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'showPopover');
const originalHidePopover = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'hidePopover');

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
  Object.defineProperty(HTMLElement.prototype, 'showPopover', {
    configurable: true,
    value() {
      this.dataset.popoverOpen = '';
    },
  });
  Object.defineProperty(HTMLElement.prototype, 'hidePopover', {
    configurable: true,
    value() {
      delete this.dataset.popoverOpen;
    },
  });
});

afterAll(() => {
  if (originalDialogShowModal) {
    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', originalDialogShowModal);
  } else {
    delete HTMLDialogElement.prototype.showModal;
  }

  if (originalDialogClose) {
    Object.defineProperty(HTMLDialogElement.prototype, 'close', originalDialogClose);
  } else {
    delete HTMLDialogElement.prototype.close;
  }

  if (originalShowPopover) {
    Object.defineProperty(HTMLElement.prototype, 'showPopover', originalShowPopover);
  } else {
    delete HTMLElement.prototype.showPopover;
  }

  if (originalHidePopover) {
    Object.defineProperty(HTMLElement.prototype, 'hidePopover', originalHidePopover);
  } else {
    delete HTMLElement.prototype.hidePopover;
  }
});

async function settleRender() {
  await nextTick();
  await nextTick();
}

/**
 * @param {'dialog'|'popover'} type
 * @returns {HTMLElement}
 */
function createTopLayer(type) {
  const element = document.createElement(type === 'dialog' ? 'dialog' : 'div');

  if (type === 'dialog') {
    element.setAttribute('open', '');
  } else {
    element.setAttribute('popover', 'auto');
    element.dataset.popoverOpen = '';
  }

  document.body.append(element);
  return element;
}

/**
 * @param {HTMLElement} parent
 * @returns {HTMLButtonElement}
 */
function createTarget(parent) {
  const target = document.createElement('button');

  target.type = 'button';
  target.textContent = '展示元素';
  parent.append(target);
  return target;
}

describe('Tooltip top layer 挂载', () => {
  it('普通页面仍将 Tooltip 挂载到 body', async () => {
    const target = createTarget(document.body);
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        content: '普通页面提示',
        modelValue: true,
        target,
      },
    });

    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')?.parentElement).toBe(document.body);
    wrapper.unmount();
  });

  it('dialog 内的 Tooltip 自动挂载到已打开的 dialog', async () => {
    const dialog = createTopLayer('dialog');
    const target = createTarget(dialog);
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        content: 'Dialog 内提示',
        modelValue: true,
        target,
      },
    });

    await settleRender();

    expect(dialog.querySelector('[role="tooltip"]')?.parentElement).toBe(dialog);
    expect(dialog.querySelector('[role="tooltip"]')?.textContent).toContain('Dialog 内提示');
    wrapper.unmount();
  });

  it('Popover 内的 Tooltip 自动挂载到已打开的 Popover', async () => {
    const popover = createTopLayer('popover');
    const target = createTarget(popover);
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        content: 'Popover 内提示',
        modelValue: true,
        target,
      },
    });

    await settleRender();

    expect(popover.querySelector('[role="tooltip"]')?.parentElement).toBe(popover);
    expect(popover.querySelector('[role="tooltip"]')?.textContent).toContain('Popover 内提示');
    wrapper.unmount();
  });

  it('显式 attach 优先于 top-layer 自动挂载', async () => {
    const dialog = createTopLayer('dialog');
    const target = createTarget(dialog);
    const attach = document.createElement('section');

    document.body.append(attach);
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        attach,
        content: '显式挂载提示',
        modelValue: true,
        target,
      },
    });

    await settleRender();

    expect(attach.querySelector('[role="tooltip"]')?.textContent).toContain('显式挂载提示');
    expect(dialog.querySelector('[role="tooltip"]')).toBeNull();
    wrapper.unmount();
  });

  it('MatBtn 和 MatFab 的内部 Tooltip 在 dialog 内可见', async () => {
    const dialog = createTopLayer('dialog');
    const button = mount(MatBtn, {
      attachTo: dialog,
      props: {
        icon: 'settings',
        label: '设置',
      },
    });
    const fab = mount(MatFab, {
      attachTo: dialog,
      props: {
        icon: 'add',
        label: '创建',
      },
    });

    await settleRender();
    button.element.focus();
    await settleRender();
    expect(dialog.querySelector('[role="tooltip"]')?.textContent).toContain('设置');

    button.element.blur();
    fab.element.focus();
    await settleRender();
    expect([...dialog.querySelectorAll('[role="tooltip"]')]
      .some((tooltip) => tooltip.textContent.includes('创建'))).toBe(true);

    button.unmount();
    fab.unmount();
  });

  it('MatSlider 和 MatRangeSlider 的 value indicator 在 dialog 内可见', async () => {
    const dialog = createTopLayer('dialog');
    const slider = mount(MatSlider, {
      attachTo: dialog,
      props: {
        modelValue: 32,
        showValueIndicator: true,
      },
    });
    const rangeSlider = mount(MatRangeSlider, {
      attachTo: dialog,
      props: {
        modelValue: [10, 80],
        showValueIndicator: true,
      },
    });

    await settleRender();
    slider.get('input').element.focus();
    await settleRender();
    expect(dialog.querySelector('[role="tooltip"]')?.textContent).toContain('32');

    slider.get('input').element.blur();
    rangeSlider.findAll('input')[1].element.focus();
    await settleRender();
    expect([...dialog.querySelectorAll('[role="tooltip"]')]
      .some((tooltip) => tooltip.textContent.includes('80'))).toBe(true);

    slider.unmount();
    rangeSlider.unmount();
  });

  it('MatDialog 内容中的 Slider value indicator 保留在 dialog 内', async () => {
    const wrapper = mount(MatDialog, {
      attachTo: document.body,
      props: {
        modelValue: true,
        title: '字号',
      },
      slots: {
        default: () => h(MatSlider, {
          'aria-label': '字号',
          modelValue: 32,
          showValueIndicator: true,
        }),
      },
    });

    await settleRender();

    const dialog = document.body.querySelector('dialog');
    const input = dialog.querySelector('input');

    input.focus();
    await settleRender();

    expect(dialog.open).toBe(true);
    expect(dialog.querySelector('[role="tooltip"]')?.textContent).toContain('32');
    wrapper.unmount();
  });

  it('MatDialog 内初始打开的受控 Tooltip 也保留在 dialog 内', async () => {
    const wrapper = mount(MatDialog, {
      attachTo: document.body,
      props: {
        modelValue: true,
        title: '受控提示',
      },
      slots: {
        default: () => [
          h('button', {
            id: 'dialog-controlled-tooltip-target',
            type: 'button',
          }, '展示元素'),
          h(MatTooltip, {
            content: '受控提示内容',
            modelValue: true,
            target: '#dialog-controlled-tooltip-target',
          }),
        ],
      },
    });

    await settleRender();

    const dialog = document.body.querySelector('dialog');

    expect(dialog.querySelector('[role="tooltip"]')?.textContent).toContain('受控提示内容');
    wrapper.unmount();
  });

  it('MatMenu Popover 内的 Tooltip 保留在菜单 top layer', async () => {
    const anchor = document.createElement('button');

    anchor.id = 'tooltip-menu-anchor';
    anchor.type = 'button';
    document.body.append(anchor);
    const wrapper = mount(MatMenu, {
      attachTo: document.body,
      props: {
        anchor: 'tooltip-menu-anchor',
        modelValue: true,
      },
      slots: {
        default: () => [
          h(MatMenuItem, { id: 'tooltip-menu-item' }, () => '菜单项目'),
          h(MatTooltip, {
            content: '菜单项目提示',
            target: '#tooltip-menu-item',
          }),
        ],
      },
    });

    await settleRender();

    const menu = document.body.querySelector('[role="menu"]');
    const target = menu.querySelector('#tooltip-menu-item');

    target.focus();
    await settleRender();

    expect(menu.querySelector('[role="tooltip"]')?.textContent).toContain('菜单项目提示');
    wrapper.unmount();
  });
});
