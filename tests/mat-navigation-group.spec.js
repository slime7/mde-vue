import {
  describe,
  expect,
  it,
} from 'vitest';
import { mount } from '@vue/test-utils';
import { h } from 'vue';
import MatNavigationGroup from '../src/components/mat-navigation-group/MatNavigationGroup.vue';
import MatNavigationRailItem from '../src/components/mat-navigation-rail/MatNavigationRailItem.vue';

describe('MatNavigationGroup', () => {
  it('通过 #activator 插槽接收 expanded 和 toggle 并支持展开切换', async () => {
    const wrapper = mount(MatNavigationGroup, {
      props: {
        expanded: false,
      },
      slots: {
        activator: ({ expanded, toggle }) => h('button', {
          class: 'test-activator',
          onClick: toggle,
        }, expanded ? '收起' : '展开'),
        default: () => [
          h(MatNavigationRailItem, { value: 'sub1' }, () => '子项 1'),
        ],
      },
    });

    const activator = wrapper.find('.test-activator');
    expect(activator.text()).toBe('展开');
    expect(wrapper.find('.mat-navigation-group--expanded').exists()).toBe(false);

    await activator.trigger('click');

    expect(wrapper.emitted('update:expanded')).toEqual([[true]]);
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]]);
    expect(wrapper.find('.mat-navigation-group--expanded').exists()).toBe(true);
    expect(activator.text()).toBe('收起');
  });

  it('支持自定义 indent 属性并注入 CSS 变量', () => {
    const wrapper = mount(MatNavigationGroup, {
      props: {
        indent: 24,
      },
      slots: {
        default: () => h('div', { class: 'child' }, '内容'),
      },
    });

    const root = wrapper.find('.mat-navigation-group');
    expect(root.attributes('style')).toContain('--mat-navigation-group-indent: 24px');
  });

  it('通过 modelValue 受控同步展开状态', async () => {
    const wrapper = mount(MatNavigationGroup, {
      props: {
        modelValue: true,
      },
      slots: {
        activator: ({ expanded }) => h('span', { class: 'status' }, String(expanded)),
      },
    });

    expect(wrapper.find('.status').text()).toBe('true');
    expect(wrapper.find('.mat-navigation-group--expanded').exists()).toBe(true);

    await wrapper.setProps({ modelValue: false });

    expect(wrapper.find('.status').text()).toBe('false');
    expect(wrapper.find('.mat-navigation-group--expanded').exists()).toBe(false);
  });
});
