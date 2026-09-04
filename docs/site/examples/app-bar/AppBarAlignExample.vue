<!-- #region template -->
<template>
  <div class="app-bar-align-example">
    <mat-app-bar align="start">
      起始对齐

      <template #leading>
        <mat-btn icon="menu" label="菜单" size="small" variant="standard" />
      </template>

      <template #trailing>
        <mat-btn icon="more_vert" label="更多" size="small" variant="standard" />
      </template>
    </mat-app-bar>

    <mat-app-bar align="center">
      居中对齐

      <template #leading>
        <mat-btn icon="arrow_back" label="返回" size="small" variant="standard" />
      </template>

      <template #trailing>
        <mat-btn icon="favorite" label="收藏" size="small" variant="standard" />
      </template>
    </mat-app-bar>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.app-bar-align-example {
  display: flex;
  inline-size: 100%;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  overflow: hidden;
}

.app-bar-align-example :deep(.mat-app-bar) {
  position: static;
}
</style>
<!-- #endregion style -->
