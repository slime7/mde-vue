<script setup>
import {
  computed, nextTick, onBeforeUnmount, onMounted, provide, ref, watch,
} from 'vue';
import { MAT_BTN_GROUP_KEY } from '../button-context';
import {
  BUTTON_SHAPES, BUTTON_SIZES, isComponentColor,
} from '../button-props';
import useComponentColor from '../use-component-color';

defineOptions({
  name: 'MatBtnGroup',
  inheritAttrs: false,
});

const props = defineProps({
  block: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'standard',
    validator(value) {
      return ['standard', 'connected'].includes(value);
    },
  },
  size: {
    type: String,
    default: 'small',
    validator(value) {
      return BUTTON_SIZES.includes(value);
    },
  },
  shape: {
    type: String,
    default: 'round',
    validator(value) {
      return BUTTON_SHAPES.includes(value);
    },
  },
  color: {
    type: String,
    default: undefined,
    validator: isComponentColor,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  selection: {
    type: String,
    default: 'none',
    validator(value) {
      return ['none', 'single', 'multiple'].includes(value);
    },
  },
  selected: {
    type: [String, Number, Boolean, Array],
    default: null,
  },
  required: {
    type: Boolean,
    default: false,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits({
  select(payload) {
    return payload
      && Object.hasOwn(payload, 'value')
      && Object.hasOwn(payload, 'nextSelected')
      && payload.originalEvent instanceof MouseEvent;
  },
});
const root = ref(null);
const pressedButton = ref(null);
const previousInlineSize = new WeakMap();
const restingInlineSize = new WeakMap();
const resizedButtons = new Set();
const FALLBACK_WIDTH_TRANSITION_DURATION = 150;
const MINIMUM_EXPANSION_PROGRESS = 0.75;
let restoreTimer;
let cleanupTimer;
let activeTransitionDuration = FALLBACK_WIDTH_TRANSITION_DURATION;
let restoreReady = true;
let restoreRequested = false;
const { colorStyle } = useComponentColor(computed(() => props.color));

/**
 * @param {unknown} value
 * @returns {boolean}
 */
function isSelected(value) {
  if (props.selection === 'multiple') {
    return Array.isArray(props.selected)
      && props.selected.some((selectedValue) => Object.is(selectedValue, value));
  }

  if (props.selection === 'single') {
    return Object.is(props.selected, value);
  }

  return false;
}

/**
 * @param {unknown} value
 * @param {MouseEvent} originalEvent
 */
function requestSelection(value, originalEvent) {
  if (value === undefined) {
    console.warn('MatBtnGroup: selection 不为 none 时，子按钮必须提供 value');
    return;
  }

  const currentlySelected = isSelected(value);

  if (props.selection === 'single') {
    if (currentlySelected && props.required) {
      return;
    }

    emit('select', {
      value,
      selected: !currentlySelected,
      nextSelected: currentlySelected ? null : value,
      originalEvent,
    });
    return;
  }

  if (props.selection === 'multiple') {
    const currentValues = Array.isArray(props.selected) ? props.selected : [];

    if (currentlySelected && props.required && currentValues.length === 1) {
      return;
    }

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

provide(MAT_BTN_GROUP_KEY, {
  color: computed(() => props.color),
  disabled: computed(() => props.disabled),
  isSelected,
  requestSelection,
  selection: computed(() => props.selection),
  shape: computed(() => props.shape),
  size: computed(() => props.size),
  variant: computed(() => props.variant),
});

/**
 * @param {EventTarget | null} target
 * @returns {HTMLButtonElement | null}
 */
function getButton(target) {
  if (!(target instanceof Element)) {
    return null;
  }

  return target.closest('.mat-button-base');
}

/**
 * @param {string} value
 * @returns {number | null}
 */
function parseCssTime(value) {
  const match = value.trim().match(/^(\d*\.?\d+)(ms|s)$/);

  if (!match) {
    return null;
  }

  const duration = Number.parseFloat(match[1]);

  return match[2] === 's' ? duration * 1000 : duration;
}

/**
 * @param {HTMLButtonElement} button
 * @returns {number}
 */
function getWidthTransitionDuration(button) {
  const [duration] = getComputedStyle(button).transitionDuration.split(',');

  return parseCssTime(duration ?? '') ?? FALLBACK_WIDTH_TRANSITION_DURATION;
}

function prefersReducedMotion() {
  return typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function clearRestoreTimer() {
  if (restoreTimer === undefined) {
    return;
  }

  globalThis.clearTimeout(restoreTimer);
  restoreTimer = undefined;
}

function clearCleanupTimer() {
  if (cleanupTimer === undefined) {
    return;
  }

  globalThis.clearTimeout(cleanupTimer);
  cleanupTimer = undefined;
}

function finishPressedButtonRestore() {
  clearRestoreTimer();
  clearCleanupTimer();

  resizedButtons.forEach((item) => {
    const resizedButton = item;

    resizedButton.style.inlineSize = previousInlineSize.get(resizedButton) ?? '';
    previousInlineSize.delete(resizedButton);
    restingInlineSize.delete(resizedButton);
  });
  resizedButtons.clear();

  if (pressedButton.value) {
    delete pressedButton.value.dataset.matGroupPressed;
  }

  pressedButton.value = null;
  activeTransitionDuration = FALLBACK_WIDTH_TRANSITION_DURATION;
  restoreReady = true;
  restoreRequested = false;
}

function restorePressedButton() {
  clearRestoreTimer();

  if (!pressedButton.value) {
    return;
  }

  if (prefersReducedMotion() || activeTransitionDuration === 0) {
    finishPressedButtonRestore();
    return;
  }

  resizedButtons.forEach((item) => {
    const resizedButton = item;

    resizedButton.style.inlineSize = `${restingInlineSize.get(resizedButton)}px`;
  });
  delete pressedButton.value.dataset.matGroupPressed;
  pressedButton.value = null;
  restoreReady = true;
  restoreRequested = false;
  cleanupTimer = globalThis.setTimeout(() => {
    cleanupTimer = undefined;
    finishPressedButtonRestore();
  }, activeTransitionDuration);
}

function requestPressedButtonRestore() {
  if (!pressedButton.value) {
    return;
  }

  if (restoreReady) {
    restorePressedButton();
    return;
  }

  restoreRequested = true;
}

/**
 * @param {HTMLButtonElement} button
 */
function startRestoreThreshold(button) {
  restoreReady = false;
  restoreRequested = false;

  const transitionDuration = getWidthTransitionDuration(button);

  activeTransitionDuration = transitionDuration;

  if (prefersReducedMotion() || transitionDuration === 0) {
    restoreReady = true;
    return;
  }

  restoreTimer = globalThis.setTimeout(() => {
    restoreTimer = undefined;

    if (pressedButton.value !== button) {
      return;
    }

    restoreReady = true;

    if (restoreRequested) {
      restorePressedButton();
    }
  }, transitionDuration * MINIMUM_EXPANSION_PROGRESS);
}

/**
 * @param {HTMLButtonElement} button
 */
function expandButton(button) {
  if (props.variant !== 'standard' || button.disabled || pressedButton.value === button) {
    return;
  }

  const targetButton = button;

  finishPressedButtonRestore();

  const buttons = [...root.value.querySelectorAll('.mat-button-base')];
  const buttonIndex = buttons.indexOf(targetButton);

  if (buttons.length < 2 || buttonIndex === -1) {
    return;
  }

  const widthFactor = Number.parseFloat(getComputedStyle(root.value).getPropertyValue(
    '--mat-btn-group-standard-pressed-width-factor',
  )) || 1.15;
  const buttonWidths = new Map(buttons.map((item) => [
    item,
    item.getBoundingClientRect().width,
  ]));
  const growth = buttonWidths.get(targetButton) * (widthFactor - 1);
  const nextInlineSizes = new Map([
    [targetButton, buttonWidths.get(targetButton) + growth],
  ]);

  if (buttonIndex === 0) {
    const nextButton = buttons[1];
    nextInlineSizes.set(nextButton, buttonWidths.get(nextButton) - growth);
  } else if (buttonIndex === buttons.length - 1) {
    const previousButton = buttons[buttonIndex - 1];
    nextInlineSizes.set(previousButton, buttonWidths.get(previousButton) - growth);
  } else {
    const previousButton = buttons[buttonIndex - 1];
    const nextButton = buttons[buttonIndex + 1];
    const neighborCompression = growth / 2;

    nextInlineSizes.set(
      previousButton,
      buttonWidths.get(previousButton) - neighborCompression,
    );
    nextInlineSizes.set(nextButton, buttonWidths.get(nextButton) - neighborCompression);
  }

  nextInlineSizes.forEach((inlineSize, item) => {
    const resizedButton = item;

    previousInlineSize.set(resizedButton, resizedButton.style.inlineSize);
    restingInlineSize.set(resizedButton, buttonWidths.get(resizedButton));
    resizedButton.style.inlineSize = `${buttonWidths.get(resizedButton)}px`;
    resizedButtons.add(resizedButton);
  });

  resizedButtons.forEach((item) => {
    item.getBoundingClientRect();
  });

  nextInlineSizes.forEach((inlineSize, item) => {
    const resizedButton = item;

    resizedButton.style.inlineSize = `${inlineSize}px`;
  });

  targetButton.dataset.matGroupPressed = '';
  pressedButton.value = targetButton;
  startRestoreThreshold(targetButton);
}

/**
 * @param {PointerEvent} event
 */
async function handlePointerDown(event) {
  const button = getButton(event.target);

  if (!button) {
    return;
  }

  await nextTick();
  expandButton(button);
}

/**
 * @param {FocusEvent} event
 */
function handleFocusOut(event) {
  if (event.relatedTarget instanceof Node && root.value?.contains(event.relatedTarget)) {
    return;
  }

  requestPressedButtonRestore();
}

/**
 * @param {KeyboardEvent} event
 */
async function handleKeyDown(event) {
  if (event.repeat || ![' ', 'Enter'].includes(event.key)) {
    return;
  }

  const button = getButton(event.target);

  if (button) {
    await nextTick();
    expandButton(button);
  }
}

function validateConnectedChildren() {
  if (props.variant !== 'connected' || !root.value) {
    return;
  }

  if (props.selection === 'none') {
    console.warn('MatBtnGroup: connected 形态应配合 single 或 multiple 选择模式使用');
  }

  const buttons = [...root.value.querySelectorAll('.mat-button-base')];
  const hasUnsupportedVariant = buttons.some((button) => (
    button.classList.contains('mat-btn--text')
      || button.classList.contains('mat-btn--standard')
  ));
  const colorVariants = new Set(buttons.flatMap((button) => [...button.classList]
    .filter((name) => /^mat-btn--(?:elevated|filled|filled-tonal|outlined)$/.test(name))
    .map((name) => name.slice(name.lastIndexOf('--') + 2))));

  if (hasUnsupportedVariant) {
    console.warn('MatBtnGroup: connected 形态不支持 text 或 standard 按钮');
  }

  if (colorVariants.size > 1) {
    console.warn('MatBtnGroup: connected 形态中的子按钮应使用相同视觉层级');
  }

  const colorValues = new Set(buttons.map((button) => (
    button.style.getPropertyValue('--mat-accent-color')
  )));

  if (colorValues.size > 1) {
    console.warn('MatBtnGroup: connected 形态中的子按钮应使用相同颜色');
  }
}

onMounted(validateConnectedChildren);
onBeforeUnmount(finishPressedButtonRestore);
watch(
  () => [props.variant, props.selection],
  async () => {
    finishPressedButtonRestore();
    await nextTick();
    validateConnectedChildren();
  },
);
</script>

<template>
  <div
    ref="root"
    v-bind="$attrs"
    class="mat-btn-group"
    :class="[
      `mat-btn-group--${variant}`,
      `mat-btn-group--size-${size}`,
      `mat-btn-group--shape-${shape}`,
      {
        'mat-btn-group--block': block,
        'mat-btn-group--full-width': variant === 'connected' && fullWidth,
      },
    ]"
    :style="colorStyle"
    role="group"
    @focusout="handleFocusOut"
    @keydown="handleKeyDown"
    @keyup.capture="requestPressedButtonRestore"
    @lostpointercapture.capture="requestPressedButtonRestore"
    @pointercancel.capture="requestPressedButtonRestore"
    @pointerdown="handlePointerDown"
    @pointerup.capture="requestPressedButtonRestore"
  >
    <slot />
  </div>
</template>

<style scoped>
.mat-btn-group {
  display: inline-flex;
  flex-wrap: nowrap;
  align-items: center;
  max-inline-size: 100%;
}

.mat-btn-group--standard {
  gap: var(--mat-btn-group-standard-between-space);
}

.mat-btn-group--connected {
  gap: var(--mat-btn-group-connected-between-space);
}

.mat-btn-group--block {
  display: flex;
}

.mat-btn-group--size-extra-small {
  --mat-btn-group-standard-between-space: var(--mat-btn-group-standard-extra-small-between-space);
  --mat-btn-group-connected-inner-corner-size: var(--mat-btn-group-connected-extra-small-inner-corner-size);
  --mat-btn-group-connected-pressed-inner-corner-size: var(--mat-btn-group-connected-extra-small-pressed-inner-corner-size);
  --mat-btn-group-connected-square-outer-corner-size: var(--mat-btn-group-connected-extra-small-square-outer-corner-size);
}

.mat-btn-group--size-small {
  --mat-btn-group-standard-between-space: var(--mat-btn-group-standard-small-between-space);
  --mat-btn-group-connected-inner-corner-size: var(--mat-btn-group-connected-small-inner-corner-size);
  --mat-btn-group-connected-pressed-inner-corner-size: var(--mat-btn-group-connected-small-pressed-inner-corner-size);
  --mat-btn-group-connected-square-outer-corner-size: var(--mat-btn-group-connected-small-square-outer-corner-size);
}

.mat-btn-group--size-medium {
  --mat-btn-group-standard-between-space: var(--mat-btn-group-standard-medium-between-space);
  --mat-btn-group-connected-inner-corner-size: var(--mat-btn-group-connected-medium-inner-corner-size);
  --mat-btn-group-connected-pressed-inner-corner-size: var(--mat-btn-group-connected-medium-pressed-inner-corner-size);
  --mat-btn-group-connected-square-outer-corner-size: var(--mat-btn-group-connected-medium-square-outer-corner-size);
}

.mat-btn-group--size-large {
  --mat-btn-group-standard-between-space: var(--mat-btn-group-standard-large-between-space);
  --mat-btn-group-connected-inner-corner-size: var(--mat-btn-group-connected-large-inner-corner-size);
  --mat-btn-group-connected-pressed-inner-corner-size: var(--mat-btn-group-connected-large-pressed-inner-corner-size);
  --mat-btn-group-connected-square-outer-corner-size: var(--mat-btn-group-connected-large-square-outer-corner-size);
}

.mat-btn-group--size-extra-large {
  --mat-btn-group-standard-between-space: var(--mat-btn-group-standard-extra-large-between-space);
  --mat-btn-group-connected-inner-corner-size: var(--mat-btn-group-connected-extra-large-inner-corner-size);
  --mat-btn-group-connected-pressed-inner-corner-size: var(--mat-btn-group-connected-extra-large-pressed-inner-corner-size);
  --mat-btn-group-connected-square-outer-corner-size: var(--mat-btn-group-connected-extra-large-square-outer-corner-size);
}

.mat-btn-group--connected :deep(.mat-button-base) {
  --mat-button-start-start-radius: var(--mat-btn-group-connected-inner-corner-size);
  --mat-button-start-end-radius: var(--mat-btn-group-connected-inner-corner-size);
  --mat-button-end-start-radius: var(--mat-btn-group-connected-inner-corner-size);
  --mat-button-end-end-radius: var(--mat-btn-group-connected-inner-corner-size);
  --mat-button-pressed-start-start-radius: var(--mat-btn-group-connected-pressed-inner-corner-size);
  --mat-button-pressed-start-end-radius: var(--mat-btn-group-connected-pressed-inner-corner-size);
  --mat-button-pressed-end-start-radius: var(--mat-btn-group-connected-pressed-inner-corner-size);
  --mat-button-pressed-end-end-radius: var(--mat-btn-group-connected-pressed-inner-corner-size);
  min-inline-size: var(--mat-sys-interaction-target-min-size);
}

.mat-btn-group--connected :deep(.mat-button-base:first-child) {
  --mat-button-start-start-radius: var(--mat-btn-group-outer-corner-size);
  --mat-button-end-start-radius: var(--mat-btn-group-outer-corner-size);
  --mat-button-pressed-start-start-radius: var(--mat-btn-group-outer-corner-size);
  --mat-button-pressed-end-start-radius: var(--mat-btn-group-outer-corner-size);
}

.mat-btn-group--connected :deep(.mat-button-base:last-child) {
  --mat-button-start-end-radius: var(--mat-btn-group-outer-corner-size);
  --mat-button-end-end-radius: var(--mat-btn-group-outer-corner-size);
  --mat-button-pressed-start-end-radius: var(--mat-btn-group-outer-corner-size);
  --mat-button-pressed-end-end-radius: var(--mat-btn-group-outer-corner-size);
}

.mat-btn-group--connected.mat-btn-group--shape-round :deep(.mat-button-base) {
  --mat-btn-group-outer-corner-size: var(--mat-button-full-radius);
  --mat-btn-group-connected-selected-inner-corner-size: var(--mat-button-full-radius);
  --mat-btn-group-connected-selected-pressed-inner-corner-size: var(--mat-btn-group-connected-pressed-inner-corner-size);
}

.mat-btn-group--connected.mat-btn-group--shape-square :deep(.mat-button-base) {
  --mat-btn-group-outer-corner-size: var(--mat-btn-group-connected-square-outer-corner-size);
  --mat-btn-group-connected-selected-inner-corner-size: var(--mat-button-full-radius);
  --mat-btn-group-connected-selected-pressed-inner-corner-size: var(--mat-btn-group-connected-pressed-inner-corner-size);
}

.mat-btn-group--connected :deep(.mat-button-base.mat-btn--selected) {
  --mat-button-start-start-radius: var(--mat-btn-group-connected-selected-inner-corner-size);
  --mat-button-start-end-radius: var(--mat-btn-group-connected-selected-inner-corner-size);
  --mat-button-end-start-radius: var(--mat-btn-group-connected-selected-inner-corner-size);
  --mat-button-end-end-radius: var(--mat-btn-group-connected-selected-inner-corner-size);
  --mat-button-pressed-start-start-radius: var(--mat-btn-group-connected-selected-pressed-inner-corner-size);
  --mat-button-pressed-start-end-radius: var(--mat-btn-group-connected-selected-pressed-inner-corner-size);
  --mat-button-pressed-end-start-radius: var(--mat-btn-group-connected-selected-pressed-inner-corner-size);
  --mat-button-pressed-end-end-radius: var(--mat-btn-group-connected-selected-pressed-inner-corner-size);
}

.mat-btn-group--full-width {
  display: flex;
  inline-size: 100%;
}

.mat-btn-group--full-width :deep(.mat-button-base) {
  flex: 1 1 0;
  inline-size: auto;
}

</style>
