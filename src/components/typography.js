export const TYPOGRAPHY_TYPES = Object.freeze([
  'display',
  'headline',
  'title',
  'body',
  'label',
]);

export const TYPOGRAPHY_SIZES = Object.freeze(['large', 'medium', 'small']);

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
  return TYPOGRAPHY_SIZES.includes(value);
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
    size,
  ].filter(Boolean).join('-');
}
