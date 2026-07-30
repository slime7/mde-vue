<!-- #region script -->
<script setup>
import { ref } from 'vue';

const semanticRange = ref([20, 65]);
const seededRange = ref([35, 80]);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example">
    <mat-range-slider
      v-model="semanticRange"
      aria-label-end="三级语义色结束值"
      aria-label-start="三级语义色起始值"
      color="tertiary"
    />
    <mat-range-slider
      v-model="seededRange"
      aria-label-end="局部种子色结束值"
      aria-label-start="局部种子色起始值"
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
