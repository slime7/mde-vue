import { DEFAULT_MAT_UI_OPTIONS } from './mat-ui-context';

let componentOptions = DEFAULT_MAT_UI_OPTIONS;
let theme = null;

/**
 * @param {Readonly<{iconClass: string, useCursor: boolean}>} options
 * @param {import('./theme.js').MatThemeController} themeController
 */
export function setImperativeContext(options, themeController) {
  componentOptions = options;
  theme = themeController;
}

export function getImperativeComponentOptions() {
  return componentOptions;
}

export function getImperativeTheme() {
  return theme;
}
