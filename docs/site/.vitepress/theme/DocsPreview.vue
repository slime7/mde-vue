<script setup>
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
  color: var(--mat-color-on-surface);
  background: var(--mat-color-surface-container-low);
  border: 1px solid var(--mat-color-outline-variant);
  border-radius: var(--mat-shape-corner-large);
}

.docs-preview--stacked {
  flex-direction: column;
  align-items: flex-start;
}

.docs-preview > :deep(*) {
  flex-shrink: 0;
}

.docs-preview :deep(.docs-preview-menu) {
  min-inline-size: 180px;
  padding: 12px;
  color: var(--mat-color-on-surface);
  background: var(--mat-color-surface-container);
  border-radius: var(--mat-shape-corner-medium);
  box-shadow: var(--mat-shadow-level-2);
}

@media (width < 640px) {
  .docs-preview {
    padding: 20px;
  }
}
</style>
