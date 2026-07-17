<script setup>
import {
  computed, inject, nextTick, onBeforeUnmount, onMounted, onUpdated, provide, ref, useAttrs,
  useId, useSlots, watch,
} from 'vue';
import MatSurfaceBase from '../MatSurfaceBase.vue';
import { isComponentColor } from '../button-props';
import {
  MAT_MENU_ITEM_KEY, MAT_MENU_KEY, updateMenuItemPositions,
} from '../menu-context';
import useComponentColor from '../use-component-color';
import useRovingFocus from '../use-roving-focus';

defineOptions({
  name: 'MatMenu',
  inheritAttrs: false,
});

const CLOSE_DURATION = 200;

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
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
  offset: {
    type: Array,
    default: () => [0, 0],
    validator(value) {
      return value.length === 2
        && value.every((coordinate) => Number.isFinite(coordinate));
    },
  },
  variant: {
    type: String,
    default: undefined,
    validator(value) {
      return value === undefined || ['standard', 'vibrant'].includes(value);
    },
  },
  color: {
    type: String,
    default: undefined,
    validator: isComponentColor,
  },
});
const emit = defineEmits({
  'update:modelValue': (payload) => typeof payload === 'boolean',
});
const attrs = useAttrs();
const slots = useSlots();
const itemParent = inject(MAT_MENU_ITEM_KEY, null);
const parentMenu = inject(MAT_MENU_KEY, null);
const activatorHost = ref(null);
const surface = ref(null);
const root = computed(() => surface.value?.root ?? surface.value?.$el ?? null);
const generatedId = useId().replace(/[^\w-]/g, '-');
const menuId = computed(() => attrs.id ?? `${generatedId}-menu`);
const anchorName = `--mat-menu-anchor-${generatedId}`;
const nestedOpen = ref(false);
const phase = ref('closed');
const pointerHistory = parentMenu?.pointerHistory ?? {
  current: { x: 0, y: 0 },
  previous: { x: 0, y: 0 },
};
const groupCount = ref(0);
const itemApis = new Map();
let attachedAnchor = null;
let previousAnchorName = '';
let popoverShown = false;
let programmaticClose = false;
let phaseTimer;
let viewportFrame;
let sizeObserver;
let returnFocusElement = null;
let pointerListenerAttached = false;

const isNested = computed(() => Boolean(itemParent));
const hasActivatorSlot = computed(() => Boolean(slots.activator));
const isCoordinateAnchor = computed(() => (
  !isNested.value && !hasActivatorSlot.value && isCoordinatePair(props.anchor)
));
const isGrouped = computed(() => groupCount.value > 0);
const effectiveOpen = computed(() => (
  isNested.value ? nestedOpen.value : props.modelValue
));
const effectiveVariant = computed(() => (
  props.variant ?? parentMenu?.variant.value ?? 'standard'
));
const effectiveColor = computed(() => (
  props.color ?? parentMenu?.color.value
));
const { colorStyle } = useComponentColor(effectiveColor);
const positionStyle = computed(() => {
  const [offsetX, offsetY] = isCoordinatePair(props.offset) ? props.offset : [0, 0];
  const style = {
    '--mat-menu-offset-x': `${offsetX}px`,
    '--mat-menu-offset-y': `${offsetY}px`,
    positionAnchor: isCoordinateAnchor.value ? 'auto' : anchorName,
  };

  if (isCoordinateAnchor.value && isCoordinatePair(props.anchor)) {
    style.left = `${props.anchor[0]}px`;
    style.top = `${props.anchor[1]}px`;
  }

  return style;
});
const rootStyle = computed(() => [
  colorStyle.value,
  positionStyle.value,
  attrs.style,
]);
const roving = useRovingFocus({
  root,
  selector: '[data-mat-menu-item]',
  isAvailable(element) {
    return element.closest('[role="menu"]') === root.value
      && !element.hasAttribute('disabled')
      && element.getAttribute('aria-disabled') !== 'true';
  },
});

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
  if (isNested.value) {
    return itemParent.element.value;
  }

  if (hasActivatorSlot.value) {
    const elements = activatorHost.value ? [...activatorHost.value.children] : [];

    if (elements.length === 1 && elements[0] instanceof HTMLElement
      && elements[0].ownerDocument === document) {
      return elements[0];
    }

    return null;
  }

  if (!props.anchor || typeof props.anchor !== 'string') {
    return null;
  }

  return document.getElementById(props.anchor);
}

function detachAnchor() {
  if (!attachedAnchor) {
    return;
  }

  if (previousAnchorName) {
    attachedAnchor.style.setProperty('anchor-name', previousAnchorName);
  } else {
    attachedAnchor.style.removeProperty('anchor-name');
  }

  attachedAnchor = null;
  previousAnchorName = '';
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
  previousAnchorName = anchorElement.style.getPropertyValue('anchor-name');
  anchorElement.style.setProperty('anchor-name', anchorName);

  return anchorElement;
}

function clearPhaseTimer() {
  if (phaseTimer !== undefined) {
    window.clearTimeout(phaseTimer);
    phaseTimer = undefined;
  }
}

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

function finishClose() {
  if (root.value && popoverShown) {
    popoverShown = false;
    programmaticClose = true;
    root.value.hidePopover?.();
  }

  phase.value = 'closed';
}

function hidePopover({ immediate = false } = {}) {
  if (!root.value || !popoverShown) {
    return;
  }

  programmaticClose = true;
  closeDescendants({ immediate: true });

  if (immediate || prefersReducedMotion()) {
    clearPhaseTimer();
    finishClose();
    return;
  }

  if (phase.value === 'closing') {
    return;
  }

  phase.value = 'closing';
  clearPhaseTimer();
  phaseTimer = window.setTimeout(() => {
    phaseTimer = undefined;
    finishClose();
  }, CLOSE_DURATION);
}

function clampToViewport() {
  viewportFrame = undefined;

  if (!root.value || !popoverShown) {
    return;
  }

  const style = root.value.style;
  const rect = root.value.getBoundingClientRect();
  const currentX = Number.parseFloat(
    style.getPropertyValue('--mat-menu-viewport-shift-x'),
  ) || 0;
  const currentY = Number.parseFloat(
    style.getPropertyValue('--mat-menu-viewport-shift-y'),
  ) || 0;
  const configuredSpace = Number.parseFloat(
    getComputedStyle(root.value).getPropertyValue('--mat-menu-viewport-space'),
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

  if (baseRect.left < space) {
    shiftX = space - baseRect.left;
  } else if (baseRect.right > window.innerWidth - space) {
    shiftX = window.innerWidth - space - baseRect.right;
  }

  if (baseRect.top < space) {
    shiftY = space - baseRect.top;
  } else if (baseRect.bottom > window.innerHeight - space) {
    shiftY = window.innerHeight - space - baseRect.bottom;
  }

  style.setProperty('--mat-menu-viewport-shift-x', `${shiftX}px`);
  style.setProperty('--mat-menu-viewport-shift-y', `${shiftY}px`);
}

function scheduleViewportClamp() {
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
    if (!isNested.value) {
      console.warn(
        hasActivatorSlot.value
          ? 'MatMenu: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点'
          : 'MatMenu: modelValue 为 true 时必须通过 anchor 提供元素 id 或视口坐标',
      );
      emit('update:modelValue', false);
    }
    return;
  }

  if (!popoverShown) {
    if (isCoordinateAnchor.value && document.activeElement instanceof HTMLElement) {
      returnFocusElement = document.activeElement;
    }

    popoverShown = true;
    root.value.showPopover?.();
  }

  phase.value = 'open';

  if (isNested.value) {
    itemParent.submenuOpen.value = true;
  }

  roving.refresh();
  roving.focusFirst();
  scheduleViewportClamp();
}

function focusAnchor() {
  const focusTarget = resolveAnchor() ?? returnFocusElement;

  returnFocusElement = null;
  nextTick(() => focusTarget?.focus());
}

function closeDescendants({ immediate = false } = {}) {
  itemApis.forEach((api) => api.closeSubmenu({ immediate }));
}

function closeSelf({ focus = true, immediate = false } = {}) {
  closeDescendants({ immediate });

  if (isNested.value) {
    nestedOpen.value = false;
    itemParent.submenuOpen.value = false;
  } else {
    emit('update:modelValue', false);
  }

  hidePopover({ immediate });

  if (focus) {
    focusAnchor();
  }
}

function closeTree() {
  if (parentMenu) {
    parentMenu.closeTree();
    return;
  }

  closeSelf();
}

/**
 * @param {object} api
 * @param {import('vue').Ref<HTMLElement | null>} api.element
 * @param {() => void} api.closeSubmenu
 */
function registerItem(api) {
  itemApis.set(api.element, api);
  updateMenuItemPositions(
    Array.from(itemApis.values()).filter((item) => !item.grouped),
  );
  roving.queueRefresh();
}

/**
 * @param {object} api
 */
function unregisterItem(api) {
  itemApis.delete(api.element);
  updateMenuItemPositions(
    Array.from(itemApis.values()).filter((item) => !item.grouped),
  );
  roving.queueRefresh();
}

function registerGroup() {
  groupCount.value += 1;
  roving.queueRefresh();
}

function unregisterGroup() {
  groupCount.value = Math.max(0, groupCount.value - 1);
  roving.queueRefresh();
}

/**
 * @param {object} activeApi
 */
function closeOtherSubmenus(activeApi, { pointer = false } = {}) {
  itemApis.forEach((api) => {
    if (api !== activeApi) {
      api.closeSubmenu({
        delay: pointer ? api.getSubmenuCloseDelay?.() : 0,
        focus: false,
      });
    }
  });
}

/**
 * @param {KeyboardEvent} event
 */
function handleKeyDown(event) {
  const closeDirection = getComputedStyle(root.value).direction === 'rtl'
    ? 'ArrowRight'
    : 'ArrowLeft';

  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    roving.move(event.target, event.key === 'ArrowDown' ? 1 : -1);
  } else if (event.key === 'Home') {
    event.preventDefault();
    roving.focusFirst();
  } else if (event.key === 'End') {
    event.preventDefault();
    roving.focusLast();
  } else if (event.key === 'Escape' || (isNested.value && event.key === closeDirection)) {
    event.preventDefault();
    closeSelf();
  } else if (event.key === 'Tab') {
    closeTree();
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
  closeDescendants();

  if (isNested.value) {
    nestedOpen.value = false;
    itemParent.submenuOpen.value = false;
  }

  if (!effectiveOpen.value || wasProgrammatic) {
    return;
  }

  if (!isNested.value) {
    emit('update:modelValue', false);
  }

  focusAnchor();
}

provide(MAT_MENU_KEY, {
  closeOtherSubmenus,
  closeTree,
  color: effectiveColor,
  registerItem,
  registerGroup,
  unregisterItem,
  unregisterGroup,
  pointerHistory,
  variant: effectiveVariant,
});

if (itemParent) {
  itemParent.registerSubmenu({
    close: closeSelf,
    element: root,
    id: menuId,
    open: showPopover,
  });
}

onMounted(() => {
  roving.observe();
  window.addEventListener('resize', scheduleViewportClamp);
  window.addEventListener('scroll', scheduleViewportClamp, { capture: true, passive: true });

  if (effectiveOpen.value) {
    bindPointerListener();
  }

  if (typeof ResizeObserver !== 'undefined') {
    sizeObserver = new ResizeObserver(scheduleViewportClamp);
    sizeObserver.observe(root.value);
  }

  if (effectiveOpen.value) {
    showPopover();
  }
});
onUpdated(() => {
  if (isNested.value || !effectiveOpen.value || isCoordinateAnchor.value) {
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
  unbindPointerListener();
  hidePopover({ immediate: true });
  detachAnchor();
  itemParent?.unregisterSubmenu();
});

/**
 * @param {PointerEvent} event
 * @returns {void}
 */
function trackPointer(event) {
  pointerHistory.previous = pointerHistory.current;
  pointerHistory.current = { x: event.clientX, y: event.clientY };
}

function bindPointerListener() {
  if (parentMenu || pointerListenerAttached) {
    return;
  }

  document.addEventListener('pointermove', trackPointer, true);
  pointerListenerAttached = true;
}

function unbindPointerListener() {
  if (!pointerListenerAttached) {
    return;
  }

  document.removeEventListener('pointermove', trackPointer, true);
  pointerListenerAttached = false;
}
watch(effectiveOpen, (open) => {
  if (open) {
    bindPointerListener();
    showPopover();
  } else {
    unbindPointerListener();
    hidePopover();
  }
});
watch(() => props.anchor, async () => {
  detachAnchor();

  if (effectiveOpen.value) {
    await showPopover();
  }
}, { deep: true });
watch(() => props.offset, async () => {
  if (effectiveOpen.value) {
    await nextTick();
    scheduleViewportClamp();
  }
}, { deep: true });
</script>

<template>
  <span v-if="!isNested && hasActivatorSlot" ref="activatorHost" class="mat-menu__activator">
    <slot name="activator" />
  </span>

  <MatSurfaceBase
    :id="menuId"
    ref="surface"
    v-bind="$attrs"
    class="mat-menu"
    :class="[
      `mat-menu--${effectiveVariant}`,
      {
        'mat-menu--coordinate': isCoordinateAnchor,
        'mat-menu--grouped': isGrouped,
        'mat-menu--nested': isNested,
        'mat-menu--closing': phase === 'closing',
      },
    ]"
    :style="rootStyle"
    popover="auto"
    role="menu"
    @pointerenter="itemParent?.cancelSubmenuClose()"
    @focusin="roving.handleFocusIn"
    @keydown="handleKeyDown"
    @toggle="handleToggle"
  >
    <div class="mat-menu__surface">
      <slot />
    </div>
  </MatSurfaceBase>
</template>

<style scoped>
.mat-menu__activator {
  display: contents;
}

.mat-menu {
  --mat-menu-container-color: var(--mat-sys-color-surface-container-low);
  --mat-menu-content-color: var(--mat-sys-color-on-surface);
  --mat-menu-supporting-color: var(--mat-sys-color-on-surface-variant);
  --mat-menu-active-container-color: var(--mat-accent-container-color, var(--mat-sys-color-tertiary-container));
  --mat-menu-active-content-color: var(--mat-on-accent-container-color, var(--mat-sys-color-on-tertiary-container));
  position: fixed;
  inset: auto;
  position-area: block-end span-inline-end;
  position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;
  box-sizing: border-box;
  min-inline-size: var(--mat-menu-container-min-width);
  max-inline-size: min(
    var(--mat-menu-container-max-width),
    calc(100dvi - var(--mat-menu-viewport-space) - var(--mat-menu-viewport-space))
  );
  max-block-size: calc(
    100dvb - var(--mat-menu-viewport-space) - var(--mat-menu-viewport-space)
  );
  padding: 0;
  margin: var(--mat-menu-anchor-space) 0;
  overflow: visible;
  color: var(--mat-menu-content-color);
  background: transparent;
  border: 0;
  border-radius: var(--mat-sys-shape-corner-large);
  box-shadow: var(--mat-sys-elevation-level2);
  opacity: 1;
  translate: calc(var(--mat-menu-offset-x, 0px) + var(--mat-menu-viewport-shift-x, 0px))
    calc(var(--mat-menu-offset-y, 0px) + var(--mat-menu-viewport-shift-y, 0px));
  transform: scale(1);
  transform-origin: top left;
  transition: opacity var(--mat-sys-motion-duration-short3) var(--mat-sys-motion-easing-standard), transform var(--mat-sys-motion-duration-medium1) var(--mat-sys-motion-easing-emphasized-decelerate);
}

.mat-menu--closing {
  pointer-events: none;
  opacity: 0;
  transform: scale(.96);
  transition-duration: var(--mat-sys-motion-duration-short4);
}

.mat-menu__surface {
  display: block;
  box-sizing: border-box;
  min-inline-size: 100%;
  max-block-size: inherit;
  padding: var(--mat-menu-container-padding);
  overflow: hidden auto;
  background: var(--mat-menu-container-color);
  border-radius: inherit;
  clip-path: inset(0 round var(--mat-sys-shape-corner-large));
  transition: clip-path var(--mat-sys-motion-duration-medium1) var(--mat-sys-motion-easing-emphasized-decelerate);
}

.mat-menu--closing:not(.mat-menu--grouped) .mat-menu__surface {
  clip-path: inset(46% 8% round var(--mat-sys-shape-corner-extra-large));
  transition-duration: var(--mat-sys-motion-duration-short4);
}

.mat-menu--coordinate {
  position-area: none;
  position-try-fallbacks: none;
  margin: 0;
}

.mat-menu--grouped {
  box-shadow: none;
  filter: drop-shadow(0 1px 2px rgb(from var(--mat-sys-color-shadow) r g b / 30%))
    drop-shadow(0 2px 6px rgb(from var(--mat-sys-color-shadow) r g b / 15%));
}

.mat-menu--grouped .mat-menu__surface {
  display: flex;
  flex-direction: column;
  gap: var(--mat-menu-group-space);
  padding: 0;
  background: transparent;
  clip-path: none;
}

.mat-menu--nested {
  position-area: inline-end span-block-end;
  position-try-fallbacks: flip-inline, flip-block, flip-inline flip-block;
  margin: 0 var(--mat-menu-anchor-space);
  transform-origin: left top;
}

.mat-menu--vibrant {
  --mat-menu-container-color: var(--mat-accent-container-color, var(--mat-sys-color-tertiary-container));
  --mat-menu-content-color: var(--mat-on-accent-container-color, var(--mat-sys-color-on-tertiary-container));
  --mat-menu-supporting-color: var(--mat-on-accent-container-color, var(--mat-sys-color-on-tertiary-container));
  --mat-menu-active-container-color: var(--mat-accent-color, var(--mat-sys-color-tertiary));
  --mat-menu-active-content-color: var(--mat-on-accent-color, var(--mat-sys-color-on-tertiary));
}

@starting-style {
  .mat-menu:popover-open {
    opacity: 0;
    transform: scale(.96);
  }

  .mat-menu:not(.mat-menu--grouped):popover-open .mat-menu__surface {
    clip-path: inset(46% 8% round var(--mat-sys-shape-corner-extra-large));
  }
}

@supports (border-shape: inset(0 round 1px)) {
  .mat-menu__surface {
    border-shape: inset(0 round var(--mat-sys-shape-corner-large));
  }
}

@media (prefers-reduced-motion: reduce) {
  .mat-menu {
    transition-duration: 0s;
  }

  .mat-menu__surface {
    transition-duration: 0s;
  }
}
</style>
