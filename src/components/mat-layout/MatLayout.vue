<script setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
  readonly,
  ref,
  useAttrs,
} from 'vue';
import { createEdgeLayoutController } from '../layout/edge-layout';
import { MAT_EDGE_LAYOUT_KEY } from '../layout/edge-layout-context';
import { MAT_LAYOUT_KEY } from './layout-context';
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatLayout',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 根元素渲染的 HTML 标签。
   *
   * @type {string}
   * @default 'div'
   */
  as: {
    type: String,
    default: 'div',
  },
});
const propsWithDefaults = useMatProps('layout', props);

const attrs = useAttrs();
const rootElement = ref(null);
const contentElement = ref(null);
const layoutState = reactive({
  size: { width: 0, height: 0 },
  padding: {
    top: 0, bottom: 0, left: 0, right: 0, start: 0, end: 0,
  },
});
const layout = readonly(layoutState);

const rootStyle = computed(() => [
  attrs.style,
  {
    '--mat-layout-padding-top': `${layoutState.padding.top}px`,
    '--mat-layout-padding-bottom': `${layoutState.padding.bottom}px`,
    '--mat-layout-padding-left': `${layoutState.padding.left}px`,
    '--mat-layout-padding-right': `${layoutState.padding.right}px`,
    '--mat-layout-padding-start': `${layoutState.padding.start}px`,
    '--mat-layout-padding-end': `${layoutState.padding.end}px`,
  },
]);

let mounted = false;
let resizeObserver;
let measureFrame;
let measureScheduled = false;

function measureLayout() {
  if (!mounted || !rootElement.value) {
    return;
  }

  const rootRect = rootElement.value.getBoundingClientRect();
  const width = Math.max(0, Number(rootRect.width) || 0);
  const height = Math.max(0, Number(rootRect.height) || 0);
  const measured = edgeLayout.measure({ width, height });

  Object.assign(layoutState.size, measured.size);
  Object.assign(layoutState.padding, measured.padding);
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

  if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
    measureFrame = window.requestAnimationFrame(run);
    return;
  }

  measureFrame = setTimeout(run, 0);
}

const edgeLayout = createEdgeLayoutController({ scheduleMeasure });

/**
 * 注册占用布局边缘的元素。
 *
 * @param {{edge: 'top' | 'bottom' | 'left' | 'right' | 'start' | 'end', element: HTMLElement}} options
 * @returns {{insets: Readonly<object>, update: () => void, unregister: () => void}}
 * @throws {TypeError} edge 或 element 无效时抛出。
 */
const registerEdge = edgeLayout.registerEdge;

const publicContext = Object.freeze({
  layout,
  padding: layoutState.padding,
  size: layoutState.size,
  registerEdge,
});

const layoutContext = {
  publicContext,
  rootElement: readonly(rootElement),
  contentElement: readonly(contentElement),
};

provide(MAT_LAYOUT_KEY, layoutContext);
provide(MAT_EDGE_LAYOUT_KEY, {
  kind: 'layout',
  ...layoutContext,
});

onMounted(async () => {
  mounted = true;
  resizeObserver = typeof ResizeObserver === 'undefined'
    ? undefined
    : new ResizeObserver(scheduleMeasure);
  resizeObserver?.observe(rootElement.value);
  edgeLayout.setResizeObserver(resizeObserver);
  window.addEventListener('resize', scheduleMeasure);
  await nextTick();
  scheduleMeasure();
});

onBeforeUnmount(() => {
  mounted = false;
  edgeLayout.setResizeObserver(undefined);
  resizeObserver?.disconnect();
  resizeObserver = undefined;
  window.removeEventListener('resize', scheduleMeasure);

  if (measureFrame !== undefined) {
    if (typeof window !== 'undefined' && typeof window.cancelAnimationFrame === 'function') {
      window.cancelAnimationFrame(measureFrame);
    } else {
      clearTimeout(measureFrame);
    }
  }
});
</script>

<template>
  <component
    :is="propsWithDefaults.as"
    ref="rootElement"
    v-bind="$attrs"
    class="mat-layout"
    :style="rootStyle"
  >
    <div ref="contentElement" class="mat-layout__content mat-edge-layout__content">
      <slot />
    </div>
  </component>
</template>

<style scoped>
@layer mde.components {
  .mat-layout {
    position: relative;
    isolation: isolate;
    box-sizing: border-box;
    inline-size: 100%;
    min-inline-size: 0;
  }

  .mat-layout__content {
    inline-size: 100%;
    padding: var(--mat-layout-padding-top, 0) var(--mat-layout-padding-right, 0) var(--mat-layout-padding-bottom, 0) var(--mat-layout-padding-left, 0);
  }
}
</style>
<style scoped src="../layout/edge-layout.css"></style>
