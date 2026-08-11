<!-- #region template -->
<template>
  <div class="emphasized-example">
    <mat-text type="title" size="large">
      普通标题
    </mat-text>
    <mat-text type="title" size="large" emphasized>
      当前选中的重要标题
    </mat-text>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.emphasized-example {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
}
</style>
<!-- #endregion style -->
