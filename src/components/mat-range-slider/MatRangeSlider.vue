<script setup>
import { computed, ref, useAttrs } from 'vue';
import { isComponentColor } from '../button-props';
import {
  formatSliderNumber,
  getSliderPercentage,
  getSliderStopValues,
  getSliderValueFromKeyboard,
  getSliderValueFromPointer,
  isFiniteNumber,
  isPositiveNumber,
  isRangeSliderModelValue,
  isSliderOrientation,
  isSliderSize,
  normalizeRangeSliderValue,
  resolveSliderBounds,
  resolveSliderStep,
} from '../slider-utils';
import useComponentColor from '../use-component-color';

defineOptions({
  name: 'MatRangeSlider',
  inheritAttrs: false,
});

const props = defineProps({
  modelValue: {
    type: Array,
    default() {
      return [0, 100];
    },
    validator: isRangeSliderModelValue,
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
  showStopIndicator: {
    type: Boolean,
    default: false,
  },
  showValueIndicator: {
    type: Boolean,
    default: false,
  },
  ariaLabelStart: {
    type: String,
    default: undefined,
    validator(value) {
      return value === undefined || typeof value === 'string';
    },
  },
  ariaLabelEnd: {
    type: String,
    default: undefined,
    validator(value) {
      return value === undefined || typeof value === 'string';
    },
  },
});

const emit = defineEmits({
  'update:modelValue'(value) {
    return isRangeSliderModelValue(value);
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
const startInput = ref(null);
const endInput = ref(null);
const activeHandle = ref(0);
const focusedHandle = ref(undefined);
const dragging = ref(false);
const dragPointerId = ref(undefined);
const dragValue = ref(undefined);
const dragChanged = ref(false);
const { colorStyle } = useComponentColor(computed(() => props.color));

const bounds = computed(() => resolveSliderBounds(props.min, props.max));
const resolvedStep = computed(() => resolveSliderStep(props.step));
const normalizedValue = computed(() => normalizeRangeSliderValue(
  props.modelValue?.[0],
  props.modelValue?.[1],
  bounds.value,
  resolvedStep.value,
));
const displayedValue = computed(() => (
  dragging.value ? dragValue.value : normalizedValue.value
));
const startPosition = computed(() => getSliderPercentage(displayedValue.value[0], bounds.value));
const endPosition = computed(() => getSliderPercentage(displayedValue.value[1], bounds.value));
const formattedStartPosition = computed(() => `${formatSliderNumber(startPosition.value)}%`);
const formattedEndPosition = computed(() => `${formatSliderNumber(endPosition.value)}%`);
const stopValues = computed(() => (
  props.showStopIndicator
    ? getSliderStopValues(bounds.value, resolvedStep.value)
    : []
));
const rootStyle = computed(() => ({
  ...colorStyle.value,
  '--mat-range-slider-active-visible-size': `max(0px, calc(${formattedEndPosition.value} - ${formattedStartPosition.value} - (var(--mat-slider-handle-track-gap) * 2)))`,
  '--mat-range-slider-active-visible-start': `calc(${formattedStartPosition.value} + var(--mat-slider-handle-track-gap))`,
  '--mat-range-slider-end-position': formattedEndPosition.value,
  '--mat-range-slider-inactive-after-size': `max(0px, calc(100% - ${formattedEndPosition.value} - var(--mat-slider-handle-track-gap)))`,
  '--mat-range-slider-inactive-after-start': `calc(${formattedEndPosition.value} + var(--mat-slider-handle-track-gap))`,
  '--mat-range-slider-inactive-before-size': `max(0px, calc(${formattedStartPosition.value} - var(--mat-slider-handle-track-gap)))`,
  '--mat-range-slider-start-position': formattedStartPosition.value,
}));

/**
 * @param {number} index
 * @returns {HTMLInputElement | null}
 */
function getInput(index) {
  return index === 0 ? startInput.value : endInput.value;
}

/**
 * @param {number} value
 * @returns {number}
 */
function getNearestHandle(value) {
  const [start, end] = displayedValue.value;

  return Math.abs(value - start) <= Math.abs(value - end) ? 0 : 1;
}

/**
 * @param {number} index
 * @param {number | undefined} value
 * @param {Event} event
 * @returns {boolean}
 */
function updateRangeValue(index, value, event) {
  if (value === undefined) {
    return false;
  }

  const [start, end] = dragging.value ? dragValue.value : normalizedValue.value;
  const nextValue = index === 0
    ? [Math.min(value, end), end]
    : [start, Math.max(value, start)];

  if (nextValue[0] === start && nextValue[1] === end) {
    return false;
  }

  if (dragging.value) {
    dragValue.value = nextValue;
  }

  emit('update:modelValue', nextValue);
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

  return updateRangeValue(activeHandle.value, value, event);
}

/**
 * @param {PointerEvent} event
 */
function handlePointerDown(event) {
  if (props.disabled || !interaction.value) {
    return;
  }

  const value = getSliderValueFromPointer(
    event,
    interaction.value,
    bounds.value,
    resolvedStep.value,
    props.orientation,
  );

  if (value === undefined) {
    return;
  }

  activeHandle.value = getNearestHandle(value);
  dragPointerId.value = event.pointerId;
  dragValue.value = [...normalizedValue.value];
  dragChanged.value = false;
  dragging.value = true;
  getInput(activeHandle.value)?.focus();
  interaction.value.setPointerCapture?.(event.pointerId);
  dragChanged.value = updateRangeValue(activeHandle.value, value, event);
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
 * @param {number} index
 * @param {KeyboardEvent} event
 */
function handleKeyDown(index, event) {
  if (props.disabled) {
    return;
  }

  const value = getSliderValueFromKeyboard(
    normalizedValue.value[index],
    event.key,
    bounds.value,
    resolvedStep.value,
  );

  if (value === undefined) {
    return;
  }

  event.preventDefault();
  activeHandle.value = index;

  if (updateRangeValue(index, value, event)) {
    emit('change', event);
  }
}

/**
 * @param {number} index
 */
function handleFocus(index) {
  activeHandle.value = index;
  focusedHandle.value = index;
}

/**
 * @param {number} index
 */
function handleBlur(index) {
  if (focusedHandle.value === index) {
    focusedHandle.value = undefined;
  }
}

/**
 * @param {number} index
 * @returns {boolean}
 */
function shouldShowValueIndicator(index) {
  return props.showValueIndicator
    && (dragging.value ? activeHandle.value === index : focusedHandle.value === index);
}
</script>

<template>
  <div
    v-bind="attrs"
    class="mat-range-slider"
    :class="[
      `mat-range-slider--${orientation}`,
      `mat-range-slider--size-${size}`,
      {
        'mat-range-slider--disabled': disabled,
        'mat-range-slider--dragging': dragging,
        'mat-range-slider--with-value-indicator': props.showValueIndicator,
      },
    ]"
    :style="rootStyle"
  >
    <span
      class="mat-range-slider__track"
      aria-hidden="true"
    >
      <span class="mat-range-slider__inactive-track mat-range-slider__inactive-track--before" />
      <span class="mat-range-slider__active-track" />
      <span class="mat-range-slider__inactive-track mat-range-slider__inactive-track--after" />

      <span
        v-for="stopValue in stopValues"
        :key="stopValue"
        class="mat-range-slider__stop"
        :class="{
          'mat-range-slider__stop--active': stopValue >= displayedValue[0]
            && stopValue <= displayedValue[1],
        }"
        :style="{
          '--mat-range-slider-stop-position': `${formatSliderNumber(getSliderPercentage(stopValue, bounds))}%`,
        }"
      />

      <span
        v-for="(value, index) in displayedValue"
        :key="index"
        class="mat-range-slider__handle"
        :class="[
          `mat-range-slider__handle--${index === 0 ? 'start' : 'end'}`,
          { 'mat-range-slider__handle--active': activeHandle === index },
        ]"
      >
        <span class="mat-range-slider__handle-shape" />
        <span class="mat-range-slider__state-layer" />

        <span
          v-if="shouldShowValueIndicator(index)"
          class="mat-range-slider__value-indicator"
        >
          {{ value }}
        </span>
      </span>
    </span>

    <span
      ref="interaction"
      class="mat-range-slider__interaction"
      aria-hidden="true"
      @lostpointercapture="finishPointerInteraction($event, false)"
      @pointercancel="finishPointerInteraction($event, false)"
      @pointerdown="handlePointerDown"
      @pointermove="handlePointerMove"
      @pointerup="finishPointerInteraction($event, true)"
    />

    <input
      ref="startInput"
      class="mat-range-slider__native-input"
      type="range"
      :aria-label="ariaLabelStart"
      :aria-orientation="orientation"
      :aria-valuemax="displayedValue[1]"
      :aria-valuemin="bounds.min"
      :aria-valuenow="displayedValue[0]"
      :disabled="disabled"
      :max="displayedValue[1]"
      :min="bounds.min"
      :step="resolvedStep"
      :value="displayedValue[0]"
      @blur="handleBlur(0)"
      @focus="handleFocus(0)"
      @keydown="handleKeyDown(0, $event)"
    >

    <input
      ref="endInput"
      class="mat-range-slider__native-input"
      type="range"
      :aria-label="ariaLabelEnd"
      :aria-orientation="orientation"
      :aria-valuemax="bounds.max"
      :aria-valuemin="displayedValue[0]"
      :aria-valuenow="displayedValue[1]"
      :disabled="disabled"
      :max="bounds.max"
      :min="displayedValue[0]"
      :step="resolvedStep"
      :value="displayedValue[1]"
      @blur="handleBlur(1)"
      @focus="handleFocus(1)"
      @keydown="handleKeyDown(1, $event)"
    >
  </div>
</template>

<style scoped>
.mat-range-slider {
  --mat-range-slider-current-active-track-color: var(--mat-accent-color, var(--mat-slider-active-track-color));
  --mat-range-slider-current-handle-color: var(--mat-accent-color, var(--mat-slider-handle-color));
  --mat-range-slider-current-inactive-track-color: var(--mat-slider-inactive-track-color);
  --mat-range-slider-current-state-layer-color: var(--mat-accent-color, var(--mat-slider-state-layer-color));
  --mat-range-slider-current-stop-color: var(--mat-accent-color, var(--mat-slider-stop-indicator-color));
  --mat-range-slider-current-track-corner: var(--mat-slider-extra-small-track-corner);
  --mat-range-slider-current-track-height: var(--mat-slider-extra-small-track-height);
  --mat-range-slider-current-handle-height: var(--mat-slider-extra-small-handle-height);
  position: relative;
  display: block;
  box-sizing: border-box;
  inline-size: 100%;
  min-inline-size: 112px;
  min-block-size: max(var(--mat-sys-interaction-target-min-size), var(--mat-range-slider-current-track-height));
  color: var(--mat-sys-color-on-surface);
  isolation: isolate;
}

.mat-range-slider--size-small {
  --mat-range-slider-current-track-corner: var(--mat-slider-small-track-corner);
  --mat-range-slider-current-track-height: var(--mat-slider-small-track-height);
  --mat-range-slider-current-handle-height: var(--mat-slider-small-handle-height);
}

.mat-range-slider--size-medium {
  --mat-range-slider-current-track-corner: var(--mat-slider-medium-track-corner);
  --mat-range-slider-current-track-height: var(--mat-slider-medium-track-height);
  --mat-range-slider-current-handle-height: var(--mat-slider-medium-handle-height);
}

.mat-range-slider--size-large {
  --mat-range-slider-current-track-corner: var(--mat-slider-large-track-corner);
  --mat-range-slider-current-track-height: var(--mat-slider-large-track-height);
  --mat-range-slider-current-handle-height: var(--mat-slider-large-handle-height);
}

.mat-range-slider--size-extra-large {
  --mat-range-slider-current-track-corner: var(--mat-slider-extra-large-track-corner);
  --mat-range-slider-current-track-height: var(--mat-slider-extra-large-track-height);
  --mat-range-slider-current-handle-height: var(--mat-slider-extra-large-handle-height);
}

.mat-range-slider--horizontal.mat-range-slider--with-value-indicator {
  min-block-size: calc(var(--mat-slider-value-indicator-height) + var(--mat-slider-value-indicator-offset) + max(var(--mat-sys-interaction-target-min-size), var(--mat-range-slider-current-handle-height)));
}

.mat-range-slider--horizontal.mat-range-slider--with-value-indicator .mat-range-slider__track {
  inset-block-start: calc(var(--mat-slider-value-indicator-height) + var(--mat-slider-value-indicator-offset) + (max(var(--mat-sys-interaction-target-min-size), var(--mat-range-slider-current-handle-height)) / 2));
}

.mat-range-slider__track {
  position: absolute;
  inset-block-start: 50%;
  inset-inline: 0;
  display: block;
  block-size: var(--mat-range-slider-current-track-height);
  transform: translateY(-50%);
  transition: block-size var(--mat-sys-motion-duration-medium1) var(--mat-sys-motion-easing-emphasized);
}

.mat-range-slider__active-track,
.mat-range-slider__inactive-track {
  position: absolute;
  inset-block: 0;
  display: block;
  border-radius: var(--mat-range-slider-current-track-corner);
  transition: inset-inline-start var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized), inline-size var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized), background-color var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-standard);
}

.mat-range-slider__inactive-track {
  background: var(--mat-range-slider-current-inactive-track-color);
}

.mat-range-slider__inactive-track--before {
  inset-inline: 0 auto;
  inline-size: var(--mat-range-slider-inactive-before-size);
}

.mat-range-slider__active-track {
  inset-inline: var(--mat-range-slider-active-visible-start) auto;
  inline-size: var(--mat-range-slider-active-visible-size);
  background: var(--mat-range-slider-current-active-track-color);
}

.mat-range-slider__inactive-track--after {
  inset-inline: var(--mat-range-slider-inactive-after-start) auto;
  inline-size: var(--mat-range-slider-inactive-after-size);
}

.mat-range-slider__stop {
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: var(--mat-range-slider-stop-position);
  z-index: 1;
  display: block;
  inline-size: var(--mat-slider-stop-indicator-size);
  block-size: var(--mat-slider-stop-indicator-size);
  background: var(--mat-range-slider-current-stop-color);
  border-radius: var(--mat-sys-shape-corner-full);
  transform: translate(-50%, -50%);
}

.mat-range-slider__stop--active {
  background: var(--mat-on-accent-color, var(--mat-slider-active-stop-indicator-color));
}

.mat-range-slider__handle {
  position: absolute;
  inset-block-start: 50%;
  z-index: 2;
  display: block;
  inline-size: var(--mat-slider-handle-width);
  block-size: var(--mat-range-slider-current-handle-height);
  transform: translate(-50%, -50%);
  transition: inset-inline-start var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized), inline-size var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized), block-size var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized);
}

.mat-range-slider__handle-shape {
  position: absolute;
  inset: 0;
  display: block;
  background: var(--mat-range-slider-current-handle-color);
  border-radius: var(--mat-range-slider-current-track-corner);
  clip-path: inset(0 round var(--mat-range-slider-current-track-corner));
  transition: background-color var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-standard), clip-path var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized);
}

.mat-range-slider__handle--start {
  inset-inline-start: var(--mat-range-slider-start-position);
}

.mat-range-slider__handle--end {
  inset-inline-start: var(--mat-range-slider-end-position);
}

.mat-range-slider__state-layer {
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  inline-size: var(--mat-slider-state-layer-size);
  block-size: var(--mat-slider-state-layer-size);
  background: var(--mat-range-slider-current-state-layer-color);
  border-radius: var(--mat-sys-shape-corner-full);
  opacity: 0;
  transform: translate(-50%, -50%);
  transition: opacity var(--mat-sys-motion-duration-short2) var(--mat-sys-motion-easing-standard);
}

.mat-range-slider__value-indicator {
  position: absolute;
  inset-block-end: calc(100% + var(--mat-slider-value-indicator-offset));
  inset-inline-start: 50%;
  z-index: 1;
  display: grid;
  place-items: center;
  inline-size: var(--mat-slider-value-indicator-width);
  block-size: var(--mat-slider-value-indicator-height);
  box-sizing: border-box;
  background: var(--mat-slider-value-indicator-color);
  border-radius: var(--mat-sys-shape-corner-full);
  color: var(--mat-slider-value-indicator-content-color);
  font: var(--mat-sys-typescale-label-large-font);
  font-size: var(--mat-sys-typescale-label-large-size);
  font-weight: var(--mat-sys-typescale-label-large-weight);
  letter-spacing: var(--mat-sys-typescale-label-large-tracking);
  line-height: var(--mat-sys-typescale-label-large-line-height);
  transform: translateX(-50%);
}

.mat-range-slider__value-indicator::after {
  position: absolute;
  inset-block-start: calc(100% - 1px);
  inset-inline-start: 50%;
  inline-size: calc(var(--mat-slider-value-indicator-arrow-size) * 2);
  block-size: var(--mat-slider-value-indicator-arrow-size);
  background: var(--mat-slider-value-indicator-color);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  content: '';
  transform: translateX(-50%);
}

.mat-range-slider__interaction {
  position: absolute;
  inset: 0;
  z-index: 3;
  cursor: pointer;
  touch-action: none;
}

.mat-range-slider__native-input {
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

.mat-range-slider:not(.mat-range-slider--disabled):hover .mat-range-slider__state-layer {
  opacity: var(--mat-sys-state-hover-state-layer-opacity);
}

.mat-range-slider:has(.mat-range-slider__native-input:focus-visible) .mat-range-slider__state-layer {
  opacity: var(--mat-sys-state-focus-state-layer-opacity);
}

.mat-range-slider--dragging .mat-range-slider__handle--active {
  inline-size: var(--mat-slider-pressed-handle-width);
}

.mat-range-slider--dragging .mat-range-slider__handle--active .mat-range-slider__state-layer {
  opacity: var(--mat-sys-state-pressed-state-layer-opacity);
}

.mat-range-slider--disabled {
  --mat-range-slider-current-active-track-color: var(--mat-slider-disabled-track-color);
  --mat-range-slider-current-handle-color: var(--mat-slider-disabled-handle-color);
  --mat-range-slider-current-inactive-track-color: var(--mat-slider-disabled-track-color);
  --mat-range-slider-current-stop-color: var(--mat-slider-disabled-stop-indicator-color);
  cursor: not-allowed;
}

.mat-range-slider--disabled .mat-range-slider__track {
  opacity: var(--mat-sys-state-disabled-content-opacity);
}

.mat-range-slider--disabled .mat-range-slider__interaction {
  cursor: not-allowed;
}

.mat-range-slider--vertical {
  inline-size: max(var(--mat-sys-interaction-target-min-size), var(--mat-range-slider-current-track-height));
  min-inline-size: 0;
  block-size: var(--mat-slider-vertical-length);
  min-block-size: var(--mat-sys-interaction-target-min-size);
}

.mat-range-slider--vertical .mat-range-slider__track {
  inset-block: 0;
  inset-inline: 50% auto;
  inline-size: var(--mat-range-slider-current-track-height);
  block-size: auto;
  transform: translateX(-50%);
}

.mat-range-slider--vertical .mat-range-slider__inactive-track--before {
  inset-block: auto 0;
  inset-inline: 0;
  inline-size: auto;
  block-size: var(--mat-range-slider-inactive-before-size);
}

.mat-range-slider--vertical .mat-range-slider__active-track {
  inset-block: auto var(--mat-range-slider-active-visible-start);
  inset-inline: 0;
  inline-size: auto;
  block-size: var(--mat-range-slider-active-visible-size);
  transition: inset-block-end var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized), block-size var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized), background-color var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-standard);
}

.mat-range-slider--vertical .mat-range-slider__inactive-track--after {
  inset-block: auto var(--mat-range-slider-inactive-after-start);
  inset-inline: 0;
  inline-size: auto;
  block-size: var(--mat-range-slider-inactive-after-size);
}

.mat-range-slider--vertical .mat-range-slider__stop {
  inset-block-end: var(--mat-range-slider-stop-position);
  inset-inline-start: 50%;
  transform: translate(-50%, 50%);
}

.mat-range-slider--vertical .mat-range-slider__handle {
  inset-block-start: auto;
  inset-inline: 50% auto;
  inline-size: var(--mat-range-slider-current-handle-height);
  block-size: var(--mat-slider-handle-width);
  transform: translate(-50%, 50%);
}

.mat-range-slider--vertical.mat-range-slider--dragging .mat-range-slider__handle--active {
  inline-size: var(--mat-range-slider-current-handle-height);
  block-size: var(--mat-slider-pressed-handle-width);
}

.mat-range-slider--vertical .mat-range-slider__handle--start {
  inset-block-end: var(--mat-range-slider-start-position);
}

.mat-range-slider--vertical .mat-range-slider__handle--end {
  inset-block-end: var(--mat-range-slider-end-position);
}

.mat-range-slider--vertical .mat-range-slider__value-indicator {
  inset-block-end: 50%;
  inset-inline-start: calc(100% + var(--mat-slider-value-indicator-offset));
  transform: translateY(50%);
}

.mat-range-slider--vertical .mat-range-slider__value-indicator::after {
  inset-block-start: 50%;
  inset-inline-start: calc((var(--mat-slider-value-indicator-arrow-size) * -1) + 1px);
  inline-size: var(--mat-slider-value-indicator-arrow-size);
  block-size: calc(var(--mat-slider-value-indicator-arrow-size) * 2);
  clip-path: polygon(0 50%, 100% 0, 100% 100%);
  transform: translateY(-50%);
}

@supports (border-shape: inset(0 round 1px)) {
  .mat-range-slider__active-track,
  .mat-range-slider__inactive-track,
  .mat-range-slider__handle-shape {
    border-radius: 0;
    border-shape: inset(0 round var(--mat-range-slider-current-track-corner));
  }
}

@media (prefers-reduced-motion: reduce) {
  .mat-range-slider__track,
  .mat-range-slider__active-track,
  .mat-range-slider__inactive-track,
  .mat-range-slider__handle,
  .mat-range-slider__handle-shape,
  .mat-range-slider__state-layer {
    transition: none;
  }
}
</style>
