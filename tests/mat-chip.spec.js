import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { describe, expect, it } from 'vitest';
import { MatChip, MatChipSet } from '../src';

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
});
