<!-- #region script -->
<script setup>
import { ref } from 'vue';

const scrollTarget = ref(null);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div ref="scrollTarget" class="app-bar-scroll-example" tabindex="0">
    <mat-app-bar
      variant="large-flexible"
      :scroll-target="scrollTarget"
    >
      最近项目

      <template #leading>
        <mat-btn icon="menu" label="菜单" size="small" variant="standard" />
      </template>

      <template #subtitle>
        向下滚动以观察连续折叠与表面填色
      </template>

      <template #trailing>
        <mat-btn icon="search" label="搜索" size="small" variant="standard" />
        <mat-btn icon="more_vert" label="更多" size="small" variant="standard" />
      </template>
    </mat-app-bar>

    <main class="app-bar-scroll-example__content">
      <article v-for="index in 8" :key="index">
        <strong>项目 {{ index }}</strong>
        <span>用于验证应用栏在真实滚动内容上方的折叠表现。</span>
      </article>
    </main>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.app-bar-scroll-example {
  inline-size: 100%;
  block-size: 420px;
  overflow: auto;
  background: var(--mat-sys-color-surface);
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
  overscroll-behavior: contain;
}

.app-bar-scroll-example__content {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  padding: 16px;
}

.app-bar-scroll-example article {
  display: flex;
  min-block-size: 96px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  box-sizing: border-box;
  padding: 20px;
  color: var(--mat-sys-color-on-surface);
  background: var(--mat-sys-color-surface-container-low);
  border-radius: var(--mat-sys-shape-corner-medium);
}

.app-bar-scroll-example span {
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
