import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { MatProgress } from '../../src';

/**
 * 用受控时间戳驱动 requestAnimationFrame，便于确定性地推进波浪动画。
 * 每一帧执行后等待一次渲染提交，onFrame 里读到的是当帧更新后的 DOM。
 *
 * @returns {{
 *   flush: (options?: {count?: number, step?: number, onFrame?: () => void}) => Promise<void>,
 *   pendingCount: () => number,
 * }}
 */
function stubAnimationFrames() {
  const queue = new Map();
  let nextId = 1;
  let now = 0;

  vi.stubGlobal('requestAnimationFrame', (callback) => {
    const id = nextId;
    nextId += 1;
    queue.set(id, callback);
    return id;
  });
  vi.stubGlobal('cancelAnimationFrame', (id) => {
    queue.delete(id);
  });

  return {
    /**
     * @param {{count?: number, step?: number, onFrame?: () => void}} [options]
     * @param {number} [options.count] 帧数
     * @param {number} [options.step] 每帧间隔（毫秒）
     * @param {() => void} [options.onFrame] 每帧渲染提交后的读取回调
     * @returns {Promise<void>}
     */
    flush({ count = 1, step = 15, onFrame } = {}) {
      let chain = Promise.resolve();

      for (let frame = 0; frame < count; frame += 1) {
        now += step;
        const frameTime = now;

        chain = chain.then(() => {
          const callbacks = [...queue.values()];

          queue.clear();
          callbacks.forEach((callback) => callback(frameTime));

          return nextTick().then(() => onFrame?.());
        });
      }

      return chain;
    },
    pendingCount: () => queue.size,
  };
}

/**
 * @param {Element} path
 * @returns {Array<[number, number]>}
 */
function readPathPoints(path) {
  const tokens = path.getAttribute('d').split(' ');
  const points = [];

  for (let index = 0; index < tokens.length; index += 1) {
    if (tokens[index] === 'M' || tokens[index] === 'L') {
      points.push([Number(tokens[index + 1]), Number(tokens[index + 2])]);
    }
  }

  return points;
}

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

  it('环形尺寸钳制在官方规格的 24px 下限，支持紧凑场景的最小档', () => {
    const compact = mount(MatProgress, {
      props: {
        variant: 'circular',
        size: 24,
      },
    });
    expect(compact.find('svg').attributes('viewBox')).toBe('0 0 24 24');

    const smaller = mount(MatProgress, {
      props: {
        variant: 'circular',
        size: 8,
      },
    });
    expect(smaller.find('svg').attributes('viewBox')).toBe('0 0 24 24');
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

  it('waveMotion 流动时直线波浪起点随波形移动，不再固定在中线', async () => {
    const frames = stubAnimationFrames();
    const wrapper = mount(MatProgress, {
      props: {
        shape: 'wavy',
        waveMotion: true,
      },
    });
    const path = wrapper.find('path');
    const center = Number(wrapper.find('svg').attributes('height')) / 2;
    let maxDisplacement = 0;
    let previousStartY = Number.NaN;
    let startMoved = false;

    const trackStartPoint = () => {
      const [, startY] = readPathPoints(path.element)[0];

      maxDisplacement = Math.max(maxDisplacement, Math.abs(startY - center));
      if (startY !== previousStartY) {
        startMoved = true;
      }
      previousStartY = startY;
    };

    await frames.flush({ count: 70, onFrame: trackStartPoint });

    expect(maxDisplacement).toBeGreaterThan(2.9);
    expect(startMoved).toBe(true);
  });

  it('直线形状切换按弯曲振幅过渡，容器高度同步且动画收敛', async () => {
    const frames = stubAnimationFrames();
    const wrapper = mount(MatProgress, {
      props: {
        shape: 'flat',
      },
    });
    const path = wrapper.find('path');
    const svg = wrapper.find('svg');

    await wrapper.setProps({ shape: 'wavy' });
    await frames.flush({ count: 11 });

    const midCenter = Number(svg.attributes('height')) / 2;
    const midAmplitude = Math.max(
      ...readPathPoints(path.element).map(([, y]) => Math.abs(y - midCenter)),
    );

    expect(midAmplitude).toBeCloseTo(1.5, 5);
    expect(Number(svg.attributes('height'))).toBe(7);

    await frames.flush({ count: 30 });

    const finalCenter = Number(svg.attributes('height')) / 2;
    const finalAmplitude = Math.max(
      ...readPathPoints(path.element).map(([, y]) => Math.abs(y - finalCenter)),
    );
    const settledPath = path.element.getAttribute('d');

    expect(finalAmplitude).toBeCloseTo(3, 5);
    expect(Number(svg.attributes('height'))).toBe(10);
    expect(frames.pendingCount()).toBe(0);

    await frames.flush({ count: 5 });
    expect(path.element.getAttribute('d')).toBe(settledPath);
  });

  it('环形波浪按角度循环，相位流动中路径首尾保持闭合', async () => {
    const frames = stubAnimationFrames();
    const wrapper = mount(MatProgress, {
      props: {
        variant: 'circular',
        shape: 'wavy',
        waveMotion: true,
      },
    });
    const path = wrapper.find('path');
    const observedStartXs = new Set();

    const checkClosure = () => {
      const tokens = path.element.getAttribute('d').split(' ');

      expect(tokens[tokens.length - 1]).toBe('Z');
      expect(tokens[1]).toBe(tokens[tokens.length - 3]);
      expect(tokens[2]).toBe(tokens[tokens.length - 2]);
      observedStartXs.add(tokens[1]);
    };

    await frames.flush({ count: 12 });
    checkClosure();
    await frames.flush({ count: 28 });
    checkClosure();
    await frames.flush({ count: 30 });
    checkClosure();

    expect(observedStartXs.size).toBeGreaterThan(1);
  });
});
