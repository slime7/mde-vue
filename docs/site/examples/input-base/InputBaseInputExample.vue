<!-- #region template -->
<template>
  <label class="input-base-example-control">
    <span>搜索</span>
    <mat-input-base
      v-model="value"
      control="input"
      type="search"
      placeholder="输入关键词"
      aria-label="搜索"
    />
  </label>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const value = ref('Material');
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.input-base-example-control {
  display: flex;
  flex-direction: column;
  gap: 8px;
  inline-size: 100%;
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
