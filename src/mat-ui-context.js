export const DEFAULT_TOOLTIP_OPTIONS = Object.freeze({
  openDelay: 0,
  skipDelayDuration: 0,
});

export const DEFAULT_MAT_UI_OPTIONS = Object.freeze({
  iconClass: 'material-symbols-outlined',
  useCursor: false,
  defaults: Object.freeze({
    tooltip: DEFAULT_TOOLTIP_OPTIONS,
  }),
});

const MAT_UI_KEY = Symbol('mde-vue-options');

/**
 * 由 PascalCase 组件导出名推导 defaults 键名。
 *
 * 示例：`MatBtn` -> `btn`，`MatTextField` -> `textField`。
 *
 * @param {string} name
 * @returns {string}
 */
export function matComponentKey(name) {
  return name.replace(/^Mat/, '').replace(/^./, (char) => char.toLowerCase());
}

export default MAT_UI_KEY;
