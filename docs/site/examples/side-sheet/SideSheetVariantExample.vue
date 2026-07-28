<!-- #region script -->
<script setup>
import { ref } from 'vue';

const standardOpen = ref(true);
const modalOpen = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="side-sheet-variant-example">
    <main class="side-sheet-variant-example__content">
      <p>主内容区域会为 standard Side sheet 保留空间。</p>
      <div class="side-sheet-variant-example__actions">
        <mat-btn variant="outlined" @click="standardOpen = !standardOpen">
          {{ standardOpen ? '收起 standard' : '打开 standard' }}
        </mat-btn>
        <mat-btn @click="modalOpen = true">
          打开 modal
        </mat-btn>
      </div>
    </main>

    <mat-side-sheet
      v-model="standardOpen"
      variant="standard"
      :width="280"
      title="页面信息"
      content="Standard Side sheet 与主内容并排。"
    />
  </div>

  <mat-side-sheet
    v-model="modalOpen"
    variant="modal"
    title="购物车"
    content="Modal Side sheet 适合需要集中注意力的临时流程。"
  />
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.side-sheet-variant-example {
  display: flex;
  min-block-size: 360px;
  overflow: hidden;
  background: var(--mat-sys-color-surface-container-lowest);
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
}

.side-sheet-variant-example__content {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  min-inline-size: 0;
  padding: 24px;
}

.side-sheet-variant-example__content p {
  margin: 0;
}

.side-sheet-variant-example__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
<!-- #endregion style -->
