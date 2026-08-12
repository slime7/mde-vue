<!-- #region template -->
<template>
  <mat-badge
    content="12"
    :offset="{ inline: 8, block: -4 }"
  >
    <span class="chart" aria-label="示例柱状图">
      <i />
      <i />
      <i />
    </span>
  </mat-badge>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.chart {
  display: flex;
  min-inline-size: 112px;
  min-block-size: 72px;
  align-items: end;
  gap: 8px;
  padding: 12px;
  background: var(--mat-sys-color-surface-container);
  border-radius: var(--mat-sys-shape-corner-medium);
}

.chart i {
  inline-size: 24px;
  background: var(--mat-sys-color-primary);
  border-radius: 8px 8px 0 0;
}

.chart i:nth-child(1) { block-size: 24px; }

.chart i:nth-child(2) { block-size: 48px; }

.chart i:nth-child(3) { block-size: 36px; }
</style>
<!-- #endregion style -->
