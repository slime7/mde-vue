<!-- #region template -->
<template>
  <button
    v-state-layer="{ color: 'var(--example-state-layer-color)' }"
    class="state-layer-color-example"
    type="button"
  >
    使用主题令牌
  </button>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.state-layer-color-example {
  --example-state-layer-color: var(--mat-sys-color-primary);
  position: relative;
  padding: 12px 20px;
  color: var(--mat-sys-color-on-surface);
  font: inherit;
  background: var(--mat-sys-color-surface-container);
  border: 1px solid var(--mat-sys-color-outline);
  border-radius: var(--mat-sys-shape-corner-medium);
  cursor: pointer;
}
</style>
<!-- #endregion style -->
