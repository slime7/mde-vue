<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-btn id="supporting-slot-menu-trigger" @click="open = !open">
    supporting
  </mat-btn>
  <mat-menu
    id="supporting-slot-menu"
    v-model="open"
    anchor="supporting-slot-menu-trigger"
  >
    <mat-menu-item>
      新建文件
      <template #supporting>
        创建空白文档
      </template>
    </mat-menu-item>
  </mat-menu>
</template>
<!-- #endregion template -->
