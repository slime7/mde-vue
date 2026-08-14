<!-- #region template -->
<template>
  <mat-tooltip
    content="移开指针 3 秒后关闭"
    close-delay="3000"
  >
    <template #activator>
      <mat-btn variant="outlined">
        悬停后移开
      </mat-btn>
    </template>
  </mat-tooltip>
</template>
<!-- #endregion template -->
