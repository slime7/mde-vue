<!-- #region template -->
<template>
  <div class="container-height-example">
    <header class="container-height-example__header">
      页面工具栏
    </header>

    <mat-container class="container-height-example__container">
      <section class="container-height-example__content">
        <div class="container-height-example__workspace">
          <h3>弹性工作区</h3>

          <p>此区域占据剩余高度，并在内容溢出时独立滚动。</p>

          <ul>
            <li>工作区内容 1</li>
            <li>工作区内容 2</li>
            <li>工作区内容 3</li>
            <li>工作区内容 4</li>
            <li>工作区内容 5</li>
            <li>工作区内容 6</li>
          </ul>
        </div>

        <footer class="container-height-example__footer">
          底部固定区域
        </footer>
      </section>
    </mat-container>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.container-height-example {
  display: flex;
  flex-direction: column;
  block-size: 320px;
  overflow: hidden;
  background: var(--mat-sys-color-surface-container-low);
  border-radius: var(--mat-sys-shape-corner-large);
}

.container-height-example__header {
  flex-shrink: 0;
  padding: 16px 24px;
  color: var(--mat-sys-color-on-primary-container);
  background: var(--mat-sys-color-primary-container);
  font: var(--mat-sys-typescale-title-medium);
}

.container-height-example__container {
  flex: 1;
  min-block-size: 0;
}

.container-height-example__content {
  display: flex;
  flex-direction: column;
  block-size: 100%;
  min-block-size: 0;
  color: var(--mat-sys-color-on-surface);
  background: var(--mat-sys-color-surface-container-highest);
}

.container-height-example__workspace {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
  min-block-size: 0;
  padding: 20px 24px;
  overflow: auto;
}

.container-height-example__workspace h3,
.container-height-example__workspace p {
  margin: 0;
}

.container-height-example__workspace ul {
  margin: 0;
  padding-inline-start: 24px;
}

.container-height-example__footer {
  flex-shrink: 0;
  padding: 12px 24px;
  color: var(--mat-sys-color-on-secondary-container);
  background: var(--mat-sys-color-secondary-container);
}
</style>
<!-- #endregion style -->
