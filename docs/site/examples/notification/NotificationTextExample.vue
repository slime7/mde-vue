<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(true);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="notification-text-example">
    <mat-btn variant="outlined" @click="open = true">
      重新显示
    </mat-btn>

    <mat-notification
      v-model="open"
      text="有 3 条消息等待处理。"
    />
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.notification-text-example {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
<!-- #endregion style -->
