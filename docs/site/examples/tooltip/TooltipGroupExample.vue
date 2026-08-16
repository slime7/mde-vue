<!-- #region template -->
<template>
  <div data-mat-tooltip-group class="tooltip-group-switch">
    <mat-tooltip content="同组第一个，600ms 后显示">
      <template #activator>
        <mat-btn variant="outlined">
          600ms 延迟
        </mat-btn>
      </template>
    </mat-tooltip>
    <mat-tooltip content="同组第二个，3000ms 后显示">
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
.tooltip-group-switch {
  display: flex;
  gap: 8px;
}
</style>
<!-- #endregion style -->
