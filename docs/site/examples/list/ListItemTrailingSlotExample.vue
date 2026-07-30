<!-- #region template -->
<template>
  <mat-list aria-label="trailing Slot" class="example-list">
    <mat-list-item>
      下载文件
      <template #trailing>
        <mat-icon icon="download" aria-hidden="true" />
      </template>
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
