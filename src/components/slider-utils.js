export const SLIDER_ORIENTATIONS = Object.freeze(['horizontal', 'vertical']);
export const SLIDER_SIZES = Object.freeze([
  'extra-small',
  'small',
  'medium',
  'large',
  'extra-large',
]);
export const SLIDER_VARIANTS = Object.freeze(['standard', 'centered']);
export const SLIDER_TRACK_END_INSET = 6;

const MAX_DECIMAL_PRECISION = 12;

/**
 * @param {unknown} value
 * @returns {boolean}
 */
export function isFiniteNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

/**
 * @param {unknown} value
 * @returns {boolean}
 */
export function isPositiveNumber(value) {
  return isFiniteNumber(value) && value > 0;
}

/**
 * @param {unknown} value
 * @returns {boolean}
 */
export function isSliderOrientation(value) {
  return SLIDER_ORIENTATIONS.includes(value);
}

/**
 * @param {unknown} value
 * @returns {boolean}
 */
export function isSliderSize(value) {
  return SLIDER_SIZES.includes(value);
}

/**
 * @param {unknown} value
 * @returns {boolean}
 */
export function isSliderVariant(value) {
  return SLIDER_VARIANTS.includes(value);
}

/**
 * @param {unknown} value
 * @returns {boolean}
 */
export function isRangeSliderModelValue(value) {
  return Array.isArray(value)
    && value.length === 2
    && value.every(isFiniteNumber);
}

/**
 * @param {number} value
 * @returns {number}
 */
function getDecimalPrecision(value) {
  const parts = value.toString().match(/(?:\.(\d+))?(?:e([+-]?\d+))?$/i);

  if (!parts) {
    return 0;
  }

  const decimalLength = parts[1]?.length ?? 0;
  const exponent = Number(parts[2] ?? 0);

  return Math.max(0, decimalLength - exponent);
}

/**
 * @param {number} value
 * @param {number} precision
 * @returns {number}
 */
function roundNumber(value, precision) {
  return Number(value.toFixed(Math.min(MAX_DECIMAL_PRECISION, precision)));
}

/**
 * 解析滑块的有效上下界；无效或倒置的 max 会退回为 min 加一。
 *
 * @param {unknown} min
 * @param {unknown} max
 * @returns {{min: number, max: number}}
 */
export function resolveSliderBounds(min, max) {
  const resolvedMin = isFiniteNumber(min) ? min : 0;
  const candidateMax = isFiniteNumber(max) ? max : 100;

  return {
    min: resolvedMin,
    max: candidateMax > resolvedMin ? candidateMax : resolvedMin + 1,
  };
}

/**
 * @param {unknown} step
 * @returns {number}
 */
export function resolveSliderStep(step) {
  return isPositiveNumber(step) ? step : 1;
}

/**
 * @param {number} value
 * @param {{min: number, max: number}} bounds
 * @returns {number}
 */
export function clampSliderValue(value, bounds) {
  return Math.min(Math.max(value, bounds.min), bounds.max);
}

/**
 * 钳制并按步长对齐一个数值。
 *
 * @param {unknown} value
 * @param {{min: number, max: number}} bounds
 * @param {number} step
 * @returns {number}
 */
export function normalizeSliderValue(value, bounds, step) {
  const candidate = isFiniteNumber(value) ? value : bounds.min;
  const clamped = clampSliderValue(candidate, bounds);
  const stepCount = Math.round((clamped - bounds.min) / step);
  const precision = Math.max(
    getDecimalPrecision(bounds.min),
    getDecimalPrecision(bounds.max),
    getDecimalPrecision(step),
  );

  return roundNumber(clampSliderValue(bounds.min + (stepCount * step), bounds), precision);
}

/**
 * @param {unknown} value
 * @param {{min: number, max: number}} bounds
 * @param {number} step
 * @returns {number}
 */
export function resolveSliderCenter(value, bounds, step) {
  const candidate = isFiniteNumber(value)
    ? value
    : (bounds.min + bounds.max) / 2;

  return normalizeSliderValue(candidate, bounds, step);
}

/**
 * @param {number} value
 * @param {{min: number, max: number}} bounds
 * @returns {number}
 */
export function getSliderPercentage(value, bounds) {
  return roundNumber(
    ((clampSliderValue(value, bounds) - bounds.min) / (bounds.max - bounds.min)) * 100,
    3,
  );
}

/**
 * @param {number} value
 * @returns {string}
 */
export function formatSliderNumber(value) {
  return Number(value.toFixed(3)).toString();
}

/**
 * 将数值百分比映射到轨道两端各保留固定空间的可视位置。
 *
 * @param {number} percentage
 * @returns {string}
 */
export function getSliderVisualPosition(percentage) {
  const normalizedPercentage = Math.min(Math.max(percentage, 0), 100);
  const formattedPercentage = formatSliderNumber(normalizedPercentage);
  const offset = roundNumber(
    SLIDER_TRACK_END_INSET * (1 - ((normalizedPercentage * 2) / 100)),
    3,
  );

  if (normalizedPercentage === 0) {
    return `${SLIDER_TRACK_END_INSET}px`;
  }

  if (normalizedPercentage === 100) {
    return `calc(100% - ${SLIDER_TRACK_END_INSET}px)`;
  }

  if (offset === 0) {
    return `${formattedPercentage}%`;
  }

  return `calc(${formattedPercentage}% ${offset > 0 ? '+' : '-'} ${formatSliderNumber(Math.abs(offset))}px)`;
}

/**
 * @param {{min: number, max: number}} bounds
 * @param {number} step
 * @returns {number[]}
 */
export function getSliderStopValues(bounds, step) {
  const count = Math.floor((bounds.max - bounds.min) / step);
  const precision = Math.max(
    getDecimalPrecision(bounds.min),
    getDecimalPrecision(bounds.max),
    getDecimalPrecision(step),
  );

  const values = Array.from(
    { length: count + 1 },
    (_, index) => roundNumber(bounds.min + (index * step), precision),
  );

  if (values.at(-1) !== bounds.max) {
    values.push(bounds.max);
  }

  return values;
}

/**
 * 根据滑轨上的 Pointer Events 坐标解析对应数值。
 *
 * @param {PointerEvent} event
 * @param {HTMLElement} target
 * @param {{min: number, max: number}} bounds
 * @param {number} step
 * @param {'horizontal' | 'vertical'} orientation
 * @returns {number | undefined}
 */
export function getSliderValueFromPointer(
  event,
  target,
  bounds,
  step,
  orientation,
) {
  const rect = target.getBoundingClientRect();
  const coordinate = orientation === 'vertical' ? event.clientY : event.clientX;
  const length = orientation === 'vertical' ? rect.height : rect.width;

  if (!Number.isFinite(coordinate) || length <= 0) {
    return undefined;
  }

  const offset = orientation === 'vertical'
    ? rect.bottom - coordinate
    : coordinate - rect.left;
  const usableLength = length - (SLIDER_TRACK_END_INSET * 2);
  const ratio = usableLength > 0
    ? Math.min(Math.max((offset - SLIDER_TRACK_END_INSET) / usableLength, 0), 1)
    : Math.min(Math.max(offset / length, 0), 1);

  return normalizeSliderValue(
    bounds.min + ((bounds.max - bounds.min) * ratio),
    bounds,
    step,
  );
}

/**
 * @param {number} value
 * @param {string} key
 * @param {{min: number, max: number}} bounds
 * @param {number} step
 * @returns {number | undefined}
 */
export function getSliderValueFromKeyboard(value, key, bounds, step) {
  if (key === 'Home') {
    return bounds.min;
  }

  if (key === 'End') {
    return normalizeSliderValue(bounds.max, bounds, step);
  }

  const multiplier = {
    ArrowDown: -1,
    ArrowLeft: -1,
    ArrowRight: 1,
    ArrowUp: 1,
    PageDown: -10,
    PageUp: 10,
  }[key];

  if (multiplier === undefined) {
    return undefined;
  }

  return normalizeSliderValue(value + (multiplier * step), bounds, step);
}

/**
 * @param {unknown} start
 * @param {unknown} end
 * @param {{min: number, max: number}} bounds
 * @param {number} step
 * @returns {[number, number]}
 */
export function normalizeRangeSliderValue(start, end, bounds, step) {
  const normalizedStart = normalizeSliderValue(start, bounds, step);
  const normalizedEnd = normalizeSliderValue(end, bounds, step);

  return normalizedStart <= normalizedEnd
    ? [normalizedStart, normalizedEnd]
    : [normalizedEnd, normalizedStart];
}
