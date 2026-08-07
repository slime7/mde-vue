<script setup>
import { computed, useAttrs } from 'vue';
import { isValidCssLength, toCssLength, toCssValue } from '../value-utils';

defineOptions({
  name: 'MatImage',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 图片资源地址。
   *
   * @type {string}
   * @required
   */
  src: {
    type: String,
    required: true,
    validator(value) {
      return value === undefined || value.length > 0;
    },
  },
  /**
   * 组件圆角；数字与纯数字字符串按 px 处理，其他字符串 trim 后须为合法 CSS 长度值。
   * 省略时使用 `--mat-sys-shape-corner-extra-large`（默认 28px），非法值回退该令牌。
   *
   * @type {number | string | undefined}
   * @default undefined
   */
  radius: {
    type: [Number, String],
    default: undefined,
    validator: (value) => isValidCssLength(value, { property: 'border-radius' }),
  },
  /**
   * 图片填充方式；可选值为 `cover`、`contain`。
   *
   * @type {'cover' | 'contain'}
   * @default 'cover'
   */
  fit: {
    type: String,
    default: 'cover',
    validator(value) {
      return ['cover', 'contain'].includes(value);
    },
  },
  /**
   * 是否显示 1px 描边，颜色使用 `--mat-sys-color-outline`。
   *
   * @type {boolean}
   * @default true
   */
  outline: {
    type: Boolean,
    default: true,
  },
  /**
   * 组件宽高比；数字与纯数字字符串表示宽/高比，其他字符串 trim 后须为合法 CSS
   * `aspect-ratio` 值。省略或非法时保持图片自然比例。
   *
   * @type {number | string | undefined}
   * @default undefined
   */
  aspectRatio: {
    type: [Number, String],
    default: undefined,
    validator: (value) => isValidCssLength(value, {
      property: 'aspect-ratio',
      positive: true,
    }),
  },
  /**
   * 合并到内部 img 元素的 class。
   *
   * @type {string | Array<unknown> | Record<string, unknown> | undefined}
   * @default undefined
   */
  imgClass: {
    type: [String, Array, Object],
    default: undefined,
  },
  /**
   * 合并到内部 img 元素的 style。
   *
   * @type {string | Array<unknown> | Record<string, unknown> | undefined}
   * @default undefined
   */
  imgStyle: {
    type: [String, Array, Object],
    default: undefined,
  },
});

const attrs = useAttrs();
const rootAttrs = computed(() => ({
  class: attrs.class,
  style: attrs.style,
}));
const imgAttrs = computed(() => Object.fromEntries(
  Object.entries(attrs).filter(([name]) => !['class', 'style'].includes(name)),
));
const rootStyle = computed(() => ({
  aspectRatio: toCssValue(props.aspectRatio, {
    property: 'aspect-ratio',
    positive: true,
  }),
  borderRadius: props.radius === undefined
    ? 'var(--mat-sys-shape-corner-extra-large)'
    : toCssLength(props.radius, {
      property: 'border-radius',
      fallback: 'var(--mat-sys-shape-corner-extra-large)',
    }),
  outline: props.outline ? '1px solid var(--mat-sys-color-outline)' : undefined,
}));
const imgStyleValue = computed(() => {
  const baseStyle = { objectFit: props.fit };

  if (typeof props.imgStyle === 'string') {
    return [baseStyle, props.imgStyle];
  }

  if (Array.isArray(props.imgStyle)) {
    return [baseStyle, ...props.imgStyle];
  }

  return { ...baseStyle, ...props.imgStyle };
});
</script>

<template>
  <div
    v-bind="rootAttrs"
    class="mat-image"
    :style="rootStyle"
  >
    <img
      v-bind="imgAttrs"
      class="mat-image__img"
      :class="props.imgClass"
      :style="imgStyleValue"
      :src="props.src"
    >
  </div>
</template>

<style scoped>
.mat-image {
  display: block;
  box-sizing: border-box;
  inline-size: 100%;
  overflow: hidden;
  transition-property: aspect-ratio, inline-size, block-size, border-radius;
  transition-duration: var(--mat-sys-motion-duration-medium2);
  transition-timing-function: var(--mat-sys-motion-easing-standard);
}

.mat-image__img {
  display: block;
  box-sizing: border-box;
  inline-size: 100%;
  block-size: 100%;
}

@media (prefers-reduced-motion: reduce) {
  .mat-image {
    transition-duration: 0s;
  }
}
</style>
