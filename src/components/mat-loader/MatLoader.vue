<script setup>
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  useId,
  watch,
} from 'vue';
import { isComponentColor } from '../button-props';
import useComponentColor from '../use-component-color';
import { isValidCssLength, normalizeNumber } from '../value-utils';
import { useMatProps } from '../use-mat-props';

const INDICATOR_GAP_SIZE = 4;
const DEFAULT_CIRCULAR_SIZE = 48;
const MIN_CIRCULAR_SIZE = 24;
const MAX_CIRCULAR_SIZE = 240;
const LINEAR_DEFAULT_THICKNESS = 4;
const LINEAR_HEAVY_THICKNESS = 4.8;
const LINEAR_WAVE_AMPLITUDE = 3;
const LINEAR_WAVE_WAVELENGTH = 40;
const CIRCULAR_WAVE_WAVELENGTH = 15;
const STOP_INDICATOR_SIZE = 4;
const MIN_STROKE_PROGRESS = 0.001;
const INITIAL_LINEAR_WIDTH = 100;
const SHAPE_MORPH_DURATION = 300;
const WAVE_FLOW_DURATION = 900;

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
 * @returns {boolean}
 */
function prefersReducedMotion() {
  return typeof globalThis.matchMedia === 'function'
    && globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * @param {number} width
 * @param {number} height
 * @param {number} thickness
 * @param {number} amplitude
 * @param {number} phase
 * @returns {string}
 */
function createLinearPath(width, height, thickness, amplitude, phase) {
  const center = height / 2;
  const start = Math.min(width / 2, thickness / 2);
  const end = Math.max(start, width - (thickness / 2));
  const sampleSize = 2;
  const parts = [`M ${formatCoordinate(start)} ${formatCoordinate(center)}`];

  for (let x = start + sampleSize; x < end; x += sampleSize) {
    const pathPhase = ((x - start) / LINEAR_WAVE_WAVELENGTH) * Math.PI * 2;
    const y = center - (Math.sin(pathPhase - phase) * amplitude);

    parts.push(`L ${formatCoordinate(x)} ${formatCoordinate(y)}`);
  }

  const pathPhase = ((end - start) / LINEAR_WAVE_WAVELENGTH) * Math.PI * 2;
  const endY = center - (Math.sin(pathPhase - phase) * amplitude);

  parts.push(`L ${formatCoordinate(end)} ${formatCoordinate(endY)}`);

  return parts.join(' ');
}

/**
 * @param {number} center
 * @param {number} radius
 * @param {number} amplitude
 * @param {number} phase
 * @param {number} wavelength
 * @returns {string}
 */
function createCircularPath(center, radius, amplitude, phase, wavelength) {
  const waveCount = Math.max(1, Math.round((Math.PI * 2 * radius) / wavelength));
  const segmentCount = waveCount * 12;
  const parts = [];

  for (let index = 0; index <= segmentCount; index += 1) {
    const ratio = index / segmentCount;
    const angle = ratio * Math.PI * 2;
    const pathPhase = ratio * Math.PI * 2 * waveCount;
    const waveRadius = radius + (Math.sin(pathPhase - phase) * amplitude);
    const x = center + (Math.cos(angle) * waveRadius);
    const y = center + (Math.sin(angle) * waveRadius);
    const command = index === 0 ? 'M' : 'L';

    parts.push(`${command} ${formatCoordinate(x)} ${formatCoordinate(y)}`);
  }

  parts.push('Z');

  return parts.join(' ');
}

const props = defineProps({
  /**
   * 加载器形态；可选值为 `linear`、`circular`。
   *
   * @type {'linear' | 'circular'}
   * @default 'linear'
   */
  variant: {
    type: String,
    default: 'linear',
    validator(value) {
      return ['linear', 'circular'].includes(value);
    },
  },
  /**
   * 当前确定进度值；会限制在 0 与 max 之间。
   *
   * @type {number}
   * @default 0
   */
  value: {
    type: Number,
    default: 0,
    validator(value) {
      return typeof value === 'number' && Number.isFinite(value);
    },
  },
  /**
   * 确定进度的最大值。
   *
   * @type {number}
   * @default 1
   */
  max: {
    type: Number,
    default: 1,
    validator(value) {
      return typeof value === 'number' && Number.isFinite(value) && value > 0;
    },
  },
  /**
   * 是否显示不确定进度动画。
   *
   * @type {boolean}
   * @default false
   */
  indeterminate: {
    type: Boolean,
    default: false,
  },
  /**
   * 环形加载器的宽高尺寸；有限数值会限制在 24 至 240 之间，线条形忽略此属性。
   *
   * @type {number | string}
   * @default 48
   */
  size: {
    type: [Number, String],
    default: 48,
    validator: (value) => isValidCssLength(value, {
      allowUndefined: false,
      allowNegative: true,
    }),
  },
  /**
   * 轨道和活动指示器的粗细档位。
   *
   * @type {'default' | 'heavy'}
   * @default 'default'
   */
  thickness: {
    type: String,
    default: 'default',
    validator(value) {
      return ['default', 'heavy'].includes(value);
    },
  },
  /**
   * 轨道形状；可选值为 `flat`、`wavy`。
   *
   * @type {'flat' | 'wavy'}
   * @default 'flat'
   */
  shape: {
    type: String,
    default: 'flat',
    validator(value) {
      return ['flat', 'wavy'].includes(value);
    },
  },
  /**
   * 是否让 wavy 形状持续运动。
   *
   * @type {boolean}
   * @default false
   */
  waveMotion: {
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
});
const propsWithDefaults = useMatProps('loader', props);

const { colorStyle } = useComponentColor(computed(() => propsWithDefaults.color));
const linearElement = ref(null);
const linearWidth = ref(INITIAL_LINEAR_WIDTH);
const waveMorphProgress = ref(propsWithDefaults.shape === 'wavy' ? 1 : 0);
const wavePhase = ref(0);
const linearMaskId = `mat-loader-linear-mask-${useId()}`;
let linearResizeObserver;
let waveAnimationFrame;
let previousFrameTime;

const resolvedMax = computed(() => (
  isPositiveNumber(propsWithDefaults.max) ? propsWithDefaults.max : 1
));
const isCircular = computed(() => propsWithDefaults.variant === 'circular');
const isWavy = computed(() => propsWithDefaults.shape === 'wavy');
const resolvedCircularSize = computed(() => {
  const size = normalizeNumber(propsWithDefaults.size, {
    allowNegative: true,
    fallback: DEFAULT_CIRCULAR_SIZE,
  });

  return Math.min(Math.max(size, MIN_CIRCULAR_SIZE), MAX_CIRCULAR_SIZE);
});
const circularDefaultThickness = computed(() => resolvedCircularSize.value / 12);
const circularHeavyThickness = computed(() => resolvedCircularSize.value / 10);
const circularScale = computed(() => resolvedCircularSize.value / DEFAULT_CIRCULAR_SIZE);
const circularWaveAmplitude = computed(() => 1.6 * circularScale.value);
const circularWaveWavelength = computed(() => CIRCULAR_WAVE_WAVELENGTH * circularScale.value);
const resolvedThickness = computed(() => {
  if (isCircular.value) {
    return propsWithDefaults.thickness === 'heavy'
      ? circularHeavyThickness.value
      : circularDefaultThickness.value;
  }

  return propsWithDefaults.thickness === 'heavy'
    ? LINEAR_HEAVY_THICKNESS
    : LINEAR_DEFAULT_THICKNESS;
});
const resolvedValue = computed(() => {
  const value = isFiniteNumber(propsWithDefaults.value) ? propsWithDefaults.value : 0;

  return Math.min(Math.max(value, 0), resolvedMax.value);
});
const progress = computed(() => Number(((resolvedValue.value / resolvedMax.value) * 100).toFixed(3)));
const linearSize = computed(() => (
  resolvedThickness.value + (LINEAR_WAVE_AMPLITUDE * 2 * waveMorphProgress.value)
));
const linearCapProgress = computed(() => (
  Math.min(100, (resolvedThickness.value / linearWidth.value) * 100)
));
const linearPathScale = computed(() => {
  const availableWidth = linearWidth.value - resolvedThickness.value;

  if (availableWidth <= 0) {
    return 1;
  }

  return linearWidth.value / availableWidth;
});
const linearSegmentEnd = computed(() => {
  if (progress.value === 100) {
    return 100;
  }

  return Math.min(
    100,
    Math.max(progress.value, linearCapProgress.value + MIN_STROKE_PROGRESS),
  );
});
const linearTrackPath = computed(() => createLinearPath(
  linearWidth.value,
  linearSize.value,
  resolvedThickness.value,
  0,
  0,
));
const linearActivePath = computed(() => createLinearPath(
  linearWidth.value,
  linearSize.value,
  resolvedThickness.value,
  LINEAR_WAVE_AMPLITUDE * waveMorphProgress.value,
  wavePhase.value,
));
const circularCenter = computed(() => resolvedCircularSize.value / 2);
const circularRadius = computed(() => (
  circularCenter.value
  - circularWaveAmplitude.value
  - (circularHeavyThickness.value / 2)
));
const circularViewBox = computed(() => (
  `0 0 ${resolvedCircularSize.value} ${resolvedCircularSize.value}`
));
const circularActivePath = computed(() => createCircularPath(
  circularCenter.value,
  circularRadius.value,
  circularWaveAmplitude.value * waveMorphProgress.value,
  wavePhase.value,
  circularWaveWavelength.value,
));
const circularGapProgress = computed(() => {
  const circumference = Math.PI * 2 * circularRadius.value;
  const capAdjustedGap = INDICATOR_GAP_SIZE + resolvedThickness.value;

  return (capAdjustedGap / circumference) * 100;
});
const circularIndeterminateGapProgress = computed(() => Math.min(
  12,
  circularGapProgress.value,
));
const circularTrackStyle = computed(() => {
  if (propsWithDefaults.indeterminate) {
    return {};
  }

  const trackLength = Number(Math.max(
    0,
    100 - progress.value - (circularGapProgress.value * 2),
  ).toFixed(3));
  const trackOffset = Number(Math.min(
    100,
    progress.value + circularGapProgress.value,
  ).toFixed(3));

  return {
    opacity: trackLength > 0 ? 1 : 0,
    strokeDasharray: `${formatCoordinate(trackLength)} ${formatCoordinate(100 - trackLength)}`,
    strokeDashoffset: `-${formatCoordinate(trackOffset)}`,
  };
});
const circularActiveStyle = computed(() => {
  if (propsWithDefaults.indeterminate) {
    return {};
  }

  const activeLength = progress.value === 0 ? MIN_STROKE_PROGRESS : progress.value;

  return {
    strokeDasharray: `${formatCoordinate(activeLength)} 200`,
  };
});
const rootStyle = computed(() => ({
  ...colorStyle.value,
  '--mat-loader-circular-gap-progress': formatCoordinate(circularIndeterminateGapProgress.value),
  '--mat-loader-circular-radius': `${circularRadius.value}px`,
  '--mat-loader-circular-size': `${resolvedCircularSize.value}px`,
  '--mat-loader-indicator-gap-size': `${INDICATOR_GAP_SIZE}px`,
  '--mat-loader-linear-cap-progress': formatCoordinate(linearCapProgress.value),
  '--mat-loader-linear-path-scale': formatCoordinate(linearPathScale.value),
  '--mat-loader-linear-segment-end': formatCoordinate(linearSegmentEnd.value),
  '--mat-loader-linear-segment-end-position': `${formatCoordinate(linearSegmentEnd.value)}%`,
  '--mat-loader-linear-size': `${linearSize.value}px`,
  '--mat-loader-progress': `${progress.value}`,
  '--mat-loader-stop-indicator-size': `${STOP_INDICATOR_SIZE}px`,
  '--mat-loader-thickness': `${resolvedThickness.value}px`,
}));

/**
 * @param {DOMHighResTimeStamp} frameTime
 */
function updateWaveAnimation(frameTime) {
  waveAnimationFrame = undefined;
  const elapsed = previousFrameTime === undefined
    ? 0
    : Math.min(64, frameTime - previousFrameTime);
  const targetProgress = isWavy.value ? 1 : 0;
  const progressDifference = targetProgress - waveMorphProgress.value;

  previousFrameTime = frameTime;

  if (elapsed > 0 && progressDifference !== 0) {
    const progressStep = Math.min(
      Math.abs(progressDifference),
      elapsed / SHAPE_MORPH_DURATION,
    );

    waveMorphProgress.value += Math.sign(progressDifference) * progressStep;
  }

  if (elapsed > 0 && propsWithDefaults.waveMotion && waveMorphProgress.value > 0) {
    wavePhase.value += (elapsed / WAVE_FLOW_DURATION) * Math.PI * 2;
    wavePhase.value %= Math.PI * 2;
  }

  const shouldContinueMorphing = waveMorphProgress.value !== targetProgress;
  const shouldContinueFlowing = propsWithDefaults.waveMotion && waveMorphProgress.value > 0;

  if (shouldContinueMorphing || shouldContinueFlowing) {
    waveAnimationFrame = globalThis.requestAnimationFrame(updateWaveAnimation);
  } else {
    previousFrameTime = undefined;
  }
}

function requestWaveAnimation() {
  if (prefersReducedMotion() || typeof globalThis.requestAnimationFrame !== 'function') {
    waveMorphProgress.value = isWavy.value ? 1 : 0;
    return;
  }

  if (waveAnimationFrame === undefined) {
    previousFrameTime = undefined;
    waveAnimationFrame = globalThis.requestAnimationFrame(updateWaveAnimation);
  }
}

watch(isWavy, requestWaveAnimation);
watch(() => propsWithDefaults.waveMotion, requestWaveAnimation);

onMounted(() => {
  requestWaveAnimation();

  if (!linearElement.value || typeof globalThis.ResizeObserver !== 'function') {
    return;
  }

  linearResizeObserver = new globalThis.ResizeObserver(([entry]) => {
    const width = entry.contentRect.width;

    if (width > 0) {
      linearWidth.value = width;
    }
  });
  linearResizeObserver.observe(linearElement.value);
});

onBeforeUnmount(() => {
  linearResizeObserver?.disconnect();

  if (waveAnimationFrame !== undefined) {
    globalThis.cancelAnimationFrame?.(waveAnimationFrame);
  }
});
</script>

<template>
  <div
    v-bind="$attrs"
    class="mat-loader"
    :class="[
      `mat-loader--${propsWithDefaults.variant}`,
      `mat-loader--${propsWithDefaults.shape}`,
      {
        'mat-loader--indeterminate': propsWithDefaults.indeterminate,
        'mat-loader--wave-motion': propsWithDefaults.waveMotion,
      },
    ]"
    :style="rootStyle"
    role="progressbar"
    aria-valuemin="0"
    :aria-valuemax="resolvedMax"
    :aria-valuenow="propsWithDefaults.indeterminate ? undefined : resolvedValue"
  >
    <span
      v-if="!isCircular"
      ref="linearElement"
      class="mat-loader__linear"
      aria-hidden="true"
    >
      <template v-if="!propsWithDefaults.indeterminate">
        <span class="mat-loader__linear-track mat-loader__linear-track--before" />
        <span class="mat-loader__linear-track mat-loader__linear-track--after" />
      </template>

      <svg
        class="mat-loader__linear-indicator"
        :width="linearWidth"
        :height="linearSize"
      >
        <defs v-if="propsWithDefaults.indeterminate">
          <mask
            :id="linearMaskId"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            :width="linearWidth"
            :height="linearSize"
          >
            <rect
              width="100%"
              height="100%"
              fill="white"
            />
            <g class="mat-loader__linear-bar mat-loader__linear-bar--primary">
              <path
                class="mat-loader__linear-segment mat-loader__linear-segment--primary mat-loader__linear-gap mat-loader__linear-gap--primary"
                :d="linearActivePath"
                pathLength="100"
              />
            </g>
            <g class="mat-loader__linear-bar mat-loader__linear-bar--secondary">
              <path
                class="mat-loader__linear-segment mat-loader__linear-segment--secondary mat-loader__linear-gap mat-loader__linear-gap--secondary"
                :d="linearActivePath"
                pathLength="100"
              />
            </g>
          </mask>
        </defs>

        <path
          v-if="propsWithDefaults.indeterminate"
          class="mat-loader__linear-indeterminate-track"
          :d="linearTrackPath"
          pathLength="100"
          :mask="`url(#${linearMaskId})`"
        />

        <template v-if="propsWithDefaults.indeterminate">
          <g class="mat-loader__linear-bar mat-loader__linear-bar--primary">
            <path
              class="mat-loader__linear-active mat-loader__linear-active--primary mat-loader__linear-segment mat-loader__linear-segment--primary"
              :d="linearActivePath"
              pathLength="100"
            />
          </g>
          <g class="mat-loader__linear-bar mat-loader__linear-bar--secondary">
            <path
              class="mat-loader__linear-active mat-loader__linear-active--secondary mat-loader__linear-segment mat-loader__linear-segment--secondary"
              :d="linearActivePath"
              pathLength="100"
            />
          </g>
        </template>

        <path
          v-else
          class="mat-loader__linear-active mat-loader__linear-active--determinate"
          :d="linearActivePath"
          pathLength="100"
        />
      </svg>

      <span
        v-if="!propsWithDefaults.indeterminate"
        class="mat-loader__linear-stop"
      />
    </span>

    <svg
      v-else
      class="mat-loader__circular"
      :viewBox="circularViewBox"
      aria-hidden="true"
    >
      <g class="mat-loader__circular-linear-rotate">
        <g class="mat-loader__circular-rotate-arc">
          <circle
            class="mat-loader__circular-track"
            :cx="circularCenter"
            :cy="circularCenter"
            :r="circularRadius"
            pathLength="100"
            :style="circularTrackStyle"
          />
          <path
            class="mat-loader__circular-active"
            :d="circularActivePath"
            pathLength="100"
            :style="circularActiveStyle"
          />
        </g>
      </g>
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
  block-size: var(--mat-loader-circular-size);
  transition: inline-size var(--mat-sys-motion-spring-fast-spatial), block-size var(--mat-sys-motion-spring-fast-spatial);
}

.mat-loader__linear {
  position: relative;
  display: block;
  block-size: var(--mat-loader-linear-size);
  overflow: clip;
  transition: block-size var(--mat-sys-motion-spring-fast-spatial);
}

.mat-loader__linear-track {
  position: absolute;
  inset-block-start: 50%;
  z-index: 1;
  display: block;
  block-size: var(--mat-loader-thickness);
  background: var(--mat-loader-track-color);
  border-radius: var(--mat-sys-shape-corner-full);
  transform: translateY(-50%);
  transition: block-size var(--mat-sys-motion-spring-fast-spatial), inset-inline var(--mat-sys-motion-spring-fast-spatial), inline-size var(--mat-sys-motion-spring-fast-spatial);
}

.mat-loader__linear-track--before {
  inset-inline-start: 0;
  inline-size: max(
    0px,
    calc(0% - var(--mat-loader-indicator-gap-size))
  );
}

.mat-loader__linear-track--after {
  inset-inline: min(
    100%,
    calc(var(--mat-loader-linear-segment-end-position) + var(--mat-loader-indicator-gap-size))
  ) 0;
}

.mat-loader__linear-indicator {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: block;
  inline-size: 100%;
  block-size: 100%;
  overflow: visible;
}

.mat-loader__linear-active,
.mat-loader__linear-indeterminate-track,
.mat-loader__linear-gap {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: var(--mat-loader-thickness);
  vector-effect: non-scaling-stroke;
}

.mat-loader__linear-active {
  stroke: var(--mat-loader-active-indicator-color, var(--mat-sys-color-primary));
}

.mat-loader__linear-active--determinate {
  stroke-dasharray: calc(
    (
      var(--mat-loader-linear-segment-end)
      - var(--mat-loader-linear-cap-progress)
    ) * var(--mat-loader-linear-path-scale)
  ) 200;
  transition: stroke-dasharray var(--mat-sys-motion-spring-default-effects), stroke-width var(--mat-sys-motion-spring-fast-spatial);
}

.mat-loader__linear-indeterminate-track {
  stroke: var(--mat-loader-track-color);
}

.mat-loader__linear-gap {
  stroke: black;
  stroke-width: calc(var(--mat-loader-thickness) + (var(--mat-loader-indicator-gap-size) * 2));
}

.mat-loader__linear-bar {
  transform-box: view-box;
  transform-origin: center;
}

.mat-loader__linear-bar--primary {
  translate: -145.167% 0;
  animation: mat-loader-primary-indeterminate-translate 2s infinite linear;
}

.mat-loader__linear-bar--secondary {
  translate: -54.8889% 0;
  animation: mat-loader-secondary-indeterminate-translate 2s infinite linear;
}

.mat-loader__linear-segment {
  transition: stroke-width var(--mat-sys-motion-spring-fast-spatial);
}

.mat-loader__linear-segment--primary {
  animation: mat-loader-primary-indeterminate-scale 2s infinite linear;
}

.mat-loader__linear-segment--secondary {
  animation: mat-loader-secondary-indeterminate-scale 2s infinite linear;
}

.mat-loader__linear-stop {
  position: absolute;
  inset-block-start: 50%;
  inset-inline-end: 0;
  z-index: 3;
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
  transition: inline-size var(--mat-sys-motion-spring-fast-spatial), block-size var(--mat-sys-motion-spring-fast-spatial);
}

.mat-loader__circular-linear-rotate,
.mat-loader__circular-rotate-arc {
  transform-box: view-box;
  transform-origin: center;
}

.mat-loader--indeterminate .mat-loader__circular-linear-rotate {
  animation: mat-loader-circular-linear-rotate 1568.235ms linear infinite;
}

.mat-loader--indeterminate .mat-loader__circular-rotate-arc {
  animation: mat-loader-circular-rotate-arc 5332ms cubic-bezier(.4, 0, .2, 1) infinite;
}

.mat-loader__circular-track,
.mat-loader__circular-active {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: var(--mat-loader-thickness);
  transform: rotate(-90deg);
  transform-box: fill-box;
  transform-origin: center;
}

.mat-loader__circular-track {
  stroke: var(--mat-loader-track-color);
  transition: opacity var(--mat-sys-motion-spring-fast-effects), stroke-width var(--mat-sys-motion-spring-fast-spatial), stroke-dasharray var(--mat-sys-motion-spring-default-effects), stroke-dashoffset var(--mat-sys-motion-spring-default-effects);
}

.mat-loader__circular-active {
  stroke: var(--mat-loader-active-indicator-color, var(--mat-sys-color-primary));
  transition: stroke-width var(--mat-sys-motion-spring-fast-spatial), stroke-dasharray var(--mat-sys-motion-spring-default-effects);
}

.mat-loader--indeterminate .mat-loader__circular-track {
  stroke-dasharray: calc(
    97.2222
    - (var(--mat-loader-circular-gap-progress) * 2)
  ) 200;
  stroke-dashoffset: calc(
    (2.7778 + var(--mat-loader-circular-gap-progress)) * -1
  );
  animation-name: mat-loader-circular-expand-track-arc;
  animation-duration: 1333ms;
  animation-timing-function: cubic-bezier(.4, 0, .2, 1);
  animation-iteration-count: infinite;
}

.mat-loader--indeterminate .mat-loader__circular-active {
  stroke-dasharray: 2.7778 200;
  animation-name: mat-loader-circular-expand-active-arc;
  animation-duration: 1333ms;
  animation-timing-function: cubic-bezier(.4, 0, .2, 1);
  animation-iteration-count: infinite;
}

.mat-loader--indeterminate .mat-loader__circular-track,
.mat-loader--indeterminate .mat-loader__circular-active {
  transition: opacity var(--mat-sys-motion-spring-fast-effects), stroke-width var(--mat-sys-motion-spring-fast-spatial);
}

/*
 * Indeterminate timing and easing values are adapted from Material Web's
 * progress implementation, licensed under Apache-2.0.
 */
@keyframes mat-loader-primary-indeterminate-translate {
  0% {
    transform: translateX(0);
  }

  20% {
    transform: translateX(0);
    animation-timing-function: cubic-bezier(.5, 0, .701732, .495819);
  }

  59.15% {
    transform: translateX(83.6714%);
    animation-timing-function: cubic-bezier(.302435, .381352, .55, .956352);
  }

  100% {
    transform: translateX(200.611%);
  }
}

@keyframes mat-loader-primary-indeterminate-scale {
  0% {
    stroke-dasharray: 8 200;
    stroke-dashoffset: -46;
  }

  36.65% {
    stroke-dasharray: 8 200;
    stroke-dashoffset: -46;
    animation-timing-function: cubic-bezier(.334731, .12482, .785844, 1);
  }

  69.15% {
    stroke-dasharray: 66.1479 200;
    stroke-dashoffset: -16.92605;
    animation-timing-function: cubic-bezier(.06, .11, .6, 1);
  }

  100% {
    stroke-dasharray: 8 200;
    stroke-dashoffset: -46;
  }
}

@keyframes mat-loader-secondary-indeterminate-translate {
  0% {
    transform: translateX(0);
    animation-timing-function: cubic-bezier(.15, 0, .515058, .409685);
  }

  25% {
    transform: translateX(37.6519%);
    animation-timing-function: cubic-bezier(.31033, .284058, .8, .733712);
  }

  48.35% {
    transform: translateX(84.3862%);
    animation-timing-function: cubic-bezier(.4, .627035, .6, .902026);
  }

  100% {
    transform: translateX(160.278%);
  }
}

@keyframes mat-loader-secondary-indeterminate-scale {
  0% {
    stroke-dasharray: 8 200;
    stroke-dashoffset: -46;
    animation-timing-function: cubic-bezier(.205028, .057051, .57661, .453971);
  }

  19.15% {
    stroke-dasharray: 45.7104 200;
    stroke-dashoffset: -27.1448;
    animation-timing-function: cubic-bezier(.152313, .196432, .648374, 1.00432);
  }

  44.15% {
    stroke-dasharray: 72.796 200;
    stroke-dashoffset: -13.602;
    animation-timing-function: cubic-bezier(.257759, -.003163, .211762, 1.38179);
  }

  100% {
    stroke-dasharray: 8 200;
    stroke-dashoffset: -46;
  }
}

@keyframes mat-loader-circular-expand-active-arc {
  0%,
  100% {
    stroke-dasharray: 2.7778 200;
  }

  50% {
    stroke-dasharray: 75 200;
  }
}

@keyframes mat-loader-circular-expand-track-arc {
  0%,
  100% {
    stroke-dasharray: calc(
      97.2222
      - (var(--mat-loader-circular-gap-progress) * 2)
    ) 200;
    stroke-dashoffset: calc(
      (2.7778 + var(--mat-loader-circular-gap-progress)) * -1
    );
  }

  50% {
    stroke-dasharray: calc(
      25
      - (var(--mat-loader-circular-gap-progress) * 2)
    ) 200;
    stroke-dashoffset: calc(
      (75 + var(--mat-loader-circular-gap-progress)) * -1
    );
  }
}

@keyframes mat-loader-circular-rotate-arc {
  0% {
    transform: rotate(0deg);
  }

  12.5% {
    transform: rotate(135deg);
  }

  25% {
    transform: rotate(270deg);
  }

  37.5% {
    transform: rotate(405deg);
  }

  50% {
    transform: rotate(540deg);
  }

  62.5% {
    transform: rotate(675deg);
  }

  75% {
    transform: rotate(810deg);
  }

  87.5% {
    transform: rotate(945deg);
  }

  100% {
    transform: rotate(1080deg);
  }
}

@keyframes mat-loader-circular-linear-rotate {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .mat-loader--circular,
  .mat-loader__linear,
  .mat-loader__linear-track,
  .mat-loader__linear-segment,
  .mat-loader__linear-active--determinate,
  .mat-loader__circular,
  .mat-loader__circular-track,
  .mat-loader__circular-active {
    transition: none;
  }

  .mat-loader__linear-bar,
  .mat-loader__linear-segment,
  .mat-loader--indeterminate .mat-loader__circular-linear-rotate,
  .mat-loader--indeterminate .mat-loader__circular-rotate-arc,
  .mat-loader--indeterminate .mat-loader__circular-track,
  .mat-loader--indeterminate .mat-loader__circular-active {
    animation: none;
  }

  .mat-loader__linear-bar--primary {
    translate: 0 0;
    transform: translateX(10%);
  }

  .mat-loader__linear-segment--primary {
    stroke-dasharray: 40 200;
    stroke-dashoffset: -30;
  }

  .mat-loader__linear-bar--secondary {
    display: none;
  }

  .mat-loader--indeterminate .mat-loader__circular-active {
    stroke-dasharray: 25 200;
  }

  .mat-loader--indeterminate .mat-loader__circular-track {
    stroke-dasharray: calc(
      75
      - (var(--mat-loader-circular-gap-progress) * 2)
    ) 200;
    stroke-dashoffset: calc(
      (25 + var(--mat-loader-circular-gap-progress)) * -1
    );
  }
}
</style>
