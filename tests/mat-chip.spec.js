import { mount } from '@vue/test-utils';
import { h } from 'vue';
import {
  describe, expect, it, vi,
} from 'vitest';
import { MatChip, MatChipSet } from '../src';

function dispatchPointer(target, type, options = {}) {
  const event = new MouseEvent(type, {
    bubbles: true,
    button: 0,
    buttons: type === 'pointerup' ? 0 : 1,
    cancelable: true,
    clientX: options.clientX ?? 0,
  });

  Object.defineProperties(event, {
    pointerId: { value: options.pointerId ?? 1 },
    pointerType: { value: 'mouse' },
  });
  target.dispatchEvent(event);
}

describe('MatChip', () => {
  it('使用原生按钮语义并透传属性与点击事件', async () => {
    const wrapper = mount(MatChip, {
      attrs: {
        'aria-label': '打开建议',
        name: 'suggestion',
      },
      slots: {
        default: () => '建议',
      },
    });

    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.attributes('type')).toBe('button');
    expect(wrapper.attributes('name')).toBe('suggestion');
    expect(wrapper.attributes('aria-label')).toBe('打开建议');

    await wrapper.trigger('click');
    expect(wrapper.emitted('click')?.[0]?.[0]).toBeInstanceOf(MouseEvent);
  });

  it('禁用时阻止原生按钮交互', async () => {
    const wrapper = mount(MatChip, {
      props: {
        disabled: true,
      },
      slots: {
        default: () => '不可用',
      },
    });

    expect(wrapper.element.disabled).toBe(true);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeUndefined();
  });

  it.each(['filter', 'input'])('%s 以 aria-pressed 表达受控选中状态', async (variant) => {
    const wrapper = mount(MatChip, {
      props: {
        selected: true,
        variant,
      },
      slots: {
        default: () => '受控状态',
      },
    });

    expect(wrapper.attributes('aria-pressed')).toBe('true');
    await wrapper.trigger('click');
    expect(wrapper.attributes('aria-pressed')).toBe('true');
  });

  it.each(['assist', 'suggestion'])('%s 不声明选择语义', (variant) => {
    const wrapper = mount(MatChip, {
      props: {
        selected: true,
        variant,
      },
      slots: {
        default: () => '普通操作',
      },
    });

    expect(wrapper.attributes('aria-pressed')).toBeUndefined();
  });

  it('提供默认状态图标并允许具名 Slot 覆盖', () => {
    const selectedFilter = mount(MatChip, {
      props: {
        selected: true,
        variant: 'filter',
      },
      slots: {
        default: () => '筛选',
      },
    });
    const input = mount(MatChip, {
      props: {
        variant: 'input',
      },
      slots: {
        default: () => '联系人',
      },
    });
    const slotted = mount(MatChip, {
      props: {
        selected: true,
        variant: 'input',
      },
      slots: {
        avatar: () => h('img', { alt: '用户头像' }),
        default: () => '自定义内容',
        trailing: () => h('span', '展开'),
      },
    });

    expect(selectedFilter.text()).toContain('check');
    expect(input.text()).toContain('close');
    expect(slotted.get('img').attributes('alt')).toBe('用户头像');
    expect(slotted.text()).toContain('展开');
    expect(slotted.text()).not.toContain('close');
  });

  it('input 默认关闭图标只触发 remove，不触发根 click', async () => {
    const wrapper = mount(MatChip, {
      props: {
        value: 'contact',
        variant: 'input',
      },
      slots: {
        default: () => '联系人',
      },
    });
    const closeIcon = wrapper.findAll('span').find((element) => element.text() === 'close');

    await closeIcon.trigger('click');

    expect(wrapper.emitted('remove')?.[0]?.[0]).toBeInstanceOf(MouseEvent);
    expect(wrapper.emitted('click')).toBeUndefined();
  });

  it('禁用与自定义 trailing 不触发默认 remove 行为', async () => {
    const disabled = mount(MatChip, {
      props: {
        disabled: true,
        variant: 'input',
      },
      slots: {
        default: () => '不可移除',
      },
    });
    const custom = mount(MatChip, {
      props: {
        variant: 'input',
      },
      slots: {
        default: () => '自定义',
        trailing: () => h('span', '展开'),
      },
    });
    const disabledClose = disabled.findAll('span')
      .find((element) => element.text() === 'close');

    await disabledClose.trigger('click');
    await custom.get('span span').trigger('click');

    expect(disabled.emitted('remove')).toBeUndefined();
    expect(custom.emitted('remove')).toBeUndefined();
    expect(custom.emitted('click')).toHaveLength(1);
  });
});

describe('MatChipSet', () => {
  it('提供分组语义并原样渲染 Chip', () => {
    const wrapper = mount(MatChipSet, {
      attrs: {
        'aria-label': '内容类型',
      },
      slots: {
        default: () => [
          h(MatChip, null, () => '文档'),
          h(MatChip, null, () => '图片'),
        ],
      },
    });

    expect(wrapper.attributes('role')).toBe('group');
    expect(wrapper.attributes('aria-label')).toBe('内容类型');
    expect(wrapper.findAll('button')).toHaveLength(2);
    expect(wrapper.text()).toContain('文档');
    expect(wrapper.text()).toContain('图片');
  });

  it('single 通过 v-model 请求选择并允许取消当前值', async () => {
    const wrapper = mount(MatChipSet, {
      props: {
        modelValue: 'one',
        selection: 'single',
      },
      slots: {
        default: () => [
          h(MatChip, { value: 'one', variant: 'filter' }, () => '一'),
          h(MatChip, { value: 'two', variant: 'filter' }, () => '二'),
        ],
      },
    });
    const buttons = wrapper.findAll('button');

    expect(buttons[0].attributes('aria-pressed')).toBe('true');
    expect(buttons[1].attributes('aria-pressed')).toBe('false');

    await buttons[1].trigger('click');
    await buttons[0].trigger('click');

    expect(wrapper.emitted('update:modelValue')).toEqual([['two'], [null]]);
    expect(buttons[0].attributes('aria-pressed')).toBe('true');
    expect(buttons[1].attributes('aria-pressed')).toBe('false');
  });

  it('multiple 返回新数组且不修改传入模型', async () => {
    const modelValue = ['one'];
    const wrapper = mount(MatChipSet, {
      props: {
        modelValue,
        selection: 'multiple',
      },
      slots: {
        default: () => [
          h(MatChip, { value: 'one', variant: 'filter' }, () => '一'),
          h(MatChip, { value: 'two', variant: 'input' }, () => '二'),
        ],
      },
    });

    await wrapper.findAll('button')[1].trigger('click');

    const nextValue = wrapper.emitted('update:modelValue')?.[0]?.[0];

    expect(nextValue).toEqual(['one', 'two']);
    expect(nextValue).not.toBe(modelValue);
    expect(modelValue).toEqual(['one']);
    expect(wrapper.findAll('button')[1].attributes('aria-pressed')).toBe('false');
  });

  it('组模型覆盖参与项 selected，但忽略不参与选择的 Chip', async () => {
    const wrapper = mount(MatChipSet, {
      props: {
        modelValue: ['selected'],
        selection: 'multiple',
      },
      slots: {
        default: () => [
          h(MatChip, {
            selected: false,
            value: 'selected',
            variant: 'filter',
          }, () => '组选中'),
          h(MatChip, {
            selected: true,
            value: 'local',
            variant: 'input',
          }, () => '组未选中'),
          h(MatChip, { value: 'assist', variant: 'assist' }, () => '辅助'),
          h(MatChip, { variant: 'filter' }, () => '无值'),
          h(MatChip, {
            disabled: true,
            value: 'disabled',
            variant: 'filter',
          }, () => '禁用'),
        ],
      },
    });
    const buttons = wrapper.findAll('button');

    expect(buttons[0].attributes('aria-pressed')).toBe('true');
    expect(buttons[1].attributes('aria-pressed')).toBe('false');
    expect(buttons[2].attributes('aria-pressed')).toBeUndefined();

    await buttons[2].trigger('click');
    await buttons[3].trigger('click');
    await buttons[4].trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('input remove 不修改 ChipSet 模型', async () => {
    const wrapper = mount(MatChipSet, {
      props: {
        modelValue: ['contact'],
        selection: 'multiple',
      },
      slots: {
        default: () => h(MatChip, {
          value: 'contact',
          variant: 'input',
        }, () => '联系人'),
      },
    });
    const closeIcon = wrapper.findAll('span').find((element) => element.text() === 'close');

    await closeIcon.trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('scroll 布局启用隐藏滚动条与拖拽，拖拽不激活 Chip', async () => {
    const wrapper = mount(MatChipSet, {
      props: {
        layout: 'scroll',
        modelValue: null,
        selection: 'single',
      },
      slots: {
        default: () => h(MatChip, {
          value: 'one',
          variant: 'filter',
        }, () => '一'),
      },
    });
    const scrollArea = wrapper.findComponent({ name: 'MatScrollArea' });
    const scroller = scrollArea.vm.getScroller();
    const button = wrapper.get('button').element;

    expect(scrollArea.props('barWidth')).toBe('hidden');
    expect(scrollArea.props('dragScroll')).toBe(true);

    scroller.setPointerCapture = vi.fn();
    Object.defineProperty(scroller, 'scrollLeft', {
      configurable: true,
      value: 100,
      writable: true,
    });
    dispatchPointer(button, 'pointerdown', { clientX: 100, pointerId: 1 });
    dispatchPointer(button, 'pointermove', { clientX: 80, pointerId: 1 });
    dispatchPointer(scroller, 'pointerup', { clientX: 80, pointerId: 1 });
    button.click();

    expect(scroller.scrollLeft).toBe(120);
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    button.click();
    expect(wrapper.emitted('update:modelValue')).toEqual([['one']]);
  });
});
