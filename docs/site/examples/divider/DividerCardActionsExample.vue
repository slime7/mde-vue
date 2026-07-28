<!-- #region template -->
<template>
  <div class="example-row">
    <mat-card>
      <mat-card-content>全宽 Divider 完整分开正文和 Actions。</mat-card-content>
      <mat-divider />
      <mat-card-actions>
        <mat-btn variant="text">
          取消
        </mat-btn>
        <mat-btn>
          继续
        </mat-btn>
      </mat-card-actions>
    </mat-card>

    <mat-card>
      <mat-card-content>Inset Divider 用于仍属于同一内容组的区域。</mat-card-content>
      <mat-divider inset />
      <mat-card-actions>
        <mat-btn variant="text">
          稍后
        </mat-btn>
        <mat-btn>
          查看
        </mat-btn>
      </mat-card-actions>
    </mat-card>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.example-row > * {
  inline-size: min(100%, 320px);
}
</style>
<!-- #endregion style -->
