<!-- #region template -->
<template>
  <div class="example-row">
    <mat-shape as="span" name="circle">
      span
    </mat-shape>
    <mat-shape as="figure" name="square">
      figure
    </mat-shape>
    <mat-shape as="section" name="pill">
      section
    </mat-shape>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}

.example-row :deep(.mat-shape) {
  font-size: 10px;
}
</style>
<!-- #endregion style -->
