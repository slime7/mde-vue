<!-- #region script -->
<script setup>
import { ref } from 'vue';

const rating = ref(3);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example">
    <mat-slider
      v-model="rating"
      aria-label="评分"
      :max="5"
      :min="1"
      show-stop-indicator
    />
    <output>评分：{{ rating }}</output>
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
