<script setup>
import {
  computed, nextTick, onMounted, provide, ref, watch,
} from 'vue';
import { isComponentColor } from '../button-props';
import {
  isSelectableInteraction, LIST_INTERACTIONS, MAT_LIST_KEY,
} from '../list-context';
import useComponentColor from '../use-component-color';
import useRovingFocus from '../use-roving-focus';
import { isSelectionValue } from '../selection-control';
import { useMatProps } from '../use-mat-props';
import { isValidCssLength } from '../value-utils';
import useVirtualScroll from '../mat-virtual-scroll/use-virtual-scroll';
import useListDragSort from './use-list-drag-sort';

defineOptions({
  name: 'MatList',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 列表布局形态；可选值为 `standard`、`segmented`。
   *
   * @type {'standard' | 'segmented'}
   * @default 'segmented'
   */
  variant: {
    type: String,
    default: 'segmented',
    validator(value) {
      return ['standard', 'segmented'].includes(value);
    },
  },
  /**
   * 交互模式；可选值为 `none`、`single-select`、`multi-select`。
   *
   * @type {string}
   * @default 'none'
   */
  interaction: {
    type: String,
    default: 'none',
    validator(value) {
      return LIST_INTERACTIONS.includes(value);
    },
  },
  /**
   * 受控选中值；single-select 使用单值，multi-select 使用数组。
   *
   * @type {string | number | boolean | Array<string | number | boolean> | null}
   * @default null
   */
  selected: {
    type: [String, Number, Boolean, Array],
    default: null,
  },
  /**
   * 受控展开分组的 value 数组。
   *
   * @type {Array<string | number | boolean>}
   * @default []
   */
  expanded: {
    type: Array,
    default: () => [],
    validator(value) {
      return value.every(isSelectionValue);
    },
  },
  /**
   * 语义色或六位十六进制种子色 `#RRGGBB`。
   *
   * @type {string | undefined}
   * @default undefined
   */
  color: {
    type: String,
    default: undefined,
    validator: isComponentColor,
  },
  /**
   * 是否允许通过长按直属项目请求拖动排序。
   *
   * @type {boolean}
   * @default false
   */
  draggable: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否启用虚拟滚动优化长列表性能。
   *
   * @type {boolean}
   * @default false
   */
  virtual: {
    type: Boolean,
    default: false,
  },
  /**
   * 虚拟滚动待渲染的全量数据列表。
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
});
const propsWithDefaults = useMatProps('list', props);

const emit = defineEmits({
  /**
   * 选择规则允许变化时触发，载荷包含 value、selected、nextSelected 和 originalEvent。
   */
  select(payload) {
    return payload
      && Object.hasOwn(payload, 'value')
      && Object.hasOwn(payload, 'nextSelected')
      && payload.originalEvent instanceof Event;
  },
  /**
   * 分组展开状态变化时触发，载荷为新的 value 数组。
   */
  'update:expanded'(payload) {
    return Array.isArray(payload) && payload.every(isSelectionValue);
  },
  /**
   * 长按拖动改变项目位置时触发，载荷包含 value、fromIndex、toIndex 和 originalEvent。
   *
   * @type {{ value: string | number | boolean, fromIndex: number, toIndex: number, originalEvent: PointerEvent }}
   */
  reorder(payload) {
    return payload
      && Object.hasOwn(payload, 'value')
      && Number.isInteger(payload.fromIndex)
      && Number.isInteger(payload.toIndex)
      && payload.originalEvent instanceof PointerEvent;
  },
  /**
   * 虚拟滚动时触发，载荷包含当前滚动位置与渲染区间。
   *
   * @type {{ scrollTop: number, scrollHeight: number, clientHeight: number, startIndex: number, endIndex: number }}
   */
  scroll(payload) {
    return typeof payload?.scrollTop === 'number'
      && typeof payload?.startIndex === 'number'
      && typeof payload?.endIndex === 'number';
  },
  /**
   * 虚拟滚动可见索引区间变化时触发。
   *
   * @type {{ startIndex: number, endIndex: number }}
   */
  'visible-range-change'(payload) {
    return typeof payload?.startIndex === 'number'
      && typeof payload?.endIndex === 'number';
  },
});
const root = ref(null);
const isSelectable = computed(() => isSelectableInteraction(propsWithDefaults.interaction));
const rootTag = computed(() => (isSelectable.value ? 'div' : 'ul'));
const { colorStyle } = useComponentColor(computed(() => propsWithDefaults.color));
const groupRecords = [];

const FOCUSABLE_SELECTOR = [
  '[data-mat-list-primary]',
  '[data-mat-list-trailing] a[href]',
  '[data-mat-list-trailing] button',
  '[data-mat-list-trailing] input',
  '[data-mat-list-trailing] select',
  '[data-mat-list-trailing] textarea',
  '[data-mat-list-trailing] [contenteditable]:not([contenteditable="false"])',
  '[data-mat-list-trailing] [tabindex]',
].join(',');

/**
 * @param {unknown} value
 * @returns {boolean}
 */
function isSelected(value) {
  if (propsWithDefaults.interaction === 'multi-select') {
    return Array.isArray(propsWithDefaults.selected)
      && propsWithDefaults.selected.some((selectedValue) => Object.is(selectedValue, value));
  }

  if (propsWithDefaults.interaction === 'single-select') {
    return Object.is(propsWithDefaults.selected, value);
  }

  return false;
}

/**
 * @param {unknown} value
 * @param {Event} originalEvent
 */
function requestSelection(value, originalEvent) {
  if (value === undefined) {
    console.warn('MatList: 选择模式下的 MatListItem 必须提供 value');
    return;
  }

  const currentlySelected = isSelected(value);

  if (propsWithDefaults.interaction === 'single-select') {
    if (currentlySelected) {
      return;
    }

    emit('select', {
      value,
      selected: true,
      nextSelected: value,
      originalEvent,
    });
    return;
  }

  if (propsWithDefaults.interaction === 'multi-select') {
    const currentValues = Array.isArray(propsWithDefaults.selected)
      ? propsWithDefaults.selected
      : [];

    emit('select', {
      value,
      selected: !currentlySelected,
      nextSelected: currentlySelected
        ? currentValues.filter((selectedValue) => !Object.is(selectedValue, value))
        : [...currentValues, value],
      originalEvent,
    });
  }
}

/**
 * @param {string | number | boolean} value
 * @returns {boolean}
 */
function isGroupExpanded(value) {
  return propsWithDefaults.expanded.some((expandedValue) => Object.is(expandedValue, value));
}

/**
 * @param {string | number | boolean} value
 * @param {boolean} expanded
 */
function requestGroupExpanded(value, expanded) {
  const currentlyExpanded = isGroupExpanded(value);

  if (currentlyExpanded === expanded) {
    return;
  }

  emit(
    'update:expanded',
    expanded
      ? [...propsWithDefaults.expanded, value]
      : propsWithDefaults.expanded.filter((expandedValue) => !Object.is(expandedValue, value)),
  );
}

/**
 * @param {symbol} token
 * @param {string | number | boolean} value
 */
function registerGroupValue(token, value) {
  if (groupRecords.some((record) => (
    record.token !== token && Object.is(record.value, value)
  ))) {
    console.warn(`MatListGroup: 同一 MatList 中的 value 必须唯一，重复值为 ${String(value)}`);
  }

  groupRecords.push({ token, value });
}

/**
 * @param {symbol} token
 */
function unregisterGroupValue(token) {
  const index = groupRecords.findIndex((record) => record.token === token);

  if (index !== -1) {
    groupRecords.splice(index, 1);
  }
}

/**
 * @param {Element} element
 * @returns {boolean}
 */
function isAvailableFocusable(element) {
  if (!(element instanceof HTMLElement)) {
    return false;
  }

  if (element.closest('[data-mat-list-disabled="true"]')) {
    return false;
  }

  if (element.closest('[data-mat-list-group-content][inert]')) {
    return false;
  }

  if (element.matches(':disabled') || element.getAttribute('aria-disabled') === 'true') {
    return false;
  }

  if (element.hasAttribute('data-mat-list-group-activator')) {
    return true;
  }

  if (!element.hasAttribute('data-mat-list-primary')
    && propsWithDefaults.interaction !== 'multi-action') {
    return false;
  }

  return propsWithDefaults.interaction !== 'none';
}

/**
 * @param {HTMLElement[]} focusables
 * @returns {HTMLElement | null}
 */
function findInitialFocusable(focusables) {
  if (isSelectable.value) {
    const selectedElement = focusables.find((element) => (
      element.getAttribute('aria-selected') === 'true'
    ));

    if (selectedElement) {
      return selectedElement;
    }
  }

  return focusables[0] ?? null;
}

const roving = useRovingFocus({
  root,
  selector: FOCUSABLE_SELECTOR,
  isAvailable: isAvailableFocusable,
  findInitial: findInitialFocusable,
  observedAttributes: ['aria-disabled', 'aria-hidden', 'disabled', 'href', 'inert'],
});
const {
  calculate,
  getItemKey,
  getScroller,
  paddingBottom,
  paddingTop,
  refresh,
  scrollTo,
  scrollToIndex,
  setItemRef,
  visibleItems,
} = useVirtualScroll({
  root,
  props: propsWithDefaults,
  enabled: computed(() => propsWithDefaults.virtual),
  pinEdges: computed(() => propsWithDefaults.virtual),
  emit,
});

const totalItemCount = computed(() => (propsWithDefaults.items ? propsWithDefaults.items.length : 0));
const firstItemRecord = computed(() => {
  if (totalItemCount.value > 0) {
    return { item: propsWithDefaults.items[0], index: 0 };
  }
  return null;
});
const lastItemRecord = computed(() => {
  if (totalItemCount.value > 1) {
    const lastIndex = totalItemCount.value - 1;
    return { item: propsWithDefaults.items[lastIndex], index: lastIndex };
  }
  return null;
});
const dragSort = useListDragSort({
  root,
  enabled: computed(() => propsWithDefaults.draggable),
  emitReorder(payload) {
    emit('reorder', payload);
  },
});

/**
 * @param {KeyboardEvent} event
 */
function handleKeyDown(event) {
  const direction = {
    ArrowDown: 1,
    ArrowRight: 1,
    ArrowUp: -1,
    ArrowLeft: -1,
  }[event.key];

  if (direction === undefined || !(event.target instanceof HTMLElement)) {
    return;
  }

  event.preventDefault();
  roving.move(event.target, direction);
}

provide(MAT_LIST_KEY, {
  interaction: computed(() => propsWithDefaults.interaction),
  isSelectable,
  variant: computed(() => propsWithDefaults.variant),
  isGroupExpanded,
  isSelected,
  registerGroupValue,
  requestFocusRefresh: roving.queueRefresh,
  requestGroupExpanded,
  requestSelection,
  registerDragItem: dragSort.registerItem,
  requestDragValidation: dragSort.queueValidation,
  unregisterGroupValue,
  unregisterDragItem: dragSort.unregisterItem,
});

onMounted(roving.observe);
watch(root, async () => {
  roving.restore();
  await nextTick();
  roving.observe();
});
watch(
  () => propsWithDefaults.interaction,
  async () => {
    roving.restore();
    await nextTick();
    roving.observe();
  },
);
watch(
  () => propsWithDefaults.selected,
  async () => {
    if (!root.value?.contains(document.activeElement)) {
      roving.resetActive();
    }

    await nextTick();
    roving.queueRefresh();
  },
  { deep: true },
);

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
    :is="rootTag"
    ref="root"
    v-bind="$attrs"
    class="mat-list"
    :class="[
      `mat-list--${propsWithDefaults.variant}`,
      {
        'mat-list--virtual': propsWithDefaults.virtual,
        'mat-list--draggable': propsWithDefaults.draggable,
        'mat-list--dragging': dragSort.dragging.value,
      },
    ]"
    :style="colorStyle"
    :aria-multiselectable="propsWithDefaults.interaction === 'multi-select'
      ? 'true'
      : $attrs['aria-multiselectable']"
    :aria-orientation="isSelectable ? 'vertical' : $attrs['aria-orientation']"
    :role="isSelectable ? 'listbox' : $attrs.role"
    @click.capture="dragSort.handleClickCapture"
    @focusin="roving.handleFocusIn"
    @keydown="handleKeyDown"
    @pointerdown="dragSort.handlePointerDown"
  >
    <template v-if="!propsWithDefaults.virtual">
      <slot />
    </template>

    <template v-else-if="totalItemCount > 0">
      <slot
        v-if="firstItemRecord"
        :item="firstItemRecord.item"
        :index="firstItemRecord.index"
        :item-ref="(el) => setItemRef(firstItemRecord.index, el)"
        :is-first="true"
        :is-last="totalItemCount === 1"
      />

      <div
        v-if="totalItemCount >= 3 && paddingTop > 0"
        class="mat-list__spacer"
        :style="{ height: `${paddingTop}px` }"
        aria-hidden="true"
      />

      <template
        v-for="itemRecord in (totalItemCount >= 3 ? visibleItems : [])"
        :key="getItemKey(itemRecord.item, itemRecord.index)"
      >
        <slot
          :item="itemRecord.item"
          :index="itemRecord.index"
          :item-ref="(el) => setItemRef(itemRecord.index, el)"
          :is-first="false"
          :is-last="false"
        />
      </template>

      <div
        v-if="totalItemCount >= 3 && paddingBottom > 0"
        class="mat-list__spacer"
        :style="{ height: `${paddingBottom}px` }"
        aria-hidden="true"
      />

      <slot
        v-if="lastItemRecord"
        :item="lastItemRecord.item"
        :index="lastItemRecord.index"
        :item-ref="(el) => setItemRef(lastItemRecord.index, el)"
        :is-first="false"
        :is-last="true"
      />
    </template>
  </component>
</template>

<style scoped>
@layer mde.components {
  .mat-list {
    display: flex;
    flex-direction: column;
    inline-size: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    border-radius: var(--mat-list-container-shape);
  }

  .mat-list__spacer {
    box-sizing: border-box;
    flex: 0 0 auto;
    inline-size: 100%;
    pointer-events: none;
  }

  .mat-list--standard {
    gap: 0;
  }

  .mat-list--segmented {
    gap: var(--mat-list-segmented-gap);
  }

  .mat-list--dragging {
    user-select: none;
  }

  :global(html[data-mat-list-drag-selection-lock]),
  :global(html[data-mat-list-drag-selection-lock] *) {
    user-select: none !important;
  }

  .mat-list > :deep([data-mat-list-drag-placeholder]) {
    box-sizing: border-box;
    flex: 0 0 auto;
    min-inline-size: 0;
    padding: 0;
    margin: 0;
    list-style: none;
    border-radius: var(--mat-list-item-selected-container-shape);
  }

  .mat-list > :deep(.mat-list-item:first-child),
  .mat-list > :deep(.mat-list-group:first-child),
  .mat-list > :deep(.mat-expansion-panel:first-child) {
    --mat-list-item-start-start-shape: var(--mat-list-container-shape);
    --mat-list-item-start-end-shape: var(--mat-list-container-shape);
    --mat-list-group-start-start-shape: var(--mat-list-container-shape);
    --mat-list-group-start-end-shape: var(--mat-list-container-shape);
    --mat-expansion-panel-start-start-shape: var(--mat-list-container-shape);
    --mat-expansion-panel-start-end-shape: var(--mat-list-container-shape);
  }

  .mat-list > :deep(.mat-list-item:last-child),
  .mat-list > :deep(.mat-list-group:last-child),
  .mat-list > :deep(.mat-expansion-panel:last-child) {
    --mat-list-item-end-start-shape: var(--mat-list-container-shape);
    --mat-list-item-end-end-shape: var(--mat-list-container-shape);
    --mat-list-group-end-start-shape: var(--mat-list-container-shape);
    --mat-list-group-end-end-shape: var(--mat-list-container-shape);
    --mat-expansion-panel-end-start-shape: var(--mat-list-container-shape);
    --mat-expansion-panel-end-end-shape: var(--mat-list-container-shape);
  }
}
</style>
