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
const loaderShapeExampleSource = readFileSync(
  resolve('docs/site/examples/loader/LoaderShapeExample.vue'),
  'utf8',
);
const loaderThicknessExampleSource = readFileSync(
  resolve('docs/site/examples/loader/LoaderThicknessExample.vue'),
  'utf8',
);
const loaderWaveMotionExampleSource = readFileSync(
  resolve('docs/site/examples/loader/LoaderWaveMotionExample.vue'),
  'utf8',
);

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
    expect(wrapper.find('.mat-loader__linear-indeterminate-track').exists()).toBe(true);
    expect(wrapper.findAll('.mat-loader__linear-indicator')).toHaveLength(1);
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
    expect(linear.find('.mat-loader__linear-active').exists()).toBe(true);
  });

  it('进度为 0 时由 SVG 圆口直接绘制起点圆点', () => {
    const linear = mount(MatLoader, {
      props: {
        value: 0,
      },
    });
    const circular = mount(MatLoader, {
      props: {
        value: 0,
        variant: 'circular',
      },
    });

    expect(linear.find('.mat-loader__linear-active').element.tagName).toBe('path');
    expect(circular.find('.mat-loader__circular-start-dot').exists()).toBe(false);
    expect(circular.find('.mat-loader__circular-active').attributes('style')).toContain(
      'stroke-dasharray: 0.001 200',
    );
    expect(componentSource).toMatch(/\.mat-loader__linear-active,[\s\S]*?stroke-linecap: round;/);
  });

  it('在线性和环形确定进度中为圆口轨道保留 4px 视觉间隙', () => {
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
    const circularTrackStyle = circular.find('.mat-loader__circular-track').attributes('style');

    expect(linear.attributes('style')).toContain('--mat-loader-indicator-gap-size: 4px');
    expect(componentSource).toMatch(/\.mat-loader__linear-track--after \{[\s\S]*?\) 0;/);
    expect(componentSource).not.toContain('--mat-loader-linear-track-end-space');
    expect(circularTrackStyle).toContain('stroke-dasharray: 35.853 64.147');
    expect(circularTrackStyle).toContain('stroke-dashoffset: -57.074');
    expect(componentSource).toMatch(/\.mat-loader__circular-track,[\s\S]*?stroke-linecap: round;/);
    expect(componentSource).toMatch(/\.mat-loader__circular-track,[\s\S]*?stroke-linejoin: round;/);
  });

  it('在线性和环形不确定进度中让轨道跟随活动段保留动态断口', () => {
    const linear = mount(MatLoader, {
      props: {
        indeterminate: true,
      },
    });
    const circular = mount(MatLoader, {
      props: {
        indeterminate: true,
        variant: 'circular',
      },
    });

    expect(linear.find('.mat-loader__linear-gap--primary').exists()).toBe(true);
    expect(linear.find('.mat-loader__linear-gap--secondary').exists()).toBe(true);
    expect(linear.find('.mat-loader__linear-indeterminate-track').attributes('mask')).toMatch(
      /^url\(#mat-loader-linear-mask-/,
    );
    expect(componentSource).toContain('stroke-width: calc(var(--mat-loader-thickness) + (var(--mat-loader-indicator-gap-size) * 2))');
    expect(componentSource).toMatch(/\.mat-loader--indeterminate \.mat-loader__circular-track \{[\s\S]*?stroke-dasharray:/);
    expect(componentSource).toMatch(/\.mat-loader--indeterminate \.mat-loader__circular-track \{[\s\S]*?--mat-loader-circular-gap-progress/);
    expect(componentSource).toMatch(/\.mat-loader--indeterminate \.mat-loader__circular-track,[\s\S]*?\.mat-loader--indeterminate \.mat-loader__circular-active \{[\s\S]*?transition: opacity[^;]+stroke-width[^;]+;/);
    expect(circular.attributes('style')).toContain('--mat-loader-circular-gap-progress:');
  });

  it('使用单条 SVG 活动路径让波峰逐渐收平，而不是交叉填色', () => {
    const linear = mount(MatLoader);
    const circular = mount(MatLoader, {
      props: {
        variant: 'circular',
      },
    });

    expect(linear.findAll('.mat-loader__linear-active')).toHaveLength(1);
    expect(circular.findAll('.mat-loader__circular-active')).toHaveLength(1);
    expect(componentSource).toContain('waveMorphProgress');
    expect(componentSource).toContain('LINEAR_WAVE_AMPLITUDE * waveMorphProgress.value');
    expect(componentSource).not.toContain('.mat-loader__linear-flat');
    expect(componentSource).not.toContain('.mat-loader__linear-wave');
  });

  it('波浪运动默认关闭，并可通过 waveMotion 显式开启', () => {
    const still = mount(MatLoader, {
      props: {
        shape: 'wavy',
      },
    });
    const moving = mount(MatLoader, {
      props: {
        shape: 'wavy',
        waveMotion: true,
      },
    });

    expect(MatLoader.props.waveMotion.default).toBe(false);
    expect(still.classes()).not.toContain('mat-loader--wave-motion');
    expect(moving.classes()).toContain('mat-loader--wave-motion');
    expect(componentSource).toContain('wavePhase.value +=');
    expect(componentSource).toContain('Math.sin(pathPhase - phase)');
    expect(componentSource).not.toContain('scaleY(');
  });

  it('线性不确定状态使用 Material Web 的双段平移与伸缩动画', () => {
    const wrapper = mount(MatLoader, {
      props: {
        indeterminate: true,
      },
    });

    expect(wrapper.findAll('.mat-loader__linear-indicator')).toHaveLength(1);
    expect(wrapper.findAll('.mat-loader__linear-active--primary')).toHaveLength(1);
    expect(wrapper.findAll('.mat-loader__linear-active--secondary')).toHaveLength(1);
    expect(componentSource).toContain('@keyframes mat-loader-primary-indeterminate-translate');
    expect(componentSource).toContain('@keyframes mat-loader-primary-indeterminate-scale');
    expect(componentSource).toContain('@keyframes mat-loader-secondary-indeterminate-translate');
    expect(componentSource).toContain('@keyframes mat-loader-secondary-indeterminate-scale');
    expect(componentSource).toContain('translateX(200.611%)');
    expect(componentSource).toContain('stroke-dasharray: 66.1479 200');
    expect(componentSource).toContain('stroke-dasharray: 72.796 200');
  });

  it('环形不确定状态组合官方的弧长伸缩、分段旋转和匀速旋转', () => {
    const wrapper = mount(MatLoader, {
      props: {
        indeterminate: true,
        variant: 'circular',
      },
    });

    expect(wrapper.find('.mat-loader__circular-linear-rotate').exists()).toBe(true);
    expect(wrapper.find('.mat-loader__circular-rotate-arc').exists()).toBe(true);
    expect(componentSource).toContain('@keyframes mat-loader-circular-expand-active-arc');
    expect(componentSource).toContain('@keyframes mat-loader-circular-rotate-arc');
    expect(componentSource).toContain('@keyframes mat-loader-circular-linear-rotate');
    expect(componentSource).toContain('transform: rotate(1080deg)');
    expect(componentSource).toContain('animation-duration: 1333ms');
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
    expect(componentSource).toMatch(/\.mat-loader__linear-track--after \{[\s\S]*?\) 0;/);
    expect(componentSource).toMatch(/\.mat-loader__linear-stop \{[\s\S]*?inset-inline-end: 0;/);
  });

  it('Loader 示例使用项目自带按钮组、按钮和开关', () => {
    expect(loaderShapeExampleSource).toContain('<mat-btn-group');
    expect(loaderShapeExampleSource).toContain('<mat-btn value="flat">');
    expect(loaderThicknessExampleSource).toContain('<mat-btn-group');
    expect(loaderThicknessExampleSource).toContain('<mat-btn :value="4">');
    expect(loaderWaveMotionExampleSource).toContain('<mat-switch v-model="waveMotion">');
    expect(loaderShapeExampleSource).not.toContain('<button');
    expect(loaderThicknessExampleSource).not.toContain('<button');
    expect(loaderWaveMotionExampleSource).not.toContain('<input');
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
    expect(stylesSource).toContain('--mat-loader-indicator-gap-size: 4px');
  });
});
