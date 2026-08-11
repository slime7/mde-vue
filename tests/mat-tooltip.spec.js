import { mount } from '@vue/test-utils';
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
 * @param {string} id
 * @param {string[]} targetIds
 * @returns {{ group: HTMLDivElement, targets: HTMLButtonElement[] }}
 */
function createTooltipGroup(id, targetIds) {
  const group = document.createElement('div');

  group.id = id;
  group.setAttribute('data-mat-tooltip-group', '');
  const targets = targetIds.map((targetId) => {
    const target = document.createElement('button');

    target.id = targetId;
    target.type = 'button';
    target.textContent = targetId;
    group.append(target);
    return target;
  });

  document.body.append(group);
  return { group, targets };
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

  it('未显式设置 openDelay 时使用插件 Tooltip 打开延迟', async () => {
    const target = createTarget('plugin-delay-target');
    const plugin = createMatUi({
      defaults: {
        tooltip: {
          openDelay: 600,
          skipDelayDuration: 600,
        },
      },
    });
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

  it('首个 Tooltip 显示后在有效期内切换同组目标时立即打开', async () => {
    const { targets } = createTooltipGroup('shared-delay-group', ['group-first', 'group-second']);
    const plugin = createMatUi({
      defaults: {
        tooltip: {
          openDelay: 600,
          skipDelayDuration: 600,
        },
      },
    });
    const first = mount(MatTooltip, {
      attachTo: document.body,
      global: { plugins: [plugin] },
      props: { content: '同组第一个', target: targets[0] },
    });
    const second = mount(MatTooltip, {
      attachTo: document.body,
      global: { plugins: [plugin] },
      props: { content: '同组第二个', target: targets[1] },
    });

    targets[0].dispatchEvent(new MouseEvent('mouseenter'));
    await vi.advanceTimersByTimeAsync(600);
    await settleRender();
    targets[0].dispatchEvent(new MouseEvent('mouseleave'));
    targets[1].dispatchEvent(new MouseEvent('mouseenter'));
    await settleRender();

    expect([...document.body.querySelectorAll('[role="tooltip"]')]
      .some((tooltip) => tooltip.textContent.includes('同组第二个'))).toBe(true);

    first.unmount();
    second.unmount();
    plugin.theme.dispose();
  });

  it('键盘焦点在同组 Tooltip 之间切换时复用快速切换窗口', async () => {
    const { targets } = createTooltipGroup('focus-delay-group', ['focus-first', 'focus-second']);
    const plugin = createMatUi({
      defaults: {
        tooltip: {
          openDelay: 600,
          skipDelayDuration: 600,
        },
      },
    });
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

  it('首个 Tooltip 未显示、切换不同组或有效期结束时保留完整延迟', async () => {
    const firstGroup = createTooltipGroup('delay-group-a', ['group-a-first', 'group-a-second']);
    const secondGroup = createTooltipGroup('delay-group-b', ['group-b-first']);
    const plugin = createMatUi({
      defaults: {
        tooltip: {
          openDelay: 600,
          skipDelayDuration: 600,
        },
      },
    });
    const wrappers = [
      ['同组首个', firstGroup.targets[0]],
      ['同组第二个', firstGroup.targets[1]],
      ['不同组', secondGroup.targets[0]],
    ].map(([content, target]) => mount(MatTooltip, {
      attachTo: document.body,
      global: { plugins: [plugin] },
      props: { content, target },
    }));

    firstGroup.targets[0].dispatchEvent(new MouseEvent('mouseenter'));
    await vi.advanceTimersByTimeAsync(300);
    firstGroup.targets[0].dispatchEvent(new MouseEvent('mouseleave'));
    firstGroup.targets[1].dispatchEvent(new MouseEvent('mouseenter'));
    await vi.advanceTimersByTimeAsync(599);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();

    await vi.advanceTimersByTimeAsync(1);
    await settleRender();
    firstGroup.targets[1].dispatchEvent(new MouseEvent('mouseleave'));
    secondGroup.targets[0].dispatchEvent(new MouseEvent('mouseenter'));
    await settleRender();

    expect([...document.body.querySelectorAll('[role="tooltip"]')]
      .some((tooltip) => tooltip.textContent.includes('不同组'))).toBe(false);

    await vi.advanceTimersByTimeAsync(600);
    await settleRender();
    secondGroup.targets[0].dispatchEvent(new MouseEvent('mouseleave'));
    await vi.advanceTimersByTimeAsync(601);
    firstGroup.targets[0].dispatchEvent(new MouseEvent('mouseenter'));
    await vi.advanceTimersByTimeAsync(599);
    await settleRender();

    expect([...document.body.querySelectorAll('[role="tooltip"]')]
      .some((tooltip) => tooltip.textContent.includes('同组首个'))).toBe(false);

    wrappers.forEach((wrapper) => wrapper.unmount());
    plugin.theme.dispose();
  });

  it('同一 Tooltip 在有效期内重新进入时仍等待完整延迟', async () => {
    const { targets } = createTooltipGroup('same-tooltip-group', ['same-tooltip-target']);
    const plugin = createMatUi({
      defaults: {
        tooltip: {
          openDelay: 600,
          skipDelayDuration: 600,
        },
      },
    });
    const wrapper = mount(MatTooltip, {
      attachTo: document.body,
      global: { plugins: [plugin] },
      props: { content: '同一实例', target: targets[0] },
    });

    targets[0].dispatchEvent(new MouseEvent('mouseenter'));
    await vi.advanceTimersByTimeAsync(600);
    await settleRender();
    targets[0].dispatchEvent(new MouseEvent('mouseleave'));
    targets[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await vi.advanceTimersByTimeAsync(150);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();

    targets[0].dispatchEvent(new MouseEvent('mouseenter'));
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
});
