<script setup>
import { ref } from 'vue';
import { prompt } from 'mdu-ui';

const result = ref('尚未输入');

async function showPrompt() {
  const value = await prompt({
    title: '新建项目',
    label: '项目名称',
    placeholder: '例如：设计系统',
    required: true,
    confirmText: '创建',
  });

  result.value = value ?? '已取消';
}
</script>

<template>
  <div class="dialog-function-example">
    <mat-btn variant="outlined" @click="showPrompt">
      prompt()
    </mat-btn>
    <span>结果：{{ result }}</span>
  </div>
</template>

<style scoped>
.dialog-function-example {
  display: flex;
  gap: 12px;
  align-items: center;
}
</style>
