<!-- #region template -->
<template>
  <div class="example-row">
    <mat-btn-group shape="round">
      <mat-btn>round</mat-btn><mat-btn>组</mat-btn>
    </mat-btn-group>
    <mat-btn-group shape="square">
      <mat-btn>square</mat-btn><mat-btn>组</mat-btn>
    </mat-btn-group>
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
