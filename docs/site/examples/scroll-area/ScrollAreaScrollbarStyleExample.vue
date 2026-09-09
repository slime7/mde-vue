<!-- #region template -->
<template>
  <div class="scroll-area-scrollbar-style-example">
    <section
      v-for="barWidth in barWidths"
      :key="barWidth"
    >
      <h4>{{ barWidth }}</h4>

      <div
        class="mat-scrollbar"
        :class="`mat-scrollbar--${barWidth}`"
        :aria-label="`${barWidth} 公共滚动条样式示例`"
        tabindex="0"
      >
        <p v-for="index in 8" :key="index">
          原生滚动元素内容 {{ index }}
        </p>
      </div>
    </section>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
const barWidths = ['default', 'thin', 'hidden'];
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.scroll-area-scrollbar-style-example {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  inline-size: 100%;
}

.scroll-area-scrollbar-style-example section {
  display: flex;
  flex: 1 1 180px;
  min-inline-size: 0;
  flex-direction: column;
  gap: 8px;
}

.scroll-area-scrollbar-style-example h4 {
  margin: 0;
  color: var(--mat-sys-color-on-surface);
  font: var(--mat-sys-typescale-title-medium);
}

.scroll-area-scrollbar-style-example .mat-scrollbar {
  block-size: 150px;
  padding-inline: 16px;
  overflow: auto;
  border-radius: var(--mat-sys-shape-corner-extra-large);
  background: var(--mat-sys-color-surface-container);
  color: var(--mat-sys-color-on-surface);
}

.scroll-area-scrollbar-style-example p {
  margin-block: 16px;
}
</style>
<!-- #endregion style -->
