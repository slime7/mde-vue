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

    <div class="example-row">
      <div class="example-panel example-panel--primary-container">
        <mat-btn variant="text" color="on-primary-container">
          on-primary-container
        </mat-btn>
      </div>

      <div class="example-panel example-panel--surface">
        <mat-btn variant="text" color="on-surface">
          on-surface
        </mat-btn>
      </div>

      <div class="example-panel example-panel--surface-variant">
        <mat-btn variant="text" color="on-surface-variant">
          on-surface-variant
        </mat-btn>
      </div>
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

.example-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  min-inline-size: 168px;
  padding: 12px;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-medium);
}

.example-panel--primary-container {
  background: var(--mat-sys-color-primary-container);
}

.example-panel--surface {
  background: var(--mat-sys-color-surface);
}

.example-panel--surface-variant {
  background: var(--mat-sys-color-surface-variant);
}
</style>
<!-- #endregion style -->
