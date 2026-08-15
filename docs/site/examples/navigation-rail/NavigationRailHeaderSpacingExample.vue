<!-- #region template -->
<template>
  <div class="navigation-rail-header-spacing-example">
    <section>
      <mat-text type="label">
        无菜单、无 FAB
      </mat-text>
      <div class="navigation-rail-header-spacing-example-frame">
        <mat-navigation-rail expanded aria-label="无顶部操作导航">
          <mat-navigation-rail-item icon="home">
            首页
          </mat-navigation-rail-item>
          <mat-navigation-rail-item icon="folder">
            项目
          </mat-navigation-rail-item>
        </mat-navigation-rail>
      </div>
    </section>

    <section>
      <mat-text type="label">
        仅菜单
      </mat-text>
      <div class="navigation-rail-header-spacing-example-frame">
        <mat-navigation-rail expanded collapsible aria-label="仅菜单导航">
          <mat-navigation-rail-item icon="home">
            首页
          </mat-navigation-rail-item>
          <mat-navigation-rail-item icon="folder">
            项目
          </mat-navigation-rail-item>
        </mat-navigation-rail>
      </div>
    </section>

    <section>
      <mat-text type="label">
        仅 FAB
      </mat-text>
      <div class="navigation-rail-header-spacing-example-frame">
        <mat-navigation-rail expanded aria-label="仅 FAB 导航">
          <template #fab>
            <mat-fab size="small" icon="add" label="新建" />
          </template>

          <mat-navigation-rail-item icon="home">
            首页
          </mat-navigation-rail-item>
          <mat-navigation-rail-item icon="folder">
            项目
          </mat-navigation-rail-item>
        </mat-navigation-rail>
      </div>
    </section>

    <section>
      <mat-text type="label">
        菜单和 FAB
      </mat-text>
      <div class="navigation-rail-header-spacing-example-frame">
        <mat-navigation-rail expanded collapsible aria-label="菜单和 FAB 导航">
          <template #fab>
            <mat-fab size="small" icon="add" label="新建" />
          </template>

          <mat-navigation-rail-item icon="home">
            首页
          </mat-navigation-rail-item>
          <mat-navigation-rail-item icon="folder">
            项目
          </mat-navigation-rail-item>
        </mat-navigation-rail>
      </div>
    </section>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-rail-header-spacing-example {
  display: grid;
  inline-size: 100%;
  grid-template-columns: repeat(4, minmax(220px, 1fr));
  gap: 12px;
  overflow-x: auto;
}

.navigation-rail-header-spacing-example section {
  display: flex;
  block-size: 440px;
  min-inline-size: 220px;
  flex-direction: column;
  gap: 8px;
}

.navigation-rail-header-spacing-example-frame {
  min-block-size: 0;
  flex-grow: 1;
  overflow: hidden;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
}
</style>
<!-- #endregion style -->
