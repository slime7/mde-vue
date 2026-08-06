<!-- #region template -->
<template>
  <mat-scroll-area
    class="scroll-area-fixed-example"
    aria-label="带固定区域的通知"
    tabindex="0"
  >
    <template #fixed-start>
      <strong class="scroll-area-fixed-example__fixed">通知</strong>
    </template>

    <p v-for="index in 12" :key="index">
      第 {{ index }} 条通知内容
    </p>

    <template #fixed-end>
      <div class="scroll-area-fixed-example__fixed">
        共 12 条
      </div>
    </template>
  </mat-scroll-area>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.scroll-area-fixed-example {
  block-size: 260px;
  inline-size: 100%;
  background: var(--mat-sys-color-surface-container);
  border-radius: var(--mat-sys-shape-corner-large);
}

.scroll-area-fixed-example p {
  padding-inline: 16px;
}

.scroll-area-fixed-example__fixed {
  display: block;
  padding: 12px 16px;
  background: var(--mat-sys-color-surface-container-high);
}
</style>
<!-- #endregion style -->
