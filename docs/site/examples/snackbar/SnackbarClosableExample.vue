<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-btn @click="open = true">
    显示可关闭通知
  </mat-btn>

  <mat-snackbar
    v-model="open"
    closable
    :duration="0"
    text="点击右侧关闭按钮即可提前收起。"
  />
</template>
<!-- #endregion template -->
