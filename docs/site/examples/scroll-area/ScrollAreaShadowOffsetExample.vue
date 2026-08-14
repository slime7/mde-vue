<!-- #region template -->
<template>
  <div class="scroll-area-shadow-offset-example">
    <mat-scroll-area
      class="scroll-area-shadow-offset-example__vertical"
      color="surface-container"
      rounded
      :shadow-offset="{ start: 48, end: 48 }"
      aria-label="带固定标题的消息列表"
      tabindex="0"
    >
      <div class="scroll-area-shadow-offset-example__sticky scroll-area-shadow-offset-example__sticky--start">
        固定标题
      </div>

      <p v-for="index in 16" :key="index">
        第 {{ index }} 条消息
      </p>

      <div class="scroll-area-shadow-offset-example__sticky scroll-area-shadow-offset-example__sticky--end">
        固定结尾
      </div>
    </mat-scroll-area>

    <mat-scroll-area
      class="scroll-area-shadow-offset-example__horizontal"
      orientation="horizontal"
      :shadow-offset="48"
      aria-label="带固定首列的卡片"
      tabindex="0"
    >
      <div class="scroll-area-shadow-offset-example__row">
        <div class="scroll-area-shadow-offset-example__sticky scroll-area-shadow-offset-example__sticky--left">
          固定列
        </div>

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
.scroll-area-shadow-offset-example {
  display: flex;
  flex-direction: column;
  gap: 24px;
  inline-size: 100%;
}

.scroll-area-shadow-offset-example__vertical {
  block-size: 260px;
  padding-inline: 16px;
}

.scroll-area-shadow-offset-example__vertical p {
  margin-block: 16px;
}

.scroll-area-shadow-offset-example__horizontal {
  inline-size: 100%;
}

.scroll-area-shadow-offset-example__row {
  display: flex;
  gap: 12px;
  inline-size: max-content;
  padding-block-end: 8px;
}

.scroll-area-shadow-offset-example__row article {
  flex-shrink: 0;
  inline-size: 152px;
  padding: 24px 16px;
  color: var(--mat-sys-color-on-secondary-container);
  background: var(--mat-sys-color-secondary-container);
  border-radius: var(--mat-sys-shape-corner-medium);
}

.scroll-area-shadow-offset-example__sticky {
  position: sticky;
  z-index: 1;
  background: var(--mat-sys-color-surface-container-high);
}

.scroll-area-shadow-offset-example__sticky--start {
  inset-block-start: 0;
  padding: 12px 16px;
}

.scroll-area-shadow-offset-example__sticky--end {
  inset-block-end: 0;
  padding: 12px 16px;
}

.scroll-area-shadow-offset-example__sticky--left {
  display: flex;
  flex: 0 0 auto;
  inline-size: 48px;
  align-items: center;
  justify-content: center;
  inset-inline-start: 0;
}
</style>
<!-- #endregion style -->
