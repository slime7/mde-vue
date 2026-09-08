<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-layout class="aside-modal-example-layout">
    <mat-aside
      v-model="open"
      modal
      location="left"
      :block-size="220"
      bordered
      class="aside-modal-example-layout__aside"
    >
      <div class="aside-modal-example-layout__drawer">
        <div class="aside-modal-example-layout__header">
          <strong>模态侧栏</strong>
          <span class="aside-modal-example-layout__caption">不挤占正文空间</span>
        </div>
        <mat-divider />
        <mat-list aria-label="侧栏菜单">
          <mat-list-item>菜单项目 1</mat-list-item>
          <mat-list-item>菜单项目 2</mat-list-item>
          <mat-list-item>菜单项目 3</mat-list-item>
        </mat-list>
      </div>
    </mat-aside>

    <div class="aside-modal-example-layout__content">
      <mat-switch v-model="open" aria-label="切换模态侧栏" />
    </div>
  </mat-layout>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.aside-modal-example-layout {
  position: relative;
  block-size: 260px;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-medium);
  overflow: hidden;
}

.aside-modal-example-layout__aside {
  background: var(--mat-sys-color-surface);
  color: var(--mat-sys-color-on-surface);
}

.aside-modal-example-layout__drawer {
  display: flex;
  flex-direction: column;
  block-size: 100%;
}

.aside-modal-example-layout__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
}

.aside-modal-example-layout__caption {
  font-size: 12px;
  color: var(--mat-sys-color-on-surface-variant);
}

.aside-modal-example-layout__content {
  display: flex;
  align-items: center;
  justify-content: center;
  block-size: 260px;
}
</style>
<!-- #endregion style -->
