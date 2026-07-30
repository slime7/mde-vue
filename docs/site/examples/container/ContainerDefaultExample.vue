<!-- #region template -->
<template>
  <mat-container class="container-default-example">
    <section class="container-default-example__body">
      <h3>受限的正文区域</h3>

      <p>
        默认 Container 在宽屏将正文限制在 1040px 内，并在两侧保留可用空间。
      </p>
    </section>
  </mat-container>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.container-default-example {
  background: var(--mat-sys-color-surface-container-low);
}

.container-default-example__body {
  padding: 24px;
  color: var(--mat-sys-color-on-surface);
  background: var(--mat-sys-color-surface-container-highest);
  border-radius: var(--mat-sys-shape-corner-large);
}

.container-default-example__body h3,
.container-default-example__body p {
  margin: 0;
}

.container-default-example__body p {
  margin-block-start: 8px;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
