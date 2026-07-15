<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
  <mat-btn variant="outlined" @click="open = true">
    自定义图标
  </mat-btn>

  <mat-dialog
    v-model="open"
    title="已完成"
    content="icon Slot 可以承载应用自己的 SVG。"
  >
    <template #icon>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="m9.5 16.2-4.2-4.2 1.4-1.4 2.8 2.8 7.8-7.8L18.7 7z" />
      </svg>
    </template>

    <template #actions>
      <mat-btn variant="text" @click="open = false">
        关闭
      </mat-btn>
    </template>
  </mat-dialog>
</template>

<style scoped>
svg {
  inline-size: 24px;
  block-size: 24px;
}
</style>
