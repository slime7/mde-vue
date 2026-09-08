<!-- #region template -->
<template>
  <div class="aside-toggle-wrapper">
    <div class="aside-toggle-toolbar">
      <mat-btn size="small" variant="filled" @click="visible = !visible">
        {{ visible ? '收起侧栏' : '展开侧栏' }}
      </mat-btn>
    </div>

    <mat-layout class="aside-toggle-layout">
      <mat-aside
        v-model="visible"
        location="left"
        :block-size="160"
        bordered
        class="aside-toggle-layout__aside"
      >
        <div class="aside-toggle-layout__nav">
          <strong>动态侧栏</strong>
          <span>平滑滑入与滑出</span>
        </div>
      </mat-aside>

      <div class="aside-toggle-layout__content">
        <h3>平滑过渡回流</h3>
        <p>通过 v-model 切换显隐时，Aside 沿对应边缘滑动切出，正文区域 padding 平滑同步回流。</p>
      </div>
    </mat-layout>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const visible = ref(true);
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.aside-toggle-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.aside-toggle-toolbar {
  display: flex;
  align-items: center;
}

.aside-toggle-layout {
  block-size: 180px;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-medium);
  overflow: hidden;
}

.aside-toggle-layout__aside {
  background: var(--mat-sys-color-surface-container-high);
  color: var(--mat-sys-color-on-surface);
}

.aside-toggle-layout__nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
}

.aside-toggle-layout__content {
  padding: 24px;
  color: var(--mat-sys-color-on-surface);
}

.aside-toggle-layout__content h3,
.aside-toggle-layout__content p {
  margin: 0;
}

.aside-toggle-layout__content p {
  margin-block-start: 8px;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
