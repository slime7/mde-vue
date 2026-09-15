<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-btn
    id="color-menu-trigger"
    aria-haspopup="menu"
    :aria-expanded="open"
    aria-controls="color-menu"
    @click="open = !open"
  >
    color
  </mat-btn>
  <mat-menu
    id="color-menu"
    v-model="open"
    anchor="color-menu-trigger"
    color="#6750a4"
    variant="vibrant"
  >
    <mat-menu-item>局部种子色菜单</mat-menu-item>
  </mat-menu>
</template>
<!-- #endregion template -->
