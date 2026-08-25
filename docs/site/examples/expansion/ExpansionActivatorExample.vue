<!-- #region template -->
<template>
  <div class="example-column">
    <mat-expansion>
      <mat-expansion-panel>
        <template #activator="{ expanded }">
          <mat-list-item>
            <template #leading>
              <mat-icon icon="folder" />
            </template>
            自定义激活器
            <template #supporting>
              当前状态：{{ expanded ? '已展开' : '已折叠' }}
            </template>
            <template #trailing>
              <mat-icon :icon="expanded ? 'expand_less' : 'expand_more'" />
            </template>
          </mat-list-item>
        </template>
        <mat-list-item>文件夹子项 1</mat-list-item>
        <mat-list-item>文件夹子项 2</mat-list-item>
      </mat-expansion-panel>
    </mat-expansion>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
  inline-size: 100%;
}
</style>
<!-- #endregion style -->
