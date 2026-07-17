<!-- #region script -->
<script setup>
import { ref } from 'vue';
import { dialog } from 'mdu-ui/functions';

const result = ref('尚未选择');

async function openDialog() {
  result.value = await dialog({
    title: '选择处理方式',
    content: '命令式 Dialog 会在关闭动画和清理完成后返回结果。',
    actions: [
      { text: '稍后', value: 'later' },
      { text: '继续', value: 'continue', variant: 'filled-tonal' },
    ],
  }) ?? '已取消';
}
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="dialog-function-example">
    <mat-btn @click="openDialog">
      dialog()
    </mat-btn>
    <span>结果：{{ result }}</span>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.dialog-function-example {
  display: flex;
  gap: 12px;
  align-items: center;
}
</style>
<!-- #endregion style -->
