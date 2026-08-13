<!-- #region script -->
<script setup>
import { ref } from 'vue';

const temperature = ref(22);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example">
    <mat-slider
      v-model="temperature"
      aria-label="温度"
      :max="30"
      :min="16"
      show-value-indicator
    >
      <template #indicator-label="{ modelValue }">
        {{ modelValue }}°
      </template>
    </mat-slider>
    <output>聚焦或拖动手柄即可显示：{{ temperature }} ℃</output>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example {
  display: grid;
  gap: 12px;
  inline-size: 100%;
}
</style>
<!-- #endregion style -->
