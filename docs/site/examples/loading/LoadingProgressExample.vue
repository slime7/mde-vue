<!-- #region script -->
<script setup>
import { ref } from 'vue';

const progress = ref(0.6);
const manual = ref(true);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="loading-progress-example">
    <mat-loading
      containment
      :progress="manual ? progress : undefined"
      :aria-label="manual ? '按进度加载' : '自动旋转加载'"
    />

    <div class="controls">
      <mat-slider
        v-model="progress"
        aria-label="加载进度"
        :disabled="!manual"
        :max="2"
        :min="0"
        :step="0.01"
        show-value-indicator
      >
        <template #indicator-label="{ modelValue }">
          {{ Number(modelValue).toFixed(2) }}
        </template>
      </mat-slider>
      <output>手动进度：{{ progress.toFixed(2) }}</output>
      <mat-switch v-model="manual">
        {{ manual ? '手动进度' : '自动旋转' }}
      </mat-switch>
    </div>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.loading-progress-example {
  display: grid;
  justify-items: center;
  gap: 20px;
  inline-size: 100%;
}

.controls {
  display: grid;
  gap: 12px;
  inline-size: min(100%, 320px);
}
</style>
<!-- #endregion style -->
