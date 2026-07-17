<!-- #region script -->
<script setup>
import { ref } from 'vue';

const submitted = ref('尚未提交');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <form class="example-stack" @submit.prevent="submitted = 'submit 已触发'">
    <div class="example-row">
      <mat-btn type="submit">
        提交
      </mat-btn>
      <mat-btn type="reset" @click="submitted = 'reset 已触发'">
        重置
      </mat-btn>
    </div>
    <span>{{ submitted }}</span>
  </form>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}

.example-row {
  display: flex;
  gap: 12px;
}
</style>
<!-- #endregion style -->
