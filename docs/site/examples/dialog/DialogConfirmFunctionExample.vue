<script setup>
import { ref } from 'vue';
import { confirm } from 'mdu-ui';

const result = ref('尚未选择');

async function showConfirm() {
  result.value = await confirm({
    title: '发布更改？',
    content: '发布后所有成员都能看到。',
    confirmText: '发布',
    cancelText: '取消',
  }) ? '已确认' : '已取消';
}
</script>

<template>
  <div class="dialog-function-example">
    <mat-btn variant="outlined" @click="showConfirm">
      confirm()
    </mat-btn>
    <span>{{ result }}</span>
  </div>
</template>

<style scoped>
.dialog-function-example {
  display: flex;
  gap: 12px;
  align-items: center;
}
</style>
