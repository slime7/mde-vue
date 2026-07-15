<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
  <mat-btn color="tertiary" @click="open = true">
    显示图标
  </mat-btn>

  <mat-dialog
    v-model="open"
    color="tertiary"
    icon="info"
    title="局部图标配色"
    content="color 只改变基础 Dialog 的装饰图标强调色。"
  >
    <template #actions>
      <mat-btn variant="text" color="tertiary" @click="open = false">
        知道了
      </mat-btn>
    </template>
  </mat-dialog>
</template>
