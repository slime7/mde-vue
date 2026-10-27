<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(true);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="notification-time-example">
    <mat-btn variant="outlined" @click="open = true">
      重新显示
    </mat-btn>

    <mat-notification
      v-model="open"
      text="下载目录中的安装包已更新。"
      time="2 分钟前"
      title="发现新版本"
    />
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.notification-time-example {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
<!-- #endregion style -->
