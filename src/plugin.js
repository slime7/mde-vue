import { inject } from 'vue';
import MatBtn from './components/mat-btn/MatBtn.vue';
import MatBtnGroup from './components/mat-btn-group/MatBtnGroup.vue';
import MatIconBtn from './components/mat-icon-btn/MatIconBtn.vue';
import MatSplitBtn from './components/mat-split-btn/MatSplitBtn.vue';
import createThemeController from './theme';
import MAT_THEME_KEY from './theme-context';

/**
 * @typedef {object} MatUiOptions
 * @property {import('./theme.js').MatThemeOptions} [theme]
 */

/**
 * 建立全局组件插件和对应主题控制器。
 *
 * @param {MatUiOptions} [options]
 * @returns {import('vue').Plugin & { theme: import('./theme.js').MatThemeController }}
 */
export function createMatUi(options = {}) {
  if (!options || typeof options !== 'object' || Array.isArray(options)) {
    throw new TypeError('createMatUi 选项必须是对象');
  }

  const theme = createThemeController(options.theme);

  return {
    theme,
    install(app) {
      // 公共标签遵循 mat-* 命名约定。
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-btn', MatBtn);
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-btn-group', MatBtnGroup);
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-icon-btn', MatIconBtn);
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-split-btn', MatSplitBtn);
      app.provide(MAT_THEME_KEY, theme);
    },
  };
}

/**
 * 获取由 createMatUi() 提供的主题控制器。
 *
 * @returns {import('./theme.js').MatThemeController}
 */
export function useMatTheme() {
  const theme = inject(MAT_THEME_KEY, null);

  if (!theme) {
    throw new Error('useMatTheme() 必须在已安装 mdu-ui 插件的 Vue 应用中调用');
  }

  return theme;
}
