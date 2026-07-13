export const BUTTON_SIZES = ['xs', 's', 'm', 'l', 'xl'];
export const BUTTON_SHAPES = ['round', 'square'];
export const BUTTON_TYPES = ['button', 'submit', 'reset'];
export const COMPONENT_COLORS = ['primary', 'secondary', 'tertiary', 'error'];

/**
 * 判断值是否为组件支持的语义色或六位十六进制种子色。
 *
 * @param {unknown} value
 * @returns {boolean}
 */
export function isComponentColor(value) {
  return value === undefined
    || COMPONENT_COLORS.includes(value)
    || (typeof value === 'string' && /^#[\da-f]{6}$/i.test(value));
}
