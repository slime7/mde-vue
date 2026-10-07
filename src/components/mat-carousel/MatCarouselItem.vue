<script setup>
import { computed, onBeforeUnmount, onMounted, ref, useAttrs, useSlots } from 'vue';
import { isValidCssLength, toCssValue } from '../value-utils';
import MatImage from '../mat-image/MatImage.vue';
import { useMatProps } from '../use-mat-props';
import { useCarouselContext } from './carousel-context';

defineOptions({
  name: 'MatCarouselItem',
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
   * 图片替代文本；转发给内部 img 元素。
   *
   * @type {string | undefined}
   * @default undefined
   */
  alt: {
    type: String,
    default: undefined,
  },
  /**
   * 项目宽高比；数字与纯数字字符串表示宽/高比，其他字符串须为合法 CSS
   * `aspect-ratio` 值。`uncontained-multi-aspect` 变体据此决定项目自然宽度。
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
   * 使用方设置的目标宽度（px）；动态宽度变体到达起始边缘时展开到该宽度，
   * uncontained 与 multi-aspect 布局直接使用该固定宽度。
   *
   * @type {number | undefined}
   * @default undefined
   */
  width: {
    type: Number,
    default: undefined,
    validator: (value) => value === undefined || Number.isFinite(value) && value > 0,
  },
});
const propsWithDefaults = useMatProps('carouselItem', props);

const attrs = useAttrs();
const slots = useSlots();
const root = ref(null);
const context = useCarouselContext();
const entry = {
  element: undefined,
  getWidth: () => propsWithDefaults.width,
};
const itemStyle = computed(() => ({
  aspectRatio: toCssValue(propsWithDefaults.aspectRatio, {
    property: 'aspect-ratio',
    positive: true,
  }),
}));

onMounted(() => {
  entry.element = root.value;
  context?.registerItem(entry);
});

onBeforeUnmount(() => {
  context?.unregisterItem(entry);
});
</script>

<template>
  <div
    ref="root"
    v-bind="attrs"
    class="mat-carousel-item"
    :style="itemStyle"
  >
    <MatImage
      class="mat-carousel-item__visual"
      :src="propsWithDefaults.src"
      :alt="propsWithDefaults.alt"
      :radius="0"
      :outline="false"
      fit="cover"
      img-style="object-position: var(--mat-carousel-object-position, 50% 50%);"
    />

    <div
      v-if="slots.default"
      class="mat-carousel-item__content"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
@layer mde.components {
  .mat-carousel-item {
    position: relative;
    flex: 0 0 auto;
    block-size: 100%;
    min-inline-size: 0;
    overflow: hidden;
    border-radius: var(--mat-sys-shape-corner-extra-large);
    container-type: inline-size;
    scroll-snap-align: start;
    transition: opacity var(--mat-sys-motion-spring-fast-effects);
  }

  .mat-carousel-item:focus-visible {
    outline: var(--mat-sys-interaction-focus-ring-width) solid var(--mat-sys-color-secondary);
    outline-offset: -2px;
    z-index: 1;
  }

  .mat-carousel-item__visual {
    position: absolute;
    inset: 0;
  }

  .mat-carousel-item__content {
    position: absolute;
    inset-block-end: 0;
    inset-inline: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    box-sizing: border-box;
    padding: 16px;
    color: var(--mat-sys-color-on-primary);
    background: linear-gradient(
      to top,
      color-mix(in srgb, var(--mat-sys-color-scrim) 60%, transparent),
      transparent
    );
    font-size: var(--mat-sys-typescale-body-medium-size);
    line-height: var(--mat-sys-typescale-body-medium-line-height);
    transition: opacity var(--mat-sys-motion-spring-default-spatial);
  }

  /* 小尺寸预览位淡出文本内容。 */
  @container (max-width: 95.99px) {
    .mat-carousel-item__content {
      opacity: 0;
    }
  }
}
</style>
