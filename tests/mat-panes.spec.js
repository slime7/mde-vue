import { mount } from '@vue/test-utils';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { h, nextTick, ref } from 'vue';
import { MatPane, MatPanes } from '../src';

const mountedWrappers = [];

/**
 * @param {object} options
 * @param {Record<string, number>} [options.sizes]
 * @param {boolean} [options.resizable]
 * @param {boolean} [options.includeSecond]
 * @returns {import('@vue/test-utils').VueWrapper}
 */
function mountPanes(options = {}) {
  const sizes = options.sizes ?? { first: 1, second: 1, third: 1 };

  const wrapper = mount(MatPanes, {
    props: {
      resizable: options.resizable,
      sizes,
    },
    slots: {
      default: [
        h(MatPane, { id: 'first', resizeLabel: '主区域' }, { default: () => 'First' }),
        options.includeSecond === false
          ? null
          : h(MatPane, { id: 'second', resizeLabel: '辅助区域' }, { default: () => 'Second' }),
        h(MatPane, { id: 'third', resizeLabel: '详情区域' }, { default: () => 'Third' }),
      ].filter(Boolean),
    },
  });

  mountedWrappers.push(wrapper);

  return wrapper;
}

/**
 * @param {HTMLElement} element
 * @param {number} width
 */
function mockWidth(element, width) {
  Object.defineProperty(element, 'getBoundingClientRect', {
    configurable: true,
    value() {
      return {
        bottom: 240,
        height: 240,
        left: 0,
        right: width,
        top: 0,
        width,
        x: 0,
        y: 0,
      };
    },
  });
}

/**
 * @param {import('@vue/test-utils').DOMWrapper} target
 * @param {string} type
 * @param {{clientX: number, pointerId: number}} options
 * @returns {Promise<void>}
 */
async function dispatchPointer(target, type, options) {
  const event = new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    clientX: options.clientX,
  });

  Object.defineProperty(event, 'pointerId', { value: options.pointerId });
  target.element.dispatchEvent(event);
  await nextTick();
}

describe('MatPanes', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 800,
      writable: true,
    });
  });

  afterEach(() => {
    mountedWrappers.splice(0).forEach((wrapper) => wrapper.unmount());
    vi.useRealTimers();
  });

  it('渲染受控权重的横向 Pane、等高滚动区域和相邻调整控件', async () => {
    const wrapper = mountPanes();
    await nextTick();

    expect(wrapper.classes()).toContain('mat-panes');
    expect(wrapper.findAll('.mat-pane')).toHaveLength(3);
    expect(wrapper.findAll('.mat-pane__handle')).toHaveLength(2);
    expect(wrapper.find('.mat-pane').classes()).toContain('mat-pane');
    expect(wrapper.find('.mat-pane').attributes('id')).toBe('first');
    expect(wrapper.find('.mat-pane').attributes('style')).toContain('--mat-pane-weight: 1');

    const paneSource = wrapper.find('.mat-pane').element.outerHTML;

    expect(paneSource).toContain('First');
    expect(wrapper.find('.mat-panes').attributes('style')).toBeUndefined();
  });

  it('使用 separator ARIA 语义和 Pane 的调整名称', async () => {
    const wrapper = mountPanes();
    await nextTick();
    const handle = wrapper.find('.mat-pane__handle');

    expect(handle.attributes('role')).toBe('separator');
    expect(handle.attributes('aria-orientation')).toBe('vertical');
    expect(handle.attributes('aria-controls')).toBe('first');
    expect(handle.attributes('aria-label')).toBe('主区域');
    expect(handle.attributes('aria-valuemin')).toBe('0');
    expect(handle.attributes('aria-valuemax')).toBe('100');
    expect(handle.attributes('aria-valuenow')).toBe('50');
    expect(handle.attributes('tabindex')).toBe('0');
  });

  it('拖拽只在释放时提交相邻权重，并保持总和', async () => {
    const wrapper = mountPanes({ sizes: { first: 1, second: 2, third: 1 } });
    await nextTick();
    const panes = wrapper.findAll('.mat-pane');
    const handle = wrapper.find('.mat-pane__handle');

    mockWidth(panes[0].element, 100);
    mockWidth(panes[1].element, 200);
    mockWidth(panes[2].element, 100);

    await dispatchPointer(handle, 'pointerdown', { clientX: 100, pointerId: 1 });
    await dispatchPointer(handle, 'pointermove', { clientX: 150, pointerId: 1 });

    expect(wrapper.emitted('update:sizes')).toBeUndefined();

    await dispatchPointer(handle, 'pointerup', { clientX: 150, pointerId: 1 });

    const emitted = wrapper.emitted('update:sizes');

    expect(emitted).toHaveLength(1);
    expect(emitted[0][0].first + emitted[0][0].second).toBe(3);
    expect(emitted[0][0].third).toBe(1);
  });

  it('键盘使用 16px 步长、Home 和 End 调整分隔位置', async () => {
    const wrapper = mountPanes({ sizes: { first: 1, second: 1, third: 1 } });
    await nextTick();
    const panes = wrapper.findAll('.mat-pane');
    const handle = wrapper.find('.mat-pane__handle');

    mockWidth(panes[0].element, 100);
    mockWidth(panes[1].element, 100);

    await handle.trigger('keydown', { key: 'ArrowRight' });
    await handle.trigger('keydown', { key: 'Home' });
    await handle.trigger('keydown', { key: 'End' });

    const emitted = wrapper.emitted('update:sizes');

    expect(emitted).toHaveLength(3);
    expect(emitted[1][0].first).toBe(0);
    expect(emitted[2][0].second).toBe(0);
  });

  it('取消指针捕获时不提交调整', async () => {
    const wrapper = mountPanes();
    await nextTick();
    const handle = wrapper.find('.mat-pane__handle');

    await dispatchPointer(handle, 'pointerdown', { clientX: 40, pointerId: 2 });
    await dispatchPointer(handle, 'pointermove', { clientX: 80, pointerId: 2 });
    await dispatchPointer(handle, 'pointercancel', { clientX: 80, pointerId: 2 });

    expect(wrapper.emitted('update:sizes')).toBeUndefined();
  });

  it('可以关闭自动调整控件', async () => {
    const wrapper = mountPanes({ resizable: false });
    await nextTick();

    expect(wrapper.findAll('.mat-pane__handle')).toHaveLength(0);
    expect(wrapper.findAll('.mat-pane__separator')).toHaveLength(2);
  });

  it('关闭调整时保留 Pane 之间的分隔空间', async () => {
    const wrapper = mountPanes();

    await nextTick();
    expect(wrapper.findAll('.mat-pane__separator')).toHaveLength(2);

    await wrapper.setProps({ resizable: false });
    await nextTick();

    expect(wrapper.findAll('.mat-pane__separator')).toHaveLength(2);
    expect(wrapper.findAll('.mat-pane__handle')).toHaveLength(0);
  });

  it('初始发送断点，并且只在断点等级变化时再次发送', async () => {
    const wrapper = mountPanes();

    await nextTick();

    expect(wrapper.emitted('update:breakpoint')).toEqual([['medium']]);

    window.innerWidth = 820;
    window.dispatchEvent(new Event('resize'));
    await nextTick();

    expect(wrapper.emitted('update:breakpoint')).toHaveLength(1);

    window.innerWidth = 1200;
    window.dispatchEvent(new Event('resize'));
    await nextTick();

    expect(wrapper.emitted('update:breakpoint')).toEqual([['medium'], ['large']]);
  });

  it('宽度信息使用尾端防抖并在 Pane 集合变化后更新', async () => {
    vi.useFakeTimers();
    const wrapper = mountPanes();
    const panes = wrapper.findAll('.mat-pane');

    mockWidth(panes[0].element, 100);
    mockWidth(panes[1].element, 200);
    mockWidth(panes[2].element, 300);
    await nextTick();
    vi.advanceTimersByTime(99);

    expect(wrapper.emitted('update:widths')).toBeUndefined();

    vi.advanceTimersByTime(1);
    expect(wrapper.emitted('update:widths')?.[0][0]).toEqual({
      first: 100,
      second: 200,
      third: 300,
    });
  });

  it('使用方可以通过 v-if 动态移除 Pane 并重新生成分隔控件', async () => {
    const includeSecond = ref(true);
    const wrapper = mount(MatPanes, {
      props: { sizes: { first: 1, second: 1, third: 1 } },
      slots: {
        default: () => [
          h(MatPane, { id: 'first' }, { default: () => 'First' }),
          includeSecond.value
            ? h(MatPane, { id: 'second' }, { default: () => 'Second' })
            : null,
          h(MatPane, { id: 'third' }, { default: () => 'Third' }),
        ],
      },
    });
    mountedWrappers.push(wrapper);
    await nextTick();

    expect(wrapper.findAll('.mat-pane__handle')).toHaveLength(2);
    includeSecond.value = false;
    await nextTick();

    expect(wrapper.findAll('.mat-pane')).toHaveLength(2);
    expect(wrapper.findAll('.mat-pane__handle')).toHaveLength(1);
  });
});
