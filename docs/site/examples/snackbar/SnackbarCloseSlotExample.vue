<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
  <mat-btn @click="open = true">
    自定义关闭 Slot
  </mat-btn>

  <mat-snackbar
    v-model="open"
    :duration="0"
    text="close Slot 会替代内置关闭按钮。"
  >
    <template #close="{ close }">
      <mat-btn
        icon="close"
        label="关闭"
        size="small"
        variant="standard"
        @click="close"
      />
    </template>
  </mat-snackbar>
</template>
