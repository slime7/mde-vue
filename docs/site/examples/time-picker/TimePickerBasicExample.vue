<!-- #region template -->
<template>
  <div class="time-picker-basic">
    <mat-time-picker
      v-model="selected"
      aria-label="选择时间"
    />
    <p class="time-picker-basic__value">
      当前选择：{{ selected ?? '未选择' }}
    </p>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const selected = ref('13:30');
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.time-picker-basic {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.time-picker-basic__value {
  margin: 0;
  color: var(--mat-sys-color-on-surface-variant);
  font-size: var(--mat-sys-typescale-body-medium-size);
}
</style>
<!-- #endregion style -->
