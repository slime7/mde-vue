<!-- #region template -->
<template>
  <mat-app-root :fill-viewport="false" class="fab-menu-toolbar-example">
    <div class="fab-menu-toolbar-example__body">
      <h3>底部 Toolbar 与 Small FAB Menu</h3>
      <p>切换 Switch 可查看 Toolbar 在 docked 吸附与 floating-bottom 悬浮形态下的布局效果，右下角 small FAB Menu 始终保持良好协作。</p>

      <div class="fab-menu-toolbar-example__controls">
        <mat-switch v-model="isFloating">
          Toolbar 悬浮状态
        </mat-switch>
      </div>
    </div>

    <mat-toolbar
      app
      :variant="isFloating ? 'floating-bottom' : 'docked'"
    >
      <mat-btn variant="standard" prefix="menu">菜单</mat-btn>
      <mat-spacer />
      <mat-btn variant="standard" prefix="search">搜索</mat-btn>
    </mat-toolbar>

    <mat-fab-menu
      size="small"
      icon="add"
      label="新建内容"
      close-label="关闭"
    >
      <mat-btn size="small" prefix="edit" variant="filled">编辑草稿</mat-btn>
      <mat-btn size="small" prefix="photo" variant="filled">上传图片</mat-btn>
      <mat-btn size="small" prefix="description" variant="filled">创建文档</mat-btn>
    </mat-fab-menu>
  </mat-app-root>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const isFloating = ref(false);
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.fab-menu-toolbar-example {
  block-size: 380px;
  background: var(--mat-sys-color-surface-container-low);
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
}

.fab-menu-toolbar-example__body {
  padding: 24px;
}

.fab-menu-toolbar-example__body h3,
.fab-menu-toolbar-example__body p {
  margin: 0 0 12px;
}

.fab-menu-toolbar-example__controls {
  margin-block-start: 16px;
}
</style>
<!-- #endregion style -->
