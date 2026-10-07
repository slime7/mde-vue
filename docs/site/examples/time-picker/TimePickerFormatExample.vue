<!-- #region template -->
<template>
  <div class="time-picker-format">
    <div class="time-picker-format__controls">
      <label class="time-picker-format__label">
        <input
          v-model="format"
          type="radio"
          value="24h"
        >
        24 小时制
      </label>
      <label class="time-picker-format__label">
        <input
          v-model="format"
          type="radio"
          value="12h"
        >
        12 小时制
      </label>
    </div>
    <mat-time-picker
      v-model="selected"
      :format="format"
      aria-label="选择时间"
    />
    <p class="time-picker-format__value">
      底层值（24 小时制）：{{ selected ?? '未选择' }}
    </p>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const format = ref('12h');
const selected = ref('14:30');
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.time-picker-format {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.time-picker-format__controls {
  display: flex;
  gap: 16px;
}

.time-picker-format__label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: var(--mat-sys-typescale-body-medium-size);
  color: var(--mat-sys-color-on-surface);
  cursor: pointer;
}

.time-picker-format__value {
  margin: 0;
  color: var(--mat-sys-color-on-surface-variant);
  font-size: var(--mat-sys-typescale-body-medium-size);
}
</style>
<!-- #endregion style -->
