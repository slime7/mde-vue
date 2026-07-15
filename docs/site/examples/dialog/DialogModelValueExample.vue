<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
  <mat-btn @click="open = true">
    打开 Dialog
  </mat-btn>

  <mat-dialog
    v-model="open"
    title="删除项目？"
    content="删除后无法恢复，请确认是否继续。"
  >
    <template #actions>
      <mat-spacer />
      <mat-btn variant="text" @click="open = false">
        取消
      </mat-btn>
      <mat-btn variant="text" color="error" @click="open = false">
        删除
      </mat-btn>
    </template>
  </mat-dialog>
</template>
