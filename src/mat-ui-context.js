export const DEFAULT_TOOLTIP_OPTIONS = Object.freeze({
  openDelay: 0,
  skipDelayDuration: 0,
});

export const DEFAULT_MAT_UI_OPTIONS = Object.freeze({
  iconClass: 'material-symbols-outlined',
  tooltip: DEFAULT_TOOLTIP_OPTIONS,
  useCursor: false,
});

const MAT_UI_KEY = Symbol('mde-vue-options');

export default MAT_UI_KEY;
