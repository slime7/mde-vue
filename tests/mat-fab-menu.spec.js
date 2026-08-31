import { mount } from '@vue/test-utils';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { defineComponent, h, nextTick, ref } from 'vue';
import { MatBtn, MatFab, MatFabMenu } from '../src';
import MatAppRoot from '../src/components/mat-app-root/MatAppRoot.vue';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('MatFabMenu', () => {
  it('默认渲染折叠态主 FAB 并继承 FAB 属性', () => {
    const wrapper = mount(MatFabMenu, {
      props: {
        icon: 'add',
        label: '新建操作',
      },
    });

    const trigger = wrapper.find('button.mat-fab-menu__trigger-fab');
    expect(trigger.exists()).toBe(true);
    expect(trigger.attributes('aria-label')).toBe('新建操作');
    expect(trigger.attributes('aria-expanded')).toBe('false');
    expect(trigger.attributes('aria-haspopup')).toBe('true');
    expect(trigger.text()).toBe('add');
  });

  it('点击触发按钮切换展开/折叠状态，展开时显示圆形固定尺寸关闭按钮', async () => {
    const wrapper = mount(MatFabMenu, {
      props: {
        icon: 'add',
        label: '新建',
        closeIcon: 'close',
        closeLabel: '关闭菜单',
      },
      slots: {
        default: () => [
          h(MatBtn, { prefix: 'edit' }, () => '编辑'),
          h(MatBtn, { prefix: 'share' }, () => '分享'),
        ],
      },
    });

    const triggerFab = wrapper.find('button.mat-fab-menu__trigger-fab');
    const closeBtn = wrapper.find('button.mat-fab-menu__close-btn');

    expect(triggerFab.exists()).toBe(true);
    expect(closeBtn.exists()).toBe(true);
    expect(closeBtn.attributes('aria-label')).toBe('关闭菜单');
    expect(closeBtn.text()).toBe('close');

    // 初始折叠
    expect(wrapper.classes()).not.toContain('mat-fab-menu--open');
    expect(triggerFab.attributes('aria-expanded')).toBe('false');

    // 点击展开
    await triggerFab.trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
    expect(wrapper.emitted('open')?.length).toBe(1);
    expect(wrapper.classes()).toContain('mat-fab-menu--open');
    expect(triggerFab.attributes('aria-expanded')).toBe('true');

    // 点击关闭按钮折叠
    await closeBtn.trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([false]);
    expect(wrapper.emitted('close')?.length).toBe(1);
    expect(wrapper.classes()).not.toContain('mat-fab-menu--open');
    expect(triggerFab.attributes('aria-expanded')).toBe('false');
  });

  it('支持 v-model 外部受控', async () => {
    const wrapper = mount(MatFabMenu, {
      props: {
        modelValue: false,
        icon: 'menu',
        label: '菜单',
      },
    });

    expect(wrapper.classes()).not.toContain('mat-fab-menu--open');

    await wrapper.setProps({ modelValue: true });
    expect(wrapper.classes()).toContain('mat-fab-menu--open');

    await wrapper.setProps({ modelValue: false });
    expect(wrapper.classes()).not.toContain('mat-fab-menu--open');
  });

  it('默认点击 slot 内部按钮自动收起菜单，closeOnClick=false 时不收起', async () => {
    const wrapper = mount(MatFabMenu, {
      props: {
        modelValue: true,
        icon: 'add',
        label: '新建',
      },
      slots: {
        default: () => [
          h(MatBtn, { class: 'action-btn', prefix: 'edit' }, () => '操作项'),
        ],
      },
    });

    const actionBtn = wrapper.find('.action-btn');
    await actionBtn.trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]);
    expect(wrapper.emitted('close')?.length).toBe(1);

    const noCloseWrapper = mount(MatFabMenu, {
      props: {
        modelValue: true,
        closeOnClick: false,
        icon: 'add',
        label: '新建',
      },
      slots: {
        default: () => [
          h(MatBtn, { class: 'action-btn-stay', prefix: 'share' }, () => '保持项'),
        ],
      },
    });

    await noCloseWrapper.find('.action-btn-stay').trigger('click');
    expect(noCloseWrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('按下 Escape 键自动收起展开的菜单', async () => {
    const wrapper = mount(MatFabMenu, {
      attachTo: document.body,
      props: {
        modelValue: true,
        icon: 'add',
        label: '新建',
      },
    });

    const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
    window.dispatchEvent(event);
    await nextTick();

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]);
    expect(wrapper.emitted('close')?.length).toBe(1);

    wrapper.unmount();
  });

  it('外部点击自动收起菜单', async () => {
    const outside = document.createElement('div');
    document.body.appendChild(outside);

    const wrapper = mount(MatFabMenu, {
      attachTo: document.body,
      props: {
        modelValue: true,
        icon: 'add',
        label: '新建',
      },
    });

    outside.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    await nextTick();

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]);
    expect(wrapper.emitted('close')?.length).toBe(1);

    wrapper.unmount();
    outside.remove();
  });

  it('在 MatAppRoot 下固定进入 floatingLayer 并对齐于右下角', async () => {
    const wrapper = mount(MatAppRoot, {
      attachTo: document.body,
      slots: {
        default: () => [
          h(MatFabMenu, {
            icon: 'add',
            label: '悬浮菜单',
          }),
        ],
      },
    });

    await nextTick();
    await nextTick();

    const floatingLayer = wrapper.element.querySelector('.mat-app-root__floating-layer');
    const fabMenu = wrapper.element.querySelector('.mat-fab-menu');

    expect(floatingLayer).not.toBeNull();
    expect(floatingLayer.contains(fabMenu)).toBe(true);
    expect(fabMenu.classList.contains('mat-fab-menu--app-root')).toBe(true);

    wrapper.unmount();
  });

  it('支持自定义 trigger slot', async () => {
    const wrapper = mount(MatFabMenu, {
      props: {
        icon: 'add',
        label: '新建',
      },
      slots: {
        trigger: ({ open, toggle }) => h('button', {
          class: 'custom-trigger',
          onClick: toggle,
        }, open ? '已展开' : '已折叠'),
      },
    });

    const customBtn = wrapper.find('.custom-trigger');
    expect(customBtn.text()).toBe('已折叠');

    await customBtn.trigger('click');
    expect(customBtn.text()).toBe('已展开');
    expect(wrapper.emitted('open')?.length).toBe(1);
  });
});

