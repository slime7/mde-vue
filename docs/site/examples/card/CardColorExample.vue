<!-- #region template -->
<template>
  <div class="example-row">
    <mat-card color="primary">
      <mat-card-content>primary</mat-card-content>
    </mat-card>
    <mat-card color="secondary">
      <mat-card-content>secondary</mat-card-content>
    </mat-card>
    <mat-card color="tertiary">
      <mat-card-content>tertiary</mat-card-content>
    </mat-card>
    <mat-card color="error">
      <mat-card-content>error</mat-card-content>
    </mat-card>
    <mat-card color="#6750a4">
      <mat-card-content>局部种子色</mat-card-content>
    </mat-card>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.example-row > * {
  inline-size: min(100%, 180px);
}
</style>
<!-- #endregion style -->
