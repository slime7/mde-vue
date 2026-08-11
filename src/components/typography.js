export const TYPOGRAPHY_TYPES = Object.freeze([
  'display',
  'headline',
  'title',
  'body',
  'label',
]);

export const TYPOGRAPHY_SIZES = Object.freeze(['large', 'medium', 'small']);

export const TYPOGRAPHY_SIZE_ALIASES = Object.freeze({
  L: 'large',
  M: 'medium',
  S: 'small',
});

/**
 * @param {unknown} value
 * @returns {boolean}
 */
export function isTypographyType(value) {
  return TYPOGRAPHY_TYPES.includes(value);
}

/**
 * @param {unknown} value
 * @returns {boolean}
 */
export function isTypographySize(value) {
  return TYPOGRAPHY_SIZES.includes(value)
    || Object.hasOwn(TYPOGRAPHY_SIZE_ALIASES, value);
}

/**
 * @param {string} value
 * @returns {string}
 */
export function normalizeTypographySize(value) {
  return TYPOGRAPHY_SIZE_ALIASES[value] ?? value;
}

/**
 * @param {string} type
 * @param {string} size
 * @param {boolean} [emphasized]
 * @returns {string}
 */
export function getTypographyClass(type, size, emphasized = false) {
  return [
    'mat-sys-typescale',
    emphasized ? 'emphasized' : undefined,
    type,
    normalizeTypographySize(size),
  ].filter(Boolean).join('-');
}
