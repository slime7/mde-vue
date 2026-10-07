/*
 * MatShape 与 MatLoading 共享的形状轮廓采样与变形工具。
 */
import { isShapeName, SHAPE_PATHS } from './mat-shape/shape-paths';

/**
 * @typedef {[number, number]} Point
 */

export const MORPH_POINT_COUNT = 96;

const CURVE_SAMPLE_STEP = 48;
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
 * @param {number} value
 * @param {string} context
 * @returns {number}
 */
function assertFinite(value, context) {
  if (!Number.isFinite(value)) {
    throw new Error(`Shape outline sampling produced a non-finite value: ${context}`);
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
    throw new Error(`Shape outline path has an invalid start point: ${path}`);
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
    throw new Error(`Shape outline path has no curves: ${path}`);
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
    throw new Error('Shape outline path needs at least two points');
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
    throw new Error('Shape outline path has no measurable perimeter');
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
 * 把 shape() 路径采样为指定点数的闭合轮廓。
 *
 * @param {string} path
 * @param {number} pointCount
 * @returns {ReadonlyArray<Point>}
 */
export function sampleShapeOutline(path, pointCount = MORPH_POINT_COUNT) {
  const { start, curves } = parseShapePath(path);
  const points = [start];

  curves.forEach((curve) => {
    points.push(...sampleCurve(curve, CURVE_SAMPLE_STEP).slice(1));
  });

  if (samePoint(points[0], points.at(-1))) {
    points.pop();
  }

  return Object.freeze(
    resampleClosedPath(points, pointCount)
      .map((point) => Object.freeze(point)),
  );
}

/**
 * 循环平移轮廓的采样起点。
 *
 * @param {ReadonlyArray<Point>} points
 * @param {number} offset
 * @returns {ReadonlyArray<Point>}
 */
export function alignOutlineStart(points, offset) {
  return Object.freeze(
    points.map((_, index) => points[(index + offset) % points.length]),
  );
}

/**
 * 绕轮廓中心旋转点列。
 *
 * @param {ReadonlyArray<Point>} points
 * @param {number} degrees
 * @returns {ReadonlyArray<Point>}
 */
export function rotateOutline(points, degrees) {
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
 * @param {ReadonlyArray<Point>} points
 * @param {number} pointCount
 * @returns {string}
 */
export function formatOutlinePolygon(points, pointCount = MORPH_POINT_COUNT) {
  if (points.length !== pointCount) {
    throw new Error(`Shape outline frame must contain ${pointCount} points`);
  }

  return `polygon(${points.map(formatPoint).join(', ')})`;
}

/**
 * 把采样起点对齐到轮廓最上方，减少任意两个形状互相变形时轮廓特征沿边界滑动。
 *
 * @param {ReadonlyArray<Point>} points
 * @returns {ReadonlyArray<Point>}
 */
function alignOutlineToTop(points) {
  let topIndex = 0;
  let topY = Number.POSITIVE_INFINITY;

  points.forEach((point, index) => {
    const [, y] = point;

    if (y < topY) {
      topY = y;
      topIndex = index;
    }
  });

  return alignOutlineStart(points, topIndex);
}

const MORPH_OUTLINE_POLYGONS = new Map();

/**
 * 返回形状名对应的变形用 polygon() 字符串；按需采样并复用缓存。
 *
 * @param {string} name
 * @returns {string | undefined} 非法形状名返回 undefined
 */
export function getShapeMorphPolygon(name) {
  if (!isShapeName(name)) {
    return undefined;
  }

  if (!MORPH_OUTLINE_POLYGONS.has(name)) {
    MORPH_OUTLINE_POLYGONS.set(
      name,
      formatOutlinePolygon(alignOutlineToTop(sampleShapeOutline(SHAPE_PATHS[name]))),
    );
  }

  return MORPH_OUTLINE_POLYGONS.get(name);
}
