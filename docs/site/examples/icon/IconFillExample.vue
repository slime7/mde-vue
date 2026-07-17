<!-- #region template -->
<template>
  <div class="example-row">
    <mat-icon icon="favorite" :fill="0" aria-hidden="true" />
    <mat-icon icon="favorite" :fill="0.5" aria-hidden="true" />
    <mat-icon icon="favorite" :fill="1" aria-hidden="true" />
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-row {
  display: flex;
  gap: 20px;
  align-items: center;
}
</style>
<!-- #endregion style -->
