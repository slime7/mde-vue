<!-- #region template -->
<template>
  <div class="example-row">
    <mat-shape name="square" size="64" aria-label="收藏">
      <mat-icon icon="favorite" aria-hidden="true" />
    </mat-shape>
    <mat-shape name="heart" size="64" color="secondary-container">
      M3
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
</style>
<!-- #endregion style -->
