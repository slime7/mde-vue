<script setup>
import { computed, provide, useSlots } from 'vue';
import { MAT_APP_ROOT_KEY } from '../../../../src/components/mat-app-root/mat-app-root-context.js';

provide(MAT_APP_ROOT_KEY, null);

const props = defineProps({
  /**
   * 无障碍标签。
   *
   * @type {string}
   * @default '组件参数配置预览'
   */
  label: {
    type: String,
    default: '组件参数配置预览',
  },
  /**
   * 右侧控制区域的标题。
   *
   * @type {string}
   * @default 'Configuration'
   */
  title: {
    type: String,
    default: 'Configuration',
  },
  /**
   * 预览区域的最小高度。
   *
   * @type {string | number}
   * @default '240px'
   */
  minHeight: {
    type: [String, Number],
    default: '240px',
  },
  /**
   * 右侧控制面板的固定宽度。
   *
   * @type {string | number}
   * @default '280px'
   */
  controlsWidth: {
    type: [String, Number],
    default: '280px',
  },
});

const resolvedMinHeight = computed(() => (
  typeof props.minHeight === 'number' ? `${props.minHeight}px` : props.minHeight
));

const resolvedControlsWidth = computed(() => (
  typeof props.controlsWidth === 'number' ? `${props.controlsWidth}px` : props.controlsWidth
));

const slots = useSlots();

const hasLayoutSlots = computed(() => Boolean(
  slots.preview || slots.controls || slots.config || slots.params,
));
</script>

<template>
  <slot v-if="!hasLayoutSlots" />
  <div
    v-else
    class="docs-playground"
    role="region"
    :aria-label="label"
    :style="{
      '--docs-playground-min-height': resolvedMinHeight,
      '--docs-playground-controls-width': resolvedControlsWidth,
    }"
  >
    <div class="docs-playground__preview">
      <slot name="preview">
        <slot />
      </slot>
    </div>

    <div class="docs-playground__divider" />

    <aside class="docs-playground__controls">
      <div
        v-if="title || $slots.title"
        class="docs-playground__title"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </div>

      <div class="docs-playground__items">
        <slot name="controls">
          <slot name="config">
            <slot name="params" />
          </slot>
        </slot>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.docs-playground {
  display: flex;
  min-inline-size: 0;
  max-inline-size: 100%;
  margin-block: 16px 24px;
  color: var(--mat-sys-color-on-surface);
  background: var(--mat-sys-color-surface-container-low);
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
  overflow: hidden;
}

.docs-playground__preview {
  display: flex;
  flex: 1 1 0%;
  align-items: center;
  justify-content: center;
  min-inline-size: 0;
  min-block-size: var(--docs-playground-min-height, 240px);
  padding: 32px 24px;
}

.docs-playground__divider {
  inline-size: 1px;
  flex-shrink: 0;
  background: var(--mat-sys-color-outline-variant);
}

.docs-playground__controls {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  inline-size: var(--docs-playground-controls-width, 280px);
  padding: 20px 24px;
  box-sizing: border-box;
}

.docs-playground__title {
  margin-block-end: 16px;
  font-size: .875rem;
  font-weight: 600;
  line-height: 1.5;
  color: var(--mat-sys-color-on-surface-variant);
  letter-spacing: .01em;
}

.docs-playground__items {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-inline-size: 0;
}

.docs-playground__items > :deep(*) {
  inline-size: 100%;
}

.docs-playground__items > :deep(.mat-checkbox),
.docs-playground__items > :deep(.mat-switch) {
  inline-size: max-content;
}

@media (width < 640px) {
  .docs-playground {
    flex-direction: column;
  }

  .docs-playground__preview {
    padding: 24px 16px;
  }

  .docs-playground__divider {
    inline-size: 100%;
    block-size: 1px;
  }

  .docs-playground__controls {
    inline-size: 100%;
    padding: 20px 16px;
  }
}
</style>
