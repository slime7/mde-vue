/**
 * Bottom sheet 档位与拖动几何计算。
 *
 * 内部模块，不加入公共入口。把拖动几何换算成 min、normal、max 三档高度，
 * 并按松手时的可见高度解析落点；关闭分区高度为 0，低于它与 min 的中点即关闭。
 */

/** min 档固定高度，单位为 CSS px，与 --mat-sheet-min-block-size 保持一致。 */
export const MIN_BLOCK_SIZE = 64;

/** 判定向下甩动所需的最小位移，单位为 CSS px。 */
export const FLICK_DISTANCE = 20;

/** 判定向下甩动所需的最小速度，单位为 px/ms。 */
export const FLICK_VELOCITY = 0.35;

/** 具名档位，其余取值按自定义高度处理。 */
const NAMED_EXTENTS = ['min', 'normal', 'max'];

/**
 * 计算 min、normal、max 三档高度。
 *
 * normal 取内容完整高度与可用高度一半的较小值，max 取内容完整高度并以可用
 * 高度封顶；两者都不低于 min，保证档位随高度递增。
 *
 * @param {{ availableExtent: number, contentExtent: number }} geometry
 * @returns {{ max: number, min: number, normal: number }}
 */
export function resolveBottomSheetTiers({ availableExtent, contentExtent }) {
  const available = Math.max(0, availableExtent);
  const content = Math.max(0, contentExtent);
  const min = MIN_BLOCK_SIZE;
  const normal = Math.max(min, Math.min(content, available / 2));

  return {
    max: Math.max(normal, Math.min(content, available)),
    min,
    normal,
  };
}

/**
 * 解析拖动结束后吸附到的档位。
 *
 * 候选档位按高度升序排列，相邻档位以中点为分界。当前值不是 min、normal、
 * max 时额外加入当前可见高度，避免从 full 或自定义高度小幅拖动就跳档。
 *
 * @param {{ availableExtent: number, contentExtent: number, currentExtent: number, currentValue: unknown }} geometry
 * @param {number} extent 松手时的可见高度
 * @returns {{ close: boolean, size: number, value: unknown }}
 */
export function resolveBottomSheetDragTarget(geometry, extent) {
  const tiers = resolveBottomSheetTiers(geometry);
  const zones = [
    { size: 0, value: null },
    { size: tiers.min, value: 'min' },
    { size: tiers.normal, value: 'normal' },
    { size: tiers.max, value: 'max' },
  ];

  if (!NAMED_EXTENTS.includes(geometry.currentValue)) {
    zones.push({
      size: Math.max(0, geometry.currentExtent),
      value: geometry.currentValue,
    });
  }

  zones.sort((left, right) => left.size - right.size);

  const boundary = zones.findIndex((zone, index) => (
    index > 0 && extent < (zones[index - 1].size + zone.size) / 2
  ));
  const selected = boundary === -1 ? zones.at(-1) : zones[boundary - 1];

  return {
    close: selected.value === null,
    size: selected.size,
    value: selected.value,
  };
}

/**
 * 计算折叠档跟手拖动时的面板尺寸与整体偏移。
 *
 * 向下拖动先把面板缩到 min，越过后固定 min 高度、改用偏移继续下滑；向上
 * 拖动最多放大到可用高度，超过部分不再跟手。
 *
 * @param {{ availableExtent: number, extent: number }} geometry
 * @returns {{ offset: number, size: number }}
 */
export function resolveBottomSheetDragGeometry({ availableExtent, extent }) {
  return {
    offset: Math.max(0, MIN_BLOCK_SIZE - extent),
    size: Math.min(Math.max(0, availableExtent), Math.max(MIN_BLOCK_SIZE, extent)),
  };
}

/**
 * 计算虚拟预览拖动时的整体偏移。
 *
 * 面板保持已布局高度，只把下半部分移出屏幕，可见高度因此等于传入的
 * visibleExtent，最小为 0、最大为面板高度。
 *
 * @param {{ panelExtent: number, visibleExtent: number }} geometry
 * @returns {number}
 */
export function resolveBottomSheetPreviewOffset({ panelExtent, visibleExtent }) {
  const panel = Math.max(0, panelExtent);

  return Math.min(panel, Math.max(0, panel - visibleExtent));
}

/**
 * 判断松手动作是否为向下甩动。
 *
 * @param {{ distance: number, draggingDown: boolean, velocity: number }} input
 * @returns {boolean}
 */
export function isBottomSheetFlick({ distance, draggingDown, velocity }) {
  return draggingDown && distance >= FLICK_DISTANCE && velocity >= FLICK_VELOCITY;
}
