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
import { MAT_LAYOUT_KEY } from './layout-context';
import { useMatProps } from '../use-mat-props';

const EDGES = ['top', 'bottom', 'left', 'right', 'start', 'end'];

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

const registrations = [];
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
  const currentInsets = {
    top: 0, bottom: 0, left: 0, right: 0, start: 0, end: 0,
  };

  const activeRegistrations = registrations.filter((r) => r.active);
  activeRegistrations.sort((a, b) => {
    if (a.element === b.element) {
      return 0;
    }
    if (a.element.isConnected && b.element.isConnected) {
      const position = a.element.compareDocumentPosition(b.element);
      if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
        return -1;
      }
      if (position & Node.DOCUMENT_POSITION_PRECEDING) {
        return 1;
      }
    }
    return registrations.indexOf(a) - registrations.indexOf(b);
  });

  activeRegistrations.forEach((registration) => {
    const rect = registration.element.getBoundingClientRect();
    const edge = registration.edge;
    const mutableInsets = registration.insets;

    if (edge === 'top') {
      const extent = Math.max(0, Number(rect.height) || (rect.bottom - rect.top) || 0);
      mutableInsets.top = currentInsets.top;
      mutableInsets.left = currentInsets.left;
      mutableInsets.start = currentInsets.left;
      mutableInsets.right = currentInsets.right;
      mutableInsets.end = currentInsets.right;
      mutableInsets.bottom = 0;
      mutableInsets.offset = currentInsets.top;
      currentInsets.top += extent;
    } else if (edge === 'bottom') {
      const extent = Math.max(0, Number(rect.height) || (rect.bottom - rect.top) || 0);
      mutableInsets.bottom = currentInsets.bottom;
      mutableInsets.left = currentInsets.left;
      mutableInsets.start = currentInsets.left;
      mutableInsets.right = currentInsets.right;
      mutableInsets.end = currentInsets.right;
      mutableInsets.top = 0;
      mutableInsets.offset = currentInsets.bottom;
      currentInsets.bottom += extent;
    } else if (edge === 'left' || edge === 'start') {
      const extent = Math.max(0, Number(rect.width) || (rect.right - rect.left) || 0);
      mutableInsets.left = currentInsets.left;
      mutableInsets.start = currentInsets.left;
      mutableInsets.top = currentInsets.top;
      mutableInsets.bottom = currentInsets.bottom;
      mutableInsets.right = 0;
      mutableInsets.end = 0;
      mutableInsets.offset = currentInsets.left;
      currentInsets.left += extent;
      currentInsets.start += extent;
    } else if (edge === 'right' || edge === 'end') {
      const extent = Math.max(0, Number(rect.width) || (rect.right - rect.left) || 0);
      mutableInsets.right = currentInsets.right;
      mutableInsets.end = currentInsets.right;
      mutableInsets.top = currentInsets.top;
      mutableInsets.bottom = currentInsets.bottom;
      mutableInsets.left = 0;
      mutableInsets.start = 0;
      mutableInsets.offset = currentInsets.right;
      currentInsets.right += extent;
      currentInsets.end += extent;
    }
  });

  Object.assign(layoutState.size, { width, height });
  Object.assign(layoutState.padding, currentInsets);
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

function registerEdge({ edge, element } = {}) {
  if (!EDGES.includes(edge)) {
    throw new TypeError('registerEdge() 的 edge 必须是 top、bottom、left、right、start 或 end');
  }

  if (!(element instanceof HTMLElement) || element.ownerDocument !== document) {
    throw new TypeError('registerEdge() 的 element 必须是当前 document 中的 HTMLElement');
  }

  const insets = reactive({
    bottom: 0,
    end: 0,
    left: 0,
    offset: 0,
    right: 0,
    start: 0,
    top: 0,
  });
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
  padding: layoutState.padding,
  size: layoutState.size,
  registerEdge,
});

provide(MAT_LAYOUT_KEY, {
  publicContext,
  rootElement: readonly(rootElement),
  contentElement: readonly(contentElement),
});

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
  window.addEventListener('resize', scheduleMeasure);
  await nextTick();
  scheduleMeasure();
});

onBeforeUnmount(() => {
  mounted = false;
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
    <div ref="contentElement" class="mat-layout__content">
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
    box-sizing: border-box;
    inline-size: 100%;
    min-inline-size: 0;
    padding: var(--mat-layout-padding-top, 0) var(--mat-layout-padding-right, 0) var(--mat-layout-padding-bottom, 0) var(--mat-layout-padding-left, 0);
    transition: padding-top var(--mat-sys-motion-spring-default-spatial, .3s ease), padding-bottom var(--mat-sys-motion-spring-default-spatial, .3s ease), padding-left var(--mat-sys-motion-spring-default-spatial, .3s ease), padding-right var(--mat-sys-motion-spring-default-spatial, .3s ease);
  }
}
</style>
