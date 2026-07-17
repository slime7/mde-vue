<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-btn variant="outlined" @click="open = true">
    全屏编辑
  </mat-btn>

  <mat-dialog
    v-model="open"
    full-screen
    close-label="放弃编辑"
    title="编辑资料"
  >
    <p>全屏 Dialog 的标题和操作固定在顶部，只有这里的正文区域滚动。</p>
    <p v-for="index in 80" :key="index">
      正文段落 {{ index }}
    </p>

    <template #actions>
      <mat-spacer />
      <mat-btn variant="text" @click="open = false">
        保存
      </mat-btn>
    </template>
  </mat-dialog>
</template>
<!-- #endregion template -->
