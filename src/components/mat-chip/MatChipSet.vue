<script setup>
defineOptions({ name: 'MatChipSet' });

defineProps({
  /**
   * Chip 的换行或单行横向滚动布局。
   *
   * @type {'wrap' | 'scroll'}
   * @default 'wrap'
   */
  layout: {
    type: String,
    default: 'wrap',
    validator(value) {
      return ['wrap', 'scroll'].includes(value);
    },
  },
});
</script>

<template>
  <div
    class="mat-chip-set"
    :class="`mat-chip-set--${layout}`"
    role="group"
  >
    <slot />
  </div>
</template>

<style scoped>
.mat-chip-set {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  box-sizing: border-box;
  max-inline-size: 100%;
  min-block-size: var(--mat-sys-interaction-target-min-size);
}

.mat-chip-set--wrap { flex-wrap: wrap; }

.mat-chip-set--scroll {
  flex-wrap: nowrap;
  overflow: auto hidden;
}

.mat-chip-set--scroll :deep(.mat-chip) { max-inline-size: none; }
</style>
