<!-- #region template -->
<template>
  <div class="ripple-default-example">
    <mat-btn v-ripple>
      涟漪按钮
    </mat-btn>
    <span>mat-btn 自带状态层，涟漪绘制在它之上表达按压反馈。</span>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.ripple-default-example {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.ripple-default-example span {
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
