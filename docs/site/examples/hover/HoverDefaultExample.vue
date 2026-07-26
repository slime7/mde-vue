<!-- #region template -->
<template>
  <mat-hover v-slot="{ isHovering, props }">
    <button
      v-bind="props"
      class="hover-example__target"
      type="button"
      :data-hovering="isHovering"
    >
      {{ isHovering ? '正在悬停' : '悬停查看状态' }}
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
  color: var(--mat-sys-color-on-primary-container);
  background: var(--mat-sys-color-primary-container);
  border: 0;
  border-radius: var(--mat-sys-shape-corner-medium);
  cursor: pointer;
  transition: transform 160ms var(--mat-sys-motion-easing-standard);
}

.hover-example__target[data-hovering='true'] {
  transform: scale(1.04);
}
</style>
<!-- #endregion style -->
