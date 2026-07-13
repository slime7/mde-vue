<script setup>
defineOptions({
  name: 'MatButtonBase',
  inheritAttrs: false,
});

defineProps({
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
});

const emit = defineEmits({
  click(payload) {
    return payload instanceof MouseEvent;
  },
});

/**
 * @param {MouseEvent} event
 */
function handleClick(event) {
  emit('click', event);
}
</script>

<template>
  <button
    v-bind="$attrs"
    class="mat-button-base"
    :aria-pressed="ariaPressed"
    :disabled="disabled"
    :type="type"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<style scoped>
.mat-button-base {
  --mat-button-container-color: transparent;
  --mat-button-content-color: var(--mat-color-on-surface);
  --mat-button-state-color: var(--mat-button-content-color);
  --mat-button-border-color: transparent;
  --mat-button-border-width: 0;
  --mat-button-shadow: none;
  --mat-button-container-height: 40px;
  --mat-button-container-width: auto;
  --mat-button-radius: var(--mat-shape-corner-full);
  --mat-button-pressed-radius: var(--mat-shape-corner-small);
  --mat-button-target-size: var(--mat-interactive-target-min-size, 48px);
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
  cursor: pointer;
  background: var(--mat-button-container-color);
  border-color: var(--mat-button-border-color);
  border-style: solid;
  border-width: var(--mat-button-border-width);
  border-radius: var(--mat-button-radius);
  box-shadow: var(--mat-button-shadow);
  transition-duration: var(--mat-motion-duration-short);
  transition-property: color, background-color, border-color, border-radius, box-shadow, inline-size;
  transition-timing-function: var(--mat-motion-easing-standard);
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
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
  transition: opacity var(--mat-motion-duration-short) var(--mat-motion-easing-standard);
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
    opacity: var(--mat-state-hover-opacity);
  }
}

.mat-button-base:not(:disabled):focus-visible {
  outline: var(--mat-focus-ring-width, 3px) solid var(--mat-color-secondary);
  outline-offset: var(--mat-focus-ring-offset, 2px);
}

.mat-button-base:not(:disabled):focus-visible::before {
  opacity: var(--mat-state-focus-opacity);
}

.mat-button-base:not(:disabled):active {
  border-radius: var(--mat-button-pressed-radius);
}

.mat-button-base:not(:disabled):active::before {
  opacity: var(--mat-state-pressed-opacity);
}

.mat-button-base:disabled {
  --mat-button-container-color: color-mix(in srgb, var(--mat-color-on-surface) calc(var(--mat-state-disabled-container-opacity) * 100%), transparent);
  --mat-button-content-color: color-mix(in srgb, var(--mat-color-on-surface) calc(var(--mat-state-disabled-content-opacity) * 100%), transparent);
  --mat-button-border-color: transparent;
  --mat-button-shadow: none;
  cursor: not-allowed;
}

@media (prefers-reduced-motion: reduce) {
  .mat-button-base,
  .mat-button-base::before {
    transition-duration: 0s;
  }
}
</style>
