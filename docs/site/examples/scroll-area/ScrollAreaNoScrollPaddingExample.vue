<!-- #region template -->
<template>
  <div class="scroll-area-no-scroll-padding-example">
    <section>
      <h4>默认 28px 内边距</h4>

      <mat-scroll-area
        class="scroll-area-no-scroll-padding-example__area"
        color="surface-container"
        aria-label="默认内边距纵向滚动区域"
        tabindex="0"
      >
        <div
          v-for="index in 8"
          :key="index"
          class="scroll-area-no-scroll-padding-example__row"
        >
          条目 {{ index }}
        </div>
      </mat-scroll-area>
    </section>

    <section>
      <h4>no-scroll-padding</h4>

      <mat-scroll-area
        class="scroll-area-no-scroll-padding-example__area"
        color="surface-container"
        no-scroll-padding
        aria-label="贴边纵向滚动区域"
        tabindex="0"
      >
        <div
          v-for="index in 8"
          :key="index"
          class="scroll-area-no-scroll-padding-example__row"
        >
          贴边条目 {{ index }}
        </div>
      </mat-scroll-area>
    </section>

    <mat-scroll-area
      class="scroll-area-no-scroll-padding-example__area scroll-area-no-scroll-padding-example__area--horizontal"
      color="surface-container"
      no-scroll-padding
      orientation="horizontal"
      aria-label="贴边横向滚动区域"
      tabindex="0"
    >
      <div class="scroll-area-no-scroll-padding-example__row-row">
        <article
          v-for="index in 6"
          :key="index"
          class="scroll-area-no-scroll-padding-example__card"
        >
          卡片 {{ index }}
        </article>
      </div>
    </mat-scroll-area>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.scroll-area-no-scroll-padding-example {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  inline-size: 100%;
}

.scroll-area-no-scroll-padding-example section {
  display: flex;
  flex: 1 1 220px;
  min-inline-size: 0;
  flex-direction: column;
  gap: 8px;
}

.scroll-area-no-scroll-padding-example h4 {
  margin: 0;
  color: var(--mat-sys-color-on-surface);
  font: var(--mat-sys-typescale-title-medium);
}

.scroll-area-no-scroll-padding-example__area {
  block-size: 200px;
}

.scroll-area-no-scroll-padding-example__area--horizontal {
  flex-basis: 100%;
}

.scroll-area-no-scroll-padding-example__row {
  padding: 12px 16px;
  background: var(--mat-sys-color-surface-container-high);
  border-block-end: 1px solid var(--mat-sys-color-outline-variant);
}

.scroll-area-no-scroll-padding-example__row:last-child {
  border-block-end: 0;
}

.scroll-area-no-scroll-padding-example__row-row {
  display: flex;
  gap: 12px;
  inline-size: max-content;
  padding-block: 16px;
}

.scroll-area-no-scroll-padding-example__card {
  flex-shrink: 0;
  inline-size: 152px;
  padding: 24px 16px;
  color: var(--mat-sys-color-on-secondary-container);
  background: var(--mat-sys-color-secondary-container);
  border-radius: var(--mat-sys-shape-corner-medium);
}
</style>
<!-- #endregion style -->
