<script setup>
import {
  computed, inject, nextTick, onBeforeUnmount, onMounted, onUpdated, ref,
  shallowRef, useAttrs, useId, useSlots, watch,
} from 'vue';
import MatSurfaceBase from '../MatSurfaceBase.vue';
import { addAnchorName, removeAnchorName } from '../../anchor-names';
import createMotionController from '../motion-controller';
import { isComponentColor } from '../button-props';
import { MAT_APP_ROOT_KEY } from '../mat-app-root/mat-app-root-context';
import useComponentColor from '../use-component-color';
import { isValidCssLength, toCssLength } from '../value-utils';
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatDockedContainer',
  inheritAttrs: false,
});

const CLOSE_DURATION = 200;
const OPEN_DURATION = 150;

const SIZE_WIDTHS = Object.freeze({
  small: '280px',
  medium: '328px',
  large: '560px',
});

const props = defineProps({
  /**
    * 受控打开状态，可使用 v-model。
    *
    * @type {boolean}
    * @default false
    */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /**
    * 元素选择器或 `[clientX, clientY]` 视口坐标；未设置时使用 activator Slot。
    *
    * @type {string | [number, number] | undefined}
    * @default undefined
    */
  anchor: {
    type: [String, Array],
    default: undefined,
    validator(value) {
      return value === undefined
         || typeof value === 'string'
         || (
           Array.isArray(value)
           && value.length === 2
           && value.every((coordinate) => Number.isFinite(coordinate))
         );
    },
  },
  /**
    * 浮动容器相对锚点的 `[x, y]` 偏移像素。
    *
    * @type {[number, number]}
    * @default [0, 0]
    */
  offset: {
    type: Array,
    default: () => [0, 0],
    validator(value) {
      return value.length === 2
         && value.every((coordinate) => Number.isFinite(coordinate));
    },
  },
  /**
    * 首选宽度；数字与纯数字字符串按 px 处理，其他字符串须为合法 CSS 宽度值。
    *
    * @type {number | string | undefined}
    * @default undefined
    */
  width: {
    type: [Number, String],
    default: undefined,
    validator: (value) => isValidCssLength(value, {
      property: 'inline-size',
      positive: true,
    }),
  },
  /**
    * 内置尺寸预设；可选值为 `small` (280px)、`medium` (328px)、`large` (560px)。
    *
    * @type {'small' | 'medium' | 'large' | undefined}
    * @default undefined
    */
  size: {
    type: String,
    default: undefined,
    validator(value) {
      return value === undefined || ['small', 'medium', 'large'].includes(value);
    },
  },
  /**
    * 快捷设置容器标题。
    *
    * @type {string | undefined}
    * @default undefined
    */
  headline: {
    type: String,
    default: undefined,
  },
  /**
    * 浮动容器配色形态；可选值为 `standard`、`vibrant`。
    *
    * @type {'standard' | 'vibrant' | undefined}
    * @default undefined
    */
  variant: {
    type: String,
    default: undefined,
    validator(value) {
      return value === undefined || ['standard', 'vibrant'].includes(value);
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
    * 容器最大块轴长度；数字与纯数字字符串按 px 处理，其他字符串须为合法 CSS 长度。
    *
    * @type {number | string | undefined}
    * @default undefined
    */
  maxLength: {
    type: [Number, String],
    default: undefined,
    validator: (value) => isValidCssLength(value, {
      property: 'max-block-size',
      positive: true,
    }),
  },
  /**
    * 是否使用透明帷幕拦截容器外部的指针交互。
    *
    * @type {boolean}
    * @default true
    */
  scrim: {
    type: Boolean,
    default: true,
  },
});
const propsWithDefaults = useMatProps('dockedContainer', props);
const emit = defineEmits({
  /**
    * 容器请求关闭时发出 false。
    */
  'update:modelValue': (payload) => typeof payload === 'boolean',
  /**
    * 展开进入动画完成后触发。
    */
  opened: () => true,
  /**
    * 收起退出动画完成后触发。
    */
  closed: () => true,
});
const attrs = useAttrs();
const slots = useSlots();
const appContext = inject(MAT_APP_ROOT_KEY, null);
const activatorHost = ref(null);
const scrimElement = ref(null);
const surface = ref(null);
const appViewport = shallowRef(null);
const root = computed(() => surface.value?.root ?? surface.value?.$el ?? null);
const generatedId = useId().replace(/[^\w-]/g, '-');
const containerId = computed(() => attrs.id ?? `${generatedId}-docked-container`);
const headlineId = computed(() => `${generatedId}-headline`);
const anchorName = `--mat-docked-container-anchor-${generatedId}`;
const phase = ref('closed');
let attachedAnchor = null;
let popoverShown = false;
let scrimShown = false;
let programmaticClose = false;
const phaseMotion = createMotionController();
let viewportFrame;
let sizeObserver;
let returnFocusElement = null;
let outsidePointerListenerAttached = false;

const hasActivatorSlot = computed(() => Boolean(slots.activator));
const isCoordinateAnchor = computed(() => (
  !hasActivatorSlot.value && isCoordinatePair(propsWithDefaults.anchor)
));
const usesScrim = computed(() => propsWithDefaults.scrim);
const needsOutsideListener = computed(() => (
  !usesScrim.value || Boolean(appContext)
));
const popoverMode = computed(() => (usesScrim.value ? 'manual' : 'auto'));
const effectiveOpen = computed(() => propsWithDefaults.modelValue);
const effectiveVariant = computed(() => propsWithDefaults.variant ?? 'standard');
const effectiveColor = computed(() => propsWithDefaults.color);
const hasHeadline = computed(() => (
  propsWithDefaults.headline !== undefined || Boolean(slots.headline)
));
const { colorStyle } = useComponentColor(effectiveColor);

const widthStyle = computed(() => {
  if (propsWithDefaults.width !== undefined) {
    const customWidth = toCssLength(propsWithDefaults.width, {
      property: 'inline-size',
      positive: true,
    });

    if (customWidth !== undefined) {
      return {
        inlineSize: `min(${customWidth}, calc(var(--mat-docked-container-viewport-width) - (2 * var(--mat-docked-container-viewport-space))))`,
      };
    }
  }

  if (propsWithDefaults.size && SIZE_WIDTHS[propsWithDefaults.size]) {
    const sizeWidth = SIZE_WIDTHS[propsWithDefaults.size];

    return {
      inlineSize: `min(${sizeWidth}, calc(var(--mat-docked-container-viewport-width) - (2 * var(--mat-docked-container-viewport-space))))`,
    };
  }

  return undefined;
});

const maxLengthStyle = computed(() => {
  if (propsWithDefaults.maxLength === undefined) {
    return undefined;
  }

  const maxLength = toCssLength(propsWithDefaults.maxLength, {
    property: 'max-block-size',
    positive: true,
  });

  if (maxLength === undefined) {
    return undefined;
  }

  const resolvedMaxLength = `min(${maxLength}, calc(var(--mat-docked-container-viewport-height) - (2 * var(--mat-docked-container-viewport-space))))`;

  return {
    '--mat-docked-container-resolved-max-length': resolvedMaxLength,
    maxBlockSize: resolvedMaxLength,
  };
});

const positionStyle = computed(() => {
  const [offsetX, offsetY] = isCoordinatePair(propsWithDefaults.offset)
    ? propsWithDefaults.offset
    : [0, 0];
  const style = {
    '--mat-docked-container-offset-x': `${offsetX}px`,
    '--mat-docked-container-offset-y': `${offsetY}px`,
    positionAnchor: isCoordinateAnchor.value ? 'auto' : anchorName,
  };

  if (isCoordinateAnchor.value && isCoordinatePair(propsWithDefaults.anchor)) {
    style.left = `${propsWithDefaults.anchor[0]}px`;
    style.top = `${propsWithDefaults.anchor[1]}px`;
  }

  return style;
});

const viewportStyle = computed(() => {
  const viewport = appViewport.value;

  if (!viewport) {
    return undefined;
  }

  return {
    '--mat-docked-container-viewport-width': `${viewport.width}px`,
    '--mat-docked-container-viewport-height': `${viewport.height}px`,
  };
});

const scrimStyle = computed(() => {
  const viewport = appViewport.value;

  if (!viewport) {
    return undefined;
  }

  return {
    left: `${viewport.left}px`,
    top: `${viewport.top}px`,
    width: `${viewport.width}px`,
    height: `${viewport.height}px`,
  };
});

const rootStyle = computed(() => [
  colorStyle.value,
  positionStyle.value,
  viewportStyle.value,
  widthStyle.value,
  maxLengthStyle.value,
  attrs.style,
]);

/**
  * @param {unknown} value
  * @returns {value is [number, number]}
  */
function isCoordinatePair(value) {
  return Array.isArray(value)
     && value.length === 2
     && value.every((coordinate) => Number.isFinite(coordinate));
}

/**
  * @returns {HTMLElement | null}
  */
function resolveAnchor() {
  if (hasActivatorSlot.value) {
    const elements = activatorHost.value ? [...activatorHost.value.children] : [];

    if (elements.length === 1 && elements[0] instanceof HTMLElement
       && elements[0].ownerDocument === document) {
      return elements[0];
    }

    return null;
  }

  if (!propsWithDefaults.anchor || typeof propsWithDefaults.anchor !== 'string') {
    return null;
  }

  return document.getElementById(propsWithDefaults.anchor);
}

function detachAnchor() {
  if (!attachedAnchor) {
    return;
  }

  removeAnchorName(attachedAnchor, anchorName);
  attachedAnchor = null;
}

/**
  * @returns {HTMLElement | null}
  */
function attachAnchor() {
  const anchorElement = resolveAnchor();

  if (!anchorElement) {
    return null;
  }

  if (attachedAnchor === anchorElement) {
    return anchorElement;
  }

  detachAnchor();
  attachedAnchor = anchorElement;
  addAnchorName(anchorElement, anchorName);

  return anchorElement;
}

function clearPhaseTimer() {
  phaseMotion.cancel();
}

function showScrim() {
  if (!usesScrim.value || !scrimElement.value || scrimShown) {
    return;
  }

  scrimShown = true;
  scrimElement.value.showPopover?.();
}

function hideScrim() {
  if (!scrimShown) {
    return;
  }

  scrimShown = false;
  scrimElement.value?.hidePopover?.();
}

function finishClose() {
  if (root.value && popoverShown) {
    popoverShown = false;
    programmaticClose = true;
    root.value.hidePopover?.();
  }

  hideScrim();
  phase.value = 'closed';
  emit('closed');
}

function finishNativeClose() {
  hideScrim();
  phase.value = 'closed';
  emit('closed');
}

function animateNativeClose() {
  phase.value = 'closing';
  phaseMotion.wait(root.value, CLOSE_DURATION, finishNativeClose);
}

function hidePopover({ immediate = false } = {}) {
  if (!root.value || !popoverShown) {
    return;
  }

  programmaticClose = true;

  if (immediate) {
    clearPhaseTimer();
    finishClose();
    return;
  }

  if (phase.value === 'closing') {
    return;
  }

  phase.value = 'closing';
  phaseMotion.wait(root.value, CLOSE_DURATION, finishClose);
}

function clampToViewport() {
  viewportFrame = undefined;

  if (!root.value || !popoverShown) {
    return;
  }

  const viewport = appViewport.value ?? {
    bottom: window.innerHeight,
    left: 0,
    right: window.innerWidth,
    top: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const style = root.value.style;
  const rect = root.value.getBoundingClientRect();
  const currentX = Number.parseFloat(
    style.getPropertyValue('--mat-docked-container-viewport-shift-x'),
  ) || 0;
  const currentY = Number.parseFloat(
    style.getPropertyValue('--mat-docked-container-viewport-shift-y'),
  ) || 0;
  const configuredSpace = Number.parseFloat(
    getComputedStyle(root.value).getPropertyValue('--mat-docked-container-viewport-space'),
  );
  const space = Number.isFinite(configuredSpace) ? configuredSpace : 8;
  const baseRect = {
    bottom: rect.bottom - currentY,
    left: rect.left - currentX,
    right: rect.right - currentX,
    top: rect.top - currentY,
  };
  let shiftX = 0;
  let shiftY = 0;

  if (baseRect.left < viewport.left + space) {
    shiftX = viewport.left + space - baseRect.left;
  } else if (baseRect.right > viewport.right - space) {
    shiftX = viewport.right - space - baseRect.right;
  }

  if (baseRect.top < viewport.top + space) {
    shiftY = viewport.top + space - baseRect.top;
  } else if (baseRect.bottom > viewport.bottom - space) {
    shiftY = viewport.bottom - space - baseRect.bottom;
  }

  style.setProperty('--mat-docked-container-viewport-shift-x', `${shiftX}px`);
  style.setProperty('--mat-docked-container-viewport-shift-y', `${shiftY}px`);
}

function syncAppViewport() {
  if (!appContext) {
    appViewport.value = null;
    return;
  }

  const viewport = appContext.getLayoutRect();

  appViewport.value = viewport;

  if (scrimElement.value) {
    Object.assign(scrimElement.value.style, {
      height: `${viewport.height}px`,
      left: `${viewport.left}px`,
      top: `${viewport.top}px`,
      width: `${viewport.width}px`,
    });
  }
}

function scheduleViewportClamp() {
  syncAppViewport();

  if (viewportFrame !== undefined) {
    cancelAnimationFrame(viewportFrame);
  }

  viewportFrame = requestAnimationFrame(clampToViewport);
}

async function showPopover() {
  clearPhaseTimer();
  programmaticClose = false;
  await nextTick();
  const anchorElement = isCoordinateAnchor.value ? null : attachAnchor();
  const hasAnchor = isCoordinateAnchor.value || Boolean(anchorElement);

  if (!root.value || !hasAnchor) {
    console.warn(
      hasActivatorSlot.value
        ? 'MatDockedContainer: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点'
        : 'MatDockedContainer: modelValue 为 true 时必须通过 anchor 提供元素 id 或视口坐标',
    );
    emit('update:modelValue', false);
    return;
  }

  if (!popoverShown) {
    if (isCoordinateAnchor.value && document.activeElement instanceof HTMLElement) {
      returnFocusElement = document.activeElement;
    }

    showScrim();
    popoverShown = true;
    root.value.showPopover?.();
  }

  scheduleViewportClamp();
  phase.value = 'opening';
  phaseMotion.wait(root.value, OPEN_DURATION, () => {
    phase.value = 'open';
    emit('opened');
  });
}

function focusAnchor() {
  const focusTarget = resolveAnchor() ?? returnFocusElement;

  returnFocusElement = null;
  nextTick(() => {
    if (focusTarget && typeof focusTarget.focus === 'function') {
      focusTarget.focus();
    }
  });
}

function closeSelf({ focus = true, immediate = false } = {}) {
  emit('update:modelValue', false);
  hidePopover({ immediate });

  if (focus) {
    focusAnchor();
  }
}

/**
  * @param {PointerEvent} event
  */
function handleScrimPointerDown(event) {
  event.preventDefault();
  closeSelf();
}

/**
  * @param {PointerEvent} event
  */
function handleDocumentPointerDown(event) {
  const target = event.target;

  if (!(target instanceof Node)
     || root.value?.contains(target)
     || scrimElement.value?.contains(target)
     || attachedAnchor?.contains(target)) {
    return;
  }

  closeSelf();
}

/**
  * @param {KeyboardEvent} event
  */
function handleKeyDown(event) {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeSelf();
  }
}

/**
  * @param {ToggleEvent} event
  */
function handleToggle(event) {
  popoverShown = event.newState === 'open';

  if (popoverShown) {
    scheduleViewportClamp();
    return;
  }

  const wasProgrammatic = programmaticClose;

  programmaticClose = false;

  if (!effectiveOpen.value || wasProgrammatic) {
    return;
  }

  animateNativeClose();
  emit('update:modelValue', false);
  focusAnchor();
}

onMounted(() => {
  window.addEventListener('resize', scheduleViewportClamp);
  window.addEventListener('scroll', scheduleViewportClamp, { capture: true, passive: true });

  if (effectiveOpen.value) {
    bindOutsidePointerListener();
  }

  if (typeof ResizeObserver !== 'undefined' && root.value) {
    sizeObserver = new ResizeObserver(scheduleViewportClamp);
    sizeObserver.observe(root.value);
  }

  if (effectiveOpen.value) {
    showPopover();
  }
});

onUpdated(() => {
  if (!effectiveOpen.value || isCoordinateAnchor.value) {
    return;
  }

  const nextAnchor = resolveAnchor();

  if (nextAnchor !== attachedAnchor) {
    detachAnchor();
    showPopover();
  }
});

onBeforeUnmount(() => {
  clearPhaseTimer();

  if (viewportFrame !== undefined) {
    cancelAnimationFrame(viewportFrame);
  }

  sizeObserver?.disconnect();
  window.removeEventListener('resize', scheduleViewportClamp);
  window.removeEventListener('scroll', scheduleViewportClamp, { capture: true });
  unbindOutsidePointerListener();
  hidePopover({ immediate: true });
  hideScrim();
  detachAnchor();
});

function bindOutsidePointerListener() {
  if (!needsOutsideListener.value || outsidePointerListenerAttached) {
    return;
  }

  document.addEventListener('pointerdown', handleDocumentPointerDown, true);
  outsidePointerListenerAttached = true;
}

function unbindOutsidePointerListener() {
  if (!outsidePointerListenerAttached) {
    return;
  }

  document.removeEventListener('pointerdown', handleDocumentPointerDown, true);
  outsidePointerListenerAttached = false;
}

watch(effectiveOpen, (open) => {
  if (open) {
    bindOutsidePointerListener();
    showPopover();
  } else {
    unbindOutsidePointerListener();
    hidePopover();
    focusAnchor();
  }
});

watch(() => propsWithDefaults.anchor, async () => {
  detachAnchor();

  if (effectiveOpen.value) {
    await showPopover();
  }
}, { deep: true });

watch(() => propsWithDefaults.offset, async () => {
  if (effectiveOpen.value) {
    await nextTick();
    scheduleViewportClamp();
  }
}, { deep: true });

watch(() => propsWithDefaults.maxLength, async () => {
  if (effectiveOpen.value) {
    await nextTick();
    scheduleViewportClamp();
  }
});

watch(() => propsWithDefaults.scrim, async () => {
  if (root.value && popoverShown) {
    popoverShown = false;
    programmaticClose = true;
    root.value.hidePopover?.();
  }

  hideScrim();
  unbindOutsidePointerListener();
  await nextTick();

  if (effectiveOpen.value) {
    bindOutsidePointerListener();
    await showPopover();
  }
});

if (appContext) {
  watch(appContext.publicContext.layout, scheduleViewportClamp);
}
</script>

<template>
  <span v-if="hasActivatorSlot" ref="activatorHost" class="mat-docked-container__activator">
    <slot name="activator" />
  </span>

  <div
    v-if="propsWithDefaults.scrim"
    ref="scrimElement"
    aria-hidden="true"
    class="mat-docked-container__scrim"
    popover="manual"
    :style="scrimStyle"
    @pointerdown="handleScrimPointerDown"
  />

  <MatSurfaceBase
    :id="containerId"
    ref="surface"
    v-bind="$attrs"
    class="mat-docked-container"
    :class="[
      `mat-docked-container--${effectiveVariant}`,
      {
        'mat-docked-container--coordinate': isCoordinateAnchor,
        'mat-docked-container--closing': phase === 'closing',
      },
    ]"
    :style="rootStyle"
    :popover="popoverMode"
    :aria-labelledby="$attrs['aria-labelledby'] ?? (hasHeadline ? headlineId : undefined)"
    role="region"
    tabindex="-1"
    @keydown="handleKeyDown"
    @toggle="handleToggle"
  >
    <div class="mat-docked-container__panel">
      <header
        v-if="hasHeadline"
        :id="headlineId"
        class="mat-docked-container__headline mat-sys-typescale-title-medium"
      >
        <slot v-if="$slots.headline" name="headline" />
        <template v-else-if="propsWithDefaults.headline !== undefined">
          {{ propsWithDefaults.headline }}
        </template>
      </header>

      <div class="mat-docked-container__body">
        <slot />
      </div>

      <footer v-if="$slots.actions" class="mat-docked-container__actions">
        <slot name="actions" />
      </footer>
    </div>
  </MatSurfaceBase>
</template>

 <style scoped>
  @layer mde.components {
    .mat-docked-container__activator {
      display: contents;
    }

    .mat-docked-container__scrim {
      position: fixed;
      inset: 0;
      box-sizing: border-box;
      inline-size: 100dvi;
      block-size: 100dvb;
      padding: 0;
      margin: 0;
      overflow: hidden;
      background: transparent;
      border: 0;
    }

    .mat-docked-container {
      --mat-docked-container-container-color: var(--mat-sys-color-surface-container-high);
      --mat-docked-container-content-color: var(--mat-sys-color-on-surface);
      --mat-docked-container-supporting-color: var(--mat-sys-color-on-surface-variant);
      --mat-docked-container-viewport-shift-x: 0;
      --mat-docked-container-viewport-shift-y: 0;
      --mat-docked-container-viewport-width: 100dvi;
      --mat-docked-container-viewport-height: 100dvb;
      --mat-docked-container-viewport-space: 8px;
      --mat-docked-container-anchor-space: 4px;
      --mat-docked-container-resolved-max-length: calc(
        var(--mat-docked-container-viewport-height) - (2 * var(--mat-docked-container-viewport-space))
      );
      position: fixed;
      inset: auto;
      position-area: block-end span-inline-end;
      position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;
      box-sizing: border-box;
      min-inline-size: min(280px, calc(100dvi - (2 * var(--mat-docked-container-viewport-space))));
      max-inline-size: min(
        560px,
        calc(var(--mat-docked-container-viewport-width) - (2 * var(--mat-docked-container-viewport-space)))
      );
      max-block-size: calc(
        var(--mat-docked-container-viewport-height) - (2 * var(--mat-docked-container-viewport-space))
      );
      padding: 0;
      margin: var(--mat-docked-container-anchor-space) 0;
      overflow: visible;
      color: var(--mat-docked-container-content-color);
      background: transparent;
      border: 0;
      border-radius: var(--mat-sys-shape-corner-extra-large);
      box-shadow: var(--mat-sys-elevation-level3);
      opacity: 1;
      translate: calc(var(--mat-docked-container-offset-x, 0px) + var(--mat-docked-container-viewport-shift-x, 0px))
        calc(var(--mat-docked-container-offset-y, 0px) + var(--mat-docked-container-viewport-shift-y, 0px));
      transform: scale(1);
      transform-origin: top left;
      transition: opacity var(--mat-sys-motion-spring-fast-effects), transform var(--mat-sys-motion-spring-fast-spatial), display 150ms, overlay 150ms;
      transition-behavior: allow-discrete;
    }

    .mat-docked-container:not(:popover-open) {
      opacity: 0;
      transform: scale(.96);
    }

    .mat-docked-container--closing {
      pointer-events: none;
      opacity: 0;
      transform: scale(.96);
      transition-duration: 150ms;
      transition-timing-function: cubic-bezier(.31, .94, .34, 1);
    }

    .mat-docked-container__panel {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      min-inline-size: 100%;
      min-block-size: 0;
      max-block-size: inherit;
      padding: 0;
      overflow: auto;
      overscroll-behavior: contain;
      background: var(--mat-docked-container-container-color);
      border-radius: inherit;
    }

    .mat-docked-container__headline {
      flex-shrink: 0;
      box-sizing: border-box;
      inline-size: 100%;
      padding-block-start: 24px;
      padding-inline: 24px;
      margin: 0;
      text-align: start;
      overflow-wrap: anywhere;
      color: var(--mat-docked-container-content-color);
    }

    .mat-docked-container__body {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      box-sizing: border-box;
      inline-size: 100%;
      padding: 24px;
    }

    .mat-docked-container__headline + .mat-docked-container__body {
      padding-block-start: 20px;
    }

    .mat-docked-container__actions {
      display: flex;
      flex-shrink: 0;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
      box-sizing: border-box;
      inline-size: 100%;
      padding-block-end: 24px;
      padding-inline: 24px;
    }

    .mat-docked-container__body:has(+ .mat-docked-container__actions) {
      padding-block-end: 0;
    }

    .mat-docked-container--coordinate {
      position-area: none;
      position-try-fallbacks: none;
      margin: 0;
    }

    .mat-docked-container--vibrant {
      --mat-docked-container-container-color: var(--mat-accent-container-color, var(--mat-sys-color-tertiary-container));
      --mat-docked-container-content-color: var(--mat-on-accent-container-color, var(--mat-sys-color-on-tertiary-container));
      --mat-docked-container-supporting-color: var(--mat-on-accent-container-color, var(--mat-sys-color-on-tertiary-container));
    }

    @starting-style {
      .mat-docked-container:popover-open {
        opacity: 0;
        transform: scale(.96);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .mat-docked-container {
        transition: none;
      }
    }
  }
 </style>
