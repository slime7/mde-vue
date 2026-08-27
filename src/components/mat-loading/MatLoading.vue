<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
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
const indicatorSize = computed(() => resolvedSize.value * (38 / 48));
const activeShapeName = computed(() => LOADING_SHAPE_NAMES[currentShapeIndex.value]);

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

  if (typeof globalThis.requestAnimationFrame !== 'function'
    || prefersReducedMotion()) {
    return;
  }

  animationFrame = globalThis.requestAnimationFrame(updateShape);
}

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
    :class="{ 'mat-loading--contained': propsWithDefaults.containment }"
    :style="rootStyle"
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="1"
  >
    <MatShape
      class="mat-loading__active-indicator"
      :name="activeShapeName"
      :size="indicatorSize"
      :color="propsWithDefaults.color || 'primary'"
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

  .mat-loading .mat-loading__active-indicator {
    display: block;
    flex: 0 0 auto;
    box-sizing: border-box;
    background: var(--mat-loading-active-indicator-color);
    animation: mat-loading-shape-cycle 4550ms linear infinite, mat-loading-morph-rotate 18200ms linear infinite, mat-loading-rotate 4666ms linear infinite;
  }

  @keyframes mat-loading-rotate {
    to {
      transform: rotate(1turn);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .mat-loading .mat-loading__active-indicator {
      transition: none;
      animation: none;
    }
  }
}
</style>
