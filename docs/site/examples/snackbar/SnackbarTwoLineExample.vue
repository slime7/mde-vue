<script setup>
import { ref } from 'vue';

const open = ref(false);
const result = ref('尚未执行操作');

function undo() {
  result.value = '已撤销归档，邮件已恢复到收件箱。';
}
</script>

<template>
  <mat-btn @click="open = true">
    显示两行通知
  </mat-btn>

  <span>{{ result }}</span>

  <mat-snackbar
    v-model="open"
    action-text="撤销"
    closable
    :duration="0"
    text="邮件已归档。你可以在通知关闭前撤销此操作，已归档的邮件会恢复到收件箱。"
    @action="undo"
  />
</template>
