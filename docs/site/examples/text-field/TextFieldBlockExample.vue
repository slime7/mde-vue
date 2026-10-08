<!-- #region template -->
<template>
  <div class="example-stack">
    <mat-text-field
      label="默认最大宽度（488px）"
      model-value="容器宽度超过 488px 时保持最大宽度"
    />

    <mat-text-field
      block
      label="启用 block 铺满容器"
      model-value="忽略 488px 最大宽度限制"
    />

    <mat-textarea
      block
      label="块级多行输入"
      model-value="Text field 与 Textarea 均支持 block 属性。"
      :rows="3"
    />
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
  inline-size: 100%;
}
</style>
<!-- #endregion style -->
