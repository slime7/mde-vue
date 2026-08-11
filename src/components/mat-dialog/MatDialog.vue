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
import { isValidCssLength, toCssLength } from '../value-utils';

defineOptions({
  name: 'MatDialog',
  inheritAttrs: false,
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
   * 是否使用全屏布局；模板属性为 full-screen。
   *
   * @type {boolean}
   * @default false
   */
  fullScreen: {
    type: Boolean,
    default: false,
  },
  /**
   * 首选宽度；数字与纯数字字符串按 px 处理，其他字符串 trim 后须为合法 CSS 宽度值，
   * 非法值时省略宽度样式。
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
   * Teleport 目标；字符串按当前 document 的 CSS 选择器解析。
   *
   * @type {string | HTMLElement}
   * @default 'body'
   */
  attach: {
    type: [String, Object],
    default: 'body',
  },
  /**
   * 是否显示顶层帷幕。
   *
   * @type {boolean}
   * @default true
   */
  scrim: {
    type: Boolean,
    default: true,
  },
  /**
   * 点击 Dialog 外帷幕时是否请求关闭。
   *
   * @type {boolean}
   * @default false
   */
  closeOnBack: {
    type: Boolean,
    default: false,
  },
  /**
   * 简单标题；设置后优先于 title Slot。
   *
   * @type {string | undefined}
   * @default undefined
   */
  title: {
    type: String,
    default: undefined,
  },
  /**
   * 简单正文；设置后优先于默认 Slot。
   *
   * @type {string | undefined}
   * @default undefined
   */
  content: {
    type: String,
    default: undefined,
  },
  /**
   * Material Symbols 字形；设置后优先于 icon Slot。
   *
   * @type {string | undefined}
   * @default undefined
   */
  icon: {
    type: String,
    default: undefined,
  },
  /**
   * 全屏头部关闭按钮的非空可访问名称。
   *
   * @type {string}
   * @default '关闭'
   */
  closeLabel: {
    type: String,
    default: '关闭',
  },
  /**
   * 基础 Dialog 装饰图标的语义色或 `#RRGGBB`。
   *
   * @type {string | undefined}
   * @default undefined
   */
  color: {
    type: String,
    default: undefined,
    validator: isComponentColor,
  },
});
const emit = defineEmits({
  /**
   * 请求关闭时发出 false。
   */
  'update:modelValue': (payload) => typeof payload === 'boolean',
  /**
   * 进入动画完成后触发。
   */
  opened: () => true,
  /**
   * 退出动画和 DOM 清理完成后触发。
   */
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

  const width = toCssLength(props.width, {
    property: 'inline-size',
    positive: true,
  });

  if (width === undefined) {
    return undefined;
  }

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

          <h2
            v-if="hasTitle"
            :id="titleId"
            class="mat-dialog__title mat-sys-typescale-title-large"
          >
            <template v-if="title !== undefined">
              {{ title }}
            </template>
            <slot v-else name="title" />
          </h2>

          <div v-if="$slots.actions" class="mat-dialog__actions">
            <slot name="actions" />
          </div>
        </header>

        <div
          v-if="hasContent"
          class="mat-dialog__content mat-sys-typescale-body-medium"
        >
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

        <h2
          v-if="hasTitle"
          :id="titleId"
          class="mat-dialog__title mat-sys-typescale-headline-small"
        >
          <template v-if="title !== undefined">
            {{ title }}
          </template>
          <slot v-else name="title" />
        </h2>

        <div
          v-if="hasContent"
          class="mat-dialog__content mat-sys-typescale-body-medium"
        >
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
  overflow-wrap: anywhere;
  color: var(--mat-dialog-headline-color);
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
  overflow-wrap: anywhere;
  scrollbar-width: thin;
  scrollbar-color: var(--mat-sys-color-outline) transparent;
  overscroll-behavior: contain;
}

.mat-dialog__content::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.mat-dialog__content::-webkit-scrollbar-track {
  background: transparent;
}

.mat-dialog__content::-webkit-scrollbar-thumb {
  background: var(--mat-sys-color-outline);
  border-radius: var(--mat-sys-shape-corner-full);
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
