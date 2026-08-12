<!-- #region template -->
<template>
  <mat-btn id="tooltip-rich-target" variant="outlined">
    查看新功能
  </mat-btn>

  <mat-tooltip
    content="现在可以为常用设置创建快捷入口。"
    subhead="快捷设置"
    target="#tooltip-rich-target"
  >
    <template #action>
      <mat-btn variant="text">
        了解详情
      </mat-btn>
      <mat-btn variant="text">
        知道了
      </mat-btn>
    </template>
  </mat-tooltip>
</template>
<!-- #endregion template -->
