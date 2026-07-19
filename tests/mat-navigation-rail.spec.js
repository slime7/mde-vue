import { h, nextTick, ref } from 'vue';
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
  it('默认渲染垂直折叠 Rail，Item 使用图标上标签下布局', () => {
    const wrapper = mount(MatNavigationRail, {
      slots: { default: navigationItems },
    });

    expect(wrapper.find('nav').attributes('aria-orientation')).toBe('vertical');
    expect(wrapper.classes()).toContain('mat-navigation-rail-host--vertical');
    expect(wrapper.classes()).toContain('mat-navigation-rail-host--collapsed');
    expect(wrapper.findAll('.mat-navigation-rail-item')).toHaveLength(2);
    expect(wrapper.find('.mat-navigation-rail-item__label').text()).toBe('首页');
    expect(wrapper.find('.mat-navigation-rail-item').classes())
      .toContain('mat-navigation-rail-item--vertical-collapsed');
  });

  it('standard 展开 Rail 占据布局空间并将 Item 改为图标左标签右', async () => {
    const wrapper = mount(MatNavigationRail, {
      props: { expanded: true },
      slots: { default: navigationItems },
    });

    expect(wrapper.classes()).toContain('mat-navigation-rail-host--standard');
    expect(wrapper.classes()).toContain('mat-navigation-rail-host--expanded');
    expect(wrapper.find('.mat-navigation-rail-item').classes())
      .toContain('mat-navigation-rail-item--vertical-expanded');

    await wrapper.setProps({ expanded: false });
    await settleRender();

    expect(wrapper.classes()).toContain('mat-navigation-rail-host--collapsed');
    expect(wrapper.find('.mat-navigation-rail-item').classes())
      .toContain('mat-navigation-rail-item--vertical-collapsed');
  });

  it('modal 展开 Rail 保留折叠占位并覆盖内容', () => {
    const wrapper = mount(MatNavigationRail, {
      props: { expanded: true, layout: 'modal' },
      slots: { default: navigationItems },
    });

    expect(wrapper.classes()).toContain('mat-navigation-rail-host--modal');
    expect(wrapper.find('nav').classes()).toContain('mat-navigation-rail--modal-expanded');
  });

  it('hide-on-collapse 在 modal 折叠时隐藏 Rail 内容但保留展开按钮', async () => {
    const expanded = ref(false);
    const wrapper = mount(MatNavigationRail, {
      props: {
        collapsible: true,
        'hide-on-collapse': true,
        layout: 'modal',
        expanded: expanded.value,
        'onUpdate:expanded': (value) => {
          expanded.value = value;
          wrapper.setProps({ expanded: value });
        },
      },
      slots: { default: navigationItems },
    });

    expect(wrapper.classes()).toContain('mat-navigation-rail-host--hidden');
    expect(wrapper.find('.mat-navigation-rail__toggle').exists()).toBe(true);
    expect(wrapper.find('.mat-navigation-rail__items').exists()).toBe(false);

    await wrapper.find('.mat-navigation-rail__toggle').trigger('click');
    await settleRender();

    expect(expanded.value).toBe(true);
    expect(wrapper.find('.mat-navigation-rail__items').exists()).toBe(true);
  });

  it('horizontal expanded 使用 Navigation Bar 的图标左标签右 Item，并忽略 Rail 展开按钮', () => {
    const wrapper = mount(MatNavigationRail, {
      props: {
        collapsible: true,
        expanded: true,
        orientation: 'horizontal',
        layout: 'modal',
        'hide-on-collapse': true,
      },
      slots: { default: navigationItems },
    });

    expect(wrapper.find('nav').attributes('aria-orientation')).toBe('horizontal');
    expect(wrapper.find('.mat-navigation-rail__toggle').exists()).toBe(false);
    expect(wrapper.find('.mat-navigation-rail-item').classes())
      .toContain('mat-navigation-rail-item--horizontal-expanded');
    expect(wrapper.classes()).not.toContain('mat-navigation-rail-host--hidden');
  });

  it('支持 fab 和 end Slot，并将状态传递给 Slot', () => {
    const wrapper = mount(MatNavigationRail, {
      props: { expanded: true },
      slots: {
        default: navigationItems,
        fab: ({ expanded }) => h('button', { class: 'test-fab' }, String(expanded)),
        end: ({ expanded, orientation }) => h(
          'button',
          { class: 'test-end' },
          `${orientation}-${expanded}`,
        ),
      },
    });

    expect(wrapper.find('.test-fab').text()).toBe('true');
    expect(wrapper.find('.test-end').text()).toBe('vertical-true');
  });

  it('使用 Item value 识别 selected 并通过 select 事件请求父组件更新', async () => {
    const selected = ref('home');
    const wrapper = mount(MatNavigationRail, {
      props: {
        selected: selected.value,
        onSelect: (event) => {
          selected.value = event.nextSelected;
          wrapper.setProps({ selected: selected.value });
        },
      },
      slots: { default: navigationItems },
    });

    const items = wrapper.findAll('.mat-navigation-rail-item');
    expect(items[0].attributes('aria-current')).toBe('page');
    expect(items[1].attributes('aria-current')).toBeUndefined();

    await items[1].trigger('click');
    await settleRender();

    expect(selected.value).toBe('settings');
    expect(items[1].attributes('aria-current')).toBe('page');
  });

  it('value 可省略，省略 value 的 Item 不会成为选中项', () => {
    const wrapper = mount(MatNavigationRail, {
      props: { selected: 'home' },
      slots: {
        default: () => h(MatNavigationRailItem, { icon: 'help' }, () => '帮助'),
      },
    });

    expect(wrapper.find('.mat-navigation-rail-item').attributes('aria-current')).toBeUndefined();
  });

  it('collapsible 通过 v-model:expanded 控制展开按钮和自定义图标', async () => {
    const wrapper = mount(MatNavigationRail, {
      props: {
        collapsible: true,
        openIcon: 'open-icon',
        closeIcon: 'close-icon',
        expanded: false,
      },
    });

    expect(wrapper.find('.mat-navigation-rail__toggle .mat-icon').text()).toBe('open-icon');

    await wrapper.find('.mat-navigation-rail__toggle').trigger('click');

    expect(wrapper.emitted('update:expanded')[0]).toEqual([true]);
  });

  it('modal 展开状态按 Escape 请求折叠', async () => {
    const wrapper = mount(MatNavigationRail, {
      props: {
        collapsible: true,
        expanded: true,
        layout: 'modal',
      },
    });

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await settleRender();

    expect(wrapper.emitted('update:expanded')).toEqual([[false]]);
  });
});
