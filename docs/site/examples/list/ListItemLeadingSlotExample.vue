<!-- #region template -->
<template>
  <mat-list aria-label="leading Slot" class="example-list">
    <mat-list-item>
      <template #leading>
        <mat-icon icon="person" aria-hidden="true" />
      </template>
      账户资料
    </mat-list-item>
  </mat-list>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-list {
  inline-size: 100%;
}
</style>
<!-- #endregion style -->
