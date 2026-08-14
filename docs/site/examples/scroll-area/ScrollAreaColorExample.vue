<!-- #region script -->
<script setup>
const colors = ['surface-container', 'surface-container-high', 'surface-container-highest'];
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="scroll-area-color-example">
    <section v-for="color in colors" :key="color">
      <h4>{{ color }}</h4>

      <mat-scroll-area
        class="scroll-area-color-example__area"
        :color="color"
        :aria-label="`${color} 滚动区域示例`"
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
.scroll-area-color-example {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  inline-size: 100%;
}

.scroll-area-color-example section {
  display: flex;
  flex: 1 1 180px;
  min-inline-size: 0;
  flex-direction: column;
  gap: 8px;
}

.scroll-area-color-example h4 {
  margin: 0;
  color: var(--mat-sys-color-on-surface);
  font: var(--mat-sys-typescale-title-medium);
}

.scroll-area-color-example__area {
  block-size: 180px;
}

.scroll-area-color-example__area p {
  margin-block: 16px;
}
</style>
<!-- #endregion style -->
