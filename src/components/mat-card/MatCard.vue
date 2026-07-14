<script setup>
import { computed } from 'vue';
import MatSurfaceBase from '../MatSurfaceBase.vue';
import { isComponentColor } from '../button-props';
import useComponentColor from '../use-component-color';

defineOptions({ name: 'MatCard', inheritAttrs: false });
const props = defineProps({
  variant: { type: String, default: 'filled', validator: (value) => ['elevated', 'filled', 'outlined'].includes(value) },
  color: { type: String, default: undefined, validator: isComponentColor },
  as: { type: String, default: 'div', validator: (value) => ['div', 'article', 'section', 'li'].includes(value) },
});
const { colorStyle, hasExplicitColor } = useComponentColor(computed(() => props.color));
</script>

<template>
  <MatSurfaceBase
    v-bind="$attrs"
    class="mat-card"
    :class="[`mat-card--${variant}`, { 'mat-card--explicit-color': hasExplicitColor }]"
    :style="colorStyle"
    :as="as"
  >
    <slot />
  </MatSurfaceBase>
</template>

<style scoped>
.mat-card {
  --mat-card-container-color: var(--mat-sys-color-surface-container-highest);
  --mat-card-content-color: var(--mat-sys-color-on-surface);
  --mat-card-outline-color: transparent;
  --mat-card-elevation: var(--mat-sys-elevation-level0);
  position: relative;
  overflow: clip;
  color: var(--mat-card-content-color);
  background: var(--mat-card-container-color);
  border: 1px solid var(--mat-card-outline-color);
  border-radius: var(--mat-sys-shape-corner-medium);
  box-shadow: var(--mat-card-elevation);
  transition: box-shadow var(--mat-sys-motion-duration-short3) var(--mat-sys-motion-easing-standard);
}

.mat-card--elevated {
  --mat-card-container-color: var(--mat-sys-color-surface-container-low);
  --mat-card-elevation: var(--mat-sys-elevation-level1);
}

.mat-card--outlined {
  --mat-card-container-color: var(--mat-sys-color-surface);
  --mat-card-outline-color: var(--mat-sys-color-outline-variant);
}

.mat-card--explicit-color {
  --mat-card-container-color: var(--mat-accent-container-color);
  --mat-card-content-color: var(--mat-on-accent-container-color);
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
</style>
