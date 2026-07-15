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

defineOptions({
  name: 'MatIcon',
  inheritAttrs: false,
});

const props = defineProps({
  icon: {
    type: String,
    default: undefined,
  },
  src: {
    type: String,
    default: undefined,
    validator(value) {
      return value === undefined || value.length > 0;
    },
  },
  size: {
    type: String,
    default: 'medium',
    validator: isIconSize,
  },
  fill: {
    type: Number,
    default: 0,
    validator: isUnitInterval,
  },
  weight: {
    type: Number,
    default: 400,
    validator: isWeight,
  },
  grade: {
    type: Number,
    default: 0,
    validator: isGrade,
  },
  opticalSize: {
    type: Number,
    default: undefined,
    validator: isOpticalSize,
  },
  color: {
    type: String,
    default: undefined,
    validator: isComponentColor,
  },
  fontColor: {
    type: String,
    default: undefined,
  },
  as: {
    type: String,
    default: 'i',
    validator: isHtmlTagName,
  },
  iconClass: {
    type: String,
    default: undefined,
  },
});

const matUi = inject(MAT_UI_KEY, DEFAULT_MAT_UI_OPTIONS);
const { colorStyle, hasExplicitColor } = useComponentColor(computed(() => props.color));
const effectiveIconClass = computed(() => props.iconClass ?? matUi.iconClass);
const hasIcon = computed(() => props.icon !== undefined);
const resolvedSize = computed(() => ICON_SIZES[props.size]?.fontSize ?? props.size);
const resolvedOpticalSize = computed(() => props.opticalSize
  ?? ICON_SIZES[props.size]?.opticalSize
  ?? 24);
const rootStyle = computed(() => ({
  ...colorStyle.value,
  '--mat-icon-size': resolvedSize.value,
  color: props.fontColor
    ?? (hasExplicitColor.value ? 'var(--mat-accent-color)' : 'currentColor'),
  fontVariationSettings: `'FILL' ${props.fill}, 'wght' ${props.weight}, 'GRAD' ${props.grade}, 'opsz' ${resolvedOpticalSize.value}`,
}));
</script>

<template>
  <component
    :is="as"
    v-bind="$attrs"
    class="mat-icon"
    :class="effectiveIconClass"
    :style="rootStyle"
  >
    <img
      v-if="src !== undefined"
      class="mat-icon__image"
      :src="src"
      alt=""
    >
    <template v-else-if="hasIcon">
      {{ icon }}
    </template>
    <slot v-else />
  </component>
</template>

<style scoped>
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
  transition-duration: var(--mat-sys-motion-duration-short4);
  transition-property: color, font-size, font-variation-settings;
  transition-timing-function: var(--mat-sys-motion-easing-standard);
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
</style>
