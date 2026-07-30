<!-- #region script -->
<script setup>
import { ref } from 'vue';

const value = ref(50);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example">
    <mat-slider
      aria-label="超小尺寸"
      v-model="value"
      size="extra-small"
    />
    <mat-slider
      aria-label="小尺寸"
      v-model="value"
      size="small"
    />
    <mat-slider
      aria-label="中等尺寸"
      v-model="value"
      size="medium"
    />
    <mat-slider
      aria-label="大尺寸"
      v-model="value"
      size="large"
    />
    <mat-slider
      aria-label="超大尺寸"
      v-model="value"
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
  inline-size: 100%;
}
</style>
<!-- #endregion style -->
