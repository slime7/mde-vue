<!-- #region template -->
<template>
  <div class="example-row">
    <mat-btn icon="star" label="窄宽度" width="narrow" />
    <mat-btn icon="star" label="等宽" width="uniform" />
    <mat-btn icon="star" label="宽宽度" width="wide" />
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
</style>
<!-- #endregion style -->
