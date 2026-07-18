import { inject } from 'vue';
import MatBtn from './components/mat-btn/MatBtn.vue';
import MatBtnGroup from './components/mat-btn-group/MatBtnGroup.vue';
import MatIcon from './components/mat-icon/MatIcon.vue';
import MatSplitBtn from './components/mat-split-btn/MatSplitBtn.vue';
import MatCard from './components/mat-card/MatCard.vue';
import MatCardActionArea from './components/mat-card/MatCardActionArea.vue';
import MatCardContent from './components/mat-card/MatCardContent.vue';
import MatCardActions from './components/mat-card/MatCardActions.vue';
import MatList from './components/mat-list/MatList.vue';
import MatListItem from './components/mat-list/MatListItem.vue';
import MatDivider from './components/mat-divider/MatDivider.vue';
import MatCheckbox from './components/mat-checkbox/MatCheckbox.vue';
import MatRadio from './components/mat-radio/MatRadio.vue';
import MatRadioGroup from './components/mat-radio-group/MatRadioGroup.vue';
import MatSwitch from './components/mat-switch/MatSwitch.vue';
import MatSlider from './components/mat-slider/MatSlider.vue';
import MatRangeSlider from './components/mat-range-slider/MatRangeSlider.vue';
import MatTextField from './components/mat-text-field/MatTextField.vue';
import MatTextarea from './components/mat-textarea/MatTextarea.vue';
import MatMenu from './components/mat-menu/MatMenu.vue';
import MatMenuGroup from './components/mat-menu-group/MatMenuGroup.vue';
import MatMenuItem from './components/mat-menu/MatMenuItem.vue';
import MatDialog from './components/mat-dialog/MatDialog.vue';
import MatSpacer from './components/mat-spacer/MatSpacer.vue';
import MatLoader from './components/mat-loader/MatLoader.vue';
import MatTooltip from './components/mat-tooltip/MatTooltip.vue';
import MatSnackbar from './components/mat-snackbar/MatSnackbar.vue';
import MatToolbar from './components/mat-toolbar/MatToolbar.vue';
import MatPanes from './components/mat-panes/MatPanes.vue';
import MatPane from './components/mat-panes/MatPane.vue';
import { setImperativeContext } from './imperative-context';
import MAT_UI_KEY, { DEFAULT_MAT_UI_OPTIONS } from './mat-ui-context';
import createThemeController from './theme';
import MAT_THEME_KEY from './theme-context';

/**
 * @typedef {object} MatUiOptions
 * @property {import('./theme.js').MatThemeOptions} [theme]
 * @property {string} [iconClass='material-symbols-outlined']
 * @property {boolean} [useCursor=false]
 */

/**
 * @param {MatUiOptions} options
 * @param {'useCursor'} name
 * @returns {boolean}
 */
function readBooleanOption(options, name) {
  const value = options[name];

  if (value !== undefined && typeof value !== 'boolean') {
    throw new TypeError(`createMatUi ${name} 必须是 boolean`);
  }

  return value ?? false;
}

/**
 * @param {MatUiOptions} options
 * @returns {string}
 */
function readIconClass(options) {
  const value = options.iconClass;

  if (value !== undefined && typeof value !== 'string') {
    throw new TypeError('createMatUi iconClass 必须是 string');
  }

  return value ?? DEFAULT_MAT_UI_OPTIONS.iconClass;
}

/**
 * 建立全局组件插件和对应主题控制器。
 *
 * @param {MatUiOptions} [options]
 * @returns {import('vue').Plugin & { theme: import('./theme.js').MatThemeController }}
 * @throws {TypeError} 选项或选项值类型无效时抛出。
 * @throws {RangeError} 主题对比度超出有效范围时抛出。
 */
export function createMatUi(options = {}) {
  if (!options || typeof options !== 'object' || Array.isArray(options)) {
    throw new TypeError('createMatUi 选项必须是对象');
  }

  const componentOptions = Object.freeze({
    iconClass: readIconClass(options),
    useCursor: readBooleanOption(options, 'useCursor'),
  });
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
      app.component('mat-icon', MatIcon);
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-split-btn', MatSplitBtn);
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-card', MatCard);
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-card-action-area', MatCardActionArea);
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-card-content', MatCardContent);
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-card-actions', MatCardActions);
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-list', MatList);
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-list-item', MatListItem);
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-divider', MatDivider);
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-checkbox', MatCheckbox);
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-radio', MatRadio);
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-radio-group', MatRadioGroup);
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-switch', MatSwitch);
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-slider', MatSlider);
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-range-slider', MatRangeSlider);
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-text-field', MatTextField);
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-textarea', MatTextarea);
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-menu', MatMenu);
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-menu-group', MatMenuGroup);
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-menu-item', MatMenuItem);
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-dialog', MatDialog);
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-spacer', MatSpacer);
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-loader', MatLoader);
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-tooltip', MatTooltip);
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-snackbar', MatSnackbar);
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-toolbar', MatToolbar);
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-panes', MatPanes);
      // eslint-disable-next-line vue/component-definition-name-casing
      app.component('mat-pane', MatPane);
      app.provide(MAT_UI_KEY, componentOptions);
      app.provide(MAT_THEME_KEY, theme);
      setImperativeContext(componentOptions, theme);
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
