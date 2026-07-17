<!-- #region script -->
<script setup>
import { ref } from 'vue';
import { snackbar, toast } from 'mdu-ui/functions';

const result = ref('尚未展示');

async function showSnackbar() {
  let restored = false;

  await snackbar({
    actionText: '撤销',
    closable: true,
    duration: 0,
    onAction() {
      restored = true;
      result.value = '已撤销 snackbar() 的操作';
    },
    text: 'snackbar() 已展示通知。',
  });

  if (!restored) {
    result.value = 'snackbar() 已关闭';
  }
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
<!-- #endregion script -->

<!-- #region template -->
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
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.snackbar-function-example {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
</style>
<!-- #endregion style -->
