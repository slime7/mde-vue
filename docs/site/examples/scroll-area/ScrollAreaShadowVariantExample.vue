<!-- #region template -->
<template>
  <div class="scroll-area-shadow-variant-example">
    <section>
      <h4>fade（默认 16px）</h4>

      <mat-scroll-area
        class="scroll-area-shadow-variant-example__area"
        shadow-variant="fade"
        aria-label="渐隐阴影示例"
        tabindex="0"
      >
        <p v-for="index in 12" :key="index">
          渐隐内容 {{ index }}
        </p>
      </mat-scroll-area>
    </section>

    <section>
      <h4>blur（默认 96px）</h4>

      <mat-scroll-area
        class="scroll-area-shadow-variant-example__area"
        shadow-variant="blur"
        aria-label="模糊阴影示例"
        tabindex="0"
      >
        <p v-for="index in 12" :key="index">
          模糊内容 {{ index }}
        </p>
      </mat-scroll-area>
    </section>

    <section>
      <h4>两端不同长度</h4>

      <mat-scroll-area
        class="scroll-area-shadow-variant-example__horizontal"
        orientation="horizontal"
        shadow-variant="blur"
        :shadow-length="{ start: 16, end: 64 }"
        aria-label="两端不同模糊长度示例"
        tabindex="0"
      >
        <div class="scroll-area-shadow-variant-example__row">
          <article v-for="index in 8" :key="index">
            卡片 {{ index }}
          </article>
        </div>
      </mat-scroll-area>
    </section>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.scroll-area-shadow-variant-example {
  display: flex;
  flex-direction: column;
  gap: 24px;
  inline-size: 100%;
}

.scroll-area-shadow-variant-example section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.scroll-area-shadow-variant-example h4 {
  margin: 0;
  color: var(--mat-sys-color-on-surface);
  font: var(--mat-sys-typescale-title-medium);
}

.scroll-area-shadow-variant-example__area {
  block-size: 180px;
  padding-inline: 16px;
  background: var(--mat-sys-color-surface-container);
  border-radius: var(--mat-sys-shape-corner-large);
}

.scroll-area-shadow-variant-example__area p {
  margin-block: 16px;
}

.scroll-area-shadow-variant-example__horizontal {
  inline-size: 100%;
  padding: 16px;
  background: var(--mat-sys-color-surface-container);
  border-radius: var(--mat-sys-shape-corner-large);
}

.scroll-area-shadow-variant-example__row {
  display: flex;
  gap: 12px;
  inline-size: max-content;
}

.scroll-area-shadow-variant-example__row article {
  flex-shrink: 0;
  inline-size: 152px;
  padding: 24px 16px;
  color: var(--mat-sys-color-on-secondary-container);
  background: var(--mat-sys-color-secondary-container);
  border-radius: var(--mat-sys-shape-corner-medium);
}
</style>
<!-- #endregion style -->
