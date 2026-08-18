/**
 * Loading Indicator 的形状变形帧数据。
 *
 * 从 MatShape 共享的 35 个 Material 3 Expressive 形状中选取官方 Loading Indicator
 * 使用的 7 个形状，把归一化三次贝塞尔轮廓按等弧长采样为闭合折线，供运行时逐帧
 * 插值。数据与 shape-paths.js 同源，不引入运行时转换依赖。
 */
import { SHAPE_PATHS } from '../mat-shape/shape-paths';

export const LOADING_SHAPE_NAMES = Object.freeze([
  'soft-burst',
  '9-sided-cookie',
  'pentagon',
  'pill',
  'sunny',
  '4-sided-cookie',
  'oval',
]);

const CURVE_PATTERN = /curve to ([\d.]+)% ([\d.]+)% with ([\d.]+)% ([\d.]+)% \/ ([\d.]+)% ([\d.]+)%/g;
const SAMPLE_STEP = 60;

/**
 * 把单个 shape() 字符串解析为起点和三次贝塞尔曲线列表。
 *
 * @param {string} path
 * @returns {{ start: [number, number], curves: Array<[number, number, number, number, number, number, number, number]> }}
 */
function parseShapePath(path) {
  const startMatch = path.match(/shape\(from ([\d.]+)% ([\d.]+)%/);
  const curves = [];
  let match = CURVE_PATTERN.exec(path);

  while (match !== null) {
    curves.push([
      Number(match[1]), Number(match[2]),
      Number(match[3]), Number(match[4]),
      Number(match[5]), Number(match[6]),
      Number(match[7]), Number(match[8]),
    ]);
    match = CURVE_PATTERN.exec(path);
  }

  return {
    start: [Number(startMatch[1]), Number(startMatch[2])],
    curves,
  };
}

/**
 * 采样一条三次贝塞尔曲线，返回百分比坐标点数组。
 *
 * @param {[number, number, number, number, number, number, number, number]} curve
 * @param {number} step
 * @returns {Array<[number, number]>}
 */
function sampleCurve(curve, step) {
  const points = [];

  for (let index = 0; index <= step; index += 1) {
    const t = index / step;
    const inverse = 1 - t;
    const x = (inverse ** 3 * curve[0])
      + (3 * inverse * inverse * t * curve[2])
      + (3 * inverse * t * t * curve[4])
      + (t ** 3 * curve[6]);
    const y = (inverse ** 3 * curve[1])
      + (3 * inverse * inverse * t * curve[3])
      + (3 * inverse * t * t * curve[5])
      + (t ** 3 * curve[7]);

    points.push([x, y]);
  }

  return points;
}

/**
 * 把形状采样为闭合折线点列（起点追加到末尾，保证端点不重复计数）。
 *
 * @param {string} path
 * @returns {Array<[number, number]>}
 */
function sampleShape(path) {
  const { start, curves } = parseShapePath(path);
  const points = [start];

  curves.forEach((curve) => {
    const samples = sampleCurve(curve, SAMPLE_STEP);

    points.push(...samples.slice(1));
  });

  points.push(start);

  return points;
}

const LOADING_SHAPE_FRAMES = Object.freeze(
  LOADING_SHAPE_NAMES.map((name) => Object.freeze(sampleShape(SHAPE_PATHS[name]))),
);

/**
 * 在相邻两个形状帧之间按进度插值。
 *
 * @param {Array<[number, number]>} from
 * @param {Array<[number, number]>} to
 * @param {number} progress
 * @returns {Array<[number, number]>}
 */
export function interpolateLoadingShapes(from, to, progress) {
  const count = Math.min(from.length, to.length);
  const points = [];

  for (let index = 0; index < count; index += 1) {
    points.push([
      from[index][0] + ((to[index][0] - from[index][0]) * progress),
      from[index][1] + ((to[index][1] - from[index][1]) * progress),
    ]);
  }

  return points;
}

/**
 * 把插值点列转换为 clip-path: shape() 字符串。
 *
 * @param {Array<[number, number]>} points
 * @returns {string}
 */
export function formatLoadingShape(points) {
  const parts = [];

  points.forEach(([x, y], index) => {
    const command = index === 0 ? 'from' : 'curve to';

    parts.push(
      command === 'from'
        ? `${command} ${x.toFixed(2)}% ${y.toFixed(2)}%`
        : `${command} ${x.toFixed(2)}% ${y.toFixed(2)}% with ${x.toFixed(2)}% ${y.toFixed(2)}% / ${x.toFixed(2)}% ${y.toFixed(2)}%`,
    );
  });

  return `shape(${parts.join(', ')}, close)`;
}

export { LOADING_SHAPE_FRAMES };
