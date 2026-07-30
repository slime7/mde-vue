<!-- #region template -->
<template>
  <div class="example-row">
    <mat-card>
      <template #subhead>
        具名 Slot 副标题
      </template>
      <mat-card-content>Subhead 可用于作者、地点或其他次要信息。</mat-card-content>
    </mat-card>

    <mat-card>
      <mat-card-subhead>子组件副标题</mat-card-subhead>
      <mat-card-content>也可以直接组合 MatCardSubhead。</mat-card-content>
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
  inline-size: 100%;
}
</style>
<!-- #endregion style -->
