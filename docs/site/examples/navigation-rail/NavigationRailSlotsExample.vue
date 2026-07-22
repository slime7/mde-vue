<!-- #region template -->
<template>
  <div class="navigation-rail-example-shell">
    <mat-navigation-rail
      expanded
      aria-label="带扩展内容的导航"
    >
      <template #header>
        <mat-icon icon="timer" class="navigation-rail-example-logo" />
      </template>

      <template #fab>
        <mat-fab icon="add" label="新建" />
      </template>

      <mat-navigation-rail-item icon="inbox">
        收件箱
      </mat-navigation-rail-item>
      <mat-navigation-rail-item icon="star">
        收藏
      </mat-navigation-rail-item>

      <template #end>
        <mat-btn icon="help" label="帮助" />
      </template>
    </mat-navigation-rail>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-rail-example-shell {
  display: flex;
  inline-size: 100%;
  min-block-size: 280px;
  overflow: hidden;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
}

.navigation-rail-example-logo {
  margin-inline: 12px;
  color: var(--mat-sys-color-primary);
}
</style>
<!-- #endregion style -->
