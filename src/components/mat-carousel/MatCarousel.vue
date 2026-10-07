<script setup>
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  useAttrs,
  watch,
} from 'vue';
import { useMatProps } from '../use-mat-props';
import { provideCarouselContext } from './carousel-context';
import { isCarouselVariant } from './carousel-variants';

const SMALL_ITEM_WIDTH = 56;
const EDGE_PADDING = 16;
const ITEM_GAP = 8;
const DRAG_THRESHOLD = 8;
const WHEEL_SETTLE_DELAY = 140;
/* 宽屏下默认目标宽度上限。 */
const DEFAULT_TARGET_MAX = 560;

defineOptions({
  name: 'MatCarousel',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * Material 3 Expressive 轮播布局；可选值为 `multi-browse`、`uncontained`、
   * `uncontained-multi-aspect`、`hero`、`hero-center-aligned`、`full-screen`。
   * full-screen 沿块轴整幅铺满并纵向滑动，其余布局沿行轴横向滑动。
   *
   * @type {string}
   * @default 'multi-browse'
   */
  variant: {
    type: String,
    default: 'multi-browse',
    validator: isCarouselVariant,
  },
  /**
   * 点击未展开的项目时是否滚动并切换至该项目。
   * 为 `true` 时点击未展开项目触发滚动停靠；默认为 `false`，仅保留卡片自身的点击事件。
   *
   * @type {boolean}
   * @default false
   */
  switchOnClick: {
    type: Boolean,
    default: false,
  },
});
const propsWithDefaults = useMatProps('carousel', props);

const attrs = useAttrs();
const scroller = ref(null);
/** @type {Array<{element: HTMLElement, getWidth: () => number | undefined}>} */
const itemEntries = [];
let naturalWidths = new WeakMap();
let resizeObserver;
let mutationObserver;
let dragPointerId;
let dragStartX;
let dragStartScroll;
let dragMoved;
/** @type {Array<{x: number, time: number}> | undefined} 拖拽速度采样，用于释放吸附衔接手势初速。 */
let dragSamples;
let wheelSettleTimer;
let settleFrame;
let currentMarkSignature = '';
/** 布局时更新的停靠槽距（大项宽 + 间距），键盘按一个停靠位滚动使用。 */
let currentSlotSpan = SMALL_ITEM_WIDTH + ITEM_GAP;
const snapMarks = ref([]);

const isVertical = computed(() => propsWithDefaults.variant === 'full-screen');
const isDynamicWidth = computed(() => [
  'multi-browse',
  'hero',
  'hero-center-aligned',
].includes(propsWithDefaults.variant));
const scrollerLabel = computed(() => {
  const label = attrs['aria-label'];

  return typeof label === 'string' && label.length > 0 ? label : undefined;
});

provideCarouselContext({
  /**
   * @param {{element: HTMLElement, getWidth: () => number | undefined}} entry
   */
  registerItem(entry) {
    itemEntries.push(entry);
    scheduleUpdate();
  },
  /**
   * @param {{element: HTMLElement, getWidth: () => number | undefined}} entry
   */
  unregisterItem(entry) {
    const index = itemEntries.indexOf(entry);

    if (index >= 0) {
      itemEntries.splice(index, 1);
    }
    scheduleUpdate();
  },
});

/**
 * @param {HTMLElement} scrollerEl
 * @returns {number}
 */
function resolveContentLength(scrollerEl) {
  const rect = scrollerEl.getBoundingClientRect();
  const trailingPadding = isDynamicWidth.value ? EDGE_PADDING : 0;

  return Math.max(rect.width - EDGE_PADDING - trailingPadding, 0);
}

/**
 * @param {string} variant
 * @param {number} contentLength
 * @returns {number}
 */
function resolveDefaultTargetWidth(variant, contentLength) {
  let width;
  let capped = true;

  if (variant === 'multi-browse') {
    width = contentLength / 2;
  } else if (variant === 'hero' || variant === 'hero-center-aligned') {
    capped = false;
    const isCentered = variant === 'hero-center-aligned';
    const largeCount = contentLength >= 1400 ? 3 : contentLength >= 840 ? 2 : 1;
    if (largeCount === 1) {
      width = contentLength - (SMALL_ITEM_WIDTH + ITEM_GAP) * 2;
    } else {
      const smallCount = isCentered ? 2 : 1;
      const totalGaps = largeCount + smallCount - 1;
      const available = contentLength - smallCount * SMALL_ITEM_WIDTH - totalGaps * ITEM_GAP;
      width = Math.max(available / largeCount, SMALL_ITEM_WIDTH);
    }
  } else {
    capped = false;
    width = contentLength - (SMALL_ITEM_WIDTH + ITEM_GAP);
  }

  return capped ? Math.min(Math.max(width, 0), DEFAULT_TARGET_MAX) : Math.max(width, 0);
}

/**
 * 由停靠距离计算取景偏移：图片始终铺满项目框，仅移动显示窗口。
 *
 * @param {number} distance
 * @param {number} step
 * @returns {number}
 */
function viewPosition(distance, step) {
  const ratio = Math.min(Math.max(distance / Math.max(step, 1), -1), 1);

  return 50 + ratio * 50;
}

/**
 * @param {HTMLElement} scrollerEl
 * @returns {boolean}
 */
function isRtl(scrollerEl) {
  return globalThis.getComputedStyle?.(scrollerEl).direction === 'rtl';
}

function updateItems() {
  const scrollerEl = scroller.value;

  if (!scrollerEl || itemEntries.length === 0) {
    return;
  }

  const vertical = isVertical.value;
  const rtl = !vertical && isRtl(scrollerEl);
  const scrollerRect = scrollerEl.getBoundingClientRect();

  if (vertical) {
    const startEdge = scrollerRect.top;

    itemEntries.forEach(({ element }) => {
      if (!element) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const step = Math.max(rect.height, 1);
      const distance = rect.top - startEdge;

      element.style.setProperty(
        '--mat-carousel-object-position',
        `50% ${viewPosition(-distance, step)}%`,
      );
    });

    if (snapMarks.value.length > 0) {
      snapMarks.value = [];
    }

    return;
  }

  const contentLength = resolveContentLength(scrollerEl);
  const centerAligned = propsWithDefaults.variant === 'hero-center-aligned';
  const centerOffset = (scrollerRect.width - EDGE_PADDING) / 2;
  const targets = itemEntries.map((entry) => {
    const { element, getWidth } = entry;
    if (getWidth() !== undefined) {
      return getWidth();
    }

    /* 读取 multi-aspect 实际布局宽度。 */
    if (propsWithDefaults.variant === 'uncontained-multi-aspect') {
      if (element) {
        if (!naturalWidths.has(element)) {
          const measured = element.getBoundingClientRect().width;
          if (measured && measured > 0) {
            naturalWidths.set(element, measured);
          }
        }
        return naturalWidths.get(element) ?? (element.getBoundingClientRect().width || 0);
      }
      return 0;
    }

    return resolveDefaultTargetWidth(propsWithDefaults.variant, contentLength);
  });
  const maxTarget = Math.max(...targets, 0);
  /* 相邻停靠位间距为一个大项宽度加间距。 */
  const slotSpan = maxTarget + ITEM_GAP;
  currentSlotSpan = slotSpan;
  /* 居中布局前置内边距。 */
  const leadingPad = centerAligned
    ? Math.max(centerOffset - maxTarget / 2, 0)
    : 0;
  const innerWidth = scrollerRect.width - EDGE_PADDING;
  /* 项目按目标宽加间距流式排布的总宽，用于全展开判断与画布宽度。 */
  const flowTotal = targets.reduce((sum, width) => sum + width, 0)
    + Math.max(targets.length - 1, 0) * ITEM_GAP;
  /* 全部项目展开未填满容器时按全展开排布。 */
  const allExpanded = isDynamicWidth.value && !centerAligned && flowTotal <= innerWidth;

  /* 计算滚动画布尺寸。 */
  const lastIndex = Math.max(targets.length - 1, 0);
  const lastMark = centerAligned
    ? leadingPad + lastIndex * slotSpan + maxTarget / 2 - centerOffset
    : lastIndex * slotSpan;
  const canvasSize = allExpanded || !isDynamicWidth.value
    ? leadingPad + flowTotal + (isDynamicWidth.value ? 0 : EDGE_PADDING)
    : lastMark + innerWidth;

  scrollerEl.style.setProperty('--mat-carousel-canvas-size', `${canvasSize}px`);

  /* 动态宽度布局的停靠吸附标记位置。 */
  const marks = itemEntries.map((entry, index) => {
    const target = targets[index];

    if (!isDynamicWidth.value) {
      return targets.slice(0, index).reduce((sum, width) => sum + width + ITEM_GAP, 0);
    }

    if (allExpanded) {
      /* 全展开排布不产生滚动，停靠位即各项目的流式位置。 */
      return targets.slice(0, index).reduce((sum, width) => sum + width + ITEM_GAP, 0);
    }

    if (centerAligned) {
      return leadingPad + index * slotSpan + target / 2 - centerOffset;
    }

    return index * slotSpan;
  });
  const signature = marks.join(',');

  if (signature !== currentMarkSignature) {
    currentMarkSignature = signature;
    snapMarks.value = marks;
  }

  /* Chromium 在 RTL 下 scrollLeft 为非正值，取相反数保持同一坐标系。 */
  const viewportFront = rtl ? -scrollerEl.scrollLeft : scrollerEl.scrollLeft;

  /* 计算各停靠位置下的项目关键线排布。 */
  const arrangeKeylines = isDynamicWidth.value && !allExpanded
    ? (cell) => {
      const positions = new Array(targets.length).fill(0);
      const widths = new Array(targets.length).fill(0);
      const lastCell = targets.length - 1;
      const mirrored = !centerAligned && cell === lastCell;
      const hasHistory = cell > 0;
      const mainLeft = centerAligned
        ? scrollerRect.width / 2 - targets[cell] / 2
        : mirrored
          ? innerWidth - targets[cell]
          : hasHistory
            ? EDGE_PADDING + SMALL_ITEM_WIDTH + ITEM_GAP
            : EDGE_PADDING;

      positions[cell] = mainLeft;
      widths[cell] = targets[cell];

      /* 预览位外侧的项目停靠在容器边缘以零宽出现、消失。 */
      const parkZeroWidth = (fromIndex, toIndex, edgeLeft) => {
        for (let index = fromIndex; index <= toIndex; index += 1) {
          positions[index] = edgeLeft;
          widths[index] = 0;
        }
      };

      if (centerAligned) {
        const largeCount = contentLength >= 1400 ? 3 : contentLength >= 840 ? 2 : 1;
        const focalWidth = largeCount * targets[cell] + (largeCount - 1) * ITEM_GAP;
        const mainLeft = (scrollerRect.width - focalWidth) / 2;
        if (hasHistory) {
          positions[cell - 1] = mainLeft - ITEM_GAP - SMALL_ITEM_WIDTH;
          widths[cell - 1] = SMALL_ITEM_WIDTH;
          parkZeroWidth(0, cell - 2, positions[cell - 1]);
        }
        let cursor = mainLeft;
        for (let i = cell; i < cell + largeCount && i <= lastCell; i += 1) {
          positions[i] = cursor;
          widths[i] = targets[i];
          cursor += targets[i] + ITEM_GAP;
        }
        const previewIdx = cell + largeCount;
        if (previewIdx <= lastCell) {
          positions[previewIdx] = cursor;
          widths[previewIdx] = SMALL_ITEM_WIDTH;
          parkZeroWidth(previewIdx + 1, lastCell, innerWidth);
        }
      } else if (propsWithDefaults.variant === 'multi-browse') {
        const defaultMainLeft = hasHistory ? EDGE_PADDING + SMALL_ITEM_WIDTH + ITEM_GAP : EDGE_PADDING;
        const smallSlot = innerWidth - SMALL_ITEM_WIDTH;
        const normalTrailingRegion = Math.max(smallSlot - ITEM_GAP - (defaultMainLeft + targets[cell] + ITEM_GAP), 0);
        const targetMedium = (maxTarget + SMALL_ITEM_WIDTH) / 2;
        let maxFitMediumCount = Math.min(
          Math.round((normalTrailingRegion + ITEM_GAP) / (targetMedium + ITEM_GAP)),
          4,
        );
        while (maxFitMediumCount > 0
          && (normalTrailingRegion - (maxFitMediumCount - 1) * ITEM_GAP) / maxFitMediumCount <= SMALL_ITEM_WIDTH + ITEM_GAP) {
          maxFitMediumCount -= 1;
        }
        const fullTrailingItems = maxFitMediumCount + 1;
        const itemsRemaining = lastCell - cell;
        let mainLeft;
        let isEndShifted = false;

        if (cell === lastCell) {
          mainLeft = innerWidth - targets[cell];
          isEndShifted = true;
        } else if (targets.length > 3 && itemsRemaining < fullTrailingItems && innerWidth > 800) {
          const trailingMediumCount = Math.max(itemsRemaining - 1, 0);
          const mediumWidth = maxFitMediumCount > 0
            ? (normalTrailingRegion - (maxFitMediumCount - 1) * ITEM_GAP) / maxFitMediumCount
            : targetMedium;
          const trailingSpan = trailingMediumCount * (mediumWidth + ITEM_GAP) + SMALL_ITEM_WIDTH;
          mainLeft = innerWidth - trailingSpan - ITEM_GAP - targets[cell];
          isEndShifted = true;
        } else {
          mainLeft = defaultMainLeft;
        }

        positions[cell] = mainLeft;
        widths[cell] = targets[cell];

        if (!isEndShifted) {
          if (hasHistory) {
            positions[cell - 1] = EDGE_PADDING;
            widths[cell - 1] = SMALL_ITEM_WIDTH;
            parkZeroWidth(0, cell - 2, EDGE_PADDING);
          }

          if (cell + 1 <= lastCell) {
            let cursor = mainLeft + targets[cell] + ITEM_GAP;
            const maxMediumIdx = Math.min(cell + maxFitMediumCount, lastCell - 1);
            const actualMediumCount = Math.max(maxMediumIdx - cell, 0);
            const mediumWidth = actualMediumCount > 0
              ? (normalTrailingRegion - (maxFitMediumCount - 1) * ITEM_GAP) / maxFitMediumCount
              : 0;
            for (let index = cell + 1; index <= maxMediumIdx; index += 1) {
              widths[index] = mediumWidth;
              positions[index] = cursor;
              cursor += mediumWidth + ITEM_GAP;
            }
            const previewIdx = maxMediumIdx + 1;
            if (previewIdx <= lastCell) {
              positions[previewIdx] = smallSlot;
              widths[previewIdx] = SMALL_ITEM_WIDTH;
              parkZeroWidth(previewIdx + 1, lastCell, innerWidth);
            }
          }
        } else {
          let cursor = mainLeft + targets[cell] + ITEM_GAP;
          const trailingMediumCount = Math.max(itemsRemaining - 1, 0);
          const trailingRegion = Math.max(smallSlot - cursor, 0);
          const mediumWidth = trailingMediumCount > 0
            ? (trailingRegion - (trailingMediumCount - 1) * ITEM_GAP) / trailingMediumCount
            : 0;

          for (let index = cell + 1; index <= cell + trailingMediumCount; index += 1) {
            widths[index] = mediumWidth;
            positions[index] = cursor;
            cursor += mediumWidth + ITEM_GAP;
          }
          if (cell < lastCell) {
            positions[lastCell] = smallSlot;
            widths[lastCell] = SMALL_ITEM_WIDTH;
          }

          const leadingRegion = Math.max(mainLeft - ITEM_GAP - EDGE_PADDING, 0);
          const availableLeading = cell;
          if (availableLeading > 1 && leadingRegion > 0) {
            const remRegion = Math.max(leadingRegion - SMALL_ITEM_WIDTH - ITEM_GAP, 0);
            let leadMediumCount = Math.min(
              Math.round((remRegion + ITEM_GAP) / (targetMedium + ITEM_GAP)),
              availableLeading - 1,
            );
            while (leadMediumCount > 0
              && (remRegion - (leadMediumCount - 1) * ITEM_GAP) / leadMediumCount <= SMALL_ITEM_WIDTH + ITEM_GAP) {
              leadMediumCount -= 1;
            }
            if (leadMediumCount > 0) {
              const lMedWidth = (remRegion - (leadMediumCount - 1) * ITEM_GAP) / leadMediumCount;
              let cur = mainLeft - ITEM_GAP;
              for (let index = cell - 1; index >= cell - leadMediumCount; index -= 1) {
                cur -= lMedWidth;
                widths[index] = lMedWidth;
                positions[index] = cur;
                cur -= ITEM_GAP;
              }
              const smallIdx = cell - leadMediumCount - 1;
              positions[smallIdx] = EDGE_PADDING;
              widths[smallIdx] = SMALL_ITEM_WIDTH;
              parkZeroWidth(0, smallIdx - 1, EDGE_PADDING);
            } else {
              positions[cell - 1] = EDGE_PADDING;
              widths[cell - 1] = SMALL_ITEM_WIDTH;
              parkZeroWidth(0, cell - 2, EDGE_PADDING);
            }
          } else if (availableLeading > 0) {
            const previewLeft = leadingRegion > 0 ? EDGE_PADDING : mainLeft - ITEM_GAP - SMALL_ITEM_WIDTH;
            positions[cell - 1] = previewLeft;
            widths[cell - 1] = SMALL_ITEM_WIDTH;
            parkZeroWidth(0, cell - 2, previewLeft);
          }
        }
      } else if (!mirrored) {
        const largeCount = contentLength >= 1400 ? 3 : contentLength >= 840 ? 2 : 1;
        const mainLeft = hasHistory ? EDGE_PADDING + SMALL_ITEM_WIDTH + ITEM_GAP : EDGE_PADDING;
        if (hasHistory) {
          positions[cell - 1] = EDGE_PADDING;
          widths[cell - 1] = SMALL_ITEM_WIDTH;
          parkZeroWidth(0, cell - 2, EDGE_PADDING);
        }

        if (largeCount === 1) {
          positions[cell] = mainLeft;
          widths[cell] = targets[cell];
          if (cell === 0) {
            positions[1] = mainLeft + targets[0] + ITEM_GAP;
            widths[1] = SMALL_ITEM_WIDTH;
            if (2 <= lastCell) {
              positions[2] = positions[1] + SMALL_ITEM_WIDTH + ITEM_GAP;
              widths[2] = SMALL_ITEM_WIDTH;
            }
            parkZeroWidth(3, lastCell, innerWidth);
          } else if (cell + 1 <= lastCell) {
            positions[cell + 1] = innerWidth - SMALL_ITEM_WIDTH;
            widths[cell + 1] = SMALL_ITEM_WIDTH;
            parkZeroWidth(cell + 2, lastCell, innerWidth);
          }
        } else {
          let cursor = mainLeft;
          for (let i = cell; i < cell + largeCount && i <= lastCell; i += 1) {
            positions[i] = cursor;
            widths[i] = targets[i];
            cursor += targets[i] + ITEM_GAP;
          }
          const previewIdx = cell + largeCount;
          if (previewIdx <= lastCell) {
            if (cursor <= innerWidth - SMALL_ITEM_WIDTH) {
              positions[previewIdx] = cursor;
              widths[previewIdx] = SMALL_ITEM_WIDTH;
              parkZeroWidth(previewIdx + 1, lastCell, innerWidth);
            } else {
              parkZeroWidth(previewIdx, lastCell, innerWidth);
            }
          }
        }
      } else if (hasHistory) {
        const largeCount = contentLength >= 1400 ? 3 : contentLength >= 840 ? 2 : 1;
        if (largeCount === 1) {
          const mainLeft = innerWidth - targets[cell];
          positions[cell] = mainLeft;
          widths[cell] = targets[cell];
          positions[cell - 1] = EDGE_PADDING;
          widths[cell - 1] = SMALL_ITEM_WIDTH;
          parkZeroWidth(0, cell - 2, EDGE_PADDING);
        } else {
          let cursor = innerWidth;
          for (let i = cell; i > cell - largeCount && i >= 0; i -= 1) {
            cursor -= targets[i];
            positions[i] = cursor;
            widths[i] = targets[i];
            cursor -= ITEM_GAP;
          }
          const leadIdx = cell - largeCount;
          if (leadIdx >= 0) {
            positions[leadIdx] = EDGE_PADDING;
            widths[leadIdx] = SMALL_ITEM_WIDTH;
            parkZeroWidth(0, leadIdx - 1, EDGE_PADDING);
          }
        }
      }

      return { positions, widths };
    }
    : null;

  let cell = 0;
  let nextCell = 0;
  let keylinesCurrent;
  let keylinesNext;
  let cellProgress = 0;

  if (arrangeKeylines) {
    while (cell < targets.length - 1 && marks[cell + 1] <= viewportFront) {
      cell += 1;
    }

    nextCell = Math.min(cell + 1, targets.length - 1);
    const span = Math.max(marks[nextCell] - marks[cell], 1);

    cellProgress = Math.min(Math.max((viewportFront - marks[cell]) / span, 0), 1);
    keylinesCurrent = arrangeKeylines(cell);
    keylinesNext = arrangeKeylines(nextCell);
  }

  let cursor = leadingPad;

  itemEntries.forEach((entry, index) => {
    const { element } = entry;

    if (!element) {
      return;
    }

    const natural = propsWithDefaults.variant === 'uncontained-multi-aspect' && entry.getWidth() === undefined;
    const target = targets[index];
    const baseStart = cursor;
    const itemWidth = natural
      ? (element.getBoundingClientRect().width || Number.parseFloat(element.style.inlineSize) || target)
      : target;

    if (!isDynamicWidth.value || allExpanded) {
      cursor += itemWidth + ITEM_GAP;
      element.style.insetInlineStart = `${baseStart}px`;
      element.style.inlineSize = `${itemWidth}px`;
      const relX = baseStart - viewportFront;
      element.style.setProperty(
        '--mat-carousel-object-position',
        allExpanded ? '50% 50%' : `${viewPosition(relX, itemWidth)}% 50%`,
      );
      return;
    }

    const mark = marks[index];
    const distance = mark - viewportFront;
    /* 在相邻关键线之间线性插值计算位置与宽度。 */
    const start = keylinesCurrent.positions[index]
      + (keylinesNext.positions[index] - keylinesCurrent.positions[index]) * cellProgress
      + viewportFront - EDGE_PADDING;
    const width = keylinesCurrent.widths[index]
      + (keylinesNext.widths[index] - keylinesCurrent.widths[index]) * cellProgress;

    element.style.insetInlineStart = `${start}px`;
    element.style.inlineSize = `${Math.max(width, 0)}px`;
    element.style.zIndex = index === cell || index === nextCell ? '1' : '';
    element.style.setProperty(
      '--mat-carousel-object-position',
      `${viewPosition(distance, slotSpan)}% 50%`,
    );
  });
}

function stopSettleAnimation() {
  if (settleFrame !== undefined) {
    globalThis.cancelAnimationFrame?.(settleFrame);
    settleFrame = undefined;
  }
}

/**
 * 估算松手拖拽速度（px/s）。
 *
 * @returns {number | undefined}
 */
function measureReleaseSpeed() {
  const samples = dragSamples ?? [];

  if (samples.length < 2) {
    return undefined;
  }

  const last = samples[samples.length - 1];
  let first = samples[samples.length - 2];

  /* 聚合最近 120ms 内的样本；窗口里不足两个时退回上一个采样点，
     停顿后的慢速松手也能得到可靠速度。 */
  for (let index = samples.length - 3; index >= 0; index -= 1) {
    if (last.time - samples[index].time > 120) {
      break;
    }

    first = samples[index];
  }

  const elapsed = last.time - first.time;

  if (elapsed < 1) {
    return undefined;
  }

  return (Math.abs(last.x - first.x) / elapsed) * 1000;
}

/**
 * 逐帧滚动到目标停靠位。
 *
 * @param {number} targetLeft 目标 scrollLeft
 * @param {{ releaseSpeed?: number }} [options] 拖拽释放速度
 */
function animateScrollTo(targetLeft, options = {}) {
  const scrollerEl = scroller.value;

  if (!scrollerEl) {
    return;
  }

  stopSettleAnimation();

  const from = scrollerEl.scrollLeft;
  const distance = targetLeft - from;

  if (Math.abs(distance) < 1) {
    scrollerEl.scrollLeft = targetLeft;
    return;
  }

  const reduced = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

  if (reduced) {
    scrollerEl.scrollLeft = targetLeft;
    return;
  }

  /* 吸附过渡期间必须保持原生吸附停用：mandatory 恢复会让浏览器把
     位置瞬时重吸附回上一次的停靠目标，吞掉整个逐帧过渡；到达精确
     停靠位后再移除，此时重吸附是空操作。 */
  scrollerEl.classList.add('mat-carousel__scroller--settling');

  const releaseSpeed = options.releaseSpeed;
  const duration = Number.isFinite(releaseSpeed) && releaseSpeed > 0
    ? Math.min(Math.max((Math.abs(distance) * 2000) / releaseSpeed, 180), 420)
    : Math.min(Math.max(120 + Math.abs(distance) * 0.75, 180), 420);
  const startedAt = performance.now();

  const step = (now) => {
    const progress = Math.min(Math.max((now - startedAt) / duration, 0), 1);
    /* 二次缓出即匀减速：未触及上下限时初速度恰好等于释放速度。 */
    const eased = 1 - (1 - progress) ** 2;

    scrollerEl.scrollLeft = from + distance * eased;

    if (progress < 1) {
      settleFrame = globalThis.requestAnimationFrame?.(step);
    } else {
      settleFrame = undefined;
      scrollerEl.classList.remove('mat-carousel__scroller--settling');
    }
  };

  settleFrame = globalThis.requestAnimationFrame?.(step);
}

/**
 * 处理项目点击滚动。
 *
 * @param {PointerEvent | MouseEvent} event
 */
function handleItemClick(event) {
  const scrollerEl = scroller.value;

  if (!propsWithDefaults.switchOnClick || !scrollerEl || isVertical.value || dragMoved) {
    return;
  }

  const target = event.target;

  if (!(target instanceof Element)) {
    return;
  }

  const item = target.closest('.mat-carousel-item');

  if (!item) {
    return;
  }

  const index = itemEntries.findIndex((entry) => entry.element === item);

  if (index < 0) {
    return;
  }

  const mark = snapMarks.value[index];

  if (mark === null || mark === undefined) {
    return;
  }

  animateScrollTo(isRtl(scrollerEl) ? -mark : mark);
}

/**
 * 拖拽开始处理。
 *
 * @param {PointerEvent} event
 */
function handlePointerDown(event) {
  if (isVertical.value
    || (event.pointerType !== 'mouse' && event.pointerType !== 'touch')
    || event.button !== 0) {
    return;
  }

  const scrollerEl = scroller.value;

  if (!scrollerEl) {
    return;
  }

  globalThis.clearTimeout(wheelSettleTimer);
  wheelSettleTimer = undefined;
  /* 打断进行中的吸附动画，避免拖拽位移与残余动画叠加导致不跟手；
     吸附停用状态保持不变，由拖拽接管或松手后的重新吸附继承。 */
  stopSettleAnimation();
  scrollerEl.scrollTo?.({ left: scrollerEl.scrollLeft, behavior: 'instant' });

  dragPointerId = event.pointerId;
  dragStartX = event.clientX;
  dragStartScroll = scrollerEl.scrollLeft;
  dragMoved = false;
  dragSamples = [{ x: event.clientX, time: performance.now() }];
}

/**
 * 拖拽移动处理。
 *
 * @param {PointerEvent} event
 */
function handlePointerMove(event) {
  if (event.pointerId !== dragPointerId) {
    return;
  }

  const scrollerEl = scroller.value;

  if (!scrollerEl) {
    return;
  }

  dragSamples?.push({ x: event.clientX, time: performance.now() });

  if (dragSamples !== undefined && dragSamples.length > 6) {
    dragSamples.shift();
  }

  const deltaX = event.clientX - dragStartX;

  if (!dragMoved && Math.abs(deltaX) < DRAG_THRESHOLD) {
    return;
  }

  if (!dragMoved) {
    dragMoved = true;
    scrollerEl.setPointerCapture?.(event.pointerId);
    scrollerEl.classList.add('mat-carousel__scroller--dragging');
    /* 拖拽接管吸附过渡：吸附停用状态改由 --dragging 承担。 */
    scrollerEl.classList.remove('mat-carousel__scroller--settling');
  }

  event.preventDefault();
  scrollerEl.scrollLeft = dragStartScroll - (isRtl(scrollerEl) ? -deltaX : deltaX);
}

/**
 * 吸附至最近的停靠位。
 *
 * @param {number} [releaseSpeed] 松手拖拽速度（px/s）
 */
function settleToNearestMark(releaseSpeed) {
  const scrollerEl = scroller.value;

  if (!scrollerEl || isVertical.value || dragPointerId !== undefined) {
    return;
  }

  const rtl = isRtl(scrollerEl);
  const current = rtl ? -scrollerEl.scrollLeft : scrollerEl.scrollLeft;
  const candidates = snapMarks.value.filter((mark) => mark !== null && mark !== undefined);
  const targets = candidates.length > 0
    ? candidates
    : itemEntries.map(({ element }) => Number.parseFloat(element?.style.insetInlineStart) || 0);

  if (targets.length === 0) {
    return;
  }

  let nearest = targets[0];

  targets.forEach((mark) => {
    if (Math.abs(mark - current) < Math.abs(nearest - current)) {
      nearest = mark;
    }
  });

  animateScrollTo(rtl ? -nearest : nearest, { releaseSpeed });
}

/**
 * @param {PointerEvent} event
 */
function handlePointerUp(event) {
  if (event.pointerId !== dragPointerId) {
    return;
  }

  const releaseSpeed = measureReleaseSpeed();

  dragPointerId = undefined;
  dragSamples = undefined;

  /* 浏览器接管手势（如纵向滚动）时取消拖拽：交还原生吸附，停止组件
     驱动的过渡。 */
  if (event.type === 'pointercancel') {
    stopSettleAnimation();
    scroller.value?.classList.remove('mat-carousel__scroller--dragging', 'mat-carousel__scroller--settling');
    return;
  }

  /* 先启动逐帧吸附（吸附期间保持原生吸附停用），再移除拖拽状态：
     --dragging 一旦移除，随后的样式重算会立即恢复 mandatory 吸附，
     把位置瞬时重吸附回上一次的停靠目标、吞掉整个过渡。 */
  settleToNearestMark(dragMoved ? releaseSpeed : undefined);
  scroller.value?.classList.remove('mat-carousel__scroller--dragging');

  /* 短暂保留 dragMoved 供随后的 click 事件区分点击与拖拽。 */
  globalThis.setTimeout(() => {
    dragMoved = false;
  }, 0);
}

/**
 * 横向滚轮滚动处理。
 *
 * @param {WheelEvent} event
 */
function handleWheel(event) {
  if (isVertical.value || event.ctrlKey) {
    return;
  }

  const deltaX = Math.abs(event.deltaX) >= Math.abs(event.deltaY) ? event.deltaX : 0;
  const scrollerEl = scroller.value;

  if (deltaX === 0 || !scrollerEl) {
    return;
  }

  if (scrollerEl.scrollWidth - scrollerEl.clientWidth <= 0) {
    return;
  }

  event.preventDefault();
  globalThis.clearTimeout(wheelSettleTimer);
  stopSettleAnimation();
  scrollerEl.classList.add('mat-carousel__scroller--dragging');
  /* 滚轮接管吸附过渡：吸附停用状态改由 --dragging 承担。 */
  scrollerEl.classList.remove('mat-carousel__scroller--settling');
  scrollerEl.scrollLeft += deltaX;

  wheelSettleTimer = globalThis.setTimeout(() => {
    wheelSettleTimer = undefined;
    /* 与指针释放相同：先让逐帧吸附接管吸附停用，再退出拖拽状态。 */
    settleToNearestMark();
    scrollerEl.classList.remove('mat-carousel__scroller--dragging');
  }, WHEEL_SETTLE_DELAY);
}

/**
 * 键盘导航处理。
 *
 * @param {KeyboardEvent} event
 */
function handleKeydown(event) {
  if (isVertical.value) {
    return;
  }

  const scrollerEl = scroller.value;

  if (!scrollerEl) {
    return;
  }

  const rtl = isRtl(scrollerEl);
  const forward = (event.key === 'ArrowRight') !== rtl;

  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight'
    && event.key !== 'Home' && event.key !== 'End') {
    return;
  }

  event.preventDefault();

  const maxScroll = scrollerEl.scrollWidth - scrollerEl.clientWidth;

  if (event.key === 'Home') {
    scrollerEl.scrollTo({ left: rtl ? -maxScroll : 0, behavior: 'smooth' });
    return;
  }

  if (event.key === 'End') {
    scrollerEl.scrollTo({ left: rtl ? 0 : maxScroll, behavior: 'smooth' });
    return;
  }

  const step = currentSlotSpan * (forward ? 1 : -1);

  scrollerEl.scrollBy({ left: step, behavior: 'smooth' });
}

function scheduleUpdate() {
  if (typeof globalThis.requestAnimationFrame !== 'function') {
    updateItems();
    return;
  }

  globalThis.requestAnimationFrame(() => {
    updateItems();
  });
}

watch(() => propsWithDefaults.variant, scheduleUpdate);

onMounted(() => {
  if (typeof ResizeObserver !== 'undefined' && scroller.value) {
    resizeObserver = new ResizeObserver(() => {
      naturalWidths = new WeakMap();
      scheduleUpdate();
    });
    resizeObserver.observe(scroller.value);
  }

  if (typeof MutationObserver !== 'undefined' && scroller.value) {
    mutationObserver = new MutationObserver(scheduleUpdate);
    mutationObserver.observe(scroller.value, { childList: true, subtree: true });
  }

  /* 初始布局同步执行一次，保证在帧回调被暂停或延迟时项目仍具备可滚动宽度。 */
  updateItems();
  scheduleUpdate();

  /* 首帧布局完成后再启用原生吸附：初始的瞬态几何不再参与停靠决策。 */
  globalThis.requestAnimationFrame?.(() => {
    scroller.value?.classList.add('mat-carousel__scroller--snapping');
  });
});

onBeforeUnmount(() => {
  globalThis.clearTimeout(wheelSettleTimer);
  stopSettleAnimation();
  resizeObserver?.disconnect();
  mutationObserver?.disconnect();
});
</script>

<template>
  <div
    v-bind="attrs"
    class="mat-carousel"
    :class="`mat-carousel--${propsWithDefaults.variant}`"
  >
    <div
      ref="scroller"
      class="mat-carousel__scroller"
      role="group"
      tabindex="0"
      :aria-label="scrollerLabel"
      @scroll="scheduleUpdate"
      @click.capture="handleItemClick"
      @dragstart.prevent
      @keydown="handleKeydown"
      @pointerdown="handlePointerDown"
      @pointermove="handlePointerMove"
      @pointerup="handlePointerUp"
      @pointercancel="handlePointerUp"
      @wheel="handleWheel"
    >
      <div class="mat-carousel__canvas">
        <slot />
        <template
          v-for="(mark, index) in snapMarks"
          :key="`mark-${index}`"
        >
          <span
            v-if="mark !== null"
            class="mat-carousel__snap-mark"
            :style="{ insetInlineStart: `${mark}px` }"
            aria-hidden="true"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
@layer mde.components {
  .mat-carousel {
    display: flex;
    inline-size: 100%;
    block-size: 100%;

    /* 非全屏布局限制最大高度。 */
    max-block-size: 320px;
    min-block-size: 0;
    user-select: none;
  }

  .mat-carousel--full-screen {
    max-block-size: none;
  }

  .mat-carousel:not(.mat-carousel--full-screen) {
    border-radius: var(--mat-sys-shape-corner-large);
  }

  .mat-carousel__scroller {
    --mat-carousel-canvas-size: 100%;
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    box-sizing: border-box;
    min-inline-size: 0;
    border-radius: inherit;
    padding-block: 8px;
    padding-inline: 16px 0;
    scroll-padding-inline-start: 16px;
    scroll-snap-type: none;
    overflow: auto hidden;
    scrollbar-width: none;

    /* 横向手势由指针事件处理。 */
    touch-action: pan-y;
  }

  .mat-carousel__scroller--snapping {
    scroll-snap-type: x mandatory;
  }

  .mat-carousel--full-screen .mat-carousel__scroller--snapping {
    scroll-snap-type: y mandatory;
  }

  /* 拖拽及吸附期间禁用原生滚动吸附。 */
  .mat-carousel__scroller--dragging,
  .mat-carousel__scroller--settling {
    scroll-snap-type: none;
  }

  .mat-carousel__scroller--dragging {
    cursor: grabbing;
  }

  .mat-carousel__scroller::-webkit-scrollbar {
    display: none;
  }

  .mat-carousel__scroller:focus-visible {
    outline: var(--mat-sys-interaction-focus-ring-width) solid var(--mat-sys-color-secondary);
    outline-offset: -2px;
  }

  .mat-carousel__canvas {
    position: relative;
    flex: 0 0 auto;
    align-self: stretch;
    inline-size: var(--mat-carousel-canvas-size);
    min-inline-size: 0;
    overflow: clip;
  }

  .mat-carousel__snap-mark {
    position: absolute;
    inset-block: 0;
    inline-size: 1px;
    pointer-events: none;
    scroll-snap-align: start;
  }

  .mat-carousel:not(.mat-carousel--full-screen) .mat-carousel__canvas :deep(.mat-carousel-item) {
    position: absolute;
    inset-block: 0;
    transition: box-shadow var(--mat-sys-motion-spring-fast-effects);
  }

  /* uncontained 系列流式吸附对齐。 */
  .mat-carousel--uncontained .mat-carousel__canvas :deep(.mat-carousel-item),
  .mat-carousel--uncontained-multi-aspect .mat-carousel__canvas :deep(.mat-carousel-item) {
    scroll-snap-align: start;
  }

  .mat-carousel:not(.mat-carousel--full-screen)
  .mat-carousel__canvas
  :deep(.mat-carousel-item:focus-visible) {
    outline: var(--mat-sys-interaction-focus-ring-width) solid var(--mat-sys-color-secondary);
    outline-offset: -2px;
    z-index: 1;
  }

  .mat-carousel--full-screen .mat-carousel__canvas {
    display: contents;
  }

  .mat-carousel--full-screen .mat-carousel__scroller {
    flex-direction: column;
    align-items: stretch;
    padding: 0;
    gap: 16px;
    overflow: hidden auto;
  }

  .mat-carousel--full-screen :deep(.mat-carousel-item) {
    inline-size: 100%;
    border-radius: 0;
    scroll-snap-align: center;
  }
}
</style>
