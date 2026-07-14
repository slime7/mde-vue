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

defineOptions({
  name: 'MatList',
  inheritAttrs: false,
});

const props = defineProps({
  variant: {
    type: String,
    default: 'segmented',
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
  observedAttributes: ['aria-disabled', 'disabled', 'href'],
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
  isSelected,
  requestFocusRefresh: roving.queueRefresh,
  requestSelection,
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

.mat-list :deep(.mat-list-item:first-child) {
  --mat-list-item-start-start-shape: var(--mat-list-container-shape);
  --mat-list-item-start-end-shape: var(--mat-list-container-shape);
}

.mat-list :deep(.mat-list-item:last-child) {
  --mat-list-item-end-start-shape: var(--mat-list-container-shape);
  --mat-list-item-end-end-shape: var(--mat-list-container-shape);
}
</style>
