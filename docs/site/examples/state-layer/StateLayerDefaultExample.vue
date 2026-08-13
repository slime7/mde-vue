<!-- #region template -->
<template>
  <div class="state-layer-example">
    <button v-state-layer type="button">
      默认状态层
    </button>
    <span>使用鼠标、触摸或键盘观察状态反馈。</span>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.state-layer-example {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.state-layer-example button {
  position: relative;
  padding: 12px 20px;
  color: var(--mat-sys-color-on-primary-container);
  font: inherit;
  background: var(--mat-sys-color-primary-container);
  border: 0;
  border-radius: var(--mat-sys-shape-corner-full);
  cursor: pointer;
}

.state-layer-example span {
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
