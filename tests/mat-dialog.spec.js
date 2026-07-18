import { mount } from '@vue/test-utils';
import {
  beforeAll, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { h, nextTick } from 'vue';
import MatDialog from '../src/components/mat-dialog/MatDialog.vue';
import MatToolbar from '../src/components/mat-toolbar/MatToolbar.vue';

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

describe('MatDialog', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('渲染 activator Slot，并在关闭完成后恢复触发器焦点', async () => {
    const wrapper = mount(MatDialog, {
      attachTo: document.body,
      props: {
        title: '确认操作',
      },
      slots: {
        activator: () => h('button', {
          id: 'dialog-activator',
          type: 'button',
        }, '打开 Dialog'),
      },
    });
    const activator = wrapper.get('#dialog-activator').element;

    activator.focus();
    await wrapper.setProps({ modelValue: true });
    await settleRender();

    expect(document.body.querySelector('dialog')).not.toBeNull();

    await wrapper.setProps({ modelValue: false });
    await vi.advanceTimersByTimeAsync(200);
    await nextTick();

    expect(document.activeElement).toBe(activator);
    wrapper.unmount();
  });

  it('activator Slot 渲染多个元素根节点时警告并请求关闭', async () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mount(MatDialog, {
      props: {
        modelValue: true,
        title: '无效触发器',
      },
      slots: {
        activator: () => [
          h('button', { type: 'button' }, '第一个'),
          h('button', { type: 'button' }, '第二个'),
        ],
      },
    });

    await settleRender();

    expect(document.body.querySelector('dialog')).toBeNull();
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
    expect(warning).toHaveBeenCalledWith(
      'MatDialog: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点',
    );

    wrapper.unmount();
  });

  it('通过 modelValue 打开，并在关闭动画完成后移除 DOM', async () => {
    const wrapper = mount(MatDialog, {
      props: {
        modelValue: true,
        title: '删除项目',
        content: '删除后无法恢复。',
      },
    });

    await settleRender();

    const element = document.body.querySelector('dialog');

    expect(element).not.toBeNull();
    expect(element.open).toBe(true);
    expect(element.classList).toContain('mat-dialog--opening');

    await vi.advanceTimersByTimeAsync(400);

    expect(element.classList).toContain('mat-dialog--open');
    expect(wrapper.emitted('opened')).toHaveLength(1);

    await wrapper.setProps({ modelValue: false });

    expect(element.classList).toContain('mat-dialog--closing');
    expect(document.body.contains(element)).toBe(true);

    await vi.advanceTimersByTimeAsync(199);

    expect(document.body.contains(element)).toBe(true);

    await vi.advanceTimersByTimeAsync(1);

    expect(document.body.contains(element)).toBe(false);
    expect(wrapper.emitted('closed')).toHaveLength(1);
  });

  it('快速反向打开时取消尚未完成的关闭', async () => {
    const wrapper = mount(MatDialog, {
      props: {
        modelValue: true,
        title: '状态切换',
      },
    });

    await settleRender();
    await vi.advanceTimersByTimeAsync(400);
    await wrapper.setProps({ modelValue: false });
    await vi.advanceTimersByTimeAsync(100);
    await wrapper.setProps({ modelValue: true });
    await vi.advanceTimersByTimeAsync(400);

    expect(document.body.querySelector('dialog')).not.toBeNull();
    expect(wrapper.emitted('closed')).toBeUndefined();
    expect(wrapper.emitted('opened')).toHaveLength(2);
  });

  it('Dialog 堆叠期间锁定页面滚动，并在最后一层关闭后恢复根样式', async () => {
    document.documentElement.style.overflow = 'scroll';
    document.documentElement.style.paddingInlineEnd = '7px';
    const first = mount(MatDialog, {
      props: {
        modelValue: true,
        title: '第一层',
      },
    });
    const second = mount(MatDialog, {
      props: {
        modelValue: true,
        title: '第二层',
      },
    });

    await settleRender();

    expect(document.documentElement.style.overflow).toBe('hidden');

    await second.setProps({ modelValue: false });
    await vi.advanceTimersByTimeAsync(200);

    expect(document.documentElement.style.overflow).toBe('hidden');

    await first.setProps({ modelValue: false });
    await vi.advanceTimersByTimeAsync(200);

    expect(document.documentElement.style.overflow).toBe('scroll');
    expect(document.documentElement.style.paddingInlineEnd).toBe('7px');
  });

  it('支持 attach，并将未消费属性透传给原生 dialog', async () => {
    const target = document.createElement('section');

    target.id = 'dialog-target';
    document.body.append(target);
    mount(MatDialog, {
      props: {
        modelValue: true,
        attach: '#dialog-target',
        title: '自定义目标',
      },
      attrs: {
        class: 'consumer-dialog',
        'aria-describedby': 'dialog-description',
      },
    });

    await settleRender();

    const element = target.querySelector('dialog');

    expect(element).not.toBeNull();
    expect(element.classList).toContain('consumer-dialog');
    expect(element.getAttribute('aria-describedby')).toBe('dialog-description');
  });

  it('attach 无效时警告并请求关闭', async () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mount(MatDialog, {
      props: {
        modelValue: true,
        attach: '#missing-dialog-target',
        title: '无效目标',
      },
    });

    await settleRender();

    expect(document.body.querySelector('dialog')).toBeNull();
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
    expect(warning).toHaveBeenCalledWith(
      'MatDialog: attach 必须指向当前 document 中存在的 HTMLElement',
    );
  });

  it('支持数字和 CSS 宽度值，并在小屏保留视口限制', async () => {
    const wide = mount(MatDialog, {
      props: {
        modelValue: true,
        title: '宽 Dialog',
        width: 720,
      },
    });

    await settleRender();

    const wideElement = document.body.querySelector('dialog');

    expect(wideElement.getAttribute('style')).toContain(
      'inline-size: min(720px, calc(100dvi - 48px));',
    );
    expect(wideElement.getAttribute('style')).toContain(
      'max-inline-size: calc(100dvi - 48px);',
    );

    await wide.setProps({ modelValue: false });
    await vi.advanceTimersByTimeAsync(200);

    const cssWidth = mount(MatDialog, {
      props: {
        modelValue: true,
        title: 'CSS 宽度',
        width: '45rem',
      },
    });

    await settleRender();

    expect(document.body.querySelector('dialog').getAttribute('style')).toContain(
      'inline-size: min(45rem, calc(100dvi - 48px));',
    );

    cssWidth.unmount();
  });

  it('全屏 Dialog 忽略 width，且 width 校验只接受正数或非空 CSS 值', async () => {
    expect(MatDialog.props.width.validator(720)).toBe(true);
    expect(MatDialog.props.width.validator('calc(100% - 32px)')).toBe(true);
    expect(MatDialog.props.width.validator(0)).toBe(false);
    expect(MatDialog.props.width.validator(Number.POSITIVE_INFINITY)).toBe(false);
    expect(MatDialog.props.width.validator('')).toBe(false);

    const wrapper = mount(MatDialog, {
      props: {
        fullScreen: true,
        modelValue: true,
        title: '全屏 Dialog',
        width: 720,
      },
    });

    await settleRender();

    const element = document.querySelector('.mat-dialog');

    expect(element).not.toBeNull();
    expect(element.getAttribute('style') ?? '').not.toContain('720px');
    wrapper.unmount();
  });

  it('prop 内容优先于同名 Slot', async () => {
    mount(MatDialog, {
      props: {
        modelValue: true,
        title: '属性标题',
        content: '属性内容',
        icon: 'info',
      },
      slots: {
        title: 'Slot 标题',
        default: 'Slot 内容',
        icon: 'warning',
        actions: '<button class="slot-action">继续</button>',
      },
    });

    await settleRender();

    const element = document.body.querySelector('dialog');

    expect(element.textContent).toContain('属性标题');
    expect(element.textContent).toContain('属性内容');
    expect(element.textContent).toContain('info');
    expect(element.textContent).not.toContain('Slot 标题');
    expect(element.textContent).not.toContain('Slot 内容');
    expect(element.textContent).not.toContain('warning');
    expect(element.querySelector('.slot-action')).not.toBeNull();
  });

  it('fullScreen 使用固定头部且只有 content 区域承担滚动', async () => {
    mount(MatDialog, {
      props: {
        modelValue: true,
        fullScreen: true,
        title: '全屏编辑',
        content: '很长的正文',
      },
      slots: {
        actions: '<button>保存</button>',
      },
    });

    await settleRender();

    const element = document.body.querySelector('dialog');

    expect(element.classList).toContain('mat-dialog--full-screen');
    expect(element.querySelector('.mat-dialog__header')).not.toBeNull();
    expect(element.querySelector('.mat-dialog__content').textContent).toContain('很长的正文');
    expect(element.querySelector('.mat-dialog__actions').textContent).toContain('保存');
    expect(element.querySelector('.mat-dialog__close').getAttribute('aria-label')).toBe('关闭');
  });

  it('Escape 总是请求关闭，点击帷幕仅由 closeOnBack 控制', async () => {
    const wrapper = mount(MatDialog, {
      props: {
        modelValue: true,
        title: '关闭行为',
      },
    });

    await settleRender();

    const element = document.body.querySelector('dialog');
    const cancelEvent = new Event('cancel', { cancelable: true });

    element.dispatchEvent(cancelEvent);

    expect(cancelEvent.defaultPrevented).toBe(true);
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);

    const escapeEvent = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 'Escape',
    });

    element.dispatchEvent(escapeEvent);

    expect(escapeEvent.defaultPrevented).toBe(true);
    expect(wrapper.emitted('update:modelValue')).toHaveLength(2);

    element.getBoundingClientRect = () => ({
      bottom: 200,
      left: 100,
      right: 200,
      top: 100,
    });
    element.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      clientX: 0,
      clientY: 0,
    }));

    expect(wrapper.emitted('update:modelValue')).toHaveLength(2);

    await wrapper.setProps({ closeOnBack: true });
    element.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      clientX: 0,
      clientY: 0,
    }));

    expect(wrapper.emitted('update:modelValue')).toHaveLength(3);
  });

  it('scrim=false 保持透明帷幕，多 Dialog 只显示顶层帷幕', async () => {
    const first = mount(MatDialog, {
      props: {
        modelValue: true,
        title: '第一层',
      },
    });
    const second = mount(MatDialog, {
      props: {
        modelValue: true,
        scrim: false,
        title: '第二层',
      },
    });

    await settleRender();

    const elements = [...document.body.querySelectorAll('dialog')];

    expect(elements).toHaveLength(2);
    expect(elements[0].classList).not.toContain('mat-dialog--top');
    expect(elements[1].classList).toContain('mat-dialog--top');
    expect(elements[1].classList).toContain('mat-dialog--transparent-scrim');

    await second.setProps({ modelValue: false });
    await vi.advanceTimersByTimeAsync(200);

    expect(document.body.querySelector('dialog')).toBe(elements[0]);
    expect(elements[0].classList).toContain('mat-dialog--top');

    await first.setProps({ modelValue: false });
    await vi.advanceTimersByTimeAsync(200);
  });

  it('与 Toolbar 同时存在时仍通过原生 showModal 保持 top layer', async () => {
    const toolbar = mount(MatToolbar, {
      attachTo: document.body,
    });
    const dialog = mount(MatDialog, {
      props: {
        modelValue: true,
        title: '高于 Toolbar 的 Dialog',
      },
    });

    await settleRender();

    const dialogElement = document.body.querySelector('dialog');

    expect(document.body.querySelector('.mat-toolbar')).not.toBeNull();
    expect(dialogElement).not.toBeNull();
    expect(dialogElement.open).toBe(true);
    expect(dialogElement.style.zIndex).toBe('');

    await dialog.setProps({ modelValue: false });
    await vi.advanceTimersByTimeAsync(200);
    toolbar.unmount();
    dialog.unmount();
  });

  it('打开时聚焦首个操作，关闭完成后恢复原焦点', async () => {
    const trigger = document.createElement('button');

    trigger.textContent = '触发器';
    document.body.append(trigger);
    trigger.focus();

    const wrapper = mount(MatDialog, {
      props: {
        modelValue: true,
        title: '焦点测试',
      },
      slots: {
        actions: '<button class="focus-action">确定</button>',
      },
    });

    await settleRender();

    expect(document.activeElement.classList).toContain('focus-action');

    await wrapper.setProps({ modelValue: false });
    await vi.advanceTimersByTimeAsync(200);
    await nextTick();

    expect(document.activeElement).toBe(trigger);
  });

  it('没有可访问名称时给出警告', async () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});

    mount(MatDialog, {
      props: { modelValue: true },
    });
    await settleRender();

    expect(warning).toHaveBeenCalledWith(
      'MatDialog: 必须通过 title、title Slot、aria-label 或 aria-labelledby 提供可访问名称',
    );
  });
});
