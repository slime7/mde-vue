import {
  defineComponent, h, nextTick, onMounted,
} from 'vue';
import { flushPromises, mount } from '@vue/test-utils';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import MatNavigationRail from '../src/components/mat-navigation-rail/MatNavigationRail.vue';
import MatNavigationRailItem from '../src/components/mat-navigation-rail/MatNavigationRailItem.vue';

afterEach(() => {
  vi.restoreAllMocks();
  Reflect.deleteProperty(Element.prototype, 'getAnimations');
});

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
  it('使用 alignment 控制默认内容定位且不再公开 position', () => {
    expect(MatNavigationRail.props.position).toBeUndefined();
    expect(MatNavigationRail.props.alignment.default).toBe('start');
    expect(MatNavigationRail.props.alignment.validator('start')).toBe(true);
    expect(MatNavigationRail.props.alignment.validator('center')).toBe(true);
    expect(MatNavigationRail.props.alignment.validator('end')).toBe(true);
    expect(MatNavigationRail.props.alignment.validator('top')).toBe(false);
  });

  it('由 Navigation 的 full-width 统一控制所有 Item', async () => {
    expect(MatNavigationRail.props.fullWidth.default).toBe(false);
    expect(MatNavigationRailItem.props.fullWidth).toBeUndefined();

    const wrapper = mount(MatNavigationRail, {
      props: {
        expanded: true,
        fullWidth: false,
      },
      slots: { default: navigationItems },
    });
    const itemElements = wrapper.findAllComponents(MatNavigationRailItem)
      .map((item) => item.element);

    expect(wrapper.findAllComponents(MatNavigationRailItem).every(
      (item) => !item.classes().includes('mat-navigation-rail-item--full-width'),
    )).toBe(true);

    await wrapper.setProps({ fullWidth: true });

    expect(wrapper.findAllComponents(MatNavigationRailItem).every(
      (item) => item.classes().includes('mat-navigation-rail-item--full-width'),
    )).toBe(true);
    expect(wrapper.findAllComponents(MatNavigationRailItem).map((item) => item.element))
      .toEqual(itemElements);
  });

  it('默认渲染只用于纵向布局的 collapsed Expressive rail', () => {
    expect(MatNavigationRail.props.app.default).toBe(false);

    const wrapper = mount(MatNavigationRail, {
      props: { modelValue: 'home' },
      slots: { default: navigationItems },
    });

    expect(wrapper.find('nav').attributes('aria-orientation')).toBeUndefined();
    expect(wrapper.findAll('.mat-navigation-rail-item')).toHaveLength(2);
    expect(wrapper.find('.mat-navigation-rail-item__indicator .mat-navigation-rail-item__label').text())
      .toBe('首页');
    expect(wrapper.find('.mat-navigation-rail-item > .mat-navigation-rail-item__label').text())
      .toBe('首页');
    expect(wrapper.find('.mat-navigation-rail-item__trailing').exists()).toBe(false);
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
    expect(wrapper.find('.mat-navigation-rail-item__indicator .mat-navigation-rail-item__label').text())
      .toBe('首页');
    expect(wrapper.find('.mat-navigation-rail-item > .mat-navigation-rail-item__label').text())
      .toBe('首页');

    await wrapper.setProps({ expanded: true });

    expect(wrapper.find('.mat-navigation-rail-item__indicator .mat-navigation-rail-item__label').text())
      .toBe('首页');
  });

  it('仅在纵向展开态显示默认 Slot 中的其他内容且切换时不卸载内容', async () => {
    let extraMountCount = 0;
    const ExtraContent = defineComponent({
      setup() {
        onMounted(() => {
          extraMountCount += 1;
        });

        return () => h('button', { class: 'test-extra-content' }, '辅助操作');
      },
    });
    const wrapper = mount(MatNavigationRail, {
      props: {
        expanded: false,
        modelValue: 'home',
      },
      slots: {
        default: () => [
          h(MatNavigationRailItem, { value: 'home', icon: 'home' }, () => '首页'),
          h(ExtraContent),
        ],
      },
    });
    const itemElement = wrapper.findComponent(MatNavigationRailItem).element;
    const extraContent = wrapper.find('.test-extra-content');

    expect(extraContent.element.hidden).toBe(true);
    expect(extraMountCount).toBe(1);

    await wrapper.setProps({ expanded: true });

    expect(wrapper.find('.test-extra-content').element.hidden).toBe(false);
    expect(wrapper.findComponent(MatNavigationRailItem).element).toBe(itemElement);
    expect(extraMountCount).toBe(1);

    await wrapper.setProps({ orientation: 'horizontal' });

    expect(wrapper.find('.test-extra-content').element.hidden).toBe(true);
    expect(wrapper.findComponent(MatNavigationRailItem).element).toBe(itemElement);
    expect(extraMountCount).toBe(1);
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

  it('hide-on-collapse 隐藏 expanded rail 容器但保留可再次展开的菜单按钮', async () => {
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

    await wrapper.find('.mat-navigation-rail__menu').trigger('click');

    expect(wrapper.emitted('update:expanded')).toEqual([[true]]);
  });

  it('hide-on-collapse 收起时保留内容直到实际退出动画完成', async () => {
    let finishCloseAnimation;
    const closeFinished = new Promise((resolve) => {
      finishCloseAnimation = resolve;
    });

    Object.defineProperty(Element.prototype, 'getAnimations', {
      configurable: true,
      value() {
        if (!this.classList.contains('mat-navigation-rail-host--hidden')) {
          return [];
        }

        return [{
          finished: closeFinished,
          playState: 'running',
        }];
      },
    });

    const wrapper = mount(MatNavigationRail, {
      props: {
        expanded: true,
        hideOnCollapse: true,
      },
      slots: {
        default: navigationItems,
        header: ({ expanded }) => h(
          'span',
          { class: 'test-controlled-expanded' },
          String(expanded),
        ),
      },
    });

    await wrapper.setProps({ expanded: false });
    await nextTick();

    expect(wrapper.find('.mat-navigation-rail__content').exists()).toBe(true);
    expect(wrapper.find('.test-controlled-expanded').text()).toBe('false');

    finishCloseAnimation();
    await flushPromises();
    await nextTick();

    expect(wrapper.find('.mat-navigation-rail__content').exists()).toBe(false);
  });

  it('支持默认内容对齐以及 header、fab Slots', () => {
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

  it('缺省 icon 在收缩态使用圆点占位且展开态不保留图标', async () => {
    const wrapper = mount(MatNavigationRail, {
      slots: {
        default: () => [
          h(MatNavigationRailItem, { value: 'missing' }, () => '无图标'),
          h(MatNavigationRailItem, { value: 'empty', icon: '' }, () => '空图标'),
        ],
      },
    });

    expect(wrapper.findAllComponents(MatNavigationRailItem)).toHaveLength(2);
    expect(wrapper.findAllComponents(MatNavigationRailItem)[0].findComponent({ name: 'MatIcon' }).props('icon'))
      .toBe('circle');
    expect(wrapper.findAllComponents(MatNavigationRailItem)[1].findComponent({ name: 'MatIcon' }).props('icon'))
      .toBe('circle');

    await wrapper.setProps({ expanded: true });

    expect(wrapper.findAllComponents(MatNavigationRailItem)[0].findComponent({ name: 'MatIcon' }).exists())
      .toBe(false);
    expect(wrapper.findAllComponents(MatNavigationRailItem)[1].findComponent({ name: 'MatIcon' }).exists())
      .toBe(false);
  });

  it('trailing 插槽渲染内容并接收 expanded/selected 插槽参数', async () => {
    const wrapper = mount(MatNavigationRail, {
      props: { modelValue: 'home' },
      slots: {
        default: () => [
          h(MatNavigationRailItem, { value: 'home', icon: 'home' }, {
            default: () => '首页',
            trailing: ({ expanded, selected }) => (
              h('span', { class: 'test-trailing' }, `${expanded}-${selected}`)
            ),
          }),
          h(MatNavigationRailItem, { value: 'settings', icon: 'settings' }, {
            default: () => '设置',
            trailing: ({ expanded, selected }) => (
              h('span', { class: 'test-trailing' }, `${expanded}-${selected}`)
            ),
          }),
        ],
      },
    });
    const items = wrapper.findAllComponents(MatNavigationRailItem);
    const trailing = wrapper.findAll('.test-trailing');

    expect(items[0].find('.mat-navigation-rail-item__trailing').exists()).toBe(true);
    expect(items[1].find('.mat-navigation-rail-item__trailing').exists()).toBe(true);
    expect(trailing).toHaveLength(2);
    expect(trailing[0].text()).toBe('false-true');
    expect(trailing[1].text()).toBe('false-false');

    await wrapper.setProps({ expanded: true });
    await nextTick();

    expect(wrapper.findAll('.test-trailing')[0].text()).toBe('true-true');
    expect(wrapper.findAll('.test-trailing')[1].text()).toBe('true-false');
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
