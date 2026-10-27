<script setup>
import {
  computed,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useSlots,
  watch,
} from 'vue';
import MAT_UI_KEY, { DEFAULT_MAT_UI_OPTIONS } from '../../mat-ui-context';
import MatActionBase from '../MatActionBase.vue';
import createCloseMotion from '../close-motion';
import createMotionController from '../motion-controller';
import { MAT_APP_ROOT_KEY } from '../mat-app-root/mat-app-root-context';
import { MAT_LAYOUT_KEY } from '../mat-layout/layout-context';
import { isComponentColor } from '../button-props';
import useComponentColor from '../use-component-color';
import MatIcon from '../mat-icon/MatIcon.vue';
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatNotification',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 受控展示状态，可使用 v-model。
   *
   * @type {boolean}
   * @default false
   */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /**
   * 通知标题。
   *
   * @type {string | undefined}
   * @default undefined
   */
  title: {
    type: String,
    default: undefined,
  },
  /**
   * 通知正文；默认 Slot 存在时由 Slot 提供正文。
   *
   * @type {string | undefined}
   * @default undefined
   */
  text: {
    type: String,
    default: undefined,
  },
  /**
   * 前置 Material Symbols 图标；`icon` Slot 存在时由 Slot 替代。
   *
   * @type {string | undefined}
   * @default undefined
   */
  icon: {
    type: String,
    default: undefined,
  },
  /**
   * 标题行末尾的时间文本。
   *
   * @type {string | undefined}
   * @default undefined
   */
  time: {
    type: String,
    default: undefined,
  },
  /**
   * 操作列表，最多展示前三个；每项必须包含非空 `text`，可选 `icon`。
   *
   * @type {Array<{ text: string, icon?: string }>}
   * @default []
   */
  actions: {
    type: Array,
    default: () => [],
    validator(value) {
      return Array.isArray(value) && value.every((action) => (
        action
        && typeof action === 'object'
        && typeof action.text === 'string'
        && action.text.trim().length > 0
        && (
          action.icon === undefined
          || (typeof action.icon === 'string' && action.icon.length > 0)
        )
      ));
    },
  },
  /**
   * 是否显示内置关闭按钮。
   *
   * @type {boolean}
   * @default true
   */
  closable: {
    type: Boolean,
    default: true,
  },
  /**
   * 内置关闭按钮的非空可访问名称。
   *
   * @type {string}
   * @default '关闭'
   */
  closeLabel: {
    type: String,
    default: '关闭',
    validator(value) {
      return typeof value === 'string' && value.trim().length > 0;
    },
  },
  /**
   * 是否接入最近的 MatLayout 或 MatAppRoot 自动定位；为 false 时始终按文档流自然排列。
   *
   * @type {boolean}
   * @default true
   */
  app: {
    type: Boolean,
    default: true,
  },
  /**
   * 通知方位；可选值为 `top-start`、`top-center`、`top-end`、`bottom-start`、
   * `bottom-center`、`bottom-end`。独立使用时忽略。
   *
   * @type {'top-start' | 'top-center' | 'top-end' | 'bottom-start' | 'bottom-center' | 'bottom-end'}
   * @default 'top-end'
   */
  position: {
    type: String,
    default: 'top-end',
    validator(value) {
      return [
        'top-start',
        'top-center',
        'top-end',
        'bottom-start',
        'bottom-center',
        'bottom-end',
      ].includes(value);
    },
  },
  /**
   * 语义色或六位十六进制种子色 `#RRGGBB`；设置后替换默认表面色。
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
const propsWithDefaults = useMatProps('notification', props);
const emit = defineEmits({
  /**
   * 用户触发操作时派发 `{ action, index }`。
   */
  action: () => true,
  /**
   * 通知请求关闭时发出 false。
   */
  'update:modelValue': (value) => typeof value === 'boolean',
  /**
   * 退出动画和清理完成后触发。
   */
  closed: () => true,
});

const slots = useSlots();
const matUi = inject(MAT_UI_KEY, DEFAULT_MAT_UI_OPTIONS);
const layoutContext = inject(MAT_LAYOUT_KEY, null);
const appContext = inject(MAT_APP_ROOT_KEY, null);
const positioningContext = computed(() => {
  if (!propsWithDefaults.app) {
    return null;
  }

  return layoutContext ?? appContext;
});
const { colorStyle, hasExplicitColor } = useComponentColor(computed(() => propsWithDefaults.color));
const rendered = ref(false);
const phase = ref('closed');
const suppressed = ref(false);
const notificationElement = ref(null);
const teleportTarget = computed(() => {
  if (!positioningContext.value) {
    return null;
  }

  if (layoutContext) {
    return layoutContext.rootElement.value;
  }

  if (appContext) {
    return appContext.freeLayer.value;
  }

  return null;
});
const resolvedTeleportTarget = computed(() => teleportTarget.value ?? 'body');
const anchorPadding = computed(() => {
  if (layoutContext) {
    const padding = layoutContext.publicContext.padding;

    return {
      top: padding.top,
      bottom: padding.bottom,
      start: padding.start,
      end: padding.end,
    };
  }

  if (appContext) {
    const padding = appContext.publicContext.layout.padding;

    return {
      top: padding.top,
      bottom: padding.bottom,
      start: padding.start,
      end: padding.end,
    };
  }

  return {
    top: 0, bottom: 0, start: 0, end: 0,
  };
});
const placementStyle = computed(() => ({
  '--mat-notification-anchor-top': `${anchorPadding.value.top}px`,
  '--mat-notification-anchor-bottom': `${anchorPadding.value.bottom}px`,
  '--mat-notification-anchor-start': `${anchorPadding.value.start}px`,
  '--mat-notification-anchor-end': `${anchorPadding.value.end}px`,
}));
const rootStyle = computed(() => [placementStyle.value, colorStyle.value]);
const hasTitle = computed(() => (
  typeof propsWithDefaults.title === 'string'
  && propsWithDefaults.title.trim().length > 0
));
const hasText = computed(() => (
  typeof propsWithDefaults.text === 'string'
  && propsWithDefaults.text.trim().length > 0
));
const hasTime = computed(() => (
  typeof propsWithDefaults.time === 'string'
  && propsWithDefaults.time.trim().length > 0
));
const hasIcon = computed(() => (
  Boolean(slots.icon)
  || (typeof propsWithDefaults.icon === 'string' && propsWithDefaults.icon.trim().length > 0)
));
const normalizedActions = computed(() => {
  if (!Array.isArray(propsWithDefaults.actions)) {
    return [];
  }

  return propsWithDefaults.actions
    .filter((action) => (
      action
      && typeof action === 'object'
      && typeof action.text === 'string'
      && action.text.trim().length > 0
    ))
    .slice(0, 3);
});
const hasActions = computed(() => Boolean(slots.actions) || normalizedActions.value.length > 0);
const hasClose = computed(() => Boolean(slots.close) || propsWithDefaults.closable);
const hasContent = computed(() => (
  hasTitle.value || hasText.value || Boolean(slots.default)
));
const resolvedCloseLabel = computed(() => (
  typeof propsWithDefaults.closeLabel === 'string'
  && propsWithDefaults.closeLabel.trim().length > 0
    ? propsWithDefaults.closeLabel
    : '关闭'
));
const phaseMotion = createMotionController();
const closeMotion = createCloseMotion({ motion: phaseMotion });
let mounted = false;
let warnedForMissingContent = false;

function warnForMissingContent() {
  if (warnedForMissingContent) {
    return;
  }

  warnedForMissingContent = true;
  console.warn('MatNotification: 必须通过 title、text 或默认 Slot 提供内容');
}

function requestModelClose() {
  if (suppressed.value) {
    return;
  }

  suppressed.value = true;
  emit('update:modelValue', false);
}

function finishClose() {
  if (!rendered.value) {
    return;
  }

  rendered.value = false;
  phase.value = 'closed';
  emit('closed');
}

function dismissNotification() {
  if (!rendered.value || phase.value === 'closing') {
    return;
  }

  closeMotion.start({
    canStart: () => rendered.value && phase.value !== 'closing',
    duration: 200,
    getElement: () => notificationElement.value,
    isActive: () => mounted && rendered.value
      && phase.value === 'closing'
      && Boolean(notificationElement.value),
    onFinish: finishClose,
    onStart: () => {
      phase.value = 'closing';
    },
  });
}

function requestClose() {
  requestModelClose();
  dismissNotification();
}

function requestAction(action, index) {
  if (!rendered.value || phase.value === 'closing') {
    return;
  }

  requestClose();
  emit('action', { action, index });
}

function startEnterMotion() {
  phaseMotion.wait(notificationElement.value, 400, () => {
    if (!rendered.value || phase.value === 'closing') {
      return;
    }

    phase.value = 'open';
  });
}

async function openNotification() {
  if (!mounted || !propsWithDefaults.modelValue || suppressed.value || !hasContent.value) {
    if (!hasContent.value) {
      warnForMissingContent();
      requestClose();
    }

    return;
  }

  if (rendered.value && phase.value !== 'closing') {
    return;
  }

  phaseMotion.cancel();
  rendered.value = true;
  phase.value = 'opening';
  await nextTick();

  if (!mounted || !rendered.value || phase.value === 'closing') {
    return;
  }

  if (positioningContext.value && !teleportTarget.value) {
    return;
  }

  startEnterMotion();
}

function requestOpen() {
  if (suppressed.value || !hasContent.value) {
    if (!hasContent.value) {
      warnForMissingContent();
      requestClose();
    }

    return;
  }

  openNotification();
}

watch(teleportTarget, (target) => {
  if (!mounted || !target || !rendered.value || phase.value !== 'opening') {
    return;
  }

  nextTick(() => {
    if (mounted && rendered.value && phase.value === 'opening') {
      startEnterMotion();
    }
  });
});
onMounted(() => {
  mounted = true;

  if (propsWithDefaults.modelValue) {
    requestOpen();
  }
});
onBeforeUnmount(() => {
  mounted = false;
  phaseMotion.cancel();
});
watch(() => propsWithDefaults.modelValue, (open) => {
  if (!mounted) {
    return;
  }

  if (open) {
    suppressed.value = false;
    requestOpen();
    return;
  }

  suppressed.value = false;
  dismissNotification();
});
watch(hasContent, (content) => {
  if (!mounted) {
    return;
  }

  if (!content) {
    requestClose();
    return;
  }

  warnedForMissingContent = false;

  if (propsWithDefaults.modelValue && !rendered.value && !suppressed.value) {
    requestOpen();
  }
});
</script>

<template>
  <Teleport
    v-if="!positioningContext || teleportTarget"
    :to="resolvedTeleportTarget"
    :disabled="!teleportTarget"
  >
    <section
      v-if="rendered"
      ref="notificationElement"
      v-bind="$attrs"
      class="mat-notification mat-sys-typescale-body-medium"
      :class="[
        `mat-notification--${propsWithDefaults.position}`,
        `mat-notification--${phase}`,
        {
          'mat-notification--positioned': positioningContext,
          'mat-notification--explicit-color': hasExplicitColor,
        },
      ]"
      :style="rootStyle"
      aria-atomic="true"
      aria-live="polite"
      role="status"
    >
      <div v-if="hasIcon" class="mat-notification__icon">
        <slot v-if="$slots.icon" name="icon" />

        <MatIcon
          v-else
          :icon="propsWithDefaults.icon"
          size="24px"
          aria-hidden="true"
        />
      </div>

      <div class="mat-notification__main">
        <div v-if="hasTitle || hasTime" class="mat-notification__header">
          <span
            v-if="hasTitle"
            class="mat-notification__title mat-sys-typescale-title-medium"
          >
            {{ propsWithDefaults.title }}
          </span>

          <span
            v-if="hasTime"
            class="mat-notification__time mat-sys-typescale-label-medium"
          >
            {{ propsWithDefaults.time }}
          </span>
        </div>

        <div v-if="hasText || $slots.default" class="mat-notification__text">
          <slot v-if="$slots.default" />

          <template v-else>
            {{ propsWithDefaults.text }}
          </template>
        </div>

        <div v-if="hasActions" class="mat-notification__actions">
          <slot
            v-if="$slots.actions"
            name="actions"
            :actions="normalizedActions"
            :action="requestAction"
            :close="requestClose"
          />

          <template v-else>
            <MatActionBase
              v-for="(action, index) in normalizedActions"
              :key="`${action.text}-${index}`"
              class="mat-notification__action mat-sys-typescale-label-large"
              :use-cursor="matUi.useCursor"
              @click="requestAction(action, index)"
            >
              <MatIcon
                v-if="action.icon"
                class="mat-notification__action-icon"
                :icon="action.icon"
                size="18px"
                aria-hidden="true"
              />

              <span class="mat-notification__action-label">{{ action.text }}</span>
            </MatActionBase>
          </template>
        </div>
      </div>

      <div v-if="hasClose" class="mat-notification__close">
        <slot v-if="$slots.close" name="close" :close="requestClose" />

        <MatActionBase
          v-else
          class="mat-notification__default-close"
          :aria-label="resolvedCloseLabel"
          :use-cursor="matUi.useCursor"
          @click="requestClose"
        >
          <MatIcon
            class="mat-notification__close-icon"
            icon="close"
            size="24px"
            :optical-size="24"
            aria-hidden="true"
          />
        </MatActionBase>
      </div>
    </section>
  </Teleport>
</template>

<style scoped>
@layer mde.components {
  .mat-notification {
    --mat-notification-container-padding: 16px;
    --mat-notification-content-gap: 12px;
    --mat-notification-header-content-gap: 8px;
    --mat-notification-body-gap: 4px;
    --mat-notification-action-inline-padding: 12px;
    --mat-notification-action-gap: 4px;
    --mat-notification-action-icon-gap: 8px;
    --mat-notification-enter-y: 0;
    --mat-notification-inline-start: calc(
      var(--mat-notification-anchor-start) + var(--mat-notification-viewport-margin)
    );
    --mat-notification-inline-end: calc(
      var(--mat-notification-anchor-end) + var(--mat-notification-viewport-margin)
    );
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    gap: var(--mat-notification-content-gap);
    inline-size: 100%;
    max-inline-size: var(--mat-notification-container-max-width);
    padding: var(--mat-notification-container-padding);
    color: var(--mat-notification-content-color);
    background: var(--mat-notification-container-color);
    border-radius: var(--mat-notification-container-shape);
    box-shadow: var(--mat-notification-container-elevation);
    pointer-events: auto;
  }

  .mat-notification--positioned {
    position: absolute;
    z-index: var(--mat-sys-z-index-notification);
    max-inline-size: min(
      var(--mat-notification-container-max-width),
      max(
        0px,
        calc(
          100%
          - var(--mat-notification-anchor-start)
          - var(--mat-notification-anchor-end)
          - (var(--mat-notification-viewport-margin) * 2)
        )
      )
    );
  }

  .mat-notification--positioned.mat-notification--top-start,
  .mat-notification--positioned.mat-notification--top-center,
  .mat-notification--positioned.mat-notification--top-end {
    --mat-notification-enter-y: -12px;
    inset-block-start: calc(
      var(--mat-notification-anchor-top) + var(--mat-notification-viewport-margin)
    );
  }

  .mat-notification--positioned.mat-notification--bottom-start,
  .mat-notification--positioned.mat-notification--bottom-center,
  .mat-notification--positioned.mat-notification--bottom-end {
    --mat-notification-enter-y: 12px;
    inset-block-end: calc(
      var(--mat-notification-anchor-bottom) + var(--mat-notification-viewport-margin)
    );
  }

  .mat-notification--positioned.mat-notification--top-start,
  .mat-notification--positioned.mat-notification--bottom-start {
    inset-inline-start: var(--mat-notification-inline-start);
  }

  .mat-notification--positioned.mat-notification--top-end,
  .mat-notification--positioned.mat-notification--bottom-end {
    inset-inline-end: var(--mat-notification-inline-end);
  }

  .mat-notification--positioned.mat-notification--top-center,
  .mat-notification--positioned.mat-notification--bottom-center {
    inset-inline: var(--mat-notification-inline-start) var(--mat-notification-inline-end);
    margin-inline: auto;
  }

  .mat-notification--explicit-color {
    --mat-notification-container-color: var(--mat-accent-container-color);
    --mat-notification-content-color: var(--mat-on-accent-container-color);
    --mat-notification-supporting-color: var(--mat-on-accent-container-color);
    --mat-notification-icon-color: var(--mat-on-accent-container-color);
    --mat-notification-action-color: var(--mat-on-accent-container-color);
  }

  .mat-notification__icon {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    color: var(--mat-notification-icon-color);
  }

  .mat-notification__main {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    gap: var(--mat-notification-body-gap);
    min-inline-size: 0;
  }

  .mat-notification__header {
    display: flex;
    align-items: baseline;
    gap: var(--mat-notification-header-content-gap);
    min-inline-size: 0;
  }

  .mat-notification__title {
    flex-shrink: 1;
    min-inline-size: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mat-notification__time {
    flex-shrink: 0;
    margin-inline-start: auto;
    color: var(--mat-notification-supporting-color);
    white-space: nowrap;
  }

  .mat-notification__text {
    min-inline-size: 0;
    color: var(--mat-notification-supporting-color);
    overflow-wrap: anywhere;
  }

  .mat-notification__actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--mat-notification-action-gap);
    margin-block-start: var(--mat-notification-body-gap);
    margin-inline-start: calc(-1 * var(--mat-notification-action-inline-padding));
    min-inline-size: 0;
  }

  .mat-notification__action {
    --mat-action-state-color: var(--mat-notification-action-color);
    display: inline-flex;
    flex: 0 1 auto;
    align-items: center;
    justify-content: center;
    gap: var(--mat-notification-action-icon-gap);
    box-sizing: border-box;
    max-inline-size: 100%;
    min-block-size: var(--mat-notification-action-target-size);
    min-inline-size: 0;
    padding-inline: var(--mat-notification-action-inline-padding);
    overflow: hidden;
    color: var(--mat-notification-action-color);
    background: transparent;
    border: 0;
    border-radius: var(--mat-sys-shape-corner-full);
  }

  .mat-notification__action-icon {
    flex: 0 0 auto;
  }

  .mat-notification__action-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mat-notification__close {
    display: flex;
    flex: 0 0 auto;
    align-self: flex-start;
    margin-block-start: -12px;
    margin-inline-end: -12px;
  }

  .mat-notification__default-close {
    --mat-action-state-color: var(--mat-notification-content-color);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    inline-size: var(--mat-notification-close-target-size);
    min-inline-size: var(--mat-notification-close-target-size);
    block-size: var(--mat-notification-close-target-size);
    min-block-size: var(--mat-notification-close-target-size);
    padding: 0;
    color: var(--mat-notification-content-color);
    background: transparent;
    border: 0;
    border-radius: var(--mat-sys-shape-corner-full);
  }

  .mat-notification--opening {
    animation: mat-notification-enter var(--mat-sys-motion-spring-fast-spatial) both;
  }

  .mat-notification--closing {
    pointer-events: none;
    animation: mat-notification-exit var(--mat-sys-motion-spring-fast-effects) both;
  }

  @keyframes mat-notification-enter {
    from {
      opacity: 0;
      transform: translateY(var(--mat-notification-enter-y));
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes mat-notification-exit {
    from {
      opacity: 1;
      transform: translateY(0);
    }

    to {
      opacity: 0;
      transform: translateY(var(--mat-notification-enter-y));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .mat-notification {
      animation: none;
    }
  }
}
</style>
