import { h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import {
  describe, expect, it,
} from 'vitest';
import MatNavigationRail from '../src/components/mat-navigation-rail/MatNavigationRail.vue';
import MatNavigationRailItem from '../src/components/mat-navigation-rail/MatNavigationRailItem.vue';

async function settleRender() {
  await nextTick();
  await nextTick();
}

function navigationItems() {
  return [
    h(MatNavigationRailItem, { value: 'home', icon: 'home' }, () => '首页'),
    h(MatNavigationRailItem, { value: 'settings', icon: 'settings' }, () => '设置'),
  ];
}

describe('MatNavigationRail', () => {
  it('默认渲染只用于纵向布局的 collapsed Expressive rail', () => {
    const wrapper = mount(MatNavigationRail, {
      props: { modelValue: 'home' },
      slots: { default: navigationItems },
    });

    expect(wrapper.find('nav').classes()).toContain('mat-navigation-rail--collapsed');
    expect(wrapper.find('nav').attributes('aria-orientation')).toBeUndefined();
    expect(wrapper.findAll('.mat-navigation-rail-item')).toHaveLength(2);
    expect(wrapper.find('.mat-navigation-rail-item').classes())
      .toContain('mat-navigation-rail-item--collapsed');
    expect(wrapper.find('.mat-navigation-rail-item__indicator .mat-navigation-rail-item__label').exists())
      .toBe(false);
    expect(wrapper.find('.mat-navigation-rail-item > .mat-navigation-rail-item__label').text())
      .toBe('首页');
  });

  it('expanded rail 把图标和标签放在同一个内容指示器中', () => {
    const wrapper = mount(MatNavigationRail, {
      props: { expanded: true, modelValue: 'settings' },
      slots: { default: navigationItems },
    });

    const items = wrapper.findAll('.mat-navigation-rail-item');

    expect(wrapper.find('nav').classes()).toContain('mat-navigation-rail--expanded');
    expect(items[1].classes()).toContain('mat-navigation-rail-item--expanded');
    expect(items[1].find('.mat-navigation-rail-item__indicator .mat-navigation-rail-item__label').text())
      .toBe('设置');
    expect(items[1].attributes('aria-current')).toBe('page');
  });

  it('horizontal 模式渲染 flexible navigation bar，始终使用横向 Item', () => {
    const wrapper = mount(MatNavigationRail, {
      props: {
        orientation: 'horizontal',
        expanded: false,
        collapsible: true,
        layout: 'modal',
        modelValue: 'home',
      },
      slots: { default: navigationItems },
    });

    expect(wrapper.classes()).toContain('mat-navigation-rail-host--horizontal');
    expect(wrapper.find('nav').classes()).toContain('mat-navigation-rail--bar');
    expect(wrapper.find('.mat-navigation-rail__menu').exists()).toBe(false);
    expect(wrapper.find('.mat-navigation-rail__scrim').exists()).toBe(false);
    expect(wrapper.find('.mat-navigation-rail-item').classes())
      .toContain('mat-navigation-rail-item--horizontal');
    expect(wrapper.find('.mat-navigation-rail-item__indicator .mat-navigation-rail-item__label').text())
      .toBe('首页');
  });

  it('Item 通过 update:modelValue 请求单选，并保留原生 click 事件', async () => {
    const wrapper = mount(MatNavigationRail, {
      props: { modelValue: 'home' },
      slots: { default: navigationItems },
    });
    const items = wrapper.findAllComponents(MatNavigationRailItem);

    await items[1].trigger('click');

    expect(wrapper.emitted('update:modelValue')).toEqual([['settings']]);
    expect(items[1].emitted('click')?.[0][0]).toBeInstanceOf(MouseEvent);
  });

  it('disabled 与缺少 value 的 Item 不请求选择', async () => {
    const wrapper = mount(MatNavigationRail, {
      props: { modelValue: 'home' },
      slots: {
        default: () => [
          h(MatNavigationRailItem, { disabled: true, value: 'disabled' }, () => '禁用'),
          h(MatNavigationRailItem, null, () => '无值'),
        ],
      },
    });
    const items = wrapper.findAllComponents(MatNavigationRailItem);

    await items[0].trigger('click');
    await items[1].trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('collapsible 控制菜单按钮并通过 v-model:expanded 切换 rail', async () => {
    const wrapper = mount(MatNavigationRail, {
      props: {
        collapsible: true,
        expanded: false,
        openIcon: 'open-icon',
        closeIcon: 'close-icon',
      },
    });

    expect(wrapper.find('.mat-navigation-rail__menu .mat-icon').text()).toBe('open-icon');

    await wrapper.find('.mat-navigation-rail__menu').trigger('click');

    expect(wrapper.emitted('update:expanded')).toEqual([[true]]);
  });

  it('modal expanded rail 使用遮罩，遮罩和 Escape 都请求收起', async () => {
    const wrapper = mount(MatNavigationRail, {
      props: {
        collapsible: true,
        expanded: true,
        layout: 'modal',
      },
    });

    expect(wrapper.find('.mat-navigation-rail__scrim').exists()).toBe(true);
    expect(wrapper.find('nav').classes()).toContain('mat-navigation-rail--modal');

    await wrapper.find('.mat-navigation-rail__scrim').trigger('click');
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await settleRender();

    expect(wrapper.emitted('update:expanded')).toEqual([[false], [false]]);
  });

  it('hide-on-collapse 隐藏 expanded rail 容器但保留可访问的菜单按钮', () => {
    const wrapper = mount(MatNavigationRail, {
      props: {
        collapsible: true,
        expanded: false,
        hideOnCollapse: true,
      },
      slots: {
        header: () => h('div', { class: 'test-hidden-header' }, '品牌'),
      },
    });

    expect(wrapper.classes()).toContain('mat-navigation-rail-host--hidden');
    expect(wrapper.find('.mat-navigation-rail__content').exists()).toBe(false);
    expect(wrapper.find('.test-hidden-header').exists()).toBe(false);
    expect(wrapper.find('.mat-navigation-rail__menu').attributes('aria-expanded')).toBe('false');
  });

  it('支持 top/center 目的地对齐以及 header、fab Slots', () => {
    const wrapper = mount(MatNavigationRail, {
      props: { alignment: 'center', expanded: true },
      slots: {
        header: ({ expanded }) => h('div', { class: 'test-header' }, String(expanded)),
        fab: ({ expanded }) => h('button', { class: 'test-fab' }, String(expanded)),
        default: navigationItems,
      },
    });

    expect(wrapper.find('.mat-navigation-rail__destinations').classes())
      .toContain('mat-navigation-rail__destinations--center');
    expect(wrapper.find('.test-header').text()).toBe('true');
    expect(wrapper.find('.test-fab').text()).toBe('true');
  });
});
