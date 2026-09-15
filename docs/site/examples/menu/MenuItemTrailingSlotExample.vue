<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-btn id="trailing-slot-menu-trigger" @click="open = !open">
    trailing
  </mat-btn>
  <mat-menu
    id="trailing-slot-menu"
    v-model="open"
    anchor="trailing-slot-menu-trigger"
  >
    <mat-menu-item>
      保存
      <template #trailing>
        Ctrl+S
      </template>
    </mat-menu-item>
  </mat-menu>
</template>
<!-- #endregion template -->
