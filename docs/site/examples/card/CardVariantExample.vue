<!-- #region template -->
<template>
  <div class="example-row">
    <mat-card variant="elevated">
      <mat-card-content>elevated</mat-card-content>
    </mat-card>
    <mat-card variant="filled">
      <mat-card-content>filled</mat-card-content>
    </mat-card>
    <mat-card variant="outlined">
      <mat-card-content>outlined</mat-card-content>
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
