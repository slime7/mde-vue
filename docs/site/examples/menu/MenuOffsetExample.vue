<script setup>
import { ref } from 'vue';

const open = ref(true);
</script>

<template>
  <div class="example-menu">
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
  </div>
</template>

<style scoped>
.example-menu {
  min-block-size: 140px;
}
</style>
