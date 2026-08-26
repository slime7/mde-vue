import {
  computed,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  reactive,
  ref,
  unref,
  watch,
} from 'vue';
import { MAT_SCROLL_AREA_KEY } from '../scroll-area-context';
import { normalizeNumber } from '../value-utils';

/**
 * 虚拟滚动核心状态与联动计算组合式函数。
 *
 * @param {object} options
 * @param {import('vue').Ref<HTMLElement | null>} options.root 根容器引用
 * @param {object} options.props 包含 items, itemHeight, estimatedItemHeight, buffer, itemKey 的响应式 props 对象
 * @param {import('vue').Ref<boolean> | import('vue').ComputedRef<boolean> | boolean} [options.enabled=true] 是否启用虚拟滚动
 * @param {import('vue').Ref<boolean> | import('vue').ComputedRef<boolean> | boolean} [options.pinEdges=false] 是否将首尾项常驻渲染
 * @param {Function} [options.emit] 事件派发函数 (event, payload) => void
 * @returns {object}
 */
export default function useVirtualScroll({
  root,
  props,
  enabled = true,
  pinEdges = false,
  emit,
}) {
  const scrollContainerRef = ref(null);
  const injectedScrollArea = inject(MAT_SCROLL_AREA_KEY, null);

  const isEnabled = computed(() => Boolean(unref(enabled)));
  const isPinEdges = computed(() => Boolean(unref(pinEdges)));

  const parsedItemHeight = computed(() => (
    normalizeNumber(props.itemHeight, { positive: true, fallback: undefined })
  ));
  const isFixed = computed(() => parsedItemHeight.value !== undefined);

  const parsedEstimatedHeight = computed(() => (
    normalizeNumber(props.estimatedItemHeight, { positive: true, fallback: 48 })
  ));
  const parsedBuffer = computed(() => (
    normalizeNumber(props.buffer, { fallback: 3 })
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

      if (containerRect.height > 0 || rootRect.height > 0 || containerRect.top !== 0 || rootRect.top !== 0) {
        offsetInParent = rootRect.top - containerRect.top + scrollTop;
      } else {
        offsetInParent = element.offsetTop || 0;
      }
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
    if (isCalculating || !isEnabled.value) {
      return;
    }

    isCalculating = true;

    try {
      const itemsList = props.items || [];
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

        if (isPinEdges.value && totalCount >= 3) {
          const middleStart = Math.max(1, Math.min(totalCount - 2, start));
          const middleEnd = Math.max(middleStart, Math.min(totalCount - 1, end));

          topSpacer = Math.max(0, (middleStart - 1) * h);
          bottomSpacer = Math.max(0, ((totalCount - 1) - middleEnd) * h);
          start = middleStart;
          end = middleEnd;
        } else if (isPinEdges.value) {
          start = 0;
          end = totalCount;
          topSpacer = 0;
          bottomSpacer = 0;
        } else {
          topSpacer = start * h;
          bottomSpacer = Math.max(0, (totalCount - end) * h);
        }
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

        if (isPinEdges.value && totalCount >= 3) {
          const middleStart = Math.max(1, Math.min(totalCount - 2, start));
          const middleEnd = Math.max(middleStart, Math.min(totalCount - 1, end));

          topSpacer = Math.max(0, prefixSums[middleStart] - prefixSums[1]);
          bottomSpacer = Math.max(0, prefixSums[totalCount - 1] - prefixSums[middleEnd]);
          start = middleStart;
          end = middleEnd;
        } else if (isPinEdges.value) {
          start = 0;
          end = totalCount;
          topSpacer = 0;
          bottomSpacer = 0;
        } else {
          topSpacer = prefixSums[start];
          bottomSpacer = Math.max(0, totalHeight - prefixSums[end]);
        }
      }

      const prevStart = range.value.start;
      const prevEnd = range.value.end;

      range.value = { start, end };
      paddingTop.value = topSpacer;
      paddingBottom.value = bottomSpacer;

      if (start !== prevStart || end !== prevEnd) {
        emit?.('visible-range-change', { startIndex: start, endIndex: end });
      }

      emit?.('scroll', {
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
    if (typeof props.itemKey === 'function') {
      return props.itemKey(item, index);
    }

    if (typeof props.itemKey === 'string' && item && typeof item === 'object') {
      return item[props.itemKey] ?? index;
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
    const itemsList = props.items || [];
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
    const itemsList = props.items || [];
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

  /**
   * 绑定滚动与尺寸监听。
   *
   * @returns {void}
   */
  function setupListeners() {
    cleanupListeners();

    if (!isEnabled.value) {
      return;
    }

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

  watch(
    () => props.items,
    () => {
      calculate();
    },
    { deep: false },
  );

  watch(
    [parsedItemHeight, parsedEstimatedHeight, parsedBuffer, isEnabled],
    () => {
      setupListeners();
    },
  );

  onMounted(() => {
    setupListeners();
  });

  onUpdated(() => {
    if (isEnabled.value && !scrollContainerRef.value) {
      setupListeners();
    }
  });

  onBeforeUnmount(() => {
    cleanupListeners();
  });

  return {
    calculate,
    getItemHeight,
    getItemKey,
    getScroller,
    paddingBottom,
    paddingTop,
    range,
    refresh,
    scrollTo,
    scrollToIndex,
    setItemRef,
    visibleItems,
  };
}
