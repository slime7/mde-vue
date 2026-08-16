<!-- #region template -->
<template>
  <div class="tooltip-quick-switch">
    <mat-tooltip
      content="第一个，600ms 后显示"
      open-delay="600"
    >
      <template #activator>
        <mat-btn variant="outlined">
          600ms 延迟
        </mat-btn>
      </template>
    </mat-tooltip>
    <mat-tooltip
      content="第二个，3000ms 后显示"
      open-delay="3000"
    >
      <template #activator>
        <mat-btn variant="outlined">
          3000ms 延迟
        </mat-btn>
      </template>
    </mat-tooltip>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.tooltip-quick-switch {
  display: flex;
  gap: 8px;
}
</style>
<!-- #endregion style -->
