<script setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
  useAttrs,
  useId,
  watch,
} from 'vue';

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
    validator(value) {
      return Number.isFinite(value) && value >= 0;
    },
  },
  /**
   * 阴影的实现变体；`fade` 使用 mask 渐隐，`blur` 使用逐渐模糊的边缘覆盖层。
   *
   * @type {'fade' | 'blur'}
   * @default 'fade'
   */
  shadowVariant: {
    type: String,
    default: 'fade',
    validator(value) {
      return ['fade', 'blur'].includes(value);
    },
  },
  /**
   * 阴影从对应边缘向内延伸的像素数。数字同时用于两端，对象可分别设置 start、end。
   * 未设置时，`fade` 使用 16px，`blur` 使用 96px。
   *
   * @type {number | { start?: number, end?: number }}
   * @default 16 for fade, 96 for blur
   */
  shadowLength: {
    type: [Number, Object],
    default: undefined,
    validator(value) {
      if (value === undefined) {
        return true;
      }

      if (typeof value === 'number') {
        return Number.isFinite(value) && value >= 0;
      }

      if (!value || Array.isArray(value)) {
        return false;
      }

      return ['start', 'end'].every((name) => (
        value[name] === undefined
        || (typeof value[name] === 'number' && Number.isFinite(value[name]) && value[name] >= 0)
      ));
    },
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
   * 进入滚动边缘多少像素时触发事件。数字同时用于两端，对象可分别设置 start、end。
   *
   * @type {number | { start?: number, end?: number }}
   * @default 0
   */
  reachThreshold: {
    type: [Number, Object],
    default: 0,
    validator(value) {
      if (typeof value === 'number') {
        return Number.isFinite(value) && value >= 0;
      }

      if (!value || Array.isArray(value)) {
        return false;
      }

      return ['start', 'end'].every((name) => (
        value[name] === undefined
        || (typeof value[name] === 'number' && Number.isFinite(value[name]) && value[name] >= 0)
      ));
    },
  },
  /**
   * 边缘阴影带从对应边缘向内偏移的像素数。数字同时用于两端，对象可分别设置 start、end。
   * 偏移区内的内容不会被遮罩覆盖，适合放置不透明的 sticky 元素。
   *
   * @type {number | { start?: number, end?: number }}
   * @default 0
   */
  shadowOffset: {
    type: [Number, Object],
    default: 0,
    validator(value) {
      if (typeof value === 'number') {
        return Number.isFinite(value) && value >= 0;
      }

      if (!value || Array.isArray(value)) {
        return false;
      }

      return ['start', 'end'].every((name) => (
        value[name] === undefined
        || (typeof value[name] === 'number' && Number.isFinite(value[name]) && value[name] >= 0)
      ));
    },
  },
});

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
const wasWithinStart = ref(false);
const wasWithinEnd = ref(false);
const blurFilterId = `mat-scroll-area-blur-${useId().replace(/[^\w-]/g, '-')}`;
let frameId;
let resizeObserver;

/**
 * 将可同时设置两端的数值解析为完整的起始端和末端值。
 *
 * @param {number | { start?: number, end?: number } | undefined} value
 * @param {number} fallback
 * @returns {{ start: number, end: number }}
 */
function resolveEdgeValues(value, fallback) {
  if (typeof value === 'number') {
    return {
      start: value,
      end: value,
    };
  }

  return {
    start: value?.start ?? fallback,
    end: value?.end ?? fallback,
  };
}

const normalizedOrientation = computed(() => (
  ['horizontal', 'x', 'h'].includes(props.orientation) ? 'horizontal' : 'vertical'
));
const thresholds = computed(() => {
  return resolveEdgeValues(props.reachThreshold, 0);
});
const shadowOffsets = computed(() => {
  return resolveEdgeValues(props.shadowOffset, 0);
});
const shadowLengths = computed(() => resolveEdgeValues(
  props.shadowLength,
  props.shadowVariant === 'blur' ? 96 : 16,
));
const scrollbarSpace = computed(() => (props.barWidth === 'hidden' ? 0 : 16));
const viewportStyle = computed(() => ({
  '--mat-scroll-area-shadow-length-start': `${shadowLengths.value.start}px`,
  '--mat-scroll-area-shadow-length-end': `${shadowLengths.value.end}px`,
  '--mat-scroll-area-shadow-offset-start': `${shadowOffsets.value.start}px`,
  '--mat-scroll-area-shadow-offset-end': `${shadowOffsets.value.end}px`,
  '--mat-scroll-area-scrollbar-space': `${scrollbarSpace.value}px`,
  '--mat-scroll-area-blur-filter': `url(#${blurFilterId})`,
  '--mat-scroll-area-blur-radius-start': `${shadowLengths.value.start * 3}px`,
  '--mat-scroll-area-blur-radius-end': `${shadowLengths.value.end * 3}px`,
}));
const rootAttrs = computed(() => ({
  class: attrs.class,
  style: attrs.style,
}));
const scrollerStyle = computed(() => {
  const isHorizontal = normalizedOrientation.value === 'horizontal';
  const padding = `${props.snapPadding}px`;

  return {
    scrollPaddingBottom: isHorizontal ? undefined : padding,
    scrollPaddingLeft: isHorizontal ? padding : undefined,
    scrollPaddingRight: isHorizontal ? padding : undefined,
    scrollPaddingTop: isHorizontal ? undefined : padding,
    scrollSnapType: props.snap === 'none'
      ? 'none'
      : `${isHorizontal ? 'x' : 'y'} ${props.snap}`,
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
      :class="[
        `mat-scroll-area__viewport--${props.shadowVariant}`,
        {
          'mat-scroll-area__viewport--start-overflow': hasStartOverflow,
          'mat-scroll-area__viewport--end-overflow': hasEndOverflow,
        },
      ]"
    >
      <svg
        class="mat-scroll-area__filter-definitions"
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter
            :id="blurFilterId"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            color-interpolation-filters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.025"
              numOctaves="2"
              seed="7"
              result="mat-scroll-area-noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="mat-scroll-area-noise"
              scale="4"
              xChannelSelector="R"
              yChannelSelector="G"
              result="mat-scroll-area-displaced"
            />
            <feGaussianBlur
              in="mat-scroll-area-displaced"
              stdDeviation="2.5"
            />
          </filter>
        </defs>
      </svg>

      <div
        ref="scroller"
        v-bind="scrollerAttrs"
        class="mat-scroll-area__scroller"
        :style="scrollerStyle"
        :class="[
          `mat-scroll-area__scroller--bar-${props.barWidth}`,
          {
            'mat-scroll-area__scroller--start-overflow': hasStartOverflow,
            'mat-scroll-area__scroller--end-overflow': hasEndOverflow,
          },
        ]"
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
  position: relative;
  flex-grow: 1;
  min-inline-size: 0;
  min-block-size: 0;
}

.mat-scroll-area__filter-definitions {
  position: absolute;
  inline-size: 0;
  block-size: 0;
  overflow: hidden;
  pointer-events: none;
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

.mat-scroll-area--vertical .mat-scroll-area__viewport--fade .mat-scroll-area__scroller--start-overflow {
  --mat-scroll-area-content-mask: linear-gradient(to bottom, black 0 var(--mat-scroll-area-shadow-offset-start), transparent var(--mat-scroll-area-shadow-offset-start), black calc(var(--mat-scroll-area-shadow-offset-start) + var(--mat-scroll-area-shadow-length-start)) 100%);
}

.mat-scroll-area--vertical .mat-scroll-area__viewport--fade .mat-scroll-area__scroller--end-overflow {
  --mat-scroll-area-content-mask: linear-gradient(to bottom, black 0 calc(100% - var(--mat-scroll-area-shadow-offset-end) - var(--mat-scroll-area-shadow-length-end)), transparent calc(100% - var(--mat-scroll-area-shadow-offset-end)), black calc(100% - var(--mat-scroll-area-shadow-offset-end)) 100%);
}

.mat-scroll-area--vertical .mat-scroll-area__viewport--fade .mat-scroll-area__scroller--start-overflow.mat-scroll-area__scroller--end-overflow {
  --mat-scroll-area-content-mask: linear-gradient(to bottom, black 0 var(--mat-scroll-area-shadow-offset-start), transparent var(--mat-scroll-area-shadow-offset-start), black calc(var(--mat-scroll-area-shadow-offset-start) + var(--mat-scroll-area-shadow-length-start)) calc(100% - var(--mat-scroll-area-shadow-offset-end) - var(--mat-scroll-area-shadow-length-end)), transparent calc(100% - var(--mat-scroll-area-shadow-offset-end)), black calc(100% - var(--mat-scroll-area-shadow-offset-end)) 100%);
}

.mat-scroll-area--horizontal .mat-scroll-area__viewport--fade .mat-scroll-area__scroller--start-overflow {
  --mat-scroll-area-content-mask: linear-gradient(to right, black 0 var(--mat-scroll-area-shadow-offset-start), transparent var(--mat-scroll-area-shadow-offset-start), black calc(var(--mat-scroll-area-shadow-offset-start) + var(--mat-scroll-area-shadow-length-start)) 100%);
}

.mat-scroll-area--horizontal .mat-scroll-area__viewport--fade .mat-scroll-area__scroller--end-overflow {
  --mat-scroll-area-content-mask: linear-gradient(to right, black 0 calc(100% - var(--mat-scroll-area-shadow-offset-end) - var(--mat-scroll-area-shadow-length-end)), transparent calc(100% - var(--mat-scroll-area-shadow-offset-end)), black calc(100% - var(--mat-scroll-area-shadow-offset-end)) 100%);
}

.mat-scroll-area--horizontal .mat-scroll-area__viewport--fade .mat-scroll-area__scroller--start-overflow.mat-scroll-area__scroller--end-overflow {
  --mat-scroll-area-content-mask: linear-gradient(to right, black 0 var(--mat-scroll-area-shadow-offset-start), transparent var(--mat-scroll-area-shadow-offset-start), black calc(var(--mat-scroll-area-shadow-offset-start) + var(--mat-scroll-area-shadow-length-start)) calc(100% - var(--mat-scroll-area-shadow-offset-end) - var(--mat-scroll-area-shadow-length-end)), transparent calc(100% - var(--mat-scroll-area-shadow-offset-end)), black calc(100% - var(--mat-scroll-area-shadow-offset-end)) 100%);
}

.mat-scroll-area__viewport--blur::before,
.mat-scroll-area__viewport--blur::after {
  position: absolute;
  z-index: 1;
  display: none;
  box-sizing: border-box;
  content: '';
  pointer-events: none;
  background: rgb(255 255 255 / .1%);
  backdrop-filter: var(--mat-scroll-area-blur-filter) blur(var(--mat-scroll-area-blur-radius-start));
}

.mat-scroll-area__viewport--blur.mat-scroll-area__viewport--start-overflow::before {
  display: block;
}

.mat-scroll-area__viewport--blur.mat-scroll-area__viewport--end-overflow::after {
  display: block;
  backdrop-filter: var(--mat-scroll-area-blur-filter) blur(var(--mat-scroll-area-blur-radius-end));
}

.mat-scroll-area--vertical .mat-scroll-area__viewport--blur::before,
.mat-scroll-area--vertical .mat-scroll-area__viewport--blur::after {
  inset-inline: 0 var(--mat-scroll-area-scrollbar-space);
  block-size: var(--mat-scroll-area-shadow-length-start);
}

.mat-scroll-area--vertical .mat-scroll-area__viewport--blur::before {
  inset-block-start: var(--mat-scroll-area-shadow-offset-start);
  mask-image: linear-gradient(to bottom, black, transparent);
}

.mat-scroll-area--vertical .mat-scroll-area__viewport--blur::after {
  inset-block-end: var(--mat-scroll-area-shadow-offset-end);
  block-size: var(--mat-scroll-area-shadow-length-end);
  mask-image: linear-gradient(to top, black, transparent);
}

.mat-scroll-area--horizontal .mat-scroll-area__viewport--blur::before,
.mat-scroll-area--horizontal .mat-scroll-area__viewport--blur::after {
  inset-block: 0 var(--mat-scroll-area-scrollbar-space);
  inline-size: var(--mat-scroll-area-shadow-length-start);
}

.mat-scroll-area--horizontal .mat-scroll-area__viewport--blur::before {
  inset-inline-start: var(--mat-scroll-area-shadow-offset-start);
  mask-image: linear-gradient(to right, black, transparent);
}

.mat-scroll-area--horizontal .mat-scroll-area__viewport--blur::after {
  inset-inline-end: var(--mat-scroll-area-shadow-offset-end);
  inline-size: var(--mat-scroll-area-shadow-length-end);
  mask-image: linear-gradient(to left, black, transparent);
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
