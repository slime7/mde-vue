import { mount } from '@vue/test-utils';
import {
  h,
  nextTick,
} from 'vue';
import {
  beforeEach, describe, expect, it, vi,
} from 'vitest';
import MatDivider from '../src/components/mat-divider/MatDivider.vue';
import MatMenu from '../src/components/mat-menu/MatMenu.vue';
import MatMenuGroup from '../src/components/mat-menu-group/MatMenuGroup.vue';
import MatMenuItem from '../src/components/mat-menu/MatMenuItem.vue';
import MAT_UI_KEY from '../src/mat-ui-context';

function dispatchToggle(element, newState) {
  const event = new Event('toggle');

  Object.defineProperty(event, 'newState', { value: newState });
  element.dispatchEvent(event);
}

describe('MatMenu', () => {
  beforeEach(() => {
    HTMLElement.prototype.showPopover = vi.fn(function showPopover() {
      this.dataset.popoverOpen = '';
      dispatchToggle(this, 'open');
    });
    HTMLElement.prototype.hidePopover = vi.fn(function hidePopover() {
      delete this.dataset.popoverOpen;
      dispatchToggle(this, 'closed');
    });
  });

  it('通过 anchor 打开顶层菜单并建立 roving tabindex', async () => {
    const anchor = document.createElement('button');

    anchor.id = 'menu-trigger';
    anchor.style.setProperty('anchor-name', '--consumer-anchor');
    document.body.append(anchor);
    const wrapper = mount(MatMenu, {
      attachTo: document.body,
      props: {
        modelValue: true,
        anchor: 'menu-trigger',
        color: '#6750a4',
      },
      attrs: {
        id: 'actions-menu',
        'aria-label': '操作',
      },
      slots: {
        default: () => [
          h(MatMenuItem, null, () => '编辑'),
          h(MatMenuItem, { disabled: true }, () => '删除'),
          h(MatMenuItem, null, () => '分享'),
        ],
      },
    });

    await nextTick();
    const menu = wrapper.get('[role="menu"]');
    const items = wrapper.findAll('[role="menuitem"]');

    expect(menu.attributes('popover')).toBe('auto');
    expect(menu.find('.mat-menu__surface').exists()).toBe(true);
    expect(menu.attributes('aria-label')).toBe('操作');
    expect(menu.attributes('style')).toContain('--mat-accent-color');
    expect(menu.element.showPopover).toHaveBeenCalled();
    expect(anchor.style.getPropertyValue('anchor-name')).toMatch(/--mat-menu-anchor-/);
    expect(items.map((item) => item.attributes('tabindex'))).toEqual(['0', undefined, '-1']);
    expect(document.activeElement).toBe(items[0].element);

    await items[0].trigger('keydown', { key: 'ArrowDown' });
    expect(document.activeElement).toBe(items[2].element);

    await items[2].trigger('keydown', { key: 'Home' });
    expect(document.activeElement).toBe(items[0].element);

    await items[0].trigger('keydown', { key: 'End' });
    expect(document.activeElement).toBe(items[2].element);

    const nextAnchor = document.createElement('button');

    nextAnchor.id = 'next-menu-trigger';
    document.body.append(nextAnchor);
    await wrapper.setProps({ anchor: 'next-menu-trigger' });
    await nextTick();

    expect(anchor.style.getPropertyValue('anchor-name')).toBe('--consumer-anchor');
    expect(nextAnchor.style.getPropertyValue('anchor-name')).toMatch(/--mat-menu-anchor-/);

    wrapper.unmount();
    expect(nextAnchor.style.getPropertyValue('anchor-name')).toBe('');
  });

  it('浏览器关闭 Popover 时同步 modelValue 状态', async () => {
    const anchor = document.createElement('button');

    anchor.id = 'dismiss-trigger';
    document.body.append(anchor);
    const wrapper = mount(MatMenu, {
      attachTo: document.body,
      props: { modelValue: true, anchor: 'dismiss-trigger' },
      slots: { default: () => h(MatMenuItem, null, () => '关闭') },
    });

    await nextTick();
    dispatchToggle(wrapper.get('[role="menu"]').element, 'closed');
    await nextTick();

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([false]);
    expect(wrapper.emitted('update:open')).toBeUndefined();
    expect(document.activeElement).toBe(anchor);
  });

  it('程序化关闭并重开后仍响应浏览器发起的关闭', async () => {
    const anchor = document.createElement('button');

    anchor.id = 'reopen-dismiss-trigger';
    document.body.append(anchor);
    const wrapper = mount(MatMenu, {
      attachTo: document.body,
      props: { modelValue: true, anchor: 'reopen-dismiss-trigger' },
      slots: { default: () => h(MatMenuItem, null, () => '关闭') },
    });

    await nextTick();
    await wrapper.setProps({ modelValue: false });
    await nextTick();
    await wrapper.setProps({ modelValue: true });
    await nextTick();
    dispatchToggle(wrapper.get('[role="menu"]').element, 'closed');
    await nextTick();

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([false]);
  });

  it('在 CSS 换边后把最终菜单矩形夹紧到视口安全间距', async () => {
    const anchor = document.createElement('button');

    anchor.id = 'edge-trigger';
    document.body.append(anchor);
    const wrapper = mount(MatMenu, {
      attachTo: document.body,
      props: { modelValue: true, anchor: 'edge-trigger' },
      slots: { default: () => h(MatMenuItem, null, () => '边缘项目') },
    });

    await nextTick();
    const menu = wrapper.get('[role="menu"]');

    menu.element.getBoundingClientRect = () => ({
      left: 0,
      top: 2,
      right: 200,
      bottom: 102,
    });
    window.dispatchEvent(new Event('resize'));
    await new Promise((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(resolve));
    });

    expect(menu.element.style.getPropertyValue('--mat-menu-viewport-shift-x')).toBe('8px');
    expect(menu.element.style.getPropertyValue('--mat-menu-viewport-shift-y')).toBe('6px');
  });

  it('通过视口坐标打开菜单并在坐标变化时重新定位', async () => {
    const previousFocus = document.createElement('button');

    document.body.append(previousFocus);
    previousFocus.focus();
    const wrapper = mount(MatMenu, {
      attachTo: document.body,
      props: {
        modelValue: true,
        anchor: [120, 80],
        offset: [6, -4],
      },
      slots: { default: () => h(MatMenuItem, null, () => '右键操作') },
    });

    await nextTick();
    const menu = wrapper.get('[role="menu"]');

    expect(menu.classes()).toContain('mat-menu--coordinate');
    expect(menu.element.style.left).toBe('120px');
    expect(menu.element.style.top).toBe('80px');
    expect(menu.element.style.getPropertyValue('--mat-menu-offset-x')).toBe('6px');
    expect(menu.element.style.getPropertyValue('--mat-menu-offset-y')).toBe('-4px');
    expect(menu.element.showPopover).toHaveBeenCalled();

    await wrapper.setProps({ anchor: [240, 160] });
    await nextTick();

    expect(menu.element.style.left).toBe('240px');
    expect(menu.element.style.top).toBe('160px');

    await menu.get('[role="menuitem"]').trigger('click');
    await nextTick();

    expect(document.activeElement).toBe(previousFocus);
  });

  it('元素锚点也应用 offset', async () => {
    const anchor = document.createElement('button');

    anchor.id = 'offset-trigger';
    document.body.append(anchor);
    const wrapper = mount(MatMenu, {
      attachTo: document.body,
      props: {
        modelValue: true,
        anchor: 'offset-trigger',
        offset: [-8, 12],
      },
      slots: { default: () => h(MatMenuItem, null, () => '偏移项目') },
    });

    await nextTick();
    const menu = wrapper.get('[role="menu"]');

    expect(menu.classes()).not.toContain('mat-menu--coordinate');
    expect(menu.element.style.getPropertyValue('--mat-menu-offset-x')).toBe('-8px');
    expect(menu.element.style.getPropertyValue('--mat-menu-offset-y')).toBe('12px');
  });

  it('拒绝无效的坐标和 offset 数组', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const wrapper = mount(MatMenu, {
      props: {
        modelValue: true,
        anchor: [10],
        offset: [0, Number.NaN],
      },
    });

    await nextTick();

    const warnings = warn.mock.calls.flat().join(' ');

    expect(warnings).toContain('Invalid prop: custom validator check failed for prop "anchor"');
    expect(warnings).toContain('Invalid prop: custom validator check failed for prop "offset"');
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([false]);
    warn.mockRestore();
  });

  it('叶子项目关闭菜单并把焦点还给触发器', async () => {
    const anchor = document.createElement('button');

    anchor.id = 'leaf-trigger';
    document.body.append(anchor);
    const click = vi.fn();
    const wrapper = mount(MatMenu, {
      attachTo: document.body,
      props: { modelValue: true, anchor: 'leaf-trigger' },
      slots: {
        default: () => h(MatMenuItem, { onClick: click }, () => '保存'),
      },
    });

    await nextTick();
    await wrapper.get('[role="menuitem"]').trigger('click');
    await nextTick();

    expect(click).toHaveBeenCalledOnce();
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([false]);
    expect(document.activeElement).toBe(anchor);
  });

  it('submenu slot 展开嵌套菜单并支持返回父项目', async () => {
    const anchor = document.createElement('button');

    anchor.id = 'nested-trigger';
    document.body.append(anchor);
    const wrapper = mount(MatMenu, {
      attachTo: document.body,
      props: { modelValue: true, anchor: 'nested-trigger', variant: 'vibrant' },
      slots: {
        default: () => h(MatMenuItem, null, {
          default: () => '导出',
          supporting: () => '选择格式',
          submenu: () => h(MatMenu, null, {
            default: () => [
              h(MatMenuItem, null, () => 'PDF'),
              h(MatMenuItem, null, () => 'PNG'),
            ],
          }),
        }),
      },
    });

    await nextTick();
    const parentItem = wrapper.get('[role="menuitem"]');

    expect(parentItem.attributes('aria-haspopup')).toBe('menu');
    expect(parentItem.attributes('aria-expanded')).toBe('false');

    await parentItem.trigger('keydown', { key: 'ArrowRight' });
    await nextTick();
    const menus = wrapper.findAll('[role="menu"]');
    const nestedItems = menus[1].findAll('[role="menuitem"]');

    expect(parentItem.attributes('aria-expanded')).toBe('true');
    expect(menus[1].classes()).toContain('mat-menu--nested');
    expect(menus[1].classes()).toContain('mat-menu--vibrant');
    expect(document.activeElement).toBe(nestedItems[0].element);

    await nestedItems[0].trigger('keydown', { key: 'ArrowLeft' });
    await nextTick();

    expect(parentItem.attributes('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(parentItem.element);
  });

  it('关闭根菜单时递归清除所有后代菜单的展开状态', async () => {
    const anchor = document.createElement('button');

    anchor.id = 'reopen-trigger';
    document.body.append(anchor);
    const wrapper = mount(MatMenu, {
      attachTo: document.body,
      props: { modelValue: true, anchor: 'reopen-trigger' },
      slots: {
        default: () => h(MatMenuItem, null, {
          default: () => '导出',
          submenu: () => h(MatMenu, null, {
            default: () => h(MatMenuItem, null, {
              default: () => '更多格式',
              submenu: () => h(MatMenu, null, {
                default: () => h(MatMenuItem, null, () => 'WebP'),
              }),
            }),
          }),
        }),
      },
    });

    await nextTick();
    const menus = wrapper.findAll('[role="menu"]');
    const firstParent = menus[0].get('[role="menuitem"]');
    const secondParent = menus[1].get('[role="menuitem"]');

    await firstParent.trigger('click');
    await nextTick();
    await secondParent.trigger('click');
    await nextTick();

    expect(firstParent.attributes('aria-expanded')).toBe('true');
    expect(secondParent.attributes('aria-expanded')).toBe('true');

    await wrapper.setProps({ modelValue: false });
    await nextTick();

    expect(firstParent.attributes('aria-expanded')).toBe('false');
    expect(secondParent.attributes('aria-expanded')).toBe('false');
    expect(menus[1].element.hidePopover).toHaveBeenCalled();
    expect(menus[2].element.hidePopover).toHaveBeenCalled();

    await wrapper.setProps({ modelValue: true });
    await nextTick();

    expect(firstParent.attributes('aria-expanded')).toBe('false');
    expect(secondParent.attributes('aria-expanded')).toBe('false');
  });

  it('MatDivider 在菜单中使用 separator 语义', async () => {
    const anchor = document.createElement('button');

    anchor.id = 'divider-trigger';
    document.body.append(anchor);
    const wrapper = mount(MatMenu, {
      attachTo: document.body,
      props: { modelValue: true, anchor: 'divider-trigger' },
      slots: {
        default: () => [
          h(MatMenuItem, null, () => '复制'),
          h(MatDivider),
          h(MatMenuItem, null, () => '粘贴'),
        ],
      },
    });

    await nextTick();
    const divider = wrapper.get('.mat-divider');

    expect(divider.element.tagName).toBe('DIV');
    expect(divider.attributes('role')).toBe('separator');
    expect(divider.classes()).toContain('mat-divider--menu');
  });

  it('MatMenuGroup 提供分组标签并保持跨组 roving focus', async () => {
    const anchor = document.createElement('button');

    anchor.id = 'group-trigger';
    document.body.append(anchor);
    const wrapper = mount(MatMenu, {
      attachTo: document.body,
      props: { modelValue: true, anchor: 'group-trigger' },
      slots: {
        default: () => [
          h(MatMenuGroup, { label: '编辑' }, {
            default: () => [
              h(MatMenuItem, null, () => '撤销'),
              h(MatMenuItem, null, () => '重做'),
            ],
          }),
          h(MatMenuGroup, null, {
            default: () => h(MatMenuItem, null, () => '粘贴'),
          }),
        ],
      },
    });

    await nextTick();
    const menu = wrapper.get('[role="menu"]');
    const groups = wrapper.findAll('[role="group"]');
    const items = wrapper.findAll('[role="menuitem"]');

    expect(menu.classes()).toContain('mat-menu--grouped');
    expect(groups).toHaveLength(2);
    expect(groups[0].attributes('aria-labelledby')).toBeTruthy();
    expect(groups[0].get('.mat-menu-group__label').text()).toBe('编辑');
    expect(groups[1].attributes('aria-labelledby')).toBeUndefined();
    expect(items[0].classes()).toContain('mat-menu-item--first');
    expect(items[1].classes()).toContain('mat-menu-item--last');
    expect(items[2].classes()).toContain('mat-menu-item--only');
    expect(document.activeElement).toBe(items[0].element);

    await items[0].trigger('keydown', { key: 'ArrowDown' });
    await items[1].trigger('keydown', { key: 'ArrowDown' });

    expect(document.activeElement).toBe(items[2].element);
  });

  it('只用统一 MatIcon 承载 leading Slot', () => {
    const wrapper = mount(MatMenuItem, {
      global: {
        provide: {
          [MAT_UI_KEY]: {
            iconClass: 'material-symbols-outlined',
            useCursor: false,
          },
        },
      },
      slots: {
        default: '新建文件',
        leading: 'note_add',
        trailing: 'Ctrl+N',
      },
    });
    const leading = wrapper.get('[data-mat-item-content-leading]');
    const icon = leading.get('.mat-icon');
    const trailing = wrapper.get('[data-mat-item-content-trailing]');

    expect(icon.element.tagName).toBe('SPAN');
    expect(icon.classes()).toContain('material-symbols-outlined');
    expect(icon.text()).toBe('note_add');
    expect(trailing.find('.mat-icon').exists()).toBe(false);
  });

  it('子菜单箭头也使用统一的独立图标元素', () => {
    const wrapper = mount(MatMenuItem, {
      global: {
        provide: {
          [MAT_UI_KEY]: {
            iconClass: 'material-symbols-outlined',
            useCursor: false,
          },
        },
      },
      slots: {
        default: '更多',
        submenu: '<span />',
      },
    });
    const icon = wrapper.get('.mat-menu-item__submenu-icon');

    expect(icon.element.tagName).toBe('SPAN');
    expect(icon.classes()).toContain('mat-icon');
    expect(icon.classes()).toContain('material-symbols-outlined');
    expect(icon.text()).toBe('chevron_right');
    expect(icon.attributes('style')).toContain('--mat-icon-size: 20px');
  });
});
