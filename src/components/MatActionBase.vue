<script setup>
import {
  computed, onBeforeUnmount, ref, watch,
} from 'vue';

defineOptions({ name: 'MatActionBase', inheritAttrs: false });

const props = defineProps({
  as: { type: String, default: 'button' },
  href: { type: String, default: undefined },
  disabled: { type: Boolean, default: false },
  type: { type: String, default: 'button' },
  useCursor: { type: Boolean, default: false },
  focusRing: { type: Boolean, default: true },
  pressedClass: { type: String, default: undefined },
});
const emit = defineEmits({
  click(payload) { return payload instanceof MouseEvent; },
});
const isLink = computed(() => props.href !== undefined);
const component = computed(() => (isLink.value ? 'a' : props.as));
const isButton = computed(() => component.value === 'button');
const isPressed = ref(false);
const root = ref(null);
let pressStartedAt = 0;
let releaseTimer;

function clearReleaseTimer() {
  if (releaseTimer !== undefined) {
    globalThis.clearTimeout(releaseTimer);
    releaseTimer = undefined;
  }
}
function finishPress() {
  if (!isPressed.value) {
    return;
  }

  clearReleaseTimer();
  releaseTimer = globalThis.setTimeout(() => {
    isPressed.value = false;
    releaseTimer = undefined;
  }, Math.max(0, 150 - (Date.now() - pressStartedAt)));
}
function startPress() {
  if (props.disabled) {
    return;
  }

  clearReleaseTimer();
  pressStartedAt = Date.now();
  isPressed.value = true;
}
function handlePointerDown(event) {
  if (event.button !== 0) {
    return;
  }

  startPress();
  event.currentTarget.setPointerCapture?.(event.pointerId);
}
function handleKeyDown(event) {
  const keys = isLink.value ? ['Enter'] : [' ', 'Enter'];

  if (!event.repeat && keys.includes(event.key)) {
    startPress();
  }
}
function handleKeyUp(event) {
  const keys = isLink.value ? ['Enter'] : [' ', 'Enter'];

  if (keys.includes(event.key)) {
    finishPress();
  }
}
function handleClick(event) {
  if (props.disabled) {
    event.preventDefault();
    event.stopImmediatePropagation();
    return;
  }

  emit('click', event);
}
watch(() => props.disabled, (disabled) => {
  if (disabled) {
    clearReleaseTimer();
    isPressed.value = false;
  }
});
onBeforeUnmount(clearReleaseTimer);

defineExpose({ root });
</script>

<template>
  <component
    :is="component"
    ref="root"
    v-bind="$attrs"
    class="mat-action-base"
    :class="{
      'mat-action-base--disabled': disabled,
      'mat-action-base--pressed': isPressed,
      [pressedClass]: isPressed && pressedClass,
      'mat-action-base--use-cursor': useCursor,
      'mat-action-base--focus-ring': focusRing,
    }"
    :aria-disabled="!isButton && disabled ? 'true' : $attrs['aria-disabled']"
    :disabled="isButton ? disabled : undefined"
    :href="isLink && !disabled ? href : undefined"
    :role="isLink && disabled ? 'link' : $attrs.role"
    :tabindex="!isButton && disabled ? -1 : $attrs.tabindex"
    :type="isButton ? type : undefined"
    @blur="finishPress"
    @click="handleClick"
    @keydown="handleKeyDown"
    @keyup="handleKeyUp"
    @lostpointercapture="finishPress"
    @pointercancel="finishPress"
    @pointerdown="handlePointerDown"
    @pointerup="finishPress"
  >
    <slot />
  </component>
</template>

<style scoped>
.mat-action-base {
  --mat-action-state-color: currentcolor;
  position: relative;
  isolation: isolate;
  box-sizing: border-box;
  appearance: none;
  cursor: default;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.mat-action-base--use-cursor:not(:disabled):not(.mat-action-base--disabled) { cursor: pointer; }

.mat-action-base::before {
  position: absolute;
  z-index: 0;
  inset: 0;
  border-radius: inherit;
  content: '';
  pointer-events: none;
  background: var(--mat-action-state-color);
  opacity: 0;
  transition: opacity var(--mat-sys-motion-duration-short3) var(--mat-sys-motion-easing-standard);
}

.mat-action-base:not(:disabled):not(.mat-action-base--disabled):focus-visible::before { opacity: var(--mat-sys-state-focus-state-layer-opacity); }

.mat-action-base--focus-ring:not(:disabled):not(.mat-action-base--disabled):focus-visible {
  outline: var(--mat-sys-interaction-focus-ring-width, 3px) solid var(--mat-sys-color-secondary);
  outline-offset: var(--mat-sys-interaction-focus-ring-offset, 2px);
}

@media (hover: hover) { .mat-action-base:not(:disabled):not(.mat-action-base--disabled):hover::before { opacity: var(--mat-sys-state-hover-state-layer-opacity); } }

.mat-action-base:not(:disabled):not(.mat-action-base--disabled):is(:active, .mat-action-base--pressed)::before { opacity: var(--mat-sys-state-pressed-state-layer-opacity); }

.mat-action-base:disabled,
.mat-action-base--disabled { cursor: not-allowed; }

@media (prefers-reduced-motion: reduce) { .mat-action-base::before { transition-duration: 0s; } }
</style>
