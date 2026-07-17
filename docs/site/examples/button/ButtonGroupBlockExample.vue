<!-- #region template -->
<template>
  <div class="example-stack">
    <mat-btn-group>
      <mat-btn>普通组</mat-btn>
      <mat-btn>按钮</mat-btn>
    </mat-btn-group>
    <mat-btn-group block>
      <mat-btn>块级组</mat-btn>
      <mat-btn>按钮</mat-btn>
    </mat-btn-group>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  inline-size: min(100%, 360px);
}
</style>
<!-- #endregion style -->
