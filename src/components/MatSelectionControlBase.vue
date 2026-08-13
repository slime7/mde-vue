<script setup>
import {
  computed, inject, onMounted, ref, useAttrs, useSlots,
} from 'vue';
import MAT_UI_KEY, { DEFAULT_MAT_UI_OPTIONS } from '../mat-ui-context';
import { isComponentColor } from './button-props';
import useComponentColor from './use-component-color';

defineOptions({
  name: 'MatSelectionControlBase',
  inheritAttrs: false,
});

const props = defineProps({
  checked: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: undefined,
    validator: isComponentColor,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  indeterminate: {
    type: Boolean,
    default: false,
  },
  inputRole: {
    type: String,
    default: undefined,
  },
  inputType: {
    type: String,
    required: true,
    validator(value) {
      return ['checkbox', 'radio'].includes(value);
    },
  },
  inputValue: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  labelName: {
    type: String,
    required: true,
  },
  tabindex: {
    type: [String, Number],
    default: undefined,
  },
});

const emit = defineEmits({
  change(event) {
    return event instanceof Event;
  },
  keydown(event) {
    return event instanceof KeyboardEvent;
  },
});
const attrs = useAttrs();
const slots = useSlots();
const input = ref(null);
const matUi = inject(MAT_UI_KEY, DEFAULT_MAT_UI_OPTIONS);
const { colorStyle } = useComponentColor(computed(() => props.color));
const rootAttrs = computed(() => {
  const result = {};

  ['class', 'inert', 'aria-hidden'].forEach((name) => {
    if (attrs[name] !== undefined) {
      result[name] = attrs[name];
    }
  });

  return result;
});
const inputAttrs = computed(() => Object.fromEntries(
  Object.entries(attrs).filter(([name]) => (
    !['class', 'style', 'inert', 'aria-hidden'].includes(name)
  )),
));
const rootStyle = computed(() => [colorStyle.value, attrs.style]);
const isDecorative = computed(() => (
  attrs.inert !== undefined
    || attrs['aria-hidden'] === true
    || attrs['aria-hidden'] === 'true'
));

onMounted(() => {
  if (!slots.default && !inputAttrs.value['aria-label'] && !isDecorative.value) {
    console.warn(`${props.labelName}: 缺少默认标签内容时必须提供 aria-label`);
  }
});

function focusInput() {
  input.value?.focus();
}

/**
 * @returns {HTMLInputElement | null}
 */
function getInput() {
  return input.value;
}

defineExpose({
  focusInput,
  getInput,
});
</script>

<template>
  <label
    v-bind="rootAttrs"
    class="mat-selection-control mat-sys-typescale-body-large"
    :class="{
      'mat-selection-control--checked': checked,
      'mat-selection-control--disabled': disabled,
      'mat-selection-control--use-cursor': matUi.useCursor,
    }"
    :style="rootStyle"
  >
    <span class="mat-selection-control__target">
      <input
        ref="input"
        v-bind="inputAttrs"
        class="mat-selection-control__input"
        :aria-checked="indeterminate ? 'mixed' : checked"
        :checked="checked"
        :disabled="disabled"
        :indeterminate="indeterminate"
        :role="inputRole"
        :tabindex="tabindex"
        :type="inputType"
        :value="inputValue"
        @change="emit('change', $event)"
        @keydown="emit('keydown', $event)"
      >
      <span class="mat-selection-control__state-layer" aria-hidden="true" />
      <span class="mat-selection-control__focus-ring" aria-hidden="true" />
      <span class="mat-selection-control__indicator" aria-hidden="true">
        <slot name="indicator" />
      </span>
    </span>

    <span v-if="slots.default" class="mat-selection-control__label">
      <slot />
    </span>
  </label>
</template>

<style scoped>
.mat-selection-control {
  --mat-selection-control-target-width: var(--mat-sys-interaction-target-min-size);
  --mat-selection-control-state-layer-offset: calc((var(--mat-selection-control-target-width) - var(--mat-selection-control-state-layer-size)) / 2);
  --mat-selection-control-state-layer-translation: 0;
  --mat-selection-control-state-layer-color: var(--mat-sys-color-on-surface);
  --mat-selection-control-focus-ring-width: var(--mat-selection-control-state-layer-size);
  --mat-selection-control-focus-ring-height: var(--mat-selection-control-state-layer-size);
  --mat-selection-control-focus-ring-offset: var(--mat-selection-control-state-layer-offset);
  --mat-selection-control-focus-ring-translation: var(--mat-selection-control-state-layer-translation);
  --mat-selection-control-focus-ring-shape: var(--mat-sys-shape-corner-full);
  display: inline-flex;
  gap: var(--mat-selection-control-label-space, 8px);
  align-items: center;
  max-inline-size: 100%;
  min-block-size: var(--mat-sys-interaction-target-min-size);
  min-inline-size: 0;
  color: var(--mat-selection-control-label-color, var(--mat-sys-color-on-surface));
  cursor: default;
  user-select: none;
}

.mat-selection-control--use-cursor:not(.mat-selection-control--disabled) {
  cursor: pointer;
}

.mat-selection-control--disabled {
  cursor: not-allowed;
}

.mat-selection-control__target {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  inline-size: var(--mat-selection-control-target-width);
  block-size: var(--mat-sys-interaction-target-min-size);
}

.mat-selection-control__input {
  position: absolute;
  z-index: 2;
  inset: 0;
  inline-size: 100%;
  block-size: 100%;
  margin: 0;
  appearance: none;
  opacity: 0;
  cursor: inherit;
}

.mat-selection-control__state-layer {
  position: absolute;
  z-index: 0;
  inset-block-start: 50%;
  inset-inline-start: var(--mat-selection-control-state-layer-offset);
  inline-size: var(--mat-selection-control-state-layer-size);
  block-size: var(--mat-selection-control-state-layer-size);
  background: var(--mat-selection-control-state-layer-color);
  border-radius: var(--mat-sys-shape-corner-full);
  outline: 0 solid transparent;
  opacity: 0;
  pointer-events: none;
  transform: translate(var(--mat-selection-control-state-layer-translation), -50%);
  transition: transform var(--mat-sys-motion-spring-fast-spatial), opacity var(--mat-sys-motion-spring-fast-effects), outline-color var(--mat-sys-motion-spring-fast-effects);
}

.mat-selection-control__focus-ring {
  position: absolute;
  z-index: 1;
  inset-block-start: 50%;
  inset-inline-start: var(--mat-selection-control-focus-ring-offset);
  inline-size: var(--mat-selection-control-focus-ring-width);
  block-size: var(--mat-selection-control-focus-ring-height);
  border-radius: var(--mat-selection-control-focus-ring-shape);
  outline: 0 solid transparent;
  pointer-events: none;
  transform: translate(var(--mat-selection-control-focus-ring-translation), -50%);
  transition: transform var(--mat-sys-motion-spring-fast-spatial), outline-color var(--mat-sys-motion-spring-fast-effects);
}

.mat-selection-control__indicator {
  position: relative;
  z-index: 2;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  inline-size: var(--mat-selection-control-indicator-width);
  block-size: var(--mat-selection-control-indicator-height);
  pointer-events: none;
}

.mat-selection-control__input:not(:disabled):hover ~ .mat-selection-control__state-layer {
  opacity: var(--mat-sys-state-hover-state-layer-opacity);
}

.mat-selection-control__input:not(:disabled):active ~ .mat-selection-control__state-layer {
  opacity: var(--mat-sys-state-pressed-state-layer-opacity);
}

.mat-selection-control__input:focus-visible ~ .mat-selection-control__focus-ring {
  outline-width: var(--mat-sys-interaction-focus-ring-width);
  outline-color: var(--mat-sys-color-secondary);
  outline-offset: var(--mat-sys-interaction-focus-ring-offset);
}

.mat-selection-control__input:active ~ .mat-selection-control__indicator {
  --mat-selection-control-current-handle-size: var(--mat-selection-control-pressed-handle-size, var(--mat-selection-control-current-handle-size));
}

.mat-selection-control__label {
  flex: 0 1 auto;
  min-inline-size: 0;
  overflow-wrap: anywhere;
}

.mat-selection-control--disabled .mat-selection-control__indicator,
.mat-selection-control--disabled .mat-selection-control__label {
  opacity: var(--mat-sys-state-disabled-content-opacity);
}

@media (prefers-reduced-motion: reduce) {
  .mat-selection-control__state-layer,
  .mat-selection-control__focus-ring,
  .mat-selection-control__indicator {
    transition: none;
  }
}
</style>
