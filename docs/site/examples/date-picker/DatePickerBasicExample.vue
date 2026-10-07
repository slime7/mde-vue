<!-- #region template -->
<template>
  <div class="date-picker-basic">
    <mat-date-picker
      v-model="selected"
      aria-label="选择日期"
    />
    <p class="date-picker-basic__value">
      当前选择：{{ formatted }}
    </p>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { computed, ref } from 'vue';

const selected = ref(new Date());

const formatted = computed(() => (
  selected.value === null
    ? '未选择'
    : new Intl.DateTimeFormat('zh-CN', { dateStyle: 'long' }).format(selected.value)
));
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.date-picker-basic {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.date-picker-basic__value {
  margin: 0;
  color: var(--mat-sys-color-on-surface-variant);
  font-size: var(--mat-sys-typescale-body-medium-size);
}
</style>
<!-- #endregion style -->
