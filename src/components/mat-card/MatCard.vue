<script setup>
import { computed } from 'vue';
import MatSurfaceBase from '../MatSurfaceBase.vue';
import { isComponentColor } from '../button-props';
import useComponentColor from '../use-component-color';
import MatCardHeadline from './MatCardHeadline.vue';
import MatCardMedia from './MatCardMedia.vue';
import MatCardSubhead from './MatCardSubhead.vue';
import { useMatProps } from '../use-mat-props';

defineOptions({ name: 'MatCard', inheritAttrs: false });
const props = defineProps({
  /**
   * 卡片的层级和边框外观；可选值为 `elevated`、`filled`、`outlined`。
   *
   * @type {'elevated' | 'filled' | 'outlined'}
   * @default 'filled'
   */
  variant: { type: String, default: 'filled', validator: (value) => ['elevated', 'filled', 'outlined'].includes(value) },
  /**
   * 语义色或六位十六进制种子色 `#RRGGBB`。
   *
   * @type {string | undefined}
   * @default undefined
   */
  color: { type: String, default: undefined, validator: isComponentColor },
  /**
   * 根元素语义；可选值为 `div`、`article`、`section`、`li`。
   *
   * @type {'div' | 'article' | 'section' | 'li'}
   * @default 'div'
   */
  as: { type: String, default: 'div', validator: (value) => ['div', 'article', 'section', 'li'].includes(value) },
});
const propsWithDefaults = useMatProps('card', props);
const { colorStyle, hasExplicitColor } = useComponentColor(computed(() => propsWithDefaults.color));
</script>

<template>
  <MatSurfaceBase
    v-bind="$attrs"
    class="mat-card"
    :class="[`mat-card--${propsWithDefaults.variant}`, { 'mat-card--explicit-color': hasExplicitColor }]"
    :style="colorStyle"
    :as="propsWithDefaults.as"
  >
    <MatCardMedia v-if="$slots.media">
      <slot name="media" />
    </MatCardMedia>

    <MatCardHeadline v-if="$slots.headline">
      <slot name="headline" />
    </MatCardHeadline>

    <MatCardSubhead v-if="$slots.subhead">
      <slot name="subhead" />
    </MatCardSubhead>

    <slot />
  </MatSurfaceBase>
</template>

<style scoped>
.mat-card {
  --mat-card-container-color: var(--mat-sys-color-surface-container-highest);
  --mat-card-content-color: var(--mat-sys-color-on-surface);
  --mat-card-outline-color: transparent;
  --mat-card-outline-width: 0;
  --mat-card-elevation: var(--mat-sys-elevation-level0);
  --mat-card-subhead-color: var(--mat-sys-color-on-surface-variant);
  position: relative;
  overflow: clip;
  box-sizing: border-box;
  min-inline-size: 0;
  color: var(--mat-card-content-color);
  background: var(--mat-card-container-color);
  border: var(--mat-card-outline-width) solid var(--mat-card-outline-color);
  border-radius: var(--mat-sys-shape-corner-medium);
  box-shadow: var(--mat-card-elevation);
  transition: box-shadow var(--mat-sys-motion-spring-fast-effects);
}

.mat-card--elevated {
  --mat-card-container-color: var(--mat-sys-color-surface-container-low);
  --mat-card-elevation: var(--mat-sys-elevation-level1);
}

.mat-card--outlined {
  --mat-card-container-color: var(--mat-sys-color-surface);
  --mat-card-outline-color: var(--mat-sys-color-outline-variant);
  --mat-card-outline-width: 1px;
}

.mat-card--explicit-color {
  --mat-card-container-color: var(--mat-accent-container-color);
  --mat-card-content-color: var(--mat-on-accent-container-color);
  --mat-card-subhead-color: var(--mat-on-accent-container-color);
}

.mat-card > :deep(.mat-card-headline) {
  margin-block-start: 16px;
  margin-inline: 16px;
}

.mat-card > :deep(.mat-card-subhead) {
  margin-block-start: 4px;
  margin-inline: 16px;
}

.mat-card > :deep(.mat-card-headline:last-child),
.mat-card > :deep(.mat-card-subhead:last-child) {
  margin-block-end: 16px;
}

.mat-card:has(.mat-card-action-area:not(:disabled):not(.mat-action-base--disabled):focus-visible) {
  outline: var(--mat-sys-interaction-focus-ring-width, 3px) solid var(--mat-sys-color-secondary);
  outline-offset: var(--mat-sys-interaction-focus-ring-offset, 2px);
}

@media (hover: hover) {
  .mat-card--filled:has(.mat-card-action-area:not(:disabled):not(.mat-action-base--disabled):hover),
  .mat-card--outlined:has(.mat-card-action-area:not(:disabled):not(.mat-action-base--disabled):hover) {
    --mat-card-elevation: var(--mat-sys-elevation-level1);
  }

  .mat-card--elevated:has(.mat-card-action-area:not(:disabled):not(.mat-action-base--disabled):hover) {
    --mat-card-elevation: var(--mat-sys-elevation-level2);
  }
}

.mat-card--filled:has(.mat-card-action-area:not(:disabled):not(.mat-action-base--disabled):is(:active, [data-mat-state-layer-pressed])),
.mat-card--outlined:has(.mat-card-action-area:not(:disabled):not(.mat-action-base--disabled):is(:active, [data-mat-state-layer-pressed])) {
  --mat-card-elevation: var(--mat-sys-elevation-level0);
}

.mat-card--elevated:has(.mat-card-action-area:not(:disabled):not(.mat-action-base--disabled):is(:active, [data-mat-state-layer-pressed])) {
  --mat-card-elevation: var(--mat-sys-elevation-level1);
}

@media (prefers-reduced-motion: reduce) {
  .mat-card { transition-duration: 0s; }
}
</style>
