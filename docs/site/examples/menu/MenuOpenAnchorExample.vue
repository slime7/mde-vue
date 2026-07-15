<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
  <div class="example-menu">
    <mat-btn
      id="open-anchor-menu-trigger"
      variant="outlined"
      aria-haspopup="menu"
      :aria-expanded="open"
      aria-controls="open-anchor-menu"
      @click="open = !open"
    >
      打开菜单
    </mat-btn>
    <mat-menu
      id="open-anchor-menu"
      v-model="open"
      anchor="open-anchor-menu-trigger"
    >
      <mat-menu-item>菜单项目</mat-menu-item>
    </mat-menu>
  </div>
</template>

<style scoped>
.example-menu {
  min-block-size: 120px;
}
</style>
