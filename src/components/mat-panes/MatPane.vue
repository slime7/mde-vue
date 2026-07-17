<script setup>
import {
  computed, inject, onBeforeUnmount, onMounted, ref, watch,
} from 'vue';
import { MAT_PANES_KEY } from '../panes-context';

defineOptions({
  name: 'MatPane',
  inheritAttrs: false,
});

const props = defineProps({
  id: {
    type: String,
    required: true,
    validator(value) {
      return value.length > 0;
    },
  },
  resizeLabel: {
    type: String,
    default: undefined,
  },
});

const context = inject(MAT_PANES_KEY, null);
const root = ref(null);
const resizeLabel = computed(() => props.resizeLabel);
let unregister;

const paneStyle = computed(() => context?.getPaneStyle(props.id) ?? {
  '--mat-pane-weight': 1,
});
const hasHandle = computed(() => Boolean(context?.isHandleVisible(props.id)));
const handleAttributes = computed(() => context?.getHandleAttributes(props.id) ?? {});
const isActive = computed(() => Boolean(context?.isBoundaryActive(props.id)));

function register() {
  unregister?.();
  unregister = undefined;

  if (context) {
    unregister = context.registerPane({
      element: root,
      id: props.id,
      resizeLabel,
    });
  }
}

onMounted(register);
watch(() => props.id, register);
onBeforeUnmount(() => unregister?.());
</script>

<template>
  <div
    ref="root"
    v-bind="$attrs"
    :id="id"
    class="mat-pane"
    :style="paneStyle"
  >
    <slot />
  </div>

  <div
    v-if="hasHandle"
    class="mat-pane__separator"
  >
    <div
      class="mat-pane__handle"
      :class="{ 'mat-pane__handle--active': isActive }"
      role="separator"
      :aria-controls="handleAttributes['aria-controls']"
      :aria-label="handleAttributes['aria-label']"
      :aria-orientation="handleAttributes['aria-orientation']"
      :aria-valuemax="handleAttributes['aria-valuemax']"
      :aria-valuemin="handleAttributes['aria-valuemin']"
      :aria-valuenow="handleAttributes['aria-valuenow']"
      tabindex="0"
      @keydown="context.handleKeyDown(id, $event)"
      @lostpointercapture="context.finishPointerInteraction(id, $event, false)"
      @pointercancel="context.finishPointerInteraction(id, $event, false)"
      @pointerdown="context.handlePointerDown(id, $event)"
      @pointermove="context.handlePointerMove(id, $event)"
      @pointerup="context.finishPointerInteraction(id, $event, true)"
    />
  </div>
</template>

<style scoped>
.mat-pane {
  display: block;
  flex: var(--mat-pane-weight, 1) 1 0%;
  box-sizing: border-box;
  min-inline-size: 0;
  min-block-size: 0;
  block-size: 100%;
  overflow: auto;
  scrollbar-gutter: stable;
}

.mat-pane__separator {
  position: relative;
  flex: 0 0 var(--mat-panes-divider-space);
  align-self: stretch;
  min-inline-size: var(--mat-panes-divider-space);
}

.mat-pane__handle {
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  display: grid;
  inline-size: var(--mat-panes-handle-size);
  block-size: var(--mat-panes-handle-size);
  padding: 0;
  cursor: col-resize;
  background: transparent;
  border: 0;
  border-radius: var(--mat-sys-shape-corner-full);
  transform: translate(-50%, -50%);
  touch-action: none;
  user-select: none;
  isolation: isolate;
}

.mat-pane__handle::before,
.mat-pane__handle::after {
  position: absolute;
  inset: 50% auto auto 50%;
  content: '';
  pointer-events: none;
  border-radius: var(--mat-sys-shape-corner-full);
  transform: translate(-50%, -50%);
}

.mat-pane__handle::before {
  z-index: 1;
  inline-size: var(--mat-panes-handle-indicator-width);
  block-size: var(--mat-panes-handle-indicator-height);
  background: var(--mat-sys-color-outline);
  transition: background-color var(--mat-sys-motion-duration-short3) var(--mat-sys-motion-easing-standard);
}

.mat-pane__handle::after {
  z-index: -1;
  inline-size: var(--mat-panes-handle-state-layer-size);
  block-size: var(--mat-panes-handle-state-layer-size);
  background: var(--mat-sys-color-on-surface);
  opacity: 0;
  transition: opacity var(--mat-sys-motion-duration-short3) var(--mat-sys-motion-easing-standard);
}

.mat-pane__handle:focus-visible {
  outline: var(--mat-sys-interaction-focus-ring-width) solid var(--mat-sys-color-primary);
  outline-offset: var(--mat-sys-interaction-focus-ring-offset);
}

.mat-pane__handle--active::before {
  background: var(--mat-sys-color-primary);
}

.mat-pane__handle--active::after {
  opacity: var(--mat-sys-state-dragged-state-layer-opacity);
}

@media (hover: hover) {
  .mat-pane__handle:hover::after {
    opacity: var(--mat-sys-state-hover-state-layer-opacity);
  }
}

@media (prefers-reduced-motion: reduce) {
  .mat-pane__handle::before,
  .mat-pane__handle::after {
    transition-duration: 0s;
  }
}
</style>
