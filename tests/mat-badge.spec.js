import { mount } from '@vue/test-utils';
import { h } from 'vue';
import {
  describe, expect, it, vi,
} from 'vitest';
import { createMatUi, MatBadge } from '../src';

describe('MatBadge', () => {
  it('只在 dot 或有效 content 存在时显示指示器', () => {
    const empty = mount(MatBadge, {
      slots: {
        default: () => h('button', '目标'),
      },
    });
    const zero = mount(MatBadge, {
      props: { content: 0 },
    });
    const blank = mount(MatBadge, {
      props: { content: '' },
    });
    const dot = mount(MatBadge, {
      props: {
        content: '99',
        dot: true,
      },
    });

    expect(empty.text()).toBe('目标');
    expect(empty.find('[aria-hidden="true"]').exists()).toBe(false);
    expect(zero.text()).toBe('0');
    expect(blank.find('[aria-hidden="true"]').exists()).toBe(false);
    expect(dot.text()).not.toContain('99');
    expect(dot.get('[aria-hidden="true"]').attributes('data-dot')).toBe('');
  });

  it('原样显示超长内容', () => {
    const wrapper = mount(MatBadge, {
      props: {
        content: '123456789',
        location: 'inline',
      },
    });

    expect(wrapper.text()).toBe('123456789');
  });

  it('覆盖模式保留 Slot 交互且指示器不接收指针事件', async () => {
    const onClick = vi.fn();
    const onMouseenter = vi.fn();
    const wrapper = mount(MatBadge, {
      attachTo: document.body,
      props: { content: 3 },
      slots: {
        default: () => h('button', {
          onClick,
          onMouseenter,
        }, '通知'),
      },
    });
    const target = wrapper.get('button');

    await target.trigger('click');
    await target.trigger('mouseenter');
    target.element.focus();

    expect(onClick).toHaveBeenCalledOnce();
    expect(onMouseenter).toHaveBeenCalledOnce();
    expect(document.activeElement).toBe(target.element);
  });

  it('支持八个覆盖方位和 inline 模式', () => {
    const locations = [
      'top-start',
      'top',
      'top-end',
      'end',
      'bottom-end',
      'bottom',
      'bottom-start',
      'start',
      'inline',
    ];

    locations.forEach((location) => {
      const wrapper = mount(MatBadge, {
        props: {
          content: 1,
          location,
        },
      });

      expect(wrapper.props('location')).toBe(location);
    });
  });

  it('校验 offset 的逻辑轴 CSS 长度', () => {
    const validOffsets = [
      {},
      { inline: 2 },
      { block: '-0.5rem' },
      { inline: 'calc(100% - 2px)', block: 0 },
    ];

    validOffsets.forEach((offset) => {
      const wrapper = mount(MatBadge, {
        props: {
          content: 1,
          offset,
        },
      });

      expect(wrapper.props('offset')).toEqual(offset);
    });

    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    mount(MatBadge, {
      props: {
        content: 1,
        offset: { inline: Number.NaN },
      },
    });
    mount(MatBadge, {
      props: {
        content: 1,
        offset: { cross: 2 },
      },
    });

    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it('inline 模式忽略 Slot 和 offset，并在空状态不产生 DOM', () => {
    const inline = mount(MatBadge, {
      props: {
        content: 7,
        location: 'inline',
        offset: {
          inline: 20,
          block: 10,
        },
      },
      slots: {
        default: () => h('button', '不会显示'),
      },
    });
    const empty = mount(MatBadge, {
      props: {
        location: 'inline',
      },
      slots: {
        default: () => h('button', '不会显示'),
      },
    });

    expect(inline.text()).toBe('7');
    expect(inline.find('button').exists()).toBe(false);
    expect(inline.attributes('style')).not.toContain('20px');
    expect(inline.attributes('style')).not.toContain('10px');
    expect(empty.find('*').exists()).toBe(false);
  });

  it('读取 defaults.badge，显式属性优先', () => {
    const plugin = createMatUi({
      defaults: {
        badge: {
          color: 'tertiary',
          dot: true,
          location: 'inline',
        },
      },
    });
    const defaults = mount(MatBadge, {
      global: { plugins: [plugin] },
    });
    const explicit = mount(MatBadge, {
      props: {
        content: '新',
        dot: false,
        location: 'inline',
      },
      global: { plugins: [plugin] },
    });

    expect(defaults.props()).toMatchObject({
      color: 'error',
      dot: false,
      location: 'top-end',
    });
    expect(defaults.get('[data-dot]').exists()).toBe(true);
    expect(explicit.text()).toBe('新');
  });
});
