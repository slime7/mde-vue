<script setup>
import {
  computed, onBeforeUnmount, onMounted, ref, watch,
} from 'vue';
import MatShape from '../mat-shape/MatShape.vue';
import { isComponentColor } from '../button-props';
import useComponentColor from '../use-component-color';
import { normalizeNumber } from '../value-utils';
import { useMatProps } from '../use-mat-props';
import { LOADING_SHAPE_NAMES } from '../mat-shape/shape-paths';
import './loading-shape-frames.css';

const DEFAULT_SIZE = 48;
const MIN_SIZE = 24;
const MAX_SIZE = 240;
const SHAPE_SWITCH_INTERVAL = 650;

defineOptions({
  name: 'MatLoading',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 是否显示圆形背景容器；启用时活动形状使用同组 on-container 内容色。
   *
   * @type {boolean}
   * @default false
   */
  containment: {
    type: Boolean,
    default: false,
  },
  /**
   * 加载指示器的宽高尺寸；数字与纯数字字符串按 px 处理并限制在 24 至 240。
   *
   * @type {number | string}
   * @default 48
   */
  size: {
    type: [Number, String],
    default: 48,
    validator: (value) => {
      if (typeof value !== 'number'
        && (typeof value !== 'string' || !/^\s*\d+(\.\d+)?\s*$/.test(value))) {
        return false;
      }
      return true;
    },
  },
  /**
   * Material 语义色、系统颜色角色或六位十六进制种子色。
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
   * 受控加载进度；有限数值会停止自动动画，负值按 0 处理，超过 1 时保持 soft-burst 并继续旋转。
   *
   * @type {number | undefined}
   * @default undefined
   */
  progress: {
    type: Number,
    default: undefined,
    validator: (value) => value === undefined || Number.isFinite(value),
  },
});
const propsWithDefaults = useMatProps('loading', props);

const { colorStyle } = useComponentColor(computed(() => propsWithDefaults.color));
const currentShapeIndex = ref(0);
let animationFrame;
let accumulatedTime = 0;
let previousFrameTime;
let reducedMotionQuery;

const resolvedSize = computed(() => {
  const numeric = normalizeNumber(propsWithDefaults.size, {
    positive: true,
    fallback: DEFAULT_SIZE,
  });

  return Math.min(Math.max(numeric, MIN_SIZE), MAX_SIZE);
});
const sizeStyle = computed(() => ({
  '--mat-loading-size': `${resolvedSize.value}px`,
}));
const isControlled = computed(() => Number.isFinite(propsWithDefaults.progress));
const controlledProgress = computed(() => (
  isControlled.value ? Math.max(propsWithDefaults.progress, 0) : 0
));
const controlledMorphProgress = computed(() => Math.min(controlledProgress.value, 1));
const controlledStyle = computed(() => {
  if (!isControlled.value) {
    return {};
  }

  return {
    '--mat-loading-determinate-morph-progress': `${controlledMorphProgress.value}`,
  };
});
const rootStyle = computed(() => ({
  ...colorStyle.value,
  ...sizeStyle.value,
  ...controlledStyle.value,
}));
const indicatorSize = computed(() => resolvedSize.value * (38 / 48));
const activeShapeName = computed(() => {
  if (isControlled.value) {
    return controlledMorphProgress.value >= 1 ? 'soft-burst' : 'circle';
  }

  return LOADING_SHAPE_NAMES[currentShapeIndex.value];
});
const activeShapeStyle = computed(() => {
  if (!isControlled.value) {
    return undefined;
  }

  return {
    rotate: String(-controlledProgress.value * 180) + 'deg',
  };
});

/**
 * @returns {boolean}
 */
function prefersReducedMotion() {
  if (reducedMotionQuery) {
    return reducedMotionQuery.matches;
  }

  return typeof globalThis.matchMedia === 'function'
    && globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function stopShapeAnimation() {
  if (animationFrame !== undefined) {
    globalThis.cancelAnimationFrame?.(animationFrame);
    animationFrame = undefined;
  }
}

function resetShape() {
  currentShapeIndex.value = 0;
  accumulatedTime = 0;
  previousFrameTime = undefined;
}

/**
 * @param {DOMHighResTimeStamp} frameTime
 */
function updateShape(frameTime) {
  animationFrame = undefined;

  if (isControlled.value) {
    return;
  }

  if (previousFrameTime !== undefined) {
    accumulatedTime += frameTime - previousFrameTime;
  }

  previousFrameTime = frameTime;
  const nextShapeIndex = Math.floor(accumulatedTime / SHAPE_SWITCH_INTERVAL)
    % LOADING_SHAPE_NAMES.length;

  if (nextShapeIndex !== currentShapeIndex.value) {
    currentShapeIndex.value = nextShapeIndex;
  }

  if (!prefersReducedMotion()) {
    animationFrame = globalThis.requestAnimationFrame(updateShape);
  }
}

function startShapeAnimation() {
  stopShapeAnimation();
  resetShape();

  if (isControlled.value
    || typeof globalThis.requestAnimationFrame !== 'function'
    || prefersReducedMotion()) {
    return;
  }

  animationFrame = globalThis.requestAnimationFrame(updateShape);
}

watch(
  () => propsWithDefaults.progress,
  () => {
    if (isControlled.value) {
      stopShapeAnimation();
      resetShape();
      return;
    }

    startShapeAnimation();
  },
);

onMounted(() => {
  if (typeof globalThis.matchMedia === 'function') {
    reducedMotionQuery = globalThis.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionQuery.addEventListener?.('change', startShapeAnimation);
  }

  startShapeAnimation();
});

onBeforeUnmount(() => {
  stopShapeAnimation();
  reducedMotionQuery?.removeEventListener?.('change', startShapeAnimation);
});
</script>

<template>
  <div
    v-bind="$attrs"
    class="mat-loading"
    :class="{
      'mat-loading--contained': propsWithDefaults.containment,
      'mat-loading--determinate': isControlled,
    }"
    :style="rootStyle"
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="1"
    :aria-valuenow="isControlled ? controlledMorphProgress : undefined"
  >
    <MatShape
      class="mat-loading__active-indicator"
      :name="activeShapeName"
      :size="indicatorSize"
      :color="propsWithDefaults.color || 'primary'"
      :style="activeShapeStyle"
      aria-hidden="true"
    />
  </div>
</template>

<style scoped>
@layer mde.components {
  .mat-loading {
    --mat-loading-current-active-indicator-color: var(--mat-accent-color, var(--mat-loading-active-indicator-color));
    --mat-loading-current-container-color: var(--mat-loading-container-color);
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    inline-size: var(--mat-loading-size);
    block-size: var(--mat-loading-size);
    margin-inline: auto;
    background: var(--mat-loading-current-container-color);
    border-radius: var(--mat-sys-shape-corner-full);
  }

  .mat-loading--contained {
    --mat-loading-current-active-indicator-color: var(--mat-on-accent-container-color, var(--mat-loading-contained-active-indicator-color));
    --mat-loading-current-container-color: var(--mat-accent-container-color, var(--mat-loading-contained-container-color));
  }

  .mat-loading .mat-loading__active-indicator {
    display: block;
    flex: 0 0 auto;
    box-sizing: border-box;
    background: var(--mat-loading-current-active-indicator-color);
    animation: mat-loading-shape-cycle 4550ms linear infinite, mat-loading-morph-rotate 18200ms linear infinite, mat-loading-rotate 4666ms linear infinite;
  }

  .mat-loading.mat-loading--determinate .mat-loading__active-indicator {
    animation: mat-loading-determinate-shape 1s linear 1 both;
    animation-delay: calc(var(--mat-loading-determinate-morph-progress) * -1s);
    animation-play-state: paused;
  }

  @keyframes mat-loading-rotate {
    to {
      transform: rotate(1turn);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .mat-loading:not(.mat-loading--determinate) .mat-loading__active-indicator {
      transition: none;
      animation: none;
    }
  }
}
</style>
