import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { MatProgress } from '../src';

describe('MatProgress', () => {
  it('默认渲染块级线性确定进度条，并提供 progressbar 语义', () => {
    const wrapper = mount(MatProgress, {
      attrs: {
        'aria-label': '上传进度',
        'data-test': 'progress',
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
    expect(wrapper.attributes('data-test')).toBe('progress');
  });

  it('indeterminate 状态不暴露具体进度', () => {
    const wrapper = mount(MatProgress, {
      props: {
        indeterminate: true,
      },
    });

    expect(wrapper.attributes('aria-valuenow')).toBeUndefined();
  });

  it('限制确定进度到 0 至 max', () => {
    const clamped = mount(MatProgress, {
      props: {
        max: 2,
        value: 8,
      },
    });
    expect(clamped.attributes('aria-valuenow')).toBe('2');
  });

  it('校验规格规定的变体、形状、尺寸和粗细档位', () => {
    expect(MatProgress.props.variant.validator('linear')).toBe(true);
    expect(MatProgress.props.variant.validator('circular')).toBe(true);
    expect(MatProgress.props.variant.validator('radial')).toBe(false);
    expect(MatProgress.props.shape.validator('flat')).toBe(true);
    expect(MatProgress.props.shape.validator('wavy')).toBe(true);
    expect(MatProgress.props.shape.validator('round')).toBe(false);
    expect(MatProgress.props.size.default).toBe(48);
    expect(MatProgress.props.size.validator(24)).toBe(true);
    expect(MatProgress.props.size.validator('48')).toBe(true);
    expect(MatProgress.props.size.validator(' 240 ')).toBe(true);
    expect(MatProgress.props.size.validator(240)).toBe(true);
    expect(MatProgress.props.size.validator(-1)).toBe(true);
    expect(MatProgress.props.size.validator('-1')).toBe(true);
    expect(MatProgress.props.size.validator(Number.NaN)).toBe(false);
    expect(MatProgress.props.size.validator('large')).toBe(false);
    expect(MatProgress.props.thickness.default).toBe('default');
    expect(MatProgress.props.thickness.validator('default')).toBe(true);
    expect(MatProgress.props.thickness.validator('heavy')).toBe(true);
    expect(MatProgress.props.thickness.validator(4)).toBe(false);
    expect(MatProgress.props.max.validator(0)).toBe(false);
  });
});
