<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-btn id="offset-menu-trigger" @click="open = !open">
    带偏移的菜单
  </mat-btn>
  <mat-menu
    v-model="open"
    anchor="offset-menu-trigger"
    :offset="[12, 8]"
  >
    <mat-menu-item>菜单项目</mat-menu-item>
  </mat-menu>
</template>
<!-- #endregion template -->
