<!-- #region template -->
<template>
  <mat-scroll-area
    class="scroll-area-snap-example"
    orientation="vertical"
    snap="mandatory"
    :snap-padding="16"
    aria-label="停靠卡片"
    tabindex="0"
  >
    <div class="scroll-area-snap-example__list">
      <article
        v-for="index in 5"
        :key="index"
        class="scroll-area-snap-example__item"
      >
        <strong>停靠项 {{ index }}</strong>
        <span>滚动结束后，项目起始边缘停靠到滚动区域。</span>
      </article>
    </div>
  </mat-scroll-area>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.scroll-area-snap-example {
  block-size: 280px;
}

.scroll-area-snap-example__list {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  padding: 16px;
}

.scroll-area-snap-example__item {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  box-sizing: border-box;
  min-block-size: 180px;
  padding: 20px;
  color: var(--mat-sys-color-on-secondary-container);
  background: var(--mat-sys-color-secondary-container);
  border-radius: var(--mat-sys-shape-corner-medium);
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
</style>
<!-- #endregion style -->
