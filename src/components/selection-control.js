/**
 * @param {unknown} value
 * @returns {value is string | number | boolean}
 */
export function isSelectionValue(value) {
  return ['string', 'number', 'boolean'].includes(typeof value);
}

/**
 * @param {unknown} value
 * @returns {value is boolean | Array<string | number | boolean>}
 */
export function isCheckboxModelValue(value) {
  return typeof value === 'boolean'
    || (Array.isArray(value) && value.every(isSelectionValue));
}
