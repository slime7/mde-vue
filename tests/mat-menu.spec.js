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
import MatTooltip from '../src/components/mat-tooltip/MatTooltip.vue';
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

  it('activator Slot 优先于 anchor prop，并在关闭后恢复触发器焦点', async () => {
    const externalAnchor = document.createElement('button');

    externalAnchor.id = 'external-menu-anchor';
    document.body.append(externalAnchor);
    const wrapper = mount(MatMenu, {
      attachTo: document.body,
      props: {
        modelValue: true,
        anchor: 'external-menu-anchor',
      },
      slots: {
        activator: () => h('button', {
          id: 'slot-menu-activator',
          type: 'button',
        }, '打开菜单'),
        default: () => h(MatMenuItem, null, () => '菜单项目'),
      },
    });

    await nextTick();
    const activator = wrapper.get('#slot-menu-activator').element;
    const menu = wrapper.get('[role="menu"]');

    expect(document.activeElement).toBe(menu.get('[role="menuitem"]').element);

    await menu.get('[role="menuitem"]').trigger('click');
    await nextTick();

    expect(document.activeElement).toBe(activator);
    wrapper.unmount();
  });

  it('activator Slot 渲染多个元素根节点时警告并请求关闭', async () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mount(MatMenu, {
      attachTo: document.body,
      props: { modelValue: true },
      slots: {
        activator: () => [
          h('button', { type: 'button' }, '第一个'),
          h('button', { type: 'button' }, '第二个'),
        ],
        default: () => h(MatMenuItem, null, () => '菜单项目'),
      },
    });

    await nextTick();

    expect(document.body.querySelector('[role="menu"]')?.dataset.popoverOpen).toBeUndefined();
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
    expect(warning).toHaveBeenCalledWith(
      'MatMenu: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点',
    );

    wrapper.unmount();
  });

  it('通过 anchor 打开顶层菜单并建立 roving tabindex', async () => {
    const anchor = document.createElement('button');

    anchor.id = 'menu-trigger';
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

    expect(menu.attributes('popover')).toBe('manual');
    expect(menu.attributes('aria-label')).toBe('操作');
    expect(menu.element.showPopover).toHaveBeenCalled();
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

    wrapper.unmount();
  });

  it('maxLength 限制菜单最大高度并接受数字与 CSS 长度', async () => {
    const anchor = document.createElement('button');

    anchor.id = 'max-length-trigger';
    document.body.append(anchor);
    const wrapper = mount(MatMenu, {
      attachTo: document.body,
      props: {
        modelValue: true,
        anchor: 'max-length-trigger',
        maxLength: 240,
      },
      slots: { default: () => h(MatMenuItem, null, () => '项目') },
    });

    await nextTick();
    const menu = wrapper.get('[role="menu"]').element;

    expect(menu.style.maxBlockSize).toBe(
      'min(240px, calc(var(--mat-menu-viewport-height) - var(--mat-menu-viewport-space) - var(--mat-menu-viewport-space)))',
    );

    vi.stubGlobal('CSS', { supports: () => true });
    await wrapper.setProps({ maxLength: 'calc(50dvb - 24px)' });

    expect(menu.style.maxBlockSize).toBe(
      'min(calc(50dvb - 24px), calc(var(--mat-menu-viewport-height) - var(--mat-menu-viewport-space) - var(--mat-menu-viewport-space)))',
    );
  });

  it('maxLength 拒绝非正数与浏览器不支持的 CSS 长度', () => {
    vi.stubGlobal('CSS', { supports: () => true });

    expect(MatMenu.props.maxLength.validator(0)).toBe(false);
    expect(MatMenu.props.maxLength.validator(-1)).toBe(false);
    expect(MatMenu.props.maxLength.validator('320')).toBe(true);
    expect(MatMenu.props.maxLength.validator('min(320px, 50dvb)')).toBe(true);

    vi.stubGlobal('CSS', { supports: () => false });

    expect(MatMenu.props.maxLength.validator('not-a-length')).toBe(false);
  });

  it('默认透明 scrim 拦截外部指针并请求关闭根菜单', async () => {
    const anchor = document.createElement('button');
    const outside = document.createElement('button');
    const outsidePointerDown = vi.fn();

    anchor.id = 'scrim-trigger';
    outside.addEventListener('pointerdown', outsidePointerDown);
    document.body.append(anchor, outside);
    const wrapper = mount(MatMenu, {
      attachTo: document.body,
      props: {
        modelValue: true,
        anchor: 'scrim-trigger',
      },
      slots: { default: () => h(MatMenuItem, null, () => '项目') },
    });

    await nextTick();
    const menu = wrapper.get('[role="menu"]');
    const scrim = document.body.querySelector('[popover="manual"]:not([role="menu"])');

    expect(scrim).not.toBeNull();
    expect(scrim.dataset.popoverOpen).toBe('');
    expect(menu.attributes('popover')).toBe('manual');

    scrim.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    await nextTick();

    expect(outsidePointerDown).not.toHaveBeenCalled();
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([false]);
  });

  it('scrim=false 保留 auto Popover 的外部轻触关闭行为', async () => {
    const anchor = document.createElement('button');
    const outside = document.createElement('button');
    const outsidePointerDown = vi.fn();

    anchor.id = 'no-scrim-trigger';
    outside.addEventListener('pointerdown', outsidePointerDown);
    document.body.append(anchor, outside);
    const wrapper = mount(MatMenu, {
      attachTo: document.body,
      props: {
        modelValue: true,
        anchor: 'no-scrim-trigger',
        scrim: false,
      },
      slots: { default: () => h(MatMenuItem, null, () => '项目') },
    });

    await nextTick();
    const menu = wrapper.get('[role="menu"]');

    expect(menu.attributes('popover')).toBe('auto');
    expect(document.body.querySelector('[popover="manual"]:not([role="menu"])')).toBeNull();

    outside.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    await nextTick();

    expect(outsidePointerDown).toHaveBeenCalledOnce();
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([false]);
  });

  it('打开期间切换 scrim 会重建 Popover 层级并在卸载时清理', async () => {
    const anchor = document.createElement('button');

    anchor.id = 'toggle-scrim-trigger';
    document.body.append(anchor);
    const wrapper = mount(MatMenu, {
      attachTo: document.body,
      props: {
        modelValue: true,
        anchor: 'toggle-scrim-trigger',
      },
      slots: { default: () => h(MatMenuItem, null, () => '项目') },
    });

    await nextTick();
    const menu = wrapper.get('[role="menu"]');
    const scrim = document.body.querySelector('[popover="manual"]:not([role="menu"])');

    await wrapper.setProps({ scrim: false });
    await nextTick();

    expect(menu.attributes('popover')).toBe('auto');
    expect(scrim.hidePopover).toHaveBeenCalled();

    await wrapper.setProps({ scrim: true });
    await nextTick();
    await nextTick();

    const nextScrim = document.body.querySelector('[popover="manual"]:not([role="menu"])');

    expect(menu.attributes('popover')).toBe('manual');
    expect(HTMLElement.prototype.showPopover.mock.contexts).toContain(nextScrim);

    wrapper.unmount();

    expect(HTMLElement.prototype.hidePopover.mock.contexts).toContain(nextScrim);
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

  it('closeOnClick 为 false 时叶子项目保持根菜单开启', async () => {
    const anchor = document.createElement('button');

    anchor.id = 'persistent-root-trigger';
    document.body.append(anchor);
    const click = vi.fn();
    const wrapper = mount(MatMenu, {
      attachTo: document.body,
      props: {
        modelValue: true,
        anchor: 'persistent-root-trigger',
        closeOnClick: false,
      },
      slots: {
        default: () => h(MatMenuItem, { onClick: click }, () => '固定菜单'),
      },
    });

    await nextTick();
    await wrapper.get('[role="menuitem"]').trigger('click');
    await nextTick();

    expect(click).toHaveBeenCalledOnce();
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    expect(wrapper.get('[role="menu"]').element.dataset.popoverOpen).toBe('');
  });

  it('父菜单的 closeOnClick 不影响子菜单的默认关闭行为', async () => {
    const anchor = document.createElement('button');

    anchor.id = 'nested-default-close-trigger';
    document.body.append(anchor);
    const wrapper = mount(MatMenu, {
      attachTo: document.body,
      props: {
        modelValue: true,
        anchor: 'nested-default-close-trigger',
        closeOnClick: false,
      },
      slots: {
        default: () => h(MatMenuItem, null, {
          default: () => '导出',
          submenu: () => h(MatMenu, null, {
            default: () => h(MatMenuItem, null, () => 'PDF'),
          }),
        }),
      },
    });

    await nextTick();
    const parentItem = wrapper.get('[role="menuitem"]');

    await parentItem.trigger('click');
    await nextTick();
    await wrapper.findAll('[role="menu"]')[1].get('[role="menuitem"]').trigger('click');
    await nextTick();

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([false]);
  });

  it('子菜单的 closeOnClick 为 false 时不受父菜单默认值影响', async () => {
    const anchor = document.createElement('button');

    anchor.id = 'nested-persistent-trigger';
    document.body.append(anchor);
    const wrapper = mount(MatMenu, {
      attachTo: document.body,
      props: { modelValue: true, anchor: 'nested-persistent-trigger' },
      slots: {
        default: () => h(MatMenuItem, null, {
          default: () => '导出',
          submenu: () => h(MatMenu, { closeOnClick: false }, {
            default: () => h(MatMenuItem, null, () => 'PDF'),
          }),
        }),
      },
    });

    await nextTick();
    const parentItem = wrapper.get('[role="menuitem"]');

    await parentItem.trigger('click');
    await nextTick();
    const submenu = wrapper.findAll('[role="menu"]')[1];

    await submenu.get('[role="menuitem"]').trigger('click');
    await nextTick();

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    expect(parentItem.attributes('aria-expanded')).toBe('true');
    expect(submenu.element.dataset.popoverOpen).toBe('');
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
    const parentAnchorNames = parentItem.element.style.getPropertyValue('anchor-name');

    expect(parentItem.attributes('aria-haspopup')).toBe('menu');
    expect(parentItem.attributes('aria-expanded')).toBe('false');
    expect(parentAnchorNames).toContain('--mat-state-layer-');

    await parentItem.trigger('keydown', { key: 'ArrowRight' });
    await nextTick();
    const menus = wrapper.findAll('[role="menu"]');
    const nestedItems = menus[1].findAll('[role="menuitem"]');
    const openParentAnchorNames = parentItem.element.style.getPropertyValue('anchor-name');

    expect(parentItem.attributes('aria-expanded')).toBe('true');
    expect(openParentAnchorNames).toContain('--mat-state-layer-');
    expect(openParentAnchorNames).toContain('--mat-menu-anchor-');
    expect(document.activeElement).toBe(nestedItems[0].element);

    await nestedItems[0].trigger('keydown', { key: 'ArrowLeft' });
    await nextTick();

    expect(parentItem.attributes('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(parentItem.element);
  });

  async function mountSubmenuMenu(anchorId) {
    const anchor = document.createElement('button');

    anchor.id = anchorId;
    document.body.append(anchor);
    const wrapper = mount(MatMenu, {
      attachTo: document.body,
      props: { modelValue: true, anchor: anchorId },
      slots: {
        default: () => [
          h(MatMenuItem, null, {
            default: () => '文件',
            submenu: () => h(MatMenu, null, {
              default: () => h(MatMenuItem, null, () => '打开'),
            }),
          }),
          h(MatMenuItem, null, {
            default: () => '编辑',
            submenu: () => h(MatMenu, null, {
              default: () => h(MatMenuItem, null, () => '撤销'),
            }),
          }),
        ],
      },
    });

    await nextTick();
    const rootMenu = wrapper.findAll('[role="menu"]')[0];
    const items = rootMenu.findAll('[role="menuitem"]')
      .filter((item) => item.element.closest('[role="menu"]') === rootMenu.element);
    const firstItem = items[0];
    const secondItem = items[1];

    firstItem.element.getBoundingClientRect = () => ({
      left: 100,
      top: 100,
      right: 180,
      bottom: 140,
      width: 80,
      height: 40,
    });

    await firstItem.trigger('pointerenter');
    await nextTick();
    const firstSubmenu = wrapper.findAll('[role="menu"]')[1];
    const secondSubmenu = wrapper.findAll('[role="menu"]')[2];

    firstSubmenu.element.getBoundingClientRect = () => ({
      left: 180,
      top: 80,
      right: 340,
      bottom: 260,
      width: 160,
      height: 180,
    });

    return {
      wrapper,
      firstItem,
      secondItem,
      firstSubmenu,
      secondSubmenu,
    };
  }

  it('指针沿三角安全区进入同级项目时不打开其他子菜单', async () => {
    const {
      wrapper, firstItem, secondItem, firstSubmenu, secondSubmenu,
    } = await mountSubmenuMenu('safe-triangle-trigger');
    const rootMenu = wrapper.findAll('[role="menu"]')[0];

    expect(firstItem.attributes('aria-expanded')).toBe('true');

    rootMenu.element.dispatchEvent(new PointerEvent('pointermove', {
      clientX: 120,
      clientY: 120,
    }));
    rootMenu.element.dispatchEvent(new PointerEvent('pointermove', {
      clientX: 170,
      clientY: 130,
    }));

    await secondItem.trigger('pointerenter');
    await nextTick();

    expect(secondItem.attributes('aria-expanded')).toBe('false');
    expect(secondSubmenu.element.dataset.popoverOpen).toBeUndefined();
    expect(firstItem.attributes('aria-expanded')).toBe('true');
    expect(firstSubmenu.element.dataset.popoverOpen).toBe('');

    await firstSubmenu.trigger('pointerenter');
    await nextTick();

    expect(firstItem.attributes('aria-expanded')).toBe('true');
  });

  it('指针不在三角安全区时悬停同级项目正常切换子菜单', async () => {
    const {
      wrapper, firstItem, secondItem, secondSubmenu,
    } = await mountSubmenuMenu('switch-triangle-trigger');
    const rootMenu = wrapper.findAll('[role="menu"]')[0];

    rootMenu.element.dispatchEvent(new PointerEvent('pointermove', {
      clientX: 60,
      clientY: 120,
    }));
    rootMenu.element.dispatchEvent(new PointerEvent('pointermove', {
      clientX: 60,
      clientY: 130,
    }));

    await secondItem.trigger('pointerenter');
    await nextTick();

    expect(secondItem.attributes('aria-expanded')).toBe('true');
    expect(secondSubmenu.element.dataset.popoverOpen).toBe('');
    expect(firstItem.attributes('aria-expanded')).toBe('false');
  });

  it('指针位于三角安全区时点击同级项目仍正常展开', async () => {
    const {
      wrapper, firstItem, secondItem, secondSubmenu,
    } = await mountSubmenuMenu('triangle-click-trigger');
    const rootMenu = wrapper.findAll('[role="menu"]')[0];

    rootMenu.element.dispatchEvent(new PointerEvent('pointermove', {
      clientX: 120,
      clientY: 120,
    }));
    rootMenu.element.dispatchEvent(new PointerEvent('pointermove', {
      clientX: 170,
      clientY: 130,
    }));

    await secondItem.trigger('click');
    await nextTick();

    expect(secondItem.attributes('aria-expanded')).toBe('true');
    expect(secondSubmenu.element.dataset.popoverOpen).toBe('');
    expect(firstItem.attributes('aria-expanded')).toBe('false');
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
    const groups = wrapper.findAll('[role="group"]');
    const items = wrapper.findAll('[role="menuitem"]');

    expect(groups).toHaveLength(2);
    expect(groups[0].attributes('aria-labelledby')).toBeTruthy();
    expect(groups[0].get('.mat-menu-group__label').text()).toBe('编辑');
    expect(groups[1].attributes('aria-labelledby')).toBeUndefined();
    expect(document.activeElement).toBe(items[0].element);

    await items[0].trigger('keydown', { key: 'ArrowDown' });
    await items[1].trigger('keydown', { key: 'ArrowDown' });

    expect(document.activeElement).toBe(items[2].element);
  });

  it('leading Slot 直接承载内容且不产生多余 MatIcon 包装', () => {
    const wrapper = mount(MatMenuItem, {
      slots: {
        default: '新建文件',
        leading: '<span class="custom-leading">note_add</span>',
        trailing: 'Ctrl+N',
      },
    });
    const leading = wrapper.get('[data-mat-item-content-leading]');
    const trailing = wrapper.get('[data-mat-item-content-trailing]');

    expect(leading.element.tagName).toBe('SPAN');
    expect(leading.find('.mat-icon').exists()).toBe(false);
    expect(leading.find('.custom-leading').exists()).toBe(true);
    expect(trailing.find('.mat-icon').exists()).toBe(false);
  });

  it('键盘聚焦保持菜单项目可达', async () => {
    const wrapper = mount(MatMenuItem, {
      attachTo: document.body,
      slots: { default: '菜单项目' },
    });
    const item = wrapper.get('[role="menuitem"]');

    item.element.focus();
    await nextTick();

    expect(document.activeElement).toBe(item.element);
  });

  it('子菜单箭头也使用统一的独立图标元素', () => {
    const wrapper = mount(MatMenuItem, {
      global: {
        provide: {
          [MAT_UI_KEY]: {
            defaults: {},
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
    expect(icon.text()).toBe('chevron_right');
  });

  it('selected 属性为菜单项添加 selected 类名与 aria-selected', () => {
    const wrapper = mount(MatMenuItem, {
      props: { selected: true },
      slots: { default: '已选项' },
    });
    const item = wrapper.get('[role="menuitem"]');

    expect(item.classes()).toContain('mat-menu-item--selected');
    expect(item.attributes('aria-selected')).toBe('true');
  });

  it('tooltip 属性为菜单项挂载 MatTooltip 并在未提供时不挂载', () => {
    const withTooltip = mount(MatMenuItem, {
      props: { tooltip: '完整详情提示' },
      slots: { default: '长文本选项' },
    });
    const withoutTooltip = mount(MatMenuItem, {
      slots: { default: '普通选项' },
    });

    expect(withTooltip.findComponent(MatTooltip).exists()).toBe(true);
    expect(withTooltip.findComponent(MatTooltip).props('content')).toBe('完整详情提示');
    expect(withoutTooltip.findComponent(MatTooltip).exists()).toBe(false);
  });
});
