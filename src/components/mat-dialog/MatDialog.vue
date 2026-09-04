<script setup>
import {
  computed,
  getCurrentInstance,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  useAttrs,
  useId,
  useSlots,
  watch,
  watchEffect,
} from 'vue';
import MatSurfaceBase from '../MatSurfaceBase.vue';
import createCloseMotion from '../close-motion';
import createMotionController from '../motion-controller';
import { isComponentColor } from '../button-props';
import { dialogStack, registerDialog, unregisterDialog } from '../dialog-stack';
import {
  getAppRootContext,
  MAT_APP_ROOT_KEY,
} from '../mat-app-root/mat-app-root-context';
import useFocusTrap from '../use-focus-trap';
import MatBtn from '../mat-btn/MatBtn.vue';
import MatIcon from '../mat-icon/MatIcon.vue';
import MatSpacer from '../mat-spacer/MatSpacer.vue';
import MatScrollArea from '../mat-scroll-area/MatScrollArea.vue';
import useComponentColor from '../use-component-color';
import { isValidCssLength, toCssLength } from '../value-utils';
import { useMatProps } from '../use-mat-props';

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
const propsWithDefaults = useMatProps('dialog', props);
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
const instance = getCurrentInstance();
const appContext = inject(MAT_APP_ROOT_KEY, null);
const hasExplicitAttach = Object.prototype.hasOwnProperty.call(
  instance?.vnode.props ?? {},
  'attach',
);
const activatorHost = ref(null);
const surface = ref(null);
const rendered = ref(false);
const phase = ref('closed');
const teleportTarget = ref(null);
const scopedContext = shallowRef(null);
const titleId = `${useId().replace(/[^\w-]/g, '-')}-title`;
const root = computed(() => surface.value?.root ?? surface.value?.$el ?? null);
const isAppRootScoped = computed(() => Boolean(scopedContext.value));
const hasTitle = computed(() => propsWithDefaults.title !== undefined || Boolean(slots.title));
const hasContent = computed(() => (
  propsWithDefaults.content !== undefined || Boolean(slots.default)
));
const hasIcon = computed(() => !propsWithDefaults.fullScreen && (
  propsWithDefaults.icon !== undefined || Boolean(slots.icon)
));
const hasActivatorSlot = computed(() => Boolean(slots.activator));
const isTop = computed(() => dialogStack.value.at(-1) === root.value);
const { colorStyle } = useComponentColor(computed(() => propsWithDefaults.color));
const dialogWidthStyle = computed(() => {
  if (propsWithDefaults.fullScreen || propsWithDefaults.width === undefined) {
    return undefined;
  }

  const width = toCssLength(propsWithDefaults.width, {
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
const rootStyle = computed(() => [attrs.style]);
const panelStyle = computed(() => [colorStyle.value, dialogWidthStyle.value]);
let mounted = false;
const phaseMotion = createMotionController();
const closeMotion = createCloseMotion({ motion: phaseMotion });
let previousFocus = null;

useFocusTrap(root, computed(() => rendered.value && isTop.value));

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
  phaseMotion.cancel();
}

/**
 * @param {number} duration
 * @param {() => void} callback
 */
function waitForPhase(duration, callback) {
  phaseMotion.wait(root.value, duration, callback);
}

/**
 * @returns {HTMLElement | null}
 */
function resolveAttach() {
  if (typeof propsWithDefaults.attach === 'string') {
    try {
      return document.querySelector(propsWithDefaults.attach);
    } catch {
      return null;
    }
  }

  if (propsWithDefaults.attach instanceof HTMLElement
    && propsWithDefaults.attach.ownerDocument === document) {
    return propsWithDefaults.attach;
  }

  return null;
}

/**
 * @param {HTMLElement | null} attachTarget
 * @returns {{context: object, target: HTMLElement | null} | null}
 */
function resolveScopedEntry(attachTarget) {
  if (appContext && !hasExplicitAttach) {
    return {
      context: appContext,
      target: appContext.modalLayer.value,
    };
  }

  if (hasExplicitAttach) {
    const entry = attachTarget ? getAppRootContext(attachTarget) : null;

    if (entry) {
      return {
        context: entry,
        target: entry.modalLayer.value,
      };
    }
  }

  return null;
}

/**
 * @param {object} context
 * @returns {{inertElement: HTMLElement | null, scrollElement: HTMLElement | null}}
 */
function buildScopeOptions(context) {
  return {
    inertElement: context.contentElement.value,
    scrollElement: context.documentMode.value
      ? null
      : context.contentElement.value,
  };
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

  const attachTarget = resolveAttach();
  const scoped = resolveScopedEntry(attachTarget);
  const target = scoped ? scoped.target : attachTarget;

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
  scopedContext.value = scoped;
  teleportTarget.value = target;
  rendered.value = true;
  phase.value = 'opening';
  warnForAccessibleName();
  await nextTick();

  if (!propsWithDefaults.modelValue || !root.value) {
    return;
  }

  if (!root.value.open) {
    root.value.show();
  }

  registerDialog(root.value, scoped ? buildScopeOptions(scoped.context) : undefined);
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

  scopedContext.value = null;
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
  if (!rendered.value || phase.value === 'closing') {
    return;
  }

  closeMotion.start({
    canStart: () => rendered.value && phase.value !== 'closing',
    duration: 200,
    getElement: () => root.value,
    isActive: () => mounted && !propsWithDefaults.modelValue
      && phase.value === 'closing'
      && rendered.value
      && Boolean(root.value),
    onFinish: finishClose,
    onStart: () => {
      phase.value = 'closing';
    },
  });
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
  if (!propsWithDefaults.closeOnBack || event.target !== root.value) {
    return;
  }

  requestClose();
}

onMounted(() => {
  mounted = true;

  if (propsWithDefaults.modelValue) {
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
watch(() => propsWithDefaults.modelValue, (open) => {
  if (!mounted) {
    return;
  }

  if (open) {
    openDialog();
  } else {
    closeDialog();
  }
});
watch(() => propsWithDefaults.attach, () => {
  if (propsWithDefaults.modelValue && rendered.value) {
    console.warn('MatDialog: 打开期间修改 attach 将在下次打开时生效');
  }
});
watchEffect(() => {
  if (propsWithDefaults.closeLabel.trim().length === 0) {
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
          'mat-dialog--app-root': isAppRootScoped,
          'mat-dialog--full-screen': propsWithDefaults.fullScreen,
          'mat-dialog--with-icon': hasIcon,
          'mat-dialog--top': isTop,
          'mat-dialog--transparent-scrim': !propsWithDefaults.scrim,
        },
      ]"
      :style="rootStyle"
      :aria-labelledby="$attrs['aria-labelledby'] ?? (hasTitle ? titleId : undefined)"
      aria-modal="true"
      tabindex="-1"
      @cancel="handleCancel"
      @click="handleDialogClick"
      @keydown="handleKeyDown"
    >
      <div class="mat-dialog__panel" :style="panelStyle">
        <template v-if="propsWithDefaults.fullScreen">
          <header class="mat-dialog__header">
            <MatBtn
              class="mat-dialog__close"
              icon="close"
              :label="propsWithDefaults.closeLabel"
              size="small"
              variant="standard"
              @click="requestClose"
            />

            <h2
              v-if="hasTitle"
              :id="titleId"
              class="mat-dialog__title mat-sys-typescale-title-large"
            >
              <template v-if="propsWithDefaults.title !== undefined">
                {{ propsWithDefaults.title }}
              </template>
              <slot v-else name="title" />
            </h2>

            <MatSpacer />

            <div v-if="$slots.actions" class="mat-dialog__actions">
              <slot name="actions" />
            </div>
          </header>

          <MatScrollArea
            v-if="hasContent"
            class="mat-dialog__content mat-sys-typescale-body-medium"
            orientation="vertical"
            no-scroll-padding
            bar-width="thin"
          >
            <div class="mat-dialog__content-body">
              <template v-if="propsWithDefaults.content !== undefined">
                {{ propsWithDefaults.content }}
              </template>
              <slot v-else />
            </div>
          </MatScrollArea>
        </template>

        <template v-else>
          <div
            v-if="hasIcon"
            class="mat-dialog__icon"
          >
            <MatIcon
              :optical-size="24"
              size="24px"
              aria-hidden="true"
            >
              <template v-if="propsWithDefaults.icon !== undefined">
                {{ propsWithDefaults.icon }}
              </template>
              <slot v-else name="icon" />
            </MatIcon>
          </div>

          <h2
            v-if="hasTitle"
            :id="titleId"
            class="mat-dialog__title mat-sys-typescale-headline-small"
          >
            <template v-if="propsWithDefaults.title !== undefined">
              {{ propsWithDefaults.title }}
            </template>
            <slot v-else name="title" />
          </h2>

          <MatScrollArea
            v-if="hasContent"
            class="mat-dialog__content mat-sys-typescale-body-medium"
            orientation="vertical"
            no-scroll-padding
            bar-width="thin"
          >
            <div class="mat-dialog__content-body">
              <template v-if="propsWithDefaults.content !== undefined">
                {{ propsWithDefaults.content }}
              </template>
              <slot v-else />
            </div>
          </MatScrollArea>

          <div v-if="$slots.actions" class="mat-dialog__actions">
            <slot name="actions" />
          </div>
        </template>
      </div>
    </MatSurfaceBase>
  </Teleport>
</template>

<style scoped>
@layer mde.components {
  .mat-dialog__activator {
    display: contents;
  }

  .mat-dialog {
    position: fixed;
    z-index: var(--mat-sys-z-index-dialog);
    inset: 0;
    box-sizing: border-box;
    inline-size: 100%;
    block-size: 100%;
    padding: 0;
    margin: 0;
    overflow: visible;
    background: transparent;
    border: 0;
    pointer-events: auto;
  }

  .mat-dialog[open] {
    display: flex;
  }

  .mat-dialog--app-root {
    position: absolute;
  }

  .mat-dialog--top:not(.mat-dialog--transparent-scrim):not(.mat-dialog--closing) {
    background: color-mix(in srgb, var(--mat-sys-color-scrim) 32%, transparent);
  }

  .mat-dialog--opening {
    animation: mat-dialog-scrim-enter var(--mat-sys-motion-spring-default-effects) both;
  }

  .mat-dialog--closing {
    animation: mat-dialog-scrim-exit var(--mat-sys-motion-spring-fast-effects) both;
  }

  .mat-dialog__panel {
    --mat-dialog-container-color: var(--mat-sys-color-surface-container-high);
    --mat-dialog-headline-color: var(--mat-sys-color-on-surface);
    --mat-dialog-content-color: var(--mat-sys-color-on-surface-variant);
    --mat-dialog-icon-color: var(--mat-accent-color, var(--mat-sys-color-secondary));
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    min-inline-size: min(280px, calc(100% - 48px));
    max-inline-size: min(560px, calc(100% - 48px));
    max-block-size: calc(100% - 48px);
    padding: 0;
    margin: auto;
    overflow: visible;
    color: var(--mat-dialog-content-color);
    background: var(--mat-dialog-container-color);
    border: 0;
    border-radius: var(--mat-sys-shape-corner-extra-large);
    box-shadow: var(--mat-sys-elevation-level3);
  }

  .mat-dialog--opening .mat-dialog__panel {
    animation: mat-dialog-enter var(--mat-sys-motion-spring-default-spatial) both;
  }

  .mat-dialog--closing .mat-dialog__panel {
    animation: mat-dialog-exit var(--mat-sys-motion-spring-fast-effects) both;
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

  .mat-dialog--with-icon .mat-dialog__panel > .mat-dialog__title {
    text-align: center;
  }

  .mat-dialog:not(.mat-dialog--full-screen) .mat-dialog__panel > .mat-dialog__icon:last-child {
    padding-block-end: 24px;
    margin-block-end: 0;
  }

  .mat-dialog:not(.mat-dialog--full-screen) .mat-dialog__panel > .mat-dialog__title:first-child {
    padding-block-start: 24px;
  }

  .mat-dialog:not(.mat-dialog--full-screen) .mat-dialog__panel > .mat-dialog__title:last-child {
    padding-block-end: 24px;
  }

  .mat-dialog__content {
    display: flex;
    flex-direction: column;
    flex: 0 1 auto;
    min-block-size: 0;
    box-sizing: border-box;
    inline-size: 100%;
    overscroll-behavior: contain;
  }

  .mat-dialog__content-body {
    box-sizing: border-box;
    min-inline-size: 0;
    inline-size: 100%;
    padding-inline: 24px calc(24px - var(--mat-scroll-area-scrollbar-width, 0px));
    overflow-wrap: anywhere;
  }

  .mat-dialog__title + .mat-dialog__content .mat-dialog__content-body {
    padding-block-start: 16px;
  }

  .mat-dialog:not(.mat-dialog--full-screen) .mat-dialog__panel > .mat-dialog__content:first-child .mat-dialog__content-body {
    padding-block-start: 24px;
  }

  .mat-dialog:not(.mat-dialog--full-screen) .mat-dialog__panel > .mat-dialog__content:last-child .mat-dialog__content-body {
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

  .mat-dialog--full-screen .mat-dialog__panel {
    min-inline-size: 100%;
    inline-size: 100%;
    max-inline-size: 100%;
    min-block-size: 100%;
    block-size: 100%;
    max-block-size: 100%;
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
    flex: 0 0 auto;
    inline-size: auto;
    padding: 0;
    overflow-wrap: anywhere;
  }

  .mat-dialog__header .mat-dialog__actions {
    flex: 0 0 auto;
    flex-wrap: nowrap;
    min-inline-size: 0;
    padding: 0;
    margin: 0;
  }

  .mat-dialog--full-screen .mat-dialog__panel > .mat-dialog__content {
    flex: 1 1 auto;
  }

  .mat-dialog--full-screen .mat-dialog__content-body {
    padding-block: 24px;
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
    .mat-dialog__panel {
      animation: none;
    }
  }
}
</style>
