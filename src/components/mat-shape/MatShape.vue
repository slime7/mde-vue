<script setup>
import { computed } from 'vue';
import { isComponentColor } from '../button-props';
import { isHtmlTagName } from '../icon-props';
import useComponentColor from '../use-component-color';
import { useMatProps } from '../use-mat-props';
import { isValidCssLength, toCssLength } from '../value-utils';
import { isShapeName, SHAPE_PATHS } from './shape-paths';

defineOptions({
  name: 'MatShape',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * Material 3 Expressive 预定义形状名称。
   *
   * @type {string}
   * @default 'circle'
   */
  name: {
    type: String,
    default: 'circle',
    validator: isShapeName,
  },
  /**
   * 形状边长；数字与纯数字字符串按 px 处理，其他字符串须为合法正 CSS 长度。
   *
   * @type {number | string}
   * @default 48
   */
  size: {
    type: [Number, String],
    default: 48,
    validator: (value) => isValidCssLength(value, {
      property: 'width',
      positive: true,
    }),
  },
  /**
   * Material 语义色、系统颜色角色或六位十六进制种子色。
   *
   * @type {string}
   * @default 'primary'
   */
  color: {
    type: String,
    default: 'primary',
    validator: isComponentColor,
  },
  /**
   * 形状根元素标签名。
   *
   * @type {string}
   * @default 'div'
   */
  as: {
    type: String,
    default: 'div',
    validator: isHtmlTagName,
  },
});
const propsWithDefaults = useMatProps('shape', props);
const { colorStyle } = useComponentColor(computed(() => propsWithDefaults.color));
const resolvedSize = computed(() => toCssLength(propsWithDefaults.size, {
  property: 'width',
  positive: true,
  fallback: '48px',
}));
const resolvedName = computed(() => (
  isShapeName(propsWithDefaults.name) ? propsWithDefaults.name : 'circle'
));
const rootStyle = computed(() => ({
  ...colorStyle.value,
  inlineSize: resolvedSize.value,
  blockSize: resolvedSize.value,
  clipPath: SHAPE_PATHS[resolvedName.value],
}));
</script>

<template>
  <component
    :is="propsWithDefaults.as"
    v-bind="$attrs"
    class="mat-shape"
    :style="rootStyle"
  >
    <slot />
  </component>
</template>

<style scoped>
.mat-shape {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
  background: var(--mat-accent-color);
  color: var(--mat-on-accent-color);
  vertical-align: middle;
}
</style>
