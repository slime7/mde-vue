import {
  h, nextTick,
} from 'vue';
import { mount } from '@vue/test-utils';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import MatNavigationBar from '../src/components/mat-navigation-bar/MatNavigationBar.vue';
import MatNavigationBarItem from '../src/components/mat-navigation-bar/MatNavigationBarItem.vue';
import MatNavigationItem from '../src/components/mat-navigation-item/MatNavigationItem.vue';
import MatAppRoot from '../src/components/mat-app-root/MatAppRoot.vue';
import * as library from '../src';
import { createMatUi } from '../src/plugin.js';

afterEach(() => {
  vi.restoreAllMocks();
});

async function settle() {
  await nextTick();
  await nextTick();
}

function barItems() {
  return [
    h(MatNavigationBarItem, { value: 'home', icon: 'home' }, () => '首页'),
    h(MatNavigationBarItem, { value: 'search', icon: 'search' }, () => '搜索'),
    h(MatNavigationBarItem, { value: 'settings', icon: 'settings' }, () => '设置'),
  ];
}

describe('MatNavigationBar 底部导航栏', () => {
  it('从包根入口导出，并由 createMatUi 全局注册', () => {
    expect(library.MatNavigationBar).toBe(MatNavigationBar);
    expect(library.MatNavigationBarItem).toBe(MatNavigationBarItem);
    expect(library.MatNavigationItem).toBe(MatNavigationItem);

    const app = {
      component: vi.fn(),
      directive: vi.fn(),
      provide: vi.fn(),
    };
    createMatUi().install(app);

    expect(app.component).toHaveBeenCalledWith('MatNavigationBar', MatNavigationBar);
    expect(app.component).toHaveBeenCalledWith('mat-navigation-bar', MatNavigationBar);
    expect(app.component).toHaveBeenCalledWith('MatNavigationBarItem', MatNavigationBarItem);
    expect(app.component).toHaveBeenCalledWith('mat-navigation-bar-item', MatNavigationBarItem);
    expect(app.component).toHaveBeenCalledWith('MatNavigationItem', MatNavigationItem);
    expect(app.component).toHaveBeenCalledWith('mat-navigation-item', MatNavigationItem);
  });

  it('根元素使用 MatAside 渲染 nav 标签且停靠在 bottom 边缘', () => {
    const wrapper = mount(MatNavigationBar, {
      slots: { default: barItems },
    });

    const nav = wrapper.get('nav');
    expect(nav.classes()).toContain('mat-aside');
    expect(nav.classes()).toContain('mat-aside--bottom');
    expect(nav.classes()).toContain('mat-navigation-bar');
  });

  it('受控 v-model 选中状态并在点击子项时发出 update:modelValue', async () => {
    const wrapper = mount(MatNavigationBar, {
      props: { modelValue: 'home' },
      slots: { default: barItems },
    });

    const items = wrapper.findAllComponents(MatNavigationBarItem);
    expect(items).toHaveLength(3);
    expect(items[0].classes()).toContain('mat-navigation-bar-item--selected');
    expect(items[1].classes()).not.toContain('mat-navigation-bar-item--selected');

    await items[1].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([['search']]);
  });

  it('支持通用 MatNavigationItem 直接混排并正常工作', async () => {
    const wrapper = mount(MatNavigationBar, {
      props: { modelValue: 'messages' },
      slots: {
        default: () => [
          h(MatNavigationItem, { value: 'messages', icon: 'chat' }, () => '消息'),
          h(MatNavigationItem, { value: 'contacts', icon: 'person' }, () => '联系人'),
        ],
      },
    });

    const items = wrapper.findAllComponents(MatNavigationItem);
    expect(items[0].classes()).toContain('mat-navigation-item--selected');

    await items[1].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([['contacts']]);
  });

  it('支持 alignment 控制内容对齐', () => {
    const startWrapper = mount(MatNavigationBar, {
      props: { alignment: 'start' },
      slots: { default: barItems },
    });
    expect(startWrapper.find('.mat-navigation-bar__content--start').exists()).toBe(true);

    const endWrapper = mount(MatNavigationBar, {
      props: { alignment: 'end' },
      slots: { default: barItems },
    });
    expect(endWrapper.find('.mat-navigation-bar__content--end').exists()).toBe(true);
  });

  it('height 属性控制高度，省略时使用 64px 默认高度', () => {
    const defaultWrapper = mount(MatNavigationBar, {
      slots: { default: barItems },
    });
    expect(defaultWrapper.get('nav').element.style.getPropertyValue('--mat-aside-block-size')).toBe('64px');

    const customWrapper = mount(MatNavigationBar, {
      props: { height: 80 },
      slots: { default: barItems },
    });
    expect(customWrapper.get('nav').element.style.getPropertyValue('--mat-aside-block-size')).toBe('80px');
  });

  it('app=true 时在 MatAppRoot 内作为底部停靠栏挂载且不脱离宿主 DOM', async () => {
    const appWrapper = mount(MatAppRoot, {
      attachTo: document.body,
      props: { fillViewport: false },
      slots: {
        default: () => h(MatNavigationBar, { app: true }, barItems),
      },
    });

    await settle();
    const nav = appWrapper.element.querySelector('nav.mat-navigation-bar');
    expect(nav).not.toBeNull();
    expect(nav.classList.contains('mat-aside--app')).toBe(true);
    appWrapper.unmount();
  });

  it('app=true 且显式指定 attach 时挂载到指定目标', async () => {
    const target = document.createElement('div');
    target.id = 'bar-teleport-target';
    document.body.append(target);

    const wrapper = mount(MatNavigationBar, {
      attachTo: document.body,
      props: { app: true, attach: target },
      slots: { default: barItems },
    });

    await settle();
    expect(target.querySelector('nav.mat-navigation-bar')).not.toBeNull();
    wrapper.unmount();
    target.remove();
  });

  it('支持 open 属性并响应显隐切换', async () => {
    const wrapper = mount(MatNavigationBar, {
      props: { open: true },
      slots: { default: barItems },
    });

    expect(wrapper.get('nav').classes()).toContain('mat-aside--open');

    await wrapper.setProps({ open: false });
    await settle();
    expect(wrapper.get('nav').classes()).not.toContain('mat-aside--open');
  });
});
