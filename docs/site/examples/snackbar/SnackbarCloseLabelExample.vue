<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
  <mat-btn @click="open = true">
    自定义关闭名称
  </mat-btn>

  <mat-snackbar
    v-model="open"
    closable
    close-label="关闭保存提示"
    :duration="0"
    text="关闭按钮的可访问名称已自定义。"
  />
</template>
