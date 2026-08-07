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
let frameId;
let resizeObserver;

const normalizedOrientation = computed(() => (
  ['horizontal', 'x', 'h'].includes(props.orientation) ? 'horizontal' : 'vertical'
));
const thresholds = computed(() => {
  if (typeof props.reachThreshold === 'number') {
    return {
      start: props.reachThreshold,
      end: props.reachThreshold,
    };
  }

  return {
    start: props.reachThreshold?.start ?? 0,
    end: props.reachThreshold?.end ?? 0,
  };
});
const shadowOffsets = computed(() => {
  if (typeof props.shadowOffset === 'number') {
    return {
      start: props.shadowOffset,
      end: props.shadowOffset,
    };
  }

  return {
    start: props.shadowOffset?.start ?? 0,
    end: props.shadowOffset?.end ?? 0,
  };
});
const rootAttrs = computed(() => ({
  class: attrs.class,
  style: attrs.style,
}));
const scrollerStyle = computed(() => {
  const isHorizontal = normalizedOrientation.value === 'horizontal';
  const padding = `${props.snapPadding}px`;

  return {
    '--mat-scroll-area-fade-offset-start': `${shadowOffsets.value.start}px`,
    '--mat-scroll-area-fade-offset-end': `${shadowOffsets.value.end}px`,
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
      ref="scroller"
      v-bind="scrollerAttrs"
      class="mat-scroll-area__scroller"
      :style="scrollerStyle"
      :class="{
        'mat-scroll-area__scroller--start-overflow': hasStartOverflow,
        'mat-scroll-area__scroller--end-overflow': hasEndOverflow,
      }"
      @scroll="handleScroll"
    >
      <slot />
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

.mat-scroll-area__scroller {
  --mat-scroll-area-fade-size: 16px;
  --mat-scroll-area-fade-offset-start: 0;
  --mat-scroll-area-fade-offset-end: 0;
  --mat-scroll-area-scrollbar-space: 16px;
  flex-grow: 1;
  box-sizing: border-box;
  min-inline-size: 0;
  min-block-size: 0;
  scrollbar-width: thin;
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

.mat-scroll-area--vertical .mat-scroll-area__scroller--start-overflow {
  --mat-scroll-area-content-mask: linear-gradient(to bottom, black 0 var(--mat-scroll-area-fade-offset-start), transparent var(--mat-scroll-area-fade-offset-start), black calc(var(--mat-scroll-area-fade-offset-start) + var(--mat-scroll-area-fade-size)) 100%);
}

.mat-scroll-area--vertical .mat-scroll-area__scroller--end-overflow {
  --mat-scroll-area-content-mask: linear-gradient(to bottom, black 0 calc(100% - var(--mat-scroll-area-fade-offset-end) - var(--mat-scroll-area-fade-size)), transparent calc(100% - var(--mat-scroll-area-fade-offset-end)), black calc(100% - var(--mat-scroll-area-fade-offset-end)) 100%);
}

.mat-scroll-area--vertical .mat-scroll-area__scroller--start-overflow.mat-scroll-area__scroller--end-overflow {
  --mat-scroll-area-content-mask: linear-gradient(to bottom, black 0 var(--mat-scroll-area-fade-offset-start), transparent var(--mat-scroll-area-fade-offset-start), black calc(var(--mat-scroll-area-fade-offset-start) + var(--mat-scroll-area-fade-size)) calc(100% - var(--mat-scroll-area-fade-offset-end) - var(--mat-scroll-area-fade-size)), transparent calc(100% - var(--mat-scroll-area-fade-offset-end)), black calc(100% - var(--mat-scroll-area-fade-offset-end)) 100%);
}

.mat-scroll-area--horizontal .mat-scroll-area__scroller--start-overflow {
  --mat-scroll-area-content-mask: linear-gradient(to right, black 0 var(--mat-scroll-area-fade-offset-start), transparent var(--mat-scroll-area-fade-offset-start), black calc(var(--mat-scroll-area-fade-offset-start) + var(--mat-scroll-area-fade-size)) 100%);
}

.mat-scroll-area--horizontal .mat-scroll-area__scroller--end-overflow {
  --mat-scroll-area-content-mask: linear-gradient(to right, black 0 calc(100% - var(--mat-scroll-area-fade-offset-end) - var(--mat-scroll-area-fade-size)), transparent calc(100% - var(--mat-scroll-area-fade-offset-end)), black calc(100% - var(--mat-scroll-area-fade-offset-end)) 100%);
}

.mat-scroll-area--horizontal .mat-scroll-area__scroller--start-overflow.mat-scroll-area__scroller--end-overflow {
  --mat-scroll-area-content-mask: linear-gradient(to right, black 0 var(--mat-scroll-area-fade-offset-start), transparent var(--mat-scroll-area-fade-offset-start), black calc(var(--mat-scroll-area-fade-offset-start) + var(--mat-scroll-area-fade-size)) calc(100% - var(--mat-scroll-area-fade-offset-end) - var(--mat-scroll-area-fade-size)), transparent calc(100% - var(--mat-scroll-area-fade-offset-end)), black calc(100% - var(--mat-scroll-area-fade-offset-end)) 100%);
}

.mat-scroll-area__scroller::-webkit-scrollbar {
  width: 4px;
  height: 4px;
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
