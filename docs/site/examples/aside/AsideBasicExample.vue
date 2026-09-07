<!-- #region template -->
<template>
  <mat-layout class="aside-basic-example">
    <mat-aside
      location="left"
      :block-size="160"
      bordered
      class="aside-basic-example__aside"
    >
      <div class="aside-basic-example__nav">
        <strong>侧边栏</strong>
        <span>固定 160px</span>
      </div>
    </mat-aside>

    <div class="aside-basic-example__content">
      <h3>基础边缘布局</h3>
      <p>Aside 组件自动停靠于指定边缘，并在 Layout 容器内避让正文内容。</p>
    </div>
  </mat-layout>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.aside-basic-example {
  min-block-size: 180px;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-medium);
  overflow: hidden;
}

.aside-basic-example__aside {
  background: var(--mat-sys-color-surface-container);
  color: var(--mat-sys-color-on-surface);
}

.aside-basic-example__nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
}

.aside-basic-example__content {
  padding: 24px;
  color: var(--mat-sys-color-on-surface);
}

.aside-basic-example__content h3,
.aside-basic-example__content p {
  margin: 0;
}

.aside-basic-example__content p {
  margin-block-start: 8px;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
