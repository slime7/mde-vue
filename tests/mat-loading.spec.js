import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import {
  MatLoading,
  MatShape,
} from '../src';
import {
  formatLoadingPolygon,
  LOADING_SHAPE_ANIMATION_FRAMES,
  LOADING_SHAPE_FRAMES,
  LOADING_SHAPE_NAMES,
  LOADING_SHAPE_ROTATION_STEP,
} from '../src/components/mat-loading/loading-shape-frames';
import { SHAPE_NAMES } from '../src/components/mat-shape/shape-paths';

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

  it('为连续动画预生成相同拓扑且坐标有限的轮廓帧', () => {
    expect(LOADING_SHAPE_FRAMES).toHaveLength(7);
    expect(LOADING_SHAPE_ANIMATION_FRAMES).toHaveLength(8);
    expect(LOADING_SHAPE_ANIMATION_FRAMES.at(-1)).toBe(LOADING_SHAPE_FRAMES[0]);
    expect(LOADING_SHAPE_ROTATION_STEP).toBe(90);

    const pointCounts = LOADING_SHAPE_FRAMES.map((frame) => frame.length);

    expect(new Set(pointCounts).size).toBe(1);
    expect(pointCounts[0]).toBeGreaterThan(32);

    LOADING_SHAPE_FRAMES.flat().forEach(([x, y]) => {
      expect(Number.isFinite(x)).toBe(true);
      expect(Number.isFinite(y)).toBe(true);
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(100);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThanOrEqual(100);
    });

    expect(formatLoadingPolygon(LOADING_SHAPE_FRAMES[0])).toMatch(/^polygon\(/);
  });

  it('直接使用 MatShape 的公开属性渲染活动指示器', () => {
    const wrapper = mount(MatLoading);
    const shape = wrapper.findComponent(MatShape);

    expect(shape.props('name')).toBe('soft-burst');
    expect(shape.props('size')).toBe(48);
    expect(shape.props('color')).toBe('primary');
    expect(shape.attributes('style')).toContain('clip-path: shape(');
  });

  it('按 650ms 间隔切换 MatShape 形状名称', async () => {
    const callbacks = [];
    vi.stubGlobal('requestAnimationFrame', (callback) => {
      callbacks.push(callback);
      return callbacks.length;
    });
    vi.stubGlobal('cancelAnimationFrame', vi.fn());

    const wrapper = mount(MatLoading);
    const shape = wrapper.findComponent(MatShape);

    expect(shape.props('name')).toBe('soft-burst');

    callbacks.shift()(0);
    callbacks.shift()(350);
    await nextTick();
    expect(shape.props('name')).toBe('soft-burst');

    callbacks.shift()(650);
    await nextTick();
    expect(shape.props('name')).toBe('9-sided-cookie');
  });

  it('减少动态效果时保持首个形状并停止帧循环', () => {
    const callbacks = [];
    const reducedMotionQuery = {
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    vi.stubGlobal('matchMedia', () => reducedMotionQuery);
    vi.stubGlobal('requestAnimationFrame', (callback) => {
      callbacks.push(callback);
      return callbacks.length;
    });

    const wrapper = mount(MatLoading);

    expect(wrapper.findComponent(MatShape).props('name')).toBe('soft-burst');
    expect(callbacks).toHaveLength(0);
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
    expect(wrapper.findComponent(MatShape).props('size')).toBe(48);
    expect(contained.findComponent(MatShape).props('size')).toBe(38);
  });
});
