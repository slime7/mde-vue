import { mount } from '@vue/test-utils';
import {
  h, nextTick, ref,
} from 'vue';
import {
  describe, expect, it,
} from 'vitest';
import {
  MatExpansion, MatExpansionPanel, MatListItem,
} from '../src';

describe('MatExpansion & MatExpansionPanel', () => {
  it('支持 title 属性自动生成激活器与旋转箭头图标', async () => {
    const wrapper = mount(MatExpansionPanel, {
      props: {
        title: '测试面板标题',
      },
      slots: {
        default: () => h('div', { class: 'custom-content' }, '自由内容'),
      },
    });

    expect(wrapper.text()).toContain('测试面板标题');
    const indicator = wrapper.find('.mat-expansion-panel__indicator');
    expect(indicator.exists()).toBe(true);
    expect(indicator.text()).toBe('expand_more');

    expect(wrapper.find('.mat-expansion-panel').classes()).not.toContain('mat-expansion-panel--expanded');

    await wrapper.find('[data-mat-list-group-activator]').trigger('click');
    expect(wrapper.find('.mat-expansion-panel').classes()).toContain('mat-expansion-panel--expanded');
    expect(wrapper.find('.mat-expansion-panel__indicator--expanded').exists()).toBe(true);
  });

  it('支持 activator 插槽完全自定义 leading 和 trailing', async () => {
    const wrapper = mount(MatExpansionPanel, {
      slots: {
        activator: ({ expanded }) => h(MatListItem, null, {
          leading: () => '图标',
          default: () => (expanded ? '自定义标题 (开)' : '自定义标题 (关)'),
          trailing: () => '尾部操作',
        }),
        default: () => h('div', '内容'),
      },
    });

    expect(wrapper.text()).toContain('图标');
    expect(wrapper.text()).toContain('自定义标题 (关)');
    expect(wrapper.text()).toContain('尾部操作');

    await wrapper.find('[data-mat-list-group-activator]').trigger('click');
    expect(wrapper.text()).toContain('自定义标题 (开)');
  });

  it('split=true 时默认插槽直接作为独立 MatListItem 列表项', () => {
    const wrapper = mount(MatExpansionPanel, {
      props: {
        title: '分立模式',
        split: true,
      },
      slots: {
        default: () => [
          h(MatListItem, { value: 'item1' }, () => '子项 1'),
          h(MatListItem, { value: 'item2' }, () => '子项 2'),
        ],
      },
    });

    expect(wrapper.find('.mat-expansion-panel--split').exists()).toBe(true);
    expect(wrapper.findAll('.mat-list-item').length).toBe(3);
  });

  it('split=false 时作为一体化容器展开自由内容', () => {
    const wrapper = mount(MatExpansionPanel, {
      props: {
        title: '一体化模式',
        split: false,
      },
      slots: {
        default: () => h('p', { class: 'free-text' }, '一段自由排版文本'),
      },
    });

    expect(wrapper.find('.mat-expansion-panel--unsplit').exists()).toBe(true);
    expect(wrapper.find('.mat-expansion-panel__body').exists()).toBe(true);
    expect(wrapper.find('.free-text').text()).toBe('一段自由排版文本');
  });

  it('支持单面板 v-model 受控展开与双向同步', async () => {
    const isExpanded = ref(false);
    const Component = {
      setup() {
        return () => h(MatExpansionPanel, {
          title: '受控单面板',
          modelValue: isExpanded.value,
          'onUpdate:modelValue': (val) => {
            isExpanded.value = val;
          },
        }, () => '内容');
      },
    };

    const wrapper = mount(Component);
    expect(wrapper.find('.mat-expansion-panel--expanded').exists()).toBe(false);

    await wrapper.find('[data-mat-list-group-activator]').trigger('click');
    expect(isExpanded.value).toBe(true);
    expect(wrapper.find('.mat-expansion-panel--expanded').exists()).toBe(true);

    isExpanded.value = false;
    await nextTick();
    expect(wrapper.find('.mat-expansion-panel--expanded').exists()).toBe(false);
  });

  it('disabled 阻止展开与指针交互', async () => {
    const wrapper = mount(MatExpansionPanel, {
      props: {
        title: '禁用面板',
        disabled: true,
      },
      slots: {
        default: () => '内容',
      },
    });

    const activator = wrapper.find('[data-mat-list-group-activator]');
    expect(activator.attributes('disabled')).toBeDefined();
    await activator.trigger('click');
    expect(wrapper.find('.mat-expansion-panel--expanded').exists()).toBe(false);
  });

  it('MatExpansion 容器协调多面板展开与 v-model 数组', async () => {
    const expandedValues = ref(['panel1']);
    const Component = {
      setup() {
        return () => h(MatExpansion, {
          modelValue: expandedValues.value,
          'onUpdate:modelValue': (val) => {
            expandedValues.value = val;
          },
        }, () => [
          h(MatExpansionPanel, { value: 'panel1', title: '面板1' }, () => '内容1'),
          h(MatExpansionPanel, { value: 'panel2', title: '面板2' }, () => '内容2'),
        ]);
      },
    };

    const wrapper = mount(Component);
    const activators = wrapper.findAll('[data-mat-list-group-activator]');

    expect(expandedValues.value).toEqual(['panel1']);

    await activators[1].trigger('click');
    expect(expandedValues.value).toEqual(['panel1', 'panel2']);

    await activators[0].trigger('click');
    expect(expandedValues.value).toEqual(['panel2']);
  });

  it('MatExpansion 支持 multiple=false 单选手风琴模式', async () => {
    const activePanel = ref('panel1');
    const Component = {
      setup() {
        return () => h(MatExpansion, {
          multiple: false,
          modelValue: activePanel.value,
          'onUpdate:modelValue': (val) => {
            activePanel.value = val;
          },
        }, () => [
          h(MatExpansionPanel, { value: 'panel1', title: '面板1' }, () => '内容1'),
          h(MatExpansionPanel, { value: 'panel2', title: '面板2' }, () => '内容2'),
        ]);
      },
    };

    const wrapper = mount(Component);
    const activators = wrapper.findAll('[data-mat-list-group-activator]');

    expect(activePanel.value).toBe('panel1');

    await activators[1].trigger('click');
    expect(activePanel.value).toBe('panel2');

    await activators[1].trigger('click');
    expect(activePanel.value).toBe(null);
  });

  it('首尾面板遵循与 List 一致的圆角层级结构', () => {
    const wrapper = mount(MatExpansion, {
      slots: {
        default: () => [
          h(MatExpansionPanel, { value: 'p1', title: '面板 1', split: false }),
          h(MatExpansionPanel, { value: 'p2', title: '面板 2', split: false }),
          h(MatExpansionPanel, { value: 'p3', title: '面板 3', split: false }),
        ],
      },
    });

    const panels = wrapper.findAll('.mat-expansion-panel');
    expect(panels.length).toBe(3);
    expect(wrapper.find('.mat-list').exists()).toBe(true);
  });

  it('支持容器与面板显式 color 配色', () => {
    const wrapper = mount(MatExpansion, {
      props: { color: 'primary' },
      slots: {
        default: () => [
          h(MatExpansionPanel, { value: 'p1', title: '面板 1', split: false }),
          h(MatExpansionPanel, {
            value: 'p2', title: '面板 2', color: 'secondary', split: false,
          }),
        ],
      },
    });

    expect(wrapper.classes()).toContain('mat-expansion--explicit-color');
    const panels = wrapper.findAll('.mat-expansion-panel');
    expect(panels[0].classes()).toContain('mat-expansion-panel--explicit-color');
    expect(panels[1].classes()).toContain('mat-expansion-panel--explicit-color');
  });

  it('支持 variant 属性控制 standard 与 segmented 布局', () => {
    const wrapper = mount(MatExpansion, {
      props: { variant: 'standard' },
      slots: {
        default: () => h(MatExpansionPanel, { title: '面板' }, () => '内容'),
      },
    });

    expect(wrapper.find('.mat-list--standard').exists()).toBe(true);
  });

  it('支持 color 与 as 属性自定义', () => {
    const wrapper = mount(MatExpansion, {
      props: {
        color: 'primary',
        as: 'section',
      },
      slots: {
        default: () => h(MatExpansionPanel, { as: 'article', title: '面板' }, () => '内容'),
      },
    });

    expect(wrapper.element.tagName).toBe('SECTION');
    expect(wrapper.find('article.mat-expansion-panel').exists()).toBe(true);
  });
});
