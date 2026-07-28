<!-- #region script -->
<script setup>
import { ref } from 'vue';

const expanded = ref(false);
const open = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-btn @click="open = true">
    打开可展开 Bottom sheet
  </mat-btn>

  <mat-bottom-sheet
    v-model="open"
    v-model:expanded="expanded"
    variant="modal"
    title="播放队列"
  >
    点击或拖动顶部把手，可以在预览、展开和关闭状态间切换。
  </mat-bottom-sheet>
</template>
<!-- #endregion template -->

