import { mount } from '@vue/test-utils';
import {
  h,
} from 'vue';
import {
  describe, expect, it, vi,
} from 'vitest';
import {
  MatCard,
  MatCardActionArea,
  MatCardActions,
  MatCardContent,
  MatCardHeadline,
  MatCardMedia,
  MatCardSubhead,
} from '../../src';

describe('MatCard', () => {
  it('默认渲染 filled 容器并支持三种外观与语义根元素', () => {
    const wrapper = mount(MatCard, { props: { as: 'article' }, slots: { default: '内容' } });
    expect(wrapper.element.tagName).toBe('ARTICLE');
    expect(wrapper.text()).toBe('内容');
    expect(MatCard.props.variant.validator('outlined')).toBe(true);
    expect(MatCard.props.variant.validator('custom')).toBe(false);
  });

  it('组织内容、操作区与按钮式 action area', async () => {
    const click = vi.fn();
    const wrapper = mount(MatCard, {
      slots: {
        default: () => [
          h(MatCardActionArea, { onClick: click }, () => h(MatCardContent, null, () => '详情')),
          h(MatCardActions, null, () => '操作'),
        ],
      },
    });
    const action = wrapper.find('button.mat-card-action-area');
    expect(action.exists()).toBe(true);
    expect(wrapper.find('.mat-card-content').text()).toBe('详情');
    expect(wrapper.find('.mat-card-actions').text()).toBe('操作');
    await action.trigger('click');
    expect(click).toHaveBeenCalledOnce();
  });

  it('通过具名 Slot 渲染 headline、subhead 与 media 子部件', () => {
    const wrapper = mount(MatCard, {
      slots: {
        headline: '卡片标题',
        subhead: '卡片副标题',
        media: () => h('img', { alt: '卡片配图', src: '/card.png' }),
        default: () => h(MatCardContent, null, () => '支持文字'),
      },
    });

    expect(wrapper.getComponent(MatCardHeadline).text()).toBe('卡片标题');
    expect(wrapper.getComponent(MatCardSubhead).text()).toBe('卡片副标题');
    expect(wrapper.getComponent(MatCardMedia).get('img').attributes('alt')).toBe('卡片配图');
    expect(wrapper.text()).toContain('支持文字');
  });

  it('允许直接组合 headline、subhead 与 media 子组件', () => {
    const wrapper = mount(MatCard, {
      slots: {
        default: () => [
          h(MatCardMedia, null, () => h('video', { 'aria-label': '预告片' })),
          h(MatCardHeadline, null, () => '直接标题'),
          h(MatCardSubhead, null, () => '直接副标题'),
        ],
      },
    });

    expect(wrapper.getComponent(MatCardHeadline).text()).toBe('直接标题');
    expect(wrapper.getComponent(MatCardSubhead).text()).toBe('直接副标题');
    expect(wrapper.getComponent(MatCardMedia).get('video').attributes('aria-label')).toBe('预告片');
  });

  it('rounded 使用形状令牌后缀，默认 medium', () => {
    const defaultWrapper = mount(MatCard, { slots: { default: '内容' } });

    expect(defaultWrapper.attributes('style'))
      .toContain('border-radius: var(--mat-sys-shape-corner-medium)');

    const largeWrapper = mount(MatCard, {
      props: { rounded: 'large' },
      slots: { default: '内容' },
    });

    expect(largeWrapper.attributes('style'))
      .toContain('border-radius: var(--mat-sys-shape-corner-large)');
  });

  it('rounded 只接受现有形状令牌后缀', () => {
    [
      'none',
      'extra-small',
      'small',
      'medium',
      'large',
      'large-increased',
      'extra-large',
      'extra-large-increased',
      'extra-extra-large',
      'full',
    ].forEach((value) => {
      expect(MatCard.props.rounded.validator(value)).toBe(true);
    });

    ['huge', 'x-large', '12px', ''].forEach((value) => {
      expect(MatCard.props.rounded.validator(value)).toBe(false);
    });
  });

  it('flat 默认关闭，圆角与现有内联样式同时生效', () => {
    const wrapper = mount(MatCard, {
      props: { rounded: 'large', flat: true },
      attrs: { style: 'inline-size: 240px' },
      slots: { default: '内容' },
    });

    expect(MatCard.props.flat.default).toBe(false);
    expect(wrapper.attributes('style')).toContain('inline-size: 240px');
    expect(wrapper.attributes('style'))
      .toContain('border-radius: var(--mat-sys-shape-corner-large)');
  });

  it('action area 支持链接和禁用链接语义', () => {
    const link = mount(MatCardActionArea, { props: { href: '/detail' } });
    const disabled = mount(MatCardActionArea, { props: { href: '/detail', disabled: true } });
    expect(link.element.tagName).toBe('A');
    expect(link.attributes('href')).toBe('/detail');
    expect(disabled.attributes('href')).toBeUndefined();
    expect(disabled.attributes('aria-disabled')).toBe('true');
    expect(disabled.attributes('tabindex')).toBe('-1');
  });
});
