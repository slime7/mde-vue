<!-- #region template -->
<template>
  <div class="example-column">
    <mat-expansion>
      <mat-expansion-panel title="启用的面板" :split="false">
        <p class="demo-text">
          正常可用面板内容。
        </p>
      </mat-expansion-panel>
      <mat-expansion-panel title="禁用的面板" :disabled="true" :split="false">
        <p class="demo-text">
          禁用状态下无法展开。
        </p>
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

.demo-text {
  margin: 0;
  line-height: 1.5;
}
</style>
<!-- #endregion style -->
