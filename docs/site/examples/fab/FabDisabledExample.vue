<!-- #region template -->
<template>
  <div class="example-row">
    <mat-fab
      disabled
      icon="add"
      label="创建"
    />
    <mat-fab
      disabled
      icon="edit"
    >
      编辑
    </mat-fab>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
</style>
<!-- #endregion style -->
