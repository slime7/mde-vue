<!-- #region template -->
<template>
  <div class="example-stack">
    <mat-checkbox model-value color="primary">
      primary
    </mat-checkbox>
    <mat-checkbox model-value color="secondary">
      secondary
    </mat-checkbox>
    <mat-checkbox model-value color="tertiary">
      tertiary
    </mat-checkbox>
    <mat-checkbox model-value color="error">
      error
    </mat-checkbox>
    <mat-checkbox model-value color="#6750a4">
      局部种子色
    </mat-checkbox>
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
