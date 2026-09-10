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
      aria-label="自适应筛选"
    >
      <div class="bottom-sheet-responsive-example__sheet-body">
        <h2>自适应筛选</h2>
        <p>调整浏览器宽度后再次打开，可观察布局变体变化。</p>
      </div>
    </mat-bottom-sheet>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.bottom-sheet-responsive-example {
  display: flex;
  flex-direction: column;
  block-size: 320px;
  overflow: hidden;
}

.bottom-sheet-responsive-example__content {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  min-block-size: 0;
}

.bottom-sheet-responsive-example__content p {
  max-inline-size: 560px;
  margin: 0;
}

.bottom-sheet-responsive-example__sheet-body {
  padding: 24px;
}
</style>
<!-- #endregion style -->
