<!-- #region script -->
<script setup>
import { ref } from 'vue';

const volume = ref(35);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example">
    <mat-slider
      v-model="volume"
      aria-label="音量"
      :max="100"
      :min="0"
      :step="5"
    />
    <output>音量：{{ volume }}</output>
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
