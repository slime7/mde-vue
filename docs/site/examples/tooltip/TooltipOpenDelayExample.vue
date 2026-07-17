<!-- #region template -->
<template>
  <mat-tooltip
    content="指针进入 600ms 后显示"
    open-delay="600"
  >
    <template #activator>
      <mat-btn variant="outlined">
        悬停后稍候
      </mat-btn>
    </template>
  </mat-tooltip>
</template>
<!-- #endregion template -->
