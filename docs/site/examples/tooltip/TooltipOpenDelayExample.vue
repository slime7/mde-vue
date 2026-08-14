<!-- #region template -->
<template>
  <mat-tooltip
    content="指针进入 3 秒后显示"
    open-delay="3000"
  >
    <template #activator>
      <mat-btn variant="outlined">
        悬停后稍候
      </mat-btn>
    </template>
  </mat-tooltip>
</template>
<!-- #endregion template -->
