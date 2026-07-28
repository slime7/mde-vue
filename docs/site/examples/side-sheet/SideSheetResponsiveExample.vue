<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="side-sheet-responsive-example">
    <main class="side-sheet-responsive-example__content">
      <p>
        auto 在窄屏使用 modal，在 840px 及以上使用 standard。
      </p>
      <mat-btn @click="open = true">
        打开自适应 Side sheet
      </mat-btn>
    </main>

    <mat-side-sheet
      v-model="open"
      title="属性"
      content="宽屏时与内容并排，窄屏时从侧边覆盖进入。"
      :width="320"
    />
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.side-sheet-responsive-example {
  display: flex;
  min-block-size: 320px;
  overflow: hidden;
  background: var(--mat-sys-color-surface-container-lowest);
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
}

.side-sheet-responsive-example__content {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  min-inline-size: 0;
  padding: 24px;
}

.side-sheet-responsive-example__content p {
  margin: 0;
}
</style>
<!-- #endregion style -->
