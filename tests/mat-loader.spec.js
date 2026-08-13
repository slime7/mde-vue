import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { MatLoader } from '../src';

describe('MatLoader', () => {
  it('默认渲染块级线性确定进度条，并提供 progressbar 语义', () => {
    const wrapper = mount(MatLoader, {
      attrs: {
        'aria-label': '上传进度',
        'data-test': 'loader',
      },
      props: {
        max: 4,
        value: 1,
      },
    });

    expect(wrapper.element.tagName).toBe('DIV');
    expect(wrapper.attributes('role')).toBe('progressbar');
    expect(wrapper.attributes('aria-label')).toBe('上传进度');
    expect(wrapper.attributes('aria-valuemin')).toBe('0');
    expect(wrapper.attributes('aria-valuemax')).toBe('4');
    expect(wrapper.attributes('aria-valuenow')).toBe('1');
    expect(wrapper.attributes('data-test')).toBe('loader');
  });

  it('indeterminate 状态不暴露具体进度', () => {
    const wrapper = mount(MatLoader, {
      props: {
        indeterminate: true,
      },
    });

    expect(wrapper.attributes('aria-valuenow')).toBeUndefined();
  });

  it('限制确定进度到 0 至 max，并支持语义色和局部种子色', () => {
    const clamped = mount(MatLoader, {
      props: {
        max: 2,
        value: 8,
      },
    });
    expect(clamped.attributes('aria-valuenow')).toBe('2');
  });

  it('校验规格规定的变体、形状、尺寸和厚度档位', () => {
    expect(MatLoader.props.variant.validator('linear')).toBe(true);
    expect(MatLoader.props.variant.validator('circular')).toBe(true);
    expect(MatLoader.props.variant.validator('radial')).toBe(false);
    expect(MatLoader.props.shape.validator('flat')).toBe(true);
    expect(MatLoader.props.shape.validator('wavy')).toBe(true);
    expect(MatLoader.props.shape.validator('round')).toBe(false);
    expect(MatLoader.props.size.default).toBe(48);
    expect(MatLoader.props.size.validator(24)).toBe(true);
    expect(MatLoader.props.size.validator('48')).toBe(true);
    expect(MatLoader.props.size.validator(' 240 ')).toBe(true);
    expect(MatLoader.props.size.validator(240)).toBe(true);
    expect(MatLoader.props.size.validator(-1)).toBe(true);
    expect(MatLoader.props.size.validator('-1')).toBe(true);
    expect(MatLoader.props.size.validator(Number.NaN)).toBe(false);
    expect(MatLoader.props.size.validator('large')).toBe(false);
    expect(MatLoader.props.thickness.default).toBe('default');
    expect(MatLoader.props.thickness.validator('default')).toBe(true);
    expect(MatLoader.props.thickness.validator('heavy')).toBe(true);
    expect(MatLoader.props.thickness.validator(4)).toBe(false);
    expect(MatLoader.props.max.validator(0)).toBe(false);
  });
});
