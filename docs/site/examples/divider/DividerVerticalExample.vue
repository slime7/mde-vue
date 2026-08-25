<!-- #region template -->
<template>
  <div class="example-row">
    <span>文本一</span>
    <mat-divider vertical />
    <span>文本二</span>
    <mat-divider vertical inset="start" />
    <span>文本三</span>
    <mat-divider vertical inset />
    <span>文本四</span>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-row {
  display: flex;
  align-items: center;
  gap: 16px;
  block-size: 48px;
  padding-inline: 16px;
}
</style>
<!-- #endregion style -->
