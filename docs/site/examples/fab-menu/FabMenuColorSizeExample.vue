<!-- #region template -->
<template>
  <div class="fab-menu-color-size-grid">
    <mat-app-root :fill-viewport="false" class="fab-menu-mini-app">
      <p>small (56px) / tertiary</p>

      <mat-fab-menu
        size="small"
        color="tertiary"
        icon="palette"
        label="调色板"
      >
        <mat-btn size="small" prefix="brush" variant="filled" color="tertiary-container">
          画笔
        </mat-btn>
        <mat-btn size="small" prefix="colorize" variant="filled" color="tertiary-container">
          取色
        </mat-btn>
      </mat-fab-menu>
    </mat-app-root>

    <mat-app-root :fill-viewport="false" class="fab-menu-mini-app">
      <p>medium (80px) / primary</p>

      <mat-fab-menu
        size="medium"
        color="primary"
        icon="add"
        label="新建"
      >
        <mat-btn prefix="folder" variant="filled" color="primary-container">
          新建文件夹
        </mat-btn>
        <mat-btn prefix="upload_file" variant="filled" color="primary-container">
          上传文件
        </mat-btn>
      </mat-fab-menu>
    </mat-app-root>

    <mat-app-root :fill-viewport="false" class="fab-menu-mini-app">
      <p>large (96px) / secondary</p>

      <mat-fab-menu
        size="large"
        color="secondary"
        icon="edit"
        label="编辑"
      >
        <mat-btn prefix="draw" variant="filled" color="secondary-container">
          涂鸦草稿
        </mat-btn>
        <mat-btn prefix="crop" variant="filled" color="secondary-container">
          裁剪画面
        </mat-btn>
      </mat-fab-menu>
    </mat-app-root>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.fab-menu-color-size-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.fab-menu-mini-app {
  block-size: 360px;
}

.fab-menu-mini-app p {
  margin: 0;
  font-size: 14px;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
