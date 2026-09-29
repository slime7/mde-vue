<!-- #region template -->
<template>
  <div class="ripple-variants-example">
    <div
      v-ripple
      class="ripple-variants-example__tile"
      role="button"
      tabindex="0"
    >
      实心圆
    </div>
    <div
      v-ripple="{ variant: 'dots' }"
      class="ripple-variants-example__tile"
      role="button"
      tabindex="0"
    >
      波点阵列
    </div>
    <div
      v-ripple="{ variant: 'glow' }"
      class="ripple-variants-example__tile"
      role="button"
      tabindex="0"
    >
      柔光光斑
    </div>
    <div
      v-ripple="{ variant: 'rings' }"
      class="ripple-variants-example__tile"
      role="button"
      tabindex="0"
    >
      扩散圆环
    </div>
    <div
      v-ripple="{ variant: 'burst' }"
      class="ripple-variants-example__tile"
      role="button"
      tabindex="0"
    >
      星芒爆发
    </div>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.ripple-variants-example {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.ripple-variants-example__tile {
  position: relative;
  flex: 1 1 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  block-size: 96px;
  color: var(--mat-sys-color-on-surface);
  background: var(--mat-sys-color-surface-container);
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-medium);
  cursor: pointer;
  user-select: none;
}

.ripple-variants-example__tile:focus-visible {
  outline: 2px solid var(--mat-sys-color-primary);
  outline-offset: 2px;
}
</style>
<!-- #endregion style -->
