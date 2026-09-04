<script setup>
import { provide } from 'vue';
import { MAT_APP_ROOT_KEY } from '../../../../src/components/mat-app-root/mat-app-root-context.js';

provide(MAT_APP_ROOT_KEY, null);

defineProps({
  label: {
    type: String,
    required: true,
  },
  stacked: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    class="docs-preview"
    :class="{ 'docs-preview--stacked': stacked }"
    role="group"
    :aria-label="label"
  >
    <slot />
  </div>
</template>

<style scoped>
.docs-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  min-block-size: 96px;
  margin-block: 16px 24px;
  padding: 24px;
  color: var(--mat-sys-color-on-surface);
  background: var(--mat-sys-color-surface-container-low);
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
}

.docs-preview--stacked {
  flex-direction: column;
  align-items: stretch;
}

.docs-preview > :deep(*) {
  flex-shrink: 1;
  min-inline-size: 0;
}

.docs-preview--stacked > :deep(*),
.docs-preview:has(> :only-child) > :deep(*) {
  inline-size: 100%;
}

.docs-preview :deep(.docs-preview-menu) {
  min-inline-size: 180px;
  padding: 12px;
  color: var(--mat-sys-color-on-surface);
  background: var(--mat-sys-color-surface-container);
  border-radius: var(--mat-sys-shape-corner-medium);
  box-shadow: var(--mat-sys-elevation-level2);
}

@media (width < 640px) {
  .docs-preview {
    padding: 20px;
  }
}
</style>
