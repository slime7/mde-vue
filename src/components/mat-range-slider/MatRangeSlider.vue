<script setup>
import {
  computed, inject, ref, useAttrs,
} from 'vue';
import MAT_UI_KEY, { DEFAULT_MAT_UI_OPTIONS } from '../../mat-ui-context';
import { isComponentColor } from '../button-props';
import MatTooltip from '../mat-tooltip/MatTooltip.vue';
import {
  getSliderPercentage,
  getSliderStopValues,
  getSliderValueFromKeyboard,
  getSliderValueFromPointer,
  getSliderVisualPosition,
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
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatRangeSlider',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * `v-model` 当前范围，格式为 `[start, end]`。
   *
   * @type {[number, number]}
   * @default [0, 100]
   */
  modelValue: {
    type: Array,
    default() {
      return [0, 100];
    },
    validator: isRangeSliderModelValue,
  },
  /**
   * 可选范围最小值。
   *
   * @type {number}
   * @default 0
   */
  min: {
    type: Number,
    default: 0,
    validator: isFiniteNumber,
  },
  /**
   * 可选范围最大值。
   *
   * @type {number}
   * @default 100
   */
  max: {
    type: Number,
    default: 100,
    validator: isFiniteNumber,
  },
  /**
   * 每次键盘或指针调整的步长，必须为正数。
   *
   * @type {number}
   * @default 1
   */
  step: {
    type: Number,
    default: 1,
    validator: isPositiveNumber,
  },
  /**
   * 禁止指针与键盘交互。
   *
   * @type {boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 语义色或六位十六进制种子色 `#RRGGBB`。
   *
   * @type {string | undefined}
   * @default undefined
   */
  color: {
    type: String,
    default: undefined,
    validator: isComponentColor,
  },
  /**
   * 滑块方向；可选值为 `horizontal`、`vertical`。
   *
   * @type {string}
   * @default 'horizontal'
   */
  orientation: {
    type: String,
    default: 'horizontal',
    validator: isSliderOrientation,
  },
  /**
   * 滑块尺寸；可选值为 `extra-small`、`small`、`medium`、`large`、`extra-large`。
   *
   * @type {string}
   * @default 'extra-small'
   */
  size: {
    type: String,
    default: 'extra-small',
    validator: isSliderSize,
  },
  /**
   * 是否显示停靠点指示器。
   *
   * @type {boolean}
   * @default false
   */
  showStopIndicator: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否显示当前值指示器。
   *
   * @type {boolean}
   * @default false
   */
  showValueIndicator: {
    type: Boolean,
    default: false,
  },
  /**
   * 起始手柄的无障碍名称。
   *
   * @type {string | undefined}
   * @default undefined
   */
  ariaLabelStart: {
    type: String,
    default: undefined,
    validator(value) {
      return value === undefined || typeof value === 'string';
    },
  },
  /**
   * 结束手柄的无障碍名称。
   *
   * @type {string | undefined}
   * @default undefined
   */
  ariaLabelEnd: {
    type: String,
    default: undefined,
    validator(value) {
      return value === undefined || typeof value === 'string';
    },
  },
});
const propsWithDefaults = useMatProps('rangeSlider', props);

const emit = defineEmits({
  /**
   * 任一端点发生变化时发出新的 `[start, end]` 数组。
   */
  'update:modelValue'(value) {
    return isRangeSliderModelValue(value);
  },
  /**
   * 数值变化时转发原生 input 事件。
   */
  input(event) {
    return event instanceof Event;
  },
  /**
   * 数值变化完成时转发原生 change 事件。
   */
  change(event) {
    return event instanceof Event;
  },
});

const attrs = useAttrs();
const handleElements = ref([]);
const interaction = ref(null);
const startInput = ref(null);
const endInput = ref(null);
const activeHandle = ref(0);
const focusedHandle = ref(undefined);
const dragging = ref(false);
const dragPointerId = ref(undefined);
const dragValue = ref(undefined);
const dragChanged = ref(false);
const matUi = inject(MAT_UI_KEY, DEFAULT_MAT_UI_OPTIONS);
const { colorStyle } = useComponentColor(computed(() => propsWithDefaults.color));

const bounds = computed(() => resolveSliderBounds(propsWithDefaults.min, propsWithDefaults.max));
const resolvedStep = computed(() => resolveSliderStep(propsWithDefaults.step));
const normalizedValue = computed(() => normalizeRangeSliderValue(
  propsWithDefaults.modelValue?.[0],
  propsWithDefaults.modelValue?.[1],
  bounds.value,
  resolvedStep.value,
));
const displayedValue = computed(() => (
  dragging.value ? dragValue.value : normalizedValue.value
));
const startPosition = computed(() => getSliderPercentage(displayedValue.value[0], bounds.value));
const endPosition = computed(() => getSliderPercentage(displayedValue.value[1], bounds.value));
const formattedStartPosition = computed(() => getSliderVisualPosition(startPosition.value));
const formattedEndPosition = computed(() => getSliderVisualPosition(endPosition.value));
const stopValues = computed(() => (
  propsWithDefaults.showStopIndicator
    ? getSliderStopValues(bounds.value, resolvedStep.value)
    : [bounds.value.min, bounds.value.max]
));
const activeHandleElement = computed(() => handleElements.value[activeHandle.value] ?? null);
const activeValue = computed(() => displayedValue.value[activeHandle.value]);
const showValueIndicatorState = computed(() => (
  propsWithDefaults.showValueIndicator
  && (dragging.value || focusedHandle.value === activeHandle.value)
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
    propsWithDefaults.orientation,
  );

  return updateRangeValue(activeHandle.value, value, event);
}

/**
 * @param {PointerEvent} event
 */
function handlePointerDown(event) {
  if (propsWithDefaults.disabled || !interaction.value) {
    return;
  }

  const value = getSliderValueFromPointer(
    event,
    interaction.value,
    bounds.value,
    resolvedStep.value,
    propsWithDefaults.orientation,
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
  if (propsWithDefaults.disabled) {
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
 * @param {Element | import('vue').ComponentPublicInstance | null} element
 */
function setHandleElement(index, element) {
  handleElements.value[index] = element instanceof HTMLElement ? element : null;
}
</script>

<template>
  <div
    v-bind="attrs"
    class="mat-range-slider"
    :class="[
      `mat-range-slider--${propsWithDefaults.orientation}`,
      `mat-range-slider--size-${propsWithDefaults.size}`,
      {
        'mat-range-slider--disabled': propsWithDefaults.disabled,
        'mat-range-slider--dragging': dragging,
        'mat-range-slider--use-cursor': matUi.useCursor,
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
          '--mat-range-slider-stop-position': getSliderVisualPosition(
            getSliderPercentage(stopValue, bounds),
          ),
        }"
      />

      <span
        v-for="(value, index) in displayedValue"
        :key="index"
        :ref="(element) => setHandleElement(index, element)"
        class="mat-range-slider__handle"
        :class="[
          `mat-range-slider__handle--${index === 0 ? 'start' : 'end'}`,
          { 'mat-range-slider__handle--active': activeHandle === index },
        ]"
      >
        <span class="mat-range-slider__handle-shape" />
      </span>
    </span>

    <MatTooltip
      class="mat-range-slider__value-indicator"
      data-slider-value-indicator
      :content="String(activeValue)"
      :location="propsWithDefaults.orientation === 'vertical' ? 'right' : 'top'"
      :model-value="showValueIndicatorState"
      :target="activeHandleElement"
    />

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
      :aria-label="propsWithDefaults.ariaLabelStart"
      :aria-orientation="propsWithDefaults.orientation"
      :aria-valuemax="displayedValue[1]"
      :aria-valuemin="bounds.min"
      :aria-valuenow="displayedValue[0]"
      :disabled="propsWithDefaults.disabled"
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
      :aria-label="propsWithDefaults.ariaLabelEnd"
      :aria-orientation="propsWithDefaults.orientation"
      :aria-valuemax="bounds.max"
      :aria-valuemin="displayedValue[0]"
      :aria-valuenow="displayedValue[1]"
      :disabled="propsWithDefaults.disabled"
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
  user-select: none;
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
  border-radius: var(--mat-slider-track-gap-corner);
  transition: inset-inline-start var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized), inline-size var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized), background-color var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-standard);
}

.mat-range-slider__inactive-track {
  background: var(--mat-range-slider-current-inactive-track-color);
}

.mat-range-slider__inactive-track--before {
  inset-inline: 0 auto;
  inline-size: var(--mat-range-slider-inactive-before-size);
  border-end-start-radius: var(--mat-range-slider-current-track-corner);
  border-start-start-radius: var(--mat-range-slider-current-track-corner);
}

.mat-range-slider__active-track {
  inset-inline: var(--mat-range-slider-active-visible-start) auto;
  inline-size: var(--mat-range-slider-active-visible-size);
  background: var(--mat-range-slider-current-active-track-color);
}

.mat-range-slider__inactive-track--after {
  inset-inline: var(--mat-range-slider-inactive-after-start) auto;
  inline-size: var(--mat-range-slider-inactive-after-size);
  border-end-end-radius: var(--mat-range-slider-current-track-corner);
  border-start-end-radius: var(--mat-range-slider-current-track-corner);
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
  border-radius: var(--mat-range-slider-current-track-corner);
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

.mat-range-slider__interaction {
  position: absolute;
  inset: 0;
  z-index: 3;
  cursor: default;
  touch-action: none;
}

.mat-range-slider--use-cursor .mat-range-slider__interaction {
  cursor: pointer;
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

.mat-range-slider:has(.mat-range-slider__native-input:focus-visible) .mat-range-slider__handle--active {
  outline: var(--mat-slider-focus-indicator-width) solid var(--mat-slider-focus-indicator-color);
  outline-offset: var(--mat-slider-focus-indicator-offset);
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
  border-radius: var(--mat-slider-track-gap-corner);
  border-end-end-radius: var(--mat-range-slider-current-track-corner);
  border-end-start-radius: var(--mat-range-slider-current-track-corner);
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
  border-radius: var(--mat-slider-track-gap-corner);
  border-start-end-radius: var(--mat-range-slider-current-track-corner);
  border-start-start-radius: var(--mat-range-slider-current-track-corner);
}

.mat-range-slider--vertical .mat-range-slider__stop {
  inset-block: auto var(--mat-range-slider-stop-position);
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

.mat-range-slider--dragging .mat-range-slider__active-track,
.mat-range-slider--dragging .mat-range-slider__inactive-track {
  transition-property: background-color;
}

.mat-range-slider--dragging .mat-range-slider__handle--active {
  inline-size: var(--mat-slider-pressed-handle-width);
  transition-property: inline-size, block-size;
}

@supports (border-shape: inset(0 round 1px)) {
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
  .mat-range-slider__handle-shape {
    transition: none;
  }
}
</style>
