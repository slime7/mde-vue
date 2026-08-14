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
    @click="emit('click', $event)"
  >
    <slot />
  </MatActionBase>
</template>

<style scoped>
@layer mde.components {
  .mat-button-base {
    --mat-button-container-color: transparent;
    --mat-button-content-color: var(--mat-sys-color-on-surface);
    --mat-button-state-color: var(--mat-button-content-color);
    --mat-button-border-color: transparent;
    --mat-button-border-width: 0;
    --mat-button-container-elevation: none;
    --mat-button-container-height: 40px;
    --mat-button-container-width: auto;
    --mat-button-size-motion: var(--mat-sys-motion-spring-fast-spatial);
    --mat-button-visual-scale: 1;

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
    --mat-action-state-color: var(--mat-button-state-color);
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
    transform: scaleX(var(--mat-button-visual-scale));
    transition: color var(--mat-sys-motion-spring-fast-effects), background-color var(--mat-sys-motion-spring-fast-effects), border-color var(--mat-sys-motion-spring-fast-effects), border-start-start-radius var(--mat-sys-motion-spring-fast-spatial), border-start-end-radius var(--mat-sys-motion-spring-fast-spatial), border-end-start-radius var(--mat-sys-motion-spring-fast-spatial), border-end-end-radius var(--mat-sys-motion-spring-fast-spatial), box-shadow var(--mat-sys-motion-spring-fast-effects), inline-size var(--mat-button-size-motion), padding-inline-start var(--mat-button-size-motion), padding-inline-end var(--mat-button-size-motion), transform var(--mat-sys-motion-spring-fast-spatial);
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .mat-button-base--use-cursor:not(:disabled) {
    cursor: pointer;
  }

  .mat-button-base--block {
    display: flex;
    inline-size: 100%;
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

  .mat-button-base:not(:disabled):is(:active, [data-mat-state-layer-pressed]) {
    border-start-start-radius: var(--mat-button-pressed-start-start-radius);
    border-start-end-radius: var(--mat-button-pressed-start-end-radius);
    border-end-start-radius: var(--mat-button-pressed-end-start-radius);
    border-end-end-radius: var(--mat-button-pressed-end-end-radius);
  }

  .mat-button-base:disabled {
    --mat-button-container-color: color-mix(in srgb, var(--mat-sys-color-on-surface) calc(var(--mat-sys-state-disabled-container-opacity) * 100%), transparent);
    --mat-button-content-color: color-mix(in srgb, var(--mat-sys-color-on-surface) calc(var(--mat-sys-state-disabled-content-opacity) * 100%), transparent);
    --mat-button-border-color: transparent;
    --mat-button-container-elevation: none;
    cursor: not-allowed;
  }

  @media (prefers-reduced-motion: reduce) {
    .mat-button-base {
      transition-duration: 0s;
    }
  }
}
</style>
