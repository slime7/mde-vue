<!-- #region script -->
<script setup>
import { ref } from 'vue';

const range = ref([30, 70]);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example">
    <mat-range-slider
      v-model="range"
      aria-label-end="湿度上限"
      aria-label-start="湿度下限"
      show-value-indicator
    >
      <template #indicator-label="{ index, modelValue }">
        {{ index === 0 ? '最低' : '最高' }}：{{ modelValue }}%
      </template>
    </mat-range-slider>
    <output>聚焦或拖动的端点会显示数值：{{ range[0] }} — {{ range[1] }}</output>
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
