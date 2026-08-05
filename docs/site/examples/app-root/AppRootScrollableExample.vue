<!-- #region template -->
<template>
  <mat-app-root
    :fill-viewport="false"
    scrollable
    class="app-root-scrollable-example"
  >
    <article
      v-for="index in 8"
      :key="index"
      class="app-root-scrollable-example__item"
    >
      <h3>内部滚动内容 {{ index }}</h3>
      <p>滚动发生在 AppRoot 的正文层，外部文档保持原位。</p>
    </article>
  </mat-app-root>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.app-root-scrollable-example {
  block-size: 280px;
  background: var(--mat-sys-color-surface-container-low);
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
}

.app-root-scrollable-example__item {
  margin: 16px;
  padding: 16px;
  background: var(--mat-sys-color-surface-container);
  border-radius: var(--mat-sys-shape-corner-medium);
}

.app-root-scrollable-example__item h3,
.app-root-scrollable-example__item p {
  margin: 0;
}
</style>
<!-- #endregion style -->
