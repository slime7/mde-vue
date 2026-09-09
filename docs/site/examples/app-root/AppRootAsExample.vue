<!-- #region template -->
<template>
  <mat-app-root as="main" :fill-viewport="false" class="app-root-as-example">
    <h3>语义根标签</h3>
    <p>此实例的 AppRoot 根节点渲染为 main。</p>
  </mat-app-root>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.app-root-as-example {
  block-size: 180px;
  padding: 20px;
  overflow: hidden;
  background: var(--mat-sys-color-surface-container);
}

.app-root-as-example h3,
.app-root-as-example p {
  margin-block: 0 12px;
}
</style>
<!-- #endregion style -->
