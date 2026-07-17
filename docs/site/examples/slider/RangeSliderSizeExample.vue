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
      aria-label-end="超小尺寸结束值"
      aria-label-start="超小尺寸起始值"
      v-model="range"
      size="extra-small"
    />
    <mat-range-slider
      aria-label-end="小尺寸结束值"
      aria-label-start="小尺寸起始值"
      v-model="range"
      size="small"
    />
    <mat-range-slider
      aria-label-end="中等尺寸结束值"
      aria-label-start="中等尺寸起始值"
      v-model="range"
      size="medium"
    />
    <mat-range-slider
      aria-label-end="大尺寸结束值"
      aria-label-start="大尺寸起始值"
      v-model="range"
      size="large"
    />
    <mat-range-slider
      aria-label-end="超大尺寸结束值"
      aria-label-start="超大尺寸起始值"
      v-model="range"
      size="extra-large"
    />
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example {
  display: grid;
  gap: 20px;
  inline-size: min(100%, 560px);
}
</style>
<!-- #endregion style -->
