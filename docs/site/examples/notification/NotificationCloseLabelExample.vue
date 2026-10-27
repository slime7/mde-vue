<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(true);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="notification-close-label-example">
    <div class="notification-close-label-example__controls">
      <mat-btn variant="outlined" @click="open = true">
        重新显示
      </mat-btn>
      <span>关闭按钮的可访问名称是“关闭系统通知”。</span>
    </div>

    <mat-notification
      v-model="open"
      close-label="关闭系统通知"
      text="使用 close-label 覆盖默认的关闭名称。"
      title="自定义关闭名称"
    />
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.notification-close-label-example {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.notification-close-label-example__controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
<!-- #endregion style -->
