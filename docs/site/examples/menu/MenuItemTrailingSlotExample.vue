<script setup>
import { ref } from 'vue';

const open = ref(true);
</script>

<template>
  <div class="example-menu">
    <mat-btn id="trailing-slot-menu-trigger" @click="open = !open">
      trailing
    </mat-btn>
    <mat-menu
      id="trailing-slot-menu"
      v-model:open="open"
      anchor="trailing-slot-menu-trigger"
    >
      <mat-menu-item>
        保存
        <template #trailing>
          Ctrl+S
        </template>
      </mat-menu-item>
    </mat-menu>
  </div>
</template>

<style scoped>
.example-menu {
  min-block-size: 160px;
}
</style>
