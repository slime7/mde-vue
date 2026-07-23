<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-btn variant="outlined" @click="open = true">
    丰富正文
  </mat-btn>

  <mat-dialog v-model="open" title="本次更新包含">
    <ul>
      <li>新的 Dialog 组件</li>
      <li>四个命令式函数</li>
    </ul>

    <p v-for="index in 80" :key="index">
      正文段落 {{ index }}
    </p>

    <template #actions>
      <mat-spacer />
      <mat-btn variant="text" @click="open = false">
        关闭
      </mat-btn>
    </template>
  </mat-dialog>
</template>
<!-- #endregion template -->
