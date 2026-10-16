<!-- #region template -->
<template>
  <div class="scroll-area-auto-hide-scrollbar-example">
    <section>
      <h4>默认（离开时自动隐藏）</h4>

      <mat-scroll-area
        class="scroll-area-auto-hide-scrollbar-example__area"
        color="surface-container"
        rounded
        aria-label="默认自动隐藏滚动条示例"
        tabindex="0"
      >
        <p v-for="index in 8" :key="index">
          滚动内容 {{ index }}
        </p>
      </mat-scroll-area>
    </section>

    <section>
      <h4>auto-hide-scrollbar="false"（始终显示）</h4>

      <mat-scroll-area
        class="scroll-area-auto-hide-scrollbar-example__area"
        :auto-hide-scrollbar="false"
        color="surface-container"
        rounded
        aria-label="始终显示滚动条示例"
        tabindex="0"
      >
        <p v-for="index in 8" :key="index">
          滚动内容 {{ index }}
        </p>
      </mat-scroll-area>
    </section>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.scroll-area-auto-hide-scrollbar-example {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  inline-size: 100%;
  block-size: 100%;
}

.scroll-area-auto-hide-scrollbar-example section {
  display: flex;
  flex: 1 1 200px;
  min-inline-size: 0;
  min-block-size: 0;
  flex-direction: column;
  gap: 8px;
}

.scroll-area-auto-hide-scrollbar-example h4 {
  margin: 0;
  color: var(--mat-sys-color-on-surface);
  font: var(--mat-sys-typescale-title-medium);
}

.scroll-area-auto-hide-scrollbar-example__area {
  flex: 1 1 0;
  min-block-size: 0;
  padding-inline: 16px;
}

.scroll-area-auto-hide-scrollbar-example__area p {
  margin-block: 16px;
}
</style>
<!-- #endregion style -->
