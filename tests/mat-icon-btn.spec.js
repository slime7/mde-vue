import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { MatIconBtn } from '../src';

describe('MatIconBtn', () => {
  it('渲染带操作名称和原生提示的图标按钮', () => {
    const wrapper = mount(MatIconBtn, {
      props: {
        label: '收藏',
      },
      slots: {
        default: '☆',
      },
    });

    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.attributes('aria-label')).toBe('收藏');
    expect(wrapper.attributes('title')).toBe('收藏');
    expect(wrapper.text()).toBe('☆');
    expect(wrapper.find('.mat-icon-btn__icon').classes()).not.toContain('mat-icon--material-symbols');
  });

  it('显式 title 优先于 label', () => {
    const wrapper = mount(MatIconBtn, {
      props: {
        label: '收藏',
      },
      attrs: {
        title: '加入收藏夹',
      },
    });

    expect(wrapper.attributes('title')).toBe('加入收藏夹');
  });

  it.each(['narrow', 'default', 'wide'])('支持 %s 宽度', (width) => {
    const wrapper = mount(MatIconBtn, {
      props: {
        label: '更多',
        size: 'extra-large',
        width,
      },
    });

    expect(wrapper.classes()).toContain('mat-icon-btn--size-extra-large');
    expect(wrapper.classes()).toContain(`mat-icon-btn--width-${width}`);
  });

  it('拒绝旧尺寸缩写和 tonal 变体', () => {
    expect(MatIconBtn.props.size.validator('xl')).toBe(false);
    expect(MatIconBtn.props.variant.validator('tonal')).toBe(false);
  });

  it('受控 toggle 使用 selected slot 和 aria-pressed', () => {
    const wrapper = mount(MatIconBtn, {
      props: {
        label: '收藏',
        toggle: true,
        selected: true,
      },
      slots: {
        default: '☆',
        selected: '★',
      },
    });

    expect(wrapper.classes()).toContain('mat-icon-btn--selected');
    expect(wrapper.attributes('aria-pressed')).toBe('true');
    expect(wrapper.text()).toBe('★');
  });
});
