import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { MatLoader } from '../src';

const componentSource = readFileSync(
  resolve('src/components/mat-loader/MatLoader.vue'),
  'utf8',
);
const stylesSource = readFileSync(resolve('src/styles/index.css'), 'utf8');

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
    expect(wrapper.classes()).toContain('mat-loader');
    expect(wrapper.classes()).toContain('mat-loader--linear');
    expect(wrapper.find('.mat-loader__linear').exists()).toBe(true);
    expect(wrapper.attributes('style')).toContain('--mat-loader-progress: 25');
  });

  it('indeterminate 状态不暴露具体进度，并使用不确定动画类', () => {
    const wrapper = mount(MatLoader, {
      props: {
        indeterminate: true,
      },
    });

    expect(wrapper.attributes('aria-valuenow')).toBeUndefined();
    expect(wrapper.classes()).toContain('mat-loader--indeterminate');
    expect(wrapper.find('.mat-loader__active').classes()).toContain('mat-loader__active--indeterminate');
  });

  it('根据官方示例尺寸计算环形与波浪线容器', () => {
    const circular = mount(MatLoader, {
      props: {
        shape: 'wavy',
        thickness: 8,
        variant: 'circular',
      },
    });
    const linear = mount(MatLoader, {
      props: {
        shape: 'wavy',
        thickness: 8,
      },
    });

    expect(circular.classes()).toEqual(expect.arrayContaining([
      'mat-loader--circular',
      'mat-loader--wavy',
    ]));
    expect(circular.find('.mat-loader__circular').exists()).toBe(true);
    expect(circular.attributes('style')).toContain('--mat-loader-circular-size: 52px');
    expect(linear.attributes('style')).toContain('--mat-loader-linear-size: 14px');
    expect(linear.find('.mat-loader__linear-wave').exists()).toBe(true);
  });

  it('仅在线性确定进度末端显示停止指示器', () => {
    const linear = mount(MatLoader, {
      props: {
        value: 0.5,
      },
    });
    const circular = mount(MatLoader, {
      props: {
        value: 0.5,
        variant: 'circular',
      },
    });

    expect(linear.find('.mat-loader__linear-stop').exists()).toBe(true);
    expect(circular.find('.mat-loader__circular-stop').exists()).toBe(false);
  });

  it('无论轨道厚度如何，停止指示器均保持官方规定的 4px', () => {
    const wrapper = mount(MatLoader, {
      props: {
        thickness: 8,
      },
    });

    expect(wrapper.attributes('style')).toContain('--mat-loader-stop-indicator-size: 4px');
    expect(componentSource).toContain('inline-size: var(--mat-loader-stop-indicator-size)');
  });

  it('限制确定进度到 0 至 max，并支持语义色和局部种子色', () => {
    const clamped = mount(MatLoader, {
      props: {
        max: 2,
        value: 8,
      },
    });
    const semantic = mount(MatLoader, {
      props: {
        color: 'tertiary',
      },
    });
    const seeded = mount(MatLoader, {
      props: {
        color: '#6750a4',
      },
    });

    expect(clamped.attributes('aria-valuenow')).toBe('2');
    expect(clamped.attributes('style')).toContain('--mat-loader-progress: 100');
    expect(semantic.attributes('style')).toContain('--mat-accent-color: var(--mat-sys-color-tertiary)');
    expect(seeded.attributes('style')).toMatch(/--mat-accent-color: light-dark\(/);
  });

  it('校验规格规定的变体、形状和正数厚度', () => {
    expect(MatLoader.props.variant.validator('linear')).toBe(true);
    expect(MatLoader.props.variant.validator('circular')).toBe(true);
    expect(MatLoader.props.variant.validator('radial')).toBe(false);
    expect(MatLoader.props.shape.validator('flat')).toBe(true);
    expect(MatLoader.props.shape.validator('wavy')).toBe(true);
    expect(MatLoader.props.shape.validator('round')).toBe(false);
    expect(MatLoader.props.thickness.validator(4)).toBe(true);
    expect(MatLoader.props.thickness.validator(0)).toBe(false);
    expect(MatLoader.props.max.validator(0)).toBe(false);
  });

  it('使用块级根元素、系统颜色和减少动画偏好', () => {
    expect(componentSource).toMatch(/\.mat-loader \{[\s\S]*?display: block;/);
    expect(componentSource).toContain('var(--mat-sys-color-secondary-container)');
    expect(componentSource).toContain('var(--mat-sys-color-primary)');
    expect(componentSource).toContain('@media (prefers-reduced-motion: reduce)');
    expect(stylesSource).toContain('--mat-loader-thickness: 4px');
    expect(stylesSource).toContain('--mat-loader-linear-size: 4px');
    expect(stylesSource).toContain('--mat-loader-circular-size: 40px');
  });
});
