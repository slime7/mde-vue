import { inject } from 'vue';
import MatBtn from './components/mat-btn/MatBtn.vue';
import MatBtnGroup from './components/mat-btn-group/MatBtnGroup.vue';
import MatFab from './components/mat-fab/MatFab.vue';
import MatIcon from './components/mat-icon/MatIcon.vue';
import MatSplitBtn from './components/mat-split-btn/MatSplitBtn.vue';
import MatCard from './components/mat-card/MatCard.vue';
import MatCardActionArea from './components/mat-card/MatCardActionArea.vue';
import MatCardContent from './components/mat-card/MatCardContent.vue';
import MatCardActions from './components/mat-card/MatCardActions.vue';
import MatCardHeadline from './components/mat-card/MatCardHeadline.vue';
import MatCardSubhead from './components/mat-card/MatCardSubhead.vue';
import MatCardMedia from './components/mat-card/MatCardMedia.vue';
import MatList from './components/mat-list/MatList.vue';
import MatListGroup from './components/mat-list-group/MatListGroup.vue';
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
import MatInputBase from './components/MatInputBase.vue';
import MatMenu from './components/mat-menu/MatMenu.vue';
import MatMenuGroup from './components/mat-menu-group/MatMenuGroup.vue';
import MatMenuItem from './components/mat-menu/MatMenuItem.vue';
import MatDialog from './components/mat-dialog/MatDialog.vue';
import MatHover from './components/mat-hover/MatHover.vue';
import MatSpacer from './components/mat-spacer/MatSpacer.vue';
import MatLoader from './components/mat-loader/MatLoader.vue';
import MatTooltip from './components/mat-tooltip/MatTooltip.vue';
import MatSnackbar from './components/mat-snackbar/MatSnackbar.vue';
import MatToolbar from './components/mat-toolbar/MatToolbar.vue';
import MatPanes from './components/mat-panes/MatPanes.vue';
import MatPane from './components/mat-panes/MatPane.vue';
import MatNavigationRail from './components/mat-navigation-rail/MatNavigationRail.vue';
import MatNavigationRailItem from './components/mat-navigation-rail/MatNavigationRailItem.vue';
import { setImperativeContext } from './imperative-context';
import MAT_UI_KEY, { DEFAULT_MAT_UI_OPTIONS } from './mat-ui-context';
import createThemeController from './theme';
import MAT_THEME_KEY from './theme-context';
import { Intersection } from './directives/intersection';

const GLOBAL_COMPONENTS = [
  ['MatBtn', 'mat-btn', MatBtn],
  ['MatBtnGroup', 'mat-btn-group', MatBtnGroup],
  ['MatFab', 'mat-fab', MatFab],
  ['MatIcon', 'mat-icon', MatIcon],
  ['MatSplitBtn', 'mat-split-btn', MatSplitBtn],
  ['MatCard', 'mat-card', MatCard],
  ['MatCardActionArea', 'mat-card-action-area', MatCardActionArea],
  ['MatCardContent', 'mat-card-content', MatCardContent],
  ['MatCardActions', 'mat-card-actions', MatCardActions],
  ['MatCardHeadline', 'mat-card-headline', MatCardHeadline],
  ['MatCardSubhead', 'mat-card-subhead', MatCardSubhead],
  ['MatCardMedia', 'mat-card-media', MatCardMedia],
  ['MatList', 'mat-list', MatList],
  ['MatListGroup', 'mat-list-group', MatListGroup],
  ['MatListItem', 'mat-list-item', MatListItem],
  ['MatDivider', 'mat-divider', MatDivider],
  ['MatCheckbox', 'mat-checkbox', MatCheckbox],
  ['MatRadio', 'mat-radio', MatRadio],
  ['MatRadioGroup', 'mat-radio-group', MatRadioGroup],
  ['MatSwitch', 'mat-switch', MatSwitch],
  ['MatSlider', 'mat-slider', MatSlider],
  ['MatRangeSlider', 'mat-range-slider', MatRangeSlider],
  ['MatTextField', 'mat-text-field', MatTextField],
  ['MatTextarea', 'mat-textarea', MatTextarea],
  ['MatInputBase', 'mat-input-base', MatInputBase],
  ['MatMenu', 'mat-menu', MatMenu],
  ['MatMenuGroup', 'mat-menu-group', MatMenuGroup],
  ['MatMenuItem', 'mat-menu-item', MatMenuItem],
  ['MatDialog', 'mat-dialog', MatDialog],
  ['MatHover', 'mat-hover', MatHover],
  ['MatSpacer', 'mat-spacer', MatSpacer],
  ['MatLoader', 'mat-loader', MatLoader],
  ['MatTooltip', 'mat-tooltip', MatTooltip],
  ['MatSnackbar', 'mat-snackbar', MatSnackbar],
  ['MatToolbar', 'mat-toolbar', MatToolbar],
  ['MatPanes', 'mat-panes', MatPanes],
  ['MatPane', 'mat-pane', MatPane],
  ['MatNavigationRail', 'mat-navigation-rail', MatNavigationRail],
  ['MatNavigationRailItem', 'mat-navigation-rail-item', MatNavigationRailItem],
];

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
      GLOBAL_COMPONENTS.forEach(([pascalName, kebabName, component]) => {
        app.component(pascalName, component);
        app.component(kebabName, component);
      });
      app.directive('intersection', Intersection);
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
