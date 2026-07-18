export const FAB_SIZES = ['small', 'medium', 'large'];

export const FAB_COLORS = [
  'primary',
  'secondary',
  'tertiary',
  'primary-container',
  'secondary-container',
  'tertiary-container',
  'error',
  'error-container',
];

export const FAB_TYPES = ['button', 'submit', 'reset'];

/**
 * 判断值是否为 FAB 支持的 Material 3 颜色角色。
 *
 * @param {unknown} value 待检查的颜色角色。
 * @returns {boolean} 值有效时返回 true。
 */
export function isFabColor(value) {
  return typeof value === 'string' && FAB_COLORS.includes(value);
}
