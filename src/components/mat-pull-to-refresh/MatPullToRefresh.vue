<script setup>
import {
  computed, inject, onBeforeUnmount, ref, watch,
} from 'vue';
import MatLoading from '../mat-loading/MatLoading.vue';
import { isComponentColor } from '../button-props';
import { MAT_SCROLL_AREA_KEY } from '../scroll-area-context';
import { normalizeNumber } from '../value-utils';
import { useMatProps } from '../use-mat-props';

const DEFAULT_TRIGGER_DISTANCE = 80;
// androidx material3 PullToRefresh.kt：DragMultiplier = 0.5f
const DRAG_MULTIPLIER = 0.5;
const POINTER_SLOP = 4;
// androidx DefaultEffects 弹簧：dampingRatio 1.0、stiffness 1600；
// 临界阻尼系数 c = 2 × sqrt(k) × ζ。
const SPRING_STIFFNESS = 1600;
const SPRING_DAMPING = 80;
// androidx StandardMotionTokens 默认空间弹簧：dampingRatio 0.9、stiffness 700，
// placeholder 的回弹属于空间位移，使用带轻微回弹的空间弹簧。
const PLACEHOLDER_SPRING_STIFFNESS = 700;
const PLACEHOLDER_SPRING_DAMPING = 2 * Math.sqrt(PLACEHOLDER_SPRING_STIFFNESS) * 0.9;

defineOptions({
  name: 'MatPullToRefresh',
});

const props = defineProps({
  /**
   * 刷新中状态；拉动触发时组件发出 `update:modelValue` 置为 true，
   * 外部刷新完成后置回 false 结束刷新（v-model）。
   *
   * @type {boolean}
   * @default false
   */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /**
   * 拉动时组件自身随拉动变高（水平时变宽），推挤后面的兄弟内容；
   * 随拉动距离增长，拉满进度后停止，触发刷新或取消拉动时回弹归零、内容复位。
   * 未开启时内容不移动，指示器悬浮在内容上方。
   *
   * @type {boolean}
   * @default false
   */
  placeholder: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否禁用下拉刷新手势；禁用时拖拽与滚轮都不会触发刷新，
   * 进行中的拉动手势和滚轮累积会被立即取消。
   * 受控的 modelValue 刷新显示不受影响。
   *
   * @type {boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 触发刷新需要的拉动距离，单位 px；数字与纯数字字符串，非法值回退 80。
   *
   * @type {number | string}
   * @default 80
   */
  triggerDistance: {
    type: [Number, String],
    default: 80,
    validator: (value) => typeof value === 'number'
      || (typeof value === 'string' && /^\s*\d+(\.\d+)?\s*$/.test(value)),
  },
  /**
   * 透传给内部加载指示器的宽高尺寸。
   *
   * @type {number | string | undefined}
   * @default undefined
   */
  size: {
    type: [Number, String],
    default: undefined,
    validator: (value) => {
      if (value === undefined) {
        return true;
      }

      return typeof value === 'number'
        || (typeof value === 'string' && /^\s*\d+(\.\d+)?\s*$/.test(value));
    },
  },
  /**
   * 透传给内部加载指示器的颜色。
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
   * 透传给内部加载指示器的圆形背景容器开关。
   *
   * @type {boolean}
   * @default false
   */
  containment: {
    type: Boolean,
    default: false,
  },
});
const propsWithDefaults = useMatProps('pullToRefresh', props);

const emit = defineEmits({
  /**
   * 拉动距离达到触发距离后释放，或滚轮累积达到阈值时触发。
   */
  refresh: () => true,
  /**
   * 刷新状态变化；触发时载荷为 true，等待外部置回 false。
   *
   * @type {boolean}
   */
  'update:modelValue': (value) => typeof value === 'boolean',
});

const context = inject(MAT_SCROLL_AREA_KEY, null);
const scrollerRef = context?.scroller ?? ref(null);
const orientationRef = context?.orientation ?? ref('vertical');
const isHorizontal = computed(() => orientationRef.value === 'horizontal');
const triggerPx = computed(() => normalizeNumber(propsWithDefaults.triggerDistance, {
  positive: true,
  fallback: DEFAULT_TRIGGER_DISTANCE,
}));

const phase = ref('idle');
const isRefreshing = ref(props.modelValue);
const placeholderSize = ref(0);
const pullProgress = ref(0);
const appear = ref(0);
const scrollPaddingPx = ref(0);

let currentScroller = null;
let activePointerId;
let startX = 0;
let startY = 0;
let wasAtStart = false;
let engaged = false;
let releaseCaptureOnEnd = false;
let wheelAccumulating = false;
let rawPulled = 0;
let suppressClick = false;
let suppressClickTimer;

const rootStyle = computed(() => ({
  '--mat-pull-to-refresh-placeholder-size': `${placeholderSize.value}px`,
  '--mat-pull-to-refresh-appear': `${appear.value}`,
  '--mat-pull-to-refresh-scroll-padding': `${scrollPaddingPx.value}px`,
}));
const indicatorProgress = computed(() => (
  isRefreshing.value ? undefined : pullProgress.value
));

function prefersReducedMotion() {
  return typeof globalThis.matchMedia === 'function'
    && globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function clearSuppressClick() {
  if (suppressClickTimer !== undefined) {
    globalThis.clearTimeout(suppressClickTimer);
    suppressClickTimer = undefined;
  }

  suppressClick = false;
}

function suppressNextClick() {
  clearSuppressClick();
  suppressClick = true;
  suppressClickTimer = globalThis.setTimeout(() => {
    suppressClick = false;
    suppressClickTimer = undefined;
  }, 0);
}

/**
 * 弹簧动画；默认参数对应 androidx DefaultEffects（stiffness 1600、dampingRatio 1.0）。
 *
 * @param {(value: number) => void} onUpdate 每帧回调。
 * @param {() => void} [onSettle] 到达目标后的回调。
 * @param {number} [stiffness] 弹簧刚度，默认取 DefaultEffects 数值。
 * @param {number} [damping] 阻尼系数，默认取 DefaultEffects 数值。
 * @returns {{ start: (from: number, to: number) => void, stop: () => void }}
 */
function createSpring(onUpdate, onSettle, stiffness = SPRING_STIFFNESS, damping = SPRING_DAMPING) {
  let frameId;
  let position = 0;
  let velocity = 0;
  let target = 0;
  let previousTime;

  function stop() {
    if (frameId !== undefined) {
      globalThis.cancelAnimationFrame?.(frameId);
      frameId = undefined;
    }

    previousTime = undefined;
  }

  /**
   * @param {DOMHighResTimeStamp} frameTime
   * @returns {void}
   */
  function step(frameTime) {
    frameId = undefined;
    const elapsed = previousTime === undefined
      ? 0
      : Math.min((frameTime - previousTime) / 1000, 1 / 30);

    previousTime = frameTime;

    if (elapsed > 0) {
      const acceleration = -stiffness * (position - target) - damping * velocity;

      velocity += acceleration * elapsed;
      position += velocity * elapsed;
    }

    if (Math.abs(position - target) < 0.1 && Math.abs(velocity) < 0.1) {
      position = target;
      velocity = 0;
      previousTime = undefined;
      onUpdate(position);
      onSettle?.();
      return;
    }

    onUpdate(position);
    frameId = globalThis.requestAnimationFrame(step);
  }

  return {
    start(from, to) {
      stop();
      position = from;
      target = to;
      velocity = 0;

      if (prefersReducedMotion()
        || typeof globalThis.requestAnimationFrame !== 'function') {
        position = to;
        onUpdate(position);
        onSettle?.();
        return;
      }

      frameId = globalThis.requestAnimationFrame(step);
    },
    stop,
  };
}

const appearSpring = createSpring(
  (value) => {
    appear.value = value;
  },
  () => {
    if (phase.value === 'collapse') {
      phase.value = 'idle';
    }
  },
);
const placeholderSpring = createSpring(
  (value) => {
    // 空间弹簧带轻微回弹，过冲部分钳制在起点，避免出现负的占位高度。
    placeholderSize.value = Math.max(0, value);
  },
  undefined,
  PLACEHOLDER_SPRING_STIFFNESS,
  PLACEHOLDER_SPRING_DAMPING,
);

function startAppear() {
  appearSpring.start(appear.value, 1);
}

function enterRefresh(shouldEmit) {
  isRefreshing.value = true;
  phase.value = 'refresh';
  wheelAccumulating = false;
  rawPulled = 0;
  pullProgress.value = 0;
  placeholderSpring.start(placeholderSize.value, 0);

  if (appear.value < 1) {
    // 外部直接进入刷新：指示器在静止位播放入场动画。
    startAppear();
  }

  if (shouldEmit) {
    emit('update:modelValue', true);
    emit('refresh');
  }
}

function startCollapse() {
  if (phase.value === 'collapse') {
    return;
  }

  phase.value = 'collapse';
  pullProgress.value = 0;
  placeholderSpring.start(placeholderSize.value, 0);
  appearSpring.start(appear.value, 0);
}

function endRefresh() {
  isRefreshing.value = false;
  startCollapse();
}

watch(() => props.modelValue, (value) => {
  if (value && !isRefreshing.value) {
    enterRefresh(false);
  } else if (!value && isRefreshing.value) {
    endRefresh();
  }
});

watch(() => propsWithDefaults.disabled, (disabled) => {
  if (!disabled) {
    return;
  }

  if (wheelAccumulating) {
    wheelAccumulating = false;
    rawPulled = 0;
    startCollapse();
  }

  if (activePointerId !== undefined) {
    endPointerGesture(activePointerId, false);
  }
});

function isAtStart() {
  if (!currentScroller) {
    return false;
  }

  if (isHorizontal.value) {
    return Math.abs(currentScroller.scrollLeft) < 1;
  }

  return currentScroller.scrollTop < 1;
}

/**
 * 读取滚动元素在当前滚动轴起始边上的内边距，把指示器静止位换算到视口可见边缘。
 *
 * @returns {void}
 */
function syncScrollPadding() {
  const element = currentScroller;

  if (!element || typeof globalThis.getComputedStyle !== 'function') {
    scrollPaddingPx.value = 0;
    return;
  }

  const computed = globalThis.getComputedStyle(element);
  const padding = parseFloat(
    isHorizontal.value ? computed.paddingLeft : computed.paddingTop,
  );

  scrollPaddingPx.value = Number.isFinite(padding) ? padding : 0;
}

function applyPull() {
  const adjusted = rawPulled * DRAG_MULTIPLIER;

  // placeholder 随拉动距离增长，拉满进度后停止。
  placeholderSize.value = Math.min(adjusted, triggerPx.value);
  pullProgress.value = triggerPx.value > 0 ? adjusted / triggerPx.value : 0;
}

function handlePointerDown(event) {
  if (!currentScroller
    || propsWithDefaults.disabled
    || isRefreshing.value
    || phase.value !== 'idle'
    || event.button !== 0) {
    return;
  }

  activePointerId = event.pointerId;
  startX = event.clientX;
  startY = event.clientY;
  wasAtStart = isAtStart();
  engaged = false;
  releaseCaptureOnEnd = false;
}

function handlePointerMove(event) {
  if (event.pointerId !== activePointerId || !currentScroller || isRefreshing.value) {
    return;
  }

  const delta = isHorizontal.value
    ? event.clientX - startX
    : event.clientY - startY;

  if (!engaged) {
    if (!wasAtStart || delta <= POINTER_SLOP) {
      if (delta < -POINTER_SLOP) {
        activePointerId = undefined;
      }

      return;
    }

    engaged = true;
    releaseCaptureOnEnd = true;
    startAppear();
    currentScroller.setPointerCapture?.(event.pointerId);
  }

  rawPulled = Math.max(0, delta - POINTER_SLOP);

  if (rawPulled <= 0) {
    endPointerGesture(event.pointerId);
    return;
  }

  applyPull();
  event.preventDefault();
}

function endPointerGesture(pointerId, shouldJudge = true) {
  if (pointerId !== undefined && pointerId !== activePointerId) {
    return;
  }

  const wasEngaged = engaged;
  const shouldReleaseCapture = releaseCaptureOnEnd;
  const element = currentScroller;

  activePointerId = undefined;
  engaged = false;
  releaseCaptureOnEnd = false;

  if (shouldReleaseCapture
    && element?.hasPointerCapture?.(pointerId)) {
    element.releasePointerCapture(pointerId);
  }

  if (!wasEngaged) {
    return;
  }

  suppressNextClick();

  const shouldRefresh = shouldJudge
    && rawPulled * DRAG_MULTIPLIER >= triggerPx.value;

  rawPulled = 0;

  if (shouldRefresh) {
    enterRefresh(true);
    return;
  }

  startCollapse();
}

function handlePointerUp(event) {
  endPointerGesture(event.pointerId, true);
}

function handlePointerCancel(event) {
  endPointerGesture(event.pointerId, false);
}

function handleLostPointerCapture(event) {
  endPointerGesture(event.pointerId, false);
}

function handleTouchMove(event) {
  if (engaged) {
    event.preventDefault();
  }
}

function handleWheel(event) {
  if (!currentScroller
    || propsWithDefaults.disabled
    || isRefreshing.value
    || (phase.value === 'drag' && !wheelAccumulating)) {
    return;
  }

  const outwardDelta = isHorizontal.value ? -event.deltaX : -event.deltaY;

  if (!wheelAccumulating) {
    if (!isAtStart() || outwardDelta <= 0) {
      return;
    }

    wheelAccumulating = true;
    rawPulled = 0;
    phase.value = 'drag';
    startAppear();
  }

  rawPulled = Math.max(0, rawPulled + outwardDelta);

  if (rawPulled <= 0) {
    wheelAccumulating = false;
    startCollapse();
    return;
  }

  event.preventDefault();
  applyPull();

  if (rawPulled * DRAG_MULTIPLIER >= triggerPx.value) {
    enterRefresh(true);
  }
}

function handleScroll() {
  if (!wheelAccumulating) {
    return;
  }

  wheelAccumulating = false;
  rawPulled = 0;
  startCollapse();
}

function detachScroller() {
  const element = currentScroller;

  if (!element) {
    return;
  }

  element.removeEventListener('pointerdown', handlePointerDown);
  element.removeEventListener('pointermove', handlePointerMove);
  element.removeEventListener('pointerup', handlePointerUp);
  element.removeEventListener('pointercancel', handlePointerCancel);
  element.removeEventListener('lostpointercapture', handleLostPointerCapture);
  element.removeEventListener('touchmove', handleTouchMove);
  element.removeEventListener('scroll', handleScroll);
  element.removeEventListener('wheel', handleWheel);
  element.removeEventListener('click', handleClickCapture, true);
  currentScroller = null;
}

function handleClickCapture(event) {
  if (!suppressClick) {
    return;
  }

  clearSuppressClick();
  event.preventDefault();
  event.stopImmediatePropagation();
}

watch(() => scrollerRef.value ?? null, (element) => {
  detachScroller();
  scrollPaddingPx.value = 0;

  if (!element) {
    return;
  }

  currentScroller = element;
  syncScrollPadding();
  element.addEventListener('pointerdown', handlePointerDown);
  element.addEventListener('pointermove', handlePointerMove);
  element.addEventListener('pointerup', handlePointerUp);
  element.addEventListener('pointercancel', handlePointerCancel);
  element.addEventListener('lostpointercapture', handleLostPointerCapture);
  element.addEventListener('touchmove', handleTouchMove);
  element.addEventListener('scroll', handleScroll);
  element.addEventListener('wheel', handleWheel, { passive: false });
  element.addEventListener('click', handleClickCapture, true);
}, { immediate: true, flush: 'post' });

watch(isHorizontal, () => {
  syncScrollPadding();
});

if (isRefreshing.value) {
  phase.value = 'refresh';
  appear.value = 1;
}

onBeforeUnmount(() => {
  detachScroller();
  appearSpring.stop();
  placeholderSpring.stop();
  clearSuppressClick();
});
</script>

<template>
  <div
    class="mat-pull-to-refresh"
    :class="{
      'mat-pull-to-refresh--horizontal': isHorizontal,
      'mat-pull-to-refresh--placeholder': propsWithDefaults.placeholder,
      'mat-pull-to-refresh--refreshing': isRefreshing,
      'mat-pull-to-refresh--active': appear > 0 || isRefreshing,
    }"
    :style="rootStyle"
  >
    <div class="mat-pull-to-refresh__indicator">
      <MatLoading
        :size="propsWithDefaults.size"
        :color="propsWithDefaults.color"
        :containment="propsWithDefaults.containment"
        :progress="indicatorProgress"
      />
    </div>
  </div>
</template>

<style scoped>
@layer mde.components {
  .mat-pull-to-refresh {
    --mat-pull-to-refresh-placeholder-size: 0;
    --mat-pull-to-refresh-appear: 0;
    --mat-pull-to-refresh-scroll-padding: 0;

    /* 指示器静止位距视口起始边缘 80px，对齐 androidx 行程终点 80dp。 */
    --mat-pull-to-refresh-rest-distance: 80px;
    position: relative;
    display: block;
    box-sizing: border-box;
    block-size: 0;
    flex: none;
  }

  .mat-pull-to-refresh--placeholder {
    block-size: var(--mat-pull-to-refresh-placeholder-size);
  }

  .mat-pull-to-refresh--horizontal {
    display: inline-block;
    vertical-align: top;
    block-size: 100%;
    inline-size: 0;
  }

  .mat-pull-to-refresh--horizontal.mat-pull-to-refresh--placeholder {
    block-size: 100%;
    inline-size: var(--mat-pull-to-refresh-placeholder-size);
  }

  /* 指示器始终固定在静止位：短暂淡入放大入场，取消或刷新结束时原位淡出。 */
  .mat-pull-to-refresh__indicator {
    position: absolute;
    z-index: 1;
    visibility: hidden;
    pointer-events: none;
    opacity: var(--mat-pull-to-refresh-appear);
  }

  .mat-pull-to-refresh--active .mat-pull-to-refresh__indicator {
    visibility: visible;
  }

  .mat-pull-to-refresh:not(.mat-pull-to-refresh--horizontal) .mat-pull-to-refresh__indicator {
    top: calc(var(--mat-pull-to-refresh-rest-distance) - var(--mat-pull-to-refresh-scroll-padding));
    left: 50%;
    translate: -50% -100%;
    scale: calc(.5 + .5 * var(--mat-pull-to-refresh-appear));
  }

  .mat-pull-to-refresh--horizontal .mat-pull-to-refresh__indicator {
    top: 50%;
    left: calc(var(--mat-pull-to-refresh-rest-distance) - var(--mat-pull-to-refresh-scroll-padding));
    translate: -100% -50%;
    scale: calc(.5 + .5 * var(--mat-pull-to-refresh-appear));
  }
}
</style>
