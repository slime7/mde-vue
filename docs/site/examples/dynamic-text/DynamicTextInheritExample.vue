<!-- #region template -->
<template>
  <div class="example">
    <h2 class="heading">
      <mat-dynamic-text text="标题动态文字" />
    </h2>

    <p class="body">
      <mat-dynamic-text text="正文动态文字" />
    </p>

    <span class="badge">
      <mat-dynamic-text text="新" />
    </span>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example {
  display: grid;
  gap: 24px;
  justify-items: start;
}

.heading {
  margin: 0;
  color: var(--mat-sys-color-primary);
  font-family: var(--mat-sys-typescale-headline-large-font);
  font-size: var(--mat-sys-typescale-headline-large-size);
  font-weight: var(--mat-sys-typescale-headline-large-weight);
  line-height: var(--mat-sys-typescale-headline-large-line-height);
}

.body {
  margin: 0;
  color: var(--mat-sys-color-on-surface);
  font-family: var(--mat-sys-typescale-body-large-font);
  font-size: var(--mat-sys-typescale-body-large-size);
  font-weight: var(--mat-sys-typescale-body-large-weight);
  line-height: var(--mat-sys-typescale-body-large-line-height);
}

.badge {
  padding: 4px 12px;
  color: var(--mat-sys-color-on-secondary-container);
  font-family: var(--mat-sys-typescale-label-large-font);
  font-size: var(--mat-sys-typescale-label-large-size);
  font-weight: var(--mat-sys-typescale-label-large-weight);
  line-height: var(--mat-sys-typescale-label-large-line-height);
  background: var(--mat-sys-color-secondary-container);
  border-radius: var(--mat-sys-shape-corner-full);
}
</style>
<!-- #endregion style -->
