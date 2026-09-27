<!-- #region template -->
<template>
  <div class="badge-row">
    <mat-badge dot>
      <mat-icon icon="notifications" />
    </mat-badge>

    <mat-badge dot border>
      <mat-icon icon="notifications" />
    </mat-badge>

    <mat-badge :content="12">
      <mat-icon icon="mail" />
    </mat-badge>

    <mat-badge :content="12" border>
      <mat-icon icon="mail" />
    </mat-badge>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.badge-row {
  display: flex;
  align-items: center;
  gap: 32px;
}
</style>
<!-- #endregion style -->
