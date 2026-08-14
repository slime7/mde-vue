<script setup>
import {
  computed, inject, onBeforeUnmount, onMounted, ref, watch,
} from 'vue';
import { MAT_PANES_KEY } from '../panes-context';
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatPane',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 当前实例中的唯一稳定键，同时对应 sizes 的键和根 DOM id。
   *
   * @type {string}
   * @required
   */
  id: {
    type: String,
    required: true,
    validator(value) {
      return value.length > 0;
    },
  },
  /**
   * 后方可访问分隔控件的名称。
   *
   * @type {string | undefined}
   * @default undefined
   */
  resizeLabel: {
    type: String,
    default: undefined,
  },
});
const propsWithDefaults = useMatProps('pane', props);

const context = inject(MAT_PANES_KEY, null);
const root = ref(null);
const resizeLabelValue = computed(() => propsWithDefaults.resizeLabel);
let unregister;

const paneStyle = computed(() => context?.getPaneStyle(propsWithDefaults.id) ?? {
  '--mat-pane-weight': 1,
});
const hasSeparator = computed(() => Boolean(context?.hasBoundary(propsWithDefaults.id)));
const hasHandle = computed(() => Boolean(context?.isHandleVisible(propsWithDefaults.id)));
const handleAttributes = computed(() => (
  context?.getHandleAttributes(propsWithDefaults.id) ?? {}
));
const isActive = computed(() => Boolean(context?.isBoundaryActive(propsWithDefaults.id)));

function register() {
  unregister?.();
  unregister = undefined;

  if (context) {
    unregister = context.registerPane({
      element: root,
      id: propsWithDefaults.id,
      resizeLabel: resizeLabelValue,
    });
  }
}

onMounted(register);
watch(() => propsWithDefaults.id, register);
onBeforeUnmount(() => unregister?.());
</script>

<template>
  <div
    ref="root"
    v-bind="$attrs"
    :id="propsWithDefaults.id"
    class="mat-pane"
    :style="paneStyle"
  >
    <slot />
  </div>

  <div
    v-if="hasSeparator"
    class="mat-pane__separator"
  >
    <div
      v-if="hasHandle"
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
@layer mde.components {
  .mat-pane {
    display: block;
    flex: var(--mat-pane-weight, 1) 1 0%;
    box-sizing: border-box;
    min-inline-size: 0;
    min-block-size: 0;
    block-size: 100%;
    overflow: auto;
    overscroll-behavior: contain;
    scrollbar-width: thin;
    scrollbar-color: var(--mat-sys-color-outline) transparent;
  }

  .mat-pane::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  .mat-pane::-webkit-scrollbar-track {
    background: transparent;
  }

  .mat-pane::-webkit-scrollbar-thumb {
    background: var(--mat-sys-color-outline);
    border-radius: var(--mat-sys-shape-corner-full);
  }

  .mat-pane__separator {
    position: relative;
    flex: 0 0 var(--mat-panes-divider-space);
    align-self: stretch;
    min-inline-size: var(--mat-panes-divider-space);
  }

  .mat-pane__handle {
    --mat-panes-handle-current-width: var(--mat-panes-handle-indicator-width);
    --mat-panes-handle-current-height: var(--mat-panes-handle-indicator-height);
    --mat-panes-handle-current-color: var(--mat-sys-color-outline);
    --mat-panes-handle-current-shape: var(--mat-sys-shape-corner-full);
    position: absolute;
    inset-block-start: 50%;
    inset-inline-start: 50%;
    inline-size: var(--mat-panes-handle-size);
    block-size: var(--mat-panes-handle-size);
    padding: 0;
    cursor: default;
    border: 0;
    border-radius: var(--mat-sys-shape-corner-full);
    transform: translate(-50%, -50%);
    touch-action: none;
    user-select: none;
  }

  .mat-pane__handle::before {
    position: absolute;
    inset: 50% auto auto 50%;
    content: '';
    pointer-events: none;
    inline-size: var(--mat-panes-handle-current-width);
    block-size: var(--mat-panes-handle-current-height);
    background: var(--mat-panes-handle-current-color);
    border-radius: var(--mat-panes-handle-current-shape);
    transform: translate(-50%, -50%);
    transition: background-color var(--mat-sys-motion-spring-fast-effects), border-radius var(--mat-sys-motion-spring-fast-effects), block-size var(--mat-sys-motion-spring-fast-spatial), inline-size var(--mat-sys-motion-spring-fast-spatial);
  }

  .mat-pane__handle:focus-visible::before {
    outline: var(--mat-sys-interaction-focus-ring-width) solid var(--mat-sys-color-primary);
    outline-offset: var(--mat-sys-interaction-focus-ring-offset);
  }

  .mat-pane__handle:active {
    --mat-panes-handle-current-width: var(--mat-panes-handle-pressed-width);
    --mat-panes-handle-current-height: var(--mat-panes-handle-pressed-height);
    --mat-panes-handle-current-color: var(--mat-sys-color-on-surface);
    --mat-panes-handle-current-shape: var(--mat-sys-shape-corner-medium);
  }

  .mat-pane__handle--active {
    --mat-panes-handle-current-width: var(--mat-panes-handle-dragged-width);
    --mat-panes-handle-current-height: var(--mat-panes-handle-dragged-height);
    --mat-panes-handle-current-color: var(--mat-sys-color-on-surface);
    --mat-panes-handle-current-shape: var(--mat-sys-shape-corner-medium);
  }

  @media (prefers-reduced-motion: reduce) {
    .mat-pane__handle::before {
      transition-duration: 0s;
    }
  }
}
</style>
