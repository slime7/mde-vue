<script setup>
import MatActionBase from './MatActionBase.vue';

defineOptions({
  name: 'MatButtonBase',
  inheritAttrs: false,
});

defineProps({
  block: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'button',
  },
  ariaPressed: {
    type: Boolean,
    default: undefined,
  },
  useCursor: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click']);
</script>

<template>
  <MatActionBase
    v-bind="$attrs"
    class="mat-button-base"
    :class="{
      'mat-button-base--block': block,
      'mat-button-base--use-cursor': useCursor,
    }"
    :aria-pressed="ariaPressed"
    :disabled="disabled"
    :type="type"
    pressed-class="mat-button-base--pressed"
    @click="emit('click', $event)"
  >
    <slot />
  </MatActionBase>
</template>

<style scoped>
.mat-button-base {
  --mat-button-container-color: transparent;
  --mat-button-content-color: var(--mat-sys-color-on-surface);
  --mat-button-state-color: var(--mat-button-content-color);
  --mat-button-border-color: transparent;
  --mat-button-border-width: 0;
  --mat-button-container-elevation: none;
  --mat-button-container-height: 40px;
  --mat-button-container-width: auto;

  /* 将 full 限制为实际半径，避免与较小内角混用时触发 CSS 圆角整体缩放。 */
  --mat-button-full-radius: min(calc(var(--mat-button-container-height) / 2), var(--mat-sys-shape-corner-full));
  --mat-button-radius: var(--mat-button-full-radius);
  --mat-button-pressed-radius: var(--mat-sys-shape-corner-small);
  --mat-button-start-start-radius: var(--mat-button-radius);
  --mat-button-start-end-radius: var(--mat-button-radius);
  --mat-button-end-start-radius: var(--mat-button-radius);
  --mat-button-end-end-radius: var(--mat-button-radius);
  --mat-button-pressed-start-start-radius: var(--mat-button-pressed-radius);
  --mat-button-pressed-start-end-radius: var(--mat-button-pressed-radius);
  --mat-button-pressed-end-start-radius: var(--mat-button-pressed-radius);
  --mat-button-pressed-end-end-radius: var(--mat-button-pressed-radius);
  --mat-button-target-size: var(--mat-sys-interaction-target-min-size, 48px);
  position: relative;
  isolation: isolate;
  display: inline-flex;
  flex-shrink: 0;
  inline-size: var(--mat-button-container-width);
  min-inline-size: 0;
  block-size: var(--mat-button-container-height);
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0;
  color: var(--mat-button-content-color);
  white-space: nowrap;
  appearance: none;
  cursor: default;
  background: var(--mat-button-container-color);
  border-color: var(--mat-button-border-color);
  border-style: solid;
  border-width: var(--mat-button-border-width);
  border-start-start-radius: var(--mat-button-start-start-radius);
  border-start-end-radius: var(--mat-button-start-end-radius);
  border-end-start-radius: var(--mat-button-end-start-radius);
  border-end-end-radius: var(--mat-button-end-end-radius);
  box-shadow: var(--mat-button-container-elevation);
  transition-duration: var(--mat-sys-motion-duration-short3);
  transition-property: color, background-color, border-color, border-start-start-radius, border-start-end-radius, border-end-start-radius, border-end-end-radius, box-shadow, inline-size;
  transition-timing-function: var(--mat-sys-motion-easing-standard);
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.mat-button-base--use-cursor:not(:disabled) {
  cursor: pointer;
}

.mat-button-base--block {
  display: flex;
  inline-size: auto;
}

.mat-button-base::before {
  position: absolute;
  z-index: 0;
  inset: 0;
  border-radius: inherit;
  content: '';
  pointer-events: none;
  background: var(--mat-button-state-color);
  opacity: 0;
  transition: opacity var(--mat-sys-motion-duration-short3) var(--mat-sys-motion-easing-standard);
}

.mat-button-base::after {
  position: absolute;
  z-index: 2;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  inline-size: max(100%, var(--mat-button-target-size));
  block-size: max(100%, var(--mat-button-target-size));
  content: '';
  transform: translate(-50%, -50%);
}

@media (hover: hover) {
  .mat-button-base:not(:disabled):hover::before {
    opacity: var(--mat-sys-state-hover-state-layer-opacity);
  }
}

.mat-button-base:not(:disabled):focus-visible {
  outline: var(--mat-sys-interaction-focus-ring-width, 3px) solid var(--mat-sys-color-secondary);
  outline-offset: var(--mat-sys-interaction-focus-ring-offset, 2px);
}

.mat-button-base:not(:disabled):focus-visible::before {
  opacity: var(--mat-sys-state-focus-state-layer-opacity);
}

.mat-button-base:not(:disabled):is(:active, .mat-button-base--pressed) {
  border-start-start-radius: var(--mat-button-pressed-start-start-radius);
  border-start-end-radius: var(--mat-button-pressed-start-end-radius);
  border-end-start-radius: var(--mat-button-pressed-end-start-radius);
  border-end-end-radius: var(--mat-button-pressed-end-end-radius);
}

.mat-button-base:not(:disabled):is(:active, .mat-button-base--pressed)::before {
  opacity: var(--mat-sys-state-pressed-state-layer-opacity);
}

.mat-button-base:disabled {
  --mat-button-container-color: color-mix(in srgb, var(--mat-sys-color-on-surface) calc(var(--mat-sys-state-disabled-container-opacity) * 100%), transparent);
  --mat-button-content-color: color-mix(in srgb, var(--mat-sys-color-on-surface) calc(var(--mat-sys-state-disabled-content-opacity) * 100%), transparent);
  --mat-button-border-color: transparent;
  --mat-button-container-elevation: none;
  cursor: not-allowed;
}

@media (prefers-reduced-motion: reduce) {
  .mat-button-base,
  .mat-button-base::before {
    transition-duration: 0s;
  }
}
</style>
