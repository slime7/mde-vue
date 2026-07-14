<script setup>
import { computed } from 'vue';
import MatSelectionControlBase from '../MatSelectionControlBase.vue';
import { isComponentColor } from '../button-props';

defineOptions({
  name: 'MatSwitch',
  inheritAttrs: false,
});

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  icons: {
    type: String,
    default: 'none',
    validator(value) {
      return ['none', 'selected', 'both'].includes(value);
    },
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: undefined,
    validator: isComponentColor,
  },
});

const emit = defineEmits({
  'update:modelValue'(value) {
    return typeof value === 'boolean';
  },
  change(event) {
    return event instanceof Event;
  },
});
const showSelectedIcon = computed(() => ['selected', 'both'].includes(props.icons));
const showUnselectedIcon = computed(() => props.icons === 'both');

/**
 * @param {Event} event
 */
function handleChange(event) {
  emit('update:modelValue', event.target.checked);
  emit('change', event);
}
</script>

<template>
  <MatSelectionControlBase
    v-bind="$attrs"
    class="mat-switch"
    :class="[
      `mat-switch--icons-${icons}`,
      { 'mat-switch--checked': modelValue },
    ]"
    :checked="modelValue"
    :color="color"
    :disabled="disabled"
    input-role="switch"
    input-type="checkbox"
    label-name="MatSwitch"
    @change="handleChange"
  >
    <template #indicator>
      <span class="mat-switch__track">
        <span class="mat-switch__handle">
          <span
            v-if="showSelectedIcon"
            class="mat-switch__icon mat-switch__icon--selected"
          />
          <span
            v-if="showUnselectedIcon"
            class="mat-switch__icon mat-switch__icon--unselected"
          />
        </span>
      </span>
    </template>

    <slot />
  </MatSelectionControlBase>
</template>

<style scoped>
.mat-switch {
  --mat-accent-color: var(--mat-switch-selected-track-color);
  --mat-on-accent-color: var(--mat-switch-selected-handle-color);
  --mat-selection-control-target-width: var(--mat-switch-track-width);
  --mat-selection-control-indicator-width: var(--mat-switch-track-width);
  --mat-selection-control-indicator-height: var(--mat-switch-track-height);
  --mat-selection-control-state-layer-size: var(--mat-switch-state-layer-size);
  --mat-selection-control-state-layer-offset: -4px;
  --mat-selection-control-state-layer-color: var(--mat-switch-unselected-state-layer-color);
  --mat-selection-control-label-color: var(--mat-switch-label-text-color);
  --mat-selection-control-current-handle-size: var(--mat-switch-unselected-handle-size);
  --mat-selection-control-current-handle-offset: 8px;
  --mat-selection-control-pressed-handle-size: var(--mat-switch-pressed-handle-size);
  --mat-selection-control-pressed-handle-offset: 2px;
}

.mat-switch--icons-both:not(.mat-switch--checked) {
  --mat-selection-control-current-handle-size: var(--mat-switch-icon-handle-size);
  --mat-selection-control-current-handle-offset: 4px;
}

.mat-switch--checked {
  --mat-selection-control-state-layer-offset: 16px;
  --mat-selection-control-state-layer-color: var(--mat-accent-color);
  --mat-selection-control-current-handle-size: var(--mat-switch-selected-handle-size);
  --mat-selection-control-current-handle-offset: 24px;
  --mat-selection-control-pressed-handle-offset: 22px;
}

.mat-switch__track {
  position: relative;
  display: block;
  inline-size: 100%;
  block-size: 100%;
  box-sizing: border-box;
  background: var(--mat-switch-unselected-track-color);
  border: var(--mat-switch-track-outline-width) solid var(--mat-switch-unselected-track-outline-color);
  border-radius: var(--mat-sys-shape-corner-full);
  transition: background-color var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-standard), border-color var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-standard);
}

.mat-switch--checked .mat-switch__track {
  background: var(--mat-accent-color);
  border-color: var(--mat-accent-color);
}

.mat-switch__handle {
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: var(--mat-selection-control-current-handle-offset);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: var(--mat-selection-control-current-handle-size);
  block-size: var(--mat-selection-control-current-handle-size);
  background: var(--mat-switch-unselected-handle-color);
  border-radius: var(--mat-sys-shape-corner-full);
  transform: translateY(-50%);
  transition: inset-inline-start var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized), inline-size var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized), block-size var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized), background-color var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-standard);
}

.mat-switch--checked .mat-switch__handle {
  background: var(--mat-on-accent-color);
}

.mat-switch__icon {
  position: absolute;
  inline-size: var(--mat-switch-icon-size);
  block-size: var(--mat-switch-icon-size);
  transition: clip-path var(--mat-sys-motion-duration-short3) var(--mat-sys-motion-easing-emphasized);
}

.mat-switch__icon--selected {
  background: var(--mat-accent-color);
  clip-path: polygon(0 52%, 14% 52%, 38% 52%, 86% 52%, 100% 52%, 38% 52%);
}

.mat-switch--checked .mat-switch__icon--selected {
  clip-path: polygon(0 58%, 14% 44%, 38% 68%, 86% 20%, 100% 34%, 38% 96%);
}

.mat-switch__icon--unselected {
  background: var(--mat-switch-unselected-icon-color);
  clip-path: polygon(10% 50%, 50% 50%, 90% 50%, 50% 50%, 90% 50%, 50% 50%, 10% 50%, 50% 50%);
}

.mat-switch:not(.mat-switch--checked) .mat-switch__icon--unselected {
  clip-path: polygon(10% 0, 50% 40%, 90% 0, 100% 10%, 60% 50%, 100% 90%, 90% 100%, 50% 60%, 10% 100%, 0 90%, 40% 50%, 0 10%);
}

@supports (border-shape: inset(0 round 1px)) {
  .mat-switch__track {
    border-radius: 0;
    border-shape: inset(0 round var(--mat-sys-shape-corner-full));
  }

  .mat-switch__handle {
    border-radius: 0;
    border-shape: circle(50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .mat-switch__track,
  .mat-switch__handle,
  .mat-switch__icon {
    transition: none;
  }
}
</style>
