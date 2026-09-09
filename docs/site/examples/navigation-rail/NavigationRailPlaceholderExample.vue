<!-- #region script -->
<script setup>
import { ref } from 'vue';

const active = ref(true);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-app-root
    :fill-viewport="false"
    class="navigation-rail-placeholder-example"
  >
    <mat-navigation-rail
      v-model:expanded="active"
      layout="modal"
      placeholder
      aria-label="模态占位导航"
    >
      <mat-navigation-rail-item icon="home">
        首页
      </mat-navigation-rail-item>
      <mat-navigation-rail-item icon="folder">
        项目
      </mat-navigation-rail-item>
    </mat-navigation-rail>
    <div class="navigation-rail-placeholder-example-content">
      <mat-switch v-model="active">
        {{ active ? '关闭模态导航' : '打开模态导航' }}
      </mat-switch>
      <p>modal rail 不登记 AppRoot padding，placeholder 只在声明位置保留展开后的实际宽度。</p>
    </div>
  </mat-app-root>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-rail-placeholder-example {
  position: relative;
  block-size: 200px;
  overflow: hidden;
}

.navigation-rail-placeholder-example :deep(.mat-app-root__content) {
  flex-direction: row;
}

.navigation-rail-placeholder-example-content {
  flex: 1 1 auto;
  min-inline-size: 0;
  padding: 16px;
}

.navigation-rail-placeholder-example p {
  margin-block: 12px 0;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
