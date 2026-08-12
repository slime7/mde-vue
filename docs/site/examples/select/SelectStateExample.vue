<!-- #region script -->
<script setup>
const items = ['甲', '乙', '丙'];
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="select-example-grid">
    <mat-select model-value="甲" label="只读" :items="items" readonly />
    <mat-select model-value="乙" label="禁用" :items="items" disabled />
    <mat-select
      :model-value="null"
      label="必选"
      error-text="请选择一个项目"
      :items="items"
      error
      required
    />
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.select-example-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: 24px;
  inline-size: 100%;
}
</style>
<!-- #endregion style -->
