<!-- #region template -->
<template>
  <div class="scroll-area-shadow-length-example">
    <section>
      <h4>默认长度（16px）</h4>

      <mat-scroll-area
        class="scroll-area-shadow-length-example__area"
        color="surface-container"
        rounded
        aria-label="默认渐隐长度示例"
        tabindex="0"
      >
        <p v-for="index in 12" :key="index">
          默认长度内容 {{ index }}
        </p>
      </mat-scroll-area>
    </section>

    <section>
      <h4>数字形式（48px）</h4>

      <mat-scroll-area
        class="scroll-area-shadow-length-example__area"
        color="surface-container"
        rounded
        :shadow-length="48"
        aria-label="数字阴影长度示例"
        tabindex="0"
      >
        <p v-for="index in 12" :key="index">
          数字长度内容 {{ index }}
        </p>
      </mat-scroll-area>
    </section>

    <section>
      <h4>两端不同长度（16px / 64px）</h4>

      <mat-scroll-area
        class="scroll-area-shadow-length-example__horizontal"
        orientation="horizontal"
        color="surface-container"
        rounded
        :shadow-length="{ start: 16, end: 64 }"
        aria-label="两端不同阴影长度示例"
        tabindex="0"
      >
        <div class="scroll-area-shadow-length-example__row">
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
.scroll-area-shadow-length-example {
  display: flex;
  flex-direction: column;
  gap: 24px;
  inline-size: 100%;
}

.scroll-area-shadow-length-example section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.scroll-area-shadow-length-example h4 {
  margin: 0;
  color: var(--mat-sys-color-on-surface);
  font: var(--mat-sys-typescale-title-medium);
}

.scroll-area-shadow-length-example__area {
  block-size: 180px;
  padding-inline: 16px;
}

.scroll-area-shadow-length-example__area p {
  margin-block: 16px;
}

.scroll-area-shadow-length-example__horizontal {
  inline-size: 100%;
  padding: 16px;
}

.scroll-area-shadow-length-example__row {
  display: flex;
  gap: 12px;
  inline-size: max-content;
}

.scroll-area-shadow-length-example__row article {
  flex-shrink: 0;
  inline-size: 152px;
  padding: 24px 16px;
  color: var(--mat-sys-color-on-secondary-container);
  background: var(--mat-sys-color-secondary-container);
  border-radius: var(--mat-sys-shape-corner-medium);
}
</style>
<!-- #endregion style -->
