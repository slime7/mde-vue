<!-- #region template -->
<template>
  <label class="input-base-example-control">
    <span>说明</span>
    <mat-input-base
      v-model="value"
      control="textarea"
      :rows="4"
      maxlength="120"
      aria-label="说明"
    />
  </label>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const value = ref('使用方可以完全自定义输入容器、标签和校验提示。');
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.input-base-example-control {
  display: flex;
  flex-direction: column;
  gap: 8px;
  inline-size: min(100%, 420px);
}

.input-base-example-control > span {
  font-weight: 600;
}

.input-base-example-control :deep(.mat-input-base) {
  padding: 12px;
  border: 1px solid currentcolor;
  border-radius: 8px;
}
</style>
<!-- #endregion style -->
