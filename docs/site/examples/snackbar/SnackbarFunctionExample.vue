<script setup>
import { ref } from 'vue';
import { snackbar, toast } from 'mdu-ui/functions';

const result = ref('尚未展示');

async function showSnackbar() {
  await snackbar({
    closable: true,
    duration: 0,
    text: 'snackbar() 已展示通知。',
  });
  result.value = 'snackbar() 已关闭';
}

async function showToast() {
  await toast({
    closable: true,
    duration: 0,
    text: 'toast() 是 snackbar() 的别名。',
  });
  result.value = 'toast() 已关闭';
}
</script>

<template>
  <div class="snackbar-function-example">
    <mat-btn @click="showSnackbar">
      snackbar()
    </mat-btn>

    <mat-btn variant="outlined" @click="showToast">
      toast()
    </mat-btn>

    <span>{{ result }}</span>
  </div>
</template>

<style scoped>
.snackbar-function-example {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
</style>
