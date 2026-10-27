<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(true);
const actions = [{ text: '打开' }];
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="notification-actions-slot-example">
    <mat-btn variant="outlined" @click="open = true">
      重新显示
    </mat-btn>

    <mat-notification
      v-model="open"
      :actions="actions"
      text="自定义操作可以组合按钮，并决定是否关闭通知。"
      title="自定义操作区"
    >
      <template #actions="{ actions: items, action, close }">
        <mat-btn size="small" variant="text" @click="action(items[0], 0)">
          {{ items[0].text }}
        </mat-btn>
        <mat-btn size="small" variant="text" @click="close">
          关闭
        </mat-btn>
      </template>
    </mat-notification>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.notification-actions-slot-example {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
<!-- #endregion style -->
