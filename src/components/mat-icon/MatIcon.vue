<script setup>
import { computed, inject } from 'vue';
import MAT_UI_KEY, { DEFAULT_MAT_UI_OPTIONS } from '../../mat-ui-context';
import { isComponentColor } from '../button-props';
import {
  ICON_SIZES,
  isGrade,
  isHtmlTagName,
  isIconSize,
  isOpticalSize,
  isUnitInterval,
  isWeight,
} from '../icon-props';
import useComponentColor from '../use-component-color';
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatIcon',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * Material Symbols 字形文本；优先级低于 src。
   *
   * @type {string | undefined}
   * @default undefined
   */
  icon: {
    type: String,
    default: undefined,
  },
  /**
   * SVG、图片或字体资源地址；优先于 icon 和默认 Slot。
   *
   * @type {string | undefined}
   * @default undefined
   */
  src: {
    type: String,
    default: undefined,
    validator(value) {
      return value === undefined || value.length > 0;
    },
  },
  /**
   * 图标尺寸，可使用 `extra-small`、`small`、`medium`、`large`、`extra-large` 或 CSS 长度值。
   *
   * @type {string}
   * @default 'medium'
   */
  size: {
    type: String,
    default: 'medium',
    validator: isIconSize,
  },
  /**
   * Material Symbols FILL 轴，范围为 0 到 1。
   *
   * @type {number}
   * @default 0
   */
  fill: {
    type: Number,
    default: 0,
    validator: isUnitInterval,
  },
  /**
   * Material Symbols wght 轴，范围为 100 到 700 的步进值。
   *
   * @type {number}
   * @default 400
   */
  weight: {
    type: Number,
    default: 400,
    validator: isWeight,
  },
  /**
   * Material Symbols GRAD 轴，可选值为 -25、0、200。
   *
   * @type {number}
   * @default 0
   */
  grade: {
    type: Number,
    default: 0,
    validator: isGrade,
  },
  /**
   * Material Symbols opsz 轴，范围为 20 到 48 的整数。
   *
   * @type {number | undefined}
   * @default undefined
   */
  opticalSize: {
    type: Number,
    default: undefined,
    validator: isOpticalSize,
  },
  /**
   * 语义色或六位十六进制种子色 `#RRGGBB`。
   *
   * @type {string | undefined}
   * @default undefined
   */
  color: {
    type: String,
    default: undefined,
    validator: isComponentColor,
  },
  /**
   * 直接设置图标内容颜色的 CSS 值。
   *
   * @type {string | undefined}
   * @default undefined
   */
  fontColor: {
    type: String,
    default: undefined,
  },
  /**
   * 图标根元素标签名。
   *
   * @type {string}
   * @default 'i'
   */
  as: {
    type: String,
    default: 'i',
    validator: isHtmlTagName,
  },
  /**
   * 覆盖全局图标字体 class。
   *
   * @type {string | undefined}
   * @default undefined
   */
  iconClass: {
    type: String,
    default: undefined,
  },
});
const propsWithDefaults = useMatProps('icon', props);

const matUi = inject(MAT_UI_KEY, DEFAULT_MAT_UI_OPTIONS);
const { colorStyle, hasExplicitColor } = useComponentColor(computed(() => propsWithDefaults.color));
const effectiveIconClass = computed(() => propsWithDefaults.iconClass ?? matUi.iconClass);
const hasIcon = computed(() => propsWithDefaults.icon !== undefined);
const resolvedSize = computed(() => (
  ICON_SIZES[propsWithDefaults.size]?.fontSize ?? propsWithDefaults.size
));
const resolvedOpticalSize = computed(() => propsWithDefaults.opticalSize
  ?? ICON_SIZES[propsWithDefaults.size]?.opticalSize
  ?? 24);
const rootStyle = computed(() => ({
  ...colorStyle.value,
  '--mat-icon-size': resolvedSize.value,
  color: propsWithDefaults.fontColor
    ?? (hasExplicitColor.value ? 'var(--mat-accent-color)' : 'currentColor'),
  fontVariationSettings: `'FILL' ${propsWithDefaults.fill}, 'wght' ${propsWithDefaults.weight}, 'GRAD' ${propsWithDefaults.grade}, 'opsz' ${resolvedOpticalSize.value}`,
}));
</script>

<template>
  <component
    :is="propsWithDefaults.as"
    v-bind="$attrs"
    class="mat-icon"
    :class="effectiveIconClass"
    :style="rootStyle"
  >
    <img
      v-if="propsWithDefaults.src !== undefined"
      class="mat-icon__image"
      :src="propsWithDefaults.src"
      alt=""
    >
    <template v-else-if="hasIcon">
      {{ propsWithDefaults.icon }}
    </template>
    <slot v-else />
  </component>
</template>

<style scoped>
@layer mde.components {
  /*
   * 内容来源与 SVG 资源模式参考 mdui v2 icon（MIT）：
   * https://github.com/zdhxiong/mdui/tree/818146c3e188580e2831873b4f245d864422552c
   */

  .mat-icon {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    color: currentcolor;
    font-size: var(--mat-icon-size);
    font-style: normal;
    font-feature-settings: 'liga';
    letter-spacing: normal;
    line-height: 1;
    text-rendering: optimizelegibility;
    text-transform: none;
    white-space: nowrap;
    overflow-wrap: normal;
    user-select: none;
    cursor: default;
    transition: color var(--mat-sys-motion-spring-fast-effects), font-size var(--mat-sys-motion-spring-fast-spatial), font-variation-settings var(--mat-sys-motion-spring-fast-spatial);
  }

  .mat-icon__image,
  .mat-icon :deep(svg) {
    display: block;
    flex: 0 0 auto;
    inline-size: 1em;
    block-size: 1em;
  }

  @media (prefers-reduced-motion: reduce) {
    .mat-icon {
      transition-duration: 0s;
    }
  }
}
</style>
