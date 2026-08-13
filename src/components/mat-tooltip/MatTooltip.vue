<script setup>
import {
  computed,
  getCurrentInstance,
  inject,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  onUpdated,
  ref,
  shallowRef,
  useAttrs,
  useId,
  useSlots,
  watch,
} from 'vue';
import MatHover from '../mat-hover/MatHover.vue';
import createMotionController from '../motion-controller';
import { useMatProps } from '../use-mat-props';
import { MAT_APP_ROOT_KEY } from '../mat-app-root/mat-app-root-context';
import { getTooltipPosition, TOOLTIP_LOCATIONS } from '../tooltip-position';
import {
  activateTooltip,
  activateTooltipDelayGroup,
  deactivateTooltip,
  leaveTooltipDelayGroup,
  shouldSkipTooltipDelay,
} from '../tooltip-stack';
import {
  getToolbarRects,
  subscribeToolbarOverlay,
} from '../toolbar-overlay';
import { isValidMs, normalizeMs } from '../value-utils';

const CLOSE_DELAY = 600;
const CLOSE_DURATION = 150;

defineOptions({
  name: 'MatTooltip',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 显式传入时启用受控模式，可使用 v-model。
   *
   * @type {boolean}
   * @default false
   */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /**
   * 简短纯文本内容；存在时优先于默认 Slot。
   *
   * @type {string | undefined}
   * @default undefined
   */
  content: {
    type: String,
    default: undefined,
  },
  /**
   * 使用 Rich tooltip 外观；仅提供 supporting content 时可显式开启。
   *
   * 提供 subhead 或 action Slot 时也会自动使用 Rich tooltip 外观。
   *
   * @type {boolean}
   * @default false
   */
  rich: {
    type: Boolean,
    default: false,
  },
  /**
   * Rich tooltip 的简短标题；存在时优先于 subhead Slot。
   *
   * @type {string | undefined}
   * @default undefined
   */
  subhead: {
    type: String,
    default: undefined,
  },
  /**
   * 展示元素的选择器或 HTMLElement。
   *
   * @type {string | HTMLElement | undefined}
   * @default undefined
   */
  target: {
    type: [String, Object],
    default: undefined,
  },
  /**
   * Teleport 目标；字符串按当前 document 的 CSS 选择器解析。省略时优先使用展示元素所在的已打开 dialog 或 Popover，
   * 找不到时使用 body。
   *
   * @type {string | HTMLElement}
   * @default 'body'
   */
  attach: {
    type: [String, Object],
    default: 'body',
  },
  /**
   * 相对展示元素的首选位置。
   *
   * 可选值为 `top`、`right`、`bottom`、`left` 及其 `-start`、`-end` 形式。
   *
   * @type {string}
   * @default 'top'
   */
  location: {
    type: String,
    default: 'top',
    validator(value) {
      return TOOLTIP_LOCATIONS.includes(value);
    },
  },
  /**
   * 自动模式的打开延迟，单位为毫秒；无效值按 0 处理。
   *
   * 省略时继承 createMatUi() 的 defaults.tooltip.openDelay，未安装插件时为 0。
   *
   * @type {number | string | undefined}
   * @default undefined
   */
  openDelay: {
    type: [Number, String],
    default: undefined,
    validator: (value) => isValidMs(value),
  },
  /**
   * 自动模式的关闭延迟，单位为毫秒；无效值按 600 处理。
   *
   * 省略时继承 createMatUi() 的 defaults.tooltip.closeDelay，未安装插件时为 600。
   *
   * @type {number | string | undefined}
   * @default undefined
   */
  closeDelay: {
    type: [Number, String],
    default: undefined,
    validator: (value) => isValidMs(value),
  },
});
const emit = defineEmits({
  /**
   * 受控模式请求关闭时发出 false。
   */
  'update:modelValue': (payload) => typeof payload === 'boolean',
});
const propsWithDefaults = useMatProps('tooltip', props);
const attrs = useAttrs();
const slots = useSlots();
const instance = getCurrentInstance();
const appContext = inject(MAT_APP_ROOT_KEY, null);
const activatorHost = ref(null);
const targetElement = shallowRef(null);
const hoverTarget = { value: targetElement };
const teleportTarget = shallowRef(null);
const isAppRootAttached = ref(false);
const tooltipElement = ref(null);
const rendered = ref(false);
const isDisplayed = ref(false);
const isPositioned = ref(false);
const phase = ref('closed');
const appliedLocation = ref('top');
const positionStyle = ref({});
const suppressed = ref(false);
const generatedId = `${useId().replace(/[^\w-]/g, '-')}-tooltip`;
const tooltipId = computed(() => (
  typeof attrs.id === 'string' ? attrs.id : generatedId
));
const hasContent = computed(() => {
  if (propsWithDefaults.content !== undefined) {
    return propsWithDefaults.content.length > 0;
  }

  return Boolean(slots.default);
});
const hasSubhead = computed(() => {
  if (propsWithDefaults.subhead !== undefined) {
    return propsWithDefaults.subhead.length > 0;
  }

  return Boolean(slots.subhead);
});
const isRich = computed(() => (
  propsWithDefaults.rich
  || hasSubhead.value
  || Boolean(slots.action)
));
const hasActivatorSlot = computed(() => Boolean(slots.activator));
const rawVNodeProps = instance?.vnode.props ?? {};
const isControlled = Object.prototype.hasOwnProperty.call(rawVNodeProps, 'modelValue')
  || Object.prototype.hasOwnProperty.call(rawVNodeProps, 'model-value');

let closeTimer;
let openTimer;
const phaseMotion = createMotionController();
let positionFrame;
let positionFrameUsesAnimation = false;
let connectionFrame;
let resizeObserver;
let removeTargetListeners = null;
let removeViewportListeners = null;
let removeToolbarListener = null;
let describedTarget = null;
let previousDescribedBy = null;
let mounted = false;
let active = true;
let pointerInside = false;
let focusInside = false;
let warnedAboutTarget = false;
let activeDelayGroup = null;

const stackEntry = {
  close: requestClose,
};
const delayGroupOwner = Symbol('mat-tooltip-delay-group-owner');

/**
 * @param {unknown} value
 * @returns {HTMLElement | null}
 */
function normalizeElement(value) {
  if (!value || typeof HTMLElement === 'undefined') {
    return null;
  }

  if (value instanceof HTMLElement && value.ownerDocument === document) {
    return value;
  }

  if (typeof value !== 'object') {
    return null;
  }

  if ('value' in value) {
    return normalizeElement(value.value);
  }

  if ('$el' in value) {
    return normalizeElement(value.$el);
  }

  return null;
}

/**
 * @param {string} selector
 * @returns {HTMLElement | null}
 */
function resolveSelector(selector) {
  try {
    return normalizeElement(document.querySelector(selector));
  } catch {
    return null;
  }
}

/**
 * @returns {HTMLElement | null}
 */
function resolveTargetProp() {
  if (typeof propsWithDefaults.target === 'string') {
    return resolveSelector(propsWithDefaults.target);
  }

  return normalizeElement(propsWithDefaults.target);
}

/**
 * @returns {HTMLElement | null}
 */
function resolveActivatorTarget() {
  const elements = activatorHost.value ? [...activatorHost.value.children] : [];

  if (elements.length === 1) {
    return elements[0];
  }

  return null;
}

/**
 * @returns {HTMLElement | null}
 */
function resolveTarget() {
  if (hasActivatorSlot.value) {
    return resolveActivatorTarget();
  }

  return resolveTargetProp();
}

/**
 * @returns {HTMLElement | null}
 */
function resolveAttach() {
  if (!hasExplicitAttach()) {
    const topLayerAttach = resolveTopLayerAttach();

    if (topLayerAttach) {
      return topLayerAttach;
    }

    if (
      appContext?.rootElement.value?.contains(targetElement.value)
      && appContext.freeLayer.value
    ) {
      return appContext.freeLayer.value;
    }

    return document.body;
  }

  if (typeof propsWithDefaults.attach === 'string') {
    return resolveSelector(propsWithDefaults.attach);
  }

  return normalizeElement(propsWithDefaults.attach);
}

function hasExplicitAttach() {
  const vnodeProps = instance?.vnode.props ?? {};

  return Object.prototype.hasOwnProperty.call(vnodeProps, 'attach');
}

/**
 * @param {HTMLElement} element
 * @returns {boolean}
 */
function isOpenPopover(element) {
  if (!element.hasAttribute('popover')) {
    return false;
  }

  try {
    return element.matches(':popover-open') || element.hasAttribute('data-popover-open');
  } catch {
    return element.hasAttribute('data-popover-open');
  }
}

/**
 * @param {HTMLElement} element
 * @returns {boolean}
 */
function isOpenTopLayerElement(element) {
  return (element.localName === 'dialog' && element.hasAttribute('open'))
    || isOpenPopover(element);
}

/**
 * @returns {HTMLElement | null}
 */
function resolveTopLayerAttach() {
  let element = targetElement.value;

  while (element) {
    if (isOpenTopLayerElement(element)) {
      return element;
    }

    element = element.parentElement;
  }

  return null;
}

/**
 * @returns {number}
 */
function getOpenDelay() {
  const configuredDelay = propsWithDefaults.openDelay;

  return normalizeMs(configuredDelay, 0);
}

/**
 * @returns {number}
 */
function getCloseDelay() {
  const configuredDelay = propsWithDefaults.closeDelay;

  return normalizeMs(configuredDelay, CLOSE_DELAY);
}

/**
 * @returns {HTMLElement | null}
 */
function resolveDelayGroup() {
  return targetElement.value?.closest('[data-mat-tooltip-group]') ?? null;
}

function clearOpenTimer() {
  if (openTimer !== undefined) {
    window.clearTimeout(openTimer);
    openTimer = undefined;
  }
}

function clearCloseTimer() {
  if (closeTimer !== undefined) {
    window.clearTimeout(closeTimer);
    closeTimer = undefined;
  }
}

function clearPhaseTimer() {
  phaseMotion.cancel();
}

function clearConnectionFrame() {
  if (connectionFrame !== undefined) {
    window.cancelAnimationFrame(connectionFrame);
    connectionFrame = undefined;
  }
}

function watchTargetConnection() {
  clearConnectionFrame();

  if (!isDisplayed.value) {
    return;
  }

  const check = () => {
    connectionFrame = undefined;

    if (!isDisplayed.value) {
      return;
    }

    if (targetElement.value && !targetElement.value.isConnected) {
      hideTooltip({ immediate: true });
      return;
    }

    watchTargetConnection();
  };

  connectionFrame = window.requestAnimationFrame(check);
}

/**
 * @param {number} duration
 * @param {() => void} callback
 */
function waitForPhase(duration, callback) {
  phaseMotion.wait(tooltipElement.value, duration, callback);
}

function clearPositionFrame() {
  if (positionFrame === undefined) {
    return;
  }

  if (positionFrameUsesAnimation) {
    window.cancelAnimationFrame(positionFrame);
  } else {
    window.clearTimeout(positionFrame);
  }

  positionFrame = undefined;
  positionFrameUsesAnimation = false;
}

function restoreDescribedBy() {
  if (!describedTarget) {
    return;
  }

  if (previousDescribedBy === null) {
    describedTarget.removeAttribute('aria-describedby');
  } else {
    describedTarget.setAttribute('aria-describedby', previousDescribedBy);
  }

  describedTarget = null;
  previousDescribedBy = null;
}

function syncDescribedBy() {
  const target = targetElement.value;

  if (!isDisplayed.value || !target || describedTarget === target) {
    return;
  }

  restoreDescribedBy();
  describedTarget = target;
  previousDescribedBy = target.getAttribute('aria-describedby');
  const tokens = (previousDescribedBy ?? '').split(/\s+/).filter(Boolean);

  if (!tokens.includes(tooltipId.value)) {
    tokens.push(tooltipId.value);
  }

  target.setAttribute('aria-describedby', tokens.join(' '));
}

function stopPositioning() {
  clearPositionFrame();
  resizeObserver?.disconnect();
  resizeObserver = undefined;

  if (removeViewportListeners) {
    removeViewportListeners();
    removeViewportListeners = null;
  }

  if (removeToolbarListener) {
    removeToolbarListener();
    removeToolbarListener = null;
  }
}

function updatePosition() {
  if (!isDisplayed.value || !targetElement.value || !tooltipElement.value) {
    return;
  }

  const appRect = isAppRootAttached.value ? appContext.getLayoutRect() : null;
  const rawTargetRect = targetElement.value.getBoundingClientRect();
  const targetRect = appRect
    ? {
      bottom: rawTargetRect.bottom - appRect.top,
      height: rawTargetRect.height,
      left: rawTargetRect.left - appRect.left,
      right: rawTargetRect.right - appRect.left,
      top: rawTargetRect.top - appRect.top,
      width: rawTargetRect.width,
    }
    : rawTargetRect;
  const appLayout = appContext?.publicContext.layout;
  const appAvoidRects = appRect ? [
    {
      top: 0,
      bottom: appLayout.padding.top,
      left: 0,
      right: appLayout.size.width,
    },
    {
      top: appLayout.size.height - appLayout.padding.bottom,
      bottom: appLayout.size.height,
      left: 0,
      right: appLayout.size.width,
    },
    {
      top: 0,
      bottom: appLayout.size.height,
      left: 0,
      right: appLayout.padding.start,
    },
    {
      top: 0,
      bottom: appLayout.size.height,
      left: appLayout.size.width - appLayout.padding.end,
      right: appLayout.size.width,
    },
  ] : getToolbarRects();
  const position = getTooltipPosition({
    location: propsWithDefaults.location,
    targetRect,
    tooltipRect: tooltipElement.value.getBoundingClientRect(),
    avoidRects: appAvoidRects,
    viewport: appRect
      ? { height: appLayout.size.height, width: appLayout.size.width }
      : { height: window.innerHeight, width: window.innerWidth },
  });

  appliedLocation.value = position.location;
  positionStyle.value = {
    left: `${position.left}px`,
    top: `${position.top}px`,
  };
  isPositioned.value = true;
}

function schedulePositionUpdate() {
  if (!isDisplayed.value || positionFrame !== undefined) {
    return;
  }

  const update = () => {
    positionFrame = undefined;
    positionFrameUsesAnimation = false;
    updatePosition();
  };

  if (typeof window.requestAnimationFrame === 'function') {
    positionFrameUsesAnimation = true;
    positionFrame = window.requestAnimationFrame(update);
    return;
  }

  positionFrame = window.setTimeout(update, 0);
}

function startPositioning() {
  if (removeViewportListeners) {
    return;
  }

  window.addEventListener('resize', schedulePositionUpdate);
  document.addEventListener('scroll', schedulePositionUpdate, true);
  removeViewportListeners = () => {
    window.removeEventListener('resize', schedulePositionUpdate);
    document.removeEventListener('scroll', schedulePositionUpdate, true);
  };
  removeToolbarListener = subscribeToolbarOverlay(schedulePositionUpdate);

  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(schedulePositionUpdate);
    resizeObserver.observe(targetElement.value);
    resizeObserver.observe(tooltipElement.value);
  }
}

function finishClose() {
  rendered.value = false;
  phase.value = 'closed';
  isDisplayed.value = false;
  isPositioned.value = false;
  teleportTarget.value = null;
  isAppRootAttached.value = false;
}

function hideTooltip({ immediate = false } = {}) {
  clearOpenTimer();
  clearCloseTimer();
  clearConnectionFrame();
  stopPositioning();
  restoreDescribedBy();
  deactivateTooltip(stackEntry);

  if (!rendered.value) {
    finishClose();
    return;
  }

  if (!immediate && phase.value === 'closing') {
    return;
  }

  if (immediate) {
    clearPhaseTimer();
    finishClose();
    return;
  }

  isDisplayed.value = false;
  phase.value = 'closing';
  waitForPhase(CLOSE_DURATION, finishClose);
}

function requestClose() {
  if (isControlled) {
    suppressed.value = true;
    emit('update:modelValue', false);
  }

  hideTooltip();
}

function warnForInvalidTarget() {
  if (warnedAboutTarget) {
    return;
  }

  warnedAboutTarget = true;
  console.warn(
    hasActivatorSlot.value
      ? 'MatTooltip: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点'
      : 'MatTooltip: target 必须指向当前 document 中存在的 HTMLElement',
  );
}

/**
 * @param {{warn?: boolean}} [options]
 */
function syncTargetElement({ warn = true } = {}) {
  const nextTarget = resolveTarget();

  if (!nextTarget && isDisplayed.value) {
    hideTooltip({ immediate: true });
  }

  if (nextTarget === targetElement.value) {
    if (!nextTarget && hasContent.value && warn) {
      warnForInvalidTarget();
    }

    return;
  }

  const changed = targetElement.value !== null;

  restoreDescribedBy();
  unbindTargetListeners();
  targetElement.value = nextTarget;
  warnedAboutTarget = false;

  if (!nextTarget && hasContent.value && warn) {
    warnForInvalidTarget();
  }

  bindTargetListeners();

  if (changed && isDisplayed.value) {
    requestClose();
  }
}

function scheduleOpen() {
  clearCloseTimer();

  if (isControlled || isDisplayed.value || suppressed.value || !hasContent.value) {
    return;
  }

  const delayGroup = resolveDelayGroup();
  const delay = shouldSkipTooltipDelay(delayGroup, delayGroupOwner)
    ? 0
    : getOpenDelay();

  if (delay === 0) {
    showTooltip();
    return;
  }

  if (openTimer !== undefined) {
    return;
  }

  openTimer = window.setTimeout(() => {
    openTimer = undefined;
    showTooltip();
  }, delay);
}

function scheduleClose() {
  clearOpenTimer();

  if (isControlled || !isDisplayed.value || pointerInside || focusInside) {
    return;
  }

  if (closeTimer !== undefined) {
    return;
  }

  closeTimer = window.setTimeout(() => {
    closeTimer = undefined;
    requestClose();
  }, getCloseDelay());
}

function updateAutomaticVisibility() {
  if (pointerInside || focusInside) {
    scheduleOpen();
    return;
  }

  leaveTooltipDelayGroup(
    activeDelayGroup,
    delayGroupOwner,
    propsWithDefaults.skipDelayDuration,
  );
  scheduleClose();
}

/**
 * @param {boolean} isHovering
 */
function handleHoverChange(isHovering) {
  pointerInside = isHovering;
  updateAutomaticVisibility();
}

function handleFocusIn() {
  focusInside = true;
  updateAutomaticVisibility();
}

/**
 * @param {FocusEvent} event
 */
function handleFocusOut(event) {
  if (
    targetElement.value?.contains(event.relatedTarget)
    || (isRich.value && tooltipElement.value?.contains(event.relatedTarget))
  ) {
    return;
  }

  focusInside = false;
  updateAutomaticVisibility();
}

function handleTooltipPointerEnter() {
  if (!isRich.value) {
    return;
  }

  pointerInside = true;
  updateAutomaticVisibility();
}

function handleTooltipPointerLeave() {
  if (!isRich.value) {
    return;
  }

  pointerInside = false;
  updateAutomaticVisibility();
}

function handleTooltipFocusIn() {
  if (!isRich.value) {
    return;
  }

  focusInside = true;
  updateAutomaticVisibility();
}

/**
 * @param {KeyboardEvent} event
 */
function handleKeyDown(event) {
  if (event.key !== 'Escape') {
    return;
  }

  event.preventDefault();
  requestClose();
}

function unbindTargetListeners() {
  if (!removeTargetListeners) {
    return;
  }

  removeTargetListeners();
  removeTargetListeners = null;
  pointerInside = false;
  focusInside = false;
}

function bindTargetListeners() {
  const target = targetElement.value;

  if (!target) {
    return;
  }

  target.addEventListener('keydown', handleKeyDown);

  if (!isControlled && hasContent.value) {
    target.addEventListener('focusin', handleFocusIn);
    target.addEventListener('focusout', handleFocusOut);
  }

  removeTargetListeners = () => {
    target.removeEventListener('keydown', handleKeyDown);
    target.removeEventListener('focusin', handleFocusIn);
    target.removeEventListener('focusout', handleFocusOut);
  };
}

async function showTooltip() {
  if (!mounted || !active || suppressed.value || !hasContent.value) {
    return;
  }

  syncTargetElement({ warn: true });

  if (!targetElement.value) {
    requestClose();
    return;
  }

  const attach = resolveAttach();

  if (!attach) {
    console.warn('MatTooltip: attach 必须指向当前 document 中存在的 HTMLElement');
    requestClose();
    return;
  }

  clearOpenTimer();
  clearCloseTimer();
  clearPhaseTimer();
  activateTooltip(stackEntry);
  activeDelayGroup = resolveDelayGroup();
  activateTooltipDelayGroup(activeDelayGroup, delayGroupOwner);
  teleportTarget.value = attach;
  isAppRootAttached.value = attach === appContext?.freeLayer.value;
  appliedLocation.value = propsWithDefaults.location;
  positionStyle.value = { left: '0px', top: '0px' };
  isPositioned.value = false;
  phase.value = 'opening';
  rendered.value = true;
  isDisplayed.value = true;
  await nextTick();

  if (!mounted || !active || !isDisplayed.value) {
    return;
  }

  syncDescribedBy();
  updatePosition();
  startPositioning();
  watchTargetConnection();
}

onMounted(async () => {
  mounted = true;
  syncTargetElement({ warn: false });

  await nextTick();

  if (!mounted) {
    return;
  }

  syncTargetElement({ warn: false });

  if (isControlled && propsWithDefaults.modelValue) {
    showTooltip();
  }
});
onUpdated(() => {
  syncTargetElement({ warn: false });

  if (isDisplayed.value) {
    schedulePositionUpdate();
  }
});
onActivated(() => {
  if (active) {
    return;
  }

  active = true;
  syncTargetElement({ warn: false });

  if (isControlled && propsWithDefaults.modelValue) {
    showTooltip();
  }
});
onDeactivated(() => {
  active = false;
  clearPhaseTimer();
  clearConnectionFrame();
  unbindTargetListeners();
  hideTooltip({ immediate: true });
});
onBeforeUnmount(() => {
  mounted = false;
  clearPhaseTimer();
  clearConnectionFrame();
  unbindTargetListeners();
  if (isDisplayed.value) {
    hideTooltip({ immediate: true });
  }
});
watch(() => propsWithDefaults.modelValue, (open) => {
  if (!mounted || !active || !isControlled) {
    return;
  }

  if (open) {
    suppressed.value = false;
    showTooltip();
    return;
  }

  suppressed.value = false;
  hideTooltip();
});
watch([() => propsWithDefaults.content, () => propsWithDefaults.target], async () => {
  await nextTick();
  const previousTarget = targetElement.value;

  syncTargetElement({ warn: false });

  if (targetElement.value === previousTarget) {
    unbindTargetListeners();
    bindTargetListeners();
  }

  if (!hasContent.value) {
    requestClose();
  }
});
watch(() => propsWithDefaults.attach, async () => {
  if (!isDisplayed.value) {
    return;
  }

  const attach = resolveAttach();

  if (!attach) {
    console.warn('MatTooltip: attach 必须指向当前 document 中存在的 HTMLElement');
    requestClose();
    return;
  }

  teleportTarget.value = attach;
  isAppRootAttached.value = attach === appContext?.freeLayer.value;
  await nextTick();
  schedulePositionUpdate();
});
watch(() => propsWithDefaults.location, () => {
  if (isDisplayed.value) {
    schedulePositionUpdate();
  }
});
watch(tooltipId, () => {
  if (!isDisplayed.value || !describedTarget) {
    return;
  }

  restoreDescribedBy();
  syncDescribedBy();
});
if (appContext) {
  watch(appContext.publicContext.layout, schedulePositionUpdate);
}
</script>

<template>
  <MatHover
    v-if="!isControlled && hasContent"
    :target="hoverTarget"
    @update:model-value="handleHoverChange"
  />

  <span v-if="hasActivatorSlot || !target" ref="activatorHost" class="mat-tooltip__activator">
    <slot name="activator" />
  </span>

  <Teleport v-if="rendered && teleportTarget" :to="teleportTarget">
    <span
      v-bind="$attrs"
      :id="tooltipId"
      ref="tooltipElement"
      class="mat-tooltip mat-sys-typescale-label-large"
      :class="[
        `mat-tooltip--${phase}`,
        {
          'mat-tooltip--app-root': isAppRootAttached,
          'mat-tooltip--positioned': isPositioned,
          'mat-tooltip--rich': isRich,
        },
      ]"
      :data-location="appliedLocation"
      :style="[positionStyle, $attrs.style]"
      role="tooltip"
      @focusin="handleTooltipFocusIn"
      @focusout="handleFocusOut"
      @mouseenter="handleTooltipPointerEnter"
      @mouseleave="handleTooltipPointerLeave"
    >
      <template v-if="isRich">
        <span
          v-if="hasSubhead"
          class="mat-tooltip__subhead mat-sys-typescale-title-small"
        >
          <template v-if="propsWithDefaults.subhead !== undefined">
            {{ propsWithDefaults.subhead }}
          </template>
          <slot v-else name="subhead" />
        </span>
        <span class="mat-tooltip__content mat-sys-typescale-body-medium">
          <template v-if="propsWithDefaults.content !== undefined">
            {{ propsWithDefaults.content }}
          </template>
          <slot v-else />
        </span>
        <span v-if="$slots.action" class="mat-tooltip__actions">
          <slot name="action" />
        </span>
      </template>
      <template v-else-if="propsWithDefaults.content !== undefined">
        {{ propsWithDefaults.content }}
      </template>
      <slot v-else />
    </span>
  </Teleport>
</template>

<style scoped>
.mat-tooltip__activator {
  display: contents;
}

.mat-tooltip {
  position: fixed;
  z-index: var(--mat-sys-z-index-tooltip);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  min-block-size: var(--mat-tooltip-container-height);
  max-inline-size: calc(100dvi - (var(--mat-tooltip-viewport-margin) * 2));
  padding-inline: var(--mat-tooltip-container-padding-inline);
  overflow: hidden;
  color: var(--mat-tooltip-content-color);
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  pointer-events: none;
  visibility: hidden;
  background: var(--mat-tooltip-container-color);
  border-radius: var(--mat-tooltip-container-shape);
  box-shadow: var(--mat-tooltip-container-elevation);
  opacity: 1;
  transform: translate(0);
  transition: opacity var(--mat-sys-motion-spring-fast-effects), transform var(--mat-sys-motion-spring-fast-spatial);
}

.mat-tooltip--positioned {
  visibility: visible;
}

.mat-tooltip--app-root {
  position: absolute;
  max-inline-size: calc(100% - (var(--mat-tooltip-viewport-margin) * 2));
}

.mat-tooltip--rich {
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  inline-size: max-content;
  max-inline-size: min(
    var(--mat-tooltip-rich-container-max-width),
    calc(100dvi - (var(--mat-tooltip-viewport-margin) * 2))
  );
  min-block-size: auto;
  padding: var(--mat-tooltip-rich-container-padding-block-start)
    var(--mat-tooltip-rich-container-padding-inline)
    var(--mat-tooltip-rich-container-padding-block-end);
  overflow: visible;
  color: var(--mat-tooltip-rich-content-color);
  text-align: start;
  text-overflow: clip;
  white-space: normal;
  pointer-events: auto;
  background: var(--mat-tooltip-rich-container-color);
  border-radius: var(--mat-tooltip-rich-container-shape);
  box-shadow: var(--mat-tooltip-rich-container-elevation);
}

.mat-tooltip--rich.mat-tooltip--app-root {
  max-inline-size: min(
    var(--mat-tooltip-rich-container-max-width),
    calc(100% - (var(--mat-tooltip-viewport-margin) * 2))
  );
}

.mat-tooltip__subhead,
.mat-tooltip__content,
.mat-tooltip__actions {
  max-inline-size: 100%;
}

.mat-tooltip__subhead {
  color: var(--mat-tooltip-rich-subhead-color);
}

.mat-tooltip__subhead + .mat-tooltip__content {
  margin-block-start: var(--mat-tooltip-rich-subhead-content-gap);
}

.mat-tooltip__actions {
  display: flex;
  flex-shrink: 0;
  gap: var(--mat-tooltip-rich-action-gap);
  margin-block-start: var(--mat-tooltip-rich-content-action-gap);
  color: var(--mat-tooltip-rich-action-color);
}

.mat-tooltip--closing {
  visibility: visible;
  opacity: 0;
}

.mat-tooltip--closing[data-location^='top'] {
  transform: translateY(4px);
}

.mat-tooltip--closing[data-location^='right'] {
  transform: translateX(-4px);
}

.mat-tooltip--closing[data-location^='bottom'] {
  transform: translateY(-4px);
}

.mat-tooltip--closing[data-location^='left'] {
  transform: translateX(4px);
}

.mat-tooltip[data-slider-value-indicator] {
  inline-size: max-content;
  block-size: var(--mat-slider-value-indicator-height);
  min-block-size: var(--mat-slider-value-indicator-height);
  min-inline-size: var(--mat-slider-value-indicator-width);
  padding-inline: 12px;
  border-radius: var(--mat-sys-shape-corner-full);
}

@starting-style {
  .mat-tooltip {
    opacity: 0;
  }

  .mat-tooltip[data-location^='top'] {
    transform: translateY(4px);
  }

  .mat-tooltip[data-location^='right'] {
    transform: translateX(-4px);
  }

  .mat-tooltip[data-location^='bottom'] {
    transform: translateY(-4px);
  }

  .mat-tooltip[data-location^='left'] {
    transform: translateX(4px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .mat-tooltip {
    transition: none;
  }
}
</style>
