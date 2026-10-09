<script setup>
import {
  cloneVNode, computed, Fragment, getCurrentInstance, nextTick, onBeforeUnmount,
  onMounted, onUpdated, provide, ref, useSlots, watch,
} from 'vue';
import useComponentColor from '../use-component-color';
import { useMatProps } from '../use-mat-props';
import createMotionController from '../motion-controller';
import createSwipeGesture from '../swipe-gesture';
import useRovingFocus from '../use-roving-focus';
import MatBtn from '../mat-btn/MatBtn.vue';
import MatTabContent from './MatTabContent.vue';
import MatTabItem from './MatTabItem.vue';
import { MAT_TABS_KEY } from './tabs-context';

defineOptions({
  name: 'MatTabs',
});

const props = defineProps({
  /**
   * 当前选中的标签页值，支持 `v-model`；`null` 表示未选择。
   *
   * @type {string | number | boolean | null}
   * @default null
   */
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
  /**
   * 标签页变体；`primary` 支持 64px 堆叠图文与居中指示器，
   * `secondary` 为 48px 水平图文与全宽指示器。
   *
   * @type {'primary' | 'secondary'}
   * @default 'primary'
   */
  variant: {
    type: String,
    default: 'primary',
    validator(value) {
      return ['primary', 'secondary'].includes(value);
    },
  },
  /**
   * 是否允许触摸与手写笔在内容区左右滑动翻页；鼠标指针不参与手势。
   *
   * @type {boolean}
   * @default true
   */
  swipeable: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否使用滚动标签行：标签按内容宽度排列并可横向滚动；关闭时均分容器宽度。
   *
   * @type {boolean}
   * @default false
   */
  scrollable: {
    type: Boolean,
    default: false,
  },
  /**
   * 滚动标签行中标签的整体对齐方式；均分模式下不产生效果。
   *
   * @type {'start' | 'center' | 'end'}
   * @default 'start'
   */
  align: {
    type: String,
    default: 'start',
    validator(value) {
      return ['start', 'center', 'end'].includes(value);
    },
  },
  /**
   * 统一组件配色；作用于活动标签内容与活动指示器，省略时使用 primary 角色。
   *
   * @type {string | undefined}
   * @default undefined
   */
  color: {
    type: String,
    default: undefined,
  },
  /**
   * 是否在滚动标签行两端显示翻页按钮；仅在 `scrollable` 且内容溢出时可见。
   *
   * @type {boolean}
   * @default false
   */
  scrollButtons: {
    type: Boolean,
    default: false,
  },
});
const propsWithDefaults = useMatProps('tabs', props);

const emit = defineEmits({
  /**
   * 请求更新选中的标签页值。
   *
   * @param {string | number | boolean} value
   */
  'update:modelValue': (value) => ['string', 'number', 'boolean'].includes(typeof value),
});

const slots = useSlots();
const instance = getCurrentInstance();
const idBase = `mat-tabs-${instance?.uid ?? '0'}`;
const { colorStyle } = useComponentColor(() => propsWithDefaults.color);

const tablistRef = ref(null);
const viewportRef = ref(null);
const trackRef = ref(null);
const offset = ref(0);
const dragging = ref(false);
const suppressTransition = ref(false);
const indicatorVisible = ref(false);
const indicatorStyle = ref({});
const isRtl = ref(false);
const panelOverrides = ref(null);
const canScrollStart = ref(false);
const canScrollEnd = ref(false);

/* 渲染期拆分的 Slot 节点：事件处理器与侦听器需要读取，故用普通变量保存。 */
let lastItems = [];
let lastContents = [];
let animationTarget = null;
let dragBase = 0;
let resizeObserver;

const motion = createMotionController();

const swipe = createSwipeGesture({
  onStart: () => {
    motion.cancel();
    panelOverrides.value = null;
    dragBase = offset.value;
    animationTarget = null;
    dragging.value = true;
  },
  onMove: ({ deltaX }) => {
    const width = viewportWidth();

    if (!width) {
      return;
    }

    const raw = isRtl.value
      ? dragBase + deltaX / width
      : dragBase - deltaX / width;
    offset.value = applyEdgeResistance(raw);
  },
  onEnd: ({ velocity, cancelled }) => {
    dragging.value = false;

    if (cancelled) {
      syncToTarget();
      return;
    }

    const width = viewportWidth();

    if (!width) {
      return;
    }

    const base = Math.round(dragBase);
    const offsetVelocity = (isRtl.value ? velocity : -velocity) / width;
    let target = Math.round(offset.value);

    if (target === base && Math.abs(offsetVelocity) > 0.5) {
      target = base + Math.sign(offsetVelocity);
    }

    target = Math.min(Math.max(target, 0), Math.max(0, lastContents.length - 1));
    const value = lastContents[target]?.props?.value;

    if (value !== undefined && !Object.is(propsWithDefaults.modelValue, value)) {
      emit('update:modelValue', value);
    }

    syncToTarget();
  },
});

const roving = useRovingFocus({
  root: tablistRef,
  selector: '[role="tab"]',
  isAvailable: (element) => !(
    element instanceof HTMLButtonElement && element.disabled
  ) && element.getAttribute('aria-disabled') !== 'true',
});

/* 每次渲染重新拆分默认 Slot，按组件类型区分 Item 与 Content。 */
function splitVnodes() {
  const nodes = flattenVnodes(slots.default?.() ?? []);
  const items = nodes.filter((node) => node.type === MatTabItem);
  const contents = nodes.filter((node) => node.type === MatTabContent);

  lastItems = items;
  lastContents = contents;

  if (import.meta.env.DEV) {
    const values = items.map((node) => node.props?.value);
    const duplicated = values.some(
      (value, index) => value !== undefined && values.findIndex(
        (candidate) => Object.is(candidate, value),
      ) !== index,
    );

    if (duplicated) {
      console.warn('MatTabs: 存在重复的 mat-tab-item value，激活映射将不确定');
    }
  }

  return { items, contents };
}

function flattenVnodes(nodes, output = []) {
  nodes.forEach((node) => {
    if (Array.isArray(node)) {
      flattenVnodes(node, output);
    } else if (node && node.type === Fragment) {
      flattenVnodes(node.children, output);
    } else if (node && (node.type === MatTabItem || node.type === MatTabContent)) {
      output.push(node);
    }
  });

  return output;
}

function findTargetIndex() {
  return lastContents.findIndex(
    (node) => Object.is(node.props?.value, propsWithDefaults.modelValue),
  );
}

const targetIndex = computed(() => findTargetIndex());

const hostClasses = computed(() => ({
  'mat-tabs': true,
  'mat-tabs--primary': propsWithDefaults.variant === 'primary',
  'mat-tabs--secondary': propsWithDefaults.variant === 'secondary',
  'mat-tabs--scrollable': propsWithDefaults.scrollable,
  'mat-tabs--scroll-start': canScrollStart.value,
  'mat-tabs--scroll-end': canScrollEnd.value,
  [`mat-tabs--align-${propsWithDefaults.align}`]: propsWithDefaults.scrollable,
  'mat-tabs--rtl': isRtl.value,
}));

const hostStyles = computed(() => ({
  ...colorStyle.value,
  '--mat-tabs-offset': String(offset.value),
}));

const trackClasses = computed(() => ({
  'mat-tabs__track': true,
  'mat-tabs__track--dragging': dragging.value,
  'mat-tabs__track--suppress': suppressTransition.value,
}));

function viewportWidth() {
  return viewportRef.value?.clientWidth ?? 0;
}

function applyEdgeResistance(raw) {
  const max = Math.max(0, lastContents.length - 1);

  if (raw < 0) {
    return raw * 0.3;
  }

  if (raw > max) {
    return max + (raw - max) * 0.3;
  }

  return raw;
}

function jumpCut(target) {
  animationTarget = null;
  panelOverrides.value = null;
  suppressTransition.value = true;
  offset.value = target;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      suppressTransition.value = false;
    });
  });
}

function goTo(target) {
  if (target < 0 || animationTarget === target) {
    return;
  }

  const from = offset.value;

  if (Math.abs(from - target) < 0.001) {
    animationTarget = null;
    return;
  }

  const fromIndex = Math.round(from);

  if (Math.abs(target - fromIndex) <= 1) {
    panelOverrides.value = null;
    animationTarget = target;
    offset.value = target;
    /* 等 Vue 应用样式变更后再等待过渡动画完成。 */
    nextTick(() => {
      motion.wait(trackRef.value, 700, () => {
        if (animationTarget === target) {
          animationTarget = null;
        }
      });
    });
    return;
  }

  /* 跨越多页：目标页临时平移到当前页的相邻侧，中间页隐藏，轨道只滑动一格，
     动画完成后无过渡直切到目标位置并清空临时状态。 */
  const dir = Math.sign(target - fromIndex) || 1;
  const adjacentOffset = fromIndex + dir;
  const targetNode = lastContents[target];
  const targetValue = targetNode?.props?.value;

  const min = Math.min(fromIndex, target);
  const max = Math.max(fromIndex, target);
  const hiddenValues = lastContents
    .filter((_, idx) => idx > min && idx < max)
    .map((node) => node?.props?.value);

  const stepDiff = adjacentOffset - target;
  const shiftPercent = isRtl.value ? -stepDiff * 100 : stepDiff * 100;

  panelOverrides.value = {
    targetValue,
    targetShift: shiftPercent,
    hiddenValues,
  };

  animationTarget = target;
  offset.value = adjacentOffset;

  nextTick(() => {
    motion.wait(trackRef.value, 700, () => {
      if (animationTarget !== target) {
        return;
      }

      jumpCut(target);
    });
  });
}

function syncToTarget() {
  goTo(targetIndex.value);
}

function updateIndicator() {
  const list = tablistRef.value;
  const active = list?.querySelector('[role="tab"][aria-selected="true"]');

  if (!active) {
    if (indicatorVisible.value || indicatorStyle.value.width) {
      indicatorVisible.value = false;
      indicatorStyle.value = {};
    }
    return;
  }

  let transform;
  let width;

  if (propsWithDefaults.variant === 'primary') {
    // primary：指示器对齐居中内容区域，两侧内缩 2px，最短 24px
    const content = active.querySelector('.mat-tab-item__content');
    const contentWidth = content?.offsetWidth ?? active.offsetWidth;
    const contentLeft = content ? (active.offsetLeft + content.offsetLeft) : active.offsetLeft;

    const targetWidth = Math.max(contentWidth - 4, 24);
    const targetLeft = contentLeft + (contentWidth - targetWidth) / 2;

    transform = `translateX(${targetLeft}px)`;
    width = `${targetWidth}px`;
  } else {
    // secondary：指示器横跨整个单元格宽度
    transform = `translateX(${active.offsetLeft}px)`;
    width = `${active.offsetWidth}px`;
  }

  if (indicatorStyle.value.transform !== transform || indicatorStyle.value.width !== width) {
    indicatorStyle.value = { transform, width };
  }

  if (!indicatorVisible.value) {
    indicatorVisible.value = true;
  }

  updateScrollOverflow();
}

function updateScrollOverflow() {
  const list = tablistRef.value;
  if (!list || !propsWithDefaults.scrollable) {
    canScrollStart.value = false;
    canScrollEnd.value = false;
    return;
  }

  const maxScroll = list.scrollWidth - list.clientWidth;
  if (maxScroll <= 1) {
    canScrollStart.value = false;
    canScrollEnd.value = false;
    return;
  }

  canScrollStart.value = list.scrollLeft > 1;
  canScrollEnd.value = list.scrollLeft < maxScroll - 1;
}

function handleScroll() {
  updateScrollOverflow();
}

function handleWheel(event) {
  if (!propsWithDefaults.scrollable) {
    return;
  }

  const list = tablistRef.value;
  if (!list) {
    return;
  }

  const maxScroll = list.scrollWidth - list.clientWidth;
  if (maxScroll <= 0) {
    return;
  }

  if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
    const atStart = list.scrollLeft <= 0 && event.deltaY < 0;
    const atEnd = list.scrollLeft >= maxScroll - 1 && event.deltaY > 0;

    if (!atStart && !atEnd) {
      event.preventDefault();
      list.scrollLeft += event.deltaY;
      updateScrollOverflow();
      updateIndicator();
    }
  }
}

function handleScrollStart() {
  const list = tablistRef.value;
  if (!list) {
    return;
  }

  const step = list.clientWidth * 0.7;
  list.scrollBy({ left: -step, behavior: 'smooth' });
}

function handleScrollEnd() {
  const list = tablistRef.value;
  if (!list) {
    return;
  }

  const step = list.clientWidth * 0.7;
  list.scrollBy({ left: step, behavior: 'smooth' });
}

function scrollActiveTabToCenter(smooth = true) {
  if (!propsWithDefaults.scrollable) {
    return;
  }

  const list = tablistRef.value;
  const active = list?.querySelector('[role="tab"][aria-selected="true"]');
  if (!list || !active) {
    return;
  }

  const listWidth = list.clientWidth;
  const maxScroll = list.scrollWidth - listWidth;
  if (maxScroll <= 0) {
    return;
  }

  const scrollerCenter = listWidth / 2;
  const tabLeft = active.offsetLeft;
  const tabWidth = active.offsetWidth;
  const centeredOffset = tabLeft + tabWidth / 2 - scrollerCenter;
  const targetLeft = Math.min(Math.max(0, centeredOffset), maxScroll);

  list.scrollTo({
    left: targetLeft,
    behavior: smooth ? 'smooth' : 'instant',
  });
}

function measureRtl() {
  const element = tablistRef.value;

  isRtl.value = Boolean(
    element && globalThis.getComputedStyle(element).direction === 'rtl',
  );
}

function isEnabled(element) {
  return !(element instanceof HTMLButtonElement && element.disabled)
    && element.getAttribute('aria-disabled') !== 'true';
}

/**
 * @param {KeyboardEvent} event
 */
function handleKeydown(event) {
  const list = tablistRef.value;
  const tab = event.target instanceof HTMLElement
    ? event.target.closest('[role="tab"]')
    : null;

  if (!list || !tab || !list.contains(tab)) {
    return;
  }

  const elements = [...list.querySelectorAll('[role="tab"]')];
  const index = elements.indexOf(tab);

  if (index === -1) {
    return;
  }

  let target = null;

  if (event.key === 'Home') {
    target = elements.find(isEnabled) ?? null;
  } else if (event.key === 'End') {
    target = elements.findLast(isEnabled) ?? null;
  } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    const dir = (event.key === 'ArrowRight') === isRtl.value ? -1 : 1;
    let current = index;

    for (let steps = 0; steps < elements.length; steps += 1) {
      current = (current + dir + elements.length) % elements.length;

      if (isEnabled(elements[current])) {
        target = elements[current];
        break;
      }
    }
  } else {
    return;
  }

  event.preventDefault();

  if (!target) {
    return;
  }

  if (event.key === 'Home') {
    roving.focusFirst();
  } else if (event.key === 'End') {
    roving.focusLast();
  } else {
    const dir = ((event.key === 'ArrowRight') === isRtl.value ? -1 : 1);

    roving.move(tab, dir);
  }

  target.scrollIntoView?.({ inline: 'nearest', block: 'nearest' });

  const value = lastItems[elements.indexOf(target)]?.props?.value;

  if (value !== undefined && !Object.is(propsWithDefaults.modelValue, value)) {
    emit('update:modelValue', value);
  }
}

function cloneItem(node, index) {
  const value = node.props?.value;
  const panelIndex = lastContents.findIndex(
    (contentNode) => Object.is(contentNode.props?.value, value),
  );

  return cloneVNode(node, {
    id: `${idBase}-tab-${index}`,
    'aria-controls': panelIndex >= 0 ? `${idBase}-panel-${panelIndex}` : undefined,
  });
}

function cloneContent(node, index) {
  const value = node.props?.value;
  const tabIndex = lastItems.findIndex(
    (itemNode) => Object.is(itemNode.props?.value, value),
  );
  const overrides = panelOverrides.value;
  let style;

  if (overrides) {
    if (Object.is(value, overrides.targetValue)) {
      style = { transform: `translateX(${overrides.targetShift}%)` };
    } else if (overrides.hiddenValues?.includes(value)) {
      style = { visibility: 'hidden' };
    }
  }

  return cloneVNode(node, {
    id: `${idBase}-panel-${index}`,
    'aria-labelledby': tabIndex >= 0 ? `${idBase}-tab-${tabIndex}` : undefined,
    style,
  });
}

function bindSwipe() {
  swipe.bind(propsWithDefaults.swipeable ? viewportRef.value : null);
}

watch(() => propsWithDefaults.modelValue, () => {
  syncToTarget();
  nextTick(() => {
    scrollActiveTabToCenter(true);
  });
});

watch(() => propsWithDefaults.variant, async () => {
  await nextTick();
  updateIndicator();
});

watch(() => propsWithDefaults.swipeable, () => {
  bindSwipe();
});

watch(viewportRef, () => {
  bindSwipe();
});

onMounted(async () => {
  offset.value = Math.max(0, targetIndex.value);
  measureRtl();
  roving.observe();
  roving.refresh();
  await nextTick();
  updateIndicator();
  scrollActiveTabToCenter(false);
  updateScrollOverflow();

  if (tablistRef.value && typeof ResizeObserver === 'function') {
    resizeObserver = new ResizeObserver(() => {
      updateIndicator();
      updateScrollOverflow();
    });
    resizeObserver.observe(tablistRef.value);
  }

  globalThis.document?.fonts?.ready?.then(() => {
    updateIndicator();
    updateScrollOverflow();
  });
  bindSwipe();
});

onUpdated(() => {
  updateIndicator();
  updateScrollOverflow();
});

onBeforeUnmount(() => {
  swipe.destroy();
  motion.cancel();
  resizeObserver?.disconnect();
  resizeObserver = undefined;
});

provide(MAT_TABS_KEY, {
  variant: computed(() => propsWithDefaults.variant),
  isSelected: (value) => (
    value !== undefined && Object.is(propsWithDefaults.modelValue, value)
  ),
  requestSelection: (value) => {
    if (value !== undefined && !Object.is(propsWithDefaults.modelValue, value)) {
      emit('update:modelValue', value);
    }
  },
});
</script>

<template>
  <div
    class="mat-tabs"
    :class="hostClasses"
    :style="hostStyles"
  >
    <div class="mat-tabs__header">
      <MatBtn
        v-if="propsWithDefaults.scrollable && propsWithDefaults.scrollButtons && canScrollStart"
        class="mat-tabs__scroll-btn mat-tabs__scroll-btn--start"
        icon="chevron_left"
        variant="standard"
        size="small"
        aria-label="向左滚动"
        @click="handleScrollStart"
      />

      <div
        ref="tablistRef"
        class="mat-tabs__tab-list"
        role="tablist"
        @keydown="handleKeydown"
        @focusin="roving.handleFocusIn"
        @scroll="handleScroll"
        @wheel="handleWheel"
      >
        <component
          :is="cloneItem(node, index)"
          v-for="(node, index) in splitVnodes().items"
          :key="node.key ?? index"
        />

        <span
          class="mat-tabs__indicator"
          :class="{ 'mat-tabs__indicator--visible': indicatorVisible }"
          :style="indicatorStyle"
          aria-hidden="true"
        />
      </div>

      <MatBtn
        v-if="propsWithDefaults.scrollable && propsWithDefaults.scrollButtons && canScrollEnd"
        class="mat-tabs__scroll-btn mat-tabs__scroll-btn--end"
        icon="chevron_right"
        variant="standard"
        size="small"
        aria-label="向右滚动"
        @click="handleScrollEnd"
      />
    </div>

    <div
      ref="viewportRef"
      class="mat-tabs__viewport"
    >
      <div
        ref="trackRef"
        class="mat-tabs__track"
        :class="trackClasses"
      >
        <component
          :is="cloneContent(node, index)"
          v-for="(node, index) in splitVnodes().contents"
          :key="node.key ?? index"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@layer mde.components {
  .mat-tabs {
    --mat-tabs-shift: -100%;
    --mat-tabs-indicator-color: var(--mat-accent-color, var(--mat-sys-color-primary));
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    min-inline-size: 0;
    color: var(--mat-sys-color-on-surface);
  }

  .mat-tabs--rtl {
    --mat-tabs-shift: 100%;
  }

  .mat-tabs__header {
    position: relative;
    display: flex;
    align-items: center;
    inline-size: 100%;
    border-block-end: 1px solid var(--mat-sys-color-surface-container-highest);
  }

  .mat-tabs__scroll-btn {
    flex-shrink: 0;
    margin-inline: 4px;
    z-index: 1;
  }

  .mat-tabs__tab-list {
    position: relative;
    display: flex;
    box-sizing: border-box;
    flex: 1 1 auto;
    min-inline-size: 0;
    inline-size: 100%;
    overflow-x: auto;
    scrollbar-width: none;
    transition: mask-image var(--mat-sys-motion-spring-fast-effects);
  }

  /* 可滚动一侧用渐变虚化提示。 */
  .mat-tabs--scroll-start.mat-tabs--scroll-end .mat-tabs__tab-list {
    mask-image: linear-gradient(to right, transparent 0, black 28px, black calc(100% - 28px), transparent 100%);
  }

  .mat-tabs--scroll-start:not(.mat-tabs--scroll-end) .mat-tabs__tab-list {
    mask-image: linear-gradient(to right, transparent 0, black 28px, black 100%);
  }

  .mat-tabs--scroll-end:not(.mat-tabs--scroll-start) .mat-tabs__tab-list {
    mask-image: linear-gradient(to right, black 0, black calc(100% - 28px), transparent 100%);
  }

  .mat-tabs--align-center .mat-tabs__tab-list {
    justify-content: center;
  }

  .mat-tabs--align-end .mat-tabs__tab-list {
    justify-content: flex-end;
  }

  .mat-tabs--scrollable .mat-tabs__tab-list {
    padding-inline: 16px;
  }

  .mat-tabs--scrollable :deep(.mat-tab-item) {
    flex: 0 0 auto;
  }

  .mat-tabs__tab-list::-webkit-scrollbar {
    display: none;
  }

  .mat-tabs__indicator {
    position: absolute;
    inset-block-end: 0;
    inset-inline-start: 0;
    display: block;
    inline-size: 0;
    min-inline-size: var(--mat-tabs-indicator-min-width, 0);
    block-size: var(--mat-tabs-indicator-height, 3px);
    background: var(--mat-tabs-indicator-color);
    border-start-start-radius: var(--mat-tabs-indicator-radius, 3px);
    border-start-end-radius: var(--mat-tabs-indicator-radius, 3px);
    border-end-start-radius: 0;
    border-end-end-radius: 0;
    opacity: 0;
    transition: transform var(--mat-sys-motion-spring-fast-spatial), width var(--mat-sys-motion-spring-fast-spatial), opacity var(--mat-sys-motion-spring-fast-effects);
  }

  .mat-tabs__indicator--visible {
    opacity: 1;
  }

  .mat-tabs--primary {
    --mat-tabs-indicator-height: 3px;
    --mat-tabs-indicator-radius: 3px;
    --mat-tabs-indicator-min-width: 24px;
  }

  .mat-tabs--secondary {
    --mat-tabs-indicator-height: 2px;
    --mat-tabs-indicator-radius: 3px;
    --mat-tabs-indicator-min-width: 0;
  }

  .mat-tabs__viewport {
    overflow: hidden;
    touch-action: pan-y;
  }

  .mat-tabs__track {
    display: flex;
    align-items: stretch;
    min-inline-size: 100%;
    transform: translate3d(calc(var(--mat-tabs-offset, 0) * var(--mat-tabs-shift)), 0, 0);
    transition: transform var(--mat-sys-motion-spring-default-spatial);
  }

  .mat-tabs__track--dragging,
  .mat-tabs__track--suppress {
    transition: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .mat-tabs__indicator,
    .mat-tabs__track {
      transition-duration: 0s;
    }
  }
}
</style>
