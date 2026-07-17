<!-- #region template -->
<template>
  <div class="example-stack">
    <mat-split-btn size="extra-small">
      <template #leading>
        <mat-btn>XS</mat-btn>
      </template>
      <template #trailing>
        <mat-btn icon="arrow_drop_down" label="展开" />
      </template>
    </mat-split-btn>
    <mat-split-btn size="small">
      <template #leading>
        <mat-btn>S</mat-btn>
      </template><template #trailing>
        <mat-btn icon="arrow_drop_down" label="展开" />
      </template>
    </mat-split-btn>
    <mat-split-btn size="medium">
      <template #leading>
        <mat-btn>M</mat-btn>
      </template><template #trailing>
        <mat-btn icon="arrow_drop_down" label="展开" />
      </template>
    </mat-split-btn>
    <mat-split-btn size="large">
      <template #leading>
        <mat-btn>L</mat-btn>
      </template><template #trailing>
        <mat-btn icon="arrow_drop_down" label="展开" />
      </template>
    </mat-split-btn>
    <mat-split-btn size="extra-large">
      <template #leading>
        <mat-btn>XL</mat-btn>
      </template><template #trailing>
        <mat-btn icon="arrow_drop_down" label="展开" />
      </template>
    </mat-split-btn>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
</style>
<!-- #endregion style -->
