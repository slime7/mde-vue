<!-- #region template -->
<template>
  <form class="example-row" @submit.prevent>
    <mat-list interaction="single-action" aria-label="按钮类型列表" class="example-list">
      <mat-list-item type="submit">
        提交
      </mat-list-item>
      <mat-list-item type="reset">
        重置
      </mat-list-item>
    </mat-list>
  </form>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-row {
  inline-size: 100%;
}

.example-list {
  inline-size: 100%;
}
</style>
<!-- #endregion style -->
