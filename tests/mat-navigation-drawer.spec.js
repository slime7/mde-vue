import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick } from 'vue';
import MatNavigationDrawer from '../src/components/mat-navigation-drawer/MatNavigationDrawer.vue';
import MatNavigationRail from '../src/components/mat-navigation-rail/MatNavigationRail.vue';
import MatNavigationRailItem from '../src/components/mat-navigation-rail/MatNavigationRailItem.vue';

describe('MatNavigationDrawer', () => {
  let originalGetAnimations;

  beforeEach(() => {
    originalGetAnimations = Element.prototype.getAnimations;
    Object.defineProperty(Element.prototype, 'getAnimations', {
      configurable: true,
      value() {
        return [];
      },
    });
  });

  afterEach(() => {
    Object.defineProperty(Element.prototype, 'getAnimations', {
      configurable: true,
      value: originalGetAnimations,
    });
  });

  it('固定使用 vertical 方向、full-width、collapsible 与 hide-on-collapse', () => {
    const wrapper = mount(MatNavigationDrawer, {
      props: {
        expanded: false,
      },
      slots: {
        default: () => h(MatNavigationRailItem, { value: 'inbox', icon: 'inbox' }, () => '收件箱'),
      },
    });

    const rail = wrapper.findComponent(MatNavigationRail);
    expect(rail.exists()).toBe(true);
    expect(rail.props('orientation')).toBe('vertical');
    expect(rail.props('fullWidth')).toBe(true);
    expect(rail.props('collapsible')).toBe(true);
    expect(rail.props('hideOnCollapse')).toBe(true);
    expect(wrapper.find('.mat-navigation-rail-host--hidden').exists()).toBe(true);
  });

  it('通过 update:expanded 切换展开与收起状态', async () => {
    const TestHost = defineComponent({
      data() {
        return {
          expanded: false,
        };
      },
      render() {
        return h('div', [
          h('button', {
            class: 'test-toggle-btn',
            onClick: () => {
              this.expanded = !this.expanded;
            },
          }, this.expanded ? '收起' : '展开'),
          h(MatNavigationDrawer, {
            expanded: this.expanded,
            'onUpdate:expanded': (val) => {
              this.expanded = val;
            },
          }, {
            default: () => [
              h(MatNavigationRailItem, { value: 'inbox', icon: 'inbox' }, () => '收件箱'),
            ],
          }),
        ]);
      },
    });

    const wrapper = mount(TestHost);
    expect(wrapper.find('.mat-navigation-rail-host--hidden').exists()).toBe(true);

    await wrapper.find('.test-toggle-btn').trigger('click');
    await nextTick();

    expect(wrapper.vm.expanded).toBe(true);
    expect(wrapper.find('.mat-navigation-rail-host--expanded').exists()).toBe(true);
  });

  it('modal 模式下渲染遮罩，点击遮罩或按下 Escape 触发收起', async () => {
    const wrapper = mount(MatNavigationDrawer, {
      props: {
        expanded: true,
        layout: 'modal',
      },
      slots: {
        default: () => h(MatNavigationRailItem, { value: 'home', icon: 'home' }, () => '首页'),
      },
    });

    expect(wrapper.find('.mat-navigation-rail__scrim').exists()).toBe(true);

    await wrapper.find('.mat-navigation-rail__scrim').trigger('click');
    expect(wrapper.emitted('update:expanded')).toEqual([[false]]);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(wrapper.emitted('update:expanded')).toEqual([[false], [false]]);
  });

  it('透传 modelValue 与 update:modelValue 事件', async () => {
    const wrapper = mount(MatNavigationDrawer, {
      props: {
        expanded: true,
        modelValue: 'inbox',
      },
      slots: {
        default: () => [
          h(MatNavigationRailItem, { value: 'inbox', icon: 'inbox' }, () => '收件箱'),
          h(MatNavigationRailItem, { value: 'starred', icon: 'star' }, () => '收藏'),
        ],
      },
    });

    const items = wrapper.findAllComponents(MatNavigationRailItem);
    await items[1].trigger('click');

    expect(wrapper.emitted('update:modelValue')).toEqual([['starred']]);
  });
});
