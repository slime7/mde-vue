<!-- #region template -->
<template>
  <mat-layout class="layout-basic-example">
    <mat-aside location="top" :block-size="52" bordered class="layout-basic-example__top">
      <div class="layout-basic-example__top-content">
        <strong>顶部标题栏</strong>
      </div>
    </mat-aside>

    <mat-aside location="left" :block-size="160" bordered class="layout-basic-example__left">
      <div class="layout-basic-example__nav-content">
        <span>导航项 1</span>
        <span>导航项 2</span>
      </div>
    </mat-aside>

    <main class="layout-basic-example__main">
      <h3>MatLayout 容器</h3>
      <p>在任意卡片或局部区域内搭建由 Aside 边缘栏与正文构成的协调布局系统。</p>
    </main>
  </mat-layout>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.layout-basic-example {
  min-block-size: 220px;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-medium);
  overflow: hidden;
}

.layout-basic-example__top {
  background: var(--mat-sys-color-surface-container);
  color: var(--mat-sys-color-on-surface);
}

.layout-basic-example__left {
  background: var(--mat-sys-color-surface-container-low);
  color: var(--mat-sys-color-on-surface);
}

.layout-basic-example__top-content {
  display: flex;
  align-items: center;
  padding-inline: 16px;
  block-size: 100%;
}

.layout-basic-example__nav-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
}

.layout-basic-example__main {
  padding: 24px;
  color: var(--mat-sys-color-on-surface);
}

.layout-basic-example__main h3,
.layout-basic-example__main p {
  margin: 0;
}

.layout-basic-example__main p {
  margin-block-start: 8px;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->


