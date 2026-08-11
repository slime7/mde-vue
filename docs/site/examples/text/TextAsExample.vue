<!-- #region template -->
<template>
  <div class="as-example">
    <mat-text as="h2" type="headline" size="small">
      语义标题
    </mat-text>
    <mat-text as="p">
      语义段落
    </mat-text>
    <mat-text as="strong" type="label" emphasized>
      重要标签
    </mat-text>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.as-example {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
}

.as-example :deep(*) {
  margin: 0;
}
</style>
<!-- #endregion style -->
