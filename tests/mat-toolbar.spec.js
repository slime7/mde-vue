import { mount } from '@vue/test-utils';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import { h, nextTick } from 'vue';
import MatToolbar from '../src/components/mat-toolbar/MatToolbar.vue';

async function settleRender() {
  await nextTick();
  await nextTick();
}

function toolbarElement() {
  return document.body.querySelector('.mat-toolbar');
}

describe('MatToolbar', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('默认渲染 docked Toolbar，默认 Slot 可容纳按钮', async () => {
    const wrapper = mount(MatToolbar, {
      attachTo: document.body,
      slots: {
        default: () => h('button', { type: 'button' }, '保存'),
      },
    });

    await settleRender();

    const toolbar = toolbarElement();

    expect(toolbar).not.toBeNull();
    expect(toolbar.getAttribute('role')).toBe('toolbar');
    expect(toolbar.getAttribute('aria-orientation')).toBeNull();
    expect(toolbar.querySelector('.mat-toolbar__content button').textContent).toBe('保存');

    wrapper.unmount();
  });

  it('默认保留在声明容器内，app=true 时才挂载到应用目标', async () => {
    const source = document.createElement('section');
    const attach = document.createElement('main');
    attach.id = 'toolbar-app-target';
    document.body.append(source, attach);
    const wrapper = mount(MatToolbar, {
      attachTo: source,
      props: {
        attach: '#toolbar-app-target',
      },
    });

    await settleRender();
    expect(source.querySelector('.mat-toolbar')).not.toBeNull();
    expect(attach.querySelector('.mat-toolbar')).toBeNull();

    await wrapper.setProps({ app: true });
    await settleRender();

    expect(source.querySelector('.mat-toolbar')).toBeNull();
    expect(attach.querySelector('.mat-toolbar')).not.toBeNull();

    wrapper.unmount();
    source.remove();
    attach.remove();
  });

  it('app=true 的无效 attach 给出警告且不渲染 Toolbar', async () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mount(MatToolbar, {
      attachTo: document.body,
      props: {
        app: true,
        attach: '#missing-toolbar-app-target',
      },
    });

    await settleRender();

    expect(toolbarElement()).toBeNull();
    expect(warning).toHaveBeenCalledWith(
      'MatToolbar: attach 必须指向当前 document 中存在的 HTMLElement',
    );

    wrapper.unmount();
  });

  it('将 floating 规范化为 floating-bottom，并在悬浮模式渲染 fab Slot', async () => {
    const wrapper = mount(MatToolbar, {
      attachTo: document.body,
      props: {
        variant: 'floating',
      },
      slots: {
        default: () => h('button', { type: 'button' }, '更多'),
        fab: () => h('button', { class: 'toolbar-fab', type: 'button' }, '新增'),
      },
    });

    await settleRender();

    const toolbar = toolbarElement();

    expect(toolbar.querySelector('.mat-toolbar__surface .mat-toolbar__fab')).toBeNull();
    expect(toolbar.querySelector('.mat-toolbar__fab').parentElement).toBe(toolbar);
    expect(toolbar.querySelector('.mat-toolbar__fab .toolbar-fab')).not.toBeNull();

    wrapper.unmount();
  });

  it('通过 modelValue 控制显示，关闭期间保留 Toolbar 并在动画后移除', async () => {
    vi.useFakeTimers();

    try {
      const wrapper = mount(MatToolbar, {
        attachTo: document.body,
        props: {
          app: true,
          modelValue: false,
        },
      });

      await settleRender();

      expect(toolbarElement()).toBeNull();

      await wrapper.setProps({ modelValue: true });
      await settleRender();

      const toolbar = toolbarElement();

      await vi.advanceTimersByTimeAsync(199);

      await vi.advanceTimersByTimeAsync(1);
      await settleRender();
      expect(document.body.contains(toolbar)).toBe(true);

      await wrapper.setProps({ modelValue: false });
      await settleRender();

      expect(document.body.contains(toolbar)).toBe(true);

      await vi.advanceTimersByTimeAsync(199);
      expect(document.body.contains(toolbar)).toBe(true);

      await vi.advanceTimersByTimeAsync(1);
      await settleRender();
      expect(document.body.contains(toolbar)).toBe(false);

      wrapper.unmount();
    } finally {
      vi.useRealTimers();
    }
  });

  it('左右悬浮模式使用垂直方向，并设置 aria-orientation', async () => {
    const wrapper = mount(MatToolbar, {
      attachTo: document.body,
      props: {
        variant: 'floating-right',
      },
      slots: {
        default: () => [
          h('button', { type: 'button' }, '上一项'),
          h('button', { type: 'button' }, '下一项'),
        ],
      },
    });

    await settleRender();

    const toolbar = toolbarElement();

    expect(toolbar.getAttribute('aria-orientation')).toBe('vertical');

    wrapper.unmount();
  });

  it('允许多个 floating Toolbar 同时存在', async () => {
    const startWrapper = mount(MatToolbar, {
      attachTo: document.body,
      props: {
        position: 'start',
        variant: 'floating-bottom',
      },
    });
    const endWrapper = mount(MatToolbar, {
      attachTo: document.body,
      props: {
        position: 'end',
        variant: 'floating-bottom',
      },
    });

    await settleRender();

    const toolbars = [...document.body.querySelectorAll('.mat-toolbar')];

    expect(toolbars).toHaveLength(2);

    startWrapper.unmount();
    endWrapper.unmount();
  });

  it('停靠模式忽略 fab Slot 并给出使用提示', async () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mount(MatToolbar, {
      attachTo: document.body,
      slots: {
        fab: () => h('button', { type: 'button' }, '新增'),
      },
    });

    await settleRender();

    expect(toolbarElement().querySelector('.mat-toolbar__fab')).toBeNull();
    expect(warning).toHaveBeenCalledWith('MatToolbar: fab Slot 仅支持 floating variant');

    wrapper.unmount();
  });
});
