import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { mount } from '@vue/test-utils';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { h, nextTick } from 'vue';
import MatToolbar from '../src/components/mat-toolbar/MatToolbar.vue';
import MatSnackbar from '../src/components/mat-snackbar/MatSnackbar.vue';

const componentSource = readFileSync(
  resolve('src/components/mat-snackbar/MatSnackbar.vue'),
  'utf8',
);
const stylesSource = readFileSync(resolve('src/styles/index.css'), 'utf8');

const wrappers = [];
const innerHeightDescriptor = Object.getOwnPropertyDescriptor(window, 'innerHeight');

async function settleRender() {
  await nextTick();
  await nextTick();
}

async function finishEnter() {
  await vi.advanceTimersByTimeAsync(400);
  await settleRender();
}

async function finishExit() {
  await vi.advanceTimersByTimeAsync(200);
  await settleRender();
}

function snackbarElement() {
  return document.body.querySelector('.mat-snackbar');
}

function mountSnackbar(options) {
  const wrapper = mount(MatSnackbar, options);

  wrappers.push(wrapper);
  return wrapper;
}

describe('MatSnackbar', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    wrappers.splice(0).reverse().forEach((wrapper) => wrapper.unmount());
    if (innerHeightDescriptor) {
      Object.defineProperty(window, 'innerHeight', innerHeightDescriptor);
    }
    vi.useRealTimers();
  });

  it('默认 Slot 和 close Slot 分别优先于 text 与默认关闭按钮', async () => {
    const wrapper = mountSnackbar({
      props: {
        closable: false,
        modelValue: true,
        text: '属性文本',
      },
      slots: {
        default: () => 'Slot 文本',
        close: ({ close }) => h('button', {
          class: 'slot-close',
          type: 'button',
          onClick: close,
        }, '自定义关闭'),
      },
    });

    await settleRender();

    const element = snackbarElement();

    expect(element.querySelector('.mat-snackbar__text').textContent).toContain('Slot 文本');
    expect(element.querySelector('.mat-snackbar__text').textContent).not.toContain('属性文本');
    expect(element.querySelector('.slot-close')).not.toBeNull();
    expect(element.querySelector('.mat-snackbar__default-close')).toBeNull();

    element.querySelector('.slot-close').click();
    await settleRender();

    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
    expect(element.classList).toContain('mat-snackbar--closing');

    await finishExit();

    expect(wrapper.emitted('closed')).toHaveLength(1);
    expect(snackbarElement()).toBeNull();
  });

  it('actionText 显示默认文字操作，action Slot 优先且触发 action 事件后关闭', async () => {
    const propertyAction = mountSnackbar({
      props: {
        actionText: '撤销',
        closable: true,
        duration: 0,
        modelValue: true,
        text: '已归档邮件',
      },
    });

    await settleRender();

    const propertyElement = snackbarElement();
    const defaultAction = propertyElement.querySelector('.mat-snackbar__default-action');

    expect(defaultAction.textContent).toBe('撤销');
    expect(propertyElement.querySelector('.mat-snackbar__default-close')).not.toBeNull();

    defaultAction.click();
    await settleRender();

    expect(propertyAction.emitted('action')).toHaveLength(1);
    expect(propertyAction.emitted('update:modelValue')).toEqual([[false]]);

    await finishExit();

    const slotAction = mountSnackbar({
      props: {
        actionText: '属性操作',
        duration: 0,
        modelValue: true,
        text: '自定义操作',
      },
      slots: {
        action: ({ action }) => h('button', {
          class: 'slot-action',
          type: 'button',
          onClick: action,
        }, 'Slot 操作'),
      },
    });

    await settleRender();

    const slotElement = snackbarElement();

    expect(slotElement.querySelector('.slot-action')).not.toBeNull();
    expect(slotElement.querySelector('.slot-action').textContent).toBe('Slot 操作');
    expect(slotElement.querySelector('.mat-snackbar__default-action')).toBeNull();

    slotElement.querySelector('.slot-action').click();
    await settleRender();

    expect(slotAction.emitted('action')).toHaveLength(1);
    expect(slotAction.emitted('update:modelValue')).toEqual([[false]]);

    await finishExit();
  });

  it('默认显示四秒，duration=0 时保持显示', async () => {
    const timed = mountSnackbar({
      props: {
        actionText: '撤销',
        modelValue: true,
        text: '四秒后关闭',
      },
    });

    await settleRender();
    expect(snackbarElement().classList).toContain('mat-snackbar--center');
    expect(snackbarElement().querySelector('.mat-snackbar__default-action')).not.toBeNull();
    expect(snackbarElement().querySelector('.mat-snackbar__default-close')).toBeNull();
    await finishEnter();
    await vi.advanceTimersByTimeAsync(3999);

    expect(snackbarElement()).not.toBeNull();
    expect(timed.emitted('update:modelValue')).toBeUndefined();

    await vi.advanceTimersByTimeAsync(1);
    await settleRender();

    expect(timed.emitted('update:modelValue')).toEqual([[false]]);
    expect(snackbarElement().classList).toContain('mat-snackbar--closing');

    await finishExit();
    timed.unmount();

    const persistent = mountSnackbar({
      props: {
        duration: 0,
        modelValue: true,
        text: '常驻通知',
      },
    });

    await settleRender();
    await finishEnter();
    await vi.advanceTimersByTimeAsync(10000);

    expect(snackbarElement()).not.toBeNull();
    expect(persistent.emitted('update:modelValue')).toBeUndefined();
  });

  it('提供不抢占焦点的 action、关闭按钮、位置类和状态播报语义', async () => {
    const trigger = document.createElement('button');

    trigger.type = 'button';
    document.body.append(trigger);
    trigger.focus();

    const wrapper = mountSnackbar({
      props: {
        actionText: '撤销',
        closable: true,
        modelValue: true,
        position: 'left',
        text: '可关闭通知',
      },
    });

    await settleRender();

    const element = snackbarElement();
    const action = element.querySelector('.mat-snackbar__default-action');
    const closeButton = element.querySelector('.mat-snackbar__default-close');

    expect(element.getAttribute('role')).toBe('status');
    expect(element.getAttribute('aria-live')).toBe('polite');
    expect(element.getAttribute('aria-atomic')).toBe('true');
    expect(element.classList).toContain('mat-snackbar--left');
    expect(document.activeElement).toBe(trigger);
    expect(action.textContent).toBe('撤销');
    expect(closeButton.getAttribute('aria-label')).toBe('关闭');

    await wrapper.setProps({ closeLabel: '关闭提示' });

    expect(closeButton.getAttribute('aria-label')).toBe('关闭提示');

    closeButton.click();
    await settleRender();

    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);

    await finishExit();
  });

  it('所有模板实例共用 FIFO 队列，并在活动项退出后展示下一项', async () => {
    const first = mountSnackbar({
      props: {
        duration: 0,
        modelValue: true,
        text: '第一条模板通知',
      },
    });
    const second = mountSnackbar({
      props: {
        duration: 0,
        modelValue: true,
        text: '第二条模板通知',
      },
    });

    await settleRender();

    expect(snackbarElement().textContent).toContain('第一条模板通知');
    expect(document.body.querySelectorAll('.mat-snackbar')).toHaveLength(1);

    await first.setProps({ modelValue: false });
    await finishExit();

    expect(snackbarElement().textContent).toContain('第二条模板通知');

    await second.setProps({ modelValue: false });
    await finishExit();

    expect(snackbarElement()).toBeNull();
  });

  it('排队的模板实例在 v-model=false 或卸载后取消', async () => {
    const first = mountSnackbar({
      props: {
        duration: 0,
        modelValue: true,
        text: '活动通知',
      },
    });
    const cancelled = mountSnackbar({
      props: {
        duration: 0,
        modelValue: true,
        text: '取消通知',
      },
    });
    const unmounted = mountSnackbar({
      props: {
        duration: 0,
        modelValue: true,
        text: '卸载通知',
      },
    });

    await settleRender();
    await cancelled.setProps({ modelValue: false });
    unmounted.unmount();
    await first.setProps({ modelValue: false });
    await finishExit();

    expect(snackbarElement()).toBeNull();
  });

  it('使用 Material 3 的 inverse 角色、尺寸、安全边距和减少动画处理', () => {
    expect(stylesSource).toContain(
      '--mat-snackbar-container-color: var(--mat-sys-color-inverse-surface);',
    );
    expect(stylesSource).toContain(
      '--mat-snackbar-content-color: var(--mat-sys-color-inverse-on-surface);',
    );
    expect(stylesSource).toContain(
      '--mat-snackbar-action-color: var(--mat-sys-color-inverse-primary);',
    );
    expect(stylesSource).toContain('--mat-snackbar-container-height: 48px;');
    expect(stylesSource).toContain('--mat-snackbar-two-line-container-height: 64px;');
    expect(componentSource).toContain('env(safe-area-inset-bottom)');
    expect(componentSource).toContain('--mat-snackbar-leading-space: 16px');
    expect(componentSource).toContain('--mat-snackbar-content-action-space: 24px');
    expect(componentSource).toContain('--mat-snackbar-action-trailing-space: 8px');
    expect(componentSource).toContain('--mat-snackbar-action-target-size: 48px');
    expect(componentSource).toContain('--mat-snackbar-close-target-size: 48px');
    expect(componentSource).toContain('--mat-snackbar-close-icon-size: 24px');
    expect(componentSource).toContain('class="mat-snackbar__default-action"');
    expect(componentSource).toContain(
      'min-inline-size: var(--mat-snackbar-action-target-size);',
    );
    expect(componentSource).toContain('color: var(--mat-snackbar-action-color);');
    expect(componentSource).toContain(
      'margin-inline-start: var(--mat-snackbar-content-action-space);',
    );
    expect(componentSource).toContain(
      'padding-inline-end: var(--mat-snackbar-action-trailing-space);',
    );
    expect(componentSource).toContain('@media (prefers-reduced-motion: reduce)');
  });

  it('底部 Toolbar 存在时通过实际矩形自动上移', async () => {
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 600,
    });
    const toolbarWrapper = mount(MatToolbar, {
      attachTo: document.body,
      props: {
        app: true,
        bottomPlaceholder: 24,
        variant: 'floating-bottom',
      },
    });
    const toolbar = document.body.querySelector('.mat-toolbar');

    vi.spyOn(toolbar, 'getBoundingClientRect').mockReturnValue({
      bottom: 560,
      height: 80,
      left: 120,
      right: 680,
      top: 480,
      width: 560,
    });
    window.dispatchEvent(new Event('resize'));

    const snackbar = mountSnackbar({
      props: {
        duration: 0,
        modelValue: true,
        text: '位于 Toolbar 上方',
      },
    });

    await settleRender();

    expect(snackbarElement().style.getPropertyValue('--mat-snackbar-toolbar-clearance')).toBe('120px');
    expect(componentSource).toContain('max(env(safe-area-inset-bottom)');

    snackbar.unmount();
    toolbarWrapper.unmount();
  });
});
