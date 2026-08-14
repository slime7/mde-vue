<!-- #region template -->
<template>
  <div class="scroll-area-rounded-example">
    <mat-scroll-area
      class="scroll-area-rounded-example__area"
      color="surface-container"
      rounded
      aria-label="纵向圆角滚动区域"
      tabindex="0"
    >
      <p v-for="index in 10" :key="index">
        滚动内容 {{ index }}
      </p>
    </mat-scroll-area>

    <mat-scroll-area
      class="scroll-area-rounded-example__area"
      orientation="horizontal"
      color="surface-container"
      rounded
      aria-label="横向圆角滚动区域"
      tabindex="0"
    >
      <div class="scroll-area-rounded-example__row">
        <article v-for="index in 8" :key="index">
          卡片 {{ index }}
        </article>
      </div>
    </mat-scroll-area>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.scroll-area-rounded-example {
  display: flex;
  flex-direction: column;
  gap: 24px;
  inline-size: 100%;
}

.scroll-area-rounded-example__area {
  block-size: 200px;
}

.scroll-area-rounded-example__area p {
  margin-block: 16px;
}

.scroll-area-rounded-example__row {
  display: flex;
  gap: 12px;
  inline-size: max-content;
  padding-block-end: 8px;
}

.scroll-area-rounded-example__row article {
  flex-shrink: 0;
  inline-size: 152px;
  padding: 24px 16px;
  color: var(--mat-sys-color-on-secondary-container);
  background: var(--mat-sys-color-secondary-container);
  border-radius: var(--mat-sys-shape-corner-medium);
}
</style>
<!-- #endregion style -->
