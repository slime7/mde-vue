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
  watchEffect,
} from 'vue';
import MatSurfaceBase from '../MatSurfaceBase.vue';
import { isComponentColor } from '../button-props';
import { dialogStack, registerDialog, unregisterDialog } from '../dialog-stack';
import MatBtn from '../mat-btn/MatBtn.vue';
import MatIcon from '../mat-icon/MatIcon.vue';
import useComponentColor from '../use-component-color';

defineOptions({
  name: 'MatDialog',
  inheritAttrs: false,
});

/**
 * @param {number|string} value
 * @returns {string}
 */
function resolveDialogWidth(value) {
  return typeof value === 'number' ? `${value}px` : value.trim();
}

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  fullScreen: {
    type: Boolean,
    default: false,
  },
  width: {
    type: [Number, String],
    default: undefined,
    validator(value) {
      if (typeof value === 'number') {
        return Number.isFinite(value) && value > 0;
      }

      return typeof value === 'string' && value.trim().length > 0;
    },
  },
  attach: {
    type: [String, Object],
    default: 'body',
  },
  scrim: {
    type: Boolean,
    default: true,
  },
  closeOnBack: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: undefined,
  },
  content: {
    type: String,
    default: undefined,
  },
  icon: {
    type: String,
    default: undefined,
  },
  closeLabel: {
    type: String,
    default: '关闭',
  },
  color: {
    type: String,
    default: undefined,
    validator: isComponentColor,
  },
});
const emit = defineEmits({
  'update:modelValue': (payload) => typeof payload === 'boolean',
  opened: () => true,
  closed: () => true,
});
const attrs = useAttrs();
const slots = useSlots();
const activatorHost = ref(null);
const surface = ref(null);
const rendered = ref(false);
const phase = ref('closed');
const teleportTarget = ref(null);
const titleId = `${useId().replace(/[^\w-]/g, '-')}-title`;
const root = computed(() => surface.value?.root ?? surface.value?.$el ?? null);
const hasTitle = computed(() => props.title !== undefined || Boolean(slots.title));
const hasContent = computed(() => props.content !== undefined || Boolean(slots.default));
const hasIcon = computed(() => !props.fullScreen && (
  props.icon !== undefined || Boolean(slots.icon)
));
const hasActivatorSlot = computed(() => Boolean(slots.activator));
const isTop = computed(() => dialogStack.value.at(-1) === root.value);
const { colorStyle } = useComponentColor(computed(() => props.color));
const dialogWidthStyle = computed(() => {
  if (props.fullScreen || props.width === undefined) {
    return undefined;
  }

  const width = resolveDialogWidth(props.width);

  return {
    inlineSize: `min(${width}, calc(100dvi - 48px))`,
    maxInlineSize: 'calc(100dvi - 48px)',
  };
});
const rootStyle = computed(() => [colorStyle.value, attrs.style, dialogWidthStyle.value]);
let mounted = false;
let phaseTimer;
let previousFocus = null;

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

function warnForAccessibleName() {
  if (hasTitle.value || attrs['aria-label'] || attrs['aria-labelledby']) {
    return;
  }

  console.warn(
    'MatDialog: 必须通过 title、title Slot、aria-label 或 aria-labelledby 提供可访问名称',
  );
}

function warnForInvalidActivator() {
  console.warn(
    'MatDialog: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点',
  );
}

function focusInitialElement() {
  const element = root.value;

  if (!element) {
    return;
  }

  const focusTarget = element.querySelector([
    '[autofocus]',
    'button:not([disabled])',
    'input:not([disabled])',
    'textarea:not([disabled])',
    'select:not([disabled])',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])',
  ].join(','));

  (focusTarget ?? element).focus({ preventScroll: true });
}

async function openDialog() {
  clearPhaseTimer();

  if (rendered.value && root.value?.open) {
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

  const target = resolveAttach();

  if (!target) {
    console.warn('MatDialog: attach 必须指向当前 document 中存在的 HTMLElement');
    requestClose();
    return;
  }

  previousFocus = activator ?? (
    document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null
  );
  teleportTarget.value = target;
  rendered.value = true;
  phase.value = 'opening';
  warnForAccessibleName();
  await nextTick();

  if (!props.modelValue || !root.value) {
    return;
  }

  if (!root.value.open) {
    root.value.showModal();
  }

  registerDialog(root.value);
  focusInitialElement();
  waitForPhase(400, () => {
    phase.value = 'open';
    emit('opened');
  });
}

function finishClose() {
  const element = root.value;

  if (element?.open) {
    element.close();
  }

  if (element) {
    unregisterDialog(element);
  }

  rendered.value = false;
  phase.value = 'closed';
  nextTick(() => {
    if (previousFocus?.isConnected) {
      previousFocus.focus({ preventScroll: true });
    }

    previousFocus = null;
    emit('closed');
  });
}

function closeDialog() {
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
function handleDialogClick(event) {
  if (!props.closeOnBack || event.target !== root.value) {
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

onMounted(() => {
  mounted = true;

  if (props.modelValue) {
    openDialog();
  }
});
onBeforeUnmount(() => {
  mounted = false;
  clearPhaseTimer();

  if (root.value) {
    unregisterDialog(root.value);

    if (root.value.open) {
      root.value.close();
    }
  }
});
watch(() => props.modelValue, (open) => {
  if (!mounted) {
    return;
  }

  if (open) {
    openDialog();
  } else {
    closeDialog();
  }
});
watch(() => props.attach, () => {
  if (props.modelValue && rendered.value) {
    console.warn('MatDialog: 打开期间修改 attach 将在下次打开时生效');
  }
});
watchEffect(() => {
  if (props.closeLabel.trim().length === 0) {
    console.warn('MatDialog: closeLabel 必须是非空字符串');
  }
});
</script>

<template>
  <span v-if="hasActivatorSlot" ref="activatorHost" class="mat-dialog__activator">
    <slot name="activator" />
  </span>

  <Teleport v-if="rendered" :to="teleportTarget">
    <MatSurfaceBase
      ref="surface"
      v-bind="$attrs"
      as="dialog"
      class="mat-dialog"
      :class="[
        `mat-dialog--${phase}`,
        {
          'mat-dialog--full-screen': fullScreen,
          'mat-dialog--with-icon': hasIcon,
          'mat-dialog--top': isTop,
          'mat-dialog--transparent-scrim': !scrim,
        },
      ]"
      :style="rootStyle"
      :aria-labelledby="$attrs['aria-labelledby'] ?? (hasTitle ? titleId : undefined)"
      tabindex="-1"
      @cancel="handleCancel"
      @click="handleDialogClick"
      @keydown="handleKeyDown"
    >
      <template v-if="fullScreen">
        <header class="mat-dialog__header">
          <MatBtn
            class="mat-dialog__close"
            icon="close"
            :label="closeLabel"
            size="small"
            variant="standard"
            @click="requestClose"
          />

          <h2 v-if="hasTitle" :id="titleId" class="mat-dialog__title">
            <template v-if="title !== undefined">
              {{ title }}
            </template>
            <slot v-else name="title" />
          </h2>

          <div v-if="$slots.actions" class="mat-dialog__actions">
            <slot name="actions" />
          </div>
        </header>

        <div v-if="hasContent" class="mat-dialog__content">
          <template v-if="content !== undefined">
            {{ content }}
          </template>
          <slot v-else />
        </div>
      </template>

      <template v-else>
        <MatIcon
          v-if="hasIcon"
          as="div"
          class="mat-dialog__icon"
          :optical-size="24"
          size="24px"
          aria-hidden="true"
        >
          <template v-if="icon !== undefined">
            {{ icon }}
          </template>
          <slot v-else name="icon" />
        </MatIcon>

        <h2 v-if="hasTitle" :id="titleId" class="mat-dialog__title">
          <template v-if="title !== undefined">
            {{ title }}
          </template>
          <slot v-else name="title" />
        </h2>

        <div v-if="hasContent" class="mat-dialog__content">
          <template v-if="content !== undefined">
            {{ content }}
          </template>
          <slot v-else />
        </div>

        <div v-if="$slots.actions" class="mat-dialog__actions">
          <slot name="actions" />
        </div>
      </template>
    </MatSurfaceBase>
  </Teleport>
</template>

<style scoped>
.mat-dialog__activator {
  display: contents;
}

.mat-dialog {
  --mat-dialog-container-color: var(--mat-sys-color-surface-container-high);
  --mat-dialog-headline-color: var(--mat-sys-color-on-surface);
  --mat-dialog-content-color: var(--mat-sys-color-on-surface-variant);
  --mat-dialog-icon-color: var(--mat-accent-color, var(--mat-sys-color-secondary));
  inset: 0;
  flex-direction: column;
  box-sizing: border-box;
  min-inline-size: min(280px, calc(100dvi - 48px));
  max-inline-size: min(560px, calc(100dvi - 48px));
  max-block-size: calc(100dvb - 48px);
  padding: 0;
  margin: auto;
  overflow: visible;
  color: var(--mat-dialog-content-color);
  background: var(--mat-dialog-container-color);
  border: 0;
  border-radius: var(--mat-sys-shape-corner-extra-large);
  box-shadow: var(--mat-sys-elevation-level3);
}

.mat-dialog[open] {
  display: flex;
}

.mat-dialog::backdrop {
  background: transparent;
}

.mat-dialog--top:not(.mat-dialog--transparent-scrim):not(.mat-dialog--closing)::backdrop {
  background: color-mix(in srgb, var(--mat-sys-color-scrim) 32%, transparent);
}

.mat-dialog--opening {
  animation: mat-dialog-enter var(--mat-sys-motion-duration-medium4) var(--mat-sys-motion-easing-emphasized-decelerate) both;
}

.mat-dialog--opening::backdrop {
  animation: mat-dialog-scrim-enter var(--mat-sys-motion-duration-medium4) var(--mat-sys-motion-easing-emphasized-decelerate) both;
}

.mat-dialog--closing {
  animation: mat-dialog-exit var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized-accelerate) both;
}

.mat-dialog--closing::backdrop {
  animation: mat-dialog-scrim-exit var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized-accelerate) both;
}

.mat-dialog__icon {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  inline-size: 100%;
  padding-block-start: 24px;
  padding-inline: 24px;
  margin-block-end: 16px;
  color: var(--mat-dialog-icon-color);
}

.mat-dialog__title {
  flex: 0 0 auto;
  min-inline-size: 0;
  box-sizing: border-box;
  inline-size: 100%;
  padding-inline: 24px;
  margin: 0;
  color: var(--mat-dialog-headline-color);
  font-family: var(--mat-sys-typescale-headline-small-font);
  font-size: var(--mat-sys-typescale-headline-small-size);
  font-weight: var(--mat-sys-typescale-headline-small-weight);
  letter-spacing: var(--mat-sys-typescale-headline-small-tracking);
  line-height: var(--mat-sys-typescale-headline-small-line-height);
}

.mat-dialog--with-icon > .mat-dialog__title {
  text-align: center;
}

.mat-dialog:not(.mat-dialog--full-screen) > .mat-dialog__icon:last-child {
  padding-block-end: 24px;
  margin-block-end: 0;
}

.mat-dialog:not(.mat-dialog--full-screen) > .mat-dialog__title:first-child {
  padding-block-start: 24px;
}

.mat-dialog:not(.mat-dialog--full-screen) > .mat-dialog__title:last-child {
  padding-block-end: 24px;
}

.mat-dialog__title + .mat-dialog__content {
  padding-block-start: 16px;
}

.mat-dialog__content {
  flex: 0 1 auto;
  min-block-size: 0;
  box-sizing: border-box;
  inline-size: 100%;
  padding-inline: 24px;
  overflow-y: auto;
  scrollbar-gutter: stable;
  font-family: var(--mat-sys-typescale-body-medium-font);
  font-size: var(--mat-sys-typescale-body-medium-size);
  font-weight: var(--mat-sys-typescale-body-medium-weight);
  letter-spacing: var(--mat-sys-typescale-body-medium-tracking);
  line-height: var(--mat-sys-typescale-body-medium-line-height);
  overscroll-behavior: contain;
}

.mat-dialog:not(.mat-dialog--full-screen) > .mat-dialog__content:first-child {
  padding-block-start: 24px;
}

.mat-dialog:not(.mat-dialog--full-screen) > .mat-dialog__content:last-child {
  padding-block-end: 24px;
}

.mat-dialog__actions {
  display: flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  box-sizing: border-box;
  inline-size: 100%;
  padding: 24px;
}

.mat-dialog--full-screen {
  min-inline-size: 100dvi;
  inline-size: 100dvi;
  max-inline-size: 100dvi;
  min-block-size: 100dvb;
  block-size: 100dvb;
  max-block-size: 100dvb;
  padding: 0;
  margin: 0;
  background: var(--mat-sys-color-surface);
  border-radius: var(--mat-sys-shape-corner-none);
  box-shadow: none;
}

.mat-dialog__header {
  display: flex;
  flex: 0 0 56px;
  gap: 16px;
  align-items: center;
  box-sizing: border-box;
  min-inline-size: 0;
  padding-inline: 4px 16px;
}

.mat-dialog__header .mat-dialog__close {
  flex-shrink: 0;
}

.mat-dialog__header .mat-dialog__title {
  flex: 0 1 auto;
  inline-size: auto;
  padding: 0;
  overflow: hidden;
  font-family: var(--mat-sys-typescale-title-large-font);
  font-size: var(--mat-sys-typescale-title-large-size);
  font-weight: var(--mat-sys-typescale-title-large-weight);
  letter-spacing: var(--mat-sys-typescale-title-large-tracking);
  line-height: var(--mat-sys-typescale-title-large-line-height);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mat-dialog__header .mat-dialog__actions {
  flex: 1 1 auto;
  flex-wrap: nowrap;
  min-inline-size: 0;
  padding: 0;
  margin: 0;
}

.mat-dialog--full-screen > .mat-dialog__content {
  flex: 1 1 auto;
  padding: 24px;
}

@keyframes mat-dialog-enter {
  from {
    opacity: 0;
    transform: scale(.92);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes mat-dialog-exit {
  from {
    opacity: 1;
    transform: scale(1);
  }

  to {
    opacity: 0;
    transform: scale(.92);
  }
}

@keyframes mat-dialog-scrim-enter {
  from {
    background: transparent;
  }
}

@keyframes mat-dialog-scrim-exit {
  to {
    background: transparent;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mat-dialog,
  .mat-dialog::backdrop {
    animation-duration: .01ms;
  }
}
</style>
