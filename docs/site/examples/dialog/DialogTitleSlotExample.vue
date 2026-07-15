<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
  <mat-btn variant="outlined" @click="open = true">
    丰富标题
  </mat-btn>

  <mat-dialog v-model="open" content="标题 Slot 可以组合强调文字。">
    <template #title>
      发布 <strong>3 个</strong>更改？
    </template>

    <template #actions>
      <mat-spacer />
      <mat-btn variant="text" @click="open = false">
        关闭
      </mat-btn>
    </template>
  </mat-dialog>
</template>
