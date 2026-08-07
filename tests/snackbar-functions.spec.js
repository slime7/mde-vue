import { mount } from '@vue/test-utils';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { createApp, nextTick } from 'vue';
import { snackbar, toast } from 'mde-vue';
import { createMatUi, MatSnackbar } from '../src';

const wrappers = [];

async function settleRender() {
  await nextTick();
  await nextTick();
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

describe('Snackbar 命令式函数', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    wrappers.splice(0).reverse().forEach((wrapper) => wrapper.unmount());
    vi.useRealTimers();
  });

  it('toast 是 snackbar 的同一函数引用，并拒绝无效对象参数', async () => {
    expect(toast).toBe(snackbar);

    await expect(snackbar()).rejects.toThrow('snackbar options 必须是对象');
    await expect(snackbar({ text: '' })).rejects.toThrow('snackbar text 必须是非空字符串');
    await expect(snackbar({ text: '错误时长', duration: -1 })).rejects.toThrow(
      'snackbar duration 必须是大于等于 0 的有限数字',
    );
    await expect(snackbar({ text: '错误 action', actionText: '' })).rejects.toThrow(
      'snackbar actionText 必须是非空字符串',
    );
    await expect(snackbar({ text: '错误回调', onAction: true })).rejects.toThrow(
      'snackbar onAction 必须是函数',
    );
  });

  it('函数式 action 调用回调、关闭当前通知并继续 FIFO 队列', async () => {
    const onAction = vi.fn();
    const first = snackbar({
      actionText: '撤销',
      closable: true,
      duration: 0,
      onAction,
      text: '已归档邮件',
    });
    const second = snackbar({
      closable: true,
      duration: 0,
      text: '下一条函数通知',
    });

    await settleRender();

    const action = snackbarElement().querySelector('.mat-snackbar__default-action');

    expect(action).not.toBeNull();
    expect(action.textContent).toBe('撤销');

    action.click();
    await settleRender();

    expect(onAction).toHaveBeenCalledOnce();

    await finishExit();

    await expect(first).resolves.toBeUndefined();
    expect(snackbarElement().textContent).toContain('下一条函数通知');

    snackbarElement().querySelector('.mat-snackbar__default-close').click();
    await finishExit();

    await expect(second).resolves.toBeUndefined();
  });

  it('函数式调用按 FIFO 展示、复用一个宿主，并在最后关闭后清理宿主', async () => {
    const first = snackbar({
      closable: true,
      duration: 0,
      text: '第一条函数通知',
    });
    const second = snackbar({
      closable: true,
      duration: 0,
      text: '第二条函数通知',
    });

    await settleRender();

    expect(snackbarElement().textContent).toContain('第一条函数通知');
    expect(document.body.querySelectorAll('[data-mat-snackbar-host]')).toHaveLength(1);

    snackbarElement().querySelector('.mat-snackbar__default-close').click();
    await finishExit();

    await expect(first).resolves.toBeUndefined();
    expect(snackbarElement().textContent).toContain('第二条函数通知');
    expect(document.body.querySelectorAll('[data-mat-snackbar-host]')).toHaveLength(1);

    snackbarElement().querySelector('.mat-snackbar__default-close').click();
    await finishExit();

    await expect(second).resolves.toBeUndefined();
    expect(snackbarElement()).toBeNull();
    expect(document.body.querySelector('[data-mat-snackbar-host]')).toBeNull();
  });

  it('模板与函数式调用进入同一个 FIFO 队列', async () => {
    const first = mountSnackbar({
      props: {
        duration: 0,
        modelValue: true,
        text: '第一条模板通知',
      },
    });
    const functionResult = snackbar({
      closable: true,
      duration: 0,
      text: '函数通知',
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

    await first.setProps({ modelValue: false });
    await finishExit();

    expect(snackbarElement().textContent).toContain('函数通知');

    snackbarElement().querySelector('.mat-snackbar__default-close').click();
    await finishExit();

    await expect(functionResult).resolves.toBeUndefined();
    expect(snackbarElement().textContent).toContain('第二条模板通知');

    await second.setProps({ modelValue: false });
    await finishExit();
  });

  it('命令式宿主继承最近一次插件安装的图标上下文', async () => {
    const target = document.createElement('div');
    const plugin = createMatUi({
      iconClass: 'imperative-snackbar-icons',
      theme: { target },
    });
    const app = createApp({});

    app.use(plugin);

    const result = snackbar({
      closable: true,
      duration: 0,
      text: '插件上下文通知',
    });

    await settleRender();

    snackbarElement().querySelector('.mat-snackbar__default-close').click();
    await finishExit();

    await expect(result).resolves.toBeUndefined();
    plugin.theme.dispose();
  });
});
