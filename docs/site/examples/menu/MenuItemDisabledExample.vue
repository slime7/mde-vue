<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-btn
    id="disabled-menu-trigger"
    aria-haspopup="menu"
    :aria-expanded="open"
    aria-controls="disabled-menu"
    @click="open = !open"
  >
    disabled
  </mat-btn>
  <mat-menu
    id="disabled-menu"
    v-model="open"
    anchor="disabled-menu-trigger"
  >
    <mat-menu-item>可用项目</mat-menu-item>
    <mat-menu-item disabled>
      禁用项目
    </mat-menu-item>
  </mat-menu>
</template>
<!-- #endregion template -->
