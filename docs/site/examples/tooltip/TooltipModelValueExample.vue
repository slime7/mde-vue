<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-btn
    id="tooltip-model-value-target"
    :aria-pressed="open"
    variant="outlined"
    @click="open = !open"
  >
    {{ open ? '关闭提示' : '打开提示' }}
  </mat-btn>

  <mat-tooltip
    v-model="open"
    content="此时由 v-model 完全控制展示状态"
    target="#tooltip-model-value-target"
  />
</template>
<!-- #endregion template -->
