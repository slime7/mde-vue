<!-- #region template -->
<template>
  <div class="scroll-area-container-example">
    <mat-scroll-area
      class="scroll-area-container-example__area"
      aria-label="与 Container 搭配的消息列表"
      tabindex="0"
    >
      <mat-container>
        <div
          v-for="index in 12"
          :key="index"
          class="scroll-area-container-example__row"
        >
          消息条目 {{ index }}
        </div>
      </mat-container>
    </mat-scroll-area>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.scroll-area-container-example {
  block-size: 320px;
}

.scroll-area-container-example__area {
  block-size: 100%;
}

.scroll-area-container-example .mat-container {
  padding-inline-end: calc(16px - var(--mat-scroll-area-scrollbar-width));
}

@media (width >= 600px) {
  .scroll-area-container-example .mat-container {
    padding-inline-end: calc(24px - var(--mat-scroll-area-scrollbar-width));
  }
}

.scroll-area-container-example__row {
  padding: 16px;
  border-block-end: 1px solid var(--mat-sys-color-outline-variant);
}

.scroll-area-container-example__row:last-child {
  border-block-end: 0;
}
</style>
<!-- #endregion style -->
