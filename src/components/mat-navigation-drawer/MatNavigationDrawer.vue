<script setup>
import MatNavigationRail from '../mat-navigation-rail/MatNavigationRail.vue';
import { isValidCssLength } from '../value-utils';
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatNavigationDrawer',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 受控当前目的地值。
   *
   * @type {string | number | boolean | null}
   * @default null
   */
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
  /**
   * 是否展开 Navigation Drawer。
   *
   * @type {boolean}
   * @default false
   */
  expanded: {
    type: Boolean,
    default: false,
  },
  /**
   * expanded Drawer 的宽度；数字与纯数字字符串按 px 处理，
   * 其他字符串 trim 后须为合法 CSS 宽度值，非法时使用默认宽度。
   *
   * @type {number | string | undefined}
   * @default undefined
   */
  width: {
    type: [Number, String],
    default: undefined,
    validator: (value) => isValidCssLength(value, { property: 'inline-size' }),
  },
  /**
   * 纵向 Drawer 布局；可选值为 standard、modal。
   *
   * @type {'standard' | 'modal'}
   * @default 'standard'
   */
  layout: {
    type: String,
    default: 'standard',
    validator(value) {
      return ['standard', 'modal'].includes(value);
    },
  },
  /**
   * 默认 Slot 在主轴上的对齐方式；可选值为 start、center、end。
   *
   * @type {'start' | 'center' | 'end'}
   * @default 'start'
   */
  alignment: {
    type: String,
    default: 'start',
    validator(value) {
      return ['start', 'center', 'end'].includes(value);
    },
  },
  /**
   * mode="fixed" 时的挂载目标；省略时保留在声明位置。
   *
   * @type {string | HTMLElement | undefined}
   * @default undefined
   */
  attach: {
    type: [String, Object],
    default: undefined,
  },
  /**
   * modal 布局在自然布局位置生成占位；standard 布局使用最近 MatLayout 或 MatAppRoot 的 padding。
   *
   * @type {boolean}
   * @default false
   */
  placeholder: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否在面向内容的一侧渲染 1px 细边框。
   *
   * @type {boolean}
   * @default false
   */
  bordered: {
    type: Boolean,
    default: false,
  },
  /**
   * 安全区留白配置。
   *
   * @type {boolean | number | string}
   * @default true
   */
  safeArea: {
    type: [Boolean, Number, String],
    default: true,
  },
  /**
   * 显式指定安全区留白大小。
   *
   * @type {number | string | undefined}
   * @default undefined
   */
  safeAreaSize: {
    type: [Number, String],
    default: undefined,
  },
  /**
   * 排布与定位模式。未指定时遵循 aside 默认行为。
   *
   * @type {'docked' | 'flow' | 'sticky' | 'fixed' | undefined}
   * @default undefined
   */
  mode: {
    type: String,
    default: undefined,
    validator(value) {
      return value === undefined || ['docked', 'flow', 'sticky', 'fixed'].includes(value);
    },
  },
});
const propsWithDefaults = useMatProps('navigationDrawer', props);

const emit = defineEmits({
  /**
   * 子 Item 请求切换目的地时发出新的 value。
   */
  'update:modelValue': (value) => ['string', 'number', 'boolean'].includes(typeof value),
  /**
   * Drawer 请求切换展开状态时发出新的 boolean。
   */
  'update:expanded': (value) => typeof value === 'boolean',
});
</script>

<template>
  <MatNavigationRail
    v-bind="$attrs"
    class="mat-navigation-drawer"
    :model-value="propsWithDefaults.modelValue"
    :expanded="propsWithDefaults.expanded"
    :width="propsWithDefaults.width"
    :layout="propsWithDefaults.layout"
    :alignment="propsWithDefaults.alignment"
    :bordered="propsWithDefaults.bordered"
    :attach="propsWithDefaults.attach"
    :placeholder="propsWithDefaults.placeholder"
    :safe-area="propsWithDefaults.safeArea"
    :safe-area-size="propsWithDefaults.safeAreaSize"
    :mode="propsWithDefaults.mode"
    :full-width="true"
    :collapsible="true"
    :hide-on-collapse="true"
    @update:model-value="emit('update:modelValue', $event)"
    @update:expanded="emit('update:expanded', $event)"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot
        :name="name"
        v-bind="slotProps"
      />
    </template>
  </MatNavigationRail>
</template>

<style scoped>
@layer mde.components {
  .mat-navigation-drawer {
    --mat-navigation-rail-expanded-width: clamp(240px, 30vw, 360px);
  }
}
</style>
