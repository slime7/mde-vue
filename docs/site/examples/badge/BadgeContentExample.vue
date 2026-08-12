<!-- #region template -->
<template>
  <div class="badge-row">
    <mat-badge :content="3">
      <mat-icon icon="notifications" />
    </mat-badge>

    <mat-badge content="999+">
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
  gap: 48px;
}
</style>
<!-- #endregion style -->
