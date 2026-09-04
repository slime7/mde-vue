import { flushPromises, mount } from '@vue/test-utils';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import {
  h, KeepAlive, nextTick, ref,
} from 'vue';
import MatHover from '../src/components/mat-hover/MatHover.vue';
import MatTooltip from '../src/components/mat-tooltip/MatTooltip.vue';
import { createMatUi } from '../src/plugin';

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

/**
 * @returns {void}
 */
function useKeyboardInput() {
  window.dispatchEvent(new KeyboardEvent('keydown'));
}

/**
 * @returns {void}
 */
function usePointerInput() {
  window.dispatchEvent(new MouseEvent('pointerdown'));
}

describe('MatTooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    Reflect.deleteProperty(Element.prototype, 'getAnimations');
    vi.useRealTimers();
  });

  it('非受控 hover 通过 MatHover 观察目标元素', async () => {
    const target = createTarget('hover-component-target');
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        content: 'Hover 组件触发',
        target,
      },
    });

    await settleRender();

    expect(wrapper.findComponent(MatHover).exists()).toBe(true);

    await hover(target);

    expect(document.body.querySelector('[role="tooltip"]')?.textContent).toContain('Hover 组件触发');

    wrapper.unmount();
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

  it('Rich tooltip 使用 subhead 与 content prop，并渲染可交互的 action Slot', async () => {
    const target = createTarget('rich-props-target');
    const onAction = vi.fn();
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        content: '这是较长的补充说明。',
        subhead: '新功能',
        target,
      },
      slots: {
        action: () => h('button', {
          onClick: onAction,
          type: 'button',
        }, '了解详情'),
      },
    });

    await hover(target);

    const tooltip = document.body.querySelector('[role="tooltip"]');
    const action = tooltip?.querySelector('button');

    expect(tooltip?.textContent).toContain('新功能');
    expect(tooltip?.textContent).toContain('这是较长的补充说明。');
    expect(action?.textContent).toBe('了解详情');

    action?.click();
    expect(onAction).toHaveBeenCalledOnce();

    wrapper.unmount();
  });

  it('Rich tooltip 的 prop 优先于同名 Slot，省略 prop 时使用 Slot', async () => {
    const target = createTarget('rich-slot-priority-target');
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        content: 'content prop',
        subhead: 'subhead prop',
        target,
      },
      slots: {
        default: () => 'content Slot',
        subhead: () => 'subhead Slot',
      },
    });

    await hover(target);

    const tooltip = document.body.querySelector('[role="tooltip"]');

    expect(tooltip?.textContent).toContain('content prop');
    expect(tooltip?.textContent).toContain('subhead prop');
    expect(tooltip?.textContent).not.toContain('content Slot');
    expect(tooltip?.textContent).not.toContain('subhead Slot');

    wrapper.unmount();

    const slotTarget = createTarget('rich-slot-fallback-target');
    const slotWrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        target: slotTarget,
      },
      slots: {
        default: () => 'content Slot',
        subhead: () => 'subhead Slot',
      },
    });

    await hover(slotTarget);

    const slotTooltip = document.body.querySelector('[role="tooltip"]');

    expect(slotTooltip?.textContent).toContain('content Slot');
    expect(slotTooltip?.textContent).toContain('subhead Slot');

    slotWrapper.unmount();
  });

  it('rich 属性允许只有 supporting content 的 Rich tooltip', async () => {
    const target = createTarget('rich-content-only-target');
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        content: '没有 subhead 或 action 的详细说明。',
        rich: true,
        target,
      },
    });

    await hover(target);

    expect(document.body.querySelector('[role="tooltip"]')?.textContent)
      .toContain('没有 subhead 或 action 的详细说明。');

    wrapper.unmount();
  });

  it('指针和焦点移入 Rich tooltip 时维持自动展示', async () => {
    const target = createTarget('rich-interaction-target');
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        closeDelay: 100,
        content: '可以操作的详细说明。',
        rich: true,
        target,
      },
      slots: {
        action: () => h('button', { type: 'button' }, '操作'),
      },
    });

    await hover(target);

    const tooltip = document.body.querySelector('[role="tooltip"]');
    const action = tooltip?.querySelector('button');

    target.dispatchEvent(new MouseEvent('mouseleave'));
    tooltip?.dispatchEvent(new MouseEvent('mouseenter'));
    await vi.advanceTimersByTimeAsync(100);
    expect(document.body.querySelector('[role="tooltip"]')).not.toBeNull();

    tooltip?.dispatchEvent(new MouseEvent('mouseleave'));
    action?.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    await vi.advanceTimersByTimeAsync(100);
    expect(document.body.querySelector('[role="tooltip"]')).not.toBeNull();

    action?.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
    await vi.advanceTimersByTimeAsync(100);
    await vi.advanceTimersByTimeAsync(150);
    await settleRender();
    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();

    wrapper.unmount();
  });

  it('选择器目标稍后挂载时不在初次挂载阶段误报，并可正常展示', async () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        content: '延迟目标',
        target: '#late-tooltip-target',
      },
    });
    const target = createTarget('late-tooltip-target');

    expect(warning).not.toHaveBeenCalledWith(
      'MatTooltip: target 必须指向当前 document 中存在的 HTMLElement',
    );

    await settleRender();
    await hover(target);

    expect(warning).not.toHaveBeenCalledWith(
      'MatTooltip: target 必须指向当前 document 中存在的 HTMLElement',
    );
    expect(document.body.querySelector('[role="tooltip"]')).not.toBeNull();

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

  it('在 openDelay 后打开，离开目标前取消打开，并在 600ms 后关闭', async () => {
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
    await vi.advanceTimersByTimeAsync(599);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).not.toBeNull();

    await vi.advanceTimersByTimeAsync(1);
    await settleRender();

    await vi.advanceTimersByTimeAsync(150);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();

    wrapper.unmount();
  });

  it('未显式设置 openDelay 时使用插件 Tooltip 打开延迟', async () => {
    const target = createTarget('plugin-delay-target');
    const plugin = createMatUi({ defaults: { tooltip: { openDelay: 600 } } });
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      global: { plugins: [plugin] },
      props: {
        content: '插件延迟',
        target,
      },
    });

    target.dispatchEvent(new MouseEvent('mouseenter'));
    await vi.advanceTimersByTimeAsync(599);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();

    await vi.advanceTimersByTimeAsync(1);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')?.textContent).toContain('插件延迟');

    wrapper.unmount();
    plugin.theme.dispose();
  });

  it('显式 openDelay 优先于插件 Tooltip 打开延迟', async () => {
    const target = createTarget('explicit-delay-target');
    const plugin = createMatUi({ defaults: { tooltip: { openDelay: 600 } } });
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      global: { plugins: [plugin] },
      props: {
        content: '显式延迟',
        openDelay: 100,
        target,
      },
    });

    target.dispatchEvent(new MouseEvent('mouseenter'));
    await vi.advanceTimersByTimeAsync(100);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')?.textContent).toContain('显式延迟');

    wrapper.unmount();
    plugin.theme.dispose();
  });

  it('Tooltip 显示中切换到另一个目标时立即打开', async () => {
    const targets = ['switch-first', 'switch-second'].map(createTarget);
    const plugin = createMatUi({ defaults: { tooltip: { openDelay: 600 } } });
    const first = mount(MatTooltip, {
      attachTo: document.body,
      global: { plugins: [plugin] },
      props: { content: '切换第一个', target: targets[0] },
    });
    const second = mount(MatTooltip, {
      attachTo: document.body,
      global: { plugins: [plugin] },
      props: { content: '切换第二个', target: targets[1] },
    });

    targets[0].dispatchEvent(new MouseEvent('mouseenter'));
    await vi.advanceTimersByTimeAsync(600);
    await settleRender();
    targets[0].dispatchEvent(new MouseEvent('mouseleave'));
    targets[1].dispatchEvent(new MouseEvent('mouseenter'));
    await settleRender();

    expect([...document.body.querySelectorAll('[role="tooltip"]')]
      .some((tooltip) => tooltip.textContent.includes('切换第二个'))).toBe(true);

    first.unmount();
    second.unmount();
    plugin.theme.dispose();
  });

  it('键盘焦点在 Tooltip 之间切换时立即显示', async () => {
    const targets = ['focus-first', 'focus-second'].map(createTarget);
    const plugin = createMatUi({ defaults: { tooltip: { openDelay: 600 } } });
    const first = mount(MatTooltip, {
      attachTo: document.body,
      global: { plugins: [plugin] },
      props: { content: '焦点第一个', target: targets[0] },
    });
    const second = mount(MatTooltip, {
      attachTo: document.body,
      global: { plugins: [plugin] },
      props: { content: '焦点第二个', target: targets[1] },
    });

    useKeyboardInput();
    targets[0].dispatchEvent(new FocusEvent('focusin'));
    await vi.advanceTimersByTimeAsync(600);
    await settleRender();
    targets[0].dispatchEvent(new FocusEvent('focusout', { relatedTarget: targets[1] }));
    targets[1].dispatchEvent(new FocusEvent('focusin', { relatedTarget: targets[0] }));
    await settleRender();

    expect([...document.body.querySelectorAll('[role="tooltip"]')]
      .some((tooltip) => tooltip.textContent.includes('焦点第二个'))).toBe(true);

    first.unmount();
    second.unmount();
    plugin.theme.dispose();
  });

  it('鼠标点击获得的焦点不显示 Tooltip，悬停仍显示且移开按 closeDelay 关闭', async () => {
    const target = createTarget('pointer-focus-target');
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        closeDelay: 300,
        content: '指针焦点提示',
        target,
      },
    });

    usePointerInput();
    target.dispatchEvent(new FocusEvent('focusin'));
    await vi.advanceTimersByTimeAsync(0);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();

    await hover(target);

    expect(document.body.querySelector('[role="tooltip"]')?.textContent).toContain('指针焦点提示');

    target.dispatchEvent(new MouseEvent('mouseleave'));
    await vi.advanceTimersByTimeAsync(300);
    await settleRender();
    await vi.advanceTimersByTimeAsync(150);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();

    wrapper.unmount();
  });

  it('键盘聚焦显示 Tooltip 且 openDelay 生效', async () => {
    const target = createTarget('keyboard-focus-target');
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        content: '键盘焦点提示',
        openDelay: 300,
        target,
      },
    });

    useKeyboardInput();
    target.dispatchEvent(new FocusEvent('focusin'));
    await vi.advanceTimersByTimeAsync(299);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();

    await vi.advanceTimersByTimeAsync(1);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')?.textContent).toContain('键盘焦点提示');

    wrapper.unmount();
  });

  it('kebab-case 属性不被插件默认延迟覆盖', async () => {
    const target = createTarget('kebab-delay-target');
    const wrapper = mount({
      render: () => h(MatTooltip, {
        'close-delay': '400',
        content: 'kebab 属性',
        'open-delay': '300',
        target,
      }),
    });

    await hover(target);

    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();

    await vi.advanceTimersByTimeAsync(300);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')?.textContent).toContain('kebab 属性');

    target.dispatchEvent(new MouseEvent('mouseleave'));
    await settleRender();
    await vi.advanceTimersByTimeAsync(550);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();

    wrapper.unmount();
  });

  it('连续切换多个 Tooltip 时保持立即显示', async () => {
    const targets = ['chain-first', 'chain-second', 'chain-third'].map(createTarget);
    const plugin = createMatUi({ defaults: { tooltip: { openDelay: 600 } } });
    const wrappers = ['链第一个', '链第二个', '链第三个'].map((content, index) => mount(MatTooltip, {
      attachTo: document.body,
      global: { plugins: [plugin] },
      props: { content, target: targets[index] },
    }));

    targets[0].dispatchEvent(new MouseEvent('mouseenter'));
    await vi.advanceTimersByTimeAsync(600);
    await settleRender();
    targets[0].dispatchEvent(new MouseEvent('mouseleave'));
    targets[1].dispatchEvent(new MouseEvent('mouseenter'));
    await settleRender();
    targets[1].dispatchEvent(new MouseEvent('mouseleave'));
    targets[2].dispatchEvent(new MouseEvent('mouseenter'));
    await settleRender();

    expect([...document.body.querySelectorAll('[role="tooltip"]')]
      .some((tooltip) => tooltip.textContent.includes('链第三个'))).toBe(true);

    wrappers.forEach((wrapper) => wrapper.unmount());
    plugin.theme.dispose();
  });

  it('Tooltip 显示中进入 3000ms 延迟目标时立即显示', async () => {
    const targets = ['slow-first', 'slow-second'].map(createTarget);
    const plugin = createMatUi({ defaults: { tooltip: { openDelay: 600 } } });
    const first = mount(MatTooltip, {
      attachTo: document.body,
      global: { plugins: [plugin] },
      props: { content: '慢第一个', target: targets[0] },
    });
    const second = mount(MatTooltip, {
      attachTo: document.body,
      global: { plugins: [plugin] },
      props: { content: '慢第二个', openDelay: 3000, target: targets[1] },
    });

    targets[0].dispatchEvent(new MouseEvent('mouseenter'));
    await vi.advanceTimersByTimeAsync(600);
    await settleRender();
    targets[0].dispatchEvent(new MouseEvent('mouseleave'));
    targets[1].dispatchEvent(new MouseEvent('mouseenter'));
    await settleRender();

    expect([...document.body.querySelectorAll('[role="tooltip"]')]
      .some((tooltip) => tooltip.textContent.includes('慢第二个'))).toBe(true);

    first.unmount();
    second.unmount();
    plugin.theme.dispose();
  });

  it('首个 Tooltip 未显示或关闭后保留完整延迟', async () => {
    const targets = ['delay-first', 'delay-second', 'delay-third'].map(createTarget);
    const plugin = createMatUi({ defaults: { tooltip: { openDelay: 600 } } });
    const wrappers = ['延迟第一个', '延迟第二个', '延迟第三个'].map((content, index) => mount(MatTooltip, {
      attachTo: document.body,
      global: { plugins: [plugin] },
      props: { content, target: targets[index] },
    }));

    targets[0].dispatchEvent(new MouseEvent('mouseenter'));
    await vi.advanceTimersByTimeAsync(300);
    targets[0].dispatchEvent(new MouseEvent('mouseleave'));
    targets[1].dispatchEvent(new MouseEvent('mouseenter'));
    await vi.advanceTimersByTimeAsync(599);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();

    await vi.advanceTimersByTimeAsync(1);
    await settleRender();

    expect([...document.body.querySelectorAll('[role="tooltip"]')]
      .some((tooltip) => tooltip.textContent.includes('延迟第二个'))).toBe(true);

    targets[1].dispatchEvent(new MouseEvent('mouseleave'));
    await vi.advanceTimersByTimeAsync(750);
    await settleRender();
    targets[2].dispatchEvent(new MouseEvent('mouseenter'));
    await vi.advanceTimersByTimeAsync(599);
    await settleRender();

    expect([...document.body.querySelectorAll('[role="tooltip"]')]
      .some((tooltip) => tooltip.textContent.includes('延迟第三个'))).toBe(false);

    await vi.advanceTimersByTimeAsync(1);
    await settleRender();

    expect([...document.body.querySelectorAll('[role="tooltip"]')]
      .some((tooltip) => tooltip.textContent.includes('延迟第三个'))).toBe(true);

    wrappers.forEach((wrapper) => wrapper.unmount());
    plugin.theme.dispose();
  });

  it('同一 Tooltip 关闭后重新进入时仍等待完整延迟', async () => {
    const target = createTarget('same-tooltip-target');
    const plugin = createMatUi({ defaults: { tooltip: { openDelay: 600 } } });
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      global: { plugins: [plugin] },
      props: { content: '同一实例', target },
    });

    target.dispatchEvent(new MouseEvent('mouseenter'));
    await vi.advanceTimersByTimeAsync(600);
    await settleRender();
    target.dispatchEvent(new MouseEvent('mouseleave'));
    target.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await vi.advanceTimersByTimeAsync(150);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();

    target.dispatchEvent(new MouseEvent('mouseenter'));
    await vi.advanceTimersByTimeAsync(599);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();

    await vi.advanceTimersByTimeAsync(1);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')?.textContent).toContain('同一实例');

    wrapper.unmount();
    plugin.theme.dispose();
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

  it('显式 closeDelay 时按配置的延迟关闭', async () => {
    const target = createTarget('close-delay-target');
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        closeDelay: 300,
        content: '自定义关闭延迟',
        target,
      },
    });

    await hover(target);
    expect(document.body.querySelector('[role="tooltip"]')).not.toBeNull();

    target.dispatchEvent(new MouseEvent('mouseleave'));
    await vi.advanceTimersByTimeAsync(299);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).not.toBeNull();

    await vi.advanceTimersByTimeAsync(1);
    await settleRender();
    await vi.advanceTimersByTimeAsync(150);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();

    wrapper.unmount();
  });

  it('未显式设置 closeDelay 时使用插件 Tooltip 关闭延迟', async () => {
    const target = createTarget('plugin-close-delay-target');
    const plugin = createMatUi({ defaults: { tooltip: { closeDelay: 400 } } });
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      global: { plugins: [plugin] },
      props: {
        content: '插件关闭延迟',
        target,
      },
    });

    await hover(target);

    target.dispatchEvent(new MouseEvent('mouseleave'));
    await vi.advanceTimersByTimeAsync(399);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).not.toBeNull();

    await vi.advanceTimersByTimeAsync(1);
    await settleRender();
    await vi.advanceTimersByTimeAsync(150);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();

    wrapper.unmount();
    plugin.theme.dispose();
  });

  it('显式 closeDelay 优先于插件 Tooltip 关闭延迟', async () => {
    const target = createTarget('explicit-close-delay-target');
    const plugin = createMatUi({ defaults: { tooltip: { closeDelay: 600 } } });
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      global: { plugins: [plugin] },
      props: {
        closeDelay: 200,
        content: '显式关闭延迟',
        target,
      },
    });

    await hover(target);

    target.dispatchEvent(new MouseEvent('mouseleave'));
    await vi.advanceTimersByTimeAsync(199);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).not.toBeNull();

    await vi.advanceTimersByTimeAsync(1);
    await settleRender();
    await vi.advanceTimersByTimeAsync(150);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();

    wrapper.unmount();
    plugin.theme.dispose();
  });

  it('将模板中的静态数字 close-delay 解析为毫秒延迟', async () => {
    const target = createTarget('static-close-delay-target');
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        closeDelay: '300',
        content: '静态关闭延迟',
        target,
      },
    });

    await hover(target);

    target.dispatchEvent(new MouseEvent('mouseleave'));
    await vi.advanceTimersByTimeAsync(299);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).not.toBeNull();

    await vi.advanceTimersByTimeAsync(1);
    await settleRender();
    await vi.advanceTimersByTimeAsync(150);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();
    expect(MatTooltip.props.closeDelay.validator('300')).toBe(true);
    expect(MatTooltip.props.closeDelay.validator('not-a-delay')).toBe(false);
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

    await vi.advanceTimersByTimeAsync(149);
    expect(document.body.querySelector('[role="tooltip"]')).not.toBeNull();

    await vi.advanceTimersByTimeAsync(1);
    await settleRender();
    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();

    wrapper.unmount();
  });

  it('关闭阶段渲染刷新前保留 Tooltip 节点，实际动画结束后再移除', async () => {
    let finishCloseAnimation;
    const closeFinished = new Promise((resolve) => {
      finishCloseAnimation = resolve;
    });
    const target = createTarget('animation-tooltip-target');

    Object.defineProperty(Element.prototype, 'getAnimations', {
      configurable: true,
      value() {
        if (!this.classList.contains('mat-tooltip--closing')) {
          return [];
        }

        return [{
          finished: closeFinished,
          playState: 'running',
        }];
      },
    });

    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        content: '动画提示',
        modelValue: true,
        target,
      },
    });

    await settleRender();
    const element = document.body.querySelector('[role="tooltip"]');

    await wrapper.setProps({ modelValue: false });
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).toBe(element);

    finishCloseAnimation();
    await flushPromises();
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
    expect(tooltips.find((tooltip) => tooltip.textContent.includes('第一个'))).not.toBeNull();
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

  it('target 元素被移除后 tooltip 立即关闭', async () => {
    const target = createTarget('removed-target');
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      props: {
        content: '目标会被移除',
        target,
      },
    });

    await hover(target);

    expect(document.body.querySelector('[role="tooltip"]')).not.toBeNull();

    target.remove();
    await settleRender();
    await vi.advanceTimersByTimeAsync(20);

    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();

    wrapper.unmount();
  });

  it('缓存页面停用时关闭 Tooltip，并在重新激活后恢复受控展示', async () => {
    const activePage = ref('tooltip');
    const wrapper = mount({
      setup() {
        return () => h(KeepAlive, null, {
          default: () => (activePage.value === 'tooltip'
            ? h(MatTooltip, {
              content: '缓存页面提示',
              modelValue: true,
            }, {
              activator: () => h('button', { type: 'button' }, '缓存页面展示元素'),
            })
            : h(MatHover)),
        });
      },
    }, { attachTo: document.body });

    await settleRender();
    expect(document.body.querySelector('[role="tooltip"]')?.textContent)
      .toContain('缓存页面提示');

    activePage.value = 'empty';
    await settleRender();
    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();

    activePage.value = 'tooltip';
    await settleRender();
    expect(document.body.querySelector('[role="tooltip"]')?.textContent)
      .toContain('缓存页面提示');

    wrapper.unmount();
  });

  it('挂载至具有偏移量的顶层容器时正确补偿坐标', async () => {
    const container = document.createElement('div');
    container.id = 'offset-container';
    container.setAttribute('popover', 'manual');
    container.getBoundingClientRect = () => ({
      left: 100,
      top: 200,
      right: 300,
      bottom: 400,
      width: 200,
      height: 200,
    });
    document.body.append(container);

    const wrapper = mount(MatTooltip, {
      attachTo: container,
      props: {
        attach: '#offset-container',
        content: '补偿提示',
        modelValue: true,
      },
      slots: {
        activator: () => h('button', { type: 'button' }, '触发器'),
      },
    });

    await settleRender();
    const tooltip = container.querySelector('[role="tooltip"]');

    expect(tooltip).not.toBeNull();
    const left = Number.parseFloat(tooltip.style.left);
    const top = Number.parseFloat(tooltip.style.top);

    expect(Number.isFinite(left)).toBe(true);
    expect(Number.isFinite(top)).toBe(true);
    wrapper.unmount();
    container.remove();
  });
});
