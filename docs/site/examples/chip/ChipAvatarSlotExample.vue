<!-- #region template -->
<template>
  <mat-chip variant="input">
    <template #avatar>
      <span class="avatar">林</span>
    </template>
    林晓
  </mat-chip>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.avatar {
  display: inline-grid;
  color: var(--mat-sys-color-on-primary-container);
  background: var(--mat-sys-color-primary-container);
  place-items: center;
}
</style>
<!-- #endregion style -->
