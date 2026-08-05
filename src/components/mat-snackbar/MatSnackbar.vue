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
import { MAT_APP_ROOT_KEY } from '../mat-app-root/mat-app-root-context';
import MAT_SNACKBAR_EXTERNALLY_MANAGED_KEY from '../snackbar-context';
import {
  cancelSnackbar,
  completeSnackbar,
  enqueueSnackbar,
} from '../snackbar-queue';
import {
  getBottomToolbarClearance,
  subscribeToolbarOverlay,
} from '../toolbar-overlay';
import MatIcon from '../mat-icon/MatIcon.vue';

defineOptions({
  name: 'MatSnackbar',
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
   * 简短纯文本内容；默认 Slot 存在时由 Slot 优先提供。
   *
   * @type {string | undefined}
   * @default undefined
   */
  text: {
    type: String,
    default: undefined,
  },
  /**
   * 文字 action 内容，必须为非空字符串。
   *
   * @type {string | undefined}
   * @default undefined
   */
  actionText: {
    type: String,
    default: undefined,
    validator(value) {
      return typeof value === 'string' && value.trim().length > 0;
    },
  },
  /**
   * 是否显示内置关闭按钮。
   *
   * @type {boolean}
   * @default false
   */
  closable: {
    type: Boolean,
    default: false,
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
   * Snackbar 水平位置；可选值为 `left`、`center`、`right`。
   *
   * @type {'left' | 'center' | 'right'}
   * @default 'center'
   */
  position: {
    type: String,
    default: 'center',
    validator(value) {
      return ['left', 'center', 'right'].includes(value);
    },
  },
  /**
   * 自动关闭时长，单位为毫秒；0 表示常驻。
   *
   * @type {number}
   * @default 4000
   */
  duration: {
    type: Number,
    default: 4000,
    validator(value) {
      return Number.isFinite(value) && value >= 0;
    },
  },
});
const emit = defineEmits({
  /**
   * action 控件被激活时触发。
   */
  action: () => true,
  /**
   * Snackbar 请求关闭时发出 false。
   */
  'update:modelValue': (value) => typeof value === 'boolean',
  /**
   * 退出动画和清理完成后触发。
   */
  closed: () => true,
});
const slots = useSlots();
const matUi = inject(MAT_UI_KEY, DEFAULT_MAT_UI_OPTIONS);
const appContext = inject(MAT_APP_ROOT_KEY, null);
const externallyManaged = inject(MAT_SNACKBAR_EXTERNALLY_MANAGED_KEY, false);
const rendered = ref(false);
const phase = ref('closed');
const suppressed = ref(false);
const hasContent = computed(() => Boolean(slots.default) || (
  typeof props.text === 'string' && props.text.trim().length > 0
));
const hasAction = computed(() => Boolean(slots.action) || (
  typeof props.actionText === 'string' && props.actionText.trim().length > 0
));
const hasClose = computed(() => Boolean(slots.close) || props.closable);
const hasTrailing = computed(() => hasAction.value || hasClose.value);
const toolbarBottomClearance = ref(0);
const teleportTarget = computed(() => (
  appContext ? appContext.snackbarLayer.value : document.body
));
const resolvedCloseLabel = computed(() => (
  typeof props.closeLabel === 'string' && props.closeLabel.trim().length > 0
    ? props.closeLabel
    : '关闭'
));
let mounted = false;
let durationTimer;
let phaseTimer;
let warnedForMissingContent = false;
let removeToolbarListener = null;

const rootStyle = computed(() => ({
  '--mat-snackbar-toolbar-clearance': `${toolbarBottomClearance.value}px`,
}));

function syncToolbarClearance() {
  toolbarBottomClearance.value = getBottomToolbarClearance();
}

const queueEntry = {
  activate: openSnackbar,
};

function clearDurationTimer() {
  if (durationTimer !== undefined) {
    window.clearTimeout(durationTimer);
    durationTimer = undefined;
  }
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

function getDuration() {
  return Number.isFinite(props.duration) && props.duration >= 0 ? props.duration : 4000;
}

function startDurationTimer() {
  clearDurationTimer();
  const duration = getDuration();

  if (duration === 0) {
    return;
  }

  durationTimer = window.setTimeout(() => {
    durationTimer = undefined;
    requestClose();
  }, duration);
}

function warnForMissingContent() {
  if (warnedForMissingContent) {
    return;
  }

  warnedForMissingContent = true;
  console.warn('MatSnackbar: 必须通过 text 或默认 Slot 提供内容');
}

function finishClose() {
  if (!rendered.value) {
    return;
  }

  rendered.value = false;
  phase.value = 'closed';
  emit('closed');

  if (!externallyManaged) {
    completeSnackbar(queueEntry);
  }
}

function dismissSnackbar() {
  clearDurationTimer();

  if (!rendered.value) {
    if (!externallyManaged) {
      cancelSnackbar(queueEntry);
    }

    return;
  }

  if (phase.value === 'closing') {
    return;
  }

  phase.value = 'closing';
  waitForPhase(200, finishClose);
}

function requestModelClose() {
  if (suppressed.value) {
    return;
  }

  suppressed.value = true;
  emit('update:modelValue', false);
}

function requestClose() {
  requestModelClose();
  dismissSnackbar();
}

function requestAction() {
  if (!rendered.value || phase.value === 'closing') {
    return;
  }

  requestClose();
  emit('action');
}

async function openSnackbar() {
  if (!mounted || !props.modelValue || suppressed.value || !hasContent.value) {
    if (!hasContent.value) {
      warnForMissingContent();
      requestModelClose();
    }

    if (!externallyManaged) {
      completeSnackbar(queueEntry);
    }

    return;
  }

  clearDurationTimer();
  clearPhaseTimer();
  rendered.value = true;
  phase.value = 'opening';
  await nextTick();

  if (!mounted || !rendered.value || phase.value === 'closing') {
    return;
  }

  waitForPhase(400, () => {
    if (!rendered.value || phase.value === 'closing') {
      return;
    }

    phase.value = 'open';
    startDurationTimer();
  });
}

function requestOpen() {
  if (suppressed.value || !hasContent.value) {
    if (!hasContent.value) {
      warnForMissingContent();
      requestClose();
    }

    return;
  }

  if (externallyManaged) {
    openSnackbar();
    return;
  }

  if (rendered.value && phase.value === 'closing') {
    openSnackbar();
    return;
  }

  enqueueSnackbar(queueEntry);
}

onMounted(() => {
  mounted = true;

  if (!appContext) {
    removeToolbarListener = subscribeToolbarOverlay(syncToolbarClearance);
    syncToolbarClearance();
  }

  if (props.modelValue) {
    requestOpen();
  }
});
onBeforeUnmount(() => {
  mounted = false;
  removeToolbarListener?.();
  removeToolbarListener = null;
  clearDurationTimer();
  clearPhaseTimer();

  if (!externallyManaged) {
    if (rendered.value) {
      completeSnackbar(queueEntry);
    } else {
      cancelSnackbar(queueEntry);
    }
  }
});
watch(() => props.modelValue, (open) => {
  if (!mounted) {
    return;
  }

  if (open) {
    suppressed.value = false;
    requestOpen();
    return;
  }

  suppressed.value = false;
  dismissSnackbar();
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

  if (props.modelValue && !rendered.value && !suppressed.value) {
    requestOpen();
  }
});
watch(() => props.duration, () => {
  if (phase.value === 'open') {
    startDurationTimer();
  }
});
</script>

<template>
  <Teleport v-if="teleportTarget" :to="teleportTarget">
    <section
      v-if="rendered"
      v-bind="$attrs"
      class="mat-snackbar"
      :class="[
        `mat-snackbar--${phase}`,
        `mat-snackbar--${position}`,
        {
          'mat-snackbar--app-root': appContext,
          'mat-snackbar--with-trailing': hasTrailing,
        },
      ]"
      :style="rootStyle"
      aria-atomic="true"
      aria-live="polite"
      role="status"
    >
      <div class="mat-snackbar__text">
        <slot v-if="$slots.default" />
        <template v-else>
          {{ text }}
        </template>
      </div>

      <div v-if="hasTrailing" class="mat-snackbar__controls">
        <div v-if="hasAction" class="mat-snackbar__action">
          <slot v-if="$slots.action" name="action" :action="requestAction" />

          <MatActionBase
            v-else
            class="mat-snackbar__default-action"
            :use-cursor="matUi.useCursor"
            @click="requestAction"
          >
            {{ actionText }}
          </MatActionBase>
        </div>

        <div v-if="hasClose" class="mat-snackbar__close">
          <slot v-if="$slots.close" name="close" :close="requestClose" />

          <MatActionBase
            v-else
            class="mat-snackbar__default-close"
            :aria-label="resolvedCloseLabel"
            :use-cursor="matUi.useCursor"
            @click="requestClose"
          >
            <MatIcon
              class="mat-snackbar__close-icon"
              icon="close"
              size="24px"
              :optical-size="24"
              aria-hidden="true"
            />
          </MatActionBase>
        </div>
      </div>
    </section>
  </Teleport>
</template>

<style scoped>
.mat-snackbar {
  --mat-snackbar-leading-space: 16px;
  --mat-snackbar-content-action-space: 24px;
  --mat-snackbar-action-trailing-space: 8px;
  --mat-snackbar-action-target-size: 48px;
  --mat-snackbar-close-target-size: 48px;
  --mat-snackbar-close-icon-size: 24px;
  position: fixed;
  z-index: var(--mat-sys-z-index-snackbar);
  inset-block-end: calc(
    var(--mat-snackbar-viewport-margin)
    + max(env(safe-area-inset-bottom), var(--mat-snackbar-toolbar-clearance))
  );
  box-sizing: border-box;
  display: flex;
  align-items: center;
  inline-size: min(560px, calc(100dvi - (var(--mat-snackbar-viewport-margin) * 2)));
  min-block-size: var(--mat-snackbar-container-height);
  padding-block: 12px;
  padding-inline: var(--mat-snackbar-leading-space);
  color: var(--mat-snackbar-content-color);
  background: var(--mat-snackbar-container-color);
  border-radius: var(--mat-snackbar-container-shape);
  box-shadow: var(--mat-snackbar-container-elevation);
  font-family: var(--mat-sys-typescale-body-medium-font);
  font-size: var(--mat-sys-typescale-body-medium-size);
  font-weight: var(--mat-sys-typescale-body-medium-weight);
  letter-spacing: var(--mat-sys-typescale-body-medium-tracking);
  line-height: var(--mat-sys-typescale-body-medium-line-height);
}

.mat-snackbar--left {
  inset-inline-start: var(--mat-snackbar-viewport-margin);
}

.mat-snackbar--center {
  inset-inline-start: 50%;
  translate: -50% 0;
}

.mat-snackbar--right {
  inset-inline-end: var(--mat-snackbar-viewport-margin);
}

.mat-snackbar--app-root {
  position: relative;
  inset: auto;
  inline-size: min(560px, 100%);
  max-inline-size: 100%;
  pointer-events: auto;
  translate: 0;
}

.mat-snackbar--app-root.mat-snackbar--left {
  align-self: flex-start;
}

.mat-snackbar--app-root.mat-snackbar--center {
  align-self: center;
}

.mat-snackbar--app-root.mat-snackbar--right {
  align-self: flex-end;
}

.mat-snackbar--opening {
  animation: mat-snackbar-enter var(--mat-sys-motion-duration-medium4) var(--mat-sys-motion-easing-emphasized-decelerate) both;
}

.mat-snackbar--closing {
  pointer-events: none;
  animation: mat-snackbar-exit var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized-accelerate) both;
}

.mat-snackbar--with-trailing {
  padding-inline-end: var(--mat-snackbar-action-trailing-space);
}

.mat-snackbar__text {
  flex: 1 1 auto;
  min-inline-size: 0;
  overflow-wrap: anywhere;
}

.mat-snackbar__controls {
  display: flex;
  flex: 0 0 auto;
  align-self: flex-end;
  align-items: center;
  min-block-size: var(--mat-snackbar-action-target-size);
  margin-block: -12px;
  margin-inline-start: var(--mat-snackbar-content-action-space);
}

.mat-snackbar__action,
.mat-snackbar__close {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  min-block-size: var(--mat-snackbar-action-target-size);
}

.mat-snackbar__default-action {
  --mat-action-state-color: var(--mat-snackbar-action-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-inline-size: var(--mat-snackbar-action-target-size);
  max-inline-size: 100%;
  min-block-size: var(--mat-snackbar-action-target-size);
  padding-inline: 12px;
  overflow: hidden;
  color: var(--mat-snackbar-action-color);
  font-family: var(--mat-sys-typescale-label-large-font);
  font-size: var(--mat-sys-typescale-label-large-size);
  font-weight: var(--mat-sys-typescale-label-large-weight);
  letter-spacing: var(--mat-sys-typescale-label-large-tracking);
  line-height: var(--mat-sys-typescale-label-large-line-height);
  text-overflow: ellipsis;
  white-space: nowrap;
  background: transparent;
  border: 0;
  border-radius: var(--mat-sys-shape-corner-full);
}

.mat-snackbar__default-close {
  --mat-action-state-color: var(--mat-snackbar-content-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  inline-size: var(--mat-snackbar-close-target-size);
  min-inline-size: var(--mat-snackbar-close-target-size);
  block-size: var(--mat-snackbar-close-target-size);
  min-block-size: var(--mat-snackbar-close-target-size);
  padding: 0;
  color: var(--mat-snackbar-content-color);
  background: transparent;
  border: 0;
  border-radius: var(--mat-sys-shape-corner-full);
}

.mat-snackbar__close-icon {
  inline-size: var(--mat-snackbar-close-icon-size);
  block-size: var(--mat-snackbar-close-icon-size);
}

@keyframes mat-snackbar-enter {
  from {
    opacity: 0;
    transform: translateY(16px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes mat-snackbar-exit {
  from {
    opacity: 1;
    transform: translateY(0);
  }

  to {
    opacity: 0;
    transform: translateY(16px);
  }
}

@media (width <= 599px) {
  .mat-snackbar {
    inset-inline: var(--mat-snackbar-viewport-margin);
    inline-size: auto;
  }

  .mat-snackbar--center {
    translate: 0;
  }

  .mat-snackbar--app-root {
    inset-inline: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mat-snackbar {
    animation-duration: .01ms;
  }
}
</style>
