<script setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
  useAttrs,
  watch,
} from 'vue';
import {
  isValidCssLength,
  isValidEdgeValues,
  resolveEdgeValues,
  toCssLength,
} from '../value-utils';
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatScrollArea',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 滚动方向；`y`、`v` 是 `vertical` 的别名，`x`、`h` 是 `horizontal` 的别名。
   *
   * @type {'vertical' | 'y' | 'v' | 'horizontal' | 'x' | 'h'}
   * @default 'vertical'
   */
  orientation: {
    type: String,
    default: 'vertical',
    validator(value) {
      return ['vertical', 'y', 'v', 'horizontal', 'x', 'h'].includes(value);
    },
  },
  /**
   * 滚动停靠强度；`none` 关闭停靠，其他值映射到当前滚动轴。
   *
   * @type {'none' | 'proximity' | 'mandatory'}
   * @default 'none'
   */
  snap: {
    type: String,
    default: 'none',
    validator(value) {
      return ['none', 'proximity', 'mandatory'].includes(value);
    },
  },
  /**
   * 当前滚动轴起始端和末端的滚动停靠内边距，单位为 px。
   *
   * @type {number}
   * @default 0
   */
  snapPadding: {
    type: Number,
    default: 0,
    validator: (value) => isValidCssLength(value, { allowUndefined: false }),
  },
  /**
   * 阴影从对应边缘向内延伸的像素数。数字或纯数字字符串同时用于两端，
   * 对象可分别设置 start、end。未设置时使用 16px。
   *
   * @type {number | { start?: number, end?: number }}
   * @default 16
   */
  shadowLength: {
    type: [Number, Object],
    default: undefined,
    validator: (value) => isValidEdgeValues(value),
  },
  /**
   * 原生滚动条宽度；`default` 使用浏览器默认值，`thin` 使用窄滚动条，`hidden` 隐藏滚动条。
   *
   * @type {'default' | 'thin' | 'hidden'}
   * @default 'thin'
   */
  barWidth: {
    type: String,
    default: 'thin',
    validator(value) {
      return ['default', 'thin', 'hidden'].includes(value);
    },
  },
  /**
   * 横向模式下允许使用鼠标主键或触控笔按住拖拽滚动。
   *
   * @type {boolean}
   * @default false
   */
  dragScroll: {
    type: Boolean,
    default: false,
  },
  /**
   * 进入滚动边缘多少像素时触发事件。数字或纯数字字符串同时用于两端，
   * 对象成员同样接受，可分别设置 start、end。
   *
   * @type {number | { start?: number, end?: number }}
   * @default 0
   */
  reachThreshold: {
    type: [Number, Object],
    default: 0,
    validator: (value) => isValidEdgeValues(value, { allowUndefined: false }),
  },
  /**
   * 边缘阴影带从对应边缘向内偏移的像素数。数字或纯数字字符串同时用于两端，
   * 对象可分别设置 start、end。偏移区内的内容不会被遮罩覆盖，适合放置不透明的 sticky 元素。
   *
   * @type {number | { start?: number, end?: number }}
   * @default 0
   */
  shadowOffset: {
    type: [Number, Object],
    default: 0,
    validator: (value) => isValidEdgeValues(value, { allowUndefined: false }),
  },
});
const propsWithDefaults = useMatProps('scrollArea', props);

const emit = defineEmits({
  /**
   * 滚动进入起始边缘阈值时触发；载荷包含当前距离和滚动元素。
   *
   * @type {{ distance: number, target: HTMLElement }}
   */
  'reach-start': (payload) => (
    typeof payload?.distance === 'number' && payload.target instanceof HTMLElement
  ),
  /**
   * 滚动进入末端边缘阈值时触发；载荷包含当前距离和滚动元素。
   *
   * @type {{ distance: number, target: HTMLElement }}
   */
  'reach-end': (payload) => (
    typeof payload?.distance === 'number' && payload.target instanceof HTMLElement
  ),
});

const attrs = useAttrs();
const scroller = ref(null);
const hasStartOverflow = ref(false);
const hasEndOverflow = ref(false);
const isDragging = ref(false);
const wasWithinStart = ref(false);
const wasWithinEnd = ref(false);
let frameId;
let resizeObserver;
let dragPointerId;
let dragStartX = 0;
let dragStartScrollLeft = 0;
let suppressClick = false;
let suppressClickTimer;

const normalizedOrientation = computed(() => (
  ['horizontal', 'x', 'h'].includes(propsWithDefaults.orientation) ? 'horizontal' : 'vertical'
));
const canDragScroll = computed(() => (
  propsWithDefaults.dragScroll && normalizedOrientation.value === 'horizontal'
));
const thresholds = computed(() => {
  return resolveEdgeValues(propsWithDefaults.reachThreshold, 0);
});
const shadowOffsets = computed(() => {
  return resolveEdgeValues(propsWithDefaults.shadowOffset, 0);
});
const shadowLengths = computed(() => resolveEdgeValues(propsWithDefaults.shadowLength, 16));
const scrollbarSpace = computed(() => {
  if (propsWithDefaults.barWidth === 'hidden') {
    return 0;
  }

  return propsWithDefaults.barWidth === 'thin' ? 10 : 16;
});
const viewportStyle = computed(() => ({
  // 阴影变量参与 mask 渐变的 calc() 运算，必须始终携带长度单位；
  // toCssLength 会把 0 输出为无单位值，导致渐变整体失效。
  '--mat-scroll-area-shadow-length-start': `${shadowLengths.value.start}px`,
  '--mat-scroll-area-shadow-length-end': `${shadowLengths.value.end}px`,
  '--mat-scroll-area-shadow-offset-start': `${shadowOffsets.value.start}px`,
  '--mat-scroll-area-shadow-offset-end': `${shadowOffsets.value.end}px`,
  '--mat-scroll-area-scrollbar-space': `${scrollbarSpace.value}px`,
}));
const rootAttrs = computed(() => ({
  class: attrs.class,
  style: attrs.style,
}));
const scrollerStyle = computed(() => {
  const isHorizontal = normalizedOrientation.value === 'horizontal';
  const padding = toCssLength(propsWithDefaults.snapPadding, { fallback: '0' });

  return {
    scrollPaddingBottom: isHorizontal ? undefined : padding,
    scrollPaddingLeft: isHorizontal ? padding : undefined,
    scrollPaddingRight: isHorizontal ? padding : undefined,
    scrollPaddingTop: isHorizontal ? undefined : padding,
    scrollSnapType: propsWithDefaults.snap === 'none'
      ? 'none'
      : `${isHorizontal ? 'x' : 'y'} ${propsWithDefaults.snap}`,
  };
});
const scrollerAttrs = computed(() => Object.fromEntries(
  Object.entries(attrs).filter(([name]) => !['class', 'style'].includes(name)),
));

/**
 * @returns {{ start: number, end: number }}
 */
function readDistances() {
  const element = scroller.value;

  if (!element) {
    return { start: 0, end: 0 };
  }

  if (normalizedOrientation.value === 'horizontal') {
    const position = Math.abs(element.scrollLeft);

    return {
      start: position,
      end: Math.max(0, element.scrollWidth - element.clientWidth - position),
    };
  }

  return {
    start: Math.max(0, element.scrollTop),
    end: Math.max(0, element.scrollHeight - element.clientHeight - element.scrollTop),
  };
}

/**
 * @param {boolean} shouldEmit
 * @returns {void}
 */
function syncState(shouldEmit) {
  const element = scroller.value;

  if (!element) {
    return;
  }

  const distances = readDistances();
  const withinStart = distances.start <= thresholds.value.start + 1;
  const withinEnd = distances.end <= thresholds.value.end + 1;

  hasStartOverflow.value = distances.start > 1;
  hasEndOverflow.value = distances.end > 1;

  if (shouldEmit && withinStart && !wasWithinStart.value) {
    emit('reach-start', { distance: distances.start, target: element });
  }

  if (shouldEmit && withinEnd && !wasWithinEnd.value) {
    emit('reach-end', { distance: distances.end, target: element });
  }

  wasWithinStart.value = withinStart;
  wasWithinEnd.value = withinEnd;
}

/**
 * @param {boolean} shouldEmit
 * @returns {void}
 */
function scheduleSync(shouldEmit) {
  if (frameId !== undefined) {
    cancelAnimationFrame(frameId);
  }

  frameId = requestAnimationFrame(() => {
    frameId = undefined;
    syncState(shouldEmit);
  });
}

function handleScroll() {
  scheduleSync(true);
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
 * @param {boolean} releaseCapture
 * @returns {void}
 */
function resetDrag(releaseCapture = false) {
  const element = scroller.value;
  const pointerId = dragPointerId;

  if (releaseCapture
    && pointerId !== undefined
    && element?.hasPointerCapture?.(pointerId)) {
    element.releasePointerCapture(pointerId);
  }

  dragPointerId = undefined;
  isDragging.value = false;
}

/**
 * @param {PointerEvent} event
 * @returns {void}
 */
function handlePointerDown(event) {
  if (!canDragScroll.value
    || dragPointerId !== undefined
    || event.button !== 0
    || !['mouse', 'pen'].includes(event.pointerType)) {
    return;
  }

  dragPointerId = event.pointerId;
  dragStartX = event.clientX;
  dragStartScrollLeft = scroller.value?.scrollLeft ?? 0;
}

/**
 * @param {PointerEvent} event
 * @returns {void}
 */
function handlePointerMove(event) {
  if (event.pointerId !== dragPointerId || !scroller.value) {
    return;
  }

  const distance = event.clientX - dragStartX;

  if (!isDragging.value && Math.abs(distance) <= 4) {
    return;
  }

  if (!isDragging.value) {
    isDragging.value = true;
    scroller.value.setPointerCapture?.(event.pointerId);
  }

  event.preventDefault();
  scroller.value.scrollLeft = dragStartScrollLeft - distance;
}

/**
 * @param {PointerEvent} event
 * @returns {void}
 */
function handlePointerUp(event) {
  if (event.pointerId !== dragPointerId) {
    return;
  }

  if (isDragging.value) {
    suppressNextClick();
  }

  resetDrag(true);
}

/**
 * @param {PointerEvent} event
 * @returns {void}
 */
function handlePointerCancel(event) {
  if (event.pointerId === dragPointerId) {
    resetDrag(true);
  }
}

/**
 * @param {PointerEvent} event
 * @returns {void}
 */
function handleLostPointerCapture(event) {
  if (event.target !== scroller.value || event.pointerId !== dragPointerId) {
    return;
  }

  if (isDragging.value) {
    suppressNextClick();
  }

  resetDrag();
}

/**
 * @param {MouseEvent} event
 * @returns {void}
 */
function handleClickCapture(event) {
  if (!suppressClick) {
    return;
  }

  clearSuppressClick();
  event.preventDefault();
  event.stopImmediatePropagation();
}

function observeContent() {
  if (!resizeObserver || !scroller.value) {
    return;
  }

  resizeObserver.disconnect();
  resizeObserver.observe(scroller.value);
  Array.from(scroller.value.children).forEach((element) => {
    resizeObserver.observe(element);
  });
  scheduleSync(false);
}

/**
 * 获取组件拥有的原生滚动元素。
 *
 * @returns {HTMLElement | null}
 */
function getScroller() {
  return scroller.value;
}

/**
 * 滚动组件拥有的原生滚动元素。挂载前调用时不执行操作。
 *
 * @param {ScrollToOptions} options
 * @returns {void}
 */
function scrollTo(options) {
  scroller.value?.scrollTo(options);
}

watch(
  [normalizedOrientation, thresholds],
  async () => {
    await nextTick();
    scheduleSync(false);
  },
  { deep: true },
);
watch(canDragScroll, (enabled) => {
  if (!enabled) {
    resetDrag(true);
    clearSuppressClick();
  }
});

onMounted(() => {
  if (typeof ResizeObserver === 'function') {
    resizeObserver = new ResizeObserver(() => scheduleSync(false));
  }

  observeContent();
});

onUpdated(observeContent);

onBeforeUnmount(() => {
  if (frameId !== undefined) {
    cancelAnimationFrame(frameId);
  }

  resizeObserver?.disconnect();
  resetDrag(true);
  clearSuppressClick();
});

defineExpose({
  getScroller,
  scrollTo,
});
</script>

<template>
  <div
    v-bind="rootAttrs"
    class="mat-scroll-area"
    :class="`mat-scroll-area--${normalizedOrientation}`"
  >
    <div
      v-if="$slots['fixed-start']"
      class="mat-scroll-area__fixed"
    >
      <slot name="fixed-start" />
    </div>

    <div
      class="mat-scroll-area__viewport"
      :style="viewportStyle"
      :class="{
        'mat-scroll-area__viewport--start-overflow': hasStartOverflow,
        'mat-scroll-area__viewport--end-overflow': hasEndOverflow,
      }"
    >
      <div
        ref="scroller"
        v-bind="scrollerAttrs"
        class="mat-scroll-area__scroller"
        :style="scrollerStyle"
        :class="[
          `mat-scroll-area__scroller--bar-${propsWithDefaults.barWidth}`,
          {
            'mat-scroll-area__scroller--dragging': isDragging,
            'mat-scroll-area__scroller--start-overflow': hasStartOverflow,
            'mat-scroll-area__scroller--end-overflow': hasEndOverflow,
          },
        ]"
        @click.capture="handleClickCapture"
        @lostpointercapture="handleLostPointerCapture"
        @pointercancel="handlePointerCancel"
        @pointerdown="handlePointerDown"
        @pointermove="handlePointerMove"
        @pointerup="handlePointerUp"
        @scroll="handleScroll"
      >
        <slot />
      </div>
    </div>

    <div
      v-if="$slots['fixed-end']"
      class="mat-scroll-area__fixed"
    >
      <slot name="fixed-end" />
    </div>
  </div>
</template>

<style scoped>
.mat-scroll-area {
  display: flex;
  box-sizing: border-box;
  min-inline-size: 0;
  min-block-size: 0;
}

.mat-scroll-area--vertical {
  flex-direction: column;
}

.mat-scroll-area--horizontal {
  flex-direction: row;
}

.mat-scroll-area__fixed {
  flex-shrink: 0;
}

.mat-scroll-area__viewport {
  --mat-scroll-area-scrollbar-space: 16px;
  flex-grow: 1;
  min-inline-size: 0;
  min-block-size: 0;
}

.mat-scroll-area__scroller {
  block-size: 100%;
  inline-size: 100%;
  flex-grow: 1;
  box-sizing: border-box;
  min-inline-size: 0;
  min-block-size: 0;
  scrollbar-color: var(--mat-sys-color-outline) transparent;
}

.mat-scroll-area__scroller--dragging { user-select: none; }

.mat-scroll-area--vertical .mat-scroll-area__scroller {
  overflow: hidden auto;
  mask-image: var(--mat-scroll-area-content-mask, linear-gradient(black, black)), linear-gradient(to right, transparent 0 calc(100% - var(--mat-scroll-area-scrollbar-space)), black calc(100% - var(--mat-scroll-area-scrollbar-space)) 100%);
  mask-composite: add;
}

.mat-scroll-area--horizontal .mat-scroll-area__scroller {
  overflow: hidden;
  overflow-x: auto;
  mask-image: var(--mat-scroll-area-content-mask, linear-gradient(black, black)), linear-gradient(to bottom, transparent 0 calc(100% - var(--mat-scroll-area-scrollbar-space)), black calc(100% - var(--mat-scroll-area-scrollbar-space)) 100%);
  mask-composite: add;
}

.mat-scroll-area__scroller--bar-default {
  scrollbar-width: auto;
}

.mat-scroll-area__scroller--bar-thin {
  scrollbar-width: thin;
}

.mat-scroll-area__scroller--bar-hidden {
  scrollbar-width: none;
}

.mat-scroll-area--vertical .mat-scroll-area__scroller--start-overflow {
  --mat-scroll-area-content-mask: linear-gradient(to bottom, black 0 var(--mat-scroll-area-shadow-offset-start), transparent var(--mat-scroll-area-shadow-offset-start), black calc(var(--mat-scroll-area-shadow-offset-start) + var(--mat-scroll-area-shadow-length-start)) 100%);
}

.mat-scroll-area--vertical .mat-scroll-area__scroller--end-overflow {
  --mat-scroll-area-content-mask: linear-gradient(to bottom, black 0 calc(100% - var(--mat-scroll-area-shadow-offset-end) - var(--mat-scroll-area-shadow-length-end)), transparent calc(100% - var(--mat-scroll-area-shadow-offset-end)), black calc(100% - var(--mat-scroll-area-shadow-offset-end)) 100%);
}

.mat-scroll-area--vertical .mat-scroll-area__scroller--start-overflow.mat-scroll-area__scroller--end-overflow {
  --mat-scroll-area-content-mask: linear-gradient(to bottom, black 0 var(--mat-scroll-area-shadow-offset-start), transparent var(--mat-scroll-area-shadow-offset-start), black calc(var(--mat-scroll-area-shadow-offset-start) + var(--mat-scroll-area-shadow-length-start)) calc(100% - var(--mat-scroll-area-shadow-offset-end) - var(--mat-scroll-area-shadow-length-end)), transparent calc(100% - var(--mat-scroll-area-shadow-offset-end)), black calc(100% - var(--mat-scroll-area-shadow-offset-end)) 100%);
}

.mat-scroll-area--horizontal .mat-scroll-area__scroller--start-overflow {
  --mat-scroll-area-content-mask: linear-gradient(to right, black 0 var(--mat-scroll-area-shadow-offset-start), transparent var(--mat-scroll-area-shadow-offset-start), black calc(var(--mat-scroll-area-shadow-offset-start) + var(--mat-scroll-area-shadow-length-start)) 100%);
}

.mat-scroll-area--horizontal .mat-scroll-area__scroller--end-overflow {
  --mat-scroll-area-content-mask: linear-gradient(to right, black 0 calc(100% - var(--mat-scroll-area-shadow-offset-end) - var(--mat-scroll-area-shadow-length-end)), transparent calc(100% - var(--mat-scroll-area-shadow-offset-end)), black calc(100% - var(--mat-scroll-area-shadow-offset-end)) 100%);
}

.mat-scroll-area--horizontal .mat-scroll-area__scroller--start-overflow.mat-scroll-area__scroller--end-overflow {
  --mat-scroll-area-content-mask: linear-gradient(to right, black 0 var(--mat-scroll-area-shadow-offset-start), transparent var(--mat-scroll-area-shadow-offset-start), black calc(var(--mat-scroll-area-shadow-offset-start) + var(--mat-scroll-area-shadow-length-start)) calc(100% - var(--mat-scroll-area-shadow-offset-end) - var(--mat-scroll-area-shadow-length-end)), transparent calc(100% - var(--mat-scroll-area-shadow-offset-end)), black calc(100% - var(--mat-scroll-area-shadow-offset-end)) 100%);
}

.mat-scroll-area__scroller::-webkit-scrollbar {
  background: transparent;
}

.mat-scroll-area__scroller--bar-thin::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.mat-scroll-area__scroller--bar-hidden::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.mat-scroll-area__scroller::-webkit-scrollbar-track,
.mat-scroll-area__scroller::-webkit-scrollbar-corner {
  background: transparent;
}

.mat-scroll-area__scroller::-webkit-scrollbar-thumb {
  background: var(--mat-sys-color-outline);
  border-radius: var(--mat-sys-shape-corner-full);
}
</style>
