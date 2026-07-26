import { mount } from '@vue/test-utils';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { h } from 'vue';
import MatHover from '../src/components/mat-hover/MatHover.vue';

async function settleTimers() {
  await vi.runOnlyPendingTimersAsync();
}

function mountTarget(props = {}, options = {}) {
  return mount(MatHover, {
    props,
    slots: {
      default: ({ isHovering, props: targetProps }) => h(
        'button',
        {
          ...targetProps,
          'data-hovering': String(isHovering),
        },
        '目标',
      ),
    },
    ...options,
  });
}

describe('MatHover', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('通过作用域 Slot 提供事件 props，且不渲染包装元素', async () => {
    const wrapper = mountTarget();
    const target = wrapper.find('button');

    expect(wrapper.findAll('.mat-hover')).toHaveLength(0);
    expect(target.attributes('data-hovering')).toBe('null');

    await target.trigger('mouseenter');

    expect(target.attributes('data-hovering')).toBe('true');
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]]);

    await target.trigger('mouseleave');

    expect(target.attributes('data-hovering')).toBe('false');
    expect(wrapper.emitted('update:modelValue')).toEqual([[true], [false]]);
  });

  it('支持 openDelay、closeDelay 以及反向操作取消计时器', async () => {
    const wrapper = mountTarget({
      closeDelay: '20',
      openDelay: '10',
    });
    const target = wrapper.find('button');

    await target.trigger('mouseenter');
    await vi.advanceTimersByTimeAsync(9);
    expect(target.attributes('data-hovering')).toBe('null');

    await target.trigger('mouseleave');
    await vi.advanceTimersByTimeAsync(20);
    expect(target.attributes('data-hovering')).toBe('false');
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);

    await target.trigger('mouseenter');
    await vi.advanceTimersByTimeAsync(10);
    expect(target.attributes('data-hovering')).toBe('true');

    await target.trigger('mouseleave');
    await vi.advanceTimersByTimeAsync(19);
    expect(target.attributes('data-hovering')).toBe('true');
    await vi.advanceTimersByTimeAsync(1);
    expect(target.attributes('data-hovering')).toBe('false');
  });

  it('显式传入 modelValue 时只发出更新请求，状态由父级控制', async () => {
    const wrapper = mountTarget({ modelValue: false });
    const target = wrapper.find('button');

    await target.trigger('mouseenter');

    expect(wrapper.emitted('update:modelValue')).toEqual([[true]]);
    expect(target.attributes('data-hovering')).toBe('false');

    await wrapper.setProps({ modelValue: true });
    expect(target.attributes('data-hovering')).toBe('true');
  });

  it('disabled 时记录内部 hover，重新启用后同步当前状态', async () => {
    const wrapper = mountTarget({ disabled: true });
    const target = wrapper.find('button');

    await target.trigger('mouseenter');
    expect(target.attributes('data-hovering')).toBe('null');
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    await wrapper.setProps({ disabled: false });
    expect(target.attributes('data-hovering')).toBe('true');
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]]);
  });

  it('target 指向元素时直接观察该元素，不渲染额外包装元素', async () => {
    const target = document.createElement('button');
    const handleUpdate = vi.fn();

    document.body.append(target);
    const wrapper = mount(MatHover, {
      props: {
        target,
        'onUpdate:modelValue': handleUpdate,
      },
    });

    await wrapper.vm.$nextTick();
    target.dispatchEvent(new MouseEvent('mouseenter'));

    expect(handleUpdate).toHaveBeenCalledWith(true);
    expect(wrapper.findAll('.mat-hover')).toHaveLength(0);

    wrapper.unmount();
    target.dispatchEvent(new MouseEvent('mouseleave'));

    expect(handleUpdate).toHaveBeenCalledTimes(1);
  });

  it('卸载时清理延迟任务', async () => {
    const wrapper = mountTarget({ openDelay: 100 });
    await wrapper.find('button').trigger('mouseenter');
    wrapper.unmount();

    await settleTimers();

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });
});
