import { h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  describe, expect, it,
} from 'vitest';
import MatNavigationRail from '../src/components/mat-navigation-rail/MatNavigationRail.vue';
import MatNavigationRailItem from '../src/components/mat-navigation-rail/MatNavigationRailItem.vue';

const navigationItemSource = readFileSync(
  resolve(process.cwd(), 'src/components/mat-navigation-rail/MatNavigationRailItem.vue'),
  'utf8',
);
const navigationSource = readFileSync(
  resolve(process.cwd(), 'src/components/mat-navigation-rail/MatNavigationRail.vue'),
  'utf8',
);

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

  it('width 接受数字像素值和 CSS 宽度字符串，并只作为展开宽度使用', async () => {
    const wrapper = mount(MatNavigationRail, {
      props: {
        expanded: true,
        width: 280,
      },
    });

    expect(wrapper.attributes('style')).toContain('--mat-navigation-rail-expanded-width: 280px');

    await wrapper.setProps({ width: 'min(80vw, 360px)' });

    expect(wrapper.attributes('style')).toContain('--mat-navigation-rail-expanded-width: min(80vw, 360px)');
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

    expect(wrapper.classes()).toContain('mat-navigation-rail-host--horizontal');
    expect(wrapper.find('nav').classes()).toContain('mat-navigation-rail--bar');
    expect(wrapper.find('.mat-navigation-rail__menu').exists()).toBe(false);
    expect(wrapper.find('.mat-navigation-rail__scrim').exists()).toBe(false);
    expect(wrapper.find('.mat-navigation-rail-item').classes())
      .toContain('mat-navigation-rail-item--collapsed');
    expect(wrapper.find('.mat-navigation-rail-item__indicator .mat-navigation-rail-item__label').exists())
      .toBe(false);
    expect(wrapper.find('.mat-navigation-rail-item > .mat-navigation-rail-item__label').text())
      .toBe('首页');

    await wrapper.setProps({ expanded: true });

    expect(wrapper.classes()).toContain('mat-navigation-rail-host--expanded');
    expect(wrapper.find('.mat-navigation-rail-item').classes())
      .toContain('mat-navigation-rail-item--expanded');
    expect(wrapper.find('.mat-navigation-rail-item__indicator .mat-navigation-rail-item__label').text())
      .toBe('首页');
  });

  it('收回导航时 Item 根据 position 固定在起始或末尾侧', () => {
    const wrapper = mount(MatNavigationRail, {
      props: {
        expanded: false,
        position: 'end',
      },
      slots: { default: navigationItems },
    });

    expect(wrapper.classes()).toContain('mat-navigation-rail-host--end');
    expect(wrapper.find('.mat-navigation-rail-item').classes())
      .toContain('mat-navigation-rail-item--end');
  });

  it('菜单按钮在展开和收回时保持与 Item 相同的侧边锚点', () => {
    const headerRule = navigationSource.match(
      /\.mat-navigation-rail__header \{([\s\S]*?)\n\}/,
    )?.[1] ?? '';
    const expandedHeaderRule = navigationSource.match(
      /\.mat-navigation-rail--expanded \.mat-navigation-rail__header \{([\s\S]*?)\n\}/,
    )?.[1] ?? '';

    expect(headerRule).toContain('align-items: var(--mat-navigation-rail-item-inline-alignment);');
    expect(headerRule).toContain('padding-inline: var(--mat-navigation-rail-collapsed-side-space);');
    expect(expandedHeaderRule).toContain('align-items: var(--mat-navigation-rail-item-inline-alignment);');
    expect(expandedHeaderRule).not.toContain('align-items: flex-start;');
  });

  it('collapsed Item 为图标和标签保留完整的水平可读区域', () => {
    expect(navigationItemSource).toContain('padding-inline: var(--mat-navigation-rail-collapsed-side-space);');
    expect(navigationItemSource).toContain('inline-size: var(--mat-navigation-rail-vertical-indicator-width);');
    expect(navigationItemSource).toContain('text-align: center;');
  });

  it('horizontal 的两种 Item 方向使用相同的固定宽度横向排列', () => {
    const horizontalRule = navigationItemSource.match(
      /\.mat-navigation-rail-item--horizontal \{([\s\S]*?)\n\}/,
    )?.[1] ?? '';

    expect(horizontalRule).toContain('flex: 0 0 var(--mat-navigation-bar-horizontal-item-width);');
    expect(horizontalRule).toContain('align-items: center;');
    expect(navigationItemSource).not.toContain(
      '.mat-navigation-rail-item--horizontal.mat-navigation-rail-item--expanded',
    );
  });

  it('选中指示器只过渡背景色，不改变自身形状', () => {
    const indicatorRule = navigationItemSource.match(
      /\.mat-navigation-rail-item__indicator::before \{([\s\S]*?)\n\}/,
    )?.[1] ?? '';

    expect(indicatorRule).toContain('background: var(--mat-navigation-rail-item-selected-container-color);');
    expect(indicatorRule).toContain('transition: opacity');
    expect(indicatorRule).not.toContain('scale:');
    expect(indicatorRule).not.toContain('border-radius');
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
