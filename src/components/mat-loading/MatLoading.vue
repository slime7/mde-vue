<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { isComponentColor } from '../button-props';
import useComponentColor from '../use-component-color';
import { normalizeNumber } from '../value-utils';
import { useMatProps } from '../use-mat-props';
import {
  formatLoadingShape,
  interpolateLoadingShapes,
  LOADING_SHAPE_FRAMES,
} from './loading-shape-frames';

const DEFAULT_SIZE = 48;
const MIN_SIZE = 24;
const MAX_SIZE = 240;
const MORPH_CYCLE = 2400;
const MORPH_SEGMENTS = 7;

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
});
const propsWithDefaults = useMatProps('loading', props);

const { colorStyle } = useComponentColor(computed(() => propsWithDefaults.color));
const activeIndicator = ref(null);
const clippath = ref(formatLoadingShape(LOADING_SHAPE_FRAMES[0]));
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
const containmentStyle = computed(() => {
  if (!propsWithDefaults.containment) {
    return {};
  }

  return {
    '--mat-loading-container-color': 'var(--mat-accent-container-color, var(--mat-sys-color-primary-container))',
    '--mat-loading-active-indicator-color': 'var(--mat-on-accent-container-color, var(--mat-sys-color-on-primary-container))',
  };
});
const rootStyle = computed(() => ({
  ...colorStyle.value,
  ...sizeStyle.value,
  ...containmentStyle.value,
}));
// 容器与活动指示器按 38 : 48 的比例保持尺寸关系，数字来自官方规格。
const indicatorStyle = computed(() => ({
  '--mat-loading-indicator-size': propsWithDefaults.containment
    ? 'calc(var(--mat-loading-size) * 0.7916666666666666)'
    : 'var(--mat-loading-size)',
}));

/**
 * 返回给定累计时间对应的形状插值 clip-path。
 *
 * @param {number} time
 * @returns {string}
 */
function computeClipPath(time) {
  const cycle = time % MORPH_CYCLE;
  const segment = (cycle / MORPH_CYCLE) * MORPH_SEGMENTS;
  const fromIndex = Math.floor(segment) % LOADING_SHAPE_FRAMES.length;
  const toIndex = (fromIndex + 1) % LOADING_SHAPE_FRAMES.length;
  const progress = segment - Math.floor(segment);
  const eased = progress * progress * (3 - 2 * progress);

  return formatLoadingShape(interpolateLoadingShapes(
    LOADING_SHAPE_FRAMES[fromIndex],
    LOADING_SHAPE_FRAMES[toIndex],
    eased,
  ));
}

/**
 * @returns {boolean}
 */
function prefersReducedMotion() {
  return typeof globalThis.matchMedia === 'function'
    && globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * @param {DOMHighResTimeStamp} frameTime
 */
function updateShape(frameTime) {
  animationFrame = undefined;

  if (previousFrameTime !== undefined) {
    accumulatedTime += frameTime - previousFrameTime;
  }

  previousFrameTime = frameTime;
  clippath.value = computeClipPath(accumulatedTime);

  if (!prefersReducedMotion()) {
    animationFrame = globalThis.requestAnimationFrame(updateShape);
  }
}

function startShapeAnimation() {
  if (typeof globalThis.requestAnimationFrame !== 'function') {
    return;
  }

  if (prefersReducedMotion()) {
    clippath.value = computeClipPath(0);
    return;
  }

  if (animationFrame === undefined) {
    previousFrameTime = undefined;
    accumulatedTime = 0;
    animationFrame = globalThis.requestAnimationFrame(updateShape);
  }
}

onMounted(() => {
  startShapeAnimation();

  if (typeof globalThis.matchMedia === 'function') {
    reducedMotionQuery = globalThis.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionQuery.addEventListener?.('change', startShapeAnimation);
  }
});

onBeforeUnmount(() => {
  if (animationFrame !== undefined) {
    globalThis.cancelAnimationFrame?.(animationFrame);
  }

  reducedMotionQuery?.removeEventListener?.('change', startShapeAnimation);
});
</script>

<template>
  <div
    v-bind="$attrs"
    class="mat-loading"
    :class="{ 'mat-loading--contained': propsWithDefaults.containment }"
    :style="rootStyle"
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="1"
  >
    <span
      ref="activeIndicator"
      class="mat-loading__active-indicator"
      :style="indicatorStyle"
      aria-hidden="true"
    />
  </div>
</template>

<style scoped>
@layer mde.components {
  .mat-loading {
    --mat-loading-active-indicator-color: var(--mat-accent-color, var(--mat-sys-color-primary));
    --mat-loading-container-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    inline-size: var(--mat-loading-size);
    block-size: var(--mat-loading-size);
    margin-inline: auto;
    background: var(--mat-loading-container-color);
    border-radius: var(--mat-sys-shape-corner-full);
  }

  .mat-loading__active-indicator {
    display: block;
    flex: 0 0 auto;
    box-sizing: border-box;
    inline-size: var(--mat-loading-indicator-size);
    block-size: var(--mat-loading-indicator-size);
    background: var(--mat-loading-active-indicator-color);
    clip-path: v-bind(clippath);
    animation: mat-loading-morph 24s linear infinite;
  }

  @keyframes mat-loading-morph {
    to {
      transform: rotate(1turn);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .mat-loading__active-indicator {
      animation: none;
    }
  }
}
</style>
