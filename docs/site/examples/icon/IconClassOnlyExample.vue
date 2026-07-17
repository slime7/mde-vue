<!-- #region template -->
<template>
  <div class="example-row">
    <mat-icon
      as="span"
      icon=""
      icon-class="example-diamond-icon"
      font-color="darkorange"
      aria-hidden="true"
    />
    <span>由自定义 class 的伪元素生成</span>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-row {
  display: flex;
  gap: 12px;
  align-items: center;
}

.example-diamond-icon::before {
  content: '◆';
}
</style>
<!-- #endregion style -->
