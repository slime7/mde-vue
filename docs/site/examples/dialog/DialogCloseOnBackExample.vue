<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-btn variant="outlined" @click="open = true">
    点击帷幕关闭
  </mat-btn>

  <mat-dialog
    v-model="open"
    close-on-back
    title="点击外部区域"
    content="点击 Dialog 外的帷幕即可关闭。"
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
