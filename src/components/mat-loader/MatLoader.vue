<script setup>
import { computed, useId } from 'vue';
import { isComponentColor } from '../button-props';
import useComponentColor from '../use-component-color';

const LINEAR_WAVE_AMPLITUDE = 3;
const CIRCULAR_WAVE_AMPLITUDE = 1.6;
const CIRCULAR_WAVE_WAVELENGTH = 15;
const STOP_INDICATOR_SIZE = 4;

defineOptions({
  name: 'MatLoader',
  inheritAttrs: false,
});

/**
 * @param {unknown} value
 * @returns {boolean}
 */
function isFiniteNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

/**
 * @param {unknown} value
 * @returns {boolean}
 */
function isPositiveNumber(value) {
  return isFiniteNumber(value) && value > 0;
}

/**
 * @param {number} value
 * @returns {string}
 */
function formatCoordinate(value) {
  return Number(value.toFixed(3)).toString();
}

/**
 * @param {number} height
 * @returns {string}
 */
function createLinearWavePath(height) {
  const center = height / 2;

  return [
    `M 0 ${formatCoordinate(center)}`,
    `Q 10 ${formatCoordinate(center - LINEAR_WAVE_AMPLITUDE)} 20 ${formatCoordinate(center)}`,
    `Q 30 ${formatCoordinate(center + LINEAR_WAVE_AMPLITUDE)} 40 ${formatCoordinate(center)}`,
  ].join(' ');
}

/**
 * @param {number} center
 * @param {number} radius
 * @returns {string}
 */
function createCircularWavePath(center, radius) {
  const waveCount = Math.max(1, Math.round((Math.PI * 2 * radius) / CIRCULAR_WAVE_WAVELENGTH));
  const segmentCount = waveCount * 8;
  const parts = [];

  for (let index = 0; index <= segmentCount; index += 1) {
    const ratio = index / segmentCount;
    const angle = (ratio * Math.PI * 2) - (Math.PI / 2);
    const waveRadius = radius + (Math.sin(ratio * Math.PI * 2 * waveCount)
      * CIRCULAR_WAVE_AMPLITUDE);
    const x = center + (Math.cos(angle) * waveRadius);
    const y = center + (Math.sin(angle) * waveRadius);
    const command = index === 0 ? 'M' : 'L';

    parts.push(`${command} ${formatCoordinate(x)} ${formatCoordinate(y)}`);
  }

  parts.push('Z');

  return parts.join(' ');
}

const props = defineProps({
  variant: {
    type: String,
    default: 'linear',
    validator(value) {
      return ['linear', 'circular'].includes(value);
    },
  },
  value: {
    type: Number,
    default: 0,
    validator(value) {
      return typeof value === 'number' && Number.isFinite(value);
    },
  },
  max: {
    type: Number,
    default: 1,
    validator(value) {
      return typeof value === 'number' && Number.isFinite(value) && value > 0;
    },
  },
  indeterminate: {
    type: Boolean,
    default: false,
  },
  thickness: {
    type: Number,
    default: 4,
    validator(value) {
      return typeof value === 'number' && Number.isFinite(value) && value > 0;
    },
  },
  shape: {
    type: String,
    default: 'flat',
    validator(value) {
      return ['flat', 'wavy'].includes(value);
    },
  },
  color: {
    type: String,
    default: undefined,
    validator: isComponentColor,
  },
});

const { colorStyle } = useComponentColor(computed(() => props.color));
const linearWavePatternId = `mat-loader-wave-${useId()}`;
const resolvedMax = computed(() => (isPositiveNumber(props.max) ? props.max : 1));
const resolvedThickness = computed(() => (isPositiveNumber(props.thickness) ? props.thickness : 4));
const isCircular = computed(() => props.variant === 'circular');
const isWavy = computed(() => props.shape === 'wavy');
const resolvedValue = computed(() => {
  const value = isFiniteNumber(props.value) ? props.value : 0;

  return Math.min(Math.max(value, 0), resolvedMax.value);
});
const progress = computed(() => Number(((resolvedValue.value / resolvedMax.value) * 100).toFixed(3)));
const linearSize = computed(() => (
  resolvedThickness.value + (isWavy.value ? LINEAR_WAVE_AMPLITUDE * 2 : 0)
));
const circularSize = computed(() => (
  resolvedThickness.value + (isWavy.value ? 44 : 36)
));
const circularCenter = computed(() => circularSize.value / 2);
const circularRadius = computed(() => (
  circularCenter.value
  - (resolvedThickness.value / 2)
  - (isWavy.value ? CIRCULAR_WAVE_AMPLITUDE : 0)
));
const circularViewBox = computed(() => `0 0 ${circularSize.value} ${circularSize.value}`);
const linearWavePath = computed(() => createLinearWavePath(linearSize.value));
const circularWavePath = computed(() => (
  createCircularWavePath(circularCenter.value, circularRadius.value)
));
const linearActiveStyle = computed(() => {
  if (props.indeterminate) {
    return {};
  }

  return {
    inlineSize: `${progress.value}%`,
  };
});
const circularActiveStyle = computed(() => {
  if (props.indeterminate) {
    return {};
  }

  return {
    strokeDasharray: `${progress.value} ${100 - progress.value}`,
  };
});
const rootStyle = computed(() => ({
  ...colorStyle.value,
  '--mat-loader-circular-radius': `${circularRadius.value}px`,
  '--mat-loader-circular-size': `${circularSize.value}px`,
  '--mat-loader-linear-size': `${linearSize.value}px`,
  '--mat-loader-progress': `${progress.value}`,
  '--mat-loader-stop-indicator-size': `${STOP_INDICATOR_SIZE}px`,
  '--mat-loader-thickness': `${resolvedThickness.value}px`,
}));
</script>

<template>
  <div
    v-bind="$attrs"
    class="mat-loader"
    :class="[
      `mat-loader--${variant}`,
      `mat-loader--${shape}`,
      { 'mat-loader--indeterminate': indeterminate },
    ]"
    :style="rootStyle"
    role="progressbar"
    aria-valuemin="0"
    :aria-valuemax="resolvedMax"
    :aria-valuenow="indeterminate ? undefined : resolvedValue"
  >
    <span
      v-if="!isCircular"
      class="mat-loader__linear"
      aria-hidden="true"
    >
      <span class="mat-loader__linear-track" />
      <span
        class="mat-loader__active"
        :class="[
          `mat-loader__active--${shape}`,
          { 'mat-loader__active--indeterminate': indeterminate },
        ]"
        :style="linearActiveStyle"
      >
        <svg
          v-if="isWavy"
          class="mat-loader__linear-wave"
        >
          <defs>
            <pattern
              :id="linearWavePatternId"
              width="40"
              :height="linearSize"
              patternUnits="userSpaceOnUse"
            >
              <path
                :d="linearWavePath"
                :stroke-width="resolvedThickness"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            :fill="`url(#${linearWavePatternId})`"
          />
        </svg>
      </span>
      <span
        v-if="!indeterminate"
        class="mat-loader__linear-stop"
      />
    </span>

    <svg
      v-else
      class="mat-loader__circular"
      :viewBox="circularViewBox"
      aria-hidden="true"
    >
      <circle
        class="mat-loader__circular-track"
        :cx="circularCenter"
        :cy="circularCenter"
        :r="circularRadius"
        :stroke-width="resolvedThickness"
      />
      <circle
        v-if="!isWavy"
        class="mat-loader__circular-active"
        :class="{ 'mat-loader__circular-active--indeterminate': indeterminate }"
        :cx="circularCenter"
        :cy="circularCenter"
        :r="circularRadius"
        :stroke-width="resolvedThickness"
        pathLength="100"
        :style="circularActiveStyle"
      />
      <path
        v-else
        class="mat-loader__circular-active"
        :class="{ 'mat-loader__circular-active--indeterminate': indeterminate }"
        :d="circularWavePath"
        :stroke-width="resolvedThickness"
        pathLength="100"
        :style="circularActiveStyle"
      />
    </svg>
  </div>
</template>

<style scoped>
.mat-loader {
  --mat-loader-active-indicator-color: var(--mat-accent-color, var(--mat-sys-color-primary));
  --mat-loader-track-color: var(--mat-sys-color-secondary-container);
  display: block;
  box-sizing: border-box;
  color: var(--mat-loader-active-indicator-color, var(--mat-sys-color-primary));
}

.mat-loader--linear {
  inline-size: 100%;
  min-inline-size: 0;
}

.mat-loader--circular {
  inline-size: var(--mat-loader-circular-size);
}

.mat-loader__linear {
  position: relative;
  display: block;
  block-size: var(--mat-loader-linear-size);
  overflow: clip;
}

.mat-loader__linear-track {
  position: absolute;
  inset-block-start: 50%;
  inset-inline: 0;
  block-size: var(--mat-loader-thickness);
  background: var(--mat-loader-track-color);
  border-radius: var(--mat-sys-shape-corner-full);
  transform: translateY(-50%);
}

.mat-loader__active {
  position: absolute;
  inset-block-start: 0;
  inset-inline-start: 0;
  display: block;
  block-size: 100%;
  color: var(--mat-loader-active-indicator-color, var(--mat-sys-color-primary));
  transform-origin: center;
}

.mat-loader__active--flat {
  background: currentcolor;
  border-radius: var(--mat-sys-shape-corner-full);
}

.mat-loader__active--indeterminate {
  inline-size: 30%;
  animation: mat-loader-linear-indeterminate var(--mat-sys-motion-duration-extra-long4) var(--mat-sys-motion-easing-emphasized) infinite;
}

.mat-loader__linear-wave {
  display: block;
  inline-size: 100%;
  block-size: 100%;
  overflow: visible;
}

.mat-loader__linear-wave path {
  fill: none;
  stroke: currentcolor;
  stroke-linecap: round;
}

.mat-loader__linear-stop {
  position: absolute;
  inset-block-start: 50%;
  inset-inline-end: 0;
  inline-size: var(--mat-loader-stop-indicator-size);
  block-size: var(--mat-loader-stop-indicator-size);
  background: var(--mat-loader-active-indicator-color, var(--mat-sys-color-primary));
  border-radius: var(--mat-sys-shape-corner-full);
  transform: translateY(-50%);
}

.mat-loader__circular {
  display: block;
  inline-size: var(--mat-loader-circular-size);
  block-size: var(--mat-loader-circular-size);
  overflow: visible;
}

.mat-loader__circular-track,
.mat-loader__circular-active {
  fill: none;
  stroke-linecap: round;
}

.mat-loader__circular-track {
  stroke: var(--mat-loader-track-color);
}

.mat-loader__circular-active {
  stroke: var(--mat-loader-active-indicator-color, var(--mat-sys-color-primary));
  transform-box: fill-box;
  transform-origin: center;
}

.mat-loader__circular-active--indeterminate {
  stroke-dasharray: 5 95;
  animation: mat-loader-circular-indeterminate var(--mat-sys-motion-duration-extra-long4) linear infinite;
}

@supports (border-shape: inset(0 round 1px)) {
  .mat-loader__linear-track,
  .mat-loader__active--flat {
    border-radius: 0;
    border-shape: inset(0 round var(--mat-sys-shape-corner-full));
  }

  .mat-loader__linear-stop {
    border-radius: 0;
    border-shape: circle(50%);
  }
}

@keyframes mat-loader-linear-indeterminate {
  0% {
    inline-size: 20%;
    transform: translateX(-100%);
  }

  50% {
    inline-size: 60%;
    transform: translateX(50%);
  }

  100% {
    inline-size: 20%;
    transform: translateX(500%);
  }
}

@keyframes mat-loader-circular-indeterminate {
  0% {
    stroke-dasharray: 5 95;
    stroke-dashoffset: 0;
    transform: rotate(0deg);
  }

  50% {
    stroke-dasharray: 55 45;
    stroke-dashoffset: -25;
    transform: rotate(180deg);
  }

  100% {
    stroke-dasharray: 5 95;
    stroke-dashoffset: -100;
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .mat-loader__active--indeterminate,
  .mat-loader__circular-active--indeterminate {
    animation: none;
  }

  .mat-loader__active--indeterminate {
    transform: translateX(75%);
  }
}
</style>
