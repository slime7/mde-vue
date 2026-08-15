<script setup>
import {
  computed, inject, nextTick, onBeforeUnmount, onMounted, onUpdated, provide, ref,
  shallowRef, useAttrs, useId, useSlots, watch,
} from 'vue';
import MatSurfaceBase from '../MatSurfaceBase.vue';
import { addAnchorName, removeAnchorName } from '../../anchor-names';
import createMotionController from '../motion-controller';
import { isComponentColor } from '../button-props';
import { MAT_APP_ROOT_KEY } from '../mat-app-root/mat-app-root-context';
import MatScrollArea from '../mat-scroll-area/MatScrollArea.vue';
import {
  isPointInMenuSafeTriangle, MAT_MENU_ITEM_KEY, MAT_MENU_KEY, updateMenuItemPositions,
} from '../menu-context';
import useComponentColor from '../use-component-color';
import useRovingFocus from '../use-roving-focus';
import { isValidCssLength, toCssLength } from '../value-utils';
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatMenu',
  inheritAttrs: false,
});

const CLOSE_DURATION = 200;

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
   * 菜单相对锚点的 `[x, y]` 偏移像素。
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
   * 菜单配色形态；可选值为 `standard`、`vibrant`。
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
   * 点击菜单项后是否关闭菜单。
   *
   * @type {boolean}
   * @default true
   */
  closeOnClick: {
    type: Boolean,
    default: true,
  },
  /**
   * 菜单最大块轴长度；数字与纯数字字符串按 px 处理，其他字符串须为合法 CSS 长度。
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
   * 是否使用透明帷幕拦截菜单外部的指针交互。
   *
   * @type {boolean}
   * @default true
   */
  scrim: {
    type: Boolean,
    default: true,
  },
});
const propsWithDefaults = useMatProps('menu', props);
const emit = defineEmits({
  /**
   * 菜单请求关闭时发出 false。
   */
  'update:modelValue': (payload) => typeof payload === 'boolean',
});
const attrs = useAttrs();
const slots = useSlots();
const itemParent = inject(MAT_MENU_ITEM_KEY, null);
const parentMenu = inject(MAT_MENU_KEY, null);
const appContext = inject(MAT_APP_ROOT_KEY, null);
const activatorHost = ref(null);
const scrimElement = ref(null);
const surface = ref(null);
const appViewport = shallowRef(null);
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
let popoverShown = false;
let scrimShown = false;
let programmaticClose = false;
const phaseMotion = createMotionController();
let viewportFrame;
let sizeObserver;
let returnFocusElement = null;
let pointerListenerAttached = false;
let outsidePointerListenerAttached = false;

const isNested = computed(() => Boolean(itemParent));
const hasActivatorSlot = computed(() => Boolean(slots.activator));
const isCoordinateAnchor = computed(() => (
  !isNested.value && !hasActivatorSlot.value && isCoordinatePair(propsWithDefaults.anchor)
));
const isGrouped = computed(() => groupCount.value > 0);
const usesScrim = computed(() => !isNested.value && propsWithDefaults.scrim);
const needsOutsideListener = computed(() => (
  !usesScrim.value || Boolean(appContext)
));
const popoverMode = computed(() => (usesScrim.value ? 'manual' : 'auto'));
const effectiveOpen = computed(() => (
  isNested.value ? nestedOpen.value : propsWithDefaults.modelValue
));
const effectiveVariant = computed(() => (
  propsWithDefaults.variant ?? parentMenu?.variant.value ?? 'standard'
));
const effectiveColor = computed(() => (
  propsWithDefaults.color ?? parentMenu?.color.value
));
const closeOnClickState = computed(() => propsWithDefaults.closeOnClick);
const { colorStyle } = useComponentColor(effectiveColor);
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

  const resolvedMaxLength = `min(${maxLength}, calc(var(--mat-menu-viewport-height) - var(--mat-menu-viewport-space) - var(--mat-menu-viewport-space)))`;

  return {
    '--mat-menu-resolved-max-length': resolvedMaxLength,
    maxBlockSize: resolvedMaxLength,
  };
});
const positionStyle = computed(() => {
  const [offsetX, offsetY] = isCoordinatePair(propsWithDefaults.offset)
    ? propsWithDefaults.offset
    : [0, 0];
  const style = {
    '--mat-menu-offset-x': `${offsetX}px`,
    '--mat-menu-offset-y': `${offsetY}px`,
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
    '--mat-menu-viewport-width': `${viewport.width}px`,
    '--mat-menu-viewport-height': `${viewport.height}px`,
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
  attrs.style,
  maxLengthStyle.value,
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
}

function finishNativeClose() {
  hideScrim();
  phase.value = 'closed';
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
  closeDescendants({ immediate: true });

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

  style.setProperty('--mat-menu-viewport-shift-x', `${shiftX}px`);
  style.setProperty('--mat-menu-viewport-shift-y', `${shiftY}px`);
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

    showScrim();
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
function closeOtherSubmenus(activeApi) {
  itemApis.forEach((api) => {
    if (api !== activeApi) {
      api.closeSubmenu({ focus: false });
    }
  });
}

/**
 * 指针是否正处于某个已打开子菜单的三角安全区内。
 * 悬停展开同级子菜单前先检查，避免指针斜向移入已打开子菜单时
 * 误关闭当前子菜单并打开其他同级子菜单。
 *
 * @returns {boolean}
 */
function isPointerInOpenSubmenuTriangle() {
  const { current, previous } = pointerHistory;

  for (const api of itemApis.values()) {
    if (!api.submenuOpen?.value) {
      continue;
    }

    const itemElement = api.element?.value;
    const submenuElement = api.submenuElement?.value;

    if (!itemElement || !submenuElement) {
      continue;
    }

    const itemRect = itemElement.getBoundingClientRect();
    const submenuRect = submenuElement.getBoundingClientRect();
    const side = submenuRect.left < itemRect.left ? 'left' : 'right';

    if (isPointInMenuSafeTriangle(current, previous, submenuRect, side)) {
      return true;
    }
  }

  return false;
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

  animateNativeClose();

  if (!isNested.value) {
    emit('update:modelValue', false);
  }

  focusAnchor();
}

provide(MAT_MENU_KEY, {
  closeOtherSubmenus,
  closeTree,
  closeOnClick: closeOnClickState,
  color: effectiveColor,
  isPointerInOpenSubmenuTriangle,
  registerItem,
  registerGroup,
  unregisterItem,
  unregisterGroup,
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
    bindOutsidePointerListener();
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
  unbindOutsidePointerListener();
  hidePopover({ immediate: true });
  hideScrim();
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

function bindOutsidePointerListener() {
  if (parentMenu || !needsOutsideListener.value || outsidePointerListenerAttached) {
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
    bindPointerListener();
    bindOutsidePointerListener();
    showPopover();
  } else {
    unbindPointerListener();
    unbindOutsidePointerListener();
    hidePopover();
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
  if (isNested.value) {
    return;
  }

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
  <span v-if="!isNested && hasActivatorSlot" ref="activatorHost" class="mat-menu__activator">
    <slot name="activator" />
  </span>

  <div
    v-if="!isNested && propsWithDefaults.scrim"
    ref="scrimElement"
    aria-hidden="true"
    class="mat-menu__scrim"
    popover="manual"
    :style="scrimStyle"
    @pointerdown="handleScrimPointerDown"
  />

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
    :popover="popoverMode"
    role="menu"
    @focusin="roving.handleFocusIn"
    @keydown="handleKeyDown"
    @toggle="handleToggle"
  >
    <MatScrollArea class="mat-menu__surface" bar-width="hidden">
      <slot />
    </MatScrollArea>
  </MatSurfaceBase>
</template>

<style scoped>
@layer mde.components {
  .mat-menu__activator {
    display: contents;
  }

  .mat-menu__scrim {
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

  .mat-menu {
    --mat-menu-container-color: var(--mat-sys-color-surface-container-low);
    --mat-menu-content-color: var(--mat-sys-color-on-surface);
    --mat-menu-supporting-color: var(--mat-sys-color-on-surface-variant);
    --mat-menu-active-container-color: var(--mat-accent-container-color, var(--mat-sys-color-tertiary-container));
    --mat-menu-active-content-color: var(--mat-on-accent-container-color, var(--mat-sys-color-on-tertiary-container));
    --mat-menu-focus-ring-bleed: calc(
      var(--mat-sys-interaction-focus-ring-width, 3px)
      + var(--mat-sys-interaction-focus-ring-offset, 2px)
    );
    --mat-menu-viewport-width: 100dvi;
    --mat-menu-viewport-height: 100dvb;
    --mat-menu-resolved-max-length: calc(
      var(--mat-menu-viewport-height) - var(--mat-menu-viewport-space) - var(--mat-menu-viewport-space)
    );
    position: fixed;
    inset: auto;
    position-area: block-end span-inline-end;
    position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;
    box-sizing: border-box;
    min-inline-size: var(--mat-menu-container-min-width);
    max-inline-size: min(
      var(--mat-menu-container-max-width),
      calc(var(--mat-menu-viewport-width) - var(--mat-menu-viewport-space) - var(--mat-menu-viewport-space))
    );
    max-block-size: calc(
      var(--mat-menu-viewport-height) - var(--mat-menu-viewport-space) - var(--mat-menu-viewport-space)
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
    transition: opacity var(--mat-sys-motion-spring-fast-effects), transform var(--mat-sys-motion-spring-fast-spatial), display 150ms, overlay 150ms;
    transition-behavior: allow-discrete;
  }

  .mat-menu:not(:popover-open) {
    opacity: 0;
    transform: scale(.96);
  }

  .mat-menu--closing {
    pointer-events: none;
    opacity: 0;
    transform: scale(.96);
    transition-duration: 150ms;
    transition-timing-function: cubic-bezier(.31, .94, .34, 1);
  }

  .mat-menu__surface {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    min-inline-size: 100%;
    min-block-size: 0;
    max-block-size: inherit;
    padding: var(--mat-menu-container-padding);
    overflow: visible;
    overscroll-behavior: contain;
    background: var(--mat-menu-container-color);
    border-radius: inherit;
    clip-path: none;
    transition: clip-path var(--mat-sys-motion-spring-fast-spatial);
  }

  .mat-menu__surface :deep(.mat-scroll-area__viewport) {
    padding: var(--mat-menu-focus-ring-bleed);
    margin: calc(-1 * var(--mat-menu-focus-ring-bleed));
    inline-size: calc(100% + (2 * var(--mat-menu-focus-ring-bleed)));
    max-block-size: calc(
      var(--mat-menu-resolved-max-length) - var(--mat-menu-container-padding)
      - var(--mat-menu-container-padding) + (2 * var(--mat-menu-focus-ring-bleed))
    );
  }

  .mat-menu--closing:not(.mat-menu--grouped) .mat-menu__surface {
    overflow: hidden;
    clip-path: inset(46% 8% round var(--mat-sys-shape-corner-extra-large));
    transition-duration: 150ms;
    transition-timing-function: cubic-bezier(.31, .94, .34, 1);
  }

  .mat-menu:not(:popover-open):not(.mat-menu--grouped) .mat-menu__surface {
    overflow: hidden;
    clip-path: inset(46% 8% round var(--mat-sys-shape-corner-extra-large));
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
    padding: 0;
    background: transparent;
    clip-path: none;
  }

  .mat-menu--grouped .mat-menu__surface :deep(.mat-scroll-area__viewport) {
    display: flex;
    flex-direction: column;
    gap: var(--mat-menu-group-space);
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
      transition: none;
    }

    .mat-menu__surface {
      transition: none;
    }
  }
}
</style>
