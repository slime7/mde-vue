<!-- #region script -->
<script setup>
import { ref } from 'vue';

const hours = ref([2, 6]);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example">
    <mat-range-slider
      v-model="hours"
      aria-label-end="结束小时"
      aria-label-start="开始小时"
      :max="8"
      :min="0"
      show-stop-indicator
    />
    <output>时段：{{ hours[0] }} — {{ hours[1] }} 点</output>
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
