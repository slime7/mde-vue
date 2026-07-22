<script setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useAttrs,
  useSlots,
  watch,
} from 'vue';
import { registerToolbar } from '../toolbar-overlay';

const TOOLBAR_VARIANTS = [
  'docked',
  'floating',
  'floating-bottom',
  'floating-left',
  'floating-right',
];
const TOOLBAR_ANIMATION_DURATION = 200;

defineOptions({
  name: 'MatToolbar',
  inheritAttrs: false,
});

/**
 * @param {unknown} value
 * @returns {boolean}
 */
function isBottomPlaceholder(value) {
  if (typeof value === 'number') {
    return Number.isFinite(value) && value >= 0;
  }

  if (typeof value !== 'string') {
    return false;
  }

  const cssValue = value.trim();

  if (!cssValue || /[;{}]/.test(cssValue)) {
    return false;
  }

  if (typeof CSS === 'undefined' || typeof CSS.supports !== 'function') {
    return true;
  }

  return CSS.supports('block-size', cssValue);
}

/**
 * @param {unknown} value
 * @returns {string}
 */
function normalizeBottomPlaceholder(value) {
  if (typeof value === 'number' && Number.isFinite(value) && value >= 0) {
    return `${value}px`;
  }

  if (typeof value === 'string' && isBottomPlaceholder(value)) {
    return value.trim();
  }

  return '0px';
}

/**
 * @param {unknown} value
 * @returns {HTMLElement | null}
 */
function normalizeAttach(value) {
  if (value instanceof HTMLElement && value.ownerDocument === document) {
    return value;
  }

  return null;
}

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true,
  },
  variant: {
    type: String,
    default: 'docked',
    validator(value) {
      return [
        'docked',
        'floating',
        'floating-bottom',
        'floating-left',
        'floating-right',
      ].includes(value);
    },
  },
  position: {
    type: String,
    default: 'center',
    validator(value) {
      return ['start', 'center', 'end'].includes(value);
    },
  },
  vibrant: {
    type: Boolean,
    default: false,
  },
  app: {
    type: Boolean,
    default: false,
  },
  attach: {
    type: [String, Object],
    default: 'body',
  },
  placeholder: {
    type: Boolean,
    default: false,
  },
  bottomPlaceholder: {
    type: [Number, String],
    default: 0,
    validator(value) {
      if (typeof value === 'number') {
        return Number.isFinite(value) && value >= 0;
      }

      if (typeof value !== 'string') {
        return false;
      }

      const cssValue = value.trim();

      if (!cssValue || /[;{}]/.test(cssValue)) {
        return false;
      }

      if (typeof CSS === 'undefined' || typeof CSS.supports !== 'function') {
        return true;
      }

      return CSS.supports('block-size', cssValue);
    },
  },
});
defineEmits({
  'update:modelValue': (value) => typeof value === 'boolean',
});

const attrs = useAttrs();
const slots = useSlots();
const rendered = ref(props.modelValue);
const phase = ref(props.modelValue ? 'open' : 'closed');
const toolbarElement = ref(null);
const fabElement = ref(null);
const toolbarSize = ref({
  blockSize: 0,
  inlineSize: 0,
});
const normalizedVariant = computed(() => {
  if (!TOOLBAR_VARIANTS.includes(props.variant)) {
    return 'docked';
  }

  return props.variant === 'floating' ? 'floating-bottom' : props.variant;
});
const normalizedPosition = computed(() => (
  ['start', 'center', 'end'].includes(props.position) ? props.position : 'center'
));
const isFloating = computed(() => normalizedVariant.value.startsWith('floating'));
const isVertical = computed(() => (
  normalizedVariant.value === 'floating-left'
  || normalizedVariant.value === 'floating-right'
));
const isBottomVariant = computed(() => (
  normalizedVariant.value === 'docked'
  || normalizedVariant.value === 'floating-bottom'
));
const attachTarget = computed(() => {
  if (!props.app) {
    return null;
  }

  if (typeof props.attach === 'string') {
    try {
      return document.querySelector(props.attach);
    } catch {
      return null;
    }
  }

  return normalizeAttach(props.attach);
});
const normalizedBottomPlaceholder = computed(() => (
  normalizeBottomPlaceholder(props.bottomPlaceholder)
));
const effectiveBottomPlaceholder = computed(() => (
  props.app && isBottomVariant.value ? normalizedBottomPlaceholder.value : '0px'
));
const toolbarStyle = computed(() => [
  attrs.style,
  {
    '--mat-toolbar-bottom-placeholder': effectiveBottomPlaceholder.value,
  },
]);
const placeholderStyle = computed(() => ({
  blockSize: `${toolbarSize.value.blockSize}px`,
  inlineSize: `${toolbarSize.value.inlineSize}px`,
}));
const toolbarClass = computed(() => [
  `mat-toolbar--${normalizedVariant.value}`,
  `mat-toolbar--position-${normalizedPosition.value}`,
  {
    'mat-toolbar--app': props.app,
    'mat-toolbar--vertical': isVertical.value,
    'mat-toolbar--vibrant': props.vibrant,
  },
]);

let registration;
let resizeObserver;
let mounted = false;
let phaseTimer;
let warnedForFabSlot = false;

function clearPhaseTimer() {
  if (phaseTimer !== undefined) {
    window.clearTimeout(phaseTimer);
    phaseTimer = undefined;
  }
}

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

/**
 * @param {() => void} callback
 */
function waitForAnimation(callback) {
  clearPhaseTimer();

  if (prefersReducedMotion()) {
    callback();
    return;
  }

  phaseTimer = window.setTimeout(() => {
    phaseTimer = undefined;
    callback();
  }, TOOLBAR_ANIMATION_DURATION);
}

function openToolbar() {
  clearPhaseTimer();
  rendered.value = true;
  phase.value = 'opening';
  waitForAnimation(() => {
    if (rendered.value && props.modelValue) {
      phase.value = 'open';
    }
  });
}

function closeToolbar() {
  clearPhaseTimer();

  if (!rendered.value) {
    phase.value = 'closed';
    return;
  }

  phase.value = 'closing';
  waitForAnimation(() => {
    if (!props.modelValue) {
      rendered.value = false;
      phase.value = 'closed';
    }
  });
}

function validateFabSlot() {
  if (warnedForFabSlot || !slots.fab || isFloating.value) {
    return;
  }

  warnedForFabSlot = true;
  console.warn('MatToolbar: fab Slot 仅支持 floating variant');
}

function syncToolbarSize() {
  const rect = toolbarElement.value?.getBoundingClientRect();

  if (!rect) {
    return;
  }

  toolbarSize.value = {
    blockSize: Math.max(0, Math.ceil(Number(rect.height) || 0)),
    inlineSize: Math.max(0, Math.ceil(Number(rect.width) || 0)),
  };
  registration?.update();
}

function getToolbarRect() {
  if (!toolbarElement.value) {
    return null;
  }

  const toolbarRect = toolbarElement.value.getBoundingClientRect();
  const fabRect = fabElement.value?.getBoundingClientRect();

  if (!fabRect || (fabRect.width === 0 && fabRect.height === 0)) {
    return toolbarRect;
  }

  const left = Math.min(toolbarRect.left, fabRect.left);
  const right = Math.max(toolbarRect.right, fabRect.right);
  const top = Math.min(toolbarRect.top, fabRect.top);
  const bottom = Math.max(toolbarRect.bottom, fabRect.bottom);

  return {
    bottom,
    height: bottom - top,
    left,
    right,
    top,
    width: right - left,
  };
}

async function scheduleToolbarSize() {
  if (!mounted) {
    return;
  }

  await nextTick();
  syncToolbarSize();
}

function stopToolbarRegistration() {
  resizeObserver?.disconnect();
  resizeObserver = undefined;
  window.removeEventListener('resize', syncToolbarSize);
  registration?.unregister();
  registration = undefined;
}

async function syncToolbarRegistration() {
  await nextTick();

  if (!mounted) {
    return;
  }

  if (!props.app || !rendered.value || !toolbarElement.value) {
    stopToolbarRegistration();
    return;
  }

  if (!registration) {
    registration = registerToolbar(toolbarElement.value, {
      getRect: getToolbarRect,
      isBottom: () => isBottomVariant.value,
    });
    resizeObserver = typeof ResizeObserver === 'undefined'
      ? undefined
      : new ResizeObserver(syncToolbarSize);
    resizeObserver?.observe(toolbarElement.value);
    window.addEventListener('resize', syncToolbarSize);
  }

  if (fabElement.value) {
    resizeObserver?.observe(fabElement.value);
  }

  syncToolbarSize();
  validateFabSlot();
}

onMounted(() => {
  mounted = true;
  warnForInvalidAttach();
  validateFabSlot();
  syncToolbarRegistration();
});

onBeforeUnmount(() => {
  mounted = false;
  clearPhaseTimer();
  stopToolbarRegistration();
});

watch(() => props.modelValue, (value) => {
  if (!mounted) {
    return;
  }

  if (value) {
    openToolbar();
    return;
  }

  closeToolbar();
});
watch(rendered, syncToolbarRegistration);
watch([
  normalizedVariant,
  normalizedPosition,
  normalizedBottomPlaceholder,
  () => props.app,
  () => props.attach,
], () => {
  warnForInvalidAttach();
  scheduleToolbarSize();
  syncToolbarRegistration();
});

function warnForInvalidAttach() {
  if (props.app && !attachTarget.value) {
    console.warn('MatToolbar: attach 必须指向当前 document 中存在的 HTMLElement');
  }
}
</script>

<template>
  <span
    v-if="app && attachTarget && placeholder && rendered"
    class="mat-toolbar__placeholder"
    :style="placeholderStyle"
    aria-hidden="true"
  />

  <Teleport
    :to="attachTarget ?? 'body'"
    :disabled="!app"
  >
    <div
      v-if="rendered && (!app || attachTarget)"
      ref="toolbarElement"
      v-bind="$attrs"
      class="mat-toolbar"
      :class="[toolbarClass, `mat-toolbar--${phase}`]"
      :style="toolbarStyle"
      role="toolbar"
      :aria-orientation="isVertical ? 'vertical' : undefined"
    >
      <div class="mat-toolbar__surface">
        <div class="mat-toolbar__content">
          <slot />
        </div>
      </div>

      <div
        v-if="isFloating && slots.fab"
        ref="fabElement"
        class="mat-toolbar__fab"
      >
        <slot name="fab" />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.mat-toolbar__placeholder {
  display: block;
  flex: 0 0 auto;
  min-inline-size: 0;
  min-block-size: 0;
  pointer-events: none;
  visibility: hidden;
}

.mat-toolbar {
  --mat-toolbar-container-color: var(--mat-sys-color-surface-container);
  --mat-toolbar-content-color: var(--mat-sys-color-on-surface);
  --mat-toolbar-position-translate-x: 0;
  --mat-toolbar-position-translate-y: 0;
  position: relative;
  z-index: var(--mat-sys-z-index-toolbar);
  box-sizing: border-box;
  display: flex;
  gap: var(--mat-toolbar-content-gap);
  align-items: center;
  color: var(--mat-toolbar-content-color);
  pointer-events: none;
}

.mat-toolbar--app {
  position: fixed;
}

.mat-toolbar--closing .mat-toolbar__surface {
  pointer-events: none;
}

.mat-toolbar--closing .mat-toolbar__fab {
  pointer-events: none;
}

.mat-toolbar--vibrant {
  --mat-toolbar-container-color: var(--mat-sys-color-primary-container);
  --mat-toolbar-content-color: var(--mat-sys-color-on-primary-container);
}

.mat-toolbar__surface {
  display: flex;
  flex: 0 0 auto;
  gap: var(--mat-toolbar-content-gap);
  align-items: center;
  box-sizing: border-box;
  min-block-size: var(--mat-toolbar-container-height);
  padding-inline: var(--mat-toolbar-container-padding);
  color: inherit;
  background: var(--mat-toolbar-container-color);
  border-radius: var(--mat-toolbar-container-shape);
  box-shadow: var(--mat-toolbar-container-elevation);
  pointer-events: auto;
}

.mat-toolbar__content {
  display: flex;
  flex: 1 1 auto;
  flex-wrap: nowrap;
  gap: var(--mat-toolbar-content-gap);
  align-items: center;
  min-inline-size: 0;
}

.mat-toolbar__fab {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  pointer-events: auto;
}

.mat-toolbar--docked {
  inset-inline: 0;
  inset-block-end: 0;
  padding-block-end: var(--mat-toolbar-bottom-placeholder);
  background: var(--mat-toolbar-container-color);
}

.mat-toolbar--docked .mat-toolbar__surface {
  inline-size: 100%;
  border-radius: var(--mat-sys-shape-corner-none);
  box-shadow: none;
}

.mat-toolbar--floating-bottom {
  inset-inline: 50% auto;
  inset-block-end: var(--mat-toolbar-floating-edge-space);
  inline-size: fit-content;
  max-inline-size: calc(100dvi - (var(--mat-toolbar-floating-edge-space) * 2));
  padding-block-end: var(--mat-toolbar-bottom-placeholder);
  translate: var(--mat-toolbar-position-translate-x) 0;
}

.mat-toolbar--floating-bottom.mat-toolbar--position-start {
  inset-inline: var(--mat-toolbar-floating-edge-space) auto;

  --mat-toolbar-position-translate-x: 0;
}

.mat-toolbar--floating-bottom.mat-toolbar--position-center {
  --mat-toolbar-position-translate-x: -50%;
}

.mat-toolbar--floating-bottom.mat-toolbar--position-end {
  inset-inline: auto var(--mat-toolbar-floating-edge-space);

  --mat-toolbar-position-translate-x: 0;
}

.mat-toolbar--floating-bottom .mat-toolbar__surface {
  flex: 1 1 auto;
  min-inline-size: 0;
  max-inline-size: 100%;
}

.mat-toolbar--vertical {
  inset-block: 50% auto;
  flex-direction: column;
  align-items: center;
  max-block-size: calc(100dvb - (var(--mat-toolbar-vertical-edge-space) * 2));
  translate: 0 var(--mat-toolbar-position-translate-y);
}

.mat-toolbar--vertical.mat-toolbar--position-start {
  inset-block: var(--mat-toolbar-vertical-edge-space) auto;

  --mat-toolbar-position-translate-y: 0;
}

.mat-toolbar--vertical.mat-toolbar--position-center {
  --mat-toolbar-position-translate-y: -50%;
}

.mat-toolbar--vertical.mat-toolbar--position-end {
  inset-block: auto var(--mat-toolbar-vertical-edge-space);

  --mat-toolbar-position-translate-y: 0;
}

.mat-toolbar--floating-left {
  inset-inline-start: var(--mat-toolbar-vertical-edge-space);
}

.mat-toolbar--floating-right {
  inset-inline-end: var(--mat-toolbar-vertical-edge-space);
}

.mat-toolbar--vertical .mat-toolbar__surface {
  flex: 1 1 auto;
  flex-direction: column;
  min-block-size: 0;
  max-block-size: inherit;
  padding-block: var(--mat-toolbar-container-padding);
  overflow: auto;
}

.mat-toolbar--vertical .mat-toolbar__content {
  flex-direction: column;
  align-items: stretch;
  inline-size: 100%;
}

.mat-toolbar:not(.mat-toolbar--app) {
  inset: auto;
  max-block-size: none;
  translate: none;
}

.mat-toolbar--docked.mat-toolbar--opening {
  animation: mat-toolbar-docked-enter var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized-decelerate) both;
}

.mat-toolbar--docked.mat-toolbar--closing {
  animation: mat-toolbar-docked-exit var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized-accelerate) both;
}

.mat-toolbar--floating-bottom.mat-toolbar--opening {
  animation: mat-toolbar-floating-bottom-enter var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized-decelerate) both;
}

.mat-toolbar--floating-bottom.mat-toolbar--closing {
  animation: mat-toolbar-floating-bottom-exit var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized-accelerate) both;
}

.mat-toolbar--floating-left.mat-toolbar--opening {
  animation: mat-toolbar-floating-left-enter var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized-decelerate) both;
}

.mat-toolbar--floating-left.mat-toolbar--closing {
  animation: mat-toolbar-floating-left-exit var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized-accelerate) both;
}

.mat-toolbar--floating-right.mat-toolbar--opening {
  animation: mat-toolbar-floating-right-enter var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized-decelerate) both;
}

.mat-toolbar--floating-right.mat-toolbar--closing {
  animation: mat-toolbar-floating-right-exit var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized-accelerate) both;
}

@keyframes mat-toolbar-docked-enter {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
}

@keyframes mat-toolbar-docked-exit {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(100%);
  }
}

@keyframes mat-toolbar-floating-bottom-enter {
  from {
    translate: var(--mat-toolbar-position-translate-x) 100%;
  }

  to {
    translate: var(--mat-toolbar-position-translate-x) 0;
  }
}

@keyframes mat-toolbar-floating-bottom-exit {
  from {
    translate: var(--mat-toolbar-position-translate-x) 0;
  }

  to {
    translate: var(--mat-toolbar-position-translate-x) 100%;
  }
}

@keyframes mat-toolbar-floating-left-enter {
  from {
    translate: -100% var(--mat-toolbar-position-translate-y);
  }

  to {
    translate: 0 var(--mat-toolbar-position-translate-y);
  }
}

@keyframes mat-toolbar-floating-left-exit {
  from {
    translate: 0 var(--mat-toolbar-position-translate-y);
  }

  to {
    translate: -100% var(--mat-toolbar-position-translate-y);
  }
}

@keyframes mat-toolbar-floating-right-enter {
  from {
    translate: 100% var(--mat-toolbar-position-translate-y);
  }

  to {
    translate: 0 var(--mat-toolbar-position-translate-y);
  }
}

@keyframes mat-toolbar-floating-right-exit {
  from {
    translate: 0 var(--mat-toolbar-position-translate-y);
  }

  to {
    translate: 100% var(--mat-toolbar-position-translate-y);
  }
}

@media (prefers-reduced-motion: reduce) {
  .mat-toolbar {
    scroll-behavior: auto;
  }

  .mat-toolbar--opening,
  .mat-toolbar--closing {
    animation: none;
  }
}
</style>
