<!-- #region template -->
<template>
  <div class="example-col">
    <div class="example-row">
      <mat-btn color="primary">
        primary
      </mat-btn>
      <mat-btn color="secondary">
        secondary
      </mat-btn>
      <mat-btn color="tertiary">
        tertiary
      </mat-btn>
      <mat-btn color="error">
        error
      </mat-btn>
      <mat-btn color="primary-container">
        primary-container
      </mat-btn>
      <mat-btn color="secondary-container">
        secondary-container
      </mat-btn>
      <mat-btn color="surface-container">
        surface-container
      </mat-btn>
      <mat-btn color="surface-container-high">
        surface-container-high
      </mat-btn>
      <mat-btn color="#6750a4">
        局部种子色
      </mat-btn>
    </div>

    <div class="example-row example-row--container">
      <mat-btn variant="text" color="on-primary-container">
        on-primary-container
      </mat-btn>
      <mat-btn variant="text" color="on-surface">
        on-surface
      </mat-btn>
      <mat-btn variant="text" color="on-surface-variant">
        on-surface-variant
      </mat-btn>
    </div>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.example-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.example-row--container {
  padding: 12px;
  background: var(--mat-sys-color-primary-container);
  border-radius: var(--mat-sys-shape-corner-medium);
}
</style>
<!-- #endregion style -->
