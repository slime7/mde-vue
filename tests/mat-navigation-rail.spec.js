import { h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import {
  describe, expect, it, vi,
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
    expect(MatNavigationRail.props.app.default).toBe(false);

    const wrapper = mount(MatNavigationRail, {
      props: { modelValue: 'home' },
      slots: { default: navigationItems },
    });

    expect(wrapper.find('nav').attributes('aria-orientation')).toBeUndefined();
    expect(wrapper.findAll('.mat-navigation-rail-item')).toHaveLength(2);
    expect(wrapper.find('.mat-navigation-rail-item__indicator .mat-navigation-rail-item__label').exists())
      .toBe(false);
    expect(wrapper.find('.mat-navigation-rail-item > .mat-navigation-rail-item__label').text())
      .toBe('首页');
  });

  it('width 为 0 时输出不带单位的 CSS 长度', () => {
    const wrapper = mount(MatNavigationRail, {
      props: { expanded: true, width: 0 },
      slots: { default: navigationItems },
    });
    const host = wrapper.find('.mat-navigation-rail-host').element;

    expect(host.style.getPropertyValue('--mat-navigation-rail-expanded-width')).toBe('0');
  });

  it('默认在声明容器布局，app=true 时 Teleport 到 attach', async () => {
    const source = document.createElement('section');
    const attach = document.createElement('main');
    attach.id = 'navigation-rail-app-target';
    document.body.append(source, attach);
    const wrapper = mount(MatNavigationRail, {
      attachTo: source,
      props: {
        attach: '#navigation-rail-app-target',
      },
      slots: { default: navigationItems },
    });

    expect(source.querySelector('nav')).not.toBeNull();
    expect(attach.querySelector('nav')).toBeNull();

    await wrapper.setProps({ app: true });
    await settleRender();

    expect(source.querySelector('nav')).toBeNull();
    expect(attach.querySelector('nav')).not.toBeNull();

    wrapper.unmount();
    source.remove();
    attach.remove();
  });

  it('app=true 的无效 attach 给出警告且不渲染 Navigation rail', async () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mount(MatNavigationRail, {
      attachTo: document.body,
      props: {
        app: true,
        attach: '#missing-navigation-rail-app-target',
      },
      slots: { default: navigationItems },
    });

    await settleRender();

    expect(document.body.querySelector('.mat-navigation-rail')).toBeNull();
    expect(warning).toHaveBeenCalledWith(
      'MatNavigationRail: attach 必须指向当前 document 中存在的 HTMLElement',
    );

    wrapper.unmount();
  });

  it('expanded rail 把图标和标签放在同一个内容指示器中', () => {
    const wrapper = mount(MatNavigationRail, {
      props: { expanded: true, modelValue: 'settings' },
      slots: { default: navigationItems },
    });

    const items = wrapper.findAll('.mat-navigation-rail-item');

    expect(items[1].find('.mat-navigation-rail-item__indicator .mat-navigation-rail-item__label').text())
      .toBe('设置');
    expect(items[1].attributes('aria-current')).toBe('page');
  });

  it('horizontal 模式由 expanded 在纵向 Item 与当前横向 Item 间切换', async () => {
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

    expect(wrapper.find('.mat-navigation-rail__menu').exists()).toBe(false);
    expect(wrapper.find('.mat-navigation-rail__scrim').exists()).toBe(false);
    expect(wrapper.find('.mat-navigation-rail-item__indicator .mat-navigation-rail-item__label').exists())
      .toBe(false);
    expect(wrapper.find('.mat-navigation-rail-item > .mat-navigation-rail-item__label').text())
      .toBe('首页');

    await wrapper.setProps({ expanded: true });

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

    expect(wrapper.find('.test-header').text()).toBe('true');
    expect(wrapper.find('.test-fab').text()).toBe('true');
  });

  it('end Slot 固定在纵向导航底部并接收展开状态', () => {
    const wrapper = mount(MatNavigationRail, {
      props: { expanded: true },
      slots: {
        default: navigationItems,
        end: ({ expanded }) => h('button', { class: 'test-end' }, String(expanded)),
      },
    });

    expect(wrapper.find('.mat-navigation-rail__end').exists()).toBe(true);
    expect(wrapper.find('.test-end').text()).toBe('true');
  });
});
