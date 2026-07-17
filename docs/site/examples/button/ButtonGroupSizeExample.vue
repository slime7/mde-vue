<!-- #region template -->
<template>
  <div class="example-row">
    <mat-btn-group size="extra-small">
      <mat-btn>XS</mat-btn><mat-btn>组</mat-btn>
    </mat-btn-group>
    <mat-btn-group size="small">
      <mat-btn>S</mat-btn><mat-btn>组</mat-btn>
    </mat-btn-group>
    <mat-btn-group size="medium">
      <mat-btn>M</mat-btn><mat-btn>组</mat-btn>
    </mat-btn-group>
    <mat-btn-group size="large">
      <mat-btn>L</mat-btn><mat-btn>组</mat-btn>
    </mat-btn-group>
    <mat-btn-group size="extra-large">
      <mat-btn>XL</mat-btn><mat-btn>组</mat-btn>
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
