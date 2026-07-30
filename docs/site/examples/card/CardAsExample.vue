<!-- #region template -->
<template>
  <div class="example-row">
    <mat-card as="article">
      <mat-card-content>article</mat-card-content>
    </mat-card>
    <mat-card as="section">
      <mat-card-content>section</mat-card-content>
    </mat-card>
    <mat-card as="li">
      <mat-card-content>li</mat-card-content>
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
  inline-size: 100%;
}
</style>
<!-- #endregion style -->
