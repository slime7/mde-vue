<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
  <div class="example-stack">
    <mat-split-btn
      controls="split-controls-menu"
      :expanded="open"
      @update:expanded="open = $event"
    >
      <template #leading>
        <mat-btn>新建</mat-btn>
      </template>
      <template #trailing>
        <mat-btn id="split-controls-trigger" icon="arrow_drop_down" label="更多新建方式" />
      </template>
    </mat-split-btn>
    <mat-menu
      id="split-controls-menu"
      v-model="open"
      anchor="split-controls-trigger"
    >
      <mat-menu-item>文档</mat-menu-item>
      <mat-menu-item>文件夹</mat-menu-item>
    </mat-menu>
  </div>
</template>

<style scoped>
.example-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}
</style>
