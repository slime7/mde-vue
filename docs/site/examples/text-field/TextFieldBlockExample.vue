<template>
  <div class="text-field-block-example">
    <mat-text-field
      block
      label="块级文本输入"
      model-value="铺满父元素"
    />

    <mat-textarea
      block
      label="块级多行输入"
      model-value="Text field 和 Textarea 使用相同的 block 宽度规则。"
      :rows="3"
    />
  </div>
</template>

<style scoped>
.text-field-block-example {
  box-sizing: border-box;
  inline-size: min(100%, 360px);
  padding: 12px;
  border: 1px dashed var(--mat-sys-color-outline-variant);
}

.text-field-block-example > :last-child {
  margin-block-start: 16px;
}
</style>
