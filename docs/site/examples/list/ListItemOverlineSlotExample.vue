<!-- #region template -->
<template>
  <mat-list variant="standard" aria-label="overline Slot" class="example-list">
    <mat-list-item :lines="3">
      <template #overline>
        最近更新
      </template>
      项目说明
    </mat-list-item>
  </mat-list>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-list {
  inline-size: min(100%, 420px);
}
</style>
<!-- #endregion style -->
