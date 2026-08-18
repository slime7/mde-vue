import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { MatLoading } from '../src';
import { LOADING_SHAPE_NAMES, SHAPE_NAMES } from '../src/components/mat-shape/shape-paths';

describe('MatLoading', () => {
  it('默认渲染块级不确定加载指示器，并提供 progressbar 语义', () => {
    const wrapper = mount(MatLoading, {
      attrs: {
        'aria-label': '正在加载文章',
        'data-test': 'loading',
      },
    });

    expect(wrapper.element.tagName).toBe('DIV');
    expect(wrapper.attributes('role')).toBe('progressbar');
    expect(wrapper.attributes('aria-label')).toBe('正在加载文章');
    expect(wrapper.attributes('aria-valuemin')).toBe('0');
    expect(wrapper.attributes('aria-valuemax')).toBe('1');
    expect(wrapper.attributes('aria-valuenow')).toBeUndefined();
    expect(wrapper.attributes('data-test')).toBe('loading');
  });

  it('固定使用官方 7 形状循环，且全部来自共享形状图鉴', () => {
    expect(LOADING_SHAPE_NAMES).toHaveLength(7);
    expect(LOADING_SHAPE_NAMES).toEqual([
      'soft-burst',
      '9-sided-cookie',
      'pentagon',
      'pill',
      'sunny',
      '4-sided-cookie',
      'oval',
    ]);
    LOADING_SHAPE_NAMES.forEach((name) => {
      expect(SHAPE_NAMES).toContain(name);
    });
  });

  it('校验 containment、尺寸和配色输入', () => {
    expect(MatLoading.props.containment.default).toBe(false);
    expect(MatLoading.props.containment.type).toBe(Boolean);
    expect(MatLoading.props.size.default).toBe(48);
    expect(MatLoading.props.size.validator(24)).toBe(true);
    expect(MatLoading.props.size.validator('48')).toBe(true);
    expect(MatLoading.props.size.validator(' 240 ')).toBe(true);
    expect(MatLoading.props.size.validator(240)).toBe(true);
    expect(MatLoading.props.size.validator(23)).toBe(true);
    expect(MatLoading.props.size.validator('23')).toBe(true);
    expect(MatLoading.props.size.validator(241)).toBe(true);
    expect(MatLoading.props.size.validator('large')).toBe(false);
    expect(MatLoading.props.color.validator('primary')).toBe(true);
    expect(MatLoading.props.color.validator('primary-container')).toBe(true);
    expect(MatLoading.props.color.validator('#6750a4')).toBe(true);
    expect(MatLoading.props.color.validator('on-primary')).toBe(false);
  });

  it('尺寸同步到可见布局，并把越界数值钳制到官方 24 至 240 范围', () => {
    const wrapper = mount(MatLoading, { props: { size: 56 } });

    expect(wrapper.attributes('style')).toContain('--mat-loading-size: 56px');

    const clamped = mount(MatLoading, { props: { size: 20 } });
    expect(clamped.attributes('style')).toContain('--mat-loading-size: 24px');
  });

  it('containment 控制可见背景容器', () => {
    const wrapper = mount(MatLoading);
    const contained = mount(MatLoading, { props: { containment: true } });

    expect(wrapper.attributes('style')).not.toContain('--mat-loading-container-color');
    expect(contained.attributes('style')).toContain('--mat-loading-container-color');
  });
});
