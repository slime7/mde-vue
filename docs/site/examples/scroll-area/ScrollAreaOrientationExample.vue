<!-- #region template -->
<template>
  <div class="scroll-area-orientation-example">
    <mat-scroll-area
      orientation="y"
      class="scroll-area-orientation-example__vertical"
      color="surface-container"
      rounded
      aria-label="纵向消息"
      tabindex="0"
    >
      <p v-for="index in 12" :key="index">
        第 {{ index }} 条消息
      </p>
    </mat-scroll-area>

    <mat-scroll-area
      orientation="x"
      class="scroll-area-orientation-example__horizontal"
      aria-label="横向卡片"
      tabindex="0"
    >
      <div class="scroll-area-orientation-example__row">
        <mat-card
          v-for="index in 6"
          :key="index"
          variant="outlined"
        >
          卡片 {{ index }}
        </mat-card>
      </div>
    </mat-scroll-area>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.scroll-area-orientation-example {
  display: flex;
  flex-direction: column;
  gap: 24px;
  inline-size: 100%;
}

.scroll-area-orientation-example__vertical {
  block-size: 180px;
  padding-inline: 16px;
}

.scroll-area-orientation-example__vertical p {
  margin-block: 16px;
}

.scroll-area-orientation-example__horizontal {
  inline-size: 100%;
}

.scroll-area-orientation-example__row {
  display: flex;
  gap: 12px;
  inline-size: max-content;
  padding-block-end: 8px;
}

.scroll-area-orientation-example__row > * {
  flex-shrink: 0;
  inline-size: 152px;
  padding: 24px 16px;
}
</style>
<!-- #endregion style -->
