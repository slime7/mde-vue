<script setup>
import {
  computed,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
  readonly,
  ref,
  useAttrs,
  watch,
} from 'vue';
import { MAT_APP_ROOT_KEY } from './mat-app-root-context';

const EDGES = ['top', 'bottom', 'start', 'end'];
const BREAKPOINTS = [
  { max: 599, min: 0, name: 'compact' },
  { max: 839, min: 600, name: 'medium' },
  { max: 1199, min: 840, name: 'expanded' },
  { max: 1599, min: 1200, name: 'large' },
  { max: Infinity, min: 1600, name: 'extra-large' },
];

defineOptions({
  name: 'MatAppRoot',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 是否至少铺满动态视口高度。
   *
   * @type {boolean}
   * @default true
   */
  fillViewport: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否让正文层成为内部滚动容器；默认由 document/body 滚动。
   *
   * @type {boolean}
   * @default false
   */
  scrollable: {
    type: Boolean,
    default: false,
  },
});

const parentApp = inject(MAT_APP_ROOT_KEY, null);

if (parentApp) {
  throw new Error('MatAppRoot 不允许嵌套');
}

const attrs = useAttrs();
const rootElement = ref(null);
const edgeLayer = ref(null);
const freeLayer = ref(null);
const snackbarLayer = ref(null);
const floatingLayer = ref(null);
const safeAreaProbe = ref(null);
const layoutState = reactive({
  size: { width: 0, height: 0 },
  padding: {
    top: 0, bottom: 0, start: 0, end: 0,
  },
  content: { width: 0, height: 0 },
  breakpoint: 'compact',
  breakpointRange: { min: 0, max: 599 },
  edges: {
    top: { size: 0, startInset: 0, endInset: 0 },
    bottom: { size: 0, startInset: 0, endInset: 0 },
    start: { size: 0, startInset: 0, endInset: 0 },
    end: { size: 0, startInset: 0, endInset: 0 },
  },
});
const layout = readonly(layoutState);
const safeAreaState = reactive({
  top: 0, bottom: 0, start: 0, end: 0,
});
const rootClass = computed(() => ({
  'mat-app-root--document': props.fillViewport && !props.scrollable,
  'mat-app-root--fill-viewport': props.fillViewport,
  'mat-app-root--scrollable': props.scrollable,
}));
const rootStyle = computed(() => [
  attrs.style,
  {
    '--mat-app-root-padding-top': `${layoutState.padding.top}px`,
    '--mat-app-root-padding-bottom': `${layoutState.padding.bottom}px`,
    '--mat-app-root-padding-start': `${layoutState.padding.start}px`,
    '--mat-app-root-padding-end': `${layoutState.padding.end}px`,
    '--mat-app-root-safe-area-top': `${safeAreaState.top}px`,
    '--mat-app-root-safe-area-bottom': `${safeAreaState.bottom}px`,
    '--mat-app-root-safe-area-start': `${safeAreaState.start}px`,
    '--mat-app-root-safe-area-end': `${safeAreaState.end}px`,
  },
]);
const registrations = [];

let mounted = false;
let resizeObserver;
let measureFrame;
let measureScheduled = false;

function readPixel(value) {
  const parsed = Number.parseFloat(value);

  return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
}

function readSafeArea() {
  if (!safeAreaProbe.value) {
    return {
      top: 0, bottom: 0, start: 0, end: 0,
    };
  }

  const style = window.getComputedStyle(safeAreaProbe.value);
  const direction = window.getComputedStyle(rootElement.value).direction;
  const left = readPixel(style.paddingLeft);
  const right = readPixel(style.paddingRight);

  return {
    top: readPixel(style.paddingTop),
    bottom: readPixel(style.paddingBottom),
    start: direction === 'rtl' ? right : left,
    end: direction === 'rtl' ? left : right,
  };
}

function getAreaRect(rootRect, width, height) {
  if (props.fillViewport && !props.scrollable) {
    return {
      top: 0,
      bottom: height,
      left: rootRect.left,
      right: rootRect.left + width,
    };
  }

  return {
    top: rootRect.top,
    bottom: rootRect.bottom,
    left: rootRect.left,
    right: rootRect.right,
  };
}

function edgeExtent(edge, rect, area, direction) {
  if (edge === 'top') {
    return Math.max(0, rect.bottom - area.top);
  }

  if (edge === 'bottom') {
    return Math.max(0, area.bottom - rect.top);
  }

  if (edge === 'start') {
    return direction === 'rtl'
      ? Math.max(0, area.right - rect.left)
      : Math.max(0, rect.right - area.left);
  }

  return direction === 'rtl'
    ? Math.max(0, rect.right - area.left)
    : Math.max(0, area.right - rect.left);
}

function registrationInsets(edge, sizes) {
  if (edge === 'top' || edge === 'bottom') {
    return { start: sizes.start, end: sizes.end };
  }

  return { start: sizes.top, end: sizes.bottom };
}

function measureLayout() {
  if (!mounted || !rootElement.value) {
    return;
  }

  const rootRect = rootElement.value.getBoundingClientRect();
  const width = Math.max(0, Number(rootRect.width) || 0);
  const measuredHeight = Math.max(0, Number(rootRect.height) || 0);
  const height = props.fillViewport && !props.scrollable
    ? Math.max(0, Number(window.innerHeight) || measuredHeight)
    : measuredHeight;
  const breakpoint = BREAKPOINTS.find((item) => width <= item.max) ?? BREAKPOINTS.at(-1);
  const safeArea = readSafeArea();
  const sizes = { ...safeArea };
  const edgeInsets = {
    top: { startInset: 0, endInset: 0 },
    bottom: { startInset: 0, endInset: 0 },
    start: { startInset: 0, endInset: 0 },
    end: { startInset: 0, endInset: 0 },
  };
  const area = getAreaRect(rootRect, width, height);
  const direction = window.getComputedStyle(rootElement.value).direction;

  Object.assign(safeAreaState, safeArea);

  registrations.forEach((registration) => {
    if (!registration.active) {
      return;
    }

    const insets = registrationInsets(registration.edge, sizes);
    const mutableInsets = registration.insets;

    mutableInsets.start = insets.start;
    mutableInsets.end = insets.end;
    edgeInsets[registration.edge].startInset = Math.max(
      edgeInsets[registration.edge].startInset,
      insets.start,
    );
    edgeInsets[registration.edge].endInset = Math.max(
      edgeInsets[registration.edge].endInset,
      insets.end,
    );
    const rect = registration.element.getBoundingClientRect();
    const extent = edgeExtent(registration.edge, rect, area, direction);

    sizes[registration.edge] = Math.max(sizes[registration.edge], extent);
  });

  Object.assign(layoutState.size, { width, height });
  Object.assign(layoutState.padding, sizes);
  Object.assign(layoutState.content, {
    width: Math.max(0, width - sizes.start - sizes.end),
    height: Math.max(0, height - sizes.top - sizes.bottom),
  });
  layoutState.breakpoint = breakpoint.name;
  Object.assign(layoutState.breakpointRange, {
    min: breakpoint.min,
    max: breakpoint.max,
  });
  EDGES.forEach((edge) => {
    Object.assign(layoutState.edges[edge], {
      size: sizes[edge],
      ...edgeInsets[edge],
    });
  });
}

function scheduleMeasure() {
  if (!mounted || measureScheduled) {
    return;
  }

  measureScheduled = true;
  const run = () => {
    measureScheduled = false;
    measureFrame = undefined;
    measureLayout();
  };

  if (typeof window.requestAnimationFrame === 'function') {
    measureFrame = window.requestAnimationFrame(run);
    return;
  }

  measureFrame = window.setTimeout(run, 0);
}

/**
 * 注册占用应用布局边缘的元素。
 *
 * @param {{edge: 'top' | 'bottom' | 'start' | 'end', element: HTMLElement}} options
 * @returns {{insets: Readonly<{start: number, end: number}>, update: () => void, unregister: () => void}}
 * @throws {TypeError} edge 或 element 无效时抛出。
 */
function registerEdge({ edge, element } = {}) {
  if (!EDGES.includes(edge)) {
    throw new TypeError('registerEdge() 的 edge 必须是 top、bottom、start 或 end');
  }

  if (!(element instanceof HTMLElement) || element.ownerDocument !== document) {
    throw new TypeError('registerEdge() 的 element 必须是当前 document 中的 HTMLElement');
  }

  const insets = reactive({ start: 0, end: 0 });
  const registration = {
    active: true,
    edge,
    element,
    insets,
  };
  const unregister = () => {
    if (!registration.active) {
      return;
    }

    registration.active = false;
    resizeObserver?.unobserve?.(element);
    scheduleMeasure();
  };
  const update = () => {
    if (!registration.active) {
      return;
    }

    scheduleMeasure();
  };

  registrations.push(registration);
  resizeObserver?.observe(element);
  scheduleMeasure();

  return Object.freeze({
    insets: readonly(insets),
    unregister,
    update,
  });
}

const publicContext = Object.freeze({
  layout,
  registerEdge,
});

function getLayoutRect() {
  const rect = rootElement.value?.getBoundingClientRect() ?? {
    top: 0, bottom: 0, left: 0, right: 0,
  };

  if (props.fillViewport && !props.scrollable) {
    return {
      top: 0,
      bottom: layoutState.size.height,
      left: rect.left,
      right: rect.left + layoutState.size.width,
      width: layoutState.size.width,
      height: layoutState.size.height,
    };
  }

  return {
    top: rect.top,
    bottom: rect.bottom,
    left: rect.left,
    right: rect.right,
    width: layoutState.size.width,
    height: layoutState.size.height,
  };
}

provide(MAT_APP_ROOT_KEY, {
  publicContext,
  rootElement: readonly(rootElement),
  edgeLayer: readonly(edgeLayer),
  freeLayer: readonly(freeLayer),
  snackbarLayer: readonly(snackbarLayer),
  floatingLayer: readonly(floatingLayer),
  getLayoutRect,
});

function addViewportListeners() {
  window.addEventListener('resize', scheduleMeasure);
  document.addEventListener('scroll', scheduleMeasure, true);
  window.visualViewport?.addEventListener('resize', scheduleMeasure);
  window.visualViewport?.addEventListener('scroll', scheduleMeasure);
}

function removeViewportListeners() {
  window.removeEventListener('resize', scheduleMeasure);
  document.removeEventListener('scroll', scheduleMeasure, true);
  window.visualViewport?.removeEventListener('resize', scheduleMeasure);
  window.visualViewport?.removeEventListener('scroll', scheduleMeasure);
}

onMounted(async () => {
  mounted = true;
  resizeObserver = typeof ResizeObserver === 'undefined'
    ? undefined
    : new ResizeObserver(scheduleMeasure);
  resizeObserver?.observe(rootElement.value);
  registrations.forEach((registration) => {
    if (registration.active) {
      resizeObserver?.observe(registration.element);
    }
  });
  addViewportListeners();
  await nextTick();
  scheduleMeasure();
});

onBeforeUnmount(() => {
  mounted = false;
  resizeObserver?.disconnect();
  resizeObserver = undefined;
  removeViewportListeners();

  if (measureFrame !== undefined) {
    if (typeof window.cancelAnimationFrame === 'function') {
      window.cancelAnimationFrame(measureFrame);
    } else {
      window.clearTimeout(measureFrame);
    }
  }
});

watch([
  () => props.fillViewport,
  () => props.scrollable,
], scheduleMeasure);
</script>

<template>
  <div
    ref="rootElement"
    v-bind="$attrs"
    class="mat-app-root"
    :class="rootClass"
    :data-scrollable="String(scrollable)"
    :style="rootStyle"
  >
    <div class="mat-app-root__content">
      <slot />
    </div>

    <div class="mat-app-root__overlay">
      <div ref="edgeLayer" class="mat-app-root__edge-layer" />
      <div ref="freeLayer" class="mat-app-root__free-layer" />

      <div class="mat-app-root__bottom-stack">
        <span class="mat-app-root__stack-spacer" aria-hidden="true" />
        <div ref="snackbarLayer" class="mat-app-root__snackbar-layer" />
        <div ref="floatingLayer" class="mat-app-root__floating-layer" />
      </div>
    </div>

    <span ref="safeAreaProbe" class="mat-app-root__safe-area-probe" aria-hidden="true" />
  </div>
</template>

<style scoped>
.mat-app-root {
  --mat-app-root-floating-edge-space: var(--mat-sys-spacing-4, 16px);
  position: relative;
  isolation: isolate;
  box-sizing: border-box;
  inline-size: 100%;
  min-inline-size: 0;
}

.mat-app-root--fill-viewport {
  min-block-size: 100dvb;
}

.mat-app-root--scrollable {
  overflow: hidden;
}

.mat-app-root--fill-viewport.mat-app-root--scrollable {
  block-size: 100dvb;
}

.mat-app-root__content {
  box-sizing: border-box;
  min-inline-size: 0;
  padding-block: var(--mat-app-root-padding-top) var(--mat-app-root-padding-bottom);
  padding-inline: var(--mat-app-root-padding-start) var(--mat-app-root-padding-end);
}

.mat-app-root--fill-viewport .mat-app-root__content {
  min-block-size: 100dvb;
}

.mat-app-root--scrollable .mat-app-root__content {
  block-size: 100%;
  min-block-size: 0;
  overflow: auto;
  overscroll-behavior: contain;
}

.mat-app-root__overlay,
.mat-app-root__edge-layer,
.mat-app-root__free-layer,
.mat-app-root__bottom-stack {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.mat-app-root--document .mat-app-root__overlay {
  position: fixed;
}

.mat-app-root__bottom-stack {
  display: flex;
  min-inline-size: 0;
  flex-direction: column;
  gap: var(--mat-sys-spacing-4, 16px);
  padding-block: var(--mat-app-root-padding-top) calc(
    var(--mat-app-root-padding-bottom)
    + var(--mat-app-root-floating-edge-space)
  );
  padding-inline: calc(
    var(--mat-app-root-padding-start)
    + var(--mat-app-root-floating-edge-space)
  ) calc(
    var(--mat-app-root-padding-end)
    + var(--mat-app-root-floating-edge-space)
  );
}

.mat-app-root__stack-spacer {
  flex-grow: 1;
  min-block-size: 0;
}

.mat-app-root__snackbar-layer,
.mat-app-root__floating-layer {
  box-sizing: border-box;
  display: flex;
  flex: 0 0 auto;
  min-inline-size: 0;
  flex-direction: column;
  align-items: stretch;
  gap: var(--mat-sys-spacing-4, 16px);
  padding-inline: var(--mat-app-root-floating-edge-space);
  pointer-events: none;
}

.mat-app-root__safe-area-probe {
  position: absolute;
  inline-size: 0;
  block-size: 0;
  padding-block: env(safe-area-inset-top, 0) env(safe-area-inset-bottom, 0);
  padding-inline: env(safe-area-inset-left, 0) env(safe-area-inset-right, 0);
  visibility: hidden;
  pointer-events: none;
}
</style>
