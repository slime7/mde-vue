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
  DETERMINATE_LOADING_SHAPE_FRAMES,
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

  it('为确定进度生成圆形到 soft-burst 的同拓扑帧', () => {
    expect(DETERMINATE_LOADING_SHAPE_FRAMES).toHaveLength(2);
    expect(DETERMINATE_LOADING_SHAPE_FRAMES[1]).toEqual(LOADING_SHAPE_FRAMES[0]);
    expect(DETERMINATE_LOADING_SHAPE_FRAMES[0]).not.toEqual(DETERMINATE_LOADING_SHAPE_FRAMES[1]);

    const pointCounts = DETERMINATE_LOADING_SHAPE_FRAMES.map((frame) => frame.length);

    expect(new Set(pointCounts).size).toBe(1);
    expect(pointCounts[0]).toBeGreaterThan(32);

    DETERMINATE_LOADING_SHAPE_FRAMES.flat().forEach(([x, y]) => {
      expect(Number.isFinite(x)).toBe(true);
      expect(Number.isFinite(y)).toBe(true);
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(100);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThanOrEqual(100);
    });

    expect(formatLoadingPolygon(DETERMINATE_LOADING_SHAPE_FRAMES[0])).toMatch(/^polygon\(/);
    expect(formatLoadingPolygon(DETERMINATE_LOADING_SHAPE_FRAMES[1])).toMatch(/^polygon\(/);
  });

  it('直接使用 MatShape 的公开属性渲染活动指示器', () => {
    const wrapper = mount(MatLoading);
    const shape = wrapper.findComponent(MatShape);

    expect(shape.props('name')).toBe('soft-burst');
    expect(shape.props('size')).toBe(38);
    expect(shape.props('color')).toBe('primary');
    expect(shape.attributes('style')).toContain('clip-path: shape(');
  });

  it('按受控进度展示圆形到 soft-burst 的端点并追加旋转', async () => {
    const wrapper = mount(MatLoading, {
      props: {
        progress: -1,
      },
    });
    const shape = wrapper.findComponent(MatShape);

    expect(wrapper.attributes('aria-valuenow')).toBe('0');
    expect(shape.props('name')).toBe('circle');
    expect(shape.element.style.rotate).toBe('0deg');

    await wrapper.setProps({ progress: 0.5 });
    expect(wrapper.attributes('aria-valuenow')).toBe('0.5');
    expect(shape.props('name')).toBe('circle');
    expect(shape.element.style.rotate).toBe('-90deg');

    await wrapper.setProps({ progress: 1 });
    expect(wrapper.attributes('aria-valuenow')).toBe('1');
    expect(shape.props('name')).toBe('soft-burst');
    expect(shape.element.style.rotate).toBe('-180deg');

    await wrapper.setProps({ progress: 1.5 });
    expect(wrapper.attributes('aria-valuenow')).toBe('1');
    expect(shape.props('name')).toBe('soft-burst');
    expect(shape.element.style.rotate).toBe('-270deg');
  });

  it('progress 进入受控模式后冻结自动形状，并在移除后恢复自动循环', async () => {
    const callbacks = [];
    const cancelledFrames = [];
    vi.stubGlobal('requestAnimationFrame', (callback) => {
      callbacks.push(callback);
      return callbacks.length;
    });
    vi.stubGlobal('cancelAnimationFrame', (frame) => {
      cancelledFrames.push(frame);
    });

    const wrapper = mount(MatLoading);
    const shape = wrapper.findComponent(MatShape);

    callbacks.shift()(0);
    callbacks.shift()(650);
    await nextTick();
    expect(shape.props('name')).toBe('9-sided-cookie');

    const staleCallback = callbacks.shift();
    await wrapper.setProps({ progress: 0 });
    expect(shape.props('name')).toBe('circle');
    staleCallback?.(2000);
    await nextTick();
    expect(shape.props('name')).toBe('circle');
    expect(cancelledFrames.length).toBeGreaterThan(0);

    await wrapper.setProps({ progress: undefined });
    expect(shape.props('name')).toBe('soft-burst');
    expect(wrapper.attributes('aria-valuenow')).toBeUndefined();
    expect(wrapper.classes()).not.toContain('mat-loading--determinate');
    expect(callbacks).toHaveLength(1);
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
    expect(MatLoading.props.progress.default).toBeUndefined();
    expect(MatLoading.props.progress.type).toBe(Number);
    expect(MatLoading.props.progress.validator(undefined)).toBe(true);
    expect(MatLoading.props.progress.validator(0)).toBe(true);
    expect(MatLoading.props.progress.validator(-1)).toBe(true);
    expect(MatLoading.props.progress.validator(1.5)).toBe(true);
    expect(MatLoading.props.progress.validator(Number.NaN)).toBe(false);
    expect(MatLoading.props.progress.validator(Number.POSITIVE_INFINITY)).toBe(false);
    expect(MatLoading.props.progress.validator('0.5')).toBe(false);
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

  it('减少动态效果时仍显示受控进度并停止自动帧循环', () => {
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

    const wrapper = mount(MatLoading, { props: { progress: 0.5 } });

    expect(wrapper.attributes('aria-valuenow')).toBe('0.5');
    expect(wrapper.findComponent(MatShape).props('name')).toBe('circle');
    expect(wrapper.findComponent(MatShape).element.style.rotate).toBe('-90deg');
    expect(callbacks).toHaveLength(0);
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

    expect(wrapper.classes()).not.toContain('mat-loading--contained');
    expect(contained.classes()).toContain('mat-loading--contained');
    expect(wrapper.findComponent(MatShape).props('size')).toBe(38);
    expect(contained.findComponent(MatShape).props('size')).toBe(38);
  });

  it('color 设置组件级强调色变量并支持与 containment 搭配', () => {
    const wrapper = mount(MatLoading, { props: { color: 'tertiary' } });
    const contained = mount(MatLoading, { props: { color: 'tertiary', containment: true } });

    expect(wrapper.attributes('style')).toContain('--mat-accent-color: var(--mat-sys-color-tertiary)');
    expect(wrapper.classes()).not.toContain('mat-loading--contained');
    expect(contained.attributes('style')).toContain('--mat-accent-color: var(--mat-sys-color-tertiary)');
    expect(contained.classes()).toContain('mat-loading--contained');
  });
});
