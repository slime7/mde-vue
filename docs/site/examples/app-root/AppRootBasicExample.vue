<!-- #region template -->
<template>
  <mat-app-root :fill-viewport="false" class="app-root-basic-example">
    <section class="app-root-basic-example__content">
      <h3>容器化应用区域</h3>
      <p>fillViewport=false 时，AppRoot 的高度由当前容器或内容决定。</p>
      <mat-btn>主要操作</mat-btn>
    </section>
  </mat-app-root>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.app-root-basic-example {
  min-block-size: 240px;
  overflow: hidden;
  background: var(--mat-sys-color-surface-container-low);
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
}

.app-root-basic-example__content {
  padding: 24px;
}

.app-root-basic-example__content h3,
.app-root-basic-example__content p {
  margin-block: 0 16px;
}
</style>
<!-- #endregion style -->
