<script setup>
import {
  computed, nextTick, onBeforeUnmount, onMounted, onUpdated, provide, ref, watch,
} from 'vue';
import { MAT_BTN_GROUP_KEY } from '../button-context';
import {
  BUTTON_SHAPES, BUTTON_SIZES, isComponentColor,
} from '../button-props';
import useComponentColor from '../use-component-color';
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatBtnGroup',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 使用块级 flex 组根，在普通文档流中铺满父元素。
   *
   * @type {boolean}
   * @default false
   */
  block: {
    type: Boolean,
    default: false,
  },
  /**
   * 组布局形态；可选值为 `standard`、`connected`。
   *
   * @type {'standard' | 'connected'}
   * @default 'standard'
   */
  variant: {
    type: String,
    default: 'standard',
    validator(value) {
      return ['standard', 'connected'].includes(value);
    },
  },
  /**
   * 未显式设置尺寸的子按钮继承的尺寸。
   *
   * @type {string | undefined}
   * @default undefined
   */
  size: {
    type: String,
    default: 'small',
    validator(value) {
      return BUTTON_SIZES.includes(value);
    },
  },
  /**
   * standard 子按钮形状；可选值为 `round`、`square`。
   *
   * @type {string | undefined}
   * @default undefined
   */
  shape: {
    type: String,
    default: 'round',
    validator(value) {
      return BUTTON_SHAPES.includes(value);
    },
  },
  /**
   * 级联给未显式设置 color 的子按钮。
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
   * 为 true 时禁用全部子按钮。
   *
   * @type {boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 选择模式；可选值为 `none`、`single`、`multiple`。
   *
   * @type {'none' | 'single' | 'multiple'}
   * @default 'none'
   */
  selection: {
    type: String,
    default: 'none',
    validator(value) {
      return ['none', 'single', 'multiple'].includes(value);
    },
  },
  /**
   * 受控当前选择值；single 使用单值，multiple 使用数组。
   *
   * @type {string | number | boolean | Array<string | number | boolean> | null}
   * @default null
   */
  selected: {
    type: [String, Number, Boolean, Array],
    default: null,
  },
  /**
   * 阻止取消 single 当前项或 multiple 最后一项。
   *
   * @type {boolean}
   * @default false
   */
  required: {
    type: Boolean,
    default: false,
  },
  /**
   * connected 形态下铺满父容器并等分子项；standard 中忽略。
   *
   * @type {boolean}
   * @default false
   */
  fullWidth: {
    type: Boolean,
    default: false,
  },
});
const propsWithDefaults = useMatProps('btnGroup', props);

const emit = defineEmits({
  /**
   * 选择规则允许变化时触发，载荷为 `{ value, selected, nextSelected, originalEvent }`。
   */
  select(payload) {
    return payload
      && Object.hasOwn(payload, 'value')
      && Object.hasOwn(payload, 'nextSelected')
      && payload.originalEvent instanceof MouseEvent;
  },
});
const root = ref(null);
const pressedButton = ref(null);
const previousButtonStyle = new WeakMap();
const restingButtonStyle = new WeakMap();
const measuredInlineSize = new WeakMap();
const resizedButtons = new Set();
const FALLBACK_WIDTH_TRANSITION_DURATION = 150;
let sizeAnimationFrame;
let buttonResizeObserver;
let visualButton;
let activeTransitionDuration = FALLBACK_WIDTH_TRANSITION_DURATION;
let restoreReady = true;
let restoreRequested = false;
const { colorStyle } = useComponentColor(computed(() => propsWithDefaults.color));

/**
 * @param {unknown} value
 * @returns {boolean}
 */
function isSelected(value) {
  if (propsWithDefaults.selection === 'multiple') {
    return Array.isArray(propsWithDefaults.selected)
      && propsWithDefaults.selected.some((selectedValue) => Object.is(selectedValue, value));
  }

  if (propsWithDefaults.selection === 'single') {
    return Object.is(propsWithDefaults.selected, value);
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

  if (propsWithDefaults.selection === 'single') {
    if (currentlySelected && propsWithDefaults.required) {
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

  if (propsWithDefaults.selection === 'multiple') {
    const currentValues = Array.isArray(propsWithDefaults.selected) ? propsWithDefaults.selected : [];

    if (currentlySelected && propsWithDefaults.required && currentValues.length === 1) {
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
  color: computed(() => propsWithDefaults.color),
  disabled: computed(() => propsWithDefaults.disabled),
  isSelected,
  requestSelection,
  selection: computed(() => propsWithDefaults.selection),
  shape: computed(() => propsWithDefaults.shape),
  size: computed(() => propsWithDefaults.size),
  variant: computed(() => propsWithDefaults.variant),
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

function getSizeAnimationDuration() {
  const value = getComputedStyle(root.value).getPropertyValue(
    '--mat-btn-group-size-animation-duration',
  );

  return parseCssTime(value) ?? FALLBACK_WIDTH_TRANSITION_DURATION;
}

function prefersReducedMotion() {
  return typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function clearSizeAnimationFrame() {
  if (sizeAnimationFrame === undefined) {
    return;
  }

  globalThis.cancelAnimationFrame(sizeAnimationFrame);
  sizeAnimationFrame = undefined;
}

/**
 * @param {HTMLButtonElement} button
 * @param {{ inlineSize: string, paddingInlineStart: string, paddingInlineEnd: string }} style
 */
function writeButtonStyle(button, style) {
  const targetButton = button;

  targetButton.style.inlineSize = style.inlineSize;
  targetButton.style.paddingInlineStart = style.paddingInlineStart;
  targetButton.style.paddingInlineEnd = style.paddingInlineEnd;
}

/**
 * @param {Map<HTMLButtonElement, { inlineSize: string, paddingInlineStart: string, paddingInlineEnd: string }>} styles
 * @returns {Map<HTMLButtonElement, { inlineSize: number, paddingInlineStart: number, paddingInlineEnd: number }>}
 */
function toNumericButtonStyles(styles) {
  return new Map([...styles].map(([button, style]) => [button, {
    inlineSize: Number.parseFloat(style.inlineSize) || 0,
    paddingInlineStart: Number.parseFloat(style.paddingInlineStart) || 0,
    paddingInlineEnd: Number.parseFloat(style.paddingInlineEnd) || 0,
  }]));
}

/**
 * @param {Map<HTMLButtonElement, { inlineSize: number, paddingInlineStart: number, paddingInlineEnd: number }>} fromStyles
 * @param {Map<HTMLButtonElement, { inlineSize: number, paddingInlineStart: number, paddingInlineEnd: number }>} toStyles
 * @param {number} duration
 * @param {() => void} onComplete
 */
function animateButtonStyles(fromStyles, toStyles, duration, onComplete) {
  clearSizeAnimationFrame();
  const startedAt = performance.now();
  const animatedButtons = [...toStyles.keys()];
  const totalInlineSizeUnits = Math.round(animatedButtons.reduce((sum, button) => (
    sum + toStyles.get(button).inlineSize
  ), 0) * 64);

  if (prefersReducedMotion() || duration === 0) {
    toStyles.forEach((style, button) => {
      writeButtonStyle(button, {
        inlineSize: `${style.inlineSize}px`,
        paddingInlineStart: `${style.paddingInlineStart}px`,
        paddingInlineEnd: `${style.paddingInlineEnd}px`,
      });
    });
    onComplete();
    return;
  }

  const update = (now) => {
    const progress = Math.min(1, Math.max(0, (now - startedAt) / duration));
    const easedProgress = 1 - (1 - progress) ** 3;
    let allocatedInlineSizeUnits = 0;

    animatedButtons.forEach((button, index) => {
      const toStyle = toStyles.get(button);
      const fromStyle = fromStyles.get(button);
      const interpolate = (start, end) => start + (end - start) * easedProgress;
      const inlineSizeUnits = index === animatedButtons.length - 1
        ? totalInlineSizeUnits - allocatedInlineSizeUnits
        : Math.round(interpolate(fromStyle.inlineSize, toStyle.inlineSize) * 64);

      allocatedInlineSizeUnits += inlineSizeUnits;

      writeButtonStyle(button, {
        inlineSize: `${inlineSizeUnits / 64}px`,
        paddingInlineStart: `${interpolate(
          fromStyle.paddingInlineStart,
          toStyle.paddingInlineStart,
        )}px`,
        paddingInlineEnd: `${interpolate(
          fromStyle.paddingInlineEnd,
          toStyle.paddingInlineEnd,
        )}px`,
      });
    });

    if (progress < 1) {
      sizeAnimationFrame = globalThis.requestAnimationFrame(update);
      return;
    }

    sizeAnimationFrame = undefined;
    onComplete();
  };

  sizeAnimationFrame = globalThis.requestAnimationFrame(update);
}

function finishPressedButtonRestore() {
  clearSizeAnimationFrame();

  resizedButtons.forEach((item) => {
    const resizedButton = item;

    writeButtonStyle(resizedButton, previousButtonStyle.get(resizedButton) ?? {
      inlineSize: '',
      paddingInlineStart: '',
      paddingInlineEnd: '',
    });
    previousButtonStyle.delete(resizedButton);
    restingButtonStyle.delete(resizedButton);
  });
  resizedButtons.clear();

  if (pressedButton.value) {
    delete pressedButton.value.dataset.matGroupPressed;
  }

  if (visualButton) {
    visualButton.style.removeProperty('--mat-button-visual-scale');
    visualButton = undefined;
  }

  pressedButton.value = null;
  activeTransitionDuration = FALLBACK_WIDTH_TRANSITION_DURATION;
  restoreReady = true;
  restoreRequested = false;
}

function restorePressedButton() {
  if (!pressedButton.value) {
    return;
  }

  const currentStyles = new Map([...resizedButtons].map((button) => {
    const style = getComputedStyle(button);

    return [button, {
      inlineSize: Number.parseFloat(style.inlineSize) || 0,
      paddingInlineStart: Number.parseFloat(style.paddingInlineStart) || 0,
      paddingInlineEnd: Number.parseFloat(style.paddingInlineEnd) || 0,
    }];
  }));
  const targetStyles = toNumericButtonStyles(new Map([...resizedButtons].map((button) => [
    button,
    restingButtonStyle.get(button),
  ])));

  delete pressedButton.value.dataset.matGroupPressed;
  pressedButton.value.style.setProperty('--mat-button-visual-scale', '1');
  pressedButton.value = null;
  restoreReady = true;
  restoreRequested = false;
  animateButtonStyles(
    currentStyles,
    targetStyles,
    activeTransitionDuration,
    finishPressedButtonRestore,
  );
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
 * @param {Map<HTMLButtonElement, { inlineSize: string, paddingInlineStart: string, paddingInlineEnd: string }>} restingStyles
 * @param {Map<HTMLButtonElement, { inlineSize: string, paddingInlineStart: string, paddingInlineEnd: string }>} expandedStyles
 */
function startExpansion(button, restingStyles, expandedStyles, transitionDuration) {
  restoreReady = false;
  restoreRequested = false;
  activeTransitionDuration = transitionDuration;

  animateButtonStyles(
    toNumericButtonStyles(restingStyles),
    toNumericButtonStyles(expandedStyles),
    transitionDuration,
    () => {
      if (pressedButton.value !== button) {
        return;
      }

      restoreReady = true;

      if (restoreRequested) {
        restorePressedButton();
      }
    },
  );

  if (prefersReducedMotion() || transitionDuration === 0) {
    restoreReady = true;
  }
}

/**
 * @param {HTMLButtonElement} button
 */
function expandButton(button) {
  if (propsWithDefaults.variant !== 'standard' || button.disabled || pressedButton.value === button) {
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
  const transitionDuration = getSizeAnimationDuration();
  const buttonLayouts = new Map(buttons.map((item) => {
    const style = getComputedStyle(item);

    return [item, {
      icon: item.classList.contains('mat-btn--icon'),
      inlineSize: measuredInlineSize.get(item) ?? item.getBoundingClientRect().width,
      paddingInlineStart: Number.parseFloat(style.paddingInlineStart) || 0,
      paddingInlineEnd: Number.parseFloat(style.paddingInlineEnd) || 0,
    }];
  }));
  const neighborButtons = buttonIndex === 0
    ? [buttons[1]]
    : buttonIndex === buttons.length - 1
      ? [buttons[buttonIndex - 1]]
      : [buttons[buttonIndex - 1], buttons[buttonIndex + 1]];
  const requestedGrowth = buttonLayouts.get(targetButton).inlineSize * (widthFactor - 1);
  const availableCompression = neighborButtons.reduce((sum, neighborButton) => {
    const layout = buttonLayouts.get(neighborButton);
    const compressibleSpace = layout.icon
      ? layout.inlineSize * (widthFactor - 1)
      : layout.paddingInlineStart + layout.paddingInlineEnd;

    return sum + compressibleSpace;
  }, 0);
  const growth = Math.min(requestedGrowth, availableCompression);
  const nextButtonStyles = new Map();
  const targetLayout = buttonLayouts.get(targetButton);

  nextButtonStyles.set(targetButton, {
    inlineSize: `${targetLayout.inlineSize + growth}px`,
    paddingInlineStart: `${targetLayout.paddingInlineStart}px`,
    paddingInlineEnd: `${targetLayout.paddingInlineEnd}px`,
  });
  neighborButtons.forEach((neighborButton) => {
    const layout = buttonLayouts.get(neighborButton);
    const buttonAvailablePadding = layout.paddingInlineStart + layout.paddingInlineEnd;
    const buttonAvailableCompression = layout.icon
      ? layout.inlineSize * (widthFactor - 1)
      : buttonAvailablePadding;
    const compression = availableCompression > 0
      ? growth * buttonAvailableCompression / availableCompression
      : 0;
    const startCompression = buttonAvailablePadding > 0
      ? compression * layout.paddingInlineStart / buttonAvailablePadding
      : 0;
    const endCompression = compression - startCompression;

    nextButtonStyles.set(neighborButton, {
      inlineSize: `${layout.inlineSize - compression}px`,
      paddingInlineStart: `${layout.paddingInlineStart - startCompression}px`,
      paddingInlineEnd: `${layout.paddingInlineEnd - endCompression}px`,
    });
  });

  nextButtonStyles.forEach((nextStyle, item) => {
    const resizedButton = item;
    const layout = buttonLayouts.get(resizedButton);
    const restingStyle = {
      inlineSize: `${layout.inlineSize}px`,
      paddingInlineStart: `${layout.paddingInlineStart}px`,
      paddingInlineEnd: `${layout.paddingInlineEnd}px`,
    };

    previousButtonStyle.set(resizedButton, {
      inlineSize: resizedButton.style.inlineSize,
      paddingInlineStart: resizedButton.style.paddingInlineStart,
      paddingInlineEnd: resizedButton.style.paddingInlineEnd,
    });
    restingButtonStyle.set(resizedButton, restingStyle);
    writeButtonStyle(resizedButton, restingStyle);
    resizedButtons.add(resizedButton);
  });

  targetButton.dataset.matGroupPressed = '';
  targetButton.style.setProperty('--mat-button-visual-scale', '.96');
  visualButton = targetButton;
  pressedButton.value = targetButton;
  startExpansion(targetButton, new Map([...resizedButtons].map((item) => [
    item,
    restingButtonStyle.get(item),
  ])), nextButtonStyles, transitionDuration);
}

function observeButtonSizes() {
  buttonResizeObserver?.disconnect();

  if (!root.value || typeof ResizeObserver !== 'function') {
    return;
  }

  buttonResizeObserver ??= new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      const borderBoxSize = Array.isArray(entry.borderBoxSize)
        ? entry.borderBoxSize[0]
        : entry.borderBoxSize;
      const inlineSize = borderBoxSize?.inlineSize ?? entry.contentRect.width;

      if (!resizedButtons.has(entry.target) && inlineSize > 0) {
        measuredInlineSize.set(entry.target, inlineSize);
      }
    });
  });
  root.value.querySelectorAll('.mat-button-base').forEach((button) => {
    buttonResizeObserver.observe(button, { box: 'border-box' });
  });
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
  if (propsWithDefaults.variant !== 'connected' || !root.value) {
    return;
  }

  if (propsWithDefaults.selection === 'none') {
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

onMounted(() => {
  validateConnectedChildren();
  observeButtonSizes();
});
onUpdated(observeButtonSizes);
onBeforeUnmount(() => {
  buttonResizeObserver?.disconnect();
  finishPressedButtonRestore();
});
watch(
  () => [propsWithDefaults.variant, propsWithDefaults.selection],
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
      `mat-btn-group--${propsWithDefaults.variant}`,
      `mat-btn-group--size-${propsWithDefaults.size}`,
      `mat-btn-group--shape-${propsWithDefaults.shape}`,
      {
        'mat-btn-group--block': propsWithDefaults.block,
        'mat-btn-group--full-width': propsWithDefaults.variant === 'connected' && propsWithDefaults.fullWidth,
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
  --mat-btn-group-size-animation-duration: var(--mat-sys-motion-duration-short3);
  gap: var(--mat-btn-group-standard-between-space);
}

.mat-btn-group--standard :deep(.mat-button-base) {
  --mat-button-size-motion: 0s;
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

.mat-btn-group--connected :deep(.mat-button-base:focus-visible) {
  z-index: 1;
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
