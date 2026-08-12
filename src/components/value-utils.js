/**
 * 组件数值与 CSS 长度属性的统一校验、转换工具。
 *
 * 内部模块，不加入公共入口。规则：
 * - 数字与纯数字字符串（trim 后匹配 `/^-?\d+(\.\d+)?$/`）统一走数字分支；
 * - 其他字符串 trim 后按对应 CSS 属性用 `CSS.supports` 校验，不可用时放行；
 * - 非法值由转换函数回退到默认值，不直接写入样式。
 * - 数值 0 输出为不带单位的 `0`，与项目样式规范一致。
 */

const NUMERIC_STRING = /^-?\d+(\.\d+)?$/;

/**
 * 把数字或纯数字字符串转换为有限数字；其他输入返回 NaN。
 *
 * @param {unknown} value
 * @returns {number}
 */
function toNumber(value) {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : NaN;
  }

  if (typeof value === 'string') {
    const text = value.trim();

    return text && NUMERIC_STRING.test(text) ? Number(text) : NaN;
  }

  return NaN;
}

/**
 * 校验数字或纯数字字符串是否满足数值约束。
 *
 * @param {unknown} value
 * @param {{ positive?: boolean, max?: number }} options
 * @returns {boolean}
 */
function isValidNumber(value, { positive = false, max } = {}) {
  const number = toNumber(value);

  if (!Number.isFinite(number)) {
    return false;
  }

  if (positive ? number <= 0 : number < 0) {
    return false;
  }

  return max === undefined || number <= max;
}

/**
 * 校验非纯数字字符串是否为对应 CSS 属性的合法值。
 *
 * @param {unknown} value
 * @param {string} property
 * @returns {boolean}
 */
function isCssSupported(value, property) {
  if (typeof value !== 'string') {
    return false;
  }

  const cssValue = value.trim();

  if (!cssValue || /[;{}]/.test(cssValue)) {
    return false;
  }

  if (typeof CSS === 'undefined' || typeof CSS.supports !== 'function') {
    return true;
  }

  return CSS.supports(property, cssValue);
}

/**
 * 校验 CSS 长度类属性取值：数字与纯数字字符串走数值约束，
 * 其他字符串按 CSS 属性校验；未提供 property 时字符串一律拒绝。
 *
 * @param {unknown} value
 * @param {{ property?: string, positive?: boolean, max?: number, allowUndefined?: boolean, allowNegative?: boolean }} options
 * @returns {boolean}
 */
export function isValidCssLength(value, {
  property,
  positive = false,
  max,
  allowUndefined = true,
  allowNegative = false,
} = {}) {
  if (value === undefined) {
    return allowUndefined;
  }

  if (typeof value === 'number'
    || (typeof value === 'string' && NUMERIC_STRING.test(value.trim()))) {
    if (allowNegative) {
      const number = toNumber(value);

      return Number.isFinite(number)
        && (max === undefined || number <= max);
    }

    return isValidNumber(value, { positive, max });
  }

  if (typeof value !== 'string' || !property) {
    return false;
  }

  return isCssSupported(value, property);
}

/**
 * 把 CSS 长度属性值转换为样式值：数字或纯数字字符串转 px（0 不带单位），
 * 合法 CSS 字符串 trim 后原样使用；非法值返回 fallback。
 *
 * @param {unknown} value
 * @param {{ property?: string, positive?: boolean, max?: number, fallback?: string, allowNegative?: boolean }} options
 * @returns {string | undefined}
 */
export function toCssLength(value, {
  property,
  positive = false,
  max,
  fallback,
  allowNegative = false,
} = {}) {
  if (isValidCssLength(value, {
    property,
    positive,
    max,
    allowUndefined: false,
    allowNegative,
  })) {
    const number = toNumber(value);

    if (Number.isFinite(number)) {
      return number === 0 ? '0' : `${number}px`;
    }

    return value.trim();
  }

  return fallback;
}

/**
 * 把 CSS 值属性转换为样式值：数字或纯数字字符串转字符串（不加单位），
 * 合法 CSS 字符串 trim 后原样使用；非法值返回 fallback。
 *
 * @param {unknown} value
 * @param {{ property?: string, positive?: boolean, fallback?: string }} options
 * @returns {string | undefined}
 */
export function toCssValue(value, { property, positive = false, fallback } = {}) {
  if (isValidCssLength(value, { property, positive, allowUndefined: false })) {
    const number = toNumber(value);

    if (Number.isFinite(number)) {
      return String(number);
    }

    return value.trim();
  }

  return fallback;
}

/**
 * 校验成对边缘像素值：数字、纯数字字符串或 `{ start?, end? }` 对象。
 *
 * @param {unknown} value
 * @param {{ allowUndefined?: boolean }} options
 * @returns {boolean}
 */
export function isValidEdgeValues(value, { allowUndefined = true } = {}) {
  if (value === undefined) {
    return allowUndefined;
  }

  if (typeof value === 'number'
    || (typeof value === 'string' && NUMERIC_STRING.test(value.trim()))) {
    return isValidNumber(value);
  }

  if (!value || Array.isArray(value)) {
    return false;
  }

  return ['start', 'end'].every((name) => (
    value[name] === undefined || isValidNumber(value[name])
  ));
}

/**
 * 把数字或 `{ start?, end? }` 解析为完整的 `{ start, end }` 数值。
 *
 * @param {unknown} value
 * @param {number} fallback
 * @returns {{ start: number, end: number }}
 */
export function resolveEdgeValues(value, fallback) {
  const number = toNumber(value);

  if (Number.isFinite(number)) {
    return { start: number, end: number };
  }

  /**
   * @param {unknown} member
   * @returns {number}
   */
  function resolve(member) {
    const resolved = toNumber(member);

    return Number.isFinite(resolved) ? resolved : fallback;
  }

  return {
    start: resolve(value?.start ?? fallback),
    end: resolve(value?.end ?? fallback),
  };
}

/**
 * 校验毫秒延迟属性取值。
 *
 * @param {unknown} value
 * @param {{ allowUndefined?: boolean }} options
 * @returns {boolean}
 */
export function isValidMs(value, { allowUndefined = true } = {}) {
  if (value === undefined) {
    return allowUndefined;
  }

  return isValidNumber(value);
}

/**
 * 归一化毫秒延迟；非法或负数返回 fallback。
 *
 * @param {unknown} value
 * @param {number} [fallback]
 * @returns {number}
 */
export function normalizeMs(value, fallback = 0) {
  return isValidNumber(value) ? toNumber(value) : fallback;
}

/**
 * 归一化纯数字属性；字符串同样按数字处理，非法值返回 fallback。
 *
 * @param {unknown} value
 * @param {{ positive?: boolean, fallback?: number }} options
 * @returns {number}
 */
export function normalizeNumber(value, { positive = false, fallback } = {}) {
  return isValidNumber(value, { positive }) ? toNumber(value) : fallback;
}
