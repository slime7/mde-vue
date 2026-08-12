<!-- #region template -->
<template>
  <div class="badge-row">
    <mat-badge dot>
      <mat-icon icon="notifications" />
    </mat-badge>

    <mat-badge dot>
      <mat-btn icon="mail" label="收件箱" variant="standard" />
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
