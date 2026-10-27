<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="notification-model-value-example">
    <mat-btn @click="open = true">
      显示通知
    </mat-btn>

    <mat-notification
      v-model="open"
      text="mde-vue 已更新到最新版本。"
      title="更新完成"
    />
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.notification-model-value-example {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
<!-- #endregion style -->
