<!-- #region template -->
<template>
  <mat-app-root :fill-viewport="false" class="fab-menu-app-example">
    <p>支持通过 trigger Slot 自定义触发器内容。</p>

    <mat-fab-menu
      close-label="收起菜单"
    >
      <template #trigger="{ open, toggle }">
        <mat-btn
          :icon="open ? 'close' : 'menu'"
          variant="filled"
          @click="toggle"
        >
          {{ open ? '关闭' : '操作' }}
        </mat-btn>
      </template>

      <mat-btn prefix="bookmark" variant="filled">
        收藏页面
      </mat-btn>
      <mat-btn prefix="share" variant="filled">
        分享内容
      </mat-btn>
    </mat-fab-menu>
  </mat-app-root>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.fab-menu-app-example {
  block-size: 380px;
}

.fab-menu-app-example p {
  margin: 0;
}
</style>
<!-- #endregion style -->
