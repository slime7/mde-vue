<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(true);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="notification-default-slot-example">
    <mat-btn variant="outlined" @click="open = true">
      重新显示
    </mat-btn>

    <mat-notification v-model="open" title="同步完成">
      <p class="notification-default-slot-example__body">
        已同步 <strong>12</strong> 个文件，没有发现冲突。
      </p>
    </mat-notification>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.notification-default-slot-example {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.notification-default-slot-example__body {
  margin: 0;
}
</style>
<!-- #endregion style -->
