<script setup>
import { computed } from 'vue';
import MatSelectionControlBase from '../MatSelectionControlBase.vue';
import { isComponentColor } from '../button-props';
import { isCheckboxModelValue, isSelectionValue } from '../selection-control';

defineOptions({
  name: 'MatCheckbox',
  inheritAttrs: false,
});

const props = defineProps({
  modelValue: {
    type: [Boolean, Array],
    default: false,
    validator: isCheckboxModelValue,
  },
  value: {
    type: [String, Number, Boolean],
    default: true,
    validator: isSelectionValue,
  },
  indeterminate: {
    type: Boolean,
    default: false,
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
  'update:modelValue': isCheckboxModelValue,
  'update:indeterminate'(value) {
    return typeof value === 'boolean';
  },
  change(event) {
    return event instanceof Event;
  },
});
const checked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.some((item) => Object.is(item, props.value));
  }

  return props.modelValue;
});

/**
 * @param {Event} event
 */
function handleChange(event) {
  const nextChecked = event.target.checked;

  if (Array.isArray(props.modelValue)) {
    const nextValue = nextChecked
      ? [...props.modelValue, props.value]
      : props.modelValue.filter((item) => !Object.is(item, props.value));

    emit('update:modelValue', nextValue);
  } else {
    emit('update:modelValue', nextChecked);
  }

  emit('update:indeterminate', false);
  emit('change', event);
}
</script>

<template>
  <MatSelectionControlBase
    v-bind="$attrs"
    class="mat-checkbox"
    :class="{
      'mat-checkbox--checked': checked,
      'mat-checkbox--indeterminate': indeterminate,
    }"
    :checked="checked"
    :color="color"
    :disabled="disabled"
    :indeterminate="indeterminate"
    input-type="checkbox"
    :input-value="value"
    label-name="MatCheckbox"
    @change="handleChange"
  >
    <template #indicator>
      <span class="mat-checkbox__box">
        <span class="mat-checkbox__check" />
        <span class="mat-checkbox__mixed" />
      </span>
    </template>

    <slot />
  </MatSelectionControlBase>
</template>

<style scoped>
.mat-checkbox {
  --mat-accent-color: var(--mat-checkbox-selected-container-color);
  --mat-on-accent-color: var(--mat-checkbox-selected-icon-color);
  --mat-selection-control-indicator-width: var(--mat-checkbox-container-size);
  --mat-selection-control-indicator-height: var(--mat-checkbox-container-size);
  --mat-selection-control-state-layer-size: var(--mat-checkbox-state-layer-size);
  --mat-selection-control-state-layer-color: var(--mat-checkbox-unselected-state-layer-color);
  --mat-selection-control-label-color: var(--mat-checkbox-label-text-color);
}

.mat-checkbox--checked,
.mat-checkbox--indeterminate {
  --mat-selection-control-state-layer-color: var(--mat-accent-color);
}

.mat-checkbox__box {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: 100%;
  block-size: 100%;
  box-sizing: border-box;
  overflow: hidden;
  background: transparent;
  border: var(--mat-checkbox-outline-width) solid var(--mat-checkbox-unselected-outline-color);
  border-radius: var(--mat-checkbox-container-shape);
  transition: background-color var(--mat-sys-motion-duration-short3) var(--mat-sys-motion-easing-standard), border-color var(--mat-sys-motion-duration-short3) var(--mat-sys-motion-easing-standard);
}

.mat-checkbox--checked .mat-checkbox__box,
.mat-checkbox--indeterminate .mat-checkbox__box {
  background: var(--mat-accent-color);
  border-color: var(--mat-accent-color);
}

.mat-checkbox__check,
.mat-checkbox__mixed {
  position: absolute;
  inline-size: 12px;
  block-size: 10px;
  background: var(--mat-on-accent-color);
  transition: clip-path var(--mat-sys-motion-duration-short3) var(--mat-sys-motion-easing-emphasized);
}

.mat-checkbox__check {
  clip-path: polygon(0 52%, 14% 52%, 38% 52%, 86% 52%, 100% 52%, 38% 52%);
}

.mat-checkbox--checked:not(.mat-checkbox--indeterminate) .mat-checkbox__check {
  clip-path: polygon(0 58%, 14% 44%, 38% 68%, 86% 20%, 100% 34%, 38% 96%);
}

.mat-checkbox__mixed {
  clip-path: polygon(10% 50%, 10% 50%, 90% 50%, 90% 50%);
}

.mat-checkbox--indeterminate .mat-checkbox__mixed {
  clip-path: polygon(10% 40%, 10% 60%, 90% 60%, 90% 40%);
}

@supports (border-shape: inset(0 round 2px)) {
  .mat-checkbox__box {
    border-radius: 0;
    border-shape: inset(0 round var(--mat-checkbox-container-shape));
  }
}

@media (prefers-reduced-motion: reduce) {
  .mat-checkbox__box,
  .mat-checkbox__check,
  .mat-checkbox__mixed {
    transition: none;
  }
}
</style>
