<!-- #region template -->
<template>
  <mat-menu
    id="activator-slot-menu"
    v-model="open"
  >
    <template #activator>
      <mat-btn
        variant="outlined"
        aria-haspopup="menu"
        :aria-expanded="open"
        aria-controls="activator-slot-menu"
        @click="open = !open"
      >
        使用 activator Slot
      </mat-btn>
    </template>

    <mat-menu-item>菜单项目</mat-menu-item>
  </mat-menu>
</template>
<!-- #endregion template -->
<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>
<!-- #endregion script -->
