<script setup>
import {
  computed,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  reactive,
  ref,
  watch,
} from 'vue';
import { isHtmlTagName } from '../icon-props';
import { MAT_SCROLL_AREA_KEY } from '../scroll-area-context';
import { useMatProps } from '../use-mat-props';
import { isValidCssLength, normalizeNumber } from '../value-utils';

defineOptions({
  name: 'MatVirtualScroll',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 待虚拟滚动的全量数据列表。
   *
   * @type {Array<unknown>}
   * @default []
   */
  items: {
    type: Array,
    default: () => [],
  },
  /**
   * 固定的单项高度（单位 px）；仅支持可转换为数字的数值或纯数字字符串。
   * 传入时跳过动态尺寸计算与 ResizeObserver 监听。
   *
   * @type {number | string | undefined}
   * @default undefined
   */
  itemHeight: {
    type: [Number, String],
    default: undefined,
    validator: (value) => isValidCssLength(value, { positive: true }),
  },
  /**
   * 动态高度模式下的初始预估单项高度（单位 px）。
   *
   * @type {number | string}
   * @default 48
   */
  estimatedItemHeight: {
    type: [Number, String],
    default: 48,
    validator: (value) => isValidCssLength(value, { positive: true, allowUndefined: false }),
  },
  /**
   * 视口上下方额外预渲染的缓冲项数量。
   *
   * @type {number | string}
   * @default 3
   */
  buffer: {
    type: [Number, String],
    default: 3,
    validator: (value) => isValidCssLength(value, { allowUndefined: false }),
  },
  /**
   * 用于提取 item 唯一 key 的函数或属性名；未设置时默认使用项的索引 index。
   *
   * @type {Function | string | undefined}
   * @default undefined
   */
  itemKey: {
    type: [Function, String],
    default: undefined,
  },
  /**
   * 根容器渲染的 HTML 标签名。
   *
   * @type {string}
   * @default 'div'
   */
  as: {
    type: String,
    default: 'div',
    validator: isHtmlTagName,
  },
});

const propsWithDefaults = useMatProps('virtualScroll', props);

const emit = defineEmits({
  /**
   * 滚动时触发，载荷包含当前滚动位置与渲染区间。
   *
   * @type {{ scrollTop: number, scrollHeight: number, clientHeight: number, startIndex: number, endIndex: number }}
   */
  scroll: (payload) => (
    typeof payload?.scrollTop === 'number'
    && typeof payload?.startIndex === 'number'
    && typeof payload?.endIndex === 'number'
  ),
  /**
   * 可见索引区间变化时触发。
   *
   * @type {{ startIndex: number, endIndex: number }}
   */
  'visible-range-change': (payload) => (
    typeof payload?.startIndex === 'number'
    && typeof payload?.endIndex === 'number'
  ),
});

const root = ref(null);
const scrollContainerRef = ref(null);
const injectedScrollArea = inject(MAT_SCROLL_AREA_KEY, null);

const parsedItemHeight = computed(() => (
  normalizeNumber(propsWithDefaults.itemHeight, { positive: true, fallback: undefined })
));
const isFixed = computed(() => parsedItemHeight.value !== undefined);

const parsedEstimatedHeight = computed(() => (
  normalizeNumber(propsWithDefaults.estimatedItemHeight, { positive: true, fallback: 48 })
));
const parsedBuffer = computed(() => (
  normalizeNumber(propsWithDefaults.buffer, { fallback: 3 })
));

const dynamicHeights = reactive(new Map());
const elementToIndexMap = new Map();
const indexToElementMap = new Map();

const range = ref({ start: 0, end: 0 });
const paddingTop = ref(0);
const paddingBottom = ref(0);

let itemResizeObserver;
let containerResizeObserver;
let scrollListenerTarget;
let isCalculating = false;

/**
 * 获取指定索引项的高度（动态模式或固定模式）。
 *
 * @param {number} index
 * @returns {number}
 */
function getItemHeight(index) {
  if (isFixed.value) {
    return parsedItemHeight.value;
  }

  return dynamicHeights.get(index) ?? parsedEstimatedHeight.value;
}

/**
 * 查找当前组件的有效滚动父容器。
 *
 * @returns {HTMLElement | Window | null}
 */
function findScrollParent() {
  if (injectedScrollArea?.getScroller?.()) {
    const scroller = injectedScrollArea.getScroller();

    if (scroller) {
      return scroller;
    }
  }

  const element = root.value;

  if (!element) {
    return null;
  }

  const nearestScrollArea = element.closest('.mat-scroll-area__viewport')
    || element.closest('.mat-scroll-area')?.querySelector('.mat-scroll-area__viewport');

  if (nearestScrollArea) {
    return nearestScrollArea;
  }

  let parent = element.parentElement;

  while (parent && parent !== document.body && parent !== document.documentElement) {
    const style = getComputedStyle(parent);
    const overflowY = style.overflowY || style.overflow;

    if (['auto', 'scroll', 'overlay'].includes(overflowY)) {
      return parent;
    }

    parent = parent.parentElement;
  }

  return window;
}

/**
 * 计算滚动容器当前视口尺寸与相对滚动位置。
 *
 * @returns {{ scrollTop: number, viewportHeight: number, scrollHeight: number, offsetInParent: number }}
 */
function getScrollInfo() {
  const container = scrollContainerRef.value;
  const element = root.value;

  if (!container || !element) {
    return {
      scrollTop: 0, viewportHeight: 0, scrollHeight: 0, offsetInParent: 0,
    };
  }

  if (container === window) {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const viewportHeight = window.innerHeight || 0;
    const scrollHeight = document.documentElement.scrollHeight || 0;
    const rootRect = element.getBoundingClientRect();
    const offsetInParent = rootRect.top + scrollTop;

    return {
      scrollTop, viewportHeight, scrollHeight, offsetInParent,
    };
  }

  const scrollTop = container.scrollTop || 0;
  const viewportHeight = container.clientHeight || 0;
  const scrollHeight = container.scrollHeight || 0;

  let offsetInParent = 0;

  try {
    const containerRect = container.getBoundingClientRect();
    const rootRect = element.getBoundingClientRect();

    offsetInParent = rootRect.top - containerRect.top + scrollTop;
  } catch {
    offsetInParent = element.offsetTop || 0;
  }

  return {
    scrollTop, viewportHeight, scrollHeight, offsetInParent,
  };
}

/**
 * 计算虚拟滚动区间和上下 spacer 尺寸。
 *
 * @returns {void}
 */
function calculate() {
  if (isCalculating) {
    return;
  }

  isCalculating = true;

  try {
    const itemsList = propsWithDefaults.items || [];
    const totalCount = itemsList.length;

    if (totalCount === 0) {
      range.value = { start: 0, end: 0 };
      paddingTop.value = 0;
      paddingBottom.value = 0;
      return;
    }

    const {
      scrollTop, viewportHeight, scrollHeight, offsetInParent,
    } = getScrollInfo();
    const relativeScrollTop = Math.max(0, scrollTop - offsetInParent);
    const effectiveViewport = viewportHeight || 300;
    const buffer = parsedBuffer.value;

    let start = 0;
    let end = 0;
    let topSpacer = 0;
    let bottomSpacer = 0;

    if (isFixed.value) {
      const h = parsedItemHeight.value;

      start = Math.max(0, Math.floor(relativeScrollTop / h) - buffer);
      end = Math.min(totalCount, Math.ceil((relativeScrollTop + effectiveViewport) / h) + buffer);
      topSpacer = start * h;
      bottomSpacer = Math.max(0, (totalCount - end) * h);
    } else {
      const prefixSums = new Array(totalCount + 1);

      prefixSums[0] = 0;
      for (let i = 0; i < totalCount; i += 1) {
        prefixSums[i + 1] = prefixSums[i] + getItemHeight(i);
      }

      const totalHeight = prefixSums[totalCount];
      const targetStart = relativeScrollTop;
      const targetEnd = relativeScrollTop + effectiveViewport;

      let rawStart = 0;
      let rawEnd = totalCount;

      let low = 0;
      let high = totalCount - 1;

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        if (prefixSums[mid + 1] > targetStart) {
          rawStart = mid;
          high = mid - 1;
        } else {
          low = mid + 1;
        }
      }

      low = rawStart;
      high = totalCount - 1;

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        if (prefixSums[mid] < targetEnd) {
          rawEnd = mid + 1;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      start = Math.max(0, rawStart - buffer);
      end = Math.min(totalCount, rawEnd + buffer);
      topSpacer = prefixSums[start];
      bottomSpacer = Math.max(0, totalHeight - prefixSums[end]);
    }

    const prevStart = range.value.start;
    const prevEnd = range.value.end;

    range.value = { start, end };
    paddingTop.value = topSpacer;
    paddingBottom.value = bottomSpacer;

    if (start !== prevStart || end !== prevEnd) {
      emit('visible-range-change', { startIndex: start, endIndex: end });
    }

    emit('scroll', {
      scrollTop,
      scrollHeight,
      clientHeight: effectiveViewport,
      startIndex: start,
      endIndex: end,
    });
  } finally {
    isCalculating = false;
  }
}

/**
 * 供外部调用刷新。
 *
 * @returns {Promise<void>}
 */
async function refresh() {
  await nextTick();
  calculate();
}

/**
 * 获取用于 v-for 渲染的 key。
 *
 * @param {unknown} item
 * @param {number} index
 * @returns {string | number}
 */
function getItemKey(item, index) {
  if (typeof propsWithDefaults.itemKey === 'function') {
    return propsWithDefaults.itemKey(item, index);
  }

  if (typeof propsWithDefaults.itemKey === 'string' && item && typeof item === 'object') {
    return item[propsWithDefaults.itemKey] ?? index;
  }

  return index;
}

/**
 * 供 Slot 中注册真实 item DOM 的 ref 回调。
 *
 * @param {number} index
 * @param {HTMLElement | null} el
 * @returns {void}
 */
function setItemRef(index, el) {
  if (isFixed.value || !itemResizeObserver) {
    return;
  }

  const prevEl = indexToElementMap.get(index);

  if (prevEl && prevEl !== el) {
    itemResizeObserver.unobserve(prevEl);
    elementToIndexMap.delete(prevEl);
    indexToElementMap.delete(index);
  }

  if (el && el instanceof HTMLElement) {
    elementToIndexMap.set(el, index);
    indexToElementMap.set(index, el);
    itemResizeObserver.observe(el);
  }
}

/**
 * 滚动到指定索引。
 *
 * @param {number} index
 * @param {{ align?: 'start' | 'center' | 'end' | 'auto', behavior?: ScrollBehavior }} [options]
 * @returns {void}
 */
function scrollToIndex(index, options = {}) {
  const itemsList = propsWithDefaults.items || [];
  const totalCount = itemsList.length;

  if (index < 0 || index >= totalCount) {
    return;
  }

  const container = scrollContainerRef.value;

  if (!container) {
    return;
  }

  const { offsetInParent, viewportHeight, scrollTop } = getScrollInfo();
  const { align = 'auto', behavior = 'auto' } = options;

  let itemTop = 0;
  let currentItemHeight = 0;

  if (isFixed.value) {
    currentItemHeight = parsedItemHeight.value;
    itemTop = index * currentItemHeight;
  } else {
    let sum = 0;

    for (let i = 0; i < index; i += 1) {
      sum += getItemHeight(i);
    }

    itemTop = sum;
    currentItemHeight = getItemHeight(index);
  }

  const absoluteItemTop = itemTop + offsetInParent;
  let targetScrollTop = scrollTop;

  if (align === 'start') {
    targetScrollTop = absoluteItemTop;
  } else if (align === 'end') {
    targetScrollTop = absoluteItemTop + currentItemHeight - viewportHeight;
  } else if (align === 'center') {
    targetScrollTop = absoluteItemTop + (currentItemHeight / 2) - (viewportHeight / 2);
  } else if (absoluteItemTop < scrollTop) {
    targetScrollTop = absoluteItemTop;
  } else if (absoluteItemTop + currentItemHeight > scrollTop + viewportHeight) {
    targetScrollTop = absoluteItemTop + currentItemHeight - viewportHeight;
  }

  if (container === window) {
    window.scrollTo({ top: Math.max(0, targetScrollTop), behavior });
  } else {
    container.scrollTo({ top: Math.max(0, targetScrollTop), behavior });
  }
}

/**
 * 滚动容器原生 scrollTo 方法调用代理。
 *
 * @param {ScrollToOptions} options
 * @returns {void}
 */
function scrollTo(options) {
  const container = scrollContainerRef.value;

  if (!container) {
    return;
  }

  container.scrollTo(options);
}

/**
 * 获取关联的滚动容器 DOM 元素（或 window）。
 *
 * @returns {HTMLElement | Window | null}
 */
function getScroller() {
  return scrollContainerRef.value;
}

const visibleItems = computed(() => {
  const itemsList = propsWithDefaults.items || [];
  const { start, end } = range.value;
  const result = [];

  for (let i = start; i < end && i < itemsList.length; i += 1) {
    result.push({
      index: i,
      item: itemsList[i],
    });
  }

  return result;
});

/**
 * 绑定滚动与尺寸监听。
 *
 * @returns {void}
 */
function setupListeners() {
  cleanupListeners();

  const container = findScrollParent();

  scrollContainerRef.value = container;

  if (!container) {
    return;
  }

  scrollListenerTarget = container;
  scrollListenerTarget.addEventListener('scroll', calculate, { passive: true });

  if (typeof ResizeObserver === 'function') {
    if (container !== window) {
      containerResizeObserver = new ResizeObserver(() => {
        calculate();
      });
      containerResizeObserver.observe(container);
    } else {
      window.addEventListener('resize', calculate, { passive: true });
    }

    if (!isFixed.value) {
      itemResizeObserver = new ResizeObserver((entries) => {
        let changed = false;

        entries.forEach((entry) => {
          const index = elementToIndexMap.get(entry.target);

          if (index !== undefined) {
            const height = entry.borderBoxSize?.[0]?.blockSize
              ?? entry.contentRect?.height
              ?? entry.target.getBoundingClientRect().height;

            if (height > 0 && dynamicHeights.get(index) !== height) {
              dynamicHeights.set(index, height);
              changed = true;
            }
          }
        });

        if (changed) {
          calculate();
        }
      });
    }
  }

  calculate();
}

/**
 * 清理监听器与观察器。
 *
 * @returns {void}
 */
function cleanupListeners() {
  if (scrollListenerTarget) {
    scrollListenerTarget.removeEventListener('scroll', calculate);
    scrollListenerTarget = null;
  }

  if (scrollContainerRef.value === window) {
    window.removeEventListener('resize', calculate);
  }

  containerResizeObserver?.disconnect();
  containerResizeObserver = null;

  itemResizeObserver?.disconnect();
  itemResizeObserver = null;
  elementToIndexMap.clear();
  indexToElementMap.clear();
}

watch(
  () => propsWithDefaults.items,
  () => {
    calculate();
  },
  { deep: false },
);

watch(
  [parsedItemHeight, parsedEstimatedHeight, parsedBuffer],
  () => {
    setupListeners();
  },
);

onMounted(() => {
  setupListeners();
});

onUpdated(() => {
  if (!scrollContainerRef.value) {
    setupListeners();
  }
});

onBeforeUnmount(() => {
  cleanupListeners();
});

defineExpose({
  calculate,
  getScroller,
  refresh,
  scrollTo,
  scrollToIndex,
});
</script>

<template>
  <component
    :is="propsWithDefaults.as"
    ref="root"
    class="mat-virtual-scroll"
  >
    <div
      class="mat-virtual-scroll__spacer"
      :style="{ height: `${paddingTop}px` }"
      aria-hidden="true"
    />

    <template
      v-for="itemRecord in visibleItems"
      :key="getItemKey(itemRecord.item, itemRecord.index)"
    >
      <slot
        :item="itemRecord.item"
        :index="itemRecord.index"
        :item-ref="(el) => setItemRef(itemRecord.index, el)"
      />
    </template>

    <div
      class="mat-virtual-scroll__spacer"
      :style="{ height: `${paddingBottom}px` }"
      aria-hidden="true"
    />
  </component>
</template>

<style scoped>
@layer mde.components {
  .mat-virtual-scroll {
    box-sizing: border-box;
    display: block;
    inline-size: 100%;
    position: relative;
  }

  .mat-virtual-scroll__spacer {
    box-sizing: border-box;
    inline-size: 100%;
    pointer-events: none;
  }
}
</style>
