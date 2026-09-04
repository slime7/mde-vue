import { mount } from '@vue/test-utils';
import {
  createApp, h, nextTick,
} from 'vue';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import {
  createMatUi, MatBtn, MatDivider, MatList, MatListGroup, MatListItem,
} from '../src';
import ListExpandedExample from '../docs/site/examples/list/ListExpandedExample.vue';

afterEach(() => {
  vi.useRealTimers();
});

async function flushFocusManagement() {
  await nextTick();
  await Promise.resolve();
}

/**
 * @param {number} top
 * @param {number} [height]
 * @returns {DOMRect}
 */
function itemRect(top, height = 56) {
  return {
    x: 0,
    y: top,
    top,
    right: 240,
    bottom: top + height,
    left: 0,
    width: 240,
    height,
    toJSON() {
      return {};
    },
  };
}

/**
 * @param {EventTarget} target
 * @param {string} type
 * @param {PointerEventInit} [options]
 * @returns {PointerEvent}
 */
function dispatchPointer(target, type, options = {}) {
  const event = new PointerEvent(type, {
    bubbles: true,
    button: 0,
    buttons: type === 'pointerup' || type === 'pointercancel' ? 0 : 1,
    clientX: 20,
    clientY: 20,
    pointerId: 1,
    pointerType: 'mouse',
    isPrimary: true,
    ...options,
  });

  target.dispatchEvent(event);
  return event;
}

describe('MatList', () => {
  it('渲染普通语义列表、结构化 Slots 和自动行数', () => {
    const wrapper = mount(MatList, {
      slots: {
        default: () => h(MatListItem, null, {
          leading: () => '图标',
          overline: () => '上方文字',
          default: () => '标题',
          supporting: () => '辅助文字',
          trailing: () => '尾部',
        }),
      },
    });

    expect(wrapper.element.tagName).toBe('UL');
    expect(wrapper.find('.mat-list-item-content__leading').text()).toBe('图标');
    expect(wrapper.find('.mat-list-item-content__overline').text()).toBe('上方文字');
    expect(wrapper.find('.mat-list-item-content__label').text()).toBe('标题');
    expect(wrapper.find('.mat-list-item-content__supporting').text()).toBe('辅助文字');
    expect(wrapper.find('.mat-list-item-content__trailing').text()).toBe('尾部');
  });

  it('支持显式 standard 和显式行数', () => {
    const wrapper = mount(MatList, {
      props: {
        variant: 'standard',
        interaction: 'single-select',
        selected: 'one',
        color: 'tertiary',
      },
      slots: {
        default: () => h(MatListItem, { value: 'one', lines: 2 }, () => '一'),
      },
    });

    expect(wrapper.find('[role="option"]').attributes('aria-selected')).toBe('true');
  });

  it('color 设置通常状态颜色，activeColor 设置选中项颜色，未设置 activeColor 时选中项沿用 secondary-container', () => {
    const wrapper = mount(MatList, {
      props: {
        interaction: 'single-select',
        selected: 'two',
        color: 'primary',
        activeColor: 'tertiary',
      },
      slots: {
        default: () => [
          h(MatListItem, { value: 'one' }, () => '普通项'),
          h(MatListItem, { value: 'two' }, () => '选中项'),
        ],
      },
    });

    const style = wrapper.attributes('style');
    expect(style).toContain('--mat-accent-container-color: var(--mat-sys-color-primary-container)');
    expect(style).toContain('--mat-active-container-color: var(--mat-sys-color-tertiary-container)');
  });

  it('单操作模式使用原生按钮或链接并只从主操作发出 click', async () => {
    const click = vi.fn();
    const secondaryClick = vi.fn();
    const wrapper = mount(MatList, {
      props: { interaction: 'single-action' },
      slots: {
        default: () => [
          h(MatListItem, { onClick: click }, {
            default: () => '按钮',
            trailing: () => '尾部文字',
          }),
          h(MatListItem, { href: '/detail', target: '_blank' }, () => '链接'),
          h(MatListItem, null, {
            default: () => '不包含尾部按钮',
            trailing: () => h('span', { onClick: secondaryClick }, '尾部'),
          }),
        ],
      },
    });

    const actions = wrapper.findAll('[data-mat-list-primary]');

    expect(actions[0].element.tagName).toBe('BUTTON');
    expect(actions[1].element.tagName).toBe('A');
    expect(actions[1].attributes('href')).toBe('/detail');
    expect(actions[1].attributes('target')).toBe('_blank');
    await actions[0].trigger('click');
    expect(click).toHaveBeenCalledOnce();
    expect(secondaryClick).not.toHaveBeenCalled();
  });

  it('单选保持受控状态且不会通过再次激活取消当前项', async () => {
    const wrapper = mount(MatList, {
      props: {
        interaction: 'single-select',
        selected: 'one',
        'aria-label': '单选列表',
      },
      slots: {
        default: () => [
          h(MatListItem, { value: 'one' }, () => '一'),
          h(MatListItem, { value: 'two' }, () => '二'),
        ],
      },
    });
    await flushFocusManagement();
    const options = wrapper.findAll('[role="option"]');

    expect(wrapper.attributes('role')).toBe('listbox');
    expect(wrapper.attributes('aria-label')).toBe('单选列表');
    expect(options[0].attributes('aria-selected')).toBe('true');
    expect(options[0].attributes('tabindex')).toBe('0');
    expect(options[1].attributes('tabindex')).toBe('-1');

    await options[0].trigger('click');
    expect(wrapper.emitted('select')).toBeUndefined();

    await options[1].trigger('click');
    expect(wrapper.emitted('select')).toHaveLength(1);
    expect(wrapper.emitted('select')[0][0]).toMatchObject({
      value: 'two',
      selected: true,
      nextSelected: 'two',
    });
    expect(wrapper.emitted('select')[0][0].originalEvent).toBeInstanceOf(MouseEvent);
    expect(options[0].attributes('aria-selected')).toBe('true');
    expect(options[1].attributes('aria-selected')).toBe('false');
  });

  it('多选返回新数组并保留键盘原始事件', async () => {
    const wrapper = mount(MatList, {
      props: {
        interaction: 'multi-select',
        selected: ['one'],
      },
      slots: {
        default: () => [
          h(MatListItem, { value: 'one' }, () => '一'),
          h(MatListItem, { value: 'two' }, () => '二'),
        ],
      },
    });
    const options = wrapper.findAll('[role="option"]');

    expect(wrapper.attributes('aria-multiselectable')).toBe('true');
    await options[1].trigger('keydown', { key: ' ' });
    expect(wrapper.emitted('select')[0][0].nextSelected).toEqual(['one', 'two']);
    expect(wrapper.emitted('select')[0][0].originalEvent).toBeInstanceOf(KeyboardEvent);

    await options[0].trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('select')[1][0].nextSelected).toEqual([]);
  });

  it('方向键循环移动焦点并跳过禁用项', async () => {
    const wrapper = mount(MatList, {
      attachTo: document.body,
      props: { interaction: 'single-action' },
      slots: {
        default: () => [
          h(MatListItem, null, () => '一'),
          h(MatListItem, { disabled: true }, () => '二'),
          h(MatListItem, null, () => '三'),
        ],
      },
    });
    await flushFocusManagement();
    const actions = wrapper.findAll('[data-mat-list-primary]');

    expect(actions[0].attributes('tabindex')).toBe('0');
    expect(actions[1].attributes('tabindex')).toBeUndefined();
    expect(actions[2].attributes('tabindex')).toBe('-1');

    actions[0].element.focus();
    await actions[0].trigger('keydown', { key: 'ArrowDown' });
    expect(document.activeElement).toBe(actions[2].element);

    await actions[2].trigger('keydown', { key: 'ArrowRight' });
    expect(document.activeElement).toBe(actions[0].element);

    await actions[0].trigger('keydown', { key: 'ArrowUp' });
    expect(document.activeElement).toBe(actions[2].element);
    wrapper.unmount();
  });

  it('多操作模式统一管理主操作与 trailing 控件并在卸载时恢复 tabindex', async () => {
    const wrapper = mount(MatList, {
      attachTo: document.body,
      props: { interaction: 'multi-action' },
      slots: {
        default: () => h(MatListItem, null, {
          default: () => '项目',
          trailing: () => h(MatBtn, {
            icon: 'more_vert',
            label: '更多',
            tabindex: 2,
          }),
        }),
      },
    });
    await flushFocusManagement();
    const primary = wrapper.find('[data-mat-list-primary]');
    const secondary = wrapper.find('[data-mat-list-trailing] button');

    expect(primary.attributes('tabindex')).toBe('0');
    expect(secondary.attributes('tabindex')).toBe('-1');
    primary.element.focus();
    await primary.trigger('keydown', { key: 'ArrowRight' });
    expect(document.activeElement).toBe(secondary.element);

    const secondaryElement = secondary.element;

    wrapper.unmount();
    expect(secondaryElement.getAttribute('tabindex')).toBe('2');
  });

  it('选择模式默认保持展示型 trailing 内容且点击整行触发选中', async () => {
    const wrapper = mount(MatList, {
      props: {
        interaction: 'single-select',
        selected: 'one',
      },
      slots: {
        default: () => [
          h(MatListItem, { value: 'one' }, {
            default: () => '选项一',
            trailing: () => '状态标记',
          }),
          h(MatListItem, { value: 'two' }, {
            default: () => '选项二',
            trailing: () => h('span', { class: 'trailing-tag' }, '尾部文字'),
          }),
        ],
      },
    });

    expect(wrapper.find('[data-mat-list-trailing]').exists()).toBe(false);
    const trailingTag = wrapper.find('.trailing-tag');
    await trailingTag.trigger('click');

    expect(wrapper.emitted('select')).toHaveLength(1);
    expect(wrapper.emitted('select')[0][0]).toMatchObject({
      value: 'two',
      selected: true,
      nextSelected: 'two',
    });
  });

  it('选择模式支持通过 separateTrailing 分离尾部操作，点击尾部按钮不触发选中并支持键盘焦点流转', async () => {
    const buttonClick = vi.fn();
    const wrapper = mount(MatList, {
      attachTo: document.body,
      props: {
        interaction: 'single-select',
        selected: null,
      },
      slots: {
        default: () => [
          h(MatListItem, { value: 'item-1', separateTrailing: true }, {
            default: () => '条目一',
            trailing: () => h(MatBtn, {
              icon: 'delete',
              label: '删除',
              onClick: buttonClick,
            }),
          }),
        ],
      },
    });
    await flushFocusManagement();

    const primary = wrapper.find('[data-mat-list-primary]');
    const trailingBtn = wrapper.find('[data-mat-list-trailing] button');

    expect(primary.attributes('tabindex')).toBe('0');
    expect(trailingBtn.attributes('tabindex')).toBe('-1');

    await trailingBtn.trigger('click');
    expect(buttonClick).toHaveBeenCalledOnce();
    expect(wrapper.emitted('select')).toBeUndefined();

    primary.element.focus();
    await primary.trigger('keydown', { key: 'ArrowRight' });
    expect(document.activeElement).toBe(trailingBtn.element);

    wrapper.unmount();
  });

  it('多选模式与禁用状态下正确处理 separateTrailing', async () => {
    const buttonClick = vi.fn();
    const wrapper = mount(MatList, {
      attachTo: document.body,
      props: {
        interaction: 'multi-select',
        selected: ['active'],
      },
      slots: {
        default: () => [
          h(MatListItem, { value: 'active', separateTrailing: true }, {
            default: () => '已选项目',
            trailing: () => h(MatBtn, { label: '操作', onClick: buttonClick }),
          }),
          h(MatListItem, { value: 'disabled-item', disabled: true, separateTrailing: true }, {
            default: () => '禁用项目',
            trailing: () => h(MatBtn, { label: '禁用操作' }),
          }),
        ],
      },
    });
    await flushFocusManagement();

    const options = wrapper.findAll('[role="option"]');
    const trailingContainers = wrapper.findAll('[data-mat-list-trailing]');
    const trailingBtns = wrapper.findAll('[data-mat-list-trailing] button');

    expect(trailingContainers[0].attributes('inert')).toBeUndefined();
    expect(trailingContainers[1].attributes('inert')).toBeDefined();

    // 点击多选主项触发多选更新
    await options[0].trigger('click');
    expect(wrapper.emitted('select')).toHaveLength(1);
    expect(wrapper.emitted('select')[0][0].nextSelected).toEqual([]);

    // 点击尾部按钮不触发多选更新
    await trailingBtns[0].trigger('click');
    expect(buttonClick).toHaveBeenCalledOnce();
    expect(wrapper.emitted('select')).toHaveLength(1);

    // 焦点导航跳过禁用的尾部按钮
    options[0].element.focus();
    await options[0].trigger('keydown', { key: 'ArrowDown' });
    expect(document.activeElement).toBe(trailingBtns[0].element);

    await trailingBtns[0].trigger('keydown', { key: 'ArrowDown' });
    // 循环回第一个可用项 options[0]
    expect(document.activeElement).toBe(options[0].element);

    wrapper.unmount();
  });

  it('选择模式下 separateTrailing 保持状态层统一，优先响应尾部交互且支持点击空白与文本触发选择', async () => {
    const buttonClick = vi.fn();
    const wrapper = mount(MatList, {
      attachTo: document.body,
      props: {
        interaction: 'single-select',
        selected: null,
      },
      slots: {
        default: () => [
          h(MatListItem, { value: 'item-1', separateTrailing: true }, {
            default: () => '条目一',
            trailing: () => [
              h('span', { class: 'trailing-text' }, '提示文本'),
              h(MatBtn, { label: '操作', onClick: buttonClick }),
            ],
          }),
        ],
      },
    });
    await flushFocusManagement();

    const item = wrapper.find('[data-mat-list-primary]');
    const trailingContainer = wrapper.find('[data-mat-list-trailing]');
    const trailingBtn = wrapper.find('[data-mat-list-trailing] button');
    const trailingText = wrapper.find('.trailing-text');

    // 状态层宿主统一包含整行与 trailing
    expect(item.attributes('data-mat-state-layer-host')).toBeDefined();
    expect(item.element.contains(trailingContainer.element)).toBe(true);

    // 在尾部交互按钮上按下 pointerdown，阻止冒泡到外层状态层
    dispatchPointer(trailingBtn.element, 'pointerdown');
    expect(item.attributes('data-mat-state-layer-pressed')).toBeUndefined();

    // 点击尾部交互按钮，触发按钮逻辑，不触发 item 选中
    await trailingBtn.trigger('click');
    expect(buttonClick).toHaveBeenCalledOnce();
    expect(wrapper.emitted('select')).toBeUndefined();

    // 在尾部交互按钮上按 Space 或 Enter 键，不触发 item 选中
    await trailingBtn.trigger('keydown', { key: ' ' });
    await trailingBtn.trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('select')).toBeUndefined();

    // 点击尾部非交互静态文本，正常触发整行选中
    await trailingText.trigger('click');
    expect(wrapper.emitted('select')).toHaveLength(1);
    expect(wrapper.emitted('select')[0][0]).toMatchObject({
      value: 'item-1',
      selected: true,
      nextSelected: 'item-1',
    });

    // 点击尾部容器自身空白处，也正常触发整行选中
    await trailingContainer.trigger('click');
    expect(wrapper.emitted('select')).toHaveLength(2);

    wrapper.unmount();
  });

  it('未设置 interaction 时与多操作模式下，状态层宿主均覆盖整个列表项', async () => {
    const defaultWrapper = mount(MatList, {
      slots: {
        default: () => h(MatListItem, null, {
          default: () => '普通列表项',
          trailing: () => '尾部',
        }),
      },
    });
    const defaultItem = defaultWrapper.find('.mat-list-item');
    expect(defaultItem.attributes('data-mat-state-layer-host')).toBeDefined();
    defaultWrapper.unmount();

    const multiWrapper = mount(MatList, {
      props: { interaction: 'multi-action' },
      slots: {
        default: () => h(MatListItem, null, {
          default: () => '多操作项',
          trailing: () => h(MatBtn, { icon: 'download', label: '下载' }),
        }),
      },
    });
    const multiItem = multiWrapper.find('.mat-list-item');
    const multiTrailing = multiWrapper.find('[data-mat-list-trailing]');
    expect(multiItem.attributes('data-mat-state-layer-host')).toBeDefined();
    expect(multiItem.element.contains(multiTrailing.element)).toBe(true);
    multiWrapper.unmount();
  });

  it('多操作模式为长标签和 supporting 文本保留 trailing 操作区', () => {
    const wrapper = mount(MatList, {
      props: { interaction: 'multi-action' },
      slots: {
        default: () => h(MatListItem, { lines: 2 }, {
          default: () => h(
            'span',
            { class: 'ellipsis' },
            '这是一个非常非常长的文件名，用于验证文本是否会在操作按钮前正确省略.mp4',
          ),
          supporting: () => h(
            'span',
            { class: 'ellipsis' },
            'C:\\这是一个非常非常长的目录\\这是一个非常非常长的文件路径.mp4',
          ),
          trailing: () => h(MatBtn, { variant: 'text' }, () => '移除'),
        }),
      },
    });

    expect(wrapper.find('.mat-list-item-content__label .ellipsis').exists()).toBe(true);
    expect(wrapper.find('.mat-list-item-content__supporting .ellipsis').exists()).toBe(true);
    expect(wrapper.find('[data-mat-list-trailing]').text()).toBe('移除');
  });

  it('只在主指针保持 500ms 且未越过移动阈值后开始拖动', () => {
    vi.useFakeTimers();
    const wrapper = mount(MatList, {
      attachTo: document.body,
      props: { draggable: true },
      slots: {
        default: () => [
          h(MatListItem, { value: 'one' }, () => '一'),
          h(MatListItem, { value: 'two' }, () => '二'),
        ],
      },
    });
    const items = wrapper.findAll('.mat-list-item');

    items[0].element.getBoundingClientRect = () => itemRect(0);
    items[1].element.getBoundingClientRect = () => itemRect(50);

    dispatchPointer(items[0].element, 'pointerdown');
    vi.advanceTimersByTime(499);
    expect(document.querySelector('[data-mat-list-drag-preview]')).toBeNull();
    dispatchPointer(window, 'pointerup');

    dispatchPointer(items[0].element, 'pointerdown', { pointerId: 2 });
    dispatchPointer(window, 'pointermove', {
      clientY: 29,
      pointerId: 2,
    });
    vi.advanceTimersByTime(500);
    expect(document.querySelector('[data-mat-list-drag-preview]')).toBeNull();
    expect(wrapper.emitted('reorder')).toBeUndefined();
  });

  it('长按拖动显示占位并发出受控 reorder，同时抑制原项目 click', async () => {
    vi.useFakeTimers();
    const click = vi.fn();
    const wrapper = mount(MatList, {
      attachTo: document.body,
      props: {
        draggable: true,
        interaction: 'single-action',
      },
      slots: {
        default: () => [
          h(MatListItem, { value: 'one', onClick: click }, () => '一'),
          h(MatListItem, { value: 'two' }, () => '二'),
          h(MatListItem, { value: 'three' }, () => '三'),
        ],
      },
    });
    const items = wrapper.findAll('.mat-list-item');

    items[0].element.getBoundingClientRect = () => itemRect(0);
    items[1].element.getBoundingClientRect = () => itemRect(50);
    items[2].element.getBoundingClientRect = () => itemRect(100);

    dispatchPointer(items[0].element, 'pointerdown', { clientY: 24 });
    vi.advanceTimersByTime(500);
    expect(wrapper.find('[data-mat-list-drag-placeholder]').exists()).toBe(true);
    expect(document.querySelector('[data-mat-list-drag-preview]')).not.toBeNull();

    dispatchPointer(window, 'pointermove', { clientY: 130 });
    dispatchPointer(window, 'pointerup', { clientY: 130 });
    expect(wrapper.emitted('reorder')).toHaveLength(1);
    expect(wrapper.emitted('reorder')[0][0]).toMatchObject({
      value: 'one',
      fromIndex: 0,
      toIndex: 2,
    });
    expect(wrapper.emitted('reorder')[0][0].originalEvent).toBeInstanceOf(PointerEvent);

    await wrapper.find('[data-mat-list-primary]').trigger('click');
    expect(click).not.toHaveBeenCalled();
    await nextTick();
    expect(wrapper.find('[data-mat-list-drag-placeholder]').exists()).toBe(false);
    expect(document.querySelector('[data-mat-list-drag-preview]')).toBeNull();
  });

  it('固定结构和无效项目形成排序边界，trailing 控件不启动拖动', async () => {
    vi.useFakeTimers();
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mount(MatList, {
      attachTo: document.body,
      props: {
        draggable: true,
        interaction: 'multi-action',
      },
      slots: {
        default: () => [
          h(MatListItem, { value: 'one' }, () => '一'),
          h(MatDivider),
          h(MatListItem, { value: 'two' }, {
            default: () => '二',
            trailing: () => h(MatBtn, {
              icon: 'more_vert',
              label: '更多',
            }),
          }),
          h(MatListItem, null, () => '无值'),
          h(MatListItem, { value: 'disabled', disabled: true }, () => '禁用'),
        ],
      },
    });
    const items = wrapper.findAll('.mat-list-item');

    await nextTick();
    items.forEach((item, index) => {
      const { element } = item;

      element.getBoundingClientRect = () => itemRect(index * 50);
    });

    dispatchPointer(items[0].element, 'pointerdown');
    vi.advanceTimersByTime(500);
    dispatchPointer(window, 'pointermove', { clientY: 120 });
    dispatchPointer(window, 'pointerup', { clientY: 120 });
    expect(wrapper.emitted('reorder')).toBeUndefined();

    dispatchPointer(wrapper.get('[data-mat-list-trailing] button').element, 'pointerdown', {
      pointerId: 2,
    });
    vi.advanceTimersByTime(500);
    expect(document.querySelector('[data-mat-list-drag-preview]')).toBeNull();

    dispatchPointer(items[3].element, 'pointerdown', { pointerId: 3 });
    vi.advanceTimersByTime(500);
    expect(document.querySelector('[data-mat-list-drag-preview]')).toBeNull();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('draggable'));
  });

  it('取消事件、关闭 draggable 和卸载都会清理拖动视觉与监听', async () => {
    vi.useFakeTimers();
    const wrapper = mount(MatList, {
      attachTo: document.body,
      props: { draggable: true },
      slots: {
        default: () => [
          h(MatListItem, { value: 'one' }, () => '一'),
          h(MatListItem, { value: 'two' }, () => '二'),
        ],
      },
    });
    const items = wrapper.findAll('.mat-list-item');

    items[0].element.getBoundingClientRect = () => itemRect(0);
    items[1].element.getBoundingClientRect = () => itemRect(50);
    dispatchPointer(items[0].element, 'pointerdown');
    vi.advanceTimersByTime(500);
    dispatchPointer(window, 'pointercancel');
    expect(wrapper.find('[data-mat-list-drag-placeholder]').exists()).toBe(false);
    expect(document.querySelector('[data-mat-list-drag-preview]')).toBeNull();
    expect(wrapper.emitted('reorder')).toBeUndefined();

    dispatchPointer(items[0].element, 'pointerdown', { pointerId: 2 });
    vi.advanceTimersByTime(500);
    await wrapper.setProps({ draggable: false });
    expect(wrapper.find('[data-mat-list-drag-placeholder]').exists()).toBe(false);
    expect(document.querySelector('[data-mat-list-drag-preview]')).toBeNull();

    await wrapper.setProps({ draggable: true });
    dispatchPointer(items[0].element, 'pointerdown', { pointerId: 3 });
    vi.advanceTimersByTime(500);
    wrapper.unmount();
    expect(document.querySelector('[data-mat-list-drag-preview]')).toBeNull();
    dispatchPointer(window, 'pointerup', { pointerId: 3 });
  });

  it('只在实际拖动期间禁止文本选择，并在所有结束路径恢复', async () => {
    vi.useFakeTimers();
    const removeAllRanges = vi.fn();

    vi.spyOn(window, 'getSelection').mockReturnValue({
      removeAllRanges,
    });
    const wrapper = mount(MatList, {
      attachTo: document.body,
      props: { draggable: true },
      slots: {
        default: () => [
          h(MatListItem, { value: 'one' }, () => '一'),
          h(MatListItem, { value: 'two' }, () => '二'),
        ],
      },
    });
    const items = wrapper.findAll('.mat-list-item');

    items[0].element.getBoundingClientRect = () => itemRect(0);
    items[1].element.getBoundingClientRect = () => itemRect(50);

    function expectSelectionBlocked(blocked) {
      const event = new Event('selectstart', {
        bubbles: true,
        cancelable: true,
      });

      document.body.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(blocked);
    }

    function startDrag(pointerId) {
      dispatchPointer(items[0].element, 'pointerdown', { pointerId });
      vi.advanceTimersByTime(500);
      expectSelectionBlocked(true);
    }

    expectSelectionBlocked(false);
    startDrag(1);
    expect(removeAllRanges).toHaveBeenCalledOnce();
    dispatchPointer(window, 'pointerup', { pointerId: 1 });
    expectSelectionBlocked(false);

    startDrag(2);
    dispatchPointer(window, 'pointercancel', { pointerId: 2 });
    expectSelectionBlocked(false);

    startDrag(3);
    window.dispatchEvent(new Event('blur'));
    expectSelectionBlocked(false);

    startDrag(4);
    await wrapper.setProps({ draggable: false });
    expectSelectionBlocked(false);

    await wrapper.setProps({ draggable: true });
    startDrag(5);
    wrapper.unmount();
    expectSelectionBlocked(false);
  });

  it('插件全局注册 List、ListItem 和 Divider', () => {
    const app = createApp({});

    app.use(createMatUi());
    expect(app.component('mat-list')).toBe(MatList);
    expect(app.component('mat-list-group')).toBe(MatListGroup);
    expect(app.component('mat-list-item')).toBe(MatListItem);
    expect(app.component('mat-divider')).toBeDefined();
  });

  it('有值 Group 通过 expanded 数组受控并返回不可变的新数组', async () => {
    const expanded = ['unknown', false, 0];
    const wrapper = mount(MatList, {
      props: { expanded },
      slots: {
        default: () => [
          h(MatListGroup, { value: false }, {
            activator: ({ expanded: isExpanded }) => h(
              MatListItem,
              null,
              () => `布尔值 ${isExpanded}`,
            ),
            default: () => h(MatListItem, null, () => '布尔值内容'),
          }),
          h(MatListGroup, { value: 1 }, {
            activator: () => h(MatListItem, null, () => '数字值'),
            default: () => h(MatListItem, null, () => '数字值内容'),
          }),
        ],
      },
    });

    const activators = wrapper.findAll('[data-mat-list-group-activator]');

    expect(activators[0].attributes('aria-expanded')).toBe('true');
    expect(activators[0].text()).toContain('布尔值 true');
    await activators[0].trigger('click');
    expect(expanded).toEqual(['unknown', false, 0]);
    expect(wrapper.emitted('update:expanded')[0][0]).toEqual(['unknown', 0]);
    expect(wrapper.emitted('update:expanded')[0][0]).not.toBe(expanded);

    await activators[1].trigger('click');
    expect(wrapper.emitted('update:expanded')[1][0]).toEqual(['unknown', false, 0, 1]);
  });

  it('有值 Group 完全受控且多个 Group 可同时展开', async () => {
    const wrapper = mount(MatList, {
      props: { expanded: ['one', 'two'] },
      slots: {
        default: () => ['one', 'two'].map((value) => h(MatListGroup, { value }, {
          activator: ({ expanded }) => h(MatListItem, null, () => `${value}:${expanded}`),
          default: () => h(MatListItem, null, () => `${value} 内容`),
        })),
      },
    });
    const activators = wrapper.findAll('[data-mat-list-group-activator]');

    expect(activators.every((activator) => activator.attributes('aria-expanded') === 'true')).toBe(true);
    await activators[0].trigger('click');
    expect(activators[0].attributes('aria-expanded')).toBe('true');
    expect(wrapper.emitted('update:expanded')[0][0]).toEqual(['two']);

    await wrapper.setProps({ expanded: ['two'] });
    expect(activators[0].attributes('aria-expanded')).toBe('false');
    expect(activators[1].attributes('aria-expanded')).toBe('true');
  });

  it('无值 Group 使用初始折叠的内部状态且不更新根 expanded', async () => {
    const wrapper = mount(MatList, {
      slots: {
        default: () => h(MatListGroup, null, {
          activator: ({ expanded }) => h(MatListItem, null, {
            default: () => String(expanded),
            trailing: () => (expanded ? 'expand_less' : 'expand_more'),
          }),
          default: () => h(MatListItem, null, () => '内容'),
        }),
      },
    });
    const activator = wrapper.find('[data-mat-list-group-activator]');
    const content = wrapper.find('[data-mat-list-group-content]');

    expect(activator.attributes('aria-expanded')).toBe('false');
    expect(activator.text()).toContain('expand_more');
    expect(content.attributes()).toHaveProperty('inert');
    expect(content.attributes('aria-hidden')).toBe('true');
    await activator.trigger('click');
    expect(activator.attributes('aria-expanded')).toBe('true');
    expect(activator.text()).toContain('expand_less');
    expect(content.attributes()).not.toHaveProperty('inert');
    expect(wrapper.emitted('update:expanded')).toBeUndefined();
  });

  it('文档模板中的全局组件 Activator 可以收起受控分组', async () => {
    const target = document.createElement('div');
    const plugin = createMatUi({ theme: { target } });
    const wrapper = mount(ListExpandedExample, {
      global: { plugins: [plugin] },
    });
    const activator = wrapper.find('[data-mat-list-group-activator]');

    expect(activator.attributes('aria-expanded')).toBe('true');
    await activator.trigger('click');
    expect(activator.attributes('aria-expanded')).toBe('false');
    wrapper.unmount();
    plugin.theme.dispose();
  });

  it('开发热更新改变组件对象身份后仍能识别 MatListItem Activator', async () => {
    const HotReloadedMatListItem = { ...MatListItem };
    const wrapper = mount(MatList, {
      props: { expanded: ['group'] },
      slots: {
        default: () => h(MatListGroup, { value: 'group' }, {
          activator: () => h(HotReloadedMatListItem, null, () => '热更新触发器'),
          default: () => h(MatListItem, null, () => '内容'),
        }),
      },
    });
    const activator = wrapper.find('[data-mat-list-group-activator]');

    expect(activator.attributes('aria-expanded')).toBe('true');
    await activator.trigger('click');
    expect(wrapper.emitted('update:expanded')[0][0]).toEqual([]);
  });

  it('Activator 是单一按钮并抑制叶子 click、链接和选择值语义', async () => {
    const click = vi.fn();
    const wrapper = mount(MatList, {
      props: { interaction: 'multi-action' },
      slots: {
        default: () => h(MatListGroup, { value: 'group' }, {
          activator: () => h(MatListItem, {
            value: 'ignored',
            href: '/ignored',
            onClick: click,
          }, {
            default: () => '触发器',
            trailing: () => h('span', '自定义箭头'),
          }),
          default: () => h(MatListItem, null, () => '内容'),
        }),
      },
    });
    const activator = wrapper.find('[data-mat-list-group-activator]');

    expect(activator.element.tagName).toBe('BUTTON');
    expect(activator.attributes('href')).toBeUndefined();
    expect(activator.attributes('aria-controls')).toBeTruthy();
    expect(wrapper.findAll('[data-mat-list-trailing]')).toHaveLength(0);
    await activator.trigger('click');
    expect(click).not.toHaveBeenCalled();
    expect(wrapper.emitted('update:expanded')[0][0]).toEqual(['group']);
  });

  it('禁用 Activator 不切换，Enter 和 Space 使用原生按钮切换', async () => {
    const wrapper = mount(MatList, {
      props: { expanded: [] },
      slots: {
        default: () => [
          h(MatListGroup, { value: 'disabled' }, {
            activator: () => h(MatListItem, { disabled: true }, () => '禁用'),
            default: () => h(MatListItem, null, () => '禁用内容'),
          }),
          h(MatListGroup, { value: 'keyboard' }, {
            activator: () => h(MatListItem, null, () => '键盘'),
            default: () => h(MatListItem, null, () => '键盘内容'),
          }),
        ],
      },
    });
    const activators = wrapper.findAll('[data-mat-list-group-activator]');

    await activators[0].trigger('click');
    expect(wrapper.emitted('update:expanded')).toBeUndefined();
    await activators[1].trigger('keydown', { key: 'Enter' });
    await activators[1].trigger('click');
    expect(wrapper.emitted('update:expanded')).toHaveLength(1);
    expect(wrapper.emitted('update:expanded')[0][0]).toEqual(['keyboard']);
  });

  it('生成嵌套 ul/li 并与普通直属 Item 混排', () => {
    const wrapper = mount(MatList, {
      props: { expanded: ['group'] },
      slots: {
        default: () => [
          h(MatListItem, null, () => '直属一'),
          h(MatListGroup, { value: 'group' }, {
            activator: () => h(MatListItem, null, () => '组'),
            default: () => h(MatListItem, null, () => '组内'),
          }),
          h(MatListItem, null, () => '直属二'),
        ],
      },
    });
    const children = Array.from(wrapper.element.children);
    const group = wrapper.find('.mat-list-group');

    expect(children.map((element) => element.tagName)).toEqual(['LI', 'LI', 'LI']);
    expect(group.element.parentElement).toBe(wrapper.element);
    expect(group.find('ul').element.parentElement?.hasAttribute('data-mat-list-group-content')).toBe(true);
    expect(group.find('ul > li').text()).toBe('组内');
  });

  it('roving focus 跳过折叠内容并在收起时恢复到 Activator', async () => {
    const wrapper = mount(MatList, {
      attachTo: document.body,
      props: {
        interaction: 'single-action',
        expanded: ['group'],
      },
      slots: {
        default: () => [
          h(MatListItem, null, () => '之前'),
          h(MatListGroup, { value: 'group' }, {
            activator: () => h(MatListItem, null, () => '组'),
            default: () => h(MatListItem, null, () => '组内'),
          }),
          h(MatListItem, null, () => '之后'),
        ],
      },
    });
    await flushFocusManagement();
    const focusables = wrapper.findAll('[data-mat-list-primary]');
    const activator = wrapper.find('[data-mat-list-group-activator]');
    const child = focusables.find((item) => item.text() === '组内');

    expect(focusables.map((item) => item.attributes('tabindex'))).toEqual(['0', '-1', '-1', '-1']);
    child.element.focus();
    await wrapper.setProps({ expanded: [] });
    await flushFocusManagement();
    expect(document.activeElement).toBe(activator.element);
    expect(child.attributes('tabindex')).toBeUndefined();
    wrapper.unmount();
  });

  it.each(['single-select', 'multi-select'])('%s 模式警告并降级为静态展开分组', (interaction) => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mount(MatList, {
      props: { interaction },
      slots: {
        default: () => h(MatListGroup, { value: 'group' }, {
          activator: () => h(MatListItem, null, () => '静态标签'),
          default: () => h(MatListItem, { value: 'child' }, () => '选项'),
        }),
      },
    });
    const group = wrapper.find('[role="group"]');

    expect(warn).toHaveBeenCalledWith(expect.stringContaining('选择模式'));
    expect(group.exists()).toBe(true);
    expect(group.attributes('aria-labelledby')).toBeTruthy();
    expect(group.find('[data-mat-list-group-label]').element.tagName).toBe('DIV');
    expect(group.find('[role="option"]').exists()).toBe(true);
    expect(wrapper.find('[data-mat-list-group-content]').attributes()).not.toHaveProperty('inert');
    warn.mockRestore();
  });

  it('Activator 无效和重复 value 时警告，并让无效组始终展开', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mount(MatList, {
      slots: {
        default: () => [
          h(MatListGroup, { value: 'duplicate' }, {
            activator: () => h('span', '错误触发器'),
            default: () => h(MatListItem, null, () => '仍可访问'),
          }),
          h(MatListGroup, { value: 'duplicate' }, {
            activator: () => h(MatListItem, null, () => '重复'),
            default: () => h(MatListItem, null, () => '内容'),
          }),
        ],
      },
    });

    expect(warn).toHaveBeenCalledWith(expect.stringContaining('activator Slot'));
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('value 必须唯一'));
    expect(wrapper.findAll('[data-mat-list-group-content]')[0].attributes()).not.toHaveProperty('inert');
    warn.mockRestore();
  });
});
