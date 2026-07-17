<!-- #region script -->
<script setup>
import { ref } from 'vue';

const selected = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-btn
    toggle
    :selected="selected"
    @click="selected = !selected"
  >
    切换收藏
  </mat-btn>
</template>
<!-- #endregion template -->
