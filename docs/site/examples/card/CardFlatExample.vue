<!-- #region template -->
<template>
  <div class="example-column">
    <mat-card>
      <mat-card-action-area>
        <mat-card-content>默认：悬停提升阴影</mat-card-content>
      </mat-card-action-area>
    </mat-card>
    <mat-card flat>
      <mat-card-action-area>
        <mat-card-content>flat：悬停不提升阴影</mat-card-content>
      </mat-card-action-area>
    </mat-card>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
  inline-size: 100%;
}
</style>
<!-- #endregion style -->
