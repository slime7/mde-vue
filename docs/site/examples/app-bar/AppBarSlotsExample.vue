<!-- #region template -->
<template>
  <mat-app-bar class="app-bar-slots-example" variant="medium-flexible">
    项目工作区

    <template #leading>
      <mat-btn icon="menu" label="菜单" size="small" variant="standard" />
    </template>

    <template #subtitle>
      3 个成员正在编辑
    </template>

    <template #trailing>
      <mat-btn icon="share" label="分享" size="small" variant="filled-tonal" />
      <mat-btn icon="more_vert" label="更多" size="small" variant="standard" />
    </template>
  </mat-app-bar>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.app-bar-slots-example {
  position: static;
  overflow: hidden;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
}
</style>
<!-- #endregion style -->
