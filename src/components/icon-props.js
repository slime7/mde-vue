export const ICON_SIZES = Object.freeze({
  small: { fontSize: '20px', opticalSize: 20 },
  medium: { fontSize: '24px', opticalSize: 24 },
  large: { fontSize: '40px', opticalSize: 40 },
  'extra-large': { fontSize: '48px', opticalSize: 48 },
});

const CSS_LENGTH_PATTERN = /^(?:(?:\d+(?:\.\d+)?|\.\d+)(?:cap|ch|cm|cqb|cqh|cqi|cqmax|cqmin|cqw|dvb|dvh|dvi|dvw|em|ex|ic|in|lh|lvb|lvh|lvi|lvw|mm|pc|pt|px|q|rem|rlh|svb|svh|svi|svw|vb|vh|vi|vmax|vmin|vw|%)|(?:calc|clamp|max|min|var)\(.+\))$/i;

/**
 * @param {unknown} value
 * @returns {boolean}
 */
export function isIconSize(value) {
  return typeof value === 'string'
    && (Object.hasOwn(ICON_SIZES, value) || CSS_LENGTH_PATTERN.test(value));
}

/**
 * @param {unknown} value
 * @returns {boolean}
 */
export function isHtmlTagName(value) {
  return typeof value === 'string' && /^[a-z][\w-]*$/i.test(value);
}

/**
 * @param {unknown} value
 * @returns {boolean}
 */
export function isUnitInterval(value) {
  return typeof value === 'number' && value >= 0 && value <= 1;
}

/**
 * @param {unknown} value
 * @returns {boolean}
 */
export function isWeight(value) {
  return typeof value === 'number' && value >= 100 && value <= 700;
}

/**
 * @param {unknown} value
 * @returns {boolean}
 */
export function isGrade(value) {
  return typeof value === 'number' && value >= -50 && value <= 200;
}

/**
 * @param {unknown} value
 * @returns {boolean}
 */
export function isOpticalSize(value) {
  return value === undefined
    || (typeof value === 'number' && value >= 20 && value <= 48);
}
