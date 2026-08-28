<!-- #region template -->
<template>
  <div class="example-stack">
    <mat-text-field label="搜索">
      <template #trailing>
        <mat-btn icon="search" label="搜索" size="small" variant="standard" />
      </template>
    </mat-text-field>

    <mat-text-field label="价格">
      <template #trailing>
        <mat-icon icon="currency_yuan" aria-hidden="true" />
      </template>
    </mat-text-field>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
  inline-size: 100%;
}
</style>
<!-- #endregion style -->
