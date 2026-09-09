/* eslint-disable vue/one-component-per-file */
import {
  defineComponent, h, nextTick, onMounted,
} from 'vue';
import { flushPromises, mount } from '@vue/test-utils';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import MatBadge from '../src/components/mat-badge/MatBadge.vue';
import MatAside from '../src/components/mat-aside/MatAside.vue';
import MatNavigationRail from '../src/components/mat-navigation-rail/MatNavigationRail.vue';
import MatNavigationRailItem from '../src/components/mat-navigation-rail/MatNavigationRailItem.vue';
import MatAppRoot from '../src/components/mat-app-root/MatAppRoot.vue';
import MatLayout from '../src/components/mat-layout/MatLayout.vue';
import { useMatApp } from '../src/components/mat-app-root/mat-app-root-context';

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

function elementRect({
  bottom, height, left = 0, right, top = 0, width,
}) {
  return {
    bottom,
    height,
    left,
    right,
    top,
    width,
    x: left,
    y: top,
    toJSON() {},
  };
}

async function settleMeasurement() {
  await new Promise((resolve) => {
    window.setTimeout(resolve, 20);
  });
  await settleRender();
}

describe('MatNavigationRail', () => {
  it('公开 bordered 属性并转交给 MatAside', () => {
    expect(MatNavigationRail.props.bordered.default).toBe(false);

    const wrapper = mount(MatNavigationRail, {
      props: { bordered: true },
      slots: { default: navigationItems },
    });

    expect(wrapper.findComponent(MatAside).props('bordered')).toBe(true);
  });

  it('公开 container-color 属性，默认关闭', () => {
    expect(MatNavigationRail.props.containerColor.default).toBe(false);
    expect(MatNavigationRail.props.containerColor.type).toBe(Boolean);

    const wrapper = mount(MatNavigationRail, {
      props: { containerColor: true },
      slots: { default: navigationItems },
    });

    expect(wrapper.props('containerColor')).toBe(true);
  });

  it('使用 alignment 控制默认内容定位且不再公开 position', () => {
    expect(MatNavigationRail.props.position).toBeUndefined();
    expect(MatNavigationRail.props.alignment.default).toBe('start');
    expect(MatNavigationRail.props.alignment.validator('start')).toBe(true);
    expect(MatNavigationRail.props.alignment.validator('center')).toBe(true);
    expect(MatNavigationRail.props.alignment.validator('end')).toBe(true);
    expect(MatNavigationRail.props.alignment.validator('top')).toBe(false);
    expect(MatNavigationRail.props.location).toBeUndefined();
    expect(MatNavigationRail.props.open).toBeDefined();
  });

  it('支持通过 open 属性显式受控显隐状态', async () => {
    const wrapper = mount(MatNavigationRail, {
      props: { open: false },
      slots: { default: navigationItems },
    });

    expect(wrapper.find('nav').classes()).toContain('mat-aside--closed');

    await wrapper.setProps({ open: true });
    await settleRender();

    expect(wrapper.find('nav').classes()).not.toContain('mat-aside--closed');
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
    expect(MatNavigationRail.props.app).toBeUndefined();
    expect(MatNavigationRail.props.attach).toBeDefined();

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

  it('移除 app 后，fixed 模式仍可通过 attach 指定挂载目标', async () => {
    const source = document.createElement('section');
    const attach = document.createElement('main');
    attach.id = 'navigation-rail-app-target';
    document.body.append(source, attach);
    const wrapper = mount(MatNavigationRail, {
      attachTo: source,
      props: {
        app: true,
        attach: '#navigation-rail-app-target',
        mode: 'fixed',
      },
      slots: { default: navigationItems },
    });

    await settleRender();

    expect(source.querySelector('nav')).toBeNull();
    expect(attach.querySelector('nav')).not.toBeNull();

    wrapper.unmount();
    source.remove();
    attach.remove();
  });

  it('显式 mode="flow" 时仍保持流式布局并不登记 AppRoot 边缘', async () => {
    let app;
    const Capture = defineComponent({
      setup() {
        app = useMatApp();
        return () => null;
      },
    });
    const wrapper = mount(MatAppRoot, {
      attachTo: document.body,
      props: { fillViewport: false },
      slots: {
        default: () => [
          h(Capture),
          h(MatNavigationRail, {
            expanded: true,
            mode: 'flow',
          }, {
            default: navigationItems,
          }),
        ],
      },
    });

    await settleRender();
    const appRootElement = wrapper.element;
    const railElement = wrapper.element.querySelector('.mat-navigation-rail-host');
    vi.spyOn(appRootElement, 'getBoundingClientRect').mockReturnValue(elementRect({
      bottom: 700,
      height: 700,
      right: 1000,
      width: 1000,
    }));
    vi.spyOn(railElement, 'getBoundingClientRect').mockReturnValue(elementRect({
      bottom: 700,
      height: 700,
      right: 240,
      width: 240,
    }));

    window.dispatchEvent(new Event('resize'));
    await settleMeasurement();

    expect(app.layout.padding.start).toBe(0);
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

  it('collapsible 不再自带汉堡按钮，用户需自行在 slot 混排按钮切换 rail', async () => {
    const wrapper = mount(MatNavigationRail, {
      props: {
        collapsible: true,
        expanded: false,
      },
      slots: {
        default: ({ expanded }) => h('button', {
          class: 'custom-menu-button',
          onClick: () => wrapper.vm.$emit('update:expanded', !expanded),
        }, expanded ? 'close' : 'open'),
      },
    });

    expect(wrapper.find('.mat-navigation-rail__menu').exists()).toBe(false);
    expect(wrapper.find('.custom-menu-button').text()).toBe('open');

    await wrapper.find('.custom-menu-button').trigger('click');

    expect(wrapper.emitted('update:expanded')).toEqual([[true]]);
  });

  it('modal expanded rail 使用遮罩，遮罩和 Escape 都请求收起', async () => {
    const wrapper = mount(MatNavigationRail, {
      attachTo: document.body,
      props: {
        collapsible: true,
        expanded: true,
        layout: 'modal',
      },
    });

    const scrim = document.body.querySelector('.mat-navigation-rail__scrim');
    expect(scrim).toBeTruthy();
    expect(document.body.querySelectorAll('.mat-aside__scrim')).toHaveLength(1);
    expect(document.body.querySelectorAll('.mat-navigation-rail__scrim')).toHaveLength(1);
    // scrim 必须渲染在 nav 容器外部平级，绝不能作为 nav 的子元素
    expect(wrapper.find('nav').find('.mat-navigation-rail__scrim').exists()).toBe(false);

    scrim.click();
    expect(wrapper.emitted('update:expanded')).toEqual([[false]]);
    wrapper.unmount();

    const escWrapper = mount(MatNavigationRail, {
      attachTo: document.body,
      props: {
        collapsible: true,
        expanded: true,
        layout: 'modal',
      },
    });
    await settleRender();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await settleRender();
    expect(escWrapper.emitted('update:expanded')).toEqual([[false]]);
    escWrapper.unmount();
  });

  it('hide-on-collapse 收起时隐藏 expanded rail 容器', async () => {
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
    expect(wrapper.find('.mat-navigation-rail-host--hidden').exists()).toBe(true);
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

  it('支持默认内容对齐以及 default Slot 作用域传值', () => {
    const wrapper = mount(MatNavigationRail, {
      props: { alignment: 'center', expanded: true },
      slots: {
        header: ({ expanded }) => h('div', { class: 'test-header' }, String(expanded)),
        default: ({ expanded, orientation }) => [
          h('button', { class: 'test-fab' }, `${expanded}-${orientation}`),
          ...navigationItems(),
        ],
      },
    });

    expect(wrapper.find('.test-header').text()).toBe('true');
    expect(wrapper.find('.test-fab').text()).toBe('true-vertical');
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

    expect(items[0].find('.mat-navigation-rail-item > .mat-navigation-rail-item__trailing').exists()).toBe(true);
    expect(items[1].find('.mat-navigation-rail-item > .mat-navigation-rail-item__trailing').exists()).toBe(true);
    expect(trailing).toHaveLength(2);
    expect(trailing[0].text()).toBe('false-true');
    expect(trailing[1].text()).toBe('false-false');

    await wrapper.setProps({ expanded: true });
    await nextTick();

    expect(wrapper.findAll('.test-trailing')[0].text()).toBe('true-true');
    expect(wrapper.findAll('.test-trailing')[1].text()).toBe('true-false');
    expect(items[0].find('.mat-navigation-rail-item > .mat-navigation-rail-item__trailing').exists()).toBe(true);

    await wrapper.setProps({ fullWidth: true });
    await nextTick();

    expect(items[0].find('.mat-navigation-rail-item__indicator .mat-navigation-rail-item__trailing').exists()).toBe(true);
  });

  it('默认插槽支持混排 MatSpacer 进行弹性布局', () => {
    const wrapper = mount(MatNavigationRail, {
      props: { expanded: true },
      slots: {
        default: ({ expanded }) => [
          ...navigationItems(),
          h('span', { class: 'mat-spacer' }),
          h('button', { class: 'test-bottom-btn' }, String(expanded)),
        ],
      },
    });

    expect(wrapper.find('.mat-spacer').exists()).toBe(true);
    expect(wrapper.find('.test-bottom-btn').text()).toBe('true');
  });

  it('Item 的 badge 只绑定图标区域并保留 Item 交互', async () => {
    const wrapper = mount(MatNavigationRail, {
      attachTo: document.body,
      slots: {
        default: () => h(MatNavigationRailItem, {
          value: 'inbox',
          icon: 'inbox',
          badge: {
            content: 0,
            color: 'tertiary',
            location: 'top-start',
          },
        }, () => '收件箱'),
      },
    });
    const item = wrapper.findComponent(MatNavigationRailItem);
    const badge = item.findComponent(MatBadge);

    expect(badge.exists()).toBe(true);
    expect(badge.props()).toMatchObject({
      content: 0,
      color: 'tertiary',
      location: 'top-start',
      dot: false,
    });
    const hiddenNodes = badge.findAll('[aria-hidden="true"]');

    expect(hiddenNodes.at(hiddenNodes.length - 1).text()).toBe('0');
    expect(item.text()).toContain('收件箱');

    item.element.focus();
    expect(document.activeElement).toBe(item.element);

    await item.trigger('click');
    expect(item.emitted('click')).toHaveLength(1);
  });

  it('expanded 状态隐藏 badge 指示器，切回收缩态后恢复显示', async () => {
    const wrapper = mount(MatNavigationRail, {
      props: { expanded: true },
      slots: {
        default: () => h(MatNavigationRailItem, {
          icon: 'mail',
          badge: { content: 3 },
        }, () => '邮件'),
      },
    });
    const item = wrapper.findComponent(MatNavigationRailItem);
    const badge = item.findComponent(MatBadge);

    expect(badge.exists()).toBe(true);
    expect(badge.findAll('[aria-hidden="true"]')).toHaveLength(1);
    expect(badge.text()).not.toContain('3');
    expect(item.findComponent({ name: 'MatIcon' }).exists()).toBe(true);
    expect(item.text()).toContain('邮件');

    await wrapper.setProps({ expanded: false });

    const hiddenNodes = item.findComponent(MatBadge).findAll('[aria-hidden="true"]');

    expect(hiddenNodes.at(hiddenNodes.length - 1).text()).toBe('3');
  });

  it('badge 支持 icon Slot 与收缩态圆点占位图标', () => {
    const wrapper = mount(MatNavigationRail, {
      slots: {
        default: () => [
          h(MatNavigationRailItem, {
            value: 'missing',
            badge: { dot: true },
          }, () => '无图标'),
          h(MatNavigationRailItem, {
            value: 'custom',
            badge: { content: 8 },
          }, {
            default: () => '自定义图标',
            icon: () => h('span', { 'data-testid': 'custom-icon' }, 'mail'),
          }),
        ],
      },
    });
    const items = wrapper.findAllComponents(MatNavigationRailItem);
    const missingIconHiddenNodes = items[0].findAll('[aria-hidden="true"]');
    const customIconHiddenNodes = items[1].findAll('[aria-hidden="true"]');

    expect(items[0].findComponent({ name: 'MatIcon' }).props('icon')).toBe('circle');
    expect(missingIconHiddenNodes.at(missingIconHiddenNodes.length - 1).attributes('data-dot')).toBe('');
    expect(items[1].find('[data-testid="custom-icon"]').exists()).toBe(true);
    expect(customIconHiddenNodes.at(customIconHiddenNodes.length - 1).text()).toBe('8');
  });

  it('badge 遵循内容、dot 优先级、颜色和八种覆盖位置', () => {
    const locations = [
      'top-start',
      'top',
      'top-end',
      'end',
      'bottom-end',
      'bottom',
      'bottom-start',
      'start',
    ];
    const wrapper = mount(MatNavigationRail, {
      slots: {
        default: () => [
          ...locations.map((location) => h(MatNavigationRailItem, {
            key: location,
            icon: 'mail',
            badge: { content: 1, location },
          }, () => location)),
          h(MatNavigationRailItem, {
            icon: 'priority_high',
            badge: { content: '99', dot: true, color: 'error' },
          }, () => '点型'),
          h(MatNavigationRailItem, {
            icon: 'drafts',
            badge: { content: '' },
          }, () => '空内容'),
        ],
      },
    });
    const items = wrapper.findAllComponents(MatNavigationRailItem);

    expect(items.slice(0, locations.length).map((item) => item.findComponent(MatBadge).props('location')))
      .toEqual(locations);
    const dotHiddenNodes = items[locations.length].findAll('[aria-hidden="true"]');
    const emptyHiddenNodes = items[locations.length + 1].findAll('[aria-hidden="true"]');

    expect(dotHiddenNodes.at(dotHiddenNodes.length - 1).attributes('data-dot')).toBe('');
    expect(dotHiddenNodes.at(dotHiddenNodes.length - 1).text()).not.toContain('99');
    expect(emptyHiddenNodes).toHaveLength(2);
    expect(emptyHiddenNodes.at(emptyHiddenNodes.length - 1).attributes('data-dot')).toBeUndefined();
  });

  it('NavigationItem 不公开 badge offset，且不会把 offset 转发给 MatBadge', () => {
    expect(MatNavigationRailItem.props.offset).toBeUndefined();

    const wrapper = mount(MatNavigationRail, {
      slots: {
        default: () => h(MatNavigationRailItem, {
          icon: 'mail',
          badge: {
            content: 1,
            offset: { inline: 20, block: 10 },
          },
        }, () => '邮件'),
      },
    });
    const hiddenNodes = wrapper.findComponent(MatBadge).findAll('[aria-hidden="true"]');
    const indicator = hiddenNodes.at(hiddenNodes.length - 1);

    expect(indicator.attributes('style')).not.toContain('20px');
    expect(indicator.attributes('style')).not.toContain('10px');
  });

  it('badge.location=inline 回退到 top-end 并给出开发警告', () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mount(MatNavigationRail, {
      slots: {
        default: () => h(MatNavigationRailItem, {
          icon: 'mail',
          badge: { content: 1, location: 'inline' },
        }, () => '邮件'),
      },
    });

    expect(wrapper.findComponent(MatBadge).props('location')).toBe('top-end');
    expect(warning).toHaveBeenCalledWith(
      'MatNavigationRailItem: badge.location 不支持 inline，当前按 top-end 处理',
    );
  });

  it('未传 badge 时不渲染 Badge，且不会通过 createMatUi 默认注入', () => {
    const wrapper = mount(MatNavigationRail, {
      slots: {
        default: () => h(MatNavigationRailItem, { icon: 'mail' }, () => '邮件'),
      },
    });

    expect(wrapper.findComponent(MatBadge).exists()).toBe(false);
    expect(MatNavigationRailItem.props.badge.default).toBeUndefined();
  });

  it('expanded 切换时重新测量 NavigationRail 并同步 AppRoot padding', async () => {
    let app;
    const Capture = defineComponent({
      setup() {
        app = useMatApp();
        return () => null;
      },
    });
    const Harness = defineComponent({
      props: {
        expanded: {
          type: Boolean,
          default: false,
        },
      },
      setup(props) {
        return () => h(MatAppRoot, {
          fillViewport: false,
        }, () => [
          h(Capture),
          h(MatNavigationRail, {
            placeholder: true,
            expanded: props.expanded,
            transition: false,
          }, {
            default: navigationItems,
          }),
        ]);
      },
    });
    const wrapper = mount(Harness, { attachTo: document.body });

    await settleRender();
    const appRootElement = wrapper.element;
    const railElement = wrapper.element.querySelector('.mat-navigation-rail-host');
    let railWidth = 80;
    vi.spyOn(appRootElement, 'getBoundingClientRect').mockReturnValue(elementRect({
      bottom: 700,
      height: 700,
      right: 1000,
      width: 1000,
    }));
    vi.spyOn(railElement, 'getBoundingClientRect').mockImplementation(() => elementRect({
      bottom: 700,
      height: 700,
      right: railWidth,
      width: railWidth,
    }));
    window.dispatchEvent(new Event('resize'));
    await settleMeasurement();
    expect(app.layout.padding.start).toBe(80);
    expect(wrapper.find('.mat-navigation-rail__placeholder').exists()).toBe(false);

    railWidth = 240;
    await wrapper.setProps({ expanded: true });
    await settleMeasurement();
    expect(app.layout.padding.start).toBe(240);

    railWidth = 80;
    await wrapper.setProps({ expanded: false });
    await settleMeasurement();
    expect(app.layout.padding.start).toBe(80);

    wrapper.unmount();
  });

  it('hideOnCollapse 切换时回收并恢复最近 AppRoot 的 padding', async () => {
    let app;
    const Capture = defineComponent({
      setup() {
        app = useMatApp();
        return () => null;
      },
    });
    const Harness = defineComponent({
      props: {
        expanded: {
          type: Boolean,
          default: true,
        },
      },
      setup(props) {
        return () => h(MatAppRoot, {
          fillViewport: false,
        }, () => [
          h(Capture),
          h(MatNavigationRail, {
            expanded: props.expanded,
            hideOnCollapse: true,
            transition: false,
          }, {
            default: navigationItems,
          }),
        ]);
      },
    });
    const wrapper = mount(Harness, { attachTo: document.body });

    await settleRender();
    const appRootElement = wrapper.element;
    const railElement = wrapper.element.querySelector('.mat-navigation-rail-host');
    vi.spyOn(appRootElement, 'getBoundingClientRect').mockReturnValue(elementRect({
      bottom: 700,
      height: 700,
      right: 1000,
      width: 1000,
    }));
    vi.spyOn(railElement, 'getBoundingClientRect').mockReturnValue(elementRect({
      bottom: 700,
      height: 700,
      right: 240,
      width: 240,
    }));
    window.dispatchEvent(new Event('resize'));
    await settleMeasurement();
    expect(app.layout.padding.start).toBe(240);

    await wrapper.setProps({ expanded: false });
    await settleMeasurement();
    expect(app.layout.padding.start).toBe(0);

    await wrapper.setProps({ expanded: true });
    await settleMeasurement();
    expect(app.layout.padding.start).toBe(240);

    wrapper.unmount();
  });

  it('modal Rail 在 MatLayout 中展开时内部 Item 可正常交互，不被遮罩阻止', async () => {
    const wrapper = mount(MatLayout, {
      attachTo: document.body,
      slots: {
        default: () => [
          h(MatNavigationRail, {
            expanded: true,
            layout: 'modal',
            modelValue: 'home',
          }, {
            default: navigationItems,
          }),
          h('div', { class: 'page-content' }, '正文'),
        ],
      },
    });

    await settleRender();

    const rail = wrapper.findComponent(MatNavigationRail);
    const items = rail.findAllComponents(MatNavigationRailItem);

    expect(rail.find('nav').element.closest('[inert]')).toBeNull();

    await items[1].trigger('click');
    expect(rail.emitted('update:modelValue')).toEqual([['settings']]);

    wrapper.unmount();
  });

  it('AppRoot 中的 modal rail 与局部遮罩保持同一层级，避免导航本体被遮罩压暗', async () => {
    const wrapper = mount(MatAppRoot, {
      attachTo: document.body,
      props: {
        fillViewport: false,
      },
      slots: {
        default: () => h(MatNavigationRail, {
          expanded: true,
          layout: 'modal',
          placeholder: true,
        }, {
          default: navigationItems,
        }),
      },
    });

    await settleRender();

    const appRootElement = wrapper.element;
    const contentElement = appRootElement.querySelector('.mat-app-root__content');
    const railElement = appRootElement.querySelector('.mat-navigation-rail-host');
    const scrimElement = appRootElement.querySelector('.mat-aside__scrim');

    expect(contentElement.querySelector('.mat-navigation-rail__placeholder')).toBeTruthy();
    expect(railElement.parentElement).toBe(contentElement);
    expect(railElement.closest('.mat-app-root__content')).toBe(contentElement);
    expect(scrimElement.parentElement).toBe(contentElement);
    expect(scrimElement.classList.contains('mat-aside__scrim--docked')).toBe(true);

    wrapper.unmount();
  });
});
