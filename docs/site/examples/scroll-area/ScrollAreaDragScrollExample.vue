<!-- #region template -->
<template>
  <mat-scroll-area
    class="drag-scroll-example"
    orientation="horizontal"
    bar-width="hidden"
    drag-scroll
    aria-label="可拖拽横向卡片"
    tabindex="0"
  >
    <div class="drag-scroll-example__row">
      <mat-card
        v-for="index in 8"
        :key="index"
        variant="outlined"
      >
        卡片 {{ index }}
      </mat-card>
    </div>
  </mat-scroll-area>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.drag-scroll-example {
  inline-size: 100%;
}

.drag-scroll-example__row {
  display: flex;
  gap: 12px;
  inline-size: max-content;
}

.drag-scroll-example__row > * {
  flex-shrink: 0;
  inline-size: 152px;
  padding: 24px 16px;
}
</style>
<!-- #endregion style -->
