<!-- #region template -->
<template>
  <div class="badge-row">
    <mat-badge location="inline" content="Error" />
    <mat-badge location="inline" content="Primary" color="primary" />
    <mat-badge location="inline" content="Custom" color="#6750A4" />
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.badge-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}
</style>
<!-- #endregion style -->
