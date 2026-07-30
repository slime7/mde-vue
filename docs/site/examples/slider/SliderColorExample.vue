<!-- #region script -->
<script setup>
import { ref } from 'vue';

const semanticValue = ref(45);
const seededValue = ref(70);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example">
    <mat-slider
      v-model="semanticValue"
      aria-label="三级语义色"
      color="tertiary"
    />
    <mat-slider
      v-model="seededValue"
      aria-label="局部种子色"
      color="#6750a4"
    />
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example {
  display: grid;
  gap: 16px;
  inline-size: 100%;
}
</style>
<!-- #endregion style -->
