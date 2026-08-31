<!-- #region template -->
<template>
  <mat-app-root :fill-viewport="false" class="fab-menu-app-example">
    <p>点击主 FAB 向上展开操作列表，点击内部按钮自动收起。</p>

    <mat-fab-menu
      icon="add"
      label="新建内容"
      close-icon="close"
      close-label="关闭"
    >
      <mat-btn prefix="edit" variant="filled">
        编辑草稿
      </mat-btn>
      <mat-btn prefix="photo" variant="filled">
        上传图片
      </mat-btn>
      <mat-btn prefix="description" variant="filled">
        创建文档
      </mat-btn>
    </mat-fab-menu>
  </mat-app-root>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.fab-menu-app-example {
  block-size: 380px;
  padding: 24px;
  background: var(--mat-sys-color-surface-container-low);
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
}

.fab-menu-app-example p {
  margin: 0;
}
</style>
<!-- #endregion style -->
