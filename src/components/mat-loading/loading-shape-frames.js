/**
 * Loading Indicator 的同拓扑形状帧数据。
 *
 * 数据从 MatShape 的 7 个共享 shape() 轮廓一次性采样为相同数量的闭合点列，供
 * CSS clip-path: polygon() keyframes 连续插值。运行时不解析或修改 MatShape 的路径。
 */
import {
  LOADING_SHAPE_NAMES,
  SHAPE_PATHS,
} from '../mat-shape/shape-paths';

const CURVE_SAMPLE_STEP = 48;
const MORPH_POINT_COUNT = 96;
const LOADING_SHAPE_ROTATION_STEP = 90;
const DETERMINATE_LOADING_SHAPE_START_ROTATION = 18;
const DETERMINATE_LOADING_SHAPE_POINT_OFFSET = 53;
const FRAME_POINT_OFFSETS = Object.freeze([0, 82, 82, 70, 58, 46, 70]);
const NUMBER_PATTERN = '[-+]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:[eE][-+]?\\d+)?';
const START_PATTERN = new RegExp(
  `^shape\\(from\\s+(${NUMBER_PATTERN})%\\s+(${NUMBER_PATTERN})%`,
);
const CURVE_PATTERN = new RegExp(
  `curve\\s+to\\s+(${NUMBER_PATTERN})%\\s+(${NUMBER_PATTERN})%`
    + `\\s+with\\s+(${NUMBER_PATTERN})%\\s+(${NUMBER_PATTERN})%`
    + `\\s*/\\s*(${NUMBER_PATTERN})%\\s+(${NUMBER_PATTERN})%`,
  'g',
);

/**
 * @typedef {[number, number]} Point
 */

/**
 * @param {number} value
 * @param {string} context
 * @returns {number}
 */
function assertFinite(value, context) {
  if (!Number.isFinite(value)) {
    throw new Error(`Loading shape generation produced a non-finite value: ${context}`);
  }

  return value;
}

/**
 * @param {Point} point
 * @param {string} context
 * @returns {Point}
 */
function assertFinitePoint(point, context) {
  return [
    assertFinite(point[0], `${context}.x`),
    assertFinite(point[1], `${context}.y`),
  ];
}

/**
 * @param {string} path
 * @returns {{start: Point, curves: Array<{from: Point, controlStart: Point, controlEnd: Point, to: Point}>}}
 */
function parseShapePath(path) {
  const startMatch = START_PATTERN.exec(path);

  if (startMatch === null) {
    throw new Error(`Loading shape path has an invalid start point: ${path}`);
  }

  const start = assertFinitePoint([
    Number(startMatch[1]),
    Number(startMatch[2]),
  ], 'start');
  const curves = [];
  let from = start;
  const curvePattern = new RegExp(CURVE_PATTERN.source, 'g');
  let match = curvePattern.exec(path);

  while (match !== null) {
    const controlStart = assertFinitePoint([
      Number(match[3]),
      Number(match[4]),
    ], 'controlStart');
    const controlEnd = assertFinitePoint([
      Number(match[5]),
      Number(match[6]),
    ], 'controlEnd');
    const to = assertFinitePoint([
      Number(match[1]),
      Number(match[2]),
    ], 'to');

    curves.push({
      from,
      controlStart,
      controlEnd,
      to,
    });
    from = to;
    match = curvePattern.exec(path);
  }

  if (curves.length === 0) {
    throw new Error(`Loading shape path has no curves: ${path}`);
  }

  return { start, curves };
}

/**
 * @param {{from: Point, controlStart: Point, controlEnd: Point, to: Point}} curve
 * @param {number} step
 * @returns {Point[]}
 */
function sampleCurve(curve, step) {
  const points = [];

  for (let index = 0; index <= step; index += 1) {
    const t = index / step;
    const inverse = 1 - t;
    const x = (inverse ** 3 * curve.from[0])
      + (3 * inverse * inverse * t * curve.controlStart[0])
      + (3 * inverse * t * t * curve.controlEnd[0])
      + (t ** 3 * curve.to[0]);
    const y = (inverse ** 3 * curve.from[1])
      + (3 * inverse * inverse * t * curve.controlStart[1])
      + (3 * inverse * t * t * curve.controlEnd[1])
      + (t ** 3 * curve.to[1]);

    points.push(assertFinitePoint([x, y], `curve point ${index}`));
  }

  return points;
}

/**
 * @param {Point} from
 * @param {Point} to
 * @returns {number}
 */
function distance(from, to) {
  return Math.hypot(to[0] - from[0], to[1] - from[1]);
}

/**
 * @param {Point[]} points
 * @param {number} count
 * @returns {Point[]}
 */
function resampleClosedPath(points, count) {
  if (points.length < 2) {
    throw new Error('Loading shape path needs at least two points');
  }

  const closedPoints = [...points, points[0]];
  const cumulativeLengths = [0];

  for (let index = 1; index < closedPoints.length; index += 1) {
    cumulativeLengths.push(
      assertFinite(
        cumulativeLengths[index - 1] + distance(closedPoints[index - 1], closedPoints[index]),
        `path length ${index}`,
      ),
    );
  }

  const totalLength = cumulativeLengths.at(-1);

  if (!Number.isFinite(totalLength) || totalLength <= 0) {
    throw new Error('Loading shape path has no measurable perimeter');
  }

  const result = [];
  let segmentIndex = 0;

  for (let index = 0; index < count; index += 1) {
    const targetLength = (totalLength * index) / count;

    while (segmentIndex < points.length - 1
      && cumulativeLengths[segmentIndex + 1] < targetLength) {
      segmentIndex += 1;
    }

    const segmentStart = cumulativeLengths[segmentIndex];
    const segmentEnd = cumulativeLengths[segmentIndex + 1];
    const segmentProgress = segmentEnd === segmentStart
      ? 0
      : (targetLength - segmentStart) / (segmentEnd - segmentStart);
    const from = closedPoints[segmentIndex];
    const to = closedPoints[segmentIndex + 1];

    result.push(assertFinitePoint([
      from[0] + ((to[0] - from[0]) * segmentProgress),
      from[1] + ((to[1] - from[1]) * segmentProgress),
    ], `resampled point ${index}`));
  }

  return result;
}

/**
 * @param {Point} first
 * @param {Point} second
 * @returns {boolean}
 */
function samePoint(first, second) {
  return Math.abs(first[0] - second[0]) < 0.000001
    && Math.abs(first[1] - second[1]) < 0.000001;
}

/**
 * @param {string} path
 * @returns {Point[]}
 */
function sampleShape(path) {
  const { start, curves } = parseShapePath(path);
  const points = [start];

  curves.forEach((curve) => {
    points.push(...sampleCurve(curve, CURVE_SAMPLE_STEP).slice(1));
  });

  if (samePoint(points[0], points.at(-1))) {
    points.pop();
  }

  return Object.freeze(
    resampleClosedPath(points, MORPH_POINT_COUNT)
      .map((point) => Object.freeze(point)),
  );
}

/**
 * 对齐循环中相邻轮廓的采样起点，减少轮廓特征沿边界滑动。
 *
 * @param {Point[]} points
 * @param {number} offset
 * @returns {ReadonlyArray<Point>}
 */
function alignFrame(points, offset) {
  return Object.freeze(
    points.map((_, index) => points[(index + offset) % points.length]),
  );
}

/**
 * @param {Point[]} points
 * @param {number} degrees
 * @returns {ReadonlyArray<Point>}
 */
function rotateFrame(points, degrees) {
  const radians = (degrees * Math.PI) / 180;
  const cosine = Math.cos(radians);
  const sine = Math.sin(radians);

  return Object.freeze(
    points.map((point, index) => Object.freeze(assertFinitePoint([
      50 + (((point[0] - 50) * cosine) - ((point[1] - 50) * sine)),
      50 + (((point[0] - 50) * sine) + ((point[1] - 50) * cosine)),
    ], `rotated point ${index}`))),
  );
}

/**
 * @param {Point} point
 * @returns {string}
 */
function formatPoint(point) {
  const x = assertFinite(point[0], 'formatted point x');
  const y = assertFinite(point[1], 'formatted point y');

  const formatPercentage = (value) => {
    const formatted = Number(value.toFixed(3)).toString();

    if (formatted.startsWith('-0.')) {
      return `-${formatted.slice(2)}`;
    }

    if (formatted.startsWith('0.')) {
      return formatted.slice(1);
    }

    return formatted;
  };

  return `${formatPercentage(x)}% ${formatPercentage(y)}%`;
}

/**
 * 把固定拓扑的轮廓点列转换为 CSS polygon()。
 *
 * @param {Point[]} points
 * @returns {string}
 */
export function formatLoadingPolygon(points) {
  if (points.length !== MORPH_POINT_COUNT) {
    throw new Error(`Loading shape frame must contain ${MORPH_POINT_COUNT} points`);
  }

  return `polygon(${points.map(formatPoint).join(', ')})`;
}

/** @type {ReadonlyArray<ReadonlyArray<Point>>} */
const LOADING_SHAPE_FRAMES = Object.freeze(
  LOADING_SHAPE_NAMES.map((name, index) => (
    alignFrame(sampleShape(SHAPE_PATHS[name]), FRAME_POINT_OFFSETS[index])
  )),
);

/** @type {ReadonlyArray<ReadonlyArray<Point>>} */
const LOADING_SHAPE_ANIMATION_FRAMES = Object.freeze([
  ...LOADING_SHAPE_FRAMES,
  LOADING_SHAPE_FRAMES[0],
]);

/** @type {ReadonlyArray<ReadonlyArray<Point>>} */
const DETERMINATE_LOADING_SHAPE_FRAMES = Object.freeze([
  alignFrame(
    rotateFrame(
      sampleShape(SHAPE_PATHS.circle),
      DETERMINATE_LOADING_SHAPE_START_ROTATION,
    ),
    DETERMINATE_LOADING_SHAPE_POINT_OFFSET,
  ),
  LOADING_SHAPE_FRAMES[0],
]);

export {
  DETERMINATE_LOADING_SHAPE_FRAMES,
  LOADING_SHAPE_ANIMATION_FRAMES,
  LOADING_SHAPE_FRAMES,
  LOADING_SHAPE_NAMES,
  LOADING_SHAPE_ROTATION_STEP,
};
