<!-- #region template -->
<template>
  <div class="date-picker-container">
    <p class="date-picker-container__hint">
      面板本身不带背景、圆角与阴影，全部外观由下面的卡片容器提供。
    </p>
    <div class="date-picker-container__surface">
      <mat-date-picker
        v-model="selected"
        color="tertiary"
        aria-label="在卡片内选择日期"
      />
    </div>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const selected = ref(new Date());
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.date-picker-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.date-picker-container__hint {
  margin: 0;
  color: var(--mat-sys-color-on-surface-variant);
  font-size: var(--mat-sys-typescale-body-medium-size);
  text-align: center;
}

.date-picker-container__surface {
  padding: 8px;
  border-radius: var(--mat-sys-shape-corner-extra-large);
  background: var(--mat-sys-color-surface-container);
  box-shadow: var(--mat-sys-elevation-level2);
}
</style>
<!-- #endregion style -->
