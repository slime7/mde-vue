import { inject } from 'vue';
import COMPONENT_MANIFEST from './component-manifest';
import { setImperativeContext } from './imperative-context';
import MAT_UI_KEY, {
  DEFAULT_MAT_UI_OPTIONS,
  DEFAULT_TOOLTIP_OPTIONS,
  matComponentKey,
} from './mat-ui-context';
import createThemeController from './theme';
import MAT_THEME_KEY from './theme-context';
import { Intersection } from './directives/intersection';
import { Ripple, RIPPLE_VARIANTS } from './directives/ripple';
import { StateLayer } from './directives/state-layer';

let componentDefaultsRegistry;

// 惰性构造，避免顶层元数据引用阻断未使用组件的 tree shaking。
function getComponentDefaultsRegistry() {
  componentDefaultsRegistry ??= new Map(
    COMPONENT_MANIFEST.map((entry) => [
      matComponentKey(entry.name),
      new Set(entry.defaults),
    ]),
  );

  return componentDefaultsRegistry;
}

/**
 * @typedef {object} MatRippleOptions
 * @property {'circle' | 'dots' | 'glow' | 'rings' | 'burst'} [variant='circle'] 组件涟漪的默认波纹形状。
 */

/**
 * @typedef {object} MatUiOptions
 * @property {import('./theme.js').MatThemeOptions} [theme]
 * @property {string} [iconClass='material-symbols-outlined']
 * @property {boolean} [useCursor=false]
 * @property {boolean | MatRippleOptions} [useRipple=false] 是否为操作类组件启用按压涟漪；
 *   传入对象时启用并设置默认波纹形状，涟漪绘制在状态层之上。
 * @property {object} [defaults] 按组件键设置的默认属性；键为组件名去掉 mat- 前缀后的 camelCase，
 *   值为该组件可配置的 prop 默认值。v-model 属性不可配置。
 */

/**
 * @typedef {object} MatTooltipOptions
 * @property {number} [openDelay=0] 自动模式的默认打开延迟，单位为毫秒。
 * @property {number} [closeDelay=600] 自动模式的默认关闭延迟，单位为毫秒。
 */

/**
 * @param {MatUiOptions} options
 * @returns {boolean}
 */
function readCursorOption(options) {
  const value = options.useCursor;

  if (value !== undefined && typeof value !== 'boolean') {
    throw new TypeError('createMatUi useCursor 必须是 boolean');
  }

  return value ?? false;
}

/**
 * @param {MatUiOptions} options
 * @returns {boolean | Readonly<MatRippleOptions>}
 */
function readRippleOption(options) {
  const value = options.useRipple;

  if (value === undefined) {
    return false;
  }

  if (typeof value === 'boolean') {
    return value;
  }

  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new TypeError('createMatUi useRipple 必须是 boolean 或对象');
  }

  if (value.variant === undefined) {
    return true;
  }

  if (!RIPPLE_VARIANTS.has(value.variant)) {
    throw new TypeError("createMatUi useRipple.variant 必须是 'circle'、'dots'、'glow'、'rings' 或 'burst'");
  }

  return Object.freeze({ variant: value.variant });
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
 * @param {MatTooltipOptions} options
 * @param {'openDelay' | 'closeDelay'} name
 * @returns {number}
 */
function readTooltipDelay(options, name) {
  const value = options[name];

  if (value === undefined) {
    return DEFAULT_TOOLTIP_OPTIONS[name];
  }

  if (typeof value !== 'number') {
    throw new TypeError(`createMatUi tooltip.${name} 必须是 number`);
  }

  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError(`createMatUi tooltip.${name} 必须是非负有限数字`);
  }

  return value;
}

/**
 * @param {unknown} value
 * @returns {Readonly<MatTooltipOptions>}
 */
function readTooltipDefaults(value) {
  if (value === undefined) {
    return DEFAULT_TOOLTIP_OPTIONS;
  }

  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new TypeError('createMatUi defaults.tooltip 必须是对象');
  }

  return Object.freeze({
    openDelay: readTooltipDelay(value, 'openDelay'),
    closeDelay: readTooltipDelay(value, 'closeDelay'),
  });
}

/**
 * @param {MatUiOptions} options
 * @returns {Readonly<Record<string, Readonly<object>>>}
 */
function readDefaults(options) {
  const value = options.defaults;

  if (value === undefined) {
    return Object.freeze({ tooltip: DEFAULT_TOOLTIP_OPTIONS });
  }

  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new TypeError('createMatUi defaults 必须是对象');
  }

  const result = { tooltip: readTooltipDefaults(value.tooltip) };

  Object.entries(value).forEach(([componentName, componentDefaults]) => {
    if (componentName === 'tooltip') {
      return;
    }

    const allowedKeys = getComponentDefaultsRegistry().get(componentName);

    if (!allowedKeys) {
      throw new TypeError(`createMatUi defaults 未知组件键 ${componentName}`);
    }

    if (!componentDefaults || typeof componentDefaults !== 'object' || Array.isArray(componentDefaults)) {
      throw new TypeError(`createMatUi defaults.${componentName} 必须是对象`);
    }

    const frozenDefaults = {};

    Object.entries(componentDefaults).forEach(([propName, propValue]) => {
      if (!allowedKeys.has(propName)) {
        throw new TypeError(`createMatUi defaults.${componentName}.${propName} 不是可配置属性`);
      }

      frozenDefaults[propName] = propValue;
    });

    result[componentName] = Object.freeze(frozenDefaults);
  });

  return Object.freeze(result);
}

/**
 * 建立运行时插件、主题控制器和公共指令。
 *
 * 组件不在此处全局注册；使用方应本地导入组件，或使用 `mde-vue/vite`
 * 自动导入模板中实际使用的组件。
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
    useCursor: readCursorOption(options),
    useRipple: readRippleOption(options),
    defaults: readDefaults(options),
  });
  const theme = createThemeController(options.theme);

  return {
    theme,
    install(app) {
      app.directive('intersection', Intersection);
      app.directive('state-layer', StateLayer);
      app.directive('ripple', Ripple);
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
    throw new Error('useMatTheme() 必须在已安装 mde-vue 插件的 Vue 应用中调用');
  }

  return theme;
}

/**
 * 获取由 createMatUi() 提供的全局组件设置。
 *
 * 未安装插件时返回只读默认配置。
 *
 * @returns {Readonly<{
 *   iconClass: string,
 *   useCursor: boolean,
 *   useRipple: boolean | Readonly<MatRippleOptions>,
 *   defaults: Readonly<Record<string, Readonly<object>>>,
 * }>}
 */
export function useMatUi() {
  return inject(MAT_UI_KEY, DEFAULT_MAT_UI_OPTIONS);
}
