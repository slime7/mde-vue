<script setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useAttrs,
  useId,
  useSlots,
  watch,
} from 'vue';
import { dialogStack, registerDialog, unregisterDialog } from './dialog-stack';
import MatBtn from './mat-btn/MatBtn.vue';
import MatSurfaceBase from './MatSurfaceBase.vue';
import { normalizeNumber, toCssLength } from './value-utils';

defineOptions({
  name: 'MatSheetBase',
  inheritAttrs: false,
});

const props = defineProps({
  attach: {
    type: [String, Object],
    default: 'body',
  },
  breakpoint: {
    type: Number,
    default: 840,
  },
  closeLabel: {
    type: String,
    default: '关闭',
  },
  closeOnBack: {
    type: Boolean,
    default: true,
  },
  collapseDragHandleLabel: {
    type: String,
    default: '折叠底部面板',
  },
  closable: {
    type: Boolean,
    default: false,
  },
  componentName: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    default: undefined,
  },
  direction: {
    type: String,
    required: true,
  },
  dragHandle: {
    type: Boolean,
    default: false,
  },
  dragHandleLabel: {
    type: String,
    default: '展开底部面板',
  },
  draggable: {
    type: Boolean,
    default: true,
  },
  expanded: {
    type: Boolean,
    default: false,
  },
  expandedDragHandleLabel: {
    type: String,
    default: '关闭底部面板',
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  position: {
    type: String,
    default: 'end',
  },
  scrim: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: undefined,
  },
  variant: {
    type: String,
    default: 'auto',
  },
  width: {
    type: [Number, String],
    default: undefined,
  },
});

const emit = defineEmits({
  closed: () => true,
  opened: () => true,
  'update:expanded': (payload) => typeof payload === 'boolean',
  'update:modelValue': (payload) => typeof payload === 'boolean',
});
const attrs = useAttrs();
const slots = useSlots();
const activatorHost = ref(null);
const surface = ref(null);
const rendered = ref(false);
const phase = ref('closed');
const teleportTarget = ref(null);
const viewportWidth = ref(typeof window === 'undefined' ? 0 : window.innerWidth);
const dragOffset = ref(0);
const dragSize = ref(null);
const dragging = ref(false);
const titleId = `${useId().replace(/[^\w-]/g, '-')}-title`;
const root = computed(() => surface.value?.root ?? surface.value?.$el ?? null);
const resolvedVariant = computed(() => {
  if (props.variant !== 'auto') {
    return props.variant;
  }

  return viewportWidth.value < normalizeNumber(props.breakpoint, {
    positive: true,
    fallback: 840,
  }) ? 'modal' : 'standard';
});
const isModal = computed(() => resolvedVariant.value === 'modal');
const isTop = computed(() => isModal.value && dialogStack.value.at(-1) === root.value);
const hasActivatorSlot = computed(() => Boolean(slots.activator));
const hasTitle = computed(() => props.title !== undefined || Boolean(slots.title));
const hasContent = computed(() => props.content !== undefined || Boolean(slots.default));
const showCloseButton = computed(() => props.closable);
const resolvedDragHandleLabel = computed(() => {
  if (!props.expanded) {
    return props.dragHandleLabel;
  }

  return isModal.value ? props.expandedDragHandleLabel : props.collapseDragHandleLabel;
});
const hasHeader = computed(() => hasTitle.value
  || showCloseButton.value
  || Boolean(slots.header)
  || Boolean(slots.actions));
const rootTag = computed(() => (isModal.value ? 'dialog' : 'aside'));
const resolvedWidth = computed(() => {
  if (props.width === undefined) {
    return undefined;
  }

  return toCssLength(props.width, {
    property: 'inline-size',
    positive: true,
  });
});
const sizeStyle = computed(() => {
  if (!resolvedWidth.value) {
    return undefined;
  }

  return {
    '--mat-sheet-preferred-width': resolvedWidth.value,
  };
});
const dragStyle = computed(() => ({
  '--mat-sheet-drag-offset': `${dragOffset.value}px`,
  ...(dragSize.value === null
    ? {}
    : { '--mat-sheet-drag-size': `${dragSize.value}px` }),
}));
const rootStyle = computed(() => [attrs.style, sizeStyle.value, dragStyle.value]);
let mounted = false;
let phaseTimer;
let previousFocus = null;
let previousWasModal = false;
let activePointerId = null;
let dragStart = 0;
let dragStartExtent = 0;
let dragStartedAt = 0;
let dragDistance = 0;
let suppressHandleClick = false;

function clearPhaseTimer() {
  if (phaseTimer === undefined) {
    return;
  }

  window.clearTimeout(phaseTimer);
  phaseTimer = undefined;
}

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

/**
 * @param {number} duration
 * @param {() => void} callback
 */
function waitForPhase(duration, callback) {
  clearPhaseTimer();

  if (prefersReducedMotion()) {
    callback();
    return;
  }

  phaseTimer = window.setTimeout(() => {
    phaseTimer = undefined;
    callback();
  }, duration);
}

/**
 * @returns {HTMLElement | null}
 */
function resolveActivatorTarget() {
  const elements = activatorHost.value ? [...activatorHost.value.children] : [];

  if (elements.length === 1 && elements[0] instanceof HTMLElement
    && elements[0].ownerDocument === document) {
    return elements[0];
  }

  return null;
}

/**
 * @returns {HTMLElement | null}
 */
function resolveAttach() {
  if (typeof props.attach === 'string') {
    try {
      return document.querySelector(props.attach);
    } catch {
      return null;
    }
  }

  if (props.attach instanceof HTMLElement && props.attach.ownerDocument === document) {
    return props.attach;
  }

  return null;
}

function requestClose() {
  emit('update:modelValue', false);
}

function handleDragHandleClick() {
  if (suppressHandleClick) {
    suppressHandleClick = false;
    return;
  }

  if (props.expanded) {
    if (isModal.value) {
      requestClose();
      return;
    }

    emit('update:expanded', false);
    return;
  }

  emit('update:expanded', true);
}

/**
 * @param {KeyboardEvent} event
 */
function handleDragHandleKeydown(event) {
  if (event.key !== 'Enter' && event.key !== ' ') {
    return;
  }

  event.preventDefault();
  handleDragHandleClick();
}

function warnForInvalidActivator() {
  console.warn(
    `${props.componentName}: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点`,
  );
}

function warnForAccessibleName() {
  if (!isModal.value || hasTitle.value || attrs['aria-label'] || attrs['aria-labelledby']) {
    return;
  }

  console.warn(
    `${props.componentName}: 必须通过 title、title Slot、aria-label 或 aria-labelledby 提供可访问名称`,
  );
}

function warnForInvalidAttach() {
  console.warn(`${props.componentName}: attach 必须指向当前 document 中存在的 HTMLElement`);
}

function focusInitialElement() {
  const element = root.value;

  if (!element) {
    return;
  }

  const focusTarget = element.querySelector([
    '[autofocus]',
    'button:not([disabled]):not([data-sheet-drag-handle])',
    'input:not([disabled])',
    'textarea:not([disabled])',
    'select:not([disabled])',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])',
  ].join(','));

  (focusTarget ?? element).focus({ preventScroll: true });
}

function showModalRoot() {
  const element = root.value;

  if (!(element instanceof HTMLDialogElement)) {
    return;
  }

  if (!element.open) {
    element.showModal();
  }

  registerDialog(element);
  focusInitialElement();
}

async function openSheet() {
  clearPhaseTimer();

  if (rendered.value) {
    phase.value = 'opening';
    waitForPhase(400, () => {
      phase.value = 'open';
      emit('opened');
    });
    return;
  }

  const activator = hasActivatorSlot.value ? resolveActivatorTarget() : null;

  if (hasActivatorSlot.value && !activator) {
    warnForInvalidActivator();
    requestClose();
    return;
  }

  if (isModal.value) {
    const target = resolveAttach();

    if (!target) {
      warnForInvalidAttach();
      requestClose();
      return;
    }

    teleportTarget.value = target;
    previousFocus = activator ?? (
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null
    );
  }

  previousWasModal = isModal.value;
  rendered.value = true;
  phase.value = 'opening';
  warnForAccessibleName();
  await nextTick();

  if (!props.modelValue || !root.value) {
    return;
  }

  if (isModal.value) {
    showModalRoot();
  }

  waitForPhase(400, () => {
    phase.value = 'open';
    emit('opened');
  });
}

function restoreFocus() {
  if (previousWasModal && previousFocus?.isConnected) {
    previousFocus.focus({ preventScroll: true });
  }

  previousFocus = null;
  previousWasModal = false;
}

function finishClose() {
  const element = root.value;

  if (element instanceof HTMLDialogElement) {
    if (element.open) {
      element.close();
    }

    unregisterDialog(element);
  }

  rendered.value = false;
  phase.value = 'closed';
  dragOffset.value = 0;
  dragSize.value = null;
  nextTick(() => {
    restoreFocus();
    emit('closed');
  });
}

function closeSheet() {
  if (!rendered.value) {
    return;
  }

  phase.value = 'closing';
  waitForPhase(200, finishClose);
}

/**
 * @param {Event} event
 */
function handleCancel(event) {
  event.preventDefault();
  requestClose();
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

/**
 * @param {MouseEvent} event
 */
function handleSheetClick(event) {
  if (!isModal.value || !props.closeOnBack || event.target !== root.value) {
    return;
  }

  const rect = root.value.getBoundingClientRect();
  const outside = event.clientX < rect.left
    || event.clientX > rect.right
    || event.clientY < rect.top
    || event.clientY > rect.bottom;

  if (outside) {
    requestClose();
  }
}

/**
 * @param {PointerEvent} event
 */
function updateDrag(event) {
  if (event.pointerId !== activePointerId) {
    return;
  }

  if (props.direction === 'bottom') {
    dragDistance = event.clientY - dragStart;

    if ((!props.expanded && dragDistance < 0)
      || (props.expanded && dragDistance > 0)) {
      dragOffset.value = 0;
      dragSize.value = Math.max(0, dragStartExtent - dragDistance);
      return;
    }

    dragOffset.value = Math.max(0, dragDistance);
    dragSize.value = dragStartExtent;
    return;
  }

  dragOffset.value = props.position === 'start'
    ? Math.max(0, dragStart - event.clientX)
    : Math.max(0, event.clientX - dragStart);
}

function stopDragging() {
  activePointerId = null;
  dragging.value = false;
  window.removeEventListener('pointermove', updateDrag);
  window.removeEventListener('pointerup', finishDrag);
  window.removeEventListener('pointercancel', cancelDrag);
}

/**
 * @param {PointerEvent} event
 */
function finishDrag(event) {
  if (event.pointerId !== activePointerId) {
    return;
  }

  const element = root.value;
  const extent = props.direction === 'bottom'
    ? element?.getBoundingClientRect().height ?? 0
    : element?.getBoundingClientRect().width ?? 0;
  const elapsed = Math.max(1, performance.now() - dragStartedAt);
  const distance = props.direction === 'bottom'
    ? Math.abs(dragDistance)
    : dragOffset.value;
  const velocity = distance / elapsed;
  const threshold = Math.min(160, Math.max(80, extent * 0.3));
  const reachedThreshold = distance >= threshold
    || (distance >= 24 && velocity >= 0.5);

  suppressHandleClick = distance >= 4;
  stopDragging();

  if (props.direction === 'bottom' && reachedThreshold) {
    if (!props.expanded && dragDistance < 0) {
      dragOffset.value = 0;
      dragSize.value = null;
      emit('update:expanded', true);
      return;
    }

    if (props.expanded && dragDistance > 0) {
      dragOffset.value = 0;
      dragSize.value = null;
      emit('update:expanded', false);
      return;
    }

    if (!props.expanded && dragDistance > 0) {
      dragSize.value = null;
      requestClose();
      return;
    }
  }

  if (props.direction === 'side' && reachedThreshold) {
    requestClose();
    return;
  }

  dragOffset.value = 0;
  dragSize.value = null;
}

function cancelDrag() {
  stopDragging();
  dragOffset.value = 0;
  dragSize.value = null;
}

/**
 * @param {PointerEvent} event
 */
function startDrag(event) {
  if (!props.draggable || event.button !== 0 || activePointerId !== null) {
    return;
  }

  activePointerId = event.pointerId;
  dragStart = props.direction === 'bottom' ? event.clientY : event.clientX;
  dragStartExtent = props.direction === 'bottom'
    ? root.value?.getBoundingClientRect().height ?? 0
    : root.value?.getBoundingClientRect().width ?? 0;
  dragStartedAt = performance.now();
  dragDistance = 0;
  dragSize.value = props.direction === 'bottom' ? dragStartExtent : null;
  dragging.value = true;
  window.addEventListener('pointermove', updateDrag);
  window.addEventListener('pointerup', finishDrag);
  window.addEventListener('pointercancel', cancelDrag);
}

/**
 * @param {PointerEvent} event
 */
function handleRootPointerDown(event) {
  if (props.direction !== 'side' || event.pointerType !== 'touch') {
    return;
  }

  if (event.target instanceof Element && event.target.closest(
    'button, a, input, textarea, select, [contenteditable="true"]',
  )) {
    return;
  }

  startDrag(event);
}

function updateViewportWidth() {
  viewportWidth.value = window.innerWidth;
}

/**
 * @param {'modal'|'standard'} nextVariant
 * @param {'modal'|'standard'} previousVariant
 */
async function handleVariantChange(nextVariant, previousVariant) {
  if (!rendered.value || !props.modelValue || nextVariant === previousVariant) {
    return;
  }

  clearPhaseTimer();
  const element = root.value;

  if (previousVariant === 'modal' && element instanceof HTMLDialogElement) {
    if (element.open) {
      element.close();
    }

    unregisterDialog(element);
    restoreFocus();
  }

  if (nextVariant === 'modal') {
    const target = resolveAttach();

    if (!target) {
      warnForInvalidAttach();
      requestClose();
      return;
    }

    teleportTarget.value = target;
    previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    previousWasModal = true;
    warnForAccessibleName();
  }

  phase.value = 'open';
  await nextTick();

  if (nextVariant === 'modal' && props.modelValue) {
    showModalRoot();
  }
}

onMounted(() => {
  mounted = true;
  updateViewportWidth();
  window.addEventListener('resize', updateViewportWidth);

  if (props.modelValue) {
    openSheet();
  }
});
onBeforeUnmount(() => {
  mounted = false;
  clearPhaseTimer();
  stopDragging();
  window.removeEventListener('resize', updateViewportWidth);

  const element = root.value;

  if (element instanceof HTMLDialogElement) {
    unregisterDialog(element);

    if (element.open) {
      element.close();
    }
  }
});
watch(() => props.modelValue, (open) => {
  if (!mounted) {
    return;
  }

  if (open) {
    openSheet();
  } else {
    closeSheet();
  }
});
watch(resolvedVariant, handleVariantChange);
watch(() => props.attach, () => {
  if (props.modelValue && rendered.value && isModal.value) {
    console.warn(`${props.componentName}: 打开期间修改 attach 将在下次打开时生效`);
  }
});
watch(() => props.closeLabel, (value) => {
  if (value.trim().length === 0) {
    console.warn(`${props.componentName}: closeLabel 必须是非空字符串`);
  }
}, { immediate: true });
</script>

<template>
  <span v-if="hasActivatorSlot" ref="activatorHost" class="mat-sheet__activator">
    <slot name="activator" />
  </span>

  <Teleport
    v-if="rendered"
    :to="teleportTarget ?? 'body'"
    :disabled="!isModal"
  >
    <MatSurfaceBase
      ref="surface"
      v-bind="$attrs"
      :as="rootTag"
      class="mat-sheet"
      :class="[
        `mat-sheet--${direction}`,
        `mat-sheet--${resolvedVariant}`,
        `mat-sheet--${phase}`,
        `mat-sheet--position-${position}`,
        {
          'mat-sheet--dragging': dragging,
          'mat-sheet--expanded': direction === 'bottom' && expanded,
          'mat-sheet--top': isTop,
          'mat-sheet--transparent-scrim': !scrim,
        },
      ]"
      :style="rootStyle"
      :aria-labelledby="$attrs['aria-labelledby'] ?? (hasTitle ? titleId : undefined)"
      :tabindex="isModal ? -1 : undefined"
      @cancel="handleCancel"
      @click="handleSheetClick"
      @keydown="handleKeyDown"
      @pointerdown="handleRootPointerDown"
    >
      <button
        v-if="direction === 'bottom' && dragHandle"
        class="mat-sheet__drag-handle-target"
        type="button"
        data-sheet-drag-handle
        :aria-label="resolvedDragHandleLabel"
        @click="handleDragHandleClick"
        @keydown="handleDragHandleKeydown"
        @pointerdown.stop="startDrag"
      >
        <slot name="drag-handle">
          <span class="mat-sheet__drag-handle" />
        </slot>
      </button>

      <header v-if="hasHeader" class="mat-sheet__header">
        <slot name="header">
          <h2 v-if="hasTitle" :id="titleId" class="mat-sheet__title">
            <template v-if="title !== undefined">
              {{ title }}
            </template>
            <slot v-else name="title" />
          </h2>

          <div v-if="$slots.actions" class="mat-sheet__header-actions">
            <slot name="actions" />
          </div>

          <MatBtn
            v-if="showCloseButton"
            class="mat-sheet__close"
            icon="close"
            :label="closeLabel"
            size="small"
            variant="standard"
            @click="requestClose"
          />
        </slot>
      </header>

      <div v-if="hasContent" class="mat-sheet__content">
        <template v-if="content !== undefined">
          {{ content }}
        </template>
        <slot v-else />
      </div>

      <div v-if="$slots.footer" class="mat-sheet__footer">
        <slot name="footer" />
      </div>
    </MatSurfaceBase>
  </Teleport>
</template>

<style scoped>
.mat-sheet__activator {
  display: contents;
}

.mat-sheet {
  --mat-sheet-container-color: var(--mat-sys-color-surface-container-low);
  --mat-sheet-content-color: var(--mat-sys-color-on-surface-variant);
  --mat-sheet-preferred-width: 100%;
  --mat-sheet-drag-offset: 0;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  box-sizing: border-box;
  min-inline-size: 0;
  padding: 0;
  overflow: hidden;
  color: var(--mat-sheet-content-color);
  background: var(--mat-sheet-container-color);
  border: 0;
  box-shadow: none;
}

.mat-sheet--modal {
  position: fixed;
}

.mat-sheet--modal[open] {
  display: flex;
}

.mat-sheet--modal::backdrop {
  background: transparent;
}

.mat-sheet--modal.mat-sheet--top:not(.mat-sheet--transparent-scrim):not(.mat-sheet--closing)::backdrop {
  background: color-mix(in srgb, var(--mat-sys-color-scrim) 32%, transparent);
}

.mat-sheet--bottom {
  interpolate-size: allow-keywords;
  align-self: center;
  inline-size: min(var(--mat-sheet-preferred-width), 100%);
  max-inline-size: min(640px, 100%);
  max-block-size: calc(100dvb - 72px);
  border-radius: var(--mat-sys-shape-corner-extra-large)
    var(--mat-sys-shape-corner-extra-large)
    var(--mat-sys-shape-corner-none)
    var(--mat-sys-shape-corner-none);
  box-shadow: var(--mat-sys-elevation-level1);
  transform: translateY(var(--mat-sheet-drag-offset));
  transition: block-size var(--mat-sys-motion-duration-short4)
    var(--mat-sys-motion-easing-emphasized);
}

.mat-sheet--bottom.mat-sheet--modal {
  inset: auto 0 0;
  inline-size: min(var(--mat-sheet-preferred-width), 100dvi);
  max-inline-size: min(640px, 100dvi);
  margin: 0 auto;
}

.mat-sheet--bottom.mat-sheet--modal:not(.mat-sheet--expanded):not(.mat-sheet--dragging) {
  max-block-size: 50dvb;
}

.mat-sheet--bottom.mat-sheet--expanded {
  block-size: calc(100dvb - 72px);
}

.mat-sheet--side {
  align-self: stretch;
  inline-size: min(var(--mat-sheet-preferred-width), 100%);
  max-inline-size: min(400px, 100%);
  min-block-size: 0;
  block-size: 100%;
  border-radius: var(--mat-sys-shape-corner-large);
  touch-action: pan-y;
}

.mat-sheet--side.mat-sheet--standard {
  --mat-sheet-container-color: var(--mat-sys-color-surface);
}

.mat-sheet--side.mat-sheet--position-end {
  border-start-end-radius: var(--mat-sys-shape-corner-none);
  border-end-end-radius: var(--mat-sys-shape-corner-none);
  transform: translateX(var(--mat-sheet-drag-offset));
}

.mat-sheet--side.mat-sheet--position-start {
  border-start-start-radius: var(--mat-sys-shape-corner-none);
  border-end-start-radius: var(--mat-sys-shape-corner-none);
  transform: translateX(calc(-1 * var(--mat-sheet-drag-offset)));
}

.mat-sheet--side.mat-sheet--modal {
  inset-block: 0;
  inline-size: min(var(--mat-sheet-preferred-width), calc(100dvi - 16px), 400px);
  max-inline-size: min(calc(100dvi - 16px), 400px);
  min-block-size: 100dvb;
  block-size: 100dvb;
  max-block-size: 100dvb;
  margin-block: 0;
  box-shadow: var(--mat-sys-elevation-level1);
}

.mat-sheet--side.mat-sheet--modal.mat-sheet--position-end {
  inset-inline: auto 0;
  margin-inline: auto 0;
}

.mat-sheet--side.mat-sheet--modal.mat-sheet--position-start {
  inset-inline: 0 auto;
  margin-inline: 0 auto;
}

.mat-sheet__drag-handle-target {
  display: flex;
  flex: 0 0 48px;
  align-items: center;
  justify-content: center;
  inline-size: 100%;
  padding: 0;
  touch-action: none;
  user-select: none;
  color: inherit;
  background: transparent;
  border: 0;
  cursor: grab;
}

.mat-sheet__drag-handle-target:active {
  cursor: grabbing;
}

.mat-sheet__drag-handle-target:focus-visible {
  outline: 2px solid var(--mat-sys-color-primary);
  outline-offset: -4px;
}

.mat-sheet__drag-handle {
  display: block;
  inline-size: 32px;
  block-size: 4px;
  background: var(--mat-sys-color-on-surface-variant);
  border-radius: var(--mat-sys-shape-corner-full);
  opacity: .4;
}

.mat-sheet__header {
  display: flex;
  flex: 0 0 auto;
  gap: 16px;
  align-items: center;
  box-sizing: border-box;
  min-block-size: 64px;
  min-inline-size: 0;
  padding: 12px 16px 12px 24px;
}

.mat-sheet--side .mat-sheet__header {
  padding-inline: 24px;
}

.mat-sheet--bottom .mat-sheet__drag-handle-target + .mat-sheet__header {
  padding-block-start: 0;
}

.mat-sheet__title {
  flex: 1 1 auto;
  min-inline-size: 0;
  margin: 0;
  padding: 0;
  overflow-wrap: anywhere;
  color: var(--mat-sys-color-on-surface);
  border: 0;
  font-family: var(--mat-sys-typescale-title-large-font);
  font-size: var(--mat-sys-typescale-title-large-size);
  font-weight: var(--mat-sys-typescale-title-large-weight);
  letter-spacing: var(--mat-sys-typescale-title-large-tracking);
  line-height: var(--mat-sys-typescale-title-large-line-height);
}

.mat-sheet__header-actions {
  display: flex;
  flex: 0 1 auto;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  min-inline-size: 0;
}

.mat-sheet__close {
  flex-shrink: 0;
}

.mat-sheet__content {
  flex: 1 1 auto;
  box-sizing: border-box;
  min-block-size: 0;
  inline-size: 100%;
  padding: 16px 24px 24px;
  overflow-y: auto;
  overflow-wrap: anywhere;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: var(--mat-sys-color-outline) transparent;
  font-family: var(--mat-sys-typescale-body-medium-font);
  font-size: var(--mat-sys-typescale-body-medium-size);
  font-weight: var(--mat-sys-typescale-body-medium-weight);
  letter-spacing: var(--mat-sys-typescale-body-medium-tracking);
  line-height: var(--mat-sys-typescale-body-medium-line-height);
}

.mat-sheet__content::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.mat-sheet__content::-webkit-scrollbar-track {
  background: transparent;
}

.mat-sheet__content::-webkit-scrollbar-thumb {
  background: var(--mat-sys-color-outline);
  border-radius: var(--mat-sys-shape-corner-full);
}

.mat-sheet__drag-handle-target + .mat-sheet__content,
.mat-sheet > .mat-sheet__content:first-child {
  padding-block-start: 24px;
}

.mat-sheet__footer {
  display: flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  box-sizing: border-box;
  inline-size: 100%;
  min-block-size: 72px;
  padding: 16px 24px 24px;
}

@media (width >= 641px) {
  .mat-sheet--bottom {
    max-inline-size: min(640px, calc(100% - 112px));
    max-block-size: calc(100dvb - 56px);
  }

  .mat-sheet--bottom.mat-sheet--expanded {
    block-size: calc(100dvb - 56px);
  }

  .mat-sheet--bottom.mat-sheet--modal {
    max-inline-size: min(640px, calc(100dvi - 112px));
  }
}

.mat-sheet--bottom.mat-sheet--dragging {
  block-size: var(--mat-sheet-drag-size);
  transition: none;
}

.mat-sheet--opening.mat-sheet--bottom {
  animation: mat-bottom-sheet-enter var(--mat-sys-motion-duration-medium4)
    var(--mat-sys-motion-easing-emphasized-decelerate) both;
}

.mat-sheet--closing.mat-sheet--bottom {
  animation: mat-bottom-sheet-exit var(--mat-sys-motion-duration-short4)
    var(--mat-sys-motion-easing-emphasized-accelerate) both;
}

.mat-sheet--opening.mat-sheet--side.mat-sheet--position-end {
  animation: mat-side-sheet-end-enter var(--mat-sys-motion-duration-medium4)
    var(--mat-sys-motion-easing-emphasized-decelerate) both;
}

.mat-sheet--closing.mat-sheet--side.mat-sheet--position-end {
  animation: mat-side-sheet-end-exit var(--mat-sys-motion-duration-short4)
    var(--mat-sys-motion-easing-emphasized-accelerate) both;
}

.mat-sheet--opening.mat-sheet--side.mat-sheet--position-start {
  animation: mat-side-sheet-start-enter var(--mat-sys-motion-duration-medium4)
    var(--mat-sys-motion-easing-emphasized-decelerate) both;
}

.mat-sheet--closing.mat-sheet--side.mat-sheet--position-start {
  animation: mat-side-sheet-start-exit var(--mat-sys-motion-duration-short4)
    var(--mat-sys-motion-easing-emphasized-accelerate) both;
}

.mat-sheet--opening::backdrop {
  animation: mat-sheet-scrim-enter var(--mat-sys-motion-duration-medium4)
    var(--mat-sys-motion-easing-emphasized-decelerate) both;
}

.mat-sheet--closing::backdrop {
  animation: mat-sheet-scrim-exit var(--mat-sys-motion-duration-short4)
    var(--mat-sys-motion-easing-emphasized-accelerate) both;
}

.mat-sheet--dragging {
  transition: none;
}

@keyframes mat-bottom-sheet-enter {
  from {
    transform: translateY(100%);
  }
}

@keyframes mat-bottom-sheet-exit {
  to {
    transform: translateY(100%);
  }
}

@keyframes mat-side-sheet-end-enter {
  from {
    transform: translateX(100%);
  }
}

@keyframes mat-side-sheet-end-exit {
  to {
    transform: translateX(100%);
  }
}

@keyframes mat-side-sheet-start-enter {
  from {
    transform: translateX(-100%);
  }
}

@keyframes mat-side-sheet-start-exit {
  to {
    transform: translateX(-100%);
  }
}

@keyframes mat-sheet-scrim-enter {
  from {
    background: transparent;
  }
}

@keyframes mat-sheet-scrim-exit {
  to {
    background: transparent;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mat-sheet,
  .mat-sheet::backdrop {
    animation-duration: .01ms;
    transition-duration: .01ms;
  }
}
</style>
