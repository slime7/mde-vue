<!-- #region template -->
<template>
  <mat-container fluid class="container-fluid-example">
    <section class="container-fluid-example__body">
      <h3>铺满的正文区域</h3>

      <p>
        fluid 仅取消正文最大宽度，外层仍按视口断点保留水平内边距。
      </p>
    </section>
  </mat-container>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.container-fluid-example__body {
  padding: 24px;
  color: var(--mat-sys-color-on-secondary-container);
  background: var(--mat-sys-color-secondary-container);
  border-radius: var(--mat-sys-shape-corner-large);
}

.container-fluid-example__body h3,
.container-fluid-example__body p {
  margin: 0;
}

.container-fluid-example__body p {
  margin-block-start: 8px;
}
</style>
<!-- #endregion style -->
