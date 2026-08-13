<script setup>
import {
  computed, inject, onBeforeUnmount, onMounted, ref, useAttrs, useSlots, watch,
} from 'vue';
import MAT_UI_KEY, { DEFAULT_MAT_UI_OPTIONS } from '../../mat-ui-context';
import MatIcon from '../mat-icon/MatIcon.vue';
import MatTooltip from '../mat-tooltip/MatTooltip.vue';
import { isComponentColor } from '../button-props';
import createFrameScheduler from '../frame-scheduler';
import {
  getSliderPercentage,
  getSliderStopValues,
  getSliderValueFromKeyboard,
  getSliderValueFromPointer,
  getSliderVisualPosition,
  isFiniteNumber,
  isPositiveNumber,
  isSliderOrientation,
  isSliderSize,
  isSliderVariant,
  normalizeSliderValue,
  resolveSliderBounds,
  resolveSliderCenter,
  resolveSliderStep,
  SLIDER_TRACK_END_INSET,
} from '../slider-utils';
import useComponentColor from '../use-component-color';
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatSlider',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * `v-model` 当前数值。
   *
   * @type {number}
   * @default 0
   */
  modelValue: {
    type: Number,
    default: 0,
    validator: isFiniteNumber,
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
   * 轨道外观；可选值为 `standard`、`centered`。
   *
   * @type {string}
   * @default 'standard'
   */
  variant: {
    type: String,
    default: 'standard',
    validator: isSliderVariant,
  },
  /**
   * 中心值；未设置时不显示中心分割。
   *
   * @type {number | undefined}
   * @default undefined
   */
  center: {
    type: Number,
    default: undefined,
    validator(value) {
      return value === undefined || isFiniteNumber(value);
    },
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
   * 滑块内的 Material Symbols 图标文本。
   *
   * @type {string | undefined}
   * @default undefined
   */
  insetIcon: {
    type: String,
    default: undefined,
    validator(value) {
      return value === undefined || value.length > 0;
    },
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
});
const propsWithDefaults = useMatProps('slider', props);

const emit = defineEmits({
  /**
   * 数值因指针或键盘交互发生变化时发出下一 number。
   */
  'update:modelValue'(value) {
    return isFiniteNumber(value);
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
const slots = useSlots();
const root = ref(null);
const handle = ref(null);
const interaction = ref(null);
const nativeInput = ref(null);
const dragging = ref(false);
const dragPointerId = ref(undefined);
const dragValue = ref(undefined);
const dragChanged = ref(false);
const isFocused = ref(false);
const insetIconPlacement = ref('active');
const matUi = inject(MAT_UI_KEY, DEFAULT_MAT_UI_OPTIONS);
const { colorStyle } = useComponentColor(computed(() => propsWithDefaults.color));

const bounds = computed(() => resolveSliderBounds(propsWithDefaults.min, propsWithDefaults.max));
const resolvedStep = computed(() => resolveSliderStep(propsWithDefaults.step));
const normalizedValue = computed(() => normalizeSliderValue(
  propsWithDefaults.modelValue,
  bounds.value,
  resolvedStep.value,
));
const displayedValue = computed(() => (
  dragging.value ? dragValue.value : normalizedValue.value
));
const centerValue = computed(() => resolveSliderCenter(
  propsWithDefaults.center,
  bounds.value,
  resolvedStep.value,
));
const trackOriginValue = computed(() => (
  propsWithDefaults.variant === 'centered' ? centerValue.value : bounds.value.min
));
const valuePosition = computed(() => getSliderPercentage(displayedValue.value, bounds.value));
const centerPosition = computed(() => getSliderPercentage(
  trackOriginValue.value,
  bounds.value,
));
const formattedValuePosition = computed(() => getSliderVisualPosition(valuePosition.value));
const formattedCenterPosition = computed(() => (
  propsWithDefaults.variant === 'standard'
    ? '0%'
    : getSliderVisualPosition(centerPosition.value)
));
const trackDirection = computed(() => Math.sign(valuePosition.value - centerPosition.value));
const activeVisibleStart = computed(() => {
  if (trackDirection.value >= 0) {
    return formattedCenterPosition.value;
  }

  return `calc(${formattedValuePosition.value} + var(--mat-slider-handle-track-gap))`;
});
const activeVisibleSize = computed(() => {
  if (trackDirection.value > 0) {
    return `max(0px, calc(${formattedValuePosition.value} - ${formattedCenterPosition.value} - var(--mat-slider-handle-track-gap)))`;
  }

  if (trackDirection.value < 0) {
    return `max(0px, calc(${formattedCenterPosition.value} - ${formattedValuePosition.value} - var(--mat-slider-handle-track-gap)))`;
  }

  return '0px';
});
const inactiveBeforeSize = computed(() => {
  if (trackDirection.value > 0) {
    return formattedCenterPosition.value;
  }

  return `max(0px, calc(${formattedValuePosition.value} - var(--mat-slider-handle-track-gap)))`;
});
const inactiveAfterStart = computed(() => {
  if (trackDirection.value < 0) {
    return formattedCenterPosition.value;
  }

  return `calc(${formattedValuePosition.value} + var(--mat-slider-handle-track-gap))`;
});
const inactiveAfterSize = computed(() => {
  if (trackDirection.value < 0) {
    return `calc(100% - ${formattedCenterPosition.value})`;
  }

  return `max(0px, calc(100% - ${formattedValuePosition.value} - var(--mat-slider-handle-track-gap)))`;
});
const stopValues = computed(() => {
  if (propsWithDefaults.showStopIndicator) {
    return getSliderStopValues(bounds.value, resolvedStep.value);
  }

  return propsWithDefaults.variant === 'centered'
    ? [bounds.value.min, bounds.value.max]
    : [bounds.value.max];
});
const showInsetIcon = computed(() => (
  propsWithDefaults.insetIcon !== undefined
  && ['medium', 'large', 'extra-large'].includes(propsWithDefaults.size)
));
const insetIconOpticalSize = computed(() => (
  propsWithDefaults.size === 'extra-large' ? 32 : 24
));
const showValueIndicatorState = computed(() => (
  propsWithDefaults.showValueIndicator && (dragging.value || isFocused.value)
));
const rootStyle = computed(() => ({
  ...colorStyle.value,
  '--mat-slider-active-visible-size': activeVisibleSize.value,
  '--mat-slider-active-visible-start': activeVisibleStart.value,
  '--mat-slider-center-position': formattedCenterPosition.value,
  '--mat-slider-inactive-after-size': inactiveAfterSize.value,
  '--mat-slider-inactive-after-start': inactiveAfterStart.value,
  '--mat-slider-inactive-before-size': inactiveBeforeSize.value,
  '--mat-slider-inset-icon-position': insetIconPlacement.value === 'inactive'
    ? `calc(${formattedValuePosition.value} + (var(--mat-slider-handle-width) / 2) + var(--mat-slider-handle-track-gap))`
    : 'var(--mat-slider-inset-icon-offset)',
  '--mat-slider-position': formattedValuePosition.value,
}));

function updateInsetIconPlacement() {
  if (
    !showInsetIcon.value
    || propsWithDefaults.variant !== 'standard'
    || !root.value
  ) {
    insetIconPlacement.value = 'active';
    return;
  }

  const rootRect = root.value.getBoundingClientRect();
  const trackLength = propsWithDefaults.orientation === 'vertical'
    ? rootRect.height
    : rootRect.width;
  const iconLength = propsWithDefaults.size === 'extra-large' ? 32 : 24;
  const handleWidth = Number.parseFloat(
    getComputedStyle(root.value).getPropertyValue('--mat-slider-handle-width'),
  ) || 4;
  const handlePosition = SLIDER_TRACK_END_INSET
    + ((trackLength - (SLIDER_TRACK_END_INSET * 2)) * valuePosition.value) / 100;
  const iconEnd = 12 + iconLength;

  insetIconPlacement.value = handlePosition - (handleWidth / 2) - 6 >= iconEnd
    ? 'active'
    : 'inactive';
}

let insetIconResizeObserver;

onMounted(() => {
  updateInsetIconPlacement();

  if (typeof ResizeObserver !== 'undefined') {
    insetIconResizeObserver = new ResizeObserver(updateInsetIconPlacement);
    insetIconResizeObserver.observe(root.value);
  }
});

watch(
  [showInsetIcon, () => propsWithDefaults.orientation, () => propsWithDefaults.variant, valuePosition],
  updateInsetIconPlacement,
  { flush: 'post' },
);

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
    propsWithDefaults.orientation,
  );

  return updateValue(value, event);
}

const pointerFrame = createFrameScheduler((event) => {
  dragChanged.value = updateValueFromPointer(event) || dragChanged.value;
});

/**
 * @param {PointerEvent} event
 */
function handlePointerDown(event) {
  if (propsWithDefaults.disabled) {
    return;
  }

  pointerFrame.cancel();
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

  pointerFrame.schedule(event);
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
    pointerFrame.flush();
    dragChanged.value = updateValueFromPointer(event) || dragChanged.value;
  } else {
    pointerFrame.cancel();
  }

  if (shouldEmitChange && dragChanged.value) {
    emit('change', event);
  }

  dragging.value = false;
  dragChanged.value = false;
  dragPointerId.value = undefined;
  dragValue.value = undefined;
}

onBeforeUnmount(() => {
  insetIconResizeObserver?.disconnect();
  pointerFrame.cancel();
});

/**
 * @param {KeyboardEvent} event
 */
function handleKeyDown(event) {
  if (propsWithDefaults.disabled) {
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
    ref="root"
    v-bind="attrs"
    class="mat-slider"
    :class="[
      `mat-slider--${propsWithDefaults.orientation}`,
      `mat-slider--size-${propsWithDefaults.size}`,
      `mat-slider--${propsWithDefaults.variant}`,
      {
        'mat-slider--disabled': propsWithDefaults.disabled,
        'mat-slider--dragging': dragging,
        'mat-slider--use-cursor': matUi.useCursor,
      },
    ]"
    :style="rootStyle"
  >
    <span
      class="mat-slider__track"
      aria-hidden="true"
    >
      <span class="mat-slider__inactive-track mat-slider__inactive-track--before" />
      <span
        class="mat-slider__active-track"
        :class="{ 'mat-slider__active-track--from-start': propsWithDefaults.variant === 'standard' }"
      />
      <span class="mat-slider__inactive-track mat-slider__inactive-track--after" />

      <span
        v-for="stopValue in stopValues"
        :key="stopValue"
        class="mat-slider__stop"
        :class="{
          'mat-slider__stop--active': stopValue >= Math.min(trackOriginValue, displayedValue)
            && stopValue <= Math.max(trackOriginValue, displayedValue),
        }"
        :style="{
          '--mat-slider-stop-position': getSliderVisualPosition(
            getSliderPercentage(stopValue, bounds),
          ),
        }"
      />

      <MatIcon
        v-if="showInsetIcon && propsWithDefaults.variant === 'standard'"
        class="mat-slider__inset-icon"
        :font-color="insetIconPlacement === 'active'
          ? 'var(--mat-on-accent-color, var(--mat-slider-inset-icon-color))'
          : 'var(--mat-slider-inset-icon-inactive-color)'"
        :icon="propsWithDefaults.insetIcon"
        :optical-size="insetIconOpticalSize"
        size="var(--mat-slider-current-inset-icon-size)"
        aria-hidden="true"
      />

      <template v-else-if="showInsetIcon">
        <span class="mat-slider__inset-icon-layer">
          <MatIcon
            class="mat-slider__inset-icon mat-slider__inset-icon--inactive"
            font-color="var(--mat-slider-inset-icon-inactive-color)"
            :icon="propsWithDefaults.insetIcon"
            :optical-size="insetIconOpticalSize"
            size="var(--mat-slider-current-inset-icon-size)"
            aria-hidden="true"
          />
        </span>

        <span class="mat-slider__inset-icon-layer mat-slider__inset-icon-layer--active">
          <MatIcon
            class="mat-slider__inset-icon mat-slider__inset-icon--active"
            font-color="var(--mat-on-accent-color, var(--mat-slider-inset-icon-color))"
            :icon="propsWithDefaults.insetIcon"
            :optical-size="insetIconOpticalSize"
            size="var(--mat-slider-current-inset-icon-size)"
            aria-hidden="true"
          />
        </span>
      </template>

      <span ref="handle" class="mat-slider__handle">
        <span class="mat-slider__handle-shape" />
      </span>
    </span>

    <MatTooltip
      class="mat-slider__value-indicator"
      data-slider-value-indicator
      :location="orientation === 'vertical' ? 'right' : 'top'"
      :model-value="showValueIndicatorState"
      :target="handle"
    >
      <slot
        v-if="slots['indicator-label']"
        name="indicator-label"
        :model-value="displayedValue"
      />
      <template v-else>
        {{ displayedValue }}
      </template>
    </MatTooltip>

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
      :aria-orientation="propsWithDefaults.orientation"
      :aria-valuemax="bounds.max"
      :aria-valuemin="bounds.min"
      :aria-valuenow="displayedValue"
      :disabled="propsWithDefaults.disabled"
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
  --mat-slider-current-stop-color: var(--mat-accent-color, var(--mat-slider-stop-indicator-color));
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
  user-select: none;
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
  transform: translateY(-50%);
  transition: block-size var(--mat-sys-motion-spring-fast-spatial);
}

.mat-slider__active-track,
.mat-slider__inactive-track {
  position: absolute;
  inset-block: 0;
  display: block;
  border-radius: var(--mat-slider-track-gap-corner);
  transition: inset-inline-start var(--mat-sys-motion-spring-fast-spatial), inline-size var(--mat-sys-motion-spring-fast-spatial), background-color var(--mat-sys-motion-spring-fast-effects);
}

.mat-slider__inactive-track {
  background: var(--mat-slider-current-inactive-track-color);
}

.mat-slider__inactive-track--before {
  inset-inline: 0 auto;
  inline-size: var(--mat-slider-inactive-before-size);
  border-end-start-radius: var(--mat-slider-current-track-corner);
  border-start-start-radius: var(--mat-slider-current-track-corner);
}

.mat-slider__active-track {
  inset-inline: var(--mat-slider-active-visible-start) auto;
  inline-size: var(--mat-slider-active-visible-size);
  background: var(--mat-slider-current-active-track-color);
}

.mat-slider__active-track--from-start {
  border-end-start-radius: var(--mat-slider-current-track-corner);
  border-start-start-radius: var(--mat-slider-current-track-corner);
}

.mat-slider__inactive-track--after {
  inset-inline: var(--mat-slider-inactive-after-start) auto;
  inline-size: var(--mat-slider-inactive-after-size);
  border-end-end-radius: var(--mat-slider-current-track-corner);
  border-start-end-radius: var(--mat-slider-current-track-corner);
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
  border-radius: var(--mat-slider-current-track-corner);
  transform: translate(-50%, -50%);
  transition: inset-inline-start var(--mat-sys-motion-spring-fast-spatial), inline-size var(--mat-sys-motion-spring-fast-spatial), block-size var(--mat-sys-motion-spring-fast-spatial);
}

.mat-slider__handle-shape {
  position: absolute;
  inset: 0;
  display: block;
  background: var(--mat-slider-current-handle-color);
  border-radius: var(--mat-slider-current-track-corner);
  clip-path: inset(0 round var(--mat-slider-current-track-corner));
  transition: background-color var(--mat-sys-motion-spring-fast-effects), clip-path var(--mat-sys-motion-spring-fast-spatial);
}

.mat-slider__inset-icon-layer {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: block;
  pointer-events: none;
}

.mat-slider__inset-icon-layer--active {
  clip-path: inset(0 calc(100% - var(--mat-slider-active-visible-start) - var(--mat-slider-active-visible-size)) 0 var(--mat-slider-active-visible-start));
}

.mat-slider__inset-icon {
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: var(--mat-slider-inset-icon-position);
  z-index: 1;
  pointer-events: none;
  transform: translateY(-50%);
  transition: inset-inline-start var(--mat-sys-motion-spring-fast-spatial), color var(--mat-sys-motion-spring-fast-effects);
}

.mat-slider__interaction {
  position: absolute;
  inset: 0;
  z-index: 3;
  cursor: default;
  touch-action: none;
}

.mat-slider--use-cursor .mat-slider__interaction {
  cursor: pointer;
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

.mat-slider:has(.mat-slider__native-input:focus-visible) .mat-slider__handle {
  outline: var(--mat-slider-focus-indicator-width) solid var(--mat-slider-focus-indicator-color);
  outline-offset: var(--mat-slider-focus-indicator-offset);
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
  inset-inline: 50% auto;
  inline-size: var(--mat-slider-current-track-height);
  block-size: auto;
  transform: translateX(-50%);
}

.mat-slider--vertical .mat-slider__inactive-track--before {
  inset-block: auto 0;
  inset-inline: 0;
  inline-size: auto;
  block-size: var(--mat-slider-inactive-before-size);
  border-radius: var(--mat-slider-track-gap-corner);
  border-end-end-radius: var(--mat-slider-current-track-corner);
  border-end-start-radius: var(--mat-slider-current-track-corner);
}

.mat-slider--vertical .mat-slider__active-track {
  inset-block: auto var(--mat-slider-active-visible-start);
  inset-inline: 0;
  inline-size: auto;
  block-size: var(--mat-slider-active-visible-size);
  transition: inset-block-end var(--mat-sys-motion-spring-fast-spatial), block-size var(--mat-sys-motion-spring-fast-spatial), background-color var(--mat-sys-motion-spring-fast-effects);
}

.mat-slider--vertical .mat-slider__active-track--from-start {
  border-radius: var(--mat-slider-track-gap-corner);
  border-end-end-radius: var(--mat-slider-current-track-corner);
  border-end-start-radius: var(--mat-slider-current-track-corner);
}

.mat-slider--vertical .mat-slider__inactive-track--after {
  inset-block: auto var(--mat-slider-inactive-after-start);
  inset-inline: 0;
  inline-size: auto;
  block-size: var(--mat-slider-inactive-after-size);
  border-radius: var(--mat-slider-track-gap-corner);
  border-start-end-radius: var(--mat-slider-current-track-corner);
  border-start-start-radius: var(--mat-slider-current-track-corner);
}

.mat-slider--vertical .mat-slider__stop {
  inset-block: auto var(--mat-slider-stop-position);
  inset-inline-start: 50%;
  transform: translate(-50%, 50%);
}

.mat-slider--vertical .mat-slider__handle {
  inset-block: auto var(--mat-slider-position);
  inset-inline: 50% auto;
  inline-size: var(--mat-slider-current-handle-height);
  block-size: var(--mat-slider-handle-width);
  transform: translate(-50%, 50%);
}

.mat-slider--vertical.mat-slider--dragging .mat-slider__handle {
  inline-size: var(--mat-slider-current-handle-height);
  block-size: var(--mat-slider-pressed-handle-width);
}

.mat-slider--vertical .mat-slider__inset-icon-layer--active {
  clip-path: inset(calc(100% - var(--mat-slider-active-visible-start) - var(--mat-slider-active-visible-size)) 0 var(--mat-slider-active-visible-start) 0);
}

.mat-slider--vertical .mat-slider__inset-icon {
  inset-block: auto var(--mat-slider-inset-icon-position);
  inset-inline-start: 50%;
  transform: translateX(-50%);
  transition: inset-block-end var(--mat-sys-motion-spring-fast-spatial), color var(--mat-sys-motion-spring-fast-effects);
}

.mat-slider--dragging .mat-slider__active-track,
.mat-slider--dragging .mat-slider__inactive-track {
  transition: background-color var(--mat-sys-motion-spring-fast-effects);
}

.mat-slider--dragging .mat-slider__handle {
  inline-size: var(--mat-slider-pressed-handle-width);
  transition: inline-size var(--mat-sys-motion-spring-fast-spatial), block-size var(--mat-sys-motion-spring-fast-spatial);
}

@supports (border-shape: inset(0 round 1px)) {
  .mat-slider__handle-shape {
    border-radius: 0;
    border-shape: inset(0 round var(--mat-slider-current-track-corner));
  }
}

@media (prefers-reduced-motion: reduce) {
  .mat-slider__track,
  .mat-slider__active-track,
  .mat-slider__inactive-track,
  .mat-slider__handle,
  .mat-slider__handle-shape,
  .mat-slider__inset-icon {
    transition: none;
  }
}
</style>
