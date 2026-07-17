<!-- #region script -->
<script setup>
import { ref } from 'vue';

const density = ref('comfortable');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example-stack">
    <mat-radio v-model="density" value="compact">
      紧凑
    </mat-radio>
    <mat-radio v-model="density" value="comfortable" color="secondary">
      舒适
    </mat-radio>
    <span>当前值：{{ density }}</span>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-stack {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}
</style>
<!-- #endregion style -->
