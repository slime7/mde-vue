<!-- #region script -->
<script setup>
import { ref } from 'vue';

const price = ref([20, 75]);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example">
    <mat-range-slider
      v-model="price"
      aria-label-end="价格上限"
      aria-label-start="价格下限"
      :max="100"
      :min="0"
      :step="5"
    />
    <output>价格区间：{{ price[0] }} — {{ price[1] }}</output>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example {
  display: grid;
  gap: 12px;
  inline-size: min(100%, 480px);
}
</style>
<!-- #endregion style -->
