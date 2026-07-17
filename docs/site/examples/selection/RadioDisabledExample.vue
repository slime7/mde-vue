<!-- #region template -->
<template>
  <div class="example-stack">
    <mat-radio model-value="enabled" value="enabled">
      启用
    </mat-radio>
    <mat-radio model-value="disabled" value="disabled" disabled>
      禁用
    </mat-radio>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-stack {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}
</style>
<!-- #endregion style -->
