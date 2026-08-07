<!-- #region script -->
<script setup>
const barWidths = ['default', 'thin', 'hidden'];
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="scroll-area-bar-width-example">
    <section v-for="barWidth in barWidths" :key="barWidth">
      <h4>{{ barWidth }}</h4>

      <mat-scroll-area
        class="scroll-area-bar-width-example__area"
        :bar-width="barWidth"
        :aria-label="`${barWidth} 滚动条示例`"
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
.scroll-area-bar-width-example {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  inline-size: 100%;
}

.scroll-area-bar-width-example section {
  display: flex;
  flex: 1 1 180px;
  min-inline-size: 0;
  flex-direction: column;
  gap: 8px;
}

.scroll-area-bar-width-example h4 {
  margin: 0;
  color: var(--mat-sys-color-on-surface);
  font: var(--mat-sys-typescale-title-medium);
}

.scroll-area-bar-width-example__area {
  block-size: 150px;
  padding-inline: 16px;
  background: var(--mat-sys-color-surface-container);
  border-radius: var(--mat-sys-shape-corner-large);
}

.scroll-area-bar-width-example__area p {
  margin-block: 16px;
}
</style>
<!-- #endregion style -->
