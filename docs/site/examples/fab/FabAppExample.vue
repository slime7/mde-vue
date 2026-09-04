<!-- #region template -->
<template>
  <mat-app-root :fill-viewport="false" class="fab-app-example">
    <p>三个 FAB 自动进入 AppRoot 浮动组，并按逻辑轴对齐。</p>
    <mat-fab app position="start" icon="format_align_left" label="起始对齐" />
    <mat-fab app position="center" icon="format_align_center" label="居中对齐" />
    <mat-fab app position="end" icon="format_align_right" label="末尾对齐" />
  </mat-app-root>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.fab-app-example {
  block-size: 360px;
}

.fab-app-example p {
  margin: 0;
}
</style>
<!-- #endregion style -->
