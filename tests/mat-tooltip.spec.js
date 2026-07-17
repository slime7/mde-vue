import { mount } from '@vue/test-utils';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { h, nextTick } from 'vue';
import MatTooltip from '../src/components/mat-tooltip/MatTooltip.vue';

async function settleRender() {
  await nextTick();
  await nextTick();
}

/**
 * @param {string} id
 * @returns {HTMLButtonElement}
 */
function createTarget(id) {
  const target = document.createElement('button');

  target.id = id;
  target.type = 'button';
  target.textContent = '展示元素';
  document.body.append(target);
  return target;
}

/**
 * @param {HTMLElement} target
 * @returns {Promise<void>}
 */
async function hover(target) {
  target.dispatchEvent(new MouseEvent('mouseenter'));
  await settleRender();
  await vi.advanceTimersByTimeAsync(0);
  await settleRender();
}

describe('MatTooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('content prop 优先于默认 Slot，并在 hover 后展示 Plain tooltip', async () => {
    const target = createTarget('content-target');
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        content: '属性内容',
        target,
      },
      slots: {
        default: () => 'Slot 内容',
      },
    });

    await hover(target);

    const tooltip = document.body.querySelector('[role="tooltip"]');

    expect(tooltip).not.toBeNull();
    expect(tooltip.textContent).toContain('属性内容');
    expect(tooltip.textContent).not.toContain('Slot 内容');

    wrapper.unmount();
  });

  it('未设置 content 时使用默认 Slot 作为提示内容', async () => {
    const target = createTarget('default-slot-target');
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        target: '#default-slot-target',
      },
      slots: {
        default: () => '默认 Slot 内容',
      },
    });

    await hover(target);

    expect(document.body.querySelector('[role="tooltip"]')?.textContent).toContain('默认 Slot 内容');

    wrapper.unmount();
  });

  it('activator Slot 优先于 target prop', async () => {
    const externalTarget = createTarget('external-target');
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        content: 'Slot 优先',
        target: externalTarget,
      },
      slots: {
        activator: () => h('button', { id: 'slot-target', type: 'button' }, 'Slot 锚点'),
      },
    });

    await settleRender();
    await hover(wrapper.get('#slot-target').element);

    expect(document.body.querySelector('[role="tooltip"]')?.textContent).toContain('Slot 优先');

    wrapper.unmount();
  });

  it('activator Slot 渲染多个元素根节点时警告并不展示', async () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        content: '无效 Slot',
        modelValue: true,
      },
      slots: {
        activator: () => [
          h('button', { type: 'button' }, '第一个'),
          h('button', { type: 'button' }, '第二个'),
        ],
      },
    });

    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
    expect(warning).toHaveBeenCalledWith(
      'MatTooltip: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点',
    );

    wrapper.unmount();
  });

  it('将 Tooltip Teleport 到 attach 指定的元素', async () => {
    const target = createTarget('attach-target');
    const attach = document.createElement('section');

    attach.id = 'tooltip-attach-target';
    document.body.append(attach);
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        attach: '#tooltip-attach-target',
        content: '自定义挂载',
        target,
      },
    });

    await hover(target);

    expect(attach.querySelector('[role="tooltip"]')).not.toBeNull();

    wrapper.unmount();
  });

  it('attach 无效时警告并在受控模式下请求关闭', async () => {
    const target = createTarget('invalid-attach-target');
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        attach: '#missing-tooltip-attach',
        content: '无法挂载',
        modelValue: true,
        target,
      },
    });

    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
    expect(warning).toHaveBeenCalledWith(
      'MatTooltip: attach 必须指向当前 document 中存在的 HTMLElement',
    );

    wrapper.unmount();
  });

  it('缺少 activator Slot 和 target 时警告并在受控模式下请求关闭', async () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        content: '缺少展示元素',
        modelValue: true,
      },
    });

    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
    expect(warning).toHaveBeenCalledWith(
      'MatTooltip: target 必须指向当前 document 中存在的 HTMLElement',
    );

    wrapper.unmount();
  });

  it('展示期间更新 attach 时移动 Teleport 内容', async () => {
    const target = createTarget('changing-attach-target');
    const firstAttach = document.createElement('section');
    const secondAttach = document.createElement('section');

    document.body.append(firstAttach, secondAttach);
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        attach: firstAttach,
        content: '变更挂载目标',
        modelValue: true,
        target,
      },
    });

    await settleRender();
    expect(firstAttach.querySelector('[role="tooltip"]')).not.toBeNull();

    await wrapper.setProps({ attach: secondAttach });
    await settleRender();

    expect(firstAttach.querySelector('[role="tooltip"]')).toBeNull();
    expect(secondAttach.querySelector('[role="tooltip"]')).not.toBeNull();

    wrapper.unmount();
  });

  it('在 openDelay 后打开，离开目标前取消打开，并在 1.5 秒后关闭', async () => {
    const target = createTarget('delay-target');
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        content: '延迟展示',
        openDelay: 300,
        target,
      },
    });

    target.dispatchEvent(new MouseEvent('mouseenter'));
    await vi.advanceTimersByTimeAsync(299);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();

    target.dispatchEvent(new MouseEvent('mouseleave'));
    await vi.advanceTimersByTimeAsync(1);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();

    target.dispatchEvent(new MouseEvent('mouseenter'));
    await vi.advanceTimersByTimeAsync(300);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).not.toBeNull();

    target.dispatchEvent(new MouseEvent('mouseleave'));
    await vi.advanceTimersByTimeAsync(1499);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).not.toBeNull();

    await vi.advanceTimersByTimeAsync(1);
    await settleRender();

    await vi.advanceTimersByTimeAsync(150);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();

    wrapper.unmount();
  });

  it('将模板中的静态数字 open-delay 解析为毫秒延迟', async () => {
    const target = createTarget('static-delay-target');
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        content: '静态延迟',
        openDelay: '300',
        target,
      },
    });

    target.dispatchEvent(new MouseEvent('mouseenter'));
    await vi.advanceTimersByTimeAsync(299);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();

    await vi.advanceTimersByTimeAsync(1);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).not.toBeNull();
    expect(MatTooltip.props.openDelay.validator('300')).toBe(true);
    expect(MatTooltip.props.openDelay.validator('not-a-delay')).toBe(false);
    expect(warning).not.toHaveBeenCalled();

    wrapper.unmount();
  });

  it('显式 v-model 时由使用方控制展示状态，忽略自动关闭', async () => {
    const target = createTarget('controlled-target');
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        content: '受控展示',
        modelValue: true,
        target,
      },
    });

    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).not.toBeNull();

    target.dispatchEvent(new MouseEvent('mouseleave'));
    await vi.advanceTimersByTimeAsync(1500);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).not.toBeNull();

    await wrapper.setProps({ modelValue: false });
    await settleRender();

    const closingTooltip = document.body.querySelector('[role="tooltip"]');

    expect(closingTooltip).not.toBeNull();
    expect(closingTooltip.classList).toContain('mat-tooltip--closing');

    await vi.advanceTimersByTimeAsync(149);
    expect(document.body.querySelector('[role="tooltip"]')).not.toBeNull();

    await vi.advanceTimersByTimeAsync(1);
    await settleRender();
    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();

    wrapper.unmount();
  });

  it('受控模式不会响应 hover 或 openDelay', async () => {
    const target = createTarget('controlled-hover-target');
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        content: '受控模式',
        modelValue: false,
        openDelay: 0,
        target,
      },
    });

    await hover(target);
    await vi.advanceTimersByTimeAsync(2000);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();

    wrapper.unmount();
  });

  it('展示时合并 aria-describedby，Escape 关闭后恢复原值', async () => {
    const target = createTarget('described-target');

    target.setAttribute('aria-describedby', 'existing-description');
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        content: '辅助说明',
        target,
      },
    });

    await hover(target);

    const tooltip = document.body.querySelector('[role="tooltip"]');
    const describedBy = target.getAttribute('aria-describedby');

    expect(describedBy).toContain('existing-description');
    expect(describedBy).toContain(tooltip.id);

    target.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).not.toBeNull();
    expect(target.getAttribute('aria-describedby')).toBe('existing-description');

    await vi.advanceTimersByTimeAsync(150);
    await settleRender();
    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();

    wrapper.unmount();
  });

  it('新 Tooltip 打开时关闭已展示的 Tooltip', async () => {
    const firstTarget = createTarget('first-tooltip-target');
    const secondTarget = createTarget('second-tooltip-target');
    const first = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        content: '第一个',
        target: firstTarget,
      },
    });
    const second = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        content: '第二个',
        target: secondTarget,
      },
    });

    await hover(firstTarget);
    await hover(secondTarget);

    const tooltips = [...document.body.querySelectorAll('[role="tooltip"]')];

    expect(tooltips).toHaveLength(2);
    expect(tooltips.find((tooltip) => tooltip.textContent.includes('第一个'))
      .classList).toContain('mat-tooltip--closing');
    expect(tooltips.find((tooltip) => tooltip.textContent.includes('第二个'))).not.toBeNull();

    first.unmount();
    second.unmount();
  });

  it('新 Tooltip 替代受控旧实例时向旧实例请求关闭', async () => {
    const firstTarget = createTarget('controlled-first-tooltip-target');
    const secondTarget = createTarget('controlled-second-tooltip-target');
    const first = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        content: '受控第一个',
        modelValue: true,
        target: firstTarget,
      },
    });

    await settleRender();

    const second = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        content: '第二个',
        target: secondTarget,
      },
    });

    await hover(secondTarget);

    expect(first.emitted('update:modelValue')).toEqual([[false]]);
    expect([...document.body.querySelectorAll('[role="tooltip"]')]
      .find((tooltip) => tooltip.textContent.includes('第二个'))).not.toBeNull();

    first.unmount();
    second.unmount();
  });

  it('滚动、视口变化和尺寸观察会重新计算固定定位', async () => {
    const observers = [];
    const target = createTarget('positioning-target');
    const targetRect = {
      bottom: 120,
      height: 20,
      left: 100,
      right: 140,
      top: 100,
      width: 40,
    };
    const tooltipRect = {
      bottom: 10,
      height: 10,
      left: 0,
      right: 20,
      top: 0,
      width: 20,
    };

    class MockResizeObserver {
      /**
       * @param {ResizeObserverCallback} callback
       */
      constructor(callback) {
        this.callback = callback;
        this.observed = [];
        observers.push(this);
      }

      /**
       * @param {Element} element
       */
      observe(element) {
        this.observed.push(element);
      }

      disconnect() {
        this.disconnected = true;
      }
    }

    vi.stubGlobal('ResizeObserver', MockResizeObserver);
    vi.spyOn(target, 'getBoundingClientRect').mockImplementation(() => targetRect);
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        content: '定位更新',
        target,
      },
    });

    await hover(target);

    const tooltip = document.body.querySelector('[role="tooltip"]');

    vi.spyOn(tooltip, 'getBoundingClientRect').mockImplementation(() => tooltipRect);
    window.dispatchEvent(new Event('resize'));
    await vi.advanceTimersByTimeAsync(20);
    await settleRender();

    expect(tooltip.style.left).toBe('110px');
    expect(tooltip.style.top).toBe('86px');
    expect(observers).toHaveLength(1);
    expect(observers[0].observed).toEqual(expect.arrayContaining([target, tooltip]));

    targetRect.left = 180;
    targetRect.right = 220;
    observers[0].callback();
    await vi.advanceTimersByTimeAsync(20);
    await settleRender();

    expect(tooltip.style.left).toBe('190px');

    targetRect.top = 160;
    targetRect.bottom = 180;
    document.body.dispatchEvent(new Event('scroll', { bubbles: true }));
    await vi.advanceTimersByTimeAsync(20);
    await settleRender();

    expect(tooltip.style.top).toBe('146px');

    wrapper.unmount();
  });
});
