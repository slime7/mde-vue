<script setup>
import {
  computed, inject, nextTick, onBeforeUnmount, onMounted, provide, ref, useAttrs, useId, watch,
} from 'vue';
import MatSurfaceBase from '../MatSurfaceBase.vue';
import { isComponentColor } from '../button-props';
import { MAT_MENU_ITEM_KEY, MAT_MENU_KEY } from '../menu-context';
import useComponentColor from '../use-component-color';
import useRovingFocus from '../use-roving-focus';

defineOptions({
  name: 'MatMenu',
  inheritAttrs: false,
});

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  anchor: {
    type: String,
    default: undefined,
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
  'update:open': (payload) => typeof payload === 'boolean',
});
const attrs = useAttrs();
const itemParent = inject(MAT_MENU_ITEM_KEY, null);
const parentMenu = inject(MAT_MENU_KEY, null);
const surface = ref(null);
const root = computed(() => surface.value?.root ?? surface.value?.$el ?? null);
const generatedId = useId().replace(/[^\w-]/g, '-');
const menuId = computed(() => attrs.id ?? `${generatedId}-menu`);
const anchorName = `--mat-menu-anchor-${generatedId}`;
const nestedOpen = ref(false);
const itemApis = new Map();
let attachedAnchor = null;
let previousAnchorName = '';
let popoverShown = false;
let programmaticClose = false;

const isNested = computed(() => Boolean(itemParent));
const effectiveOpen = computed(() => (
  isNested.value ? nestedOpen.value : props.open
));
const effectiveVariant = computed(() => (
  props.variant ?? parentMenu?.variant.value ?? 'standard'
));
const effectiveColor = computed(() => (
  props.color ?? parentMenu?.color.value
));
const { colorStyle } = useComponentColor(effectiveColor);
const rootStyle = computed(() => [
  colorStyle.value,
  { positionAnchor: anchorName },
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
 * @returns {HTMLElement | null}
 */
function resolveAnchor() {
  if (isNested.value) {
    return itemParent.element.value;
  }

  if (!props.anchor) {
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

function hidePopover() {
  if (!root.value || !popoverShown) {
    return;
  }

  popoverShown = false;
  programmaticClose = true;
  root.value.hidePopover?.();
}

async function showPopover() {
  await nextTick();
  const anchorElement = attachAnchor();

  if (!root.value || !anchorElement) {
    if (!isNested.value) {
      console.warn('MatMenu: open 为 true 时必须能通过 anchor 找到触发元素');
      emit('update:open', false);
    }
    return;
  }

  if (!popoverShown) {
    popoverShown = true;
    root.value.showPopover?.();
  }

  if (isNested.value) {
    itemParent.submenuOpen.value = true;
  }

  roving.refresh();
  roving.focusFirst();
}

function focusAnchor() {
  nextTick(() => resolveAnchor()?.focus());
}

function closeSelf({ focus = true } = {}) {
  if (isNested.value) {
    nestedOpen.value = false;
    itemParent.submenuOpen.value = false;
  } else {
    emit('update:open', false);
  }

  hidePopover();

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
  roving.queueRefresh();
}

/**
 * @param {object} api
 */
function unregisterItem(api) {
  itemApis.delete(api.element);
  roving.queueRefresh();
}

/**
 * @param {object} activeApi
 */
function closeOtherSubmenus(activeApi) {
  itemApis.forEach((api) => {
    if (api !== activeApi) {
      api.closeSubmenu();
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

  if (event.newState === 'closed' && effectiveOpen.value) {
    if (programmaticClose) {
      programmaticClose = false;
      return;
    }

    if (isNested.value) {
      nestedOpen.value = false;
    } else {
      emit('update:open', false);
    }
    focusAnchor();
  }
}

provide(MAT_MENU_KEY, {
  closeOtherSubmenus,
  closeTree,
  color: effectiveColor,
  registerItem,
  unregisterItem,
  variant: effectiveVariant,
});

if (itemParent) {
  itemParent.registerSubmenu({
    close: closeSelf,
    id: menuId,
    open: showPopover,
  });
}

onMounted(() => {
  roving.observe();

  if (effectiveOpen.value) {
    showPopover();
  }
});
onBeforeUnmount(() => {
  hidePopover();
  detachAnchor();
  itemParent?.unregisterSubmenu();
});
watch(effectiveOpen, (open) => {
  if (open) {
    showPopover();
  } else {
    hidePopover();
  }
});
watch(() => props.anchor, async () => {
  detachAnchor();

  if (effectiveOpen.value) {
    await showPopover();
  }
});
</script>

<template>
  <MatSurfaceBase
    :id="menuId"
    ref="surface"
    v-bind="$attrs"
    class="mat-menu"
    :class="[
      `mat-menu--${effectiveVariant}`,
      { 'mat-menu--nested': isNested },
    ]"
    :style="rootStyle"
    popover="auto"
    role="menu"
    @focusin="roving.handleFocusIn"
    @keydown="handleKeyDown"
    @toggle="handleToggle"
  >
    <slot />
  </MatSurfaceBase>
</template>

<style scoped>
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
  min-inline-size: 112px;
  max-inline-size: min(280px, calc(100dvi - 16px));
  max-block-size: calc(100dvb - 16px);
  padding: 8px;
  margin: 4px 0;
  overflow: auto;
  color: var(--mat-menu-content-color);
  background: var(--mat-menu-container-color);
  border: 0;
  border-radius: var(--mat-sys-shape-corner-large);
  box-shadow: var(--mat-sys-elevation-level2);
  clip-path: inset(0 round var(--mat-sys-shape-corner-large));
  opacity: 1;
  transform: scale(1);
  transform-origin: top left;
  transition: clip-path var(--mat-sys-motion-duration-medium1) var(--mat-sys-motion-easing-emphasized-decelerate), opacity var(--mat-sys-motion-duration-short3) var(--mat-sys-motion-easing-standard), transform var(--mat-sys-motion-duration-medium1) var(--mat-sys-motion-easing-emphasized-decelerate);
}

.mat-menu--nested {
  position-area: inline-end span-block-end;
  position-try-fallbacks: flip-inline, flip-block, flip-inline flip-block;
  margin: 0 4px;
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
    clip-path: inset(46% 8% round var(--mat-sys-shape-corner-extra-large));
    opacity: 0;
    transform: scale(.96);
  }
}

@supports (border-shape: inset(0 round 1px)) {
  .mat-menu {
    border-shape: inset(0 round var(--mat-sys-shape-corner-large));
  }
}

@media (prefers-reduced-motion: reduce) {
  .mat-menu {
    transition-duration: 0s;
  }
}
</style>
