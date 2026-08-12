import {
  beforeAll, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { nextTick } from 'vue';
import {
  alert, confirm, dialog, prompt,
} from 'mde-vue';

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

async function settleRender() {
  await nextTick();
  await nextTick();
}

async function closeAnimation() {
  await vi.advanceTimersByTimeAsync(200);
  await nextTick();
}

describe('Dialog 命令式函数', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('dialog 使用默认动作并在清理 DOM 后结算 Promise', async () => {
    const result = dialog({
      title: '提示',
      content: '操作完成',
    });

    await settleRender();

    const element = document.body.querySelector('dialog');
    const button = element.querySelector('.mat-dialog__actions button');

    expect(button.textContent).toContain('确定');
    button.click();
    await closeAnimation();

    await expect(result).resolves.toBeUndefined();
    expect(document.body.querySelector('dialog')).toBeNull();
    expect(document.body.querySelector('[data-mat-dialog-host]')).toBeNull();
  });

  it('命令式 Dialog 支持 width，并拒绝无效宽度', async () => {
    const result = dialog({
      title: '宽度选项',
      width: 720,
    });

    await settleRender();

    document.body.querySelector('.mat-dialog__actions button').click();
    await closeAnimation();
    await expect(result).resolves.toBeUndefined();

    const invalid = dialog({
      title: '无效宽度',
      width: 0,
    });
    const rejection = expect(invalid).rejects.toThrow('dialog width 无效');

    await settleRender();
    document.body.querySelector('.mat-dialog__actions button')?.click();
    await closeAnimation();
    await rejection;
  });

  it('dialog 返回所选动作的 value', async () => {
    const result = dialog({
      title: '选择',
      actions: [
        { text: '稍后', value: 'later' },
        { text: '继续', value: 'continue', variant: 'filled' },
      ],
    });

    await settleRender();

    const buttons = document.body.querySelectorAll('.mat-dialog__actions button');

    buttons[1].click();
    await closeAnimation();

    await expect(result).resolves.toBe('continue');
  });

  it('dialog 保留对象 value 的身份且不把额外选项传给原生元素', async () => {
    const value = { id: 1 };
    const result = dialog({
      title: '对象结果',
      confirmText: '不应透传',
      actions: [{ text: '选择', value }],
    });

    await settleRender();

    const element = document.body.querySelector('dialog');

    expect(element.hasAttribute('confirmtext')).toBe(false);
    element.querySelector('button').click();
    await closeAnimation();

    await expect(result).resolves.toBe(value);
  });

  it('alert 在任意关闭方式完成后返回 undefined', async () => {
    const result = alert({
      title: '警告',
      content: '请检查输入',
      confirmText: '知道了',
    });

    await settleRender();

    const button = document.body.querySelector('.mat-dialog__actions button');

    expect(button.textContent).toContain('知道了');
    button.click();
    await closeAnimation();

    await expect(result).resolves.toBeUndefined();
  });

  it('confirm 确认返回 true，Escape 返回 false', async () => {
    const accepted = confirm({ title: '确认发布？' });

    await settleRender();
    document.body.querySelectorAll('.mat-dialog__actions button')[1].click();
    await closeAnimation();

    await expect(accepted).resolves.toBe(true);

    const cancelled = confirm({ title: '确认删除？' });

    await settleRender();
    document.body.querySelector('dialog').dispatchEvent(new Event('cancel', { cancelable: true }));
    await closeAnimation();

    await expect(cancelled).resolves.toBe(false);
  });

  it('prompt 返回输入字符串，取消时返回 null', async () => {
    const accepted = prompt({
      title: '输入名称',
      label: '名称',
      defaultValue: '初始值',
    });

    await settleRender();

    const input = document.body.querySelector('.mat-dialog input');

    input.value = '新名称';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await nextTick();
    document.body.querySelectorAll('.mat-dialog__actions button')[1].click();
    await closeAnimation();

    await expect(accepted).resolves.toBe('新名称');

    const cancelled = prompt({ title: '再次输入' });

    await settleRender();
    document.body.querySelectorAll('.mat-dialog__actions button')[0].click();
    await closeAnimation();

    await expect(cancelled).resolves.toBeNull();
  });

  it('prompt 必填且为空时禁用确认按钮', async () => {
    const result = prompt({
      title: '必填名称',
      required: true,
    });

    await settleRender();

    const buttons = document.body.querySelectorAll('.mat-dialog__actions button');

    expect(buttons[1].disabled).toBe(true);
    buttons[0].click();
    await closeAnimation();

    await expect(result).resolves.toBeNull();
  });

  it('允许并行打开，并只让最后打开的 Dialog 显示帷幕', async () => {
    const first = dialog({ title: '第一层' });
    const second = dialog({ title: '第二层' });

    await settleRender();

    const elements = document.body.querySelectorAll('dialog');

    expect(elements).toHaveLength(2);

    elements[1].querySelector('button').click();
    await closeAnimation();
    document.body.querySelector('dialog button').click();
    await closeAnimation();

    await Promise.all([first, second]);
  });

  it('无效参数和 attach 通过 rejected Promise 报错', async () => {
    await expect(dialog(null)).rejects.toThrow('dialog options 必须是对象');
    await expect(dialog({ attach: '#missing' })).rejects.toThrow('dialog attach 未找到目标元素');
    await expect(dialog({ actions: [{ text: '' }] })).rejects.toThrow('dialog action text 必须是非空字符串');
  });
});
