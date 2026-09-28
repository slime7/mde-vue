import { mount } from '@vue/test-utils';
import {
  describe, expect, it, vi,
} from 'vitest';
import { MatContainer } from 'mde-vue';

describe('MatContainer', () => {
  it('渲染默认 Slot，并将原生属性和事件传给铺满父容器的根元素', async () => {
    const handleClick = vi.fn();
    const wrapper = mount(MatContainer, {
      attrs: {
        id: 'page-content',
        class: 'consumer-container',
        onClick: handleClick,
      },
      slots: {
        default: '<p>正文内容</p>',
      },
    });

    expect(wrapper.element.tagName).toBe('DIV');
    expect(wrapper.attributes('id')).toBe('page-content');
    expect(wrapper.text()).toContain('正文内容');

    await wrapper.trigger('click');

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('消费 fluid prop，不将其泄漏为原生属性', () => {
    const wrapper = mount(MatContainer, {
      props: {
        fluid: true,
      },
    });

    expect(wrapper.attributes('fluid')).toBeUndefined();
  });
});
