<!-- #region template -->
<template>
  <div class="example-groups">
    <div class="example-group">
      <mat-fab
        size="small"
        icon="add"
        label="小号创建"
      />
      <mat-fab
        size="medium"
        icon="add"
        label="中号创建"
      />
      <mat-fab
        size="large"
        icon="add"
        label="大号创建"
      />
    </div>
    <div class="example-group">
      <mat-fab size="small" icon="add">
        小号创建
      </mat-fab>
      <mat-fab size="medium" icon="add">
        中号创建
      </mat-fab>
      <mat-fab size="large" icon="add">
        大号创建
      </mat-fab>
    </div>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-groups {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.example-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
</style>
<!-- #endregion style -->
