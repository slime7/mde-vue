<!-- #region template -->
<template>
  <div class="example-stack">
    <mat-switch model-value color="primary">
      primary
    </mat-switch>
    <mat-switch model-value color="secondary">
      secondary
    </mat-switch>
    <mat-switch model-value color="tertiary">
      tertiary
    </mat-switch>
    <mat-switch model-value color="error">
      error
    </mat-switch>
    <mat-switch model-value color="#6750a4">
      局部种子色
    </mat-switch>
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
