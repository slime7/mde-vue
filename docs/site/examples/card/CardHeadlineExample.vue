<!-- #region template -->
<template>
  <div class="example-row">
    <mat-card>
      <template #headline>
        具名 Slot 标题
      </template>
      <mat-card-content>使用 headline Slot 时由 Card 创建标题子部件。</mat-card-content>
    </mat-card>

    <mat-card>
      <mat-card-headline>子组件标题</mat-card-headline>
      <mat-card-content>也可以直接组合 MatCardHeadline。</mat-card-content>
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
  inline-size: min(100%, 280px);
}
</style>
<!-- #endregion style -->
