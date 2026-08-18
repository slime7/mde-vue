<!-- #region template -->
<template>
  <p>无容器</p>
  <mat-loading aria-label="正在更新页面" />

  <p>含容器</p>
  <mat-loading containment aria-label="正在同步内容" />

  <p>含容器 + 局部配色</p>
  <mat-loading containment color="tertiary" aria-label="正在处理任务" />
</template>
<!-- #endregion template -->
