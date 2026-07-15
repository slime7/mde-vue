<script setup>
import { ref } from 'vue';
import { alert } from 'mdu-ui';

const closed = ref(false);

async function showAlert() {
  closed.value = false;
  await alert({
    icon: 'info',
    title: '同步完成',
    content: '所有数据已经写入。',
    confirmText: '知道了',
  });
  closed.value = true;
}
</script>

<template>
  <div class="dialog-function-example">
    <mat-btn variant="outlined" @click="showAlert">
      alert()
    </mat-btn>
    <span>{{ closed ? 'Dialog 已关闭' : '等待打开' }}</span>
  </div>
</template>

<style scoped>
.dialog-function-example {
  display: flex;
  gap: 12px;
  align-items: center;
}
</style>
