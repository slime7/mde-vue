export const BUTTON_SIZES = [
  'extra-small',
  'small',
  'medium',
  'large',
  'extra-large',
];
export const BUTTON_SHAPES = ['round', 'square'];
export const BUTTON_TYPES = ['button', 'submit', 'reset'];
export const COMPONENT_COLORS = ['primary', 'secondary', 'tertiary', 'error'];
export const SYSTEM_COLOR_ROLES = [
  'primary-container',
  'secondary-container',
  'tertiary-container',
  'error-container',
  'surface',
  'surface-dim',
  'surface-bright',
  'surface-variant',
  'surface-container-lowest',
  'surface-container-low',
  'surface-container',
  'surface-container-high',
  'surface-container-highest',
];
export const SYSTEM_COLOR_CONTENT = {
  'primary-container': 'on-primary-container',
  'secondary-container': 'on-secondary-container',
  'tertiary-container': 'on-tertiary-container',
  'error-container': 'on-error-container',
  surface: 'on-surface',
  'surface-dim': 'on-surface',
  'surface-bright': 'on-surface',
  'surface-variant': 'on-surface-variant',
  'surface-container-lowest': 'on-surface',
  'surface-container-low': 'on-surface',
  'surface-container': 'on-surface',
  'surface-container-high': 'on-surface',
  'surface-container-highest': 'on-surface',
};

/**
 * 判断值是否为组件支持的语义色、系统颜色角色或六位十六进制种子色。
 *
 * @param {unknown} value
 * @returns {boolean}
 */
export function isComponentColor(value) {
  return value === undefined
    || COMPONENT_COLORS.includes(value)
    || SYSTEM_COLOR_ROLES.includes(value)
    || (typeof value === 'string' && /^#[\da-f]{6}$/i.test(value));
}
