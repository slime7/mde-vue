import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { mount } from '@vue/test-utils';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import { h, nextTick } from 'vue';
import MatToolbar from '../src/components/mat-toolbar/MatToolbar.vue';

const componentSource = readFileSync(
  resolve('src/components/mat-toolbar/MatToolbar.vue'),
  'utf8',
);
const stylesSource = readFileSync(resolve('src/styles/index.css'), 'utf8');

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
    expect(toolbar.classList).toContain('mat-toolbar--docked');
    expect(toolbar.getAttribute('role')).toBe('toolbar');
    expect(toolbar.getAttribute('aria-orientation')).toBeNull();
    expect(toolbar.querySelector('.mat-toolbar__content button').textContent).toBe('保存');
    expect(document.body.querySelector('.mat-toolbar__placeholder')).toBeNull();

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

    expect(toolbar.classList).toContain('mat-toolbar--floating-bottom');
    expect(toolbar.querySelector('.mat-toolbar__fab .toolbar-fab')).not.toBeNull();

    wrapper.unmount();
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

    expect(toolbar.classList).toContain('mat-toolbar--floating-right');
    expect(toolbar.classList).toContain('mat-toolbar--vertical');
    expect(toolbar.getAttribute('aria-orientation')).toBe('vertical');

    wrapper.unmount();
  });

  it('placeholder=false 时不生成自然布局占位，即使设置了 bottomPlaceholder', async () => {
    const wrapper = mount(MatToolbar, {
      attachTo: document.body,
      props: {
        bottomPlaceholder: 24,
        placeholder: false,
      },
    });

    await settleRender();

    expect(document.body.querySelector('.mat-toolbar__placeholder')).toBeNull();
    expect(toolbarElement().style.getPropertyValue('--mat-toolbar-bottom-placeholder')).toBe('24px');

    wrapper.unmount();
  });

  it('左右悬浮模式忽略 bottomPlaceholder 的底部安全区', async () => {
    const wrapper = mount(MatToolbar, {
      attachTo: document.body,
      props: {
        bottomPlaceholder: 24,
        variant: 'floating-left',
      },
    });

    await settleRender();

    expect(toolbarElement().style.getPropertyValue('--mat-toolbar-bottom-placeholder')).toBe('0px');

    wrapper.unmount();
  });

  it('placeholder=true 时按实际 Toolbar 尺寸生成横向占位，并包含安全区', async () => {
    const wrapper = mount(MatToolbar, {
      attachTo: document.body,
      props: {
        bottomPlaceholder: 16,
        placeholder: true,
      },
    });

    await settleRender();

    const toolbar = toolbarElement();
    const placeholder = document.body.querySelector('.mat-toolbar__placeholder');

    vi.spyOn(toolbar, 'getBoundingClientRect').mockReturnValue({
      bottom: 600,
      height: 80,
      left: 0,
      right: 400,
      top: 520,
      width: 400,
    });
    window.dispatchEvent(new Event('resize'));
    await settleRender();

    expect(placeholder).not.toBeNull();
    expect(placeholder.style.blockSize).toBe('80px');
    expect(placeholder.style.inlineSize).toBe('400px');

    wrapper.unmount();
  });

  it('垂直 Toolbar 的占位使用交叉轴 inline-size', async () => {
    const wrapper = mount(MatToolbar, {
      attachTo: document.body,
      props: {
        placeholder: true,
        variant: 'floating-left',
      },
    });

    await settleRender();

    const toolbar = toolbarElement();
    const placeholder = document.body.querySelector('.mat-toolbar__placeholder');

    vi.spyOn(toolbar, 'getBoundingClientRect').mockReturnValue({
      bottom: 500,
      height: 300,
      left: 24,
      right: 96,
      top: 200,
      width: 72,
    });
    window.dispatchEvent(new Event('resize'));
    await settleRender();

    expect(placeholder.style.inlineSize).toBe('72px');
    expect(placeholder.style.blockSize).toBe('300px');

    wrapper.unmount();
  });

  it('使用 ResizeObserver 同步动态 Toolbar 尺寸', async () => {
    const observers = [];
    const ResizeObserverMock = class {
      constructor(callback) {
        this.callback = callback;
        this.disconnect = vi.fn();
        this.observe = vi.fn();
        observers.push(this);
      }
    };

    vi.stubGlobal('ResizeObserver', ResizeObserverMock);
    const wrapper = mount(MatToolbar, {
      attachTo: document.body,
      props: {
        placeholder: true,
      },
    });

    await settleRender();

    const toolbar = toolbarElement();
    const placeholder = document.body.querySelector('.mat-toolbar__placeholder');

    vi.spyOn(toolbar, 'getBoundingClientRect').mockReturnValue({
      bottom: 400,
      height: 96,
      left: 0,
      right: 420,
      top: 304,
      width: 420,
    });
    observers[0].callback();
    await settleRender();

    expect(observers[0].observe).toHaveBeenCalledWith(toolbar);
    expect(placeholder.style.blockSize).toBe('96px');
    expect(placeholder.style.inlineSize).toBe('420px');

    wrapper.unmount();
    expect(observers[0].disconnect).toHaveBeenCalled();
  });

  it('校验 variant、bottomPlaceholder 和 fab Slot 约束', () => {
    expect(MatToolbar.props.variant.validator('docked')).toBe(true);
    expect(MatToolbar.props.variant.validator('floating')).toBe(true);
    expect(MatToolbar.props.variant.validator('floating-left')).toBe(true);
    expect(MatToolbar.props.variant.validator('invalid')).toBe(false);
    expect(MatToolbar.props.bottomPlaceholder.validator(0)).toBe(true);
    expect(MatToolbar.props.bottomPlaceholder.validator('env(safe-area-inset-bottom)')).toBe(true);
    expect(MatToolbar.props.bottomPlaceholder.validator(-1)).toBe(false);
    expect(MatToolbar.props.bottomPlaceholder.validator('')).toBe(false);
    expect(componentSource).toContain('fab Slot 仅支持 floating');
    expect(stylesSource).toContain('--mat-toolbar-container-height: 64px;');
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
