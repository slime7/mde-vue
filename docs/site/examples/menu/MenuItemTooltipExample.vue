<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-btn id="menu-tooltip-trigger" @click="open = !open">
    打开带提示菜单
  </mat-btn>

  <mat-menu v-model="open" anchor="menu-tooltip-trigger">
    <mat-menu-item tooltip="创建新的代码文件 (Ctrl+N)">
      新建文件
    </mat-menu-item>
    <mat-menu-item tooltip="从磁盘载入已有项目或工作区 (Ctrl+O)">
      打开文件夹...
    </mat-menu-item>
    <mat-menu-item selected tooltip="当前选中的默认分支">
      main (当前分支)
    </mat-menu-item>
  </mat-menu>
</template>
<!-- #endregion template -->
