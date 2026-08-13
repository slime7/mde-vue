<!-- #region template -->
<template>
  <div class="example-row">
    <mat-shape size="32" aria-hidden="true" />
    <mat-shape size="48" name="square" aria-hidden="true" />
    <mat-shape size="64" name="flower" aria-hidden="true" />
    <mat-shape size="5rem" name="heart" aria-hidden="true" />
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
