<!-- #region template -->
<template>
  <div class="example-stack">
    <mat-split-btn>
      <template #leading>
        <mat-btn>普通宽度</mat-btn>
      </template>
      <template #trailing>
        <mat-btn icon="arrow_drop_down" label="展开" />
      </template>
    </mat-split-btn>
    <mat-split-btn block>
      <template #leading>
        <mat-btn>块级宽度</mat-btn>
      </template>
      <template #trailing>
        <mat-btn icon="arrow_drop_down" label="展开" />
      </template>
    </mat-split-btn>
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
