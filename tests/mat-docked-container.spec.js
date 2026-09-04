import { flushPromises, mount } from '@vue/test-utils';
import {
  h,
  nextTick,
} from 'vue';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import MatDockedContainer from '../src/components/mat-docked-container/MatDockedContainer.vue';
import MatAppRoot from '../src/components/mat-app-root/MatAppRoot.vue';
import MAT_UI_KEY from '../src/mat-ui-context';
import { createMatUi } from '../src';
import DockedContainerOpenAnchorExample from '../docs/site/examples/docked-container/DockedContainerOpenAnchorExample.vue';
import DockedContainerActivatorSlotExample from '../docs/site/examples/docked-container/DockedContainerActivatorSlotExample.vue';
import DockedContainerSizeExample from '../docs/site/examples/docked-container/DockedContainerSizeExample.vue';
import DockedContainerTimePickerExample from '../docs/site/examples/docked-container/DockedContainerTimePickerExample.vue';

function dispatchToggle(element, newState) {
  const event = new Event('toggle');

  Object.defineProperty(event, 'newState', { value: newState });
  element.dispatchEvent(event);
}

describe('MatDockedContainer', () => {
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

  afterEach(() => {
    Reflect.deleteProperty(Element.prototype, 'getAnimations');
  });

  it('activator Slot 优先于 anchor prop，并在关闭后恢复触发器焦点', async () => {
    const externalAnchor = document.createElement('button');

    externalAnchor.id = 'external-docked-anchor';
    document.body.append(externalAnchor);
    const wrapper = mount(MatDockedContainer, {
      attachTo: document.body,
      props: {
        modelValue: true,
        anchor: 'external-docked-anchor',
        headline: '测试标题',
      },
      slots: {
        activator: () => h('button', {
          id: 'slot-docked-activator',
          type: 'button',
        }, '打开浮动容器'),
        default: () => h('div', { id: 'docked-content' }, '容器内容'),
      },
    });

    await nextTick();
    const activator = wrapper.get('#slot-docked-activator').element;
    expect(activator).toBeDefined();

    await wrapper.setProps({ modelValue: false });
    await nextTick();

    expect(document.activeElement).toBe(activator);
    wrapper.unmount();
    externalAnchor.remove();
  });

  it('支持坐标锚点并正确应用坐标定位样式', async () => {
    const wrapper = mount(MatDockedContainer, {
      attachTo: document.body,
      props: {
        modelValue: true,
        anchor: [120, 240],
      },
      slots: {
        default: () => h('div', '坐标内容'),
      },
    });

    await nextTick();
    const container = wrapper.get('.mat-docked-container');

    expect(container.element.style.left).toBe('120px');
    expect(container.element.style.top).toBe('240px');
    wrapper.unmount();
  });

  it('headline prop 与 headline Slot 渲染及优先级', async () => {
    const wrapper = mount(MatDockedContainer, {
      attachTo: document.body,
      props: {
        modelValue: true,
        anchor: [0, 0],
        headline: '快捷属性标题',
      },
      slots: {
        headline: () => '插槽标题',
        default: () => '正文',
      },
    });

    await nextTick();
    const headlineEl = wrapper.get('.mat-docked-container__headline');
    expect(headlineEl.text()).toBe('插槽标题');

    const wrapperProp = mount(MatDockedContainer, {
      attachTo: document.body,
      props: {
        modelValue: true,
        anchor: [0, 0],
        headline: '快捷属性标题',
      },
    });

    await nextTick();
    expect(wrapperProp.get('.mat-docked-container__headline').text()).toBe('快捷属性标题');

    wrapper.unmount();
    wrapperProp.unmount();
  });

  it('正确渲染 actions 插槽', async () => {
    const wrapper = mount(MatDockedContainer, {
      attachTo: document.body,
      props: {
        modelValue: true,
        anchor: [0, 0],
      },
      slots: {
        default: () => '正文内容',
        actions: () => h('button', { id: 'action-confirm' }, '确定'),
      },
    });

    await nextTick();
    expect(wrapper.find('#action-confirm').exists()).toBe(true);
    wrapper.unmount();
  });

  it('size 预设与显式 width 的样式应用', async () => {
    const wrapperSmall = mount(MatDockedContainer, {
      attachTo: document.body,
      props: {
        modelValue: true,
        anchor: [0, 0],
        size: 'small',
      },
    });
    await nextTick();
    expect(wrapperSmall.get('.mat-docked-container').attributes('style')).toContain('280px');

    const wrapperMedium = mount(MatDockedContainer, {
      attachTo: document.body,
      props: {
        modelValue: true,
        anchor: [0, 0],
        size: 'medium',
      },
    });
    await nextTick();
    expect(wrapperMedium.get('.mat-docked-container').attributes('style')).toContain('328px');

    const wrapperLarge = mount(MatDockedContainer, {
      attachTo: document.body,
      props: {
        modelValue: true,
        anchor: [0, 0],
        size: 'large',
      },
    });
    await nextTick();
    expect(wrapperLarge.get('.mat-docked-container').attributes('style')).toContain('560px');

    const wrapperCustom = mount(MatDockedContainer, {
      attachTo: document.body,
      props: {
        modelValue: true,
        anchor: [0, 0],
        size: 'small',
        width: '450px',
      },
    });
    await nextTick();
    expect(wrapperCustom.get('.mat-docked-container').attributes('style')).toContain('450px');

    wrapperSmall.unmount();
    wrapperMedium.unmount();
    wrapperLarge.unmount();
    wrapperCustom.unmount();
  });

  it('点击遮罩帷幕发出 update:modelValue: false', async () => {
    const wrapper = mount(MatDockedContainer, {
      attachTo: document.body,
      props: {
        modelValue: true,
        anchor: [0, 0],
        scrim: true,
      },
    });

    await nextTick();
    const scrim = wrapper.get('.mat-docked-container__scrim');
    await scrim.trigger('pointerdown');

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]);
    wrapper.unmount();
  });

  it('按下 Escape 键发出 update:modelValue: false', async () => {
    const wrapper = mount(MatDockedContainer, {
      attachTo: document.body,
      props: {
        modelValue: true,
        anchor: [0, 0],
      },
    });

    await nextTick();
    const container = wrapper.get('.mat-docked-container');
    await container.trigger('keydown', { key: 'Escape' });

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]);
    wrapper.unmount();
  });

  it('触发 opened 与 closed 生命周期事件', async () => {
    vi.useFakeTimers();
    const wrapper = mount(MatDockedContainer, {
      attachTo: document.body,
      props: {
        modelValue: false,
        anchor: [0, 0],
      },
    });

    await wrapper.setProps({ modelValue: true });
    await nextTick();
    await vi.advanceTimersByTimeAsync(150);
    expect(wrapper.emitted('opened')).toBeTruthy();

    await wrapper.setProps({ modelValue: false });
    await nextTick();
    await vi.advanceTimersByTimeAsync(200);
    expect(wrapper.emitted('closed')).toBeTruthy();
    wrapper.unmount();
    vi.useRealTimers();
  });

  it('关闭阶段渲染刷新前保留 Popover，实际动画结束后再隐藏', async () => {
    let finishCloseAnimation;
    const closeFinished = new Promise((resolve) => {
      finishCloseAnimation = resolve;
    });

    Object.defineProperty(Element.prototype, 'getAnimations', {
      configurable: true,
      value() {
        if (!this.classList.contains('mat-docked-container--closing')) {
          return [];
        }

        return [{
          finished: closeFinished,
          playState: 'running',
        }];
      },
    });

    const wrapper = mount(MatDockedContainer, {
      attachTo: document.body,
      props: {
        anchor: [0, 0],
        modelValue: true,
      },
      slots: { default: () => '容器内容' },
    });

    await nextTick();
    const container = wrapper.get('.mat-docked-container').element;

    await wrapper.setProps({ modelValue: false });
    await nextTick();

    expect(container.dataset.popoverOpen).toBe('');

    finishCloseAnimation();
    await flushPromises();
    await nextTick();

    expect(container.dataset.popoverOpen).toBeUndefined();
    expect(wrapper.emitted('closed')).toHaveLength(1);
    wrapper.unmount();
  });

  it('嵌套在 MatAppRoot 内时将遮罩限制在应用矩形中', async () => {
    const root = document.createElement('div');
    document.body.append(root);
    const wrapper = mount(MatAppRoot, {
      attachTo: root,
      slots: {
        default: () => h(MatDockedContainer, {
          modelValue: true,
          anchor: [0, 0],
        }),
      },
    });

    await nextTick();
    const scrim = wrapper.get('.mat-docked-container__scrim');

    expect(scrim.element.style.width).toBeDefined();
    expect(scrim.element.style.height).toBeDefined();
    wrapper.unmount();
    root.remove();
  });

  it('读取 createMatUi defaults 配置', async () => {
    const wrapper = mount(MatDockedContainer, {
      attachTo: document.body,
      global: {
        provide: {
          [MAT_UI_KEY]: {
            defaults: {
              dockedContainer: {
                size: 'large',
                headline: '默认标题',
              },
            },
          },
        },
      },
      props: {
        modelValue: true,
        anchor: [0, 0],
      },
    });

    await nextTick();
    expect(wrapper.get('.mat-docked-container__headline').text()).toBe('默认标题');
    expect(wrapper.get('.mat-docked-container').attributes('style')).toContain('560px');
    wrapper.unmount();
  });

  it('示例 DockedContainerOpenAnchorExample 正常打开与关闭', async () => {
    const wrapper = mount(DockedContainerOpenAnchorExample, {
      attachTo: document.body,
      global: { plugins: [createMatUi()] },
    });
    await nextTick();
    const trigger = wrapper.get('#docked-anchor-trigger');
    await trigger.trigger('click');
    await nextTick();
    expect(wrapper.find('.mat-docked-container').exists()).toBe(true);
    wrapper.unmount();
  });

  it('示例 DockedContainerActivatorSlotExample 正常打开与关闭', async () => {
    const wrapper = mount(DockedContainerActivatorSlotExample, {
      attachTo: document.body,
      global: { plugins: [createMatUi()] },
    });
    await nextTick();
    const trigger = wrapper.get('button');
    await trigger.trigger('click');
    await nextTick();
    expect(wrapper.find('.mat-docked-container').exists()).toBe(true);
    wrapper.unmount();
  });

  it('示例 DockedContainerSizeExample 各尺寸按钮正常触发打开', async () => {
    const wrapper = mount(DockedContainerSizeExample, {
      attachTo: document.body,
      global: { plugins: [createMatUi()] },
    });
    await nextTick();
    const buttons = wrapper.findAll('button');
    await buttons[0].trigger('click');
    await nextTick();
    expect(wrapper.find('.mat-docked-container').exists()).toBe(true);
    wrapper.unmount();
  });

  it('示例 DockedContainerTimePickerExample 时间选择器正常打开与关闭', async () => {
    const wrapper = mount(DockedContainerTimePickerExample, {
      attachTo: document.body,
      global: { plugins: [createMatUi()] },
    });
    await nextTick();
    const trigger = wrapper.get('button');
    await trigger.trigger('click');
    await nextTick();
    expect(wrapper.find('.mat-docked-container').exists()).toBe(true);
    wrapper.unmount();
  });
});
