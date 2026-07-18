export const TOOLTIP_LOCATIONS = [
  'top',
  'top-start',
  'top-end',
  'right',
  'right-start',
  'right-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
];

const OPPOSITE_SIDES = {
  bottom: 'top',
  left: 'right',
  right: 'left',
  top: 'bottom',
};

/**
 * @param {object} rect
 * @returns {{ bottom: number, height: number, left: number, right: number, top: number, width: number }}
 */
function normalizeRect(rect) {
  const left = Number(rect.left) || 0;
  const top = Number(rect.top) || 0;
  const width = Number.isFinite(Number(rect.width))
    ? Number(rect.width)
    : Math.max(0, (Number(rect.right) || left) - left);
  const height = Number.isFinite(Number(rect.height))
    ? Number(rect.height)
    : Math.max(0, (Number(rect.bottom) || top) - top);

  return {
    bottom: Number.isFinite(Number(rect.bottom)) ? Number(rect.bottom) : top + height,
    height,
    left,
    right: Number.isFinite(Number(rect.right)) ? Number(rect.right) : left + width,
    top,
    width,
  };
}

/**
 * @param {'start' | 'center' | 'end'} alignment
 * @param {{ left: number, right: number, width: number }} target
 * @param {{ width: number }} tooltip
 * @returns {number}
 */
function getHorizontalPosition(alignment, target, tooltip) {
  if (alignment === 'start') {
    return target.left;
  }

  if (alignment === 'end') {
    return target.right - tooltip.width;
  }

  return target.left + ((target.width - tooltip.width) / 2);
}

/**
 * @param {'start' | 'center' | 'end'} alignment
 * @param {{ bottom: number, height: number, top: number }} target
 * @param {{ height: number }} tooltip
 * @returns {number}
 */
function getVerticalPosition(alignment, target, tooltip) {
  if (alignment === 'start') {
    return target.top;
  }

  if (alignment === 'end') {
    return target.bottom - tooltip.height;
  }

  return target.top + ((target.height - tooltip.height) / 2);
}

/**
 * @param {number} value
 * @param {number} minimum
 * @param {number} maximum
 * @returns {number}
 */
function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

/**
 * @param {'top' | 'right' | 'bottom' | 'left'} side
 * @param {{ bottom: number, left: number, right: number, top: number }} target
 * @param {{ height: number, width: number }} viewport
 * @param {number} margin
 * @param {number} gap
 * @returns {number}
 */
function getAvailableSpace(side, target, viewport, margin, gap) {
  if (side === 'top') {
    return target.top - margin - gap;
  }

  if (side === 'bottom') {
    return viewport.height - target.bottom - margin - gap;
  }

  if (side === 'left') {
    return target.left - margin - gap;
  }

  return viewport.width - target.right - margin - gap;
}

/**
 * @param {'top' | 'right' | 'bottom' | 'left'} side
 * @param {'start' | 'center' | 'end'} alignment
 * @param {{ bottom: number, height: number, left: number, right: number, top: number, width: number }} target
 * @param {{ height: number, width: number }} tooltip
 * @param {number} gap
 * @returns {{ left: number, top: number }}
 */
function getBasePosition(side, alignment, target, tooltip, gap) {
  if (side === 'top' || side === 'bottom') {
    return {
      left: getHorizontalPosition(alignment, target, tooltip),
      top: side === 'top'
        ? target.top - tooltip.height - gap
        : target.bottom + gap,
    };
  }

  return {
    left: side === 'left'
      ? target.left - tooltip.width - gap
      : target.right + gap,
    top: getVerticalPosition(alignment, target, tooltip),
  };
}

/**
 * @param {'top' | 'right' | 'bottom' | 'left'} preferredSide
 * @returns {Array<'top' | 'right' | 'bottom' | 'left'>}
 */
function getCandidateSides(preferredSide) {
  return [
    preferredSide,
    OPPOSITE_SIDES[preferredSide],
    ...['top', 'right', 'bottom', 'left'].filter((side) => (
      side !== preferredSide && side !== OPPOSITE_SIDES[preferredSide]
    )),
  ];
}

/**
 * @param {{ left: number, top: number }} position
 * @param {{ height: number, width: number }} tooltip
 * @returns {{ bottom: number, left: number, right: number, top: number }}
 */
function getPositionRect(position, tooltip) {
  return {
    bottom: position.top + tooltip.height,
    left: position.left,
    right: position.left + tooltip.width,
    top: position.top,
  };
}

/**
 * @param {{ bottom: number, left: number, right: number, top: number }} first
 * @param {{ bottom: number, left: number, right: number, top: number }} second
 * @returns {boolean}
 */
function intersects(first, second) {
  return first.left < second.right
    && first.right > second.left
    && first.top < second.bottom
    && first.bottom > second.top;
}

/**
 * @param {'top' | 'right' | 'bottom' | 'left'} side
 * @param {'start' | 'center' | 'end'} alignment
 * @param {{ bottom: number, height: number, left: number, right: number, top: number, width: number }} target
 * @param {{ height: number, width: number }} tooltip
 * @param {{ height: number, width: number }} viewport
 * @param {number} margin
 * @param {number} gap
 * @param {object[]} avoidRects
 * @returns {{ left: number, top: number } | null}
 */
function findClearPosition(
  side,
  alignment,
  target,
  tooltip,
  viewport,
  margin,
  gap,
  avoidRects,
) {
  const basePosition = getBasePosition(side, alignment, target, tooltip, gap);
  const maxLeft = Math.max(margin, viewport.width - tooltip.width - margin);
  const maxTop = Math.max(margin, viewport.height - tooltip.height - margin);
  const position = {
    left: clamp(basePosition.left, margin, maxLeft),
    top: clamp(basePosition.top, margin, maxTop),
  };
  const tooltipPositionRect = getPositionRect(position, tooltip);

  if (intersects(tooltipPositionRect, target)) {
    return null;
  }

  if (avoidRects.some((rect) => intersects(tooltipPositionRect, normalizeRect(rect)))) {
    return null;
  }

  return position;
}

/**
 * 计算 Tooltip 的固定定位坐标，并在主轴不足时翻转、在交叉轴超出时夹紧。
 *
 * @param {object} options
 * @param {object[]} [options.avoidRects=[]]
 * @param {number} [options.gap=4]
 * @param {string} [options.location='top']
 * @param {number} [options.margin=8]
 * @param {object} options.targetRect
 * @param {object} options.tooltipRect
 * @param {{ height: number, width: number }} [options.viewport]
 * @returns {{ left: number, location: string, top: number }}
 */
export function getTooltipPosition({
  avoidRects = [],
  gap = 4,
  location = 'top',
  margin = 8,
  targetRect,
  tooltipRect,
  viewport = {
    height: window.innerHeight,
    width: window.innerWidth,
  },
}) {
  const target = normalizeRect(targetRect);
  const tooltip = normalizeRect(tooltipRect);
  const safeLocation = TOOLTIP_LOCATIONS.includes(location) ? location : 'top';
  const [preferredSide, rawAlignment = 'center'] = safeLocation.split('-');
  const alignment = rawAlignment === 'start' || rawAlignment === 'end'
    ? rawAlignment
    : 'center';
  const tooltipMainSize = preferredSide === 'top' || preferredSide === 'bottom'
    ? tooltip.height
    : tooltip.width;
  const preferredSpace = getAvailableSpace(preferredSide, target, viewport, margin, gap);
  const oppositeSide = OPPOSITE_SIDES[preferredSide];
  const oppositeSpace = getAvailableSpace(oppositeSide, target, viewport, margin, gap);
  const side = tooltipMainSize > preferredSpace && oppositeSpace > preferredSpace
    ? oppositeSide
    : preferredSide;
  const maxLeft = Math.max(margin, viewport.width - tooltip.width - margin);
  const maxTop = Math.max(margin, viewport.height - tooltip.height - margin);
  const candidateSides = getCandidateSides(side);
  const normalizedAvoidRects = avoidRects.map((rect) => normalizeRect(rect));
  const fittingSide = candidateSides.find((candidateSide) => (
    getAvailableSpace(candidateSide, target, viewport, margin, gap)
      >= tooltipMainSize
    && findClearPosition(
      candidateSide,
      alignment,
      target,
      tooltip,
      viewport,
      margin,
      gap,
      normalizedAvoidRects,
    )
  ));
  const clearSide = fittingSide ?? candidateSides.find((candidateSide) => (
    findClearPosition(
      candidateSide,
      alignment,
      target,
      tooltip,
      viewport,
      margin,
      gap,
      normalizedAvoidRects,
    )
  ));
  const appliedSide = clearSide ?? side;
  const appliedLocation = alignment === 'center'
    ? appliedSide
    : `${appliedSide}-${alignment}`;
  const position = getBasePosition(appliedSide, alignment, target, tooltip, gap);

  return {
    left: Math.round(clamp(position.left, margin, maxLeft)),
    location: appliedLocation,
    top: Math.round(clamp(position.top, margin, maxTop)),
  };
}
