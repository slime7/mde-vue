<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(true);
const result = ref('尚未操作');
const actions = [
  { text: '查看' },
  { text: '标记已读' },
  { text: '稍后' },
];

function handleAction({ action }) {
  result.value = `已选择「${action.text}」`;
}
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="notification-actions-example">
    <div class="notification-actions-example__controls">
      <mat-btn variant="outlined" @click="open = true">
        重新显示
      </mat-btn>
      <span>{{ result }}</span>
    </div>

    <mat-notification
      v-model="open"
      :actions="actions"
      text="新版本已经准备好，可以立即安装。"
      title="发现新版本"
      @action="handleAction"
    />
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.notification-actions-example {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.notification-actions-example__controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
<!-- #endregion style -->
