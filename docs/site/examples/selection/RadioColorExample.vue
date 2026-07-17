<!-- #region template -->
<template>
  <div class="example-stack">
    <mat-radio model-value="primary" value="primary" color="primary">
      primary
    </mat-radio>
    <mat-radio model-value="secondary" value="secondary" color="secondary">
      secondary
    </mat-radio>
    <mat-radio model-value="tertiary" value="tertiary" color="tertiary">
      tertiary
    </mat-radio>
    <mat-radio model-value="error" value="error" color="error">
      error
    </mat-radio>
    <mat-radio model-value="seed" value="seed" color="#6750a4">
      局部种子色
    </mat-radio>
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
