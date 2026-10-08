<!-- #region template -->
<template>
  <div class="example-stack">
    <mat-select
      model-value="选项 1"
      label="默认最大宽度（488px）"
      :items="items"
    />
    <mat-select
      block
      model-value="选项 2"
      label="启用 block 铺满容器"
      :items="items"
    />
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
const items = ['选项 1', '选项 2', '选项 3'];
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.example-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
  inline-size: 100%;
}
</style>
<!-- #endregion style -->
