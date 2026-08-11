import { mount } from '@vue/test-utils';
import {
  describe, expect, it, vi,
} from 'vitest';
import { MatText } from '../src';

describe('MatText', () => {
  it('默认渲染 body medium 的 span', () => {
    const wrapper = mount(MatText, {
      slots: { default: '正文内容' },
    });

    expect(wrapper.element.tagName).toBe('SPAN');
    expect(wrapper.text()).toBe('正文内容');
    expect(wrapper.classes()).toContain('mat-sys-typescale-body-medium');
  });

  it('组合文字类型、尺寸和 emphasized 样式', async () => {
    const wrapper = mount(MatText, {
      props: {
        type: 'display',
        size: 'large',
        emphasized: true,
      },
    });

    expect(wrapper.classes()).toContain('mat-sys-typescale-emphasized-display-large');

    await wrapper.setProps({
      type: 'label',
      size: 'small',
      emphasized: false,
    });

    expect(wrapper.classes()).toContain('mat-sys-typescale-label-small');
    expect(wrapper.classes()).not.toContain('mat-sys-typescale-emphasized-display-large');
  });

  it('替换根标签并透传原生属性和事件', async () => {
    const handleClick = vi.fn();
    const wrapper = mount(MatText, {
      props: { as: 'h2' },
      attrs: {
        id: 'section-title',
        onClick: handleClick,
      },
      slots: { default: '章节标题' },
    });

    expect(wrapper.element.tagName).toBe('H2');
    expect(wrapper.attributes('id')).toBe('section-title');

    await wrapper.trigger('click');

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('只接受已支持的类型、尺寸和 HTML 标签名', () => {
    expect(MatText.props.type.validator('headline')).toBe(true);
    expect(MatText.props.type.validator('caption')).toBe(false);
    expect(MatText.props.size.validator('medium')).toBe(true);
    expect(MatText.props.size.validator('extra-large')).toBe(false);
    expect(MatText.props.as.validator('strong')).toBe(true);
    expect(MatText.props.as.validator('not a tag')).toBe(false);
  });
});
