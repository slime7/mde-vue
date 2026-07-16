<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
  <mat-btn @click="open = true">
    显示通知
  </mat-btn>

  <mat-snackbar
    v-model="open"
    text="文件已保存。"
  />
</template>
