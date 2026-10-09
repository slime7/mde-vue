import {
  h,
} from 'vue';
import { mount } from '@vue/test-utils';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import MatTabContent from '../../src/components/mat-tabs/MatTabContent.vue';
import MatTabItem from '../../src/components/mat-tabs/MatTabItem.vue';
import MatTabs from '../../src/components/mat-tabs/MatTabs.vue';
import * as library from '../../src';
import { createMatUi } from '../../src/plugin.js';

afterEach(() => {
  vi.restoreAllMocks();
});

function tabsSlots() {
  return () => [
    h(MatTabItem, { value: 'home', label: '首页' }),
    h(MatTabItem, { value: 'photos', label: '照片' }),
    h(MatTabItem, { value: 'settings', label: '设置' }),
    h(MatTabContent, { value: 'home' }, () => '首页内容'),
    h(MatTabContent, { value: 'photos' }, () => '照片内容'),
    h(MatTabContent, { value: 'settings' }, () => '设置内容'),
  ];
}

function mountTabs(props = {}, slots = tabsSlots()) {
  return mount(MatTabs, {
    props: { modelValue: 'home', ...props },
    slots: { default: slots },
  });
}

function tabElements(wrapper) {
  return wrapper.findAll('[role="tab"]');
}

function panelElements(wrapper) {
  return wrapper.findAll('[role="tabpanel"]');
}

describe('MatTabs 标签页', () => {
  it('从包根入口导出，并由 createMatUi 全局注册', () => {
    expect(library.MatTabs).toBe(MatTabs);
    expect(library.MatTabItem).toBe(MatTabItem);
    expect(library.MatTabContent).toBe(MatTabContent);

    const app = {
      component: vi.fn(),
      directive: vi.fn(),
      provide: vi.fn(),
    };
    createMatUi().install(app);

    expect(app.component).toHaveBeenCalledWith('MatTabs', MatTabs);
    expect(app.component).toHaveBeenCalledWith('mat-tabs', MatTabs);
    expect(app.component).toHaveBeenCalledWith('MatTabItem', MatTabItem);
    expect(app.component).toHaveBeenCalledWith('mat-tab-item', MatTabItem);
    expect(app.component).toHaveBeenCalledWith('MatTabContent', MatTabContent);
    expect(app.component).toHaveBeenCalledWith('mat-tab-content', MatTabContent);
  });

  it('把默认 Slot 中的 item 与 content 分别渲染为 tablist 与面板', () => {
    const wrapper = mountTabs();

    expect(wrapper.find('[role="tablist"]').exists()).toBe(true);
    expect(tabElements(wrapper)).toHaveLength(3);
    expect(panelElements(wrapper)).toHaveLength(3);
    expect(wrapper.text()).toContain('首页内容');
    expect(wrapper.text()).toContain('设置内容');
  });

  it('受控 v-model：点击子项发出 update:modelValue', async () => {
    const wrapper = mountTabs();

    expect(tabElements(wrapper)[0].attributes('aria-selected')).toBe('true');
    expect(tabElements(wrapper)[1].attributes('aria-selected')).toBe('false');

    await tabElements(wrapper)[1].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([['photos']]);
  });

  it('激活面板可交互，未激活面板移出无障碍树与焦点顺序', () => {
    const wrapper = mountTabs({ modelValue: 'photos' });

    const panels = panelElements(wrapper);
    expect(panels[1].attributes('inert')).toBeUndefined();
    expect(panels[1].attributes('aria-hidden')).toBeUndefined();
    expect(panels[0].attributes('inert')).toBeDefined();
    expect(panels[0].attributes('aria-hidden')).toBe('true');
    expect(panels[2].attributes('inert')).toBeDefined();
  });

  it('tab 与 panel 通过 id 建立无障碍关联', () => {
    const wrapper = mountTabs({ modelValue: 'photos' });

    const tabs = tabElements(wrapper);
    const panels = panelElements(wrapper);

    expect(tabs[1].attributes('aria-controls')).toBe(panels[1].attributes('id'));
    expect(panels[1].attributes('aria-labelledby')).toBe(tabs[1].attributes('id'));
    expect(tabs[0].attributes('aria-controls')).toBe(panels[0].attributes('id'));
  });

  it('label 属性渲染为标签文本', () => {
    const wrapper = mountTabs();

    expect(tabElements(wrapper)[0].text()).toContain('首页');
    expect(tabElements(wrapper)[2].text()).toContain('设置');
  });

  it('primary 与 secondary 变体均支持渲染 icon 属性图标', () => {
    const primaryWrapper = mountTabs({}, () => [
      h(MatTabItem, { value: 'home', label: '首页', icon: 'home' }),
      h(MatTabContent, { value: 'home' }, () => '首页内容'),
    ]);
    expect(primaryWrapper.find('[role="tab"] i').exists()).toBe(true);

    const secondaryWrapper = mountTabs({ variant: 'secondary' }, () => [
      h(MatTabItem, { value: 'home', label: '首页', icon: 'home' }),
      h(MatTabContent, { value: 'home' }, () => '首页内容'),
    ]);
    expect(secondaryWrapper.find('[role="tab"] i').exists()).toBe(true);
  });

  it('badge 配置渲染徽标内容', () => {
    const wrapper = mountTabs({}, () => [
      h(MatTabItem, { value: 'home', label: '首页', badge: { content: 5 } }),
      h(MatTabContent, { value: 'home' }, () => '首页内容'),
    ]);

    expect(wrapper.find('[role="tab"]').text()).toContain('5');
  });

  it('方向键自动激活相邻项并移动焦点，Home 与 End 跳转首尾', async () => {
    const wrapper = mountTabs();
    const tabs = tabElements(wrapper);

    await tabs[0].trigger('keydown', { key: 'ArrowRight' });
    expect(wrapper.emitted('update:modelValue')).toEqual([['photos']]);
    await wrapper.setProps({ modelValue: 'photos' });

    await tabs[0].trigger('keydown', { key: 'End' });
    expect(wrapper.emitted('update:modelValue')).toEqual([['photos'], ['settings']]);
    await wrapper.setProps({ modelValue: 'settings' });

    await tabs[0].trigger('keydown', { key: 'Home' });
    expect(wrapper.emitted('update:modelValue')).toEqual([
      ['photos'], ['settings'], ['home'],
    ]);
  });

  it('禁用项不响应点击且键盘导航跳过', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mountTabs({}, () => [
      h(MatTabItem, { value: 'home', label: '首页' }),
      h(MatTabItem, { value: 'locked', label: '锁定', disabled: true }),
      h(MatTabItem, { value: 'settings', label: '设置' }),
      h(MatTabContent, { value: 'home' }, () => '首页内容'),
      h(MatTabContent, { value: 'locked' }, () => '锁定内容'),
      h(MatTabContent, { value: 'settings' }, () => '设置内容'),
    ]);

    await tabElements(wrapper)[1].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    await tabElements(wrapper)[0].trigger('keydown', { key: 'ArrowRight' });
    expect(wrapper.emitted('update:modelValue')).toEqual([['settings']]);
    expect(warn).not.toHaveBeenCalled();
  });

  it('跨越多页点击仍只发出目标页的一次选择事件', async () => {
    const wrapper = mountTabs({ modelValue: 'home' });

    await tabElements(wrapper)[2].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([['settings']]);
  });

  it('跨页切换时中间页隐藏且目标页位移至相邻侧', async () => {
    const wrapper = mountTabs({ modelValue: 'home' });

    await wrapper.setProps({ modelValue: 'settings' });
    const panels = panelElements(wrapper);
    expect(panels[1].attributes('style')).toContain('visibility: hidden');
    expect(panels[2].attributes('style')).toContain('transform: translateX');
  });

  it('modelValue 未匹配任何子项时保持无选中状态', () => {
    const wrapper = mountTabs({ modelValue: 'unknown' });

    tabElements(wrapper).forEach((tab) => {
      expect(tab.attributes('aria-selected')).toBe('false');
    });
    panelElements(wrapper).forEach((panel) => {
      expect(panel.attributes('inert')).toBeDefined();
    });
  });

  it('swipeable 属性默认开启且可关闭', () => {
    expect(MatTabs.props.swipeable.default).toBe(true);

    const wrapper = mountTabs({ swipeable: false });
    expect(wrapper.find('[role="tablist"]').exists()).toBe(true);
  });

  it('scrollable 与 align 属性遵循默认值并接受配置', () => {
    expect(MatTabs.props.scrollable.default).toBe(false);
    expect(MatTabs.props.align.default).toBe('start');

    const wrapper = mountTabs({ scrollable: true, align: 'center' });
    expect(wrapper.find('[role="tablist"]').exists()).toBe(true);
  });

  it('secondary 变体应用对应样式类', () => {
    const wrapper = mountTabs({ variant: 'secondary' }, () => [
      h(MatTabItem, { value: 'home', label: '首页' }),
      h(MatTabItem, { value: 'photos', label: '照片' }),
      h(MatTabContent, { value: 'home' }, () => '首页内容'),
      h(MatTabContent, { value: 'photos' }, () => '照片内容'),
    ]);

    const tabs = tabElements(wrapper);
    expect(tabs[0].classes()).toContain('mat-tab-item--secondary');
    expect(tabs[0].classes()).not.toContain('mat-tab-item--primary');
  });

  it('指示器存在并在 DOM 中以无障碍隐藏方式呈现', () => {
    const wrapper = mountTabs();
    const indicator = wrapper.find('.mat-tabs__indicator');
    expect(indicator.exists()).toBe(true);
    expect(indicator.attributes('aria-hidden')).toBe('true');
  });

  it('scrollButtons 默认关闭，开启时渲染翻页按钮容器', () => {
    expect(MatTabs.props.scrollButtons.default).toBe(false);

    const defaultWrapper = mountTabs({ scrollable: true });
    expect(defaultWrapper.findAll('.mat-tabs__scroll-btn')).toHaveLength(0);

    const btnWrapper = mountTabs({ scrollable: true, scrollButtons: true });
    expect(btnWrapper.find('.mat-tabs__header').exists()).toBe(true);
  });
});
