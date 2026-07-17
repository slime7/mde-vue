<!-- #region script -->
<script setup>
import { ref } from 'vue';

const balance = ref(-20);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example">
    <mat-slider
      v-model="balance"
      aria-label="左右声道平衡"
      center="0"
      :max="50"
      :min="-50"
      :step="10"
      variant="centered"
    />
    <output>平衡：{{ balance }}</output>
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
