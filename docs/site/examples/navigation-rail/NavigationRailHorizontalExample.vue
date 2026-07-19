<!-- #region template -->
<template>
  <div class="navigation-bar-example-shell">
    <mat-navigation-rail
      expanded
      orientation="horizontal"
      aria-label="底部导航"
    >
      <mat-navigation-rail-item icon="home">
        首页
      </mat-navigation-rail-item>
      <mat-navigation-rail-item icon="search">
        搜索
      </mat-navigation-rail-item>
      <mat-navigation-rail-item icon="person">
        我的
      </mat-navigation-rail-item>
    </mat-navigation-rail>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-bar-example-shell {
  display: flex;
  min-block-size: 120px;
  align-items: end;
  overflow: hidden;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
}
</style>
<!-- #endregion style -->
