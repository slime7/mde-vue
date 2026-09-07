<!-- #region template -->
<template>
  <div class="aside-sticky-container">
    <mat-aside
      mode="sticky"
      location="top"
      :block-size="44"
      bordered
      as="header"
      class="aside-sticky-header"
    >
      <div class="aside-sticky-header__inner">
        <strong>粘性顶栏 (mode="sticky")</strong>
        <span class="aside-sticky-header__badge">向下滚动查看</span>
      </div>
    </mat-aside>

    <div class="aside-sticky-content">
      <p v-for="i in 8" :key="i" class="aside-sticky-row">
        正文列表项 #{{ i }} — 滚动时顶栏保持粘性停靠在容器顶部。
      </p>
    </div>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.aside-sticky-container {
  block-size: 200px;
  overflow-y: auto;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-medium);
  background: var(--mat-sys-color-surface);
}

.aside-sticky-header {
  background: var(--mat-sys-color-surface-container);
  color: var(--mat-sys-color-on-surface);
}

.aside-sticky-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 16px;
  block-size: 100%;
  font-size: 13px;
}

.aside-sticky-header__badge {
  font-size: 12px;
  color: var(--mat-sys-color-primary);
}

.aside-sticky-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.aside-sticky-row {
  margin: 0;
  padding: 10px 12px;
  border-radius: var(--mat-sys-shape-corner-small);
  background: var(--mat-sys-color-surface-container-low);
  color: var(--mat-sys-color-on-surface);
  font-size: 13px;
}
</style>
<!-- #endregion style -->
