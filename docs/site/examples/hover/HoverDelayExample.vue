<!-- #region template -->
<template>
  <mat-hover
    :close-delay="300"
    :open-delay="300"
    v-slot="{ isHovering, props }"
  >
    <button
      v-bind="props"
      class="hover-example__target"
      type="button"
    >
      {{ isHovering ? '延迟状态已开启' : '停留 300ms' }}
    </button>
  </mat-hover>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.hover-example__target {
  min-inline-size: 180px;
  min-block-size: 48px;
  padding-inline: 20px;
  color: var(--mat-sys-color-on-secondary-container);
  background: var(--mat-sys-color-secondary-container);
  border: 0;
  border-radius: var(--mat-sys-shape-corner-medium);
  cursor: pointer;
}
</style>
<!-- #endregion style -->
