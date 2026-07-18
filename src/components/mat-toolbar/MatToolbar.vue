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

const props = defineProps({
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
  vibrant: {
    type: Boolean,
    default: false,
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

const attrs = useAttrs();
const slots = useSlots();
const toolbarElement = ref(null);
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
const isFloating = computed(() => normalizedVariant.value.startsWith('floating'));
const isVertical = computed(() => (
  normalizedVariant.value === 'floating-left'
  || normalizedVariant.value === 'floating-right'
));
const isBottomVariant = computed(() => (
  normalizedVariant.value === 'docked'
  || normalizedVariant.value === 'floating-bottom'
));
const normalizedBottomPlaceholder = computed(() => (
  normalizeBottomPlaceholder(props.bottomPlaceholder)
));
const effectiveBottomPlaceholder = computed(() => (
  isBottomVariant.value ? normalizedBottomPlaceholder.value : '0px'
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
  {
    'mat-toolbar--vertical': isVertical.value,
    'mat-toolbar--vibrant': props.vibrant,
  },
]);

let registration;
let resizeObserver;
let mounted = false;

function validateFabSlot() {
  if (slots.fab && !isFloating.value) {
    console.warn('MatToolbar: fab Slot 仅支持 floating variant');
  }
}

function syncToolbarSize() {
  if (!toolbarElement.value) {
    return;
  }

  const rect = toolbarElement.value.getBoundingClientRect();

  toolbarSize.value = {
    blockSize: Math.max(0, Math.ceil(Number(rect.height) || 0)),
    inlineSize: Math.max(0, Math.ceil(Number(rect.width) || 0)),
  };
  registration?.update();
}

async function scheduleToolbarSize() {
  if (!mounted) {
    return;
  }

  await nextTick();
  syncToolbarSize();
}

onMounted(async () => {
  mounted = true;
  await nextTick();

  if (!toolbarElement.value) {
    return;
  }

  registration = registerToolbar(toolbarElement.value, {
    isBottom: () => isBottomVariant.value,
  });
  resizeObserver = typeof ResizeObserver === 'undefined'
    ? undefined
    : new ResizeObserver(syncToolbarSize);
  resizeObserver?.observe(toolbarElement.value);
  window.addEventListener('resize', syncToolbarSize);
  syncToolbarSize();
  validateFabSlot();
});

onBeforeUnmount(() => {
  mounted = false;
  resizeObserver?.disconnect();
  window.removeEventListener('resize', syncToolbarSize);
  registration?.unregister();
  registration = undefined;
});

watch([normalizedVariant, normalizedBottomPlaceholder], scheduleToolbarSize);
</script>

<template>
  <span
    v-if="placeholder"
    class="mat-toolbar__placeholder"
    :style="placeholderStyle"
    aria-hidden="true"
  />

  <Teleport to="body">
    <div
      ref="toolbarElement"
      v-bind="$attrs"
      class="mat-toolbar"
      :class="toolbarClass"
      :style="toolbarStyle"
      role="toolbar"
      :aria-orientation="isVertical ? 'vertical' : undefined"
    >
      <div class="mat-toolbar__surface">
        <div class="mat-toolbar__content">
          <slot />
        </div>

        <div v-if="isFloating && slots.fab" class="mat-toolbar__fab">
          <slot name="fab" />
        </div>
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
  position: fixed;
  z-index: var(--mat-sys-z-index-toolbar);
  box-sizing: border-box;
  display: block;
  color: var(--mat-toolbar-content-color);
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
  inset-inline-start: 50%;
  inset-block-end: var(--mat-toolbar-floating-edge-space);
  inline-size: fit-content;
  max-inline-size: calc(100dvi - (var(--mat-toolbar-floating-edge-space) * 2));
  padding-block-end: var(--mat-toolbar-bottom-placeholder);
  translate: -50% 0;
}

.mat-toolbar--floating-bottom .mat-toolbar__surface {
  max-inline-size: 100%;
}

.mat-toolbar--vertical {
  inset-block-start: 50%;
  max-block-size: calc(100dvb - (var(--mat-toolbar-vertical-edge-space) * 2));
  translate: 0 -50%;
}

.mat-toolbar--floating-left {
  inset-inline-start: var(--mat-toolbar-vertical-edge-space);
}

.mat-toolbar--floating-right {
  inset-inline-end: var(--mat-toolbar-vertical-edge-space);
}

.mat-toolbar--vertical .mat-toolbar__surface {
  flex-direction: column;
  max-block-size: inherit;
  padding-block: var(--mat-toolbar-container-padding);
  overflow: auto;
}

.mat-toolbar--vertical .mat-toolbar__content {
  flex-direction: column;
  align-items: stretch;
  inline-size: 100%;
}

.mat-toolbar--vertical .mat-toolbar__fab {
  align-self: center;
}

@media (prefers-reduced-motion: reduce) {
  .mat-toolbar {
    scroll-behavior: auto;
  }
}
</style>
