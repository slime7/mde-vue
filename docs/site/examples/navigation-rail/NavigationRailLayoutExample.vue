<!-- #region template -->
<template>
  <div class="navigation-rail-layout-example">
    <section>
      <h3>standard：占据空间</h3>
      <div class="navigation-rail-example-shell">
        <mat-navigation-rail
          expanded
          layout="standard"
          aria-label="标准导航"
        >
          <mat-navigation-rail-item icon="home">
            首页
          </mat-navigation-rail-item>
          <mat-navigation-rail-item icon="folder">
            项目
          </mat-navigation-rail-item>
        </mat-navigation-rail>
        <div class="navigation-rail-example-content">
          正文随 Rail 让位
        </div>
      </div>
    </section>

    <section>
      <h3>modal：覆盖正文</h3>
      <div class="navigation-rail-example-shell">
        <mat-navigation-rail
          expanded
          layout="modal"
          aria-label="模态导航"
        >
          <mat-navigation-rail-item icon="home">
            首页
          </mat-navigation-rail-item>
          <mat-navigation-rail-item icon="folder">
            项目
          </mat-navigation-rail-item>
        </mat-navigation-rail>
        <div class="navigation-rail-example-content">
          正文保持原位
        </div>
      </div>
    </section>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-rail-layout-example {
  display: grid;
  gap: 16px;
}

.navigation-rail-layout-example h3 {
  margin-block: 0 8px;
  font-size: 14px;
}

.navigation-rail-example-shell {
  display: flex;
  min-block-size: 220px;
  overflow: hidden;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
}

.navigation-rail-example-content {
  display: grid;
  flex: 1 1 auto;
  min-inline-size: 0;
  place-items: center;
  color: var(--mat-sys-color-on-surface-variant);
  background: var(--mat-sys-color-surface-container-low);
}
</style>
<!-- #endregion style -->
