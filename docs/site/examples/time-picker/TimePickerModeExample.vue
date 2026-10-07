<!-- #region template -->
<template>
  <div class="time-picker-mode">
    <mat-time-picker
      v-model="selected"
      v-model:mode="mode"
      show-mode-toggle
      aria-label="选择时间"
    >
      <template #input>
        <div class="time-picker-mode__custom-input">
          <label class="time-picker-mode__input-label">
            自定义时间输入：
            <input
              v-model="selected"
              type="time"
              class="time-picker-mode__native-input"
            >
          </label>
        </div>
      </template>
    </mat-time-picker>
    <p class="time-picker-mode__value">
      当前模式：{{ mode === 'dial' ? '表盘模式' : '输入模式' }} ｜ 时间：{{ selected ?? '未选择' }}
    </p>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const mode = ref('dial');
const selected = ref('09:15');
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.time-picker-mode {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.time-picker-mode__custom-input {
  padding: 24px;
  text-align: center;
}

.time-picker-mode__input-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--mat-sys-color-on-surface);
  font-size: var(--mat-sys-typescale-body-medium-size);
}

.time-picker-mode__native-input {
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid var(--mat-sys-color-outline);
  border-radius: var(--mat-sys-shape-corner-small);
  background: var(--mat-sys-color-surface-container-highest);
  color: inherit;
  font-size: var(--mat-sys-typescale-title-medium-size);
}

.time-picker-mode__value {
  margin: 0;
  color: var(--mat-sys-color-on-surface-variant);
  font-size: var(--mat-sys-typescale-body-medium-size);
}
</style>
<!-- #endregion style -->
