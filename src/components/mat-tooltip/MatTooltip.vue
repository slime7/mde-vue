<script setup>
import {
  computed,
  getCurrentInstance,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
  shallowRef,
  useAttrs,
  useId,
  useSlots,
  watch,
} from 'vue';
import { getTooltipPosition, TOOLTIP_LOCATIONS } from '../tooltip-position';
import { activateTooltip, deactivateTooltip } from '../tooltip-stack';

const CLOSE_DELAY = 1500;

defineOptions({
  name: 'MatTooltip',
  inheritAttrs: false,
});

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  content: {
    type: String,
    default: undefined,
  },
  target: {
    type: [String, Object],
    default: undefined,
  },
  attach: {
    type: [String, Object],
    default: 'body',
  },
  location: {
    type: String,
    default: 'top',
    validator(value) {
      return TOOLTIP_LOCATIONS.includes(value);
    },
  },
  openDelay: {
    type: [Number, String],
    default: 0,
    validator(value) {
      if (typeof value === 'string' && value.trim() === '') {
        return false;
      }

      const delay = typeof value === 'string' ? Number(value) : value;

      return Number.isFinite(delay) && delay >= 0;
    },
  },
});
const emit = defineEmits({
  'update:modelValue': (payload) => typeof payload === 'boolean',
});
const attrs = useAttrs();
const slots = useSlots();
const instance = getCurrentInstance();
const activatorHost = ref(null);
const targetElement = shallowRef(null);
const teleportTarget = shallowRef(null);
const tooltipElement = ref(null);
const isDisplayed = ref(false);
const isPositioned = ref(false);
const appliedLocation = ref('top');
const positionStyle = ref({});
const suppressed = ref(false);
const generatedId = `${useId().replace(/[^\w-]/g, '-')}-tooltip`;
const tooltipId = computed(() => (
  typeof attrs.id === 'string' ? attrs.id : generatedId
));
const hasContent = computed(() => {
  if (props.content !== undefined) {
    return props.content.length > 0;
  }

  return Boolean(slots.default);
});
const hasActivatorSlot = computed(() => Boolean(slots.activator));
const rawVNodeProps = instance?.vnode.props ?? {};
const isControlled = Object.prototype.hasOwnProperty.call(rawVNodeProps, 'modelValue')
  || Object.prototype.hasOwnProperty.call(rawVNodeProps, 'model-value');

let closeTimer;
let openTimer;
let positionFrame;
let positionFrameUsesAnimation = false;
let resizeObserver;
let removeTargetListeners = null;
let removeViewportListeners = null;
let describedTarget = null;
let previousDescribedBy = null;
let mounted = false;
let pointerInside = false;
let focusInside = false;
let warnedAboutTarget = false;

const stackEntry = {
  close: requestClose,
};

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
  if (typeof props.target === 'string') {
    return resolveSelector(props.target);
  }

  return normalizeElement(props.target);
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
  if (typeof props.attach === 'string') {
    return resolveSelector(props.attach);
  }

  return normalizeElement(props.attach);
}

/**
 * @returns {number}
 */
function getOpenDelay() {
  const delay = typeof props.openDelay === 'string'
    ? Number(props.openDelay)
    : props.openDelay;

  if (!Number.isFinite(delay) || delay < 0) {
    return 0;
  }

  return delay;
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
}

function updatePosition() {
  if (!isDisplayed.value || !targetElement.value || !tooltipElement.value) {
    return;
  }

  const position = getTooltipPosition({
    location: props.location,
    targetRect: targetElement.value.getBoundingClientRect(),
    tooltipRect: tooltipElement.value.getBoundingClientRect(),
    viewport: {
      height: window.innerHeight,
      width: window.innerWidth,
    },
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

  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(schedulePositionUpdate);
    resizeObserver.observe(targetElement.value);
    resizeObserver.observe(tooltipElement.value);
  }
}

function hideTooltip() {
  clearOpenTimer();
  clearCloseTimer();
  stopPositioning();
  restoreDescribedBy();
  deactivateTooltip(stackEntry);
  isDisplayed.value = false;
  isPositioned.value = false;
  teleportTarget.value = null;
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

function syncTargetElement() {
  const nextTarget = resolveTarget();

  if (nextTarget === targetElement.value) {
    if (!nextTarget && hasContent.value) {
      warnForInvalidTarget();
    }

    return;
  }

  const changed = targetElement.value !== null;

  restoreDescribedBy();
  unbindTargetListeners();
  targetElement.value = nextTarget;
  warnedAboutTarget = false;

  if (!nextTarget && hasContent.value) {
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

  const delay = getOpenDelay();

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
  }, CLOSE_DELAY);
}

function updateAutomaticVisibility() {
  if (pointerInside || focusInside) {
    scheduleOpen();
    return;
  }

  scheduleClose();
}

function handleMouseEnter() {
  pointerInside = true;
  updateAutomaticVisibility();
}

function handleMouseLeave() {
  pointerInside = false;
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
  if (targetElement.value?.contains(event.relatedTarget)) {
    return;
  }

  focusInside = false;
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
    target.addEventListener('mouseenter', handleMouseEnter);
    target.addEventListener('mouseleave', handleMouseLeave);
    target.addEventListener('focusin', handleFocusIn);
    target.addEventListener('focusout', handleFocusOut);
  }

  removeTargetListeners = () => {
    target.removeEventListener('keydown', handleKeyDown);
    target.removeEventListener('mouseenter', handleMouseEnter);
    target.removeEventListener('mouseleave', handleMouseLeave);
    target.removeEventListener('focusin', handleFocusIn);
    target.removeEventListener('focusout', handleFocusOut);
  };
}

async function showTooltip() {
  if (suppressed.value || !hasContent.value) {
    return;
  }

  syncTargetElement();

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
  activateTooltip(stackEntry);
  teleportTarget.value = attach;
  appliedLocation.value = props.location;
  positionStyle.value = { left: '0px', top: '0px' };
  isPositioned.value = false;
  isDisplayed.value = true;
  await nextTick();

  if (!isDisplayed.value) {
    return;
  }

  syncDescribedBy();
  updatePosition();
  startPositioning();
}

onMounted(() => {
  mounted = true;
  syncTargetElement();

  if (isControlled && props.modelValue) {
    showTooltip();
  }
});
onUpdated(() => {
  syncTargetElement();

  if (isDisplayed.value) {
    schedulePositionUpdate();
  }
});
onBeforeUnmount(() => {
  mounted = false;
  unbindTargetListeners();
  hideTooltip();
});
watch(() => props.modelValue, (open) => {
  if (!mounted || !isControlled) {
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
watch([() => props.content, () => props.target], async () => {
  await nextTick();
  const previousTarget = targetElement.value;

  syncTargetElement();

  if (targetElement.value === previousTarget) {
    unbindTargetListeners();
    bindTargetListeners();
  }

  if (!hasContent.value) {
    requestClose();
  }
});
watch(() => props.attach, async () => {
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
  await nextTick();
  schedulePositionUpdate();
});
watch(() => props.location, () => {
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
</script>

<template>
  <span ref="activatorHost" class="mat-tooltip__activator">
    <slot name="activator" />
  </span>

  <Teleport v-if="isDisplayed && teleportTarget" :to="teleportTarget">
    <span
      v-bind="$attrs"
      :id="tooltipId"
      ref="tooltipElement"
      class="mat-tooltip"
      :class="{ 'mat-tooltip--positioned': isPositioned }"
      :data-location="appliedLocation"
      :style="[positionStyle, $attrs.style]"
      role="tooltip"
    >
      <template v-if="content !== undefined">
        {{ content }}
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
  z-index: 1000;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  min-block-size: var(--mat-tooltip-container-height);
  max-inline-size: calc(100dvi - (var(--mat-tooltip-viewport-margin) * 2));
  padding-inline: var(--mat-tooltip-container-padding-inline);
  overflow: hidden;
  color: var(--mat-tooltip-content-color);
  font-family: var(--mat-sys-typescale-label-large-font);
  font-size: var(--mat-sys-typescale-label-large-size);
  font-weight: var(--mat-sys-typescale-label-large-weight);
  letter-spacing: var(--mat-sys-typescale-label-large-tracking);
  line-height: var(--mat-sys-typescale-label-large-line-height);
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
  transition: opacity var(--mat-sys-motion-duration-short3) var(--mat-sys-motion-easing-standard), transform var(--mat-sys-motion-duration-short3) var(--mat-sys-motion-easing-standard);
}

.mat-tooltip--positioned {
  visibility: visible;
}

.mat-tooltip[data-slider-value-indicator] {
  inline-size: var(--mat-slider-value-indicator-width);
  block-size: var(--mat-slider-value-indicator-height);
  min-block-size: var(--mat-slider-value-indicator-height);
  min-inline-size: var(--mat-slider-value-indicator-width);
  padding-inline: 0;
  overflow: visible;
  border-radius: var(--mat-sys-shape-corner-full);
}

.mat-tooltip[data-slider-value-indicator]::after {
  position: absolute;
  background: var(--mat-tooltip-container-color);
  content: '';
}

.mat-tooltip[data-slider-value-indicator][data-location^='top']::after {
  inset-block-start: 100%;
  inset-inline-start: 50%;
  inline-size: var(--mat-slider-value-indicator-stem-width);
  block-size: var(--mat-slider-value-indicator-stem-height);
  transform: translateX(-50%);
}

.mat-tooltip[data-slider-value-indicator][data-location^='bottom']::after {
  inset-block-end: 100%;
  inset-inline-start: 50%;
  inline-size: var(--mat-slider-value-indicator-stem-width);
  block-size: var(--mat-slider-value-indicator-stem-height);
  transform: translateX(-50%);
}

.mat-tooltip[data-slider-value-indicator][data-location^='right']::after {
  inset-block-start: 50%;
  inset-inline-end: 100%;
  inline-size: var(--mat-slider-value-indicator-stem-height);
  block-size: var(--mat-slider-value-indicator-stem-width);
  transform: translateY(-50%);
}

.mat-tooltip[data-slider-value-indicator][data-location^='left']::after {
  inset-block-start: 50%;
  inset-inline-start: 100%;
  inline-size: var(--mat-slider-value-indicator-stem-height);
  block-size: var(--mat-slider-value-indicator-stem-width);
  transform: translateY(-50%);
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
    transition-duration: .01ms;
  }
}
</style>
