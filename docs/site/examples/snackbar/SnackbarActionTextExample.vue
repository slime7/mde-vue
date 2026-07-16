<script setup>
import { ref } from 'vue';

const open = ref(false);
const result = ref('尚未执行操作');

function undo() {
  result.value = '已撤销归档';
}
</script>

<template>
  <mat-btn @click="open = true">
    显示带 action 的通知
  </mat-btn>

  <span>{{ result }}</span>

  <mat-snackbar
    v-model="open"
    action-text="撤销"
    :duration="0"
    text="邮件已归档。"
    @action="undo"
  />
</template>
