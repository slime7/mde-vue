<!-- #region template -->
<template>
  <div class="shared-element-root-example">
    <mat-shared-element
      name="shared-article-preview"
      as="article"
      class="shared-element-root-example__article"
    >
      <mat-text type="title" size="medium" emphasized>
        article 根元素
      </mat-text>
      <mat-text type="body" size="medium">
        组件不会改变 Slot 内容的语义。
      </mat-text>
    </mat-shared-element>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.shared-element-root-example__article {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  padding: 20px;
  color: var(--mat-sys-color-on-primary-container);
  background: var(--mat-sys-color-primary-container);
  border-radius: var(--mat-sys-shape-corner-extra-large);
}
</style>
<!-- #endregion style -->
