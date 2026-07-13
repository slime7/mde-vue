<script setup>
import {
  computed, nextTick, onMounted, provide, ref, watch,
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
  variant: {
    type: String,
    default: 'standard',
    validator(value) {
      return ['standard', 'connected'].includes(value);
    },
  },
  size: {
    type: String,
    default: 's',
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
 * @param {HTMLButtonElement} button
 */
function expandButton(button) {
  if (props.variant !== 'standard' || button.disabled || pressedButton.value === button) {
    return;
  }

  const targetButton = button;
  const widthFactor = Number.parseFloat(getComputedStyle(root.value).getPropertyValue(
    '--mat-btn-group-standard-pressed-width-factor',
  )) || 1.15;

  restorePressedButton();
  previousInlineSize.set(targetButton, targetButton.style.inlineSize);
  targetButton.style.inlineSize = `${targetButton.getBoundingClientRect().width * widthFactor}px`;
  targetButton.dataset.matGroupPressed = '';
  pressedButton.value = targetButton;
}

function restorePressedButton() {
  const button = pressedButton.value;

  if (!button) {
    return;
  }

  button.style.inlineSize = previousInlineSize.get(button) ?? '';
  delete button.dataset.matGroupPressed;
  pressedButton.value = null;
}

/**
 * @param {PointerEvent} event
 */
function handlePointerDown(event) {
  const button = getButton(event.target);

  if (!button) {
    return;
  }

  expandButton(button);
  button.setPointerCapture?.(event.pointerId);
}

/**
 * @param {KeyboardEvent} event
 */
function handleKeyDown(event) {
  if (event.repeat || ![' ', 'Enter'].includes(event.key)) {
    return;
  }

  const button = getButton(event.target);

  if (button) {
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
      || button.classList.contains('mat-icon-btn--standard')
  ));
  const colorVariants = new Set(buttons.flatMap((button) => [...button.classList]
    .filter((name) => /^mat-(?:icon-)?btn--(?:elevated|filled|tonal|outlined)$/.test(name))
    .map((name) => name.slice(name.lastIndexOf('--') + 2))));

  if (hasUnsupportedVariant) {
    console.warn('MatBtnGroup: connected 形态不支持 text 按钮或 standard icon button');
  }

  if (colorVariants.size > 1) {
    console.warn('MatBtnGroup: connected 形态中的子按钮应使用相同视觉层级');
  }
}

onMounted(validateConnectedChildren);
watch(
  () => [props.variant, props.selection],
  async () => {
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
      { 'mat-btn-group--full-width': variant === 'connected' && fullWidth },
    ]"
    :style="colorStyle"
    role="group"
    @focusout="restorePressedButton"
    @keydown.capture="handleKeyDown"
    @keyup.capture="restorePressedButton"
    @lostpointercapture.capture="restorePressedButton"
    @pointercancel.capture="restorePressedButton"
    @pointerdown.capture="handlePointerDown"
    @pointerup.capture="restorePressedButton"
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
  gap: var(--mat-btn-group-standard-gap);
}

.mat-btn-group--connected {
  gap: var(--mat-btn-group-connected-gap);
}

.mat-btn-group--size-xs {
  --mat-btn-group-standard-gap: var(--mat-btn-group-xs-standard-gap);
  --mat-btn-group-connected-inner-radius: var(--mat-btn-group-xs-connected-inner-radius);
  --mat-btn-group-connected-pressed-inner-radius: var(--mat-btn-group-xs-connected-pressed-inner-radius);
  --mat-btn-group-connected-square-outer-radius: var(--mat-btn-group-xs-connected-square-outer-radius);
}

.mat-btn-group--size-s {
  --mat-btn-group-standard-gap: var(--mat-btn-group-s-standard-gap);
  --mat-btn-group-connected-inner-radius: var(--mat-btn-group-s-connected-inner-radius);
  --mat-btn-group-connected-pressed-inner-radius: var(--mat-btn-group-s-connected-pressed-inner-radius);
  --mat-btn-group-connected-square-outer-radius: var(--mat-btn-group-s-connected-square-outer-radius);
}

.mat-btn-group--size-m {
  --mat-btn-group-standard-gap: var(--mat-btn-group-m-standard-gap);
  --mat-btn-group-connected-inner-radius: var(--mat-btn-group-m-connected-inner-radius);
  --mat-btn-group-connected-pressed-inner-radius: var(--mat-btn-group-m-connected-pressed-inner-radius);
  --mat-btn-group-connected-square-outer-radius: var(--mat-btn-group-m-connected-square-outer-radius);
}

.mat-btn-group--size-l {
  --mat-btn-group-standard-gap: var(--mat-btn-group-l-standard-gap);
  --mat-btn-group-connected-inner-radius: var(--mat-btn-group-l-connected-inner-radius);
  --mat-btn-group-connected-pressed-inner-radius: var(--mat-btn-group-l-connected-pressed-inner-radius);
  --mat-btn-group-connected-square-outer-radius: var(--mat-btn-group-l-connected-square-outer-radius);
}

.mat-btn-group--size-xl {
  --mat-btn-group-standard-gap: var(--mat-btn-group-xl-standard-gap);
  --mat-btn-group-connected-inner-radius: var(--mat-btn-group-xl-connected-inner-radius);
  --mat-btn-group-connected-pressed-inner-radius: var(--mat-btn-group-xl-connected-pressed-inner-radius);
  --mat-btn-group-connected-square-outer-radius: var(--mat-btn-group-xl-connected-square-outer-radius);
}

.mat-btn-group--standard :deep(.mat-button-base) {
  transition-property: color, background-color, border-color, border-radius, box-shadow, inline-size;
}

.mat-btn-group--connected :deep(.mat-button-base) {
  --mat-button-radius: var(--mat-btn-group-connected-inner-radius);
  min-inline-size: var(--mat-interactive-target-min-size);
}

.mat-btn-group--connected :deep(.mat-button-base:first-child) {
  border-start-start-radius: var(--mat-btn-group-outer-radius);
  border-end-start-radius: var(--mat-btn-group-outer-radius);
}

.mat-btn-group--connected :deep(.mat-button-base:last-child) {
  border-start-end-radius: var(--mat-btn-group-outer-radius);
  border-end-end-radius: var(--mat-btn-group-outer-radius);
}

.mat-btn-group--connected.mat-btn-group--shape-round {
  --mat-btn-group-outer-radius: var(--mat-shape-corner-full);
}

.mat-btn-group--connected.mat-btn-group--shape-square {
  --mat-btn-group-outer-radius: var(--mat-btn-group-connected-square-outer-radius);
}

.mat-btn-group--connected :deep(.mat-btn--selected),
.mat-btn-group--connected :deep(.mat-icon-btn--selected) {
  --mat-button-radius: 50%;
}

.mat-btn-group--connected :deep(.mat-button-base:first-child.mat-btn--selected),
.mat-btn-group--connected :deep(.mat-button-base:first-child.mat-icon-btn--selected) {
  border-start-start-radius: var(--mat-btn-group-outer-radius);
  border-end-start-radius: var(--mat-btn-group-outer-radius);
}

.mat-btn-group--connected :deep(.mat-button-base:last-child.mat-btn--selected),
.mat-btn-group--connected :deep(.mat-button-base:last-child.mat-icon-btn--selected) {
  border-start-end-radius: var(--mat-btn-group-outer-radius);
  border-end-end-radius: var(--mat-btn-group-outer-radius);
}

.mat-btn-group--connected :deep(.mat-button-base:active) {
  --mat-button-pressed-radius: var(--mat-btn-group-connected-pressed-inner-radius);
}

.mat-btn-group--full-width {
  display: flex;
  inline-size: 100%;
}

.mat-btn-group--full-width :deep(.mat-button-base) {
  flex: 1 1 0;
  inline-size: auto;
}

@media (prefers-reduced-motion: reduce) {
  .mat-btn-group--standard :deep(.mat-button-base) {
    transition-duration: 0s;
  }
}
</style>
