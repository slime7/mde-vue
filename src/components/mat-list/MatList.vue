<script setup>
import {
  computed, nextTick, onBeforeUnmount, onMounted, provide, ref, watch,
} from 'vue';
import { isComponentColor } from '../button-props';
import {
  isSelectableInteraction, LIST_INTERACTIONS, MAT_LIST_KEY,
} from '../list-context';
import useComponentColor from '../use-component-color';

defineOptions({
  name: 'MatList',
  inheritAttrs: false,
});

const props = defineProps({
  variant: {
    type: String,
    default: 'standard',
    validator(value) {
      return ['standard', 'segmented'].includes(value);
    },
  },
  interaction: {
    type: String,
    default: 'none',
    validator(value) {
      return LIST_INTERACTIONS.includes(value);
    },
  },
  selected: {
    type: [String, Number, Boolean, Array],
    default: null,
  },
  color: {
    type: String,
    default: undefined,
    validator: isComponentColor,
  },
});

const emit = defineEmits({
  select(payload) {
    return payload
      && Object.hasOwn(payload, 'value')
      && Object.hasOwn(payload, 'nextSelected')
      && payload.originalEvent instanceof Event;
  },
});
const root = ref(null);
const isSelectable = computed(() => isSelectableInteraction(props.interaction));
const rootTag = computed(() => (isSelectable.value ? 'div' : 'ul'));
const { colorStyle } = useComponentColor(computed(() => props.color));
const originalTabIndexes = new Map();
let activeElement = null;
let focusObserver;
let refreshQueued = false;

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

  if (element.matches(':disabled') || element.getAttribute('aria-disabled') === 'true') {
    return false;
  }

  if (!element.hasAttribute('data-mat-list-primary')
    && props.interaction !== 'multi-action') {
    return false;
  }

  if (!originalTabIndexes.has(element)) {
    const authorTabIndex = element.getAttribute('tabindex');

    if (authorTabIndex !== null && Number(authorTabIndex) < 0) {
      return false;
    }
  }

  return true;
}

/**
 * @returns {HTMLElement[]}
 */
function collectFocusables() {
  if (!root.value || props.interaction === 'none') {
    return [];
  }

  return [...root.value.querySelectorAll(FOCUSABLE_SELECTOR)]
    .filter(isAvailableFocusable);
}

/**
 * @param {HTMLElement} element
 */
function rememberTabIndex(element) {
  if (!originalTabIndexes.has(element)) {
    originalTabIndexes.set(element, element.getAttribute('tabindex'));
  }
}

/**
 * @param {HTMLElement} element
 */
function restoreTabIndex(element) {
  const original = originalTabIndexes.get(element);

  if (original === null) {
    element.removeAttribute('tabindex');
  } else if (original !== undefined) {
    element.setAttribute('tabindex', original);
  }

  originalTabIndexes.delete(element);
}

function restoreFocusables() {
  originalTabIndexes.forEach((original, element) => {
    if (original === null) {
      element.removeAttribute('tabindex');
    } else {
      element.setAttribute('tabindex', original);
    }
  });
  originalTabIndexes.clear();
  activeElement = null;
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

function refreshFocusables() {
  refreshQueued = false;
  const focusables = collectFocusables();
  const focusableSet = new Set(focusables);

  [...originalTabIndexes.keys()].forEach((element) => {
    if (!focusableSet.has(element)) {
      restoreTabIndex(element);
    }
  });

  if (!activeElement || !focusableSet.has(activeElement)) {
    activeElement = findInitialFocusable(focusables);
  }

  focusables.forEach((element) => {
    rememberTabIndex(element);
    element.setAttribute('tabindex', element === activeElement ? '0' : '-1');
  });
}

function queueFocusRefresh() {
  if (refreshQueued) {
    return;
  }

  refreshQueued = true;
  queueMicrotask(refreshFocusables);
}

/**
 * @param {FocusEvent} event
 */
function handleFocusIn(event) {
  const focusables = collectFocusables();

  if (event.target instanceof HTMLElement && focusables.includes(event.target)) {
    activeElement = event.target;
    refreshFocusables();
  }
}

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

  const focusables = collectFocusables();
  const currentIndex = focusables.indexOf(event.target);

  if (currentIndex === -1 || focusables.length === 0) {
    return;
  }

  event.preventDefault();
  const nextIndex = (currentIndex + direction + focusables.length) % focusables.length;

  activeElement = focusables[nextIndex];
  refreshFocusables();
  activeElement.focus();
}

function observeFocusables() {
  focusObserver?.disconnect();
  focusObserver = undefined;

  if (!root.value) {
    return;
  }

  focusObserver = new MutationObserver(queueFocusRefresh);
  focusObserver.observe(root.value, {
    attributes: true,
    attributeFilter: ['aria-disabled', 'disabled', 'href'],
    childList: true,
    subtree: true,
  });
  queueFocusRefresh();
}

provide(MAT_LIST_KEY, {
  interaction: computed(() => props.interaction),
  isSelectable,
  isSelected,
  requestFocusRefresh: queueFocusRefresh,
  requestSelection,
});

onMounted(observeFocusables);
onBeforeUnmount(() => {
  focusObserver?.disconnect();
  restoreFocusables();
});
watch(root, async () => {
  restoreFocusables();
  await nextTick();
  observeFocusables();
});
watch(
  () => props.interaction,
  async () => {
    restoreFocusables();
    await nextTick();
    observeFocusables();
  },
);
watch(
  () => props.selected,
  async () => {
    if (!root.value?.contains(document.activeElement)) {
      activeElement = null;
    }

    await nextTick();
    queueFocusRefresh();
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
    @focusin="handleFocusIn"
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

.mat-list :deep(.mat-list-item:first-child) {
  --mat-list-item-start-start-shape: var(--mat-list-container-shape);
  --mat-list-item-start-end-shape: var(--mat-list-container-shape);
}

.mat-list :deep(.mat-list-item:last-child) {
  --mat-list-item-end-start-shape: var(--mat-list-container-shape);
  --mat-list-item-end-end-shape: var(--mat-list-container-shape);
}
</style>
