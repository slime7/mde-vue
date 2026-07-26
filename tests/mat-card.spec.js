import { mount } from '@vue/test-utils';
import {
  h,
} from 'vue';
import {
  describe, expect, it, vi,
} from 'vitest';
import {
  MatCard, MatCardActionArea, MatCardActions, MatCardContent,
} from '../src';

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
