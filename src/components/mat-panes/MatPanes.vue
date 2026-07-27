<script setup>
import {
  computed, nextTick, onBeforeUnmount, onMounted, provide, ref, shallowReactive, watch,
} from 'vue';
import { MAT_PANES_BREAKPOINTS, MAT_PANES_KEY } from '../panes-context';

defineOptions({
  name: 'MatPanes',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 受控 Pane 权重映射，键为 MatPane.id，值为非负有限数字。
   *
   * @type {Record<string, number>}
   * @required
   */
  sizes: {
    type: Object,
    required: true,
    validator(value) {
      return value !== null
        && !Array.isArray(value)
        && Object.values(value).every((item) => (
          typeof item === 'number' && Number.isFinite(item) && item >= 0
        ));
    },
  },
  /**
   * 是否允许通过分隔控件调整 Pane 权重。
   *
   * @type {boolean}
   * @default true
   */
  resizable: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits({
  /**
   * 拖动或键盘调整提交后发出新的权重映射。
   */
  'update:sizes': (payload) => (
    payload !== null
      && !Array.isArray(payload)
      && Object.values(payload).every((item) => (
        typeof item === 'number' && Number.isFinite(item) && item >= 0
      ))
  ),
  /**
   * 实际 Pane 宽度稳定后发出取整像素宽度映射。
   */
  'update:widths': (payload) => (
    payload !== null
      && !Array.isArray(payload)
      && Object.values(payload).every((item) => (
        typeof item === 'number' && Number.isInteger(item) && item >= 0
      ))
  ),
  /**
   * 视口跨越响应式断点时发出断点名称。
   */
  'update:breakpoint': (payload) => MAT_PANES_BREAKPOINTS.includes(payload),
});

const root = ref(null);
const panes = shallowReactive([]);
const previewWeights = ref(null);
const activeBoundaryKey = ref(null);
const currentBreakpoint = ref(null);
const collapsedPositions = new Map();
let dragState;
let resizeObserver;
let widthTimer;
let previewClearTimer;
let lastWidths;

const displayedWeights = computed(() => previewWeights.value ?? normalizedWeights.value);

const normalizedWeights = computed(() => {
  const result = {};

  panes.forEach((pane) => {
    const value = props.sizes?.[pane.id];

    result[pane.id] = typeof value === 'number'
      && Number.isFinite(value)
      && value >= 0
      ? value
      : 1;
  });

  const total = Object.values(result).reduce((sum, value) => sum + value, 0);

  if (total === 0 && panes.length > 0) {
    panes.forEach((pane) => {
      result[pane.id] = 1;
    });
  }

  return result;
});

/**
 * @param {number} value
 * @param {number} minimum
 * @param {number} maximum
 * @returns {number}
 */
function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum);
}

/**
 * @param {string} leftId
 * @param {string} rightId
 * @returns {string}
 */
function getBoundaryKey(leftId, rightId) {
  return `${leftId}::${rightId}`;
}

/**
 * @param {string} id
 * @returns {number}
 */
function getPaneIndex(id) {
  return panes.findIndex((pane) => pane.id === id);
}

/**
 * @param {string} id
 * @returns {HTMLElement | null}
 */
function getPaneElement(id) {
  const pane = panes.find((item) => item.id === id);

  return pane?.element.value ?? null;
}

/**
 * @param {string} id
 * @returns {number}
 */
function getPaneWidth(id) {
  const element = getPaneElement(id);

  if (!element) {
    return 0;
  }

  return element.getBoundingClientRect().width;
}

/**
 * @param {string} id
 * @returns {{ key: string, left: object, right: object } | null}
 */
function getBoundary(id) {
  const index = getPaneIndex(id);

  if (index < 0 || index >= panes.length - 1) {
    return null;
  }

  const left = panes[index];
  const right = panes[index + 1];

  return {
    key: getBoundaryKey(left.id, right.id),
    left,
    right,
  };
}

/**
 * @param {string} id
 * @returns {number}
 */
function getDisplayedWeight(id) {
  return displayedWeights.value[id] ?? 0;
}

/**
 * @param {string} id
 * @returns {object}
 */
function getPaneStyle(id) {
  return {
    '--mat-pane-weight': getDisplayedWeight(id),
  };
}

/**
 * @param {string} id
 * @returns {boolean}
 */
function isHandleVisible(id) {
  return props.resizable && getBoundary(id) !== null;
}

/**
 * @param {string} id
 * @returns {boolean}
 */
function hasBoundary(id) {
  return getBoundary(id) !== null;
}

/**
 * @param {string} id
 * @returns {boolean}
 */
function isBoundaryActive(id) {
  return getBoundary(id)?.key === activeBoundaryKey.value;
}

/**
 * @param {string} id
 * @returns {Record<string, string | undefined>}
 */
function getHandleAttributes(id) {
  const boundary = getBoundary(id);

  if (!boundary) {
    return {};
  }

  const totalWeight = getDisplayedWeight(boundary.left.id) + getDisplayedWeight(boundary.right.id);
  const value = totalWeight === 0
    ? 50
    : Math.round((getDisplayedWeight(boundary.left.id) / totalWeight) * 100);

  return {
    'aria-controls': boundary.left.id,
    'aria-label': boundary.left.resizeLabel.value,
    'aria-orientation': 'vertical',
    'aria-valuemax': '100',
    'aria-valuemin': '0',
    'aria-valuenow': String(value),
  };
}

/**
 * @returns {Record<string, number>}
 */
function getCurrentWeights() {
  return { ...displayedWeights.value };
}

/**
 * @param {Record<string, number>} weights
 */
function schedulePreviewClear(weights) {
  if (previewClearTimer !== undefined) {
    globalThis.clearTimeout(previewClearTimer);
  }

  previewClearTimer = globalThis.setTimeout(() => {
    previewClearTimer = undefined;

    if (previewWeights.value === weights) {
      previewWeights.value = null;
    }
  }, 0);
}

/**
 * @param {Record<string, number>} weights
 */
function commitWeights(weights) {
  const nextWeights = {};

  panes.forEach((pane) => {
    nextWeights[pane.id] = Math.max(0, weights[pane.id] ?? 0);
  });

  previewWeights.value = nextWeights;
  emit('update:sizes', nextWeights);
  schedulePreviewClear(nextWeights);
}

/**
 * @param {string} leftId
 * @param {string} rightId
 * @param {number} leftPixels
 * @param {number} totalPixels
 * @param {Record<string, number>} baseWeights
 * @returns {Record<string, number>}
 */
function createWeightsAtPosition(leftId, rightId, leftPixels, totalPixels, baseWeights) {
  const leftWeight = baseWeights[leftId] ?? 0;
  const rightWeight = baseWeights[rightId] ?? 0;
  const totalWeight = leftWeight + rightWeight || 2;
  const ratio = totalPixels === 0 ? 0.5 : clamp(leftPixels / totalPixels, 0, 1);
  const nextWeights = { ...baseWeights };

  nextWeights[leftId] = totalWeight * ratio;
  nextWeights[rightId] = totalWeight - nextWeights[leftId];

  return nextWeights;
}

/**
 * @param {string} id
 * @returns {{ leftWidth: number, rightWidth: number, totalWidth: number } | null}
 */
function getBoundaryMetrics(id) {
  const boundary = getBoundary(id);

  if (!boundary) {
    return null;
  }

  const leftWidth = getPaneWidth(boundary.left.id);
  const rightWidth = getPaneWidth(boundary.right.id);

  return {
    leftWidth,
    rightWidth,
    totalWidth: leftWidth + rightWidth,
  };
}

/**
 * @param {string} id
 * @param {PointerEvent} event
 */
function handlePointerDown(id, event) {
  if (!props.resizable || dragState || event.button !== undefined && event.button !== 0) {
    return;
  }

  const boundary = getBoundary(id);
  const metrics = getBoundaryMetrics(id);

  if (!boundary || !metrics) {
    return;
  }

  event.preventDefault();
  event.currentTarget?.setPointerCapture?.(event.pointerId);
  activeBoundaryKey.value = boundary.key;
  dragState = {
    boundary,
    changed: false,
    metrics,
    pointerId: event.pointerId,
    startWeights: getCurrentWeights(),
    startX: event.clientX,
  };
}

/**
 * @param {string} id
 * @param {PointerEvent} event
 */
function handlePointerMove(id, event) {
  if (!dragState || dragState.pointerId !== event.pointerId) {
    return;
  }

  const boundary = getBoundary(id);

  if (!boundary || boundary.key !== dragState.boundary.key) {
    return;
  }

  const leftPixels = clamp(
    dragState.metrics.leftWidth + event.clientX - dragState.startX,
    0,
    dragState.metrics.totalWidth,
  );

  previewWeights.value = createWeightsAtPosition(
    boundary.left.id,
    boundary.right.id,
    leftPixels,
    dragState.metrics.totalWidth,
    dragState.startWeights,
  );
  dragState.changed = true;
}

/**
 * @param {string} id
 * @param {PointerEvent} event
 * @param {boolean} shouldCommit
 */
function finishPointerInteraction(id, event, shouldCommit) {
  if (!dragState || dragState.pointerId !== event.pointerId) {
    return;
  }

  const boundary = getBoundary(id);
  const changed = dragState.changed;
  const nextWeights = previewWeights.value;

  dragState = undefined;
  activeBoundaryKey.value = null;

  if (shouldCommit && changed && nextWeights && boundary) {
    commitWeights(nextWeights);
    return;
  }

  previewWeights.value = null;
}

/**
 * @param {string} id
 * @param {KeyboardEvent} event
 */
function handleKeyDown(id, event) {
  const boundary = getBoundary(id);

  if (!boundary || !props.resizable) {
    return;
  }

  const direction = {
    ArrowLeft: -1,
    ArrowRight: 1,
  }[event.key];
  const metrics = getBoundaryMetrics(id);
  const weights = getCurrentWeights();
  const pairWeight = weights[boundary.left.id] + weights[boundary.right.id] || 2;
  const totalPixels = metrics?.totalWidth || 100;
  const currentLeftPixels = totalPixels * (weights[boundary.left.id] / pairWeight);
  let nextLeftPixels;

  if (direction !== undefined) {
    const step = event.shiftKey ? 64 : 16;

    nextLeftPixels = clamp(currentLeftPixels + (direction * step), 0, totalPixels);
  } else if (event.key === 'Home') {
    nextLeftPixels = 0;
  } else if (event.key === 'End') {
    nextLeftPixels = totalPixels;
  } else if (event.key === 'Enter') {
    const key = boundary.key;
    const leftWeight = weights[boundary.left.id];

    if (leftWeight === 0) {
      const previousPosition = collapsedPositions.get(key) ?? 0.5;

      nextLeftPixels = totalPixels * previousPosition;
    } else {
      collapsedPositions.set(key, leftWeight / pairWeight);
      nextLeftPixels = 0;
    }
  } else {
    return;
  }

  event.preventDefault();
  commitWeights(createWeightsAtPosition(
    boundary.left.id,
    boundary.right.id,
    nextLeftPixels,
    totalPixels,
    weights,
  ));
}

/**
 * @param {object} record
 * @returns {() => void}
 */
function registerPane(record) {
  if (panes.some((pane) => pane.id === record.id)) {
    console.warn(`MatPanes: Pane id 必须唯一，重复值为 ${record.id}`);
  }

  panes.push(record);

  return () => {
    const index = panes.indexOf(record);

    if (index !== -1) {
      panes.splice(index, 1);
    }
  };
}

function validateSizes() {
  const ids = new Set();

  panes.forEach((pane) => {
    if (ids.has(pane.id)) {
      return;
    }

    ids.add(pane.id);

    if (!(pane.id in props.sizes)) {
      console.warn(`MatPanes: sizes 缺少 Pane ${pane.id} 的权重`);
    }
  });
}

function getWidths() {
  const widths = {};

  panes.forEach((pane) => {
    const element = pane.element.value;

    if (element) {
      widths[pane.id] = Math.max(0, Math.round(element.getBoundingClientRect().width));
    }
  });

  return widths;
}

/**
 * @param {Record<string, number>} previous
 * @param {Record<string, number>} next
 * @returns {boolean}
 */
function areWidthsEqual(previous, next) {
  const previousKeys = Object.keys(previous ?? {});
  const nextKeys = Object.keys(next);

  if (previousKeys.length !== nextKeys.length) {
    return false;
  }

  return nextKeys.every((key) => previous[key] === next[key]);
}

function emitWidths() {
  widthTimer = undefined;
  const widths = getWidths();

  if (!areWidthsEqual(lastWidths, widths)) {
    lastWidths = widths;
    emit('update:widths', widths);
  }
}

/**
 * @param {boolean} immediate
 */
function scheduleWidthEmit(immediate = false) {
  if (widthTimer !== undefined) {
    globalThis.clearTimeout(widthTimer);
  }

  widthTimer = globalThis.setTimeout(emitWidths, immediate ? 0 : 100);
}

function observeWidths() {
  if (typeof globalThis.ResizeObserver !== 'function') {
    return;
  }

  if (!resizeObserver) {
    resizeObserver = new globalThis.ResizeObserver(() => {
      scheduleWidthEmit();
    });
  }

  resizeObserver.disconnect();

  if (root.value) {
    resizeObserver.observe(root.value);
  }

  panes.forEach((pane) => {
    if (pane.element.value) {
      resizeObserver.observe(pane.element.value);
    }
  });
}

/**
 * @param {number} width
 * @returns {string}
 */
function resolveBreakpoint(width) {
  if (width < 600) {
    return 'compact';
  }

  if (width < 840) {
    return 'medium';
  }

  if (width < 1200) {
    return 'expanded';
  }

  if (width < 1600) {
    return 'large';
  }

  return 'extra-large';
}

/**
 * @param {boolean} force
 */
function updateBreakpoint(force = false) {
  const width = typeof globalThis.window === 'undefined' ? 0 : globalThis.window.innerWidth;
  const nextBreakpoint = resolveBreakpoint(width);

  if (force || currentBreakpoint.value !== nextBreakpoint) {
    currentBreakpoint.value = nextBreakpoint;
    emit('update:breakpoint', nextBreakpoint);
  }
}

function handleWindowResize() {
  updateBreakpoint();
}

const context = {
  getHandleAttributes,
  getPaneStyle,
  hasBoundary,
  handleKeyDown,
  handlePointerDown,
  handlePointerMove,
  isBoundaryActive,
  isHandleVisible,
  registerPane,
  finishPointerInteraction,
};

provide(MAT_PANES_KEY, context);

watch(
  () => panes.map((pane) => pane.id),
  async () => {
    await nextTick();
    validateSizes();
    observeWidths();
    scheduleWidthEmit();
  },
  { flush: 'post', immediate: true },
);
watch(
  () => props.sizes,
  () => {
    previewWeights.value = null;
  },
  { deep: true },
);

onMounted(() => {
  updateBreakpoint(true);
  observeWidths();
  scheduleWidthEmit(true);

  if (typeof globalThis.window !== 'undefined') {
    globalThis.window.addEventListener('resize', handleWindowResize);
  }
});

onBeforeUnmount(() => {
  if (typeof globalThis.window !== 'undefined') {
    globalThis.window.removeEventListener('resize', handleWindowResize);
  }

  resizeObserver?.disconnect();

  if (widthTimer !== undefined) {
    globalThis.clearTimeout(widthTimer);
  }

  if (previewClearTimer !== undefined) {
    globalThis.clearTimeout(previewClearTimer);
  }
});
</script>

<template>
  <div
    ref="root"
    v-bind="$attrs"
    class="mat-panes"
  >
    <slot />
  </div>
</template>

<style scoped>
.mat-panes {
  display: flex;
  align-items: stretch;
  box-sizing: border-box;
  inline-size: 100%;
  block-size: 100%;
  min-inline-size: 0;
  min-block-size: 0;
  overflow: hidden;
}
</style>
