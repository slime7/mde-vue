<script setup>
import { computed, ref, useAttrs } from 'vue';
import MatIcon from '../mat-icon/MatIcon.vue';
import { isComponentColor } from '../button-props';
import {
  formatSliderNumber,
  getSliderPercentage,
  getSliderStopValues,
  getSliderValueFromKeyboard,
  getSliderValueFromPointer,
  isFiniteNumber,
  isPositiveNumber,
  isSliderOrientation,
  isSliderSize,
  isSliderVariant,
  normalizeSliderValue,
  resolveSliderBounds,
  resolveSliderCenter,
  resolveSliderStep,
} from '../slider-utils';
import useComponentColor from '../use-component-color';

defineOptions({
  name: 'MatSlider',
  inheritAttrs: false,
});

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
    validator: isFiniteNumber,
  },
  min: {
    type: Number,
    default: 0,
    validator: isFiniteNumber,
  },
  max: {
    type: Number,
    default: 100,
    validator: isFiniteNumber,
  },
  step: {
    type: Number,
    default: 1,
    validator: isPositiveNumber,
  },
  variant: {
    type: String,
    default: 'standard',
    validator: isSliderVariant,
  },
  center: {
    type: Number,
    default: undefined,
    validator(value) {
      return value === undefined || isFiniteNumber(value);
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
  orientation: {
    type: String,
    default: 'horizontal',
    validator: isSliderOrientation,
  },
  size: {
    type: String,
    default: 'extra-small',
    validator: isSliderSize,
  },
  insetIcon: {
    type: String,
    default: undefined,
    validator(value) {
      return value === undefined || value.length > 0;
    },
  },
  showStopIndicator: {
    type: Boolean,
    default: false,
  },
  showValueIndicator: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits({
  'update:modelValue'(value) {
    return isFiniteNumber(value);
  },
  input(event) {
    return event instanceof Event;
  },
  change(event) {
    return event instanceof Event;
  },
});

const attrs = useAttrs();
const interaction = ref(null);
const nativeInput = ref(null);
const dragging = ref(false);
const dragPointerId = ref(undefined);
const dragValue = ref(undefined);
const dragChanged = ref(false);
const isFocused = ref(false);
const { colorStyle } = useComponentColor(computed(() => props.color));

const bounds = computed(() => resolveSliderBounds(props.min, props.max));
const resolvedStep = computed(() => resolveSliderStep(props.step));
const normalizedValue = computed(() => normalizeSliderValue(
  props.modelValue,
  bounds.value,
  resolvedStep.value,
));
const displayedValue = computed(() => (
  dragging.value ? dragValue.value : normalizedValue.value
));
const centerValue = computed(() => resolveSliderCenter(
  props.center,
  bounds.value,
  resolvedStep.value,
));
const valuePosition = computed(() => getSliderPercentage(displayedValue.value, bounds.value));
const centerPosition = computed(() => getSliderPercentage(
  props.variant === 'centered' ? centerValue.value : bounds.value.min,
  bounds.value,
));
const activeTrackStartPosition = computed(() => Math.min(
  valuePosition.value,
  centerPosition.value,
));
const activeTrackSize = computed(() => Math.abs(
  valuePosition.value - centerPosition.value,
));
const stopValues = computed(() => (
  props.showStopIndicator
    ? getSliderStopValues(bounds.value, resolvedStep.value)
    : []
));
const showInsetIcon = computed(() => (
  props.insetIcon !== undefined
  && ['medium', 'large', 'extra-large'].includes(props.size)
));
const insetIconOpticalSize = computed(() => (
  props.size === 'extra-large' ? 32 : 24
));
const showValueIndicator = computed(() => (
  props.showValueIndicator && (dragging.value || isFocused.value)
));
const rootStyle = computed(() => ({
  ...colorStyle.value,
  '--mat-slider-active-start-position': `${formatSliderNumber(activeTrackStartPosition.value)}%`,
  '--mat-slider-active-track-size': `${formatSliderNumber(activeTrackSize.value)}%`,
  '--mat-slider-center-position': `${formatSliderNumber(centerPosition.value)}%`,
  '--mat-slider-position': `${formatSliderNumber(valuePosition.value)}%`,
}));

/**
 * @param {number} value
 * @param {Event} event
 * @returns {boolean}
 */
function updateValue(value, event) {
  const currentValue = dragging.value ? dragValue.value : normalizedValue.value;

  if (value === undefined || value === currentValue) {
    return false;
  }

  if (dragging.value) {
    dragValue.value = value;
  }

  emit('update:modelValue', value);
  emit('input', event);

  return true;
}

/**
 * @param {PointerEvent} event
 * @returns {boolean}
 */
function updateValueFromPointer(event) {
  if (!interaction.value) {
    return false;
  }

  const value = getSliderValueFromPointer(
    event,
    interaction.value,
    bounds.value,
    resolvedStep.value,
    props.orientation,
  );

  return updateValue(value, event);
}

/**
 * @param {PointerEvent} event
 */
function handlePointerDown(event) {
  if (props.disabled) {
    return;
  }

  dragPointerId.value = event.pointerId;
  dragValue.value = normalizedValue.value;
  dragChanged.value = false;
  dragging.value = true;
  nativeInput.value?.focus();
  interaction.value?.setPointerCapture?.(event.pointerId);
  dragChanged.value = updateValueFromPointer(event);
}

/**
 * @param {PointerEvent} event
 */
function handlePointerMove(event) {
  if (!dragging.value || event.pointerId !== dragPointerId.value) {
    return;
  }

  dragChanged.value = updateValueFromPointer(event) || dragChanged.value;
}

/**
 * @param {PointerEvent} event
 * @param {boolean} shouldEmitChange
 */
function finishPointerInteraction(event, shouldEmitChange) {
  if (!dragging.value || event.pointerId !== dragPointerId.value) {
    return;
  }

  if (shouldEmitChange) {
    dragChanged.value = updateValueFromPointer(event) || dragChanged.value;
  }

  if (shouldEmitChange && dragChanged.value) {
    emit('change', event);
  }

  dragging.value = false;
  dragChanged.value = false;
  dragPointerId.value = undefined;
  dragValue.value = undefined;
}

/**
 * @param {KeyboardEvent} event
 */
function handleKeyDown(event) {
  if (props.disabled) {
    return;
  }

  const value = getSliderValueFromKeyboard(
    normalizedValue.value,
    event.key,
    bounds.value,
    resolvedStep.value,
  );

  if (value === undefined) {
    return;
  }

  event.preventDefault();

  if (updateValue(value, event)) {
    emit('change', event);
  }
}
</script>

<template>
  <div
    v-bind="attrs"
    class="mat-slider"
    :class="[
      `mat-slider--${orientation}`,
      `mat-slider--size-${size}`,
      `mat-slider--${variant}`,
      {
        'mat-slider--disabled': disabled,
        'mat-slider--dragging': dragging,
      },
    ]"
    :style="rootStyle"
  >
    <span
      class="mat-slider__track"
      aria-hidden="true"
    >
      <span class="mat-slider__active-track" />

      <span
        v-for="stopValue in stopValues"
        :key="stopValue"
        class="mat-slider__stop"
        :class="{
          'mat-slider__stop--active': stopValue >= Math.min(centerValue, displayedValue)
            && stopValue <= Math.max(centerValue, displayedValue),
        }"
        :style="{
          '--mat-slider-stop-position': `${formatSliderNumber(getSliderPercentage(stopValue, bounds))}%`,
        }"
      />

      <MatIcon
        v-if="showInsetIcon"
        class="mat-slider__inset-icon"
        :icon="insetIcon"
        :optical-size="insetIconOpticalSize"
        size="var(--mat-slider-current-inset-icon-size)"
        aria-hidden="true"
      />

      <span class="mat-slider__handle">
        <span class="mat-slider__state-layer" />

        <span
          v-if="showValueIndicator"
          class="mat-slider__value-indicator"
        >
          {{ displayedValue }}
        </span>
      </span>
    </span>

    <span
      ref="interaction"
      class="mat-slider__interaction"
      aria-hidden="true"
      @lostpointercapture="finishPointerInteraction($event, false)"
      @pointercancel="finishPointerInteraction($event, false)"
      @pointerdown="handlePointerDown"
      @pointermove="handlePointerMove"
      @pointerup="finishPointerInteraction($event, true)"
    />

    <input
      ref="nativeInput"
      class="mat-slider__native-input"
      type="range"
      :aria-label="attrs['aria-label']"
      :aria-orientation="orientation"
      :aria-valuemax="bounds.max"
      :aria-valuemin="bounds.min"
      :aria-valuenow="displayedValue"
      :disabled="disabled"
      :max="bounds.max"
      :min="bounds.min"
      :step="resolvedStep"
      :value="displayedValue"
      @blur="isFocused = false"
      @focus="isFocused = true"
      @keydown="handleKeyDown"
    >
  </div>
</template>

<style scoped>
.mat-slider {
  --mat-slider-current-active-track-color: var(--mat-accent-color, var(--mat-slider-active-track-color));
  --mat-slider-current-handle-color: var(--mat-accent-color, var(--mat-slider-handle-color));
  --mat-slider-current-inactive-track-color: var(--mat-slider-inactive-track-color);
  --mat-slider-current-state-layer-color: var(--mat-accent-color, var(--mat-slider-state-layer-color));
  --mat-slider-current-stop-color: var(--mat-slider-stop-indicator-color);
  --mat-slider-current-track-corner: var(--mat-slider-extra-small-track-corner);
  --mat-slider-current-track-height: var(--mat-slider-extra-small-track-height);
  --mat-slider-current-handle-height: var(--mat-slider-extra-small-handle-height);
  --mat-slider-current-inset-icon-size: 0;
  position: relative;
  display: block;
  box-sizing: border-box;
  inline-size: 100%;
  min-inline-size: 112px;
  min-block-size: max(var(--mat-sys-interaction-target-min-size), var(--mat-slider-current-track-height));
  color: var(--mat-sys-color-on-surface);
  isolation: isolate;
}

.mat-slider--size-small {
  --mat-slider-current-track-corner: var(--mat-slider-small-track-corner);
  --mat-slider-current-track-height: var(--mat-slider-small-track-height);
  --mat-slider-current-handle-height: var(--mat-slider-small-handle-height);
}

.mat-slider--size-medium {
  --mat-slider-current-track-corner: var(--mat-slider-medium-track-corner);
  --mat-slider-current-track-height: var(--mat-slider-medium-track-height);
  --mat-slider-current-handle-height: var(--mat-slider-medium-handle-height);
  --mat-slider-current-inset-icon-size: var(--mat-slider-medium-inset-icon-size);
}

.mat-slider--size-large {
  --mat-slider-current-track-corner: var(--mat-slider-large-track-corner);
  --mat-slider-current-track-height: var(--mat-slider-large-track-height);
  --mat-slider-current-handle-height: var(--mat-slider-large-handle-height);
  --mat-slider-current-inset-icon-size: var(--mat-slider-large-inset-icon-size);
}

.mat-slider--size-extra-large {
  --mat-slider-current-track-corner: var(--mat-slider-extra-large-track-corner);
  --mat-slider-current-track-height: var(--mat-slider-extra-large-track-height);
  --mat-slider-current-handle-height: var(--mat-slider-extra-large-handle-height);
  --mat-slider-current-inset-icon-size: var(--mat-slider-extra-large-inset-icon-size);
}

.mat-slider__track {
  position: absolute;
  inset-block-start: 50%;
  inset-inline: 0;
  display: block;
  block-size: var(--mat-slider-current-track-height);
  background: var(--mat-slider-current-inactive-track-color);
  border-radius: var(--mat-slider-current-track-corner);
  transform: translateY(-50%);
  transition: background-color var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-standard), block-size var(--mat-sys-motion-duration-medium1) var(--mat-sys-motion-easing-emphasized), border-radius var(--mat-sys-motion-duration-medium1) var(--mat-sys-motion-easing-emphasized);
}

.mat-slider__active-track {
  position: absolute;
  inset-block: 0;
  inset-inline-start: var(--mat-slider-active-start-position);
  display: block;
  inline-size: var(--mat-slider-active-track-size);
  background: var(--mat-slider-current-active-track-color);
  border-radius: inherit;
  transition: inset-inline-start var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized), inline-size var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized), background-color var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-standard);
}

.mat-slider__stop {
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: var(--mat-slider-stop-position);
  z-index: 1;
  display: block;
  inline-size: var(--mat-slider-stop-indicator-size);
  block-size: var(--mat-slider-stop-indicator-size);
  background: var(--mat-slider-current-stop-color);
  border-radius: var(--mat-sys-shape-corner-full);
  transform: translate(-50%, -50%);
}

.mat-slider__stop--active {
  background: var(--mat-on-accent-color, var(--mat-slider-active-stop-indicator-color));
}

.mat-slider__handle {
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: var(--mat-slider-position);
  z-index: 2;
  display: block;
  inline-size: var(--mat-slider-handle-width);
  block-size: var(--mat-slider-current-handle-height);
  background: var(--mat-slider-current-handle-color);
  border-radius: var(--mat-slider-current-track-corner);
  clip-path: inset(0 round var(--mat-slider-current-track-corner));
  transform: translate(-50%, -50%);
  transition: inset-inline-start var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized), inline-size var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized), block-size var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized), background-color var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-standard), clip-path var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized);
}

.mat-slider__state-layer {
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  inline-size: var(--mat-slider-state-layer-size);
  block-size: var(--mat-slider-state-layer-size);
  background: var(--mat-slider-current-state-layer-color);
  border-radius: var(--mat-sys-shape-corner-full);
  opacity: 0;
  transform: translate(-50%, -50%);
  transition: opacity var(--mat-sys-motion-duration-short2) var(--mat-sys-motion-easing-standard);
}

.mat-slider__value-indicator {
  position: absolute;
  inset-block-end: calc(100% + var(--mat-slider-value-indicator-offset));
  inset-inline-start: 50%;
  z-index: 1;
  display: grid;
  place-items: center;
  inline-size: var(--mat-slider-value-indicator-width);
  min-block-size: var(--mat-slider-value-indicator-height);
  padding-block-end: var(--mat-slider-value-indicator-arrow-size);
  box-sizing: border-box;
  background: var(--mat-slider-value-indicator-color);
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - var(--mat-slider-value-indicator-arrow-size)), 65% calc(100% - var(--mat-slider-value-indicator-arrow-size)), 50% 100%, 35% calc(100% - var(--mat-slider-value-indicator-arrow-size)), 0 calc(100% - var(--mat-slider-value-indicator-arrow-size)));
  color: var(--mat-slider-value-indicator-content-color);
  font: var(--mat-sys-typescale-label-large-font);
  font-size: var(--mat-sys-typescale-label-large-size);
  font-weight: var(--mat-sys-typescale-label-large-weight);
  letter-spacing: var(--mat-sys-typescale-label-large-tracking);
  line-height: var(--mat-sys-typescale-label-large-line-height);
  transform: translateX(-50%);
}

.mat-slider__inset-icon {
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: var(--mat-slider-inset-icon-offset);
  z-index: 1;
  color: var(--mat-on-accent-color, var(--mat-slider-inset-icon-color));
  transform: translateY(-50%);
}

.mat-slider__interaction {
  position: absolute;
  inset: 0;
  z-index: 3;
  cursor: pointer;
  touch-action: none;
}

.mat-slider__native-input {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  border: 0;
  clip-path: inset(50%);
  pointer-events: none;
  white-space: nowrap;
}

.mat-slider:not(.mat-slider--disabled):hover .mat-slider__state-layer {
  opacity: var(--mat-sys-state-hover-state-layer-opacity);
}

.mat-slider:has(.mat-slider__native-input:focus-visible) .mat-slider__state-layer {
  opacity: var(--mat-sys-state-focus-state-layer-opacity);
}

.mat-slider--dragging .mat-slider__state-layer {
  opacity: var(--mat-sys-state-pressed-state-layer-opacity);
}

.mat-slider--dragging .mat-slider__handle {
  inline-size: var(--mat-slider-pressed-handle-width);
  clip-path: inset(0 round calc(var(--mat-slider-current-track-corner) * .7));
}

.mat-slider--disabled {
  --mat-slider-current-active-track-color: var(--mat-slider-disabled-track-color);
  --mat-slider-current-handle-color: var(--mat-slider-disabled-handle-color);
  --mat-slider-current-inactive-track-color: var(--mat-slider-disabled-track-color);
  --mat-slider-current-stop-color: var(--mat-slider-disabled-stop-indicator-color);
  cursor: not-allowed;
}

.mat-slider--disabled .mat-slider__track {
  opacity: var(--mat-sys-state-disabled-content-opacity);
}

.mat-slider--disabled .mat-slider__interaction {
  cursor: not-allowed;
}

.mat-slider--vertical {
  inline-size: max(var(--mat-sys-interaction-target-min-size), var(--mat-slider-current-track-height));
  min-inline-size: 0;
  block-size: var(--mat-slider-vertical-length);
  min-block-size: var(--mat-sys-interaction-target-min-size);
}

.mat-slider--vertical .mat-slider__track {
  inset-block: 0;
  inset-inline-start: 50%;
  inline-size: var(--mat-slider-current-track-height);
  block-size: auto;
  transform: translateX(-50%);
}

.mat-slider--vertical .mat-slider__active-track {
  inset-block-end: var(--mat-slider-active-start-position);
  inset-inline: 0;
  block-size: var(--mat-slider-active-track-size);
  inline-size: auto;
  transition: inset-block-end var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized), block-size var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized), background-color var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-standard);
}

.mat-slider--vertical .mat-slider__stop {
  inset-block-end: var(--mat-slider-stop-position);
  inset-inline-start: 50%;
  transform: translate(-50%, 50%);
}

.mat-slider--vertical .mat-slider__handle {
  inset-block: auto var(--mat-slider-position);
  inset-inline-start: 50%;
  inline-size: var(--mat-slider-current-handle-height);
  block-size: var(--mat-slider-handle-width);
  transform: translate(-50%, 50%);
}

.mat-slider--vertical .mat-slider__inset-icon {
  inset-block: auto var(--mat-slider-inset-icon-offset);
  inset-inline-start: 50%;
  transform: translateX(-50%);
}

.mat-slider--vertical .mat-slider__value-indicator {
  inset-block-end: 50%;
  inset-inline-start: calc(100% + var(--mat-slider-value-indicator-offset));
  padding-block-end: 0;
  padding-inline-start: var(--mat-slider-value-indicator-arrow-size);
  clip-path: polygon(var(--mat-slider-value-indicator-arrow-size) 0, 100% 0, 100% 100%, var(--mat-slider-value-indicator-arrow-size) 100%, var(--mat-slider-value-indicator-arrow-size) 65%, 0 50%, var(--mat-slider-value-indicator-arrow-size) 35%);
  transform: translateY(50%);
}

@supports (border-shape: inset(0 round 1px)) {
  .mat-slider__track,
  .mat-slider__active-track,
  .mat-slider__handle {
    border-radius: 0;
    border-shape: inset(0 round var(--mat-slider-current-track-corner));
  }
}

@media (prefers-reduced-motion: reduce) {
  .mat-slider__track,
  .mat-slider__active-track,
  .mat-slider__handle,
  .mat-slider__state-layer {
    transition: none;
  }
}
</style>
