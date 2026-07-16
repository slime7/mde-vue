<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
  <mat-btn @click="open = true">
    使用默认 Slot
  </mat-btn>

  <mat-snackbar
    v-model="open"
    closable
    :duration="0"
    text="这段属性文本会被忽略。"
  >
    已同步 <strong>12 个项目</strong>。
  </mat-snackbar>
</template>
