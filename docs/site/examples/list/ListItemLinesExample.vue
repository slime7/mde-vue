<!-- #region template -->
<template>
  <mat-list variant="standard" aria-label="行数列表" class="example-list">
    <mat-list-item :lines="1">
      一行内容
      <template #supporting>
        lines=1
      </template>
      <template #trailing>
        <mat-icon icon="more_vert" aria-hidden="true" />
      </template>
    </mat-list-item>
    <mat-list-item :lines="2">
      两行内容
      <template #supporting>
        lines=2
      </template>
      <template #trailing>
        <mat-icon icon="more_vert" aria-hidden="true" />
      </template>
    </mat-list-item>
    <mat-list-item :lines="3">
      三行内容
      <template #overline>
        上方文字
      </template>
      <template #supporting>
        lines=3 的辅助文字
      </template>
      <template #trailing>
        <mat-icon icon="more_vert" aria-hidden="true" />
      </template>
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
