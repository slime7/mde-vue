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
});

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
});
const root = ref(null);
const isSelectable = computed(() => isSelectableInteraction(props.interaction));
const rootTag = computed(() => (isSelectable.value ? 'div' : 'ul'));
const { colorStyle } = useComponentColor(computed(() => props.color));
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
  if (props.interaction === 'multi-select') {
    return Array.isArray(props.selected)
      && props.selected.some((selectedValue) => Object.is(selectedValue, value));
  }

  if (props.interaction === 'single-select') {
    return Object.is(props.selected, value);
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

  if (props.interaction === 'single-select') {
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

  if (props.interaction === 'multi-select') {
    const currentValues = Array.isArray(props.selected) ? props.selected : [];

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
  return props.expanded.some((expandedValue) => Object.is(expandedValue, value));
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
      ? [...props.expanded, value]
      : props.expanded.filter((expandedValue) => !Object.is(expandedValue, value)),
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
    && props.interaction !== 'multi-action') {
    return false;
  }

  return props.interaction !== 'none';
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
  interaction: computed(() => props.interaction),
  isSelectable,
  variant: computed(() => props.variant),
  isGroupExpanded,
  isSelected,
  registerGroupValue,
  requestFocusRefresh: roving.queueRefresh,
  requestGroupExpanded,
  requestSelection,
  unregisterGroupValue,
});

onMounted(roving.observe);
watch(root, async () => {
  roving.restore();
  await nextTick();
  roving.observe();
});
watch(
  () => props.interaction,
  async () => {
    roving.restore();
    await nextTick();
    roving.observe();
  },
);
watch(
  () => props.selected,
  async () => {
    if (!root.value?.contains(document.activeElement)) {
      roving.resetActive();
    }

    await nextTick();
    roving.queueRefresh();
  },
  { deep: true },
);
</script>

<template>
  <component
    :is="rootTag"
    ref="root"
    v-bind="$attrs"
    class="mat-list"
    :class="`mat-list--${variant}`"
    :style="colorStyle"
    :aria-multiselectable="interaction === 'multi-select'
      ? 'true'
      : $attrs['aria-multiselectable']"
    :aria-orientation="isSelectable ? 'vertical' : $attrs['aria-orientation']"
    :role="isSelectable ? 'listbox' : $attrs.role"
    @focusin="roving.handleFocusIn"
    @keydown="handleKeyDown"
  >
    <slot />
  </component>
</template>

<style scoped>
.mat-list {
  display: flex;
  flex-direction: column;
  inline-size: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  border-radius: var(--mat-list-container-shape);
}

.mat-list--standard {
  gap: 0;
}

.mat-list--segmented {
  gap: var(--mat-list-segmented-gap);
}

.mat-list > :deep(.mat-list-item:first-child),
.mat-list > :deep(.mat-list-group:first-child) {
  --mat-list-item-start-start-shape: var(--mat-list-container-shape);
  --mat-list-item-start-end-shape: var(--mat-list-container-shape);
  --mat-list-group-start-start-shape: var(--mat-list-container-shape);
  --mat-list-group-start-end-shape: var(--mat-list-container-shape);
}

.mat-list > :deep(.mat-list-item:last-child),
.mat-list > :deep(.mat-list-group:last-child) {
  --mat-list-item-end-start-shape: var(--mat-list-container-shape);
  --mat-list-item-end-end-shape: var(--mat-list-container-shape);
  --mat-list-group-end-start-shape: var(--mat-list-container-shape);
  --mat-list-group-end-end-shape: var(--mat-list-container-shape);
}
</style>
