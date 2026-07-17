<!-- #region template -->
<template>
  <mat-dialog
    v-model="open"
    title="确认删除？"
    content="删除后无法恢复，请确认是否继续。"
  >
    <template #activator>
      <mat-btn variant="outlined" @click="open = true">
        使用 activator Slot
      </mat-btn>
    </template>

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
<!-- #endregion template -->
<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>
<!-- #endregion script -->
