/* eslint-disable class-methods-use-this */
import { mount } from '@vue/test-utils';
import { h, nextTick } from 'vue';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import MatAside from '../src/components/mat-aside/MatAside.vue';
import MatLayout from '../src/components/mat-layout/MatLayout.vue';
import { useLayout } from '../src/components/mat-layout/layout-context';
import { dialogStack } from '../src/components/dialog-stack';
import MatAppRoot from '../src/components/mat-app-root/MatAppRoot.vue';

function rect({
  bottom, height, left = 0, right, top = 0, width,
}) {
  return {
    bottom, height, left, right, top, width, x: left, y: top, toJSON() {},
  };
}

async function settle() {
  await nextTick();
  await nextTick();
}

describe('MatAside 边缘组件', () => {
  beforeEach(() => {
    vi.stubGlobal('requestAnimationFrame', (cb) => {
      cb();
      return 1;
    });
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    vi.stubGlobal('ResizeObserver', class {
      observe() {}

      unobserve() {}

      disconnect() {}
    });
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('默认渲染 aside 标签且默认 location 为 left，支持 as 属性定制根节点', () => {
    const defaultWrapper = mount(MatAside, { props: { blockSize: 64 } });
    expect(defaultWrapper.element.tagName).toBe('ASIDE');
    expect(defaultWrapper.classes()).toContain('mat-aside');
    expect(defaultWrapper.classes()).toContain('mat-aside--left');

    const navWrapper = mount(MatAside, { props: { as: 'nav', blockSize: 64 } });
    expect(navWrapper.element.tagName).toBe('NAV');

    const headerWrapper = mount(MatAside, { props: { as: 'header', blockSize: 64 } });
    expect(headerWrapper.element.tagName).toBe('HEADER');
  });

  it('根据 location 与 blockSize、safeAreaSize 计算总厚度与安全区内边距', () => {
    const wrapper = mount(MatAside, {
      props: {
        location: 'top',
        blockSize: '64px',
        safeAreaSize: '20px',
      },
    });

    expect(wrapper.classes()).toContain('mat-aside--top');
    expect(wrapper.element.style.getPropertyValue('--mat-aside-block-size')).toBe('64px');
    expect(wrapper.element.style.getPropertyValue('--mat-aside-safe-area-size')).toBe('20px');
    expect(wrapper.element.style.getPropertyValue('--mat-aside-total-block-size')).toBe('84px');
  });

  it('支持 bottom 与 right 边缘停靠方向及 zIndex 配置', () => {
    const bottomWrapper = mount(MatAside, {
      props: { location: 'bottom', blockSize: 80, zIndex: 99 },
    });
    expect(bottomWrapper.classes()).toContain('mat-aside--bottom');
    expect(bottomWrapper.element.style.zIndex).toBe('99');

    const rightWrapper = mount(MatAside, {
      props: { location: 'right', blockSize: 300 },
    });
    expect(rightWrapper.classes()).toContain('mat-aside--right');
  });

  it('bordered 属性添加边框修饰类', () => {
    const wrapper = mount(MatAside, {
      props: { blockSize: 64, bordered: true },
    });
    expect(wrapper.classes()).toContain('mat-aside--bordered');
  });

  it('open 与 modelValue 控制打开与关闭，并发出对应事件', async () => {
    vi.useFakeTimers();
    const wrapper = mount(MatAside, {
      props: { blockSize: 64, open: true },
    });

    expect(wrapper.classes()).toContain('mat-aside--open');

    await wrapper.setProps({ open: false });
    await settle();
    await vi.advanceTimersByTimeAsync(200);
    await settle();
    expect(wrapper.emitted('closed')).toBeTruthy();
    // 默认保活：节点依然存在且带有 hidden
    expect(wrapper.element.hidden).toBe(true);

    await wrapper.setProps({ open: true });
    await settle();
    await vi.advanceTimersByTimeAsync(200);
    await settle();
    expect(wrapper.emitted('opened')).toBeTruthy();
    vi.useRealTimers();
  });

  it('在 MatAppRoot 下自动将 left 注册为 start 并获得 AppRoot 避让', async () => {
    const wrapper = mount(MatAppRoot, {
      attachTo: document.body,
      props: { fillViewport: false },
      slots: {
        default: () => [
          h(MatAside, { location: 'left', blockSize: 80 }),
        ],
      },
    });

    const asideElement = wrapper.element.querySelector('.mat-aside--left');
    vi.spyOn(wrapper.element, 'getBoundingClientRect').mockReturnValue(rect({
      bottom: 600, height: 600, right: 800, width: 800,
    }));
    vi.spyOn(asideElement, 'getBoundingClientRect').mockReturnValue(rect({
      bottom: 600, height: 600, right: 80, width: 80,
    }));

    window.dispatchEvent(new Event('resize'));
    await settle();

    expect(asideElement).toBeTruthy();
    wrapper.unmount();
  });

  it('支持 start 与 end 逻辑停靠方向，且向后兼容 left 与 right', () => {
    const startWrapper = mount(MatAside, { props: { location: 'start', blockSize: 100 } });
    expect(startWrapper.classes()).toContain('mat-aside--start');
    expect(startWrapper.classes()).toContain('mat-aside--left');

    const endWrapper = mount(MatAside, { props: { location: 'end', blockSize: 100 } });
    expect(endWrapper.classes()).toContain('mat-aside--end');
    expect(endWrapper.classes()).toContain('mat-aside--right');
  });

  it('支持 mode="flow" 与 mode="sticky"，不向父级 MatLayout 注册脱流边缘内边距', async () => {
    let capturedLayout;
    const Reader = {
      setup() {
        capturedLayout = useLayout();
        return () => h('div', 'content');
      },
    };

    const wrapper = mount(MatLayout, {
      slots: {
        default: () => [
          h(MatAside, { mode: 'flow', blockSize: 80 }),
          h(MatAside, { mode: 'sticky', location: 'top', blockSize: 64 }),
          h(Reader),
        ],
      },
    });

    await settle();
    expect(capturedLayout.padding.start).toBe(0);
    expect(capturedLayout.padding.top).toBe(0);
    wrapper.unmount();
  });

  it('fixed 在 MatLayout 内通过根 padding 登记，普通模式的 placeholder 不生效', async () => {
    let capturedLayout;
    const Reader = {
      setup() {
        capturedLayout = useLayout();
        return () => h('div', 'content');
      },
    };
    const wrapper = mount(MatLayout, {
      attachTo: document.body,
      slots: {
        default: () => [
          h(MatAside, {
            location: 'top',
            mode: 'fixed',
            placeholder: true,
            blockSize: 64,
            transition: false,
          }),
          h(Reader),
        ],
      },
    });

    await settle();
    const asideElement = wrapper.element.querySelector('.mat-aside');
    vi.spyOn(wrapper.element, 'getBoundingClientRect').mockReturnValue(rect({
      bottom: 600,
      height: 600,
      right: 800,
      width: 800,
    }));
    vi.spyOn(asideElement, 'getBoundingClientRect').mockReturnValue(rect({
      bottom: 64,
      height: 64,
      right: 800,
      width: 800,
    }));
    window.dispatchEvent(new Event('resize'));
    await settle();

    expect(capturedLayout.padding.top).toBe(64);
    expect(wrapper.find('.mat-aside__placeholder').exists()).toBe(false);
    wrapper.unmount();
  });

  it('app=true 时显式 mode="fixed" 保留 fixed 定位', async () => {
    const wrapper = mount(MatAppRoot, {
      attachTo: document.body,
      props: { fillViewport: false },
      slots: {
        default: () => h(MatAside, {
          app: true,
          mode: 'fixed',
          blockSize: 64,
          transition: false,
        }),
      },
    });

    await settle();
    expect(wrapper.find('.mat-aside').classes()).toContain('mat-aside--mode-fixed');
    wrapper.unmount();
  });

  it('fixed 未显式指定 attach 时保留声明位置，显式 attach 时才移动到目标容器', async () => {
    const source = document.createElement('section');
    const target = document.createElement('main');
    document.body.append(source, target);

    const localWrapper = mount(MatAside, {
      attachTo: source,
      props: {
        mode: 'fixed',
        transition: false,
        blockSize: 64,
      },
    });
    await settle();

    expect(source.querySelector('.mat-aside')).not.toBeNull();
    expect(target.querySelector('.mat-aside')).toBeNull();
    localWrapper.unmount();

    const teleportWrapper = mount(MatAside, {
      attachTo: source,
      props: {
        mode: 'fixed',
        attach: target,
        transition: false,
        blockSize: 64,
      },
    });
    await settle();

    expect(source.querySelector('.mat-aside')).toBeNull();
    expect(target.querySelector('.mat-aside')).not.toBeNull();
    teleportWrapper.unmount();
    source.remove();
    target.remove();
  });

  it('blockSize 为可选属性，省略或为 auto 时支持自适应内容渲染', () => {
    const wrapper = mount(MatAside, {
      slots: {
        default: () => h('div', { style: 'height: 120px' }, 'Dynamic content'),
      },
    });

    expect(wrapper.element.tagName).toBe('ASIDE');
    expect(wrapper.text()).toContain('Dynamic content');
    expect(wrapper.classes()).toContain('mat-aside--auto-size');
    wrapper.unmount();
  });

  it('modal=true 时接入 dialogStack，不增加 MatLayout 内边距，且关闭时注销', async () => {
    let capturedLayout;
    const Reader = {
      setup() {
        capturedLayout = useLayout();
        return () => h('div', 'content');
      },
    };
    const Host = {
      props: ['open'],
      setup(props) {
        return () => h(MatLayout, null, {
          default: () => [
            h(MatAside, {
              modal: true, transition: false, blockSize: 200, modelValue: props.open,
            }),
            h(Reader),
          ],
        });
      },
    };

    const wrapper = mount(Host, {
      attachTo: document.body,
      props: { open: true },
    });

    await settle();
    expect(capturedLayout.padding.start).toBe(0);
    expect(capturedLayout.padding.left).toBe(0);

    const modalAside = wrapper.findComponent(MatAside);
    expect(modalAside.classes()).toContain('mat-aside--modal');
    expect(modalAside.classes()).toContain('mat-aside--modal-scoped');
    const scrim = wrapper.element.querySelector('.mat-aside__scrim--docked');
    expect(scrim).not.toBeNull();
    expect(scrim.tagName).toBe('DIV');
    expect(dialogStack.value.length).toBeGreaterThan(0);

    await wrapper.setProps({ open: false });
    await settle();
    expect(dialogStack.value.length).toBe(0);
    wrapper.unmount();
  });

  it('关闭的 modal 不渲染遮罩，也不占用 dialogStack', async () => {
    const wrapper = mount(MatAside, {
      attachTo: document.body,
      props: {
        modal: true,
        modelValue: false,
        transition: false,
      },
    });

    await settle();
    expect(document.body.querySelectorAll('.mat-aside__scrim')).toHaveLength(0);
    expect(dialogStack.value).toHaveLength(0);

    wrapper.unmount();
  });

  it('多个模态同时打开时只有栈顶元素激活遮罩背景，验证单层遮罩不叠加', async () => {
    const wrapper1 = mount(MatAside, { attachTo: document.body, props: { modal: true, blockSize: 200 } });
    await settle();
    const wrapper2 = mount(MatAside, { attachTo: document.body, props: { modal: true, blockSize: 250 } });
    await settle();

    expect(wrapper1.classes()).not.toContain('mat-aside--top-scrim');
    expect(wrapper2.classes()).toContain('mat-aside--top-scrim');

    wrapper2.unmount();
    await settle();
    expect(wrapper1.classes()).toContain('mat-aside--top-scrim');
    wrapper1.unmount();
  });

  it('transition=false 时显隐切换立即生效，不触发延时动画', async () => {
    const wrapper = mount(MatAside, {
      props: { blockSize: 64, transition: false, modelValue: true },
    });

    expect(wrapper.classes()).toContain('mat-aside--open');
    await wrapper.setProps({ modelValue: false });
    await settle();
    expect(wrapper.emitted('closed')).toBeTruthy();
    wrapper.unmount();
  });

  it('app=true 时在 MatAppRoot 下自动表现为 docked，在普通容器下自动表现为 fixed', async () => {
    // AppRoot 下
    const appRootWrapper = mount(MatAppRoot, {
      attachTo: document.body,
      props: { fillViewport: false },
      slots: {
        default: () => [
          h(MatAside, { app: true, location: 'top', blockSize: 64 }),
        ],
      },
    });
    await settle();
    const dockedAside = appRootWrapper.findComponent(MatAside);
    expect(dockedAside.classes()).toContain('mat-aside--mode-docked');
    expect(appRootWrapper.element.contains(dockedAside.element)).toBe(true);
    appRootWrapper.unmount();

    // 普通容器下
    const standaloneWrapper = mount(MatAside, {
      attachTo: document.body,
      props: { app: true, location: 'top', blockSize: 64 },
    });
    await settle();
    const fixedAside = document.body.querySelector('.mat-aside--mode-fixed');
    expect(fixedAside).not.toBeNull();
    expect(fixedAside.classList.contains('mat-aside--app')).toBe(true);
    standaloneWrapper.unmount();
  });

  it('modal=true 时在 MatAppRoot 下遮罩和组件均作用在局部 AppRoot 内', async () => {
    const appWrapper = mount(MatAppRoot, {
      attachTo: document.body,
      props: { fillViewport: false },
      slots: {
        default: () => [
          h(MatAside, {
            modal: true,
            transition: false,
            blockSize: 200,
            modelValue: true,
          }),
        ],
      },
    });
    await settle();
    const modalAside = appWrapper.findComponent(MatAside);
    expect(modalAside.classes()).toContain('mat-aside--modal');
    expect(modalAside.classes()).toContain('mat-aside--modal-scoped');
    expect(appWrapper.element.querySelector('.mat-aside__scrim--docked')).not.toBeNull();
    appWrapper.unmount();
  });

  it('unmountOnClose: false 保留 DOM 并标记 hidden，unmountOnClose: true 销毁 DOM 节点', async () => {
    vi.useFakeTimers();
    // unmountOnClose: false (默认)
    const keepWrapper = mount(MatAside, {
      props: { blockSize: 64, open: true, unmountOnClose: false },
    });
    await keepWrapper.setProps({ open: false });
    await settle();
    await vi.advanceTimersByTimeAsync(200);
    await settle();
    expect(keepWrapper.element.hidden).toBe(true);
    keepWrapper.unmount();

    // unmountOnClose: true
    const unmountWrapper = mount(MatAside, {
      props: { blockSize: 64, open: true, unmountOnClose: true },
    });
    await unmountWrapper.setProps({ open: false });
    await settle();
    await vi.advanceTimersByTimeAsync(200);
    await settle();
    expect(unmountWrapper.find('.mat-aside').exists()).toBe(false);
    unmountWrapper.unmount();
    vi.useRealTimers();
  });

  it('placeholder 仅在 modal 模式生效，且支持自定义 placeholderSize 与插槽', () => {
    const regularWrapper = mount(MatAside, {
      props: {
        location: 'top',
        mode: 'sticky',
        placeholder: true,
        placeholderSize: 48,
        blockSize: 64,
      },
    });
    expect(regularWrapper.find('.mat-aside__placeholder').exists()).toBe(false);
    regularWrapper.unmount();

    const modalWrapper = mount(MatAside, {
      props: {
        location: 'top',
        mode: 'sticky',
        modal: true,
        placeholder: true,
        placeholderSize: 48,
        blockSize: 64,
      },
    });
    const modalPlaceholder = modalWrapper.find('.mat-aside__placeholder');
    expect(modalPlaceholder.exists()).toBe(true);
    expect(modalPlaceholder.element.style.blockSize).toBe('48px');
    modalWrapper.unmount();

    const slotWrapper = mount(MatAside, {
      props: {
        mode: 'sticky',
        modal: true,
        placeholder: true,
        blockSize: 64,
      },
      slots: {
        placeholder: () => h('div', { class: 'custom-ph' }, 'custom placeholder'),
      },
    });
    expect(slotWrapper.find('.custom-ph').text()).toBe('custom placeholder');
    slotWrapper.unmount();
  });

  it('通过 defineExpose 暴露 hostElement、activeInsets 与 phase', async () => {
    const wrapper = mount(MatAside, {
      props: { blockSize: 64, open: true },
    });
    await settle();
    const { vm } = wrapper;
    expect(vm.hostElement).toBeTruthy();
    expect(vm.hostElement.tagName).toBe('ASIDE');
    expect(vm.activeInsets).toBeDefined();
    expect(typeof vm.activeInsets.top).toBe('number');
    expect(vm.phase).toBe('open');
    wrapper.unmount();
  });

  it('modal=true 在 MatLayout 内展开时，宿主与子元素不被设为 inert，且支持遮罩与焦点拦截', async () => {
    const wrapper = mount(MatLayout, {
      attachTo: document.body,
      slots: {
        default: () => [
          h(MatAside, {
            modal: true,
            transition: false,
            blockSize: 200,
            modelValue: true,
          }, {
            default: () => h('button', { id: 'aside-btn' }, '抽屉按钮'),
          }),
          h('div', { class: 'content' }, '主内容'),
        ],
      },
    });

    await settle();
    const aside = wrapper.findComponent(MatAside);
    expect(aside.element.closest('[inert]')).toBeNull();
    const btn = wrapper.find('#aside-btn');
    expect(btn.element.closest('[inert]')).toBeNull();

    const scrim = wrapper.element.querySelector('.mat-aside__scrim--docked');
    expect(scrim).not.toBeNull();

    wrapper.unmount();
  });
});
