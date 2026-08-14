import {
  computed, getCurrentInstance, inject, reactive,
} from 'vue';
import MAT_UI_KEY, { DEFAULT_MAT_UI_OPTIONS } from '../mat-ui-context';

const EMPTY_OBJECT = Object.freeze({});

/**
 * 把 camelCase 属性名转换为 kebab-case，与 Vue 模板属性写法对应。
 *
 * @param {string} name
 * @returns {string}
 */
function hyphenate(name) {
  return name.replace(/\B([A-Z])/g, '-$1').toLowerCase();
}

/**
 * 返回合并 createMatUi() defaults 配置后的响应式 props 对象。
 *
 * 必须在组件 setup 中调用。显式传入且原始值非 undefined 的属性优先；
 * 未显式传入或显式传入 undefined 的属性依次取 defaults 值与组件定义默认值。
 * defaults 中不属于组件 props 的键也会保留在返回对象中。
 *
 * @template {object} T
 * @param {string} componentName defaults 中的组件键名（如 `btn`、`textField`）。
 * @param {T} props defineProps 返回的 props 对象。
 * @returns {T & Record<string, unknown>} 合并后的响应式 props 对象。
 * @throws {Error} 在组件 setup 之外调用时抛出。
 */
// 公共函数通过根入口具名导出，模块本身保持单一导出。
// eslint-disable-next-line import-x/prefer-default-export
export function useMatProps(componentName, props) {
  const instance = getCurrentInstance();

  if (!instance) {
    throw new Error('useMatProps() 必须在组件 setup 中调用');
  }

  const matUi = inject(MAT_UI_KEY, DEFAULT_MAT_UI_OPTIONS);
  const defaults = matUi.defaults?.[componentName] ?? EMPTY_OBJECT;
  const keys = [...new Set([...Object.keys(props), ...Object.keys(defaults)])];
  const merged = {};

  keys.forEach((key) => {
    merged[key] = computed(() => {
      const rawProps = instance.vnode.props ?? EMPTY_OBJECT;
      const explicitNames = [key, hyphenate(key)];

      if (explicitNames.some((name) => (
        name in rawProps && rawProps[name] !== undefined
      ))) {
        return props[key];
      }

      return defaults[key] ?? props[key];
    });
  });

  return reactive(merged);
}
