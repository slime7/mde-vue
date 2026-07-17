<!-- #region script -->
<script setup>
import { ref } from 'vue';

const newsletter = ref(true);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example-stack">
    <mat-checkbox v-model="newsletter">
      接收更新邮件
    </mat-checkbox>
    <span>当前值：{{ newsletter }}</span>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-stack {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}
</style>
<!-- #endregion style -->
