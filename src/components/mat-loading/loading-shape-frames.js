/**
 * Loading Indicator 的同拓扑形状帧数据。
 *
 * 数据从 MatShape 的 7 个共享 shape() 轮廓一次性采样为相同数量的闭合点列，供
 * CSS clip-path: polygon() keyframes 连续插值。通用采样与对齐工具来自 shape-morph.js，
 * 本模块只保留 Loading 循环专属的起点偏移与受控模式帧。
 */
import {
  alignOutlineStart,
  rotateOutline,
  sampleShapeOutline,
} from '../shape-morph';
import {
  LOADING_SHAPE_NAMES,
  SHAPE_PATHS,
} from '../mat-shape/shape-paths';

const LOADING_SHAPE_ROTATION_STEP = 90;
const DETERMINATE_LOADING_SHAPE_START_ROTATION = 18;
const DETERMINATE_LOADING_SHAPE_POINT_OFFSET = 53;
const FRAME_POINT_OFFSETS = Object.freeze([0, 82, 82, 70, 58, 46, 70]);

/** @type {ReadonlyArray<ReadonlyArray<Point>>} */
const LOADING_SHAPE_FRAMES = Object.freeze(
  LOADING_SHAPE_NAMES.map((name, index) => (
    alignOutlineStart(sampleShapeOutline(SHAPE_PATHS[name]), FRAME_POINT_OFFSETS[index])
  )),
);

/** @type {ReadonlyArray<ReadonlyArray<Point>>} */
const LOADING_SHAPE_ANIMATION_FRAMES = Object.freeze([
  ...LOADING_SHAPE_FRAMES,
  LOADING_SHAPE_FRAMES[0],
]);

/** @type {ReadonlyArray<ReadonlyArray<Point>>} */
const DETERMINATE_LOADING_SHAPE_FRAMES = Object.freeze([
  alignOutlineStart(
    rotateOutline(
      sampleShapeOutline(SHAPE_PATHS.circle),
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
export { formatOutlinePolygon as formatLoadingPolygon } from '../shape-morph';

/**
 * @typedef {[number, number]} Point
 */
