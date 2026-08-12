import { isValidCssLength } from '../value-utils';

export const BADGE_LOCATIONS = [
  'top-start',
  'top',
  'top-end',
  'end',
  'bottom-end',
  'bottom',
  'bottom-start',
  'start',
  'inline',
];

/**
 * @param {unknown} value
 * @returns {boolean}
 */
export function isBadgeOffset(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }

  if (Object.keys(value).some((key) => !['inline', 'block'].includes(key))) {
    return false;
  }

  return ['inline', 'block'].every((key) => isValidCssLength(value[key], {
    property: 'margin',
    allowNegative: true,
  }));
}
