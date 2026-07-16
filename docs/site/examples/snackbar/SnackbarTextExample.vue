<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
  <mat-btn @click="open = true">
    使用 text
  </mat-btn>

  <mat-snackbar
    v-model="open"
    closable
    :duration="0"
    text="text 属性提供简短的纯文本通知。"
  />
</template>
