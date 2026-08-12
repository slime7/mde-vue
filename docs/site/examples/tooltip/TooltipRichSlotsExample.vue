<!-- #region template -->
<template>
  <mat-btn id="tooltip-rich-slots-target" variant="outlined">
    查看说明
  </mat-btn>

  <mat-tooltip rich target="#tooltip-rich-slots-target">
    <template #subhead>
      自定义标题
    </template>

    默认 Slot 可以放置包含链接的详细说明。

    <template #action>
      <mat-btn variant="text">
        打开帮助
      </mat-btn>
    </template>
  </mat-tooltip>
</template>
<!-- #endregion template -->
