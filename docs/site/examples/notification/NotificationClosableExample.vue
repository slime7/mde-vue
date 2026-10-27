<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(true);
const result = ref('尚未操作');
const actions = [{ text: '知道了' }];

function handleAction({ action }) {
  result.value = `已选择「${action.text}」`;
}
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="notification-closable-example">
    <div class="notification-closable-example__controls">
      <mat-btn variant="outlined" @click="open = true">
        重新显示
      </mat-btn>
      <span>{{ result }}</span>
    </div>

    <mat-notification
      v-model="open"
      :actions="actions"
      :closable="false"
      text="使用操作按钮结束这条通知。"
      title="不可直接关闭"
      @action="handleAction"
    />
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.notification-closable-example {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.notification-closable-example__controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
<!-- #endregion style -->
