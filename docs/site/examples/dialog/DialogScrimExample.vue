<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-btn variant="outlined" @click="open = true">
    打开透明帷幕 Dialog
  </mat-btn>

  <mat-dialog
    v-model="open"
    :scrim="false"
    title="透明帷幕"
    content="页面仍不可点击，只是不显示帷幕颜色。"
  >
    <template #actions>
      <mat-spacer />
      <mat-btn variant="text" @click="open = false">
        关闭
      </mat-btn>
    </template>
  </mat-dialog>
</template>
<!-- #endregion template -->
