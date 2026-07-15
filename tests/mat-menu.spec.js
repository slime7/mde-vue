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
        open: true,
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

  it('浏览器关闭 Popover 时同步 open 状态', async () => {
    const anchor = document.createElement('button');

    anchor.id = 'dismiss-trigger';
    document.body.append(anchor);
    const wrapper = mount(MatMenu, {
      attachTo: document.body,
      props: { open: true, anchor: 'dismiss-trigger' },
      slots: { default: () => h(MatMenuItem, null, () => '关闭') },
    });

    await nextTick();
    dispatchToggle(wrapper.get('[role="menu"]').element, 'closed');
    await nextTick();

    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false]);
    expect(document.activeElement).toBe(anchor);
  });

  it('在 CSS 换边后把最终菜单矩形夹紧到视口安全间距', async () => {
    const anchor = document.createElement('button');

    anchor.id = 'edge-trigger';
    document.body.append(anchor);
    const wrapper = mount(MatMenu, {
      attachTo: document.body,
      props: { open: true, anchor: 'edge-trigger' },
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

  it('叶子项目关闭菜单并把焦点还给触发器', async () => {
    const anchor = document.createElement('button');

    anchor.id = 'leaf-trigger';
    document.body.append(anchor);
    const click = vi.fn();
    const wrapper = mount(MatMenu, {
      attachTo: document.body,
      props: { open: true, anchor: 'leaf-trigger' },
      slots: {
        default: () => h(MatMenuItem, { onClick: click }, () => '保存'),
      },
    });

    await nextTick();
    await wrapper.get('[role="menuitem"]').trigger('click');
    await nextTick();

    expect(click).toHaveBeenCalledOnce();
    expect(wrapper.emitted('update:open')).toHaveLength(1);
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false]);
    expect(document.activeElement).toBe(anchor);
  });

  it('submenu slot 展开嵌套菜单并支持返回父项目', async () => {
    const anchor = document.createElement('button');

    anchor.id = 'nested-trigger';
    document.body.append(anchor);
    const wrapper = mount(MatMenu, {
      attachTo: document.body,
      props: { open: true, anchor: 'nested-trigger', variant: 'vibrant' },
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

  it('MatDivider 在菜单中使用 separator 语义', async () => {
    const anchor = document.createElement('button');

    anchor.id = 'divider-trigger';
    document.body.append(anchor);
    const wrapper = mount(MatMenu, {
      attachTo: document.body,
      props: { open: true, anchor: 'divider-trigger' },
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
  });

  it('插件启用 Material Symbols 时只用独立图标元素承载 leading Slot', () => {
    const wrapper = mount(MatMenuItem, {
      global: {
        provide: {
          [MAT_UI_KEY]: {
            useCursor: false,
            useMaterialSymbols: true,
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
    expect(icon.classes()).toContain('mat-icon--material-symbols');
    expect(icon.text()).toBe('note_add');
    expect(trailing.find('.mat-icon').exists()).toBe(false);
  });

  it('子菜单箭头也使用统一的独立图标元素', () => {
    const wrapper = mount(MatMenuItem, {
      global: {
        provide: {
          [MAT_UI_KEY]: {
            useCursor: false,
            useMaterialSymbols: true,
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
    expect(icon.classes()).toContain('mat-icon--material-symbols');
    expect(icon.text()).toBe('chevron_right');
  });
});
