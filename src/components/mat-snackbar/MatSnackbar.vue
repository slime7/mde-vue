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
import MAT_SNACKBAR_EXTERNALLY_MANAGED_KEY from '../snackbar-context';
import {
  cancelSnackbar,
  completeSnackbar,
  enqueueSnackbar,
} from '../snackbar-queue';
import MatIcon from '../mat-icon/MatIcon.vue';

defineOptions({
  name: 'MatSnackbar',
  inheritAttrs: false,
});

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: undefined,
  },
  closable: {
    type: Boolean,
    default: false,
  },
  closeLabel: {
    type: String,
    default: '关闭',
    validator(value) {
      return typeof value === 'string' && value.trim().length > 0;
    },
  },
  position: {
    type: String,
    default: 'center',
    validator(value) {
      return ['left', 'center', 'right'].includes(value);
    },
  },
  duration: {
    type: Number,
    default: 4000,
    validator(value) {
      return Number.isFinite(value) && value >= 0;
    },
  },
});
const emit = defineEmits({
  'update:modelValue': (value) => typeof value === 'boolean',
  closed: () => true,
});
const slots = useSlots();
const matUi = inject(MAT_UI_KEY, DEFAULT_MAT_UI_OPTIONS);
const externallyManaged = inject(MAT_SNACKBAR_EXTERNALLY_MANAGED_KEY, false);
const rendered = ref(false);
const phase = ref('closed');
const suppressed = ref(false);
const hasContent = computed(() => Boolean(slots.default) || (
  typeof props.text === 'string' && props.text.trim().length > 0
));
const hasClose = computed(() => Boolean(slots.close) || props.closable);
const resolvedCloseLabel = computed(() => (
  typeof props.closeLabel === 'string' && props.closeLabel.trim().length > 0
    ? props.closeLabel
    : '关闭'
));
let mounted = false;
let durationTimer;
let phaseTimer;
let warnedForMissingContent = false;

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

  if (props.modelValue) {
    requestOpen();
  }
});
onBeforeUnmount(() => {
  mounted = false;
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
  <Teleport to="body">
    <section
      v-if="rendered"
      v-bind="$attrs"
      class="mat-snackbar"
      :class="[
        `mat-snackbar--${phase}`,
        `mat-snackbar--${position}`,
        { 'mat-snackbar--with-close': hasClose },
      ]"
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
    </section>
  </Teleport>
</template>

<style scoped>
.mat-snackbar {
  --mat-snackbar-leading-space: 16px;
  --mat-snackbar-content-action-space: 24px;
  --mat-snackbar-action-trailing-space: 8px;
  --mat-snackbar-close-target-size: 48px;
  --mat-snackbar-close-icon-size: 24px;
  position: fixed;
  z-index: 1000;
  inset-block-end: calc(var(--mat-snackbar-viewport-margin) + env(safe-area-inset-bottom));
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

.mat-snackbar--opening {
  animation: mat-snackbar-enter var(--mat-sys-motion-duration-medium4) var(--mat-sys-motion-easing-emphasized-decelerate) both;
}

.mat-snackbar--closing {
  pointer-events: none;
  animation: mat-snackbar-exit var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized-accelerate) both;
}

.mat-snackbar--with-close {
  padding-inline-end: calc(
    var(--mat-snackbar-close-target-size)
    + var(--mat-snackbar-content-action-space)
    + var(--mat-snackbar-action-trailing-space)
  );
}

.mat-snackbar__text {
  flex: 1 1 auto;
  min-inline-size: 0;
  overflow-wrap: anywhere;
}

.mat-snackbar__close {
  position: absolute;
  inset-block-start: 50%;
  inset-inline-end: var(--mat-snackbar-action-trailing-space);
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: var(--mat-snackbar-close-target-size);
  block-size: var(--mat-snackbar-close-target-size);
  translate: 0 -50%;
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
}

@media (prefers-reduced-motion: reduce) {
  .mat-snackbar {
    animation-duration: .01ms;
  }
}
</style>
