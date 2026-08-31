<!-- #region template -->
<template>
  <div class="example-row">
    <mat-btn>
      默认变形 (morph)
    </mat-btn>
    <mat-btn :morph="false">
      禁用变形 (:morph="false")
    </mat-btn>
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
