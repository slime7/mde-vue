<script setup>
import { ref } from 'vue';

const open = ref(true);
</script>

<template>
  <div class="example-menu">
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
  </div>
</template>

<style scoped>
.example-menu {
  min-block-size: 160px;
}
</style>
