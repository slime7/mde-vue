<!-- #region template -->
<template>
  <div class="app-bar-content-example">
    <mat-app-bar content="headline">
      项目
    </mat-app-bar>

    <mat-app-bar content="image">
      <svg viewBox="0 0 132 40" role="img" aria-label="MDE 标志">
        <rect width="40" height="40" rx="12" />
        <text x="50" y="28">MDE</text>
      </svg>
    </mat-app-bar>

    <mat-app-bar content="search">
      <mat-search v-model="query" label="搜索文档" />
    </mat-app-bar>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const query = ref('');
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.app-bar-content-example {
  display: flex;
  inline-size: 100%;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  overflow: hidden;
}

.app-bar-content-example :deep(.mat-app-bar) {
  position: static;
}

.app-bar-content-example svg {
  fill: var(--mat-sys-color-primary);
}

.app-bar-content-example text {
  fill: var(--mat-sys-color-on-surface);
  font: 700 24px var(--mat-ref-typeface-brand);
}
</style>
<!-- #endregion style -->
