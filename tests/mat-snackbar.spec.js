import { mount } from '@vue/test-utils';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { h, nextTick } from 'vue';
import MatSnackbar from '../src/components/mat-snackbar/MatSnackbar.vue';

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
  return document.body.querySelector('[role="status"]');
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
    expect(snackbarElement().querySelector('.mat-snackbar__default-action')).not.toBeNull();
    expect(snackbarElement().querySelector('.mat-snackbar__default-close')).toBeNull();
    await finishEnter();
    await vi.advanceTimersByTimeAsync(3999);

    expect(snackbarElement()).not.toBeNull();
    expect(timed.emitted('update:modelValue')).toBeUndefined();

    await vi.advanceTimersByTimeAsync(1);
    await settleRender();

    expect(timed.emitted('update:modelValue')).toEqual([[false]]);
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
    expect(document.body.querySelectorAll('[role="status"]')).toHaveLength(1);

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
});
