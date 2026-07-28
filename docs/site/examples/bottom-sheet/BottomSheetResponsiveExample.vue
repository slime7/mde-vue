<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="bottom-sheet-responsive-example">
    <div class="bottom-sheet-responsive-example__content">
      <p>
        auto 在小于 840px 时使用 modal，在更宽视口中使用 standard。
      </p>
      <mat-btn @click="open = true">
        打开自适应 Bottom sheet
      </mat-btn>
    </div>

    <mat-bottom-sheet
      v-model="open"
      title="自适应筛选"
      content="调整浏览器宽度后再次打开，可观察布局变体变化。"
      closable
    />
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.bottom-sheet-responsive-example {
  display: flex;
  flex-direction: column;
  min-block-size: 320px;
  overflow: hidden;
  background: var(--mat-sys-color-surface-container-lowest);
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
}

.bottom-sheet-responsive-example__content {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  min-block-size: 0;
  padding: 24px;
}

.bottom-sheet-responsive-example__content p {
  max-inline-size: 560px;
  margin: 0;
}
</style>
<!-- #endregion style -->
