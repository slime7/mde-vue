<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-btn
    id="max-length-menu-trigger"
    variant="outlined"
    aria-haspopup="menu"
    :aria-expanded="open"
    aria-controls="max-length-menu"
    @click="open = !open"
  >
    打开限高菜单
  </mat-btn>
  <mat-menu
    id="max-length-menu"
    v-model="open"
    anchor="max-length-menu-trigger"
    :max-length="232"
  >
    <mat-menu-item>新建文件</mat-menu-item>
    <mat-menu-item>打开文件</mat-menu-item>
    <mat-menu-item>保存</mat-menu-item>
    <mat-menu-item>另存为</mat-menu-item>
    <mat-menu-item>导入</mat-menu-item>
    <mat-menu-item>导出</mat-menu-item>
    <mat-menu-item>打印</mat-menu-item>
  </mat-menu>
</template>
<!-- #endregion template -->
