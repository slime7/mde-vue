<!-- #region template -->
<template>
  <div class="toolbar-bottom-placeholder-example">
    <p>bottomPlaceholder 只增加底部手势条或安全区空间，不会开启自然布局占位。</p>

    <mat-toolbar bottom-placeholder="env(safe-area-inset-bottom)">
      <mat-btn variant="standard">
        取消
      </mat-btn>
      <mat-spacer />
      <mat-btn variant="standard">
        保存
      </mat-btn>
    </mat-toolbar>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.toolbar-bottom-placeholder-example {
  min-block-size: 180px;
}
</style>
<!-- #endregion style -->
