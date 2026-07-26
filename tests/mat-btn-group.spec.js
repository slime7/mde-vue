import { mount } from '@vue/test-utils';
import { h } from 'vue';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import { MatBtn, MatBtnGroup } from '../src';

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('MatBtnGroup', () => {
  it('向子按钮传递禁用状态', () => {
    const wrapper = mount(MatBtnGroup, {
      props: {
        disabled: true,
      },
      slots: {
        default: () => [
          h(MatBtn, { value: 'one' }, () => '一'),
          h(MatBtn, {
            size: 'extra-small',
            shape: 'round',
            color: 'error',
            value: 'two',
          }, () => '二'),
        ],
      },
    });
    const buttons = wrapper.findAll('button');

    expect(buttons.every((button) => button.element.disabled)).toBe(true);
  });

  it('single 模式发出候选选择且不自行修改选中值', async () => {
    const wrapper = mount(MatBtnGroup, {
      props: {
        selection: 'single',
        selected: 'one',
      },
      slots: {
        default: () => [
          h(MatBtn, { value: 'one' }, () => '一'),
          h(MatBtn, { value: 'two' }, () => '二'),
        ],
      },
    });

    await wrapper.findAll('button')[1].trigger('click');

    expect(wrapper.emitted('select')).toHaveLength(1);
    expect(wrapper.emitted('select')[0][0]).toMatchObject({
      value: 'two',
      selected: true,
      nextSelected: 'two',
    });
    expect(wrapper.findAll('button')[0].attributes('aria-pressed')).toBe('true');
    expect(wrapper.findAll('button')[1].attributes('aria-pressed')).toBe('false');
  });

  it('required 阻止取消最后一项，multiple 返回新数组', async () => {
    const required = mount(MatBtnGroup, {
      props: {
        selection: 'multiple',
        selected: ['one'],
        required: true,
      },
      slots: {
        default: () => h(MatBtn, { value: 'one' }, () => '一'),
      },
    });

    await required.find('button').trigger('click');
    expect(required.emitted('select')).toBeUndefined();

    await required.setProps({ selected: ['one', 'two'] });
    await required.find('button').trigger('click');
    expect(required.emitted('select')[0][0].nextSelected).toEqual(['two']);
  });

  it.each(['standard', 'connected'])('%s 支持 none、single 和 multiple 选择模式', (variant) => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const none = mount(MatBtnGroup, {
      props: { variant, selection: 'none' },
      slots: {
        default: () => h(MatBtn, { value: 'one' }, () => '一'),
      },
    });
    const single = mount(MatBtnGroup, {
      props: { variant, selection: 'single', selected: 'one' },
      slots: {
        default: () => h(MatBtn, { value: 'one' }, () => '一'),
      },
    });
    const multiple = mount(MatBtnGroup, {
      props: { variant, selection: 'multiple', selected: ['one'] },
      slots: {
        default: () => h(MatBtn, { value: 'one' }, () => '一'),
      },
    });

    expect(none.find('button').attributes('aria-pressed')).toBeUndefined();
    expect(single.find('button').attributes('aria-pressed')).toBe('true');
    expect(multiple.find('button').attributes('aria-pressed')).toBe('true');

    if (variant === 'connected') {
      expect(warn).toHaveBeenCalledWith('MatBtnGroup: connected 形态应配合 single 或 multiple 选择模式使用');
    } else {
      expect(warn).not.toHaveBeenCalled();
    }
  });

  it('single required 阻止取消唯一选中项', async () => {
    const wrapper = mount(MatBtnGroup, {
      props: {
        selection: 'single',
        selected: 'one',
        required: true,
      },
      slots: {
        default: () => h(MatBtn, { value: 'one' }, () => '一'),
      },
    });

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('select')).toBeUndefined();
  });

  it('connected 混用子按钮颜色时发出开发警告', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    mount(MatBtnGroup, {
      props: {
        variant: 'connected',
        selection: 'single',
      },
      slots: {
        default: () => [
          h(MatBtn, { color: 'primary', value: 'one' }, () => '一'),
          h(MatBtn, { color: 'secondary', value: 'two' }, () => '二'),
        ],
      },
    });

    expect(warn).toHaveBeenCalledWith('MatBtnGroup: connected 形态中的子按钮应使用相同颜色');
  });

  it('connected fullWidth 等分子按钮并保持独立 Tab 停靠点', () => {
    const wrapper = mount(MatBtnGroup, {
      props: {
        variant: 'connected',
        selection: 'multiple',
        selected: [],
        fullWidth: true,
      },
      slots: {
        default: () => [
          h(MatBtn, { value: 'one' }, () => '一'),
          h(MatBtn, {
            icon: 'looks_two',
            label: '二',
            value: 'two',
          }),
        ],
      },
    });

    wrapper.findAll('button').forEach((button) => {
      expect(button.attributes('tabindex')).toBeUndefined();
    });
  });
});
