import { mount } from '@vue/test-utils';
import {
  defineComponent, h, nextTick, ref,
} from 'vue';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import MatAppRoot from '../src/components/mat-app-root/MatAppRoot.vue';
import { useMatApp } from '../src/components/mat-app-root/mat-app-root-context';
import MatFab from '../src/components/mat-fab/MatFab.vue';
import MatNavigationRail from '../src/components/mat-navigation-rail/MatNavigationRail.vue';
import MatSnackbar from '../src/components/mat-snackbar/MatSnackbar.vue';
import MatToolbar from '../src/components/mat-toolbar/MatToolbar.vue';
import MatTooltip from '../src/components/mat-tooltip/MatTooltip.vue';

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

async function settleMeasurement() {
  await new Promise((resolve) => {
    window.setTimeout(resolve, 20);
  });
  await settleRender();
}

function layoutCapture(onCapture) {
  return defineComponent({
    setup() {
      onCapture(useMatApp());
      return () => null;
    },
  });
}

describe('MatAppRoot 组件接入', () => {
  beforeEach(() => {
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

  it('docked Toolbar 自动进入当前 AppRoot 并注册 bottom，floating 不占布局且保留显式占位', async () => {
    let app;
    const Capture = layoutCapture((value) => {
      app = value;
    });
    const wrapper = mount(MatAppRoot, {
      attachTo: document.body,
      props: { fillViewport: false },
      slots: {
        default: () => [
          h(Capture),
          h(MatToolbar, { app: true }),
        ],
      },
    });

    await settleRender();
    const toolbar = wrapper.element.querySelector('[role="toolbar"]');

    vi.spyOn(wrapper.element, 'getBoundingClientRect').mockReturnValue(elementRect({
      bottom: 600,
      height: 600,
      right: 900,
      width: 900,
    }));
    vi.spyOn(toolbar, 'getBoundingClientRect').mockReturnValue(elementRect({
      bottom: 600,
      height: 64,
      right: 900,
      top: 536,
      width: 900,
    }));
    window.dispatchEvent(new Event('resize'));
    await settleMeasurement();

    expect(app.layout.padding.bottom).toBe(64);

    await wrapper.unmount();

    const floatingWrapper = mount(MatAppRoot, {
      attachTo: document.body,
      props: { fillViewport: false },
      slots: {
        default: () => [
          h(Capture),
          h(MatToolbar, {
            app: true,
            placeholder: true,
            variant: 'floating-bottom',
          }),
        ],
      },
    });

    await settleRender();
    const floating = floatingWrapper.element.querySelector('[role="toolbar"]');

    vi.spyOn(floatingWrapper.element, 'getBoundingClientRect').mockReturnValue(elementRect({
      bottom: 600,
      height: 600,
      right: 900,
      width: 900,
    }));
    vi.spyOn(floating, 'getBoundingClientRect').mockReturnValue(elementRect({
      bottom: 584,
      height: 64,
      left: 350,
      right: 550,
      top: 520,
      width: 200,
    }));
    window.dispatchEvent(new Event('resize'));
    await settleMeasurement();

    expect(app.layout.padding.bottom).toBe(0);
    expect(floatingWrapper.element.querySelector('[aria-hidden="true"]')).not.toBeNull();

    floatingWrapper.unmount();
  });

  it('NavigationRail 自动注册逻辑边缘，modal 展开时只保留 collapsed host 宽度', async () => {
    let app;
    const Capture = layoutCapture((value) => {
      app = value;
    });
    const wrapper = mount(MatAppRoot, {
      attachTo: document.body,
      props: { fillViewport: false },
      slots: {
        default: () => [
          h(Capture),
          h(MatNavigationRail, {
            app: true,
            expanded: true,
            layout: 'modal',
          }),
        ],
      },
    });

    await settleRender();
    const navigation = wrapper.element.querySelector('nav');

    vi.spyOn(wrapper.element, 'getBoundingClientRect').mockReturnValue(elementRect({
      bottom: 700,
      height: 700,
      right: 1000,
      width: 1000,
    }));
    vi.spyOn(navigation.parentElement, 'getBoundingClientRect').mockReturnValue(elementRect({
      bottom: 700,
      height: 700,
      right: 96,
      width: 96,
    }));
    vi.spyOn(navigation, 'getBoundingClientRect').mockReturnValue(elementRect({
      bottom: 700,
      height: 700,
      right: 360,
      width: 360,
    }));
    window.dispatchEvent(new Event('resize'));
    await settleMeasurement();

    expect(app.layout.padding.start).toBe(96);

    wrapper.unmount();
  });

  it('NavigationRail 设置 placeholder=true 时在声明位置生成占位且不占用 AppRoot 边缘 padding', async () => {
    let app;
    const Capture = layoutCapture((value) => {
      app = value;
    });
    const wrapper = mount(MatAppRoot, {
      attachTo: document.body,
      props: { fillViewport: false },
      slots: {
        default: () => [
          h(Capture),
          h(MatNavigationRail, {
            app: true,
            placeholder: true,
          }),
        ],
      },
    });

    await settleRender();
    const navigation = wrapper.element.querySelector('nav');

    vi.spyOn(wrapper.element, 'getBoundingClientRect').mockReturnValue(elementRect({
      bottom: 700,
      height: 700,
      right: 1000,
      width: 1000,
    }));
    vi.spyOn(navigation.parentElement, 'getBoundingClientRect').mockReturnValue(elementRect({
      bottom: 700,
      height: 700,
      right: 80,
      width: 80,
    }));
    window.dispatchEvent(new Event('resize'));
    await settleMeasurement();

    expect(app.layout.padding.start).toBe(0);
    expect(wrapper.element.querySelector('.mat-navigation-rail__placeholder')).not.toBeNull();

    wrapper.unmount();
  });

  it('Snackbar 和 app FAB 自动进入 AppRoot，且 Snackbar 始终位于普通浮动组上方', async () => {
    vi.useFakeTimers();
    const wrapper = mount(MatAppRoot, {
      attachTo: document.body,
      slots: {
        default: () => [
          h(MatFab, {
            app: true,
            'data-app-fab': '',
            icon: 'add',
            label: '新建',
            position: 'end',
          }),
          h(MatSnackbar, {
            duration: 0,
            modelValue: true,
            text: '已保存',
          }),
        ],
      },
    });

    await settleRender();

    const snackbar = wrapper.element.querySelector('[role="status"]');
    const fab = wrapper.element.querySelector('[data-app-fab]');

    expect(snackbar).not.toBeNull();
    expect(fab).not.toBeNull();
    expect([...wrapper.element.querySelectorAll('[role="status"], [data-app-fab]')])
      .toEqual([snackbar, fab]);

    wrapper.unmount();
  });

  it('Tooltip 的目标位于 AppRoot 内时进入当前应用，外部目标继续回退到 body', async () => {
    vi.useFakeTimers();
    const insideTarget = ref(null);
    const insideWrapper = mount(MatAppRoot, {
      attachTo: document.body,
      slots: {
        default: () => [
          h('button', { id: 'inside-tooltip-target', ref: insideTarget }, '内部目标'),
          h(MatTooltip, {
            content: '内部提示',
            modelValue: true,
            target: '#inside-tooltip-target',
          }),
        ],
      },
    });

    await settleRender();
    expect(insideWrapper.element.querySelector('[role="tooltip"]')?.textContent)
      .toContain('内部提示');
    insideWrapper.unmount();

    const outsideTarget = document.createElement('button');

    outsideTarget.id = 'outside-tooltip-target';
    document.body.append(outsideTarget);
    const outsideWrapper = mount(MatAppRoot, {
      attachTo: document.body,
      slots: {
        default: () => h(MatTooltip, {
          content: '外部提示',
          modelValue: true,
          target: outsideTarget,
        }),
      },
    });

    await settleRender();
    const outsideTooltip = document.body.querySelector('[role="tooltip"]');

    expect(outsideTooltip?.textContent).toContain('外部提示');
    expect(outsideWrapper.element.contains(outsideTooltip)).toBe(false);

    outsideWrapper.unmount();
  });

  it('先 Navigation 后 AppBar 时 Navigation 占通栏高度，AppBar 避让 Navigation 宽度', async () => {
    let app;
    const Capture = layoutCapture((value) => {
      app = value;
    });
    const wrapper = mount(MatAppRoot, {
      attachTo: document.body,
      props: { fillViewport: false },
      slots: {
        default: () => [
          h(Capture),
          h(MatNavigationRail, { app: true }),
          h(MatToolbar, { app: true, variant: 'docked' }),
        ],
      },
    });

    await settleRender();
    const railHost = wrapper.element.querySelector('.mat-navigation-rail-host');
    const toolbar = wrapper.element.querySelector('[role="toolbar"]');

    expect(wrapper.element.querySelector('.mat-app-root__edge-layer')).toBeNull();
    expect(railHost).not.toBeNull();
    expect(toolbar).not.toBeNull();

    vi.spyOn(wrapper.element, 'getBoundingClientRect').mockReturnValue(elementRect({
      bottom: 800,
      height: 800,
      right: 1200,
      width: 1200,
    }));
    vi.spyOn(railHost, 'getBoundingClientRect').mockReturnValue(elementRect({
      bottom: 800,
      height: 800,
      right: 80,
      top: 0,
      width: 80,
    }));
    vi.spyOn(toolbar, 'getBoundingClientRect').mockReturnValue(elementRect({
      bottom: 800,
      height: 64,
      left: 80,
      right: 1200,
      top: 736,
      width: 1120,
    }));

    window.dispatchEvent(new Event('resize'));
    await settleMeasurement();

    expect(app.layout.padding.start).toBe(80);
    expect(app.layout.padding.bottom).toBe(64);
    expect(app.layout.content).toEqual({ width: 1120, height: 736 });

    wrapper.unmount();
  });

  it('连续放置两个 NavigationRail 时次级导航紧跟一级导航并累加起始侧宽度', async () => {
    let app;
    const Capture = layoutCapture((value) => {
      app = value;
    });
    const wrapper = mount(MatAppRoot, {
      attachTo: document.body,
      props: { fillViewport: false },
      slots: {
        default: () => [
          h(Capture),
          h(MatNavigationRail, { app: true }),
          h(MatNavigationRail, { app: true, expanded: true, fullWidth: true }),
        ],
      },
    });

    await settleRender();
    const rails = wrapper.element.querySelectorAll('.mat-navigation-rail-host');
    expect(rails.length).toBe(2);

    vi.spyOn(wrapper.element, 'getBoundingClientRect').mockReturnValue(elementRect({
      bottom: 800,
      height: 800,
      right: 1200,
      width: 1200,
    }));
    vi.spyOn(rails[0], 'getBoundingClientRect').mockReturnValue(elementRect({
      bottom: 800,
      height: 800,
      right: 80,
      top: 0,
      width: 80,
    }));
    vi.spyOn(rails[1], 'getBoundingClientRect').mockReturnValue(elementRect({
      bottom: 800,
      height: 800,
      left: 80,
      right: 320,
      top: 0,
      width: 240,
    }));

    window.dispatchEvent(new Event('resize'));
    await settleMeasurement();

    expect(app.layout.padding.start).toBe(320);
    expect(app.layout.content.width).toBe(880);

    wrapper.unmount();
  });
});
