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
    class="navigation-rail-app-example"
  >
    <mat-navigation-rail
      v-if="active"
      app
      aria-label="应用导航"
    >
      <mat-navigation-rail-item icon="home">
        首页
      </mat-navigation-rail-item>
      <mat-navigation-rail-item icon="settings">
        设置
      </mat-navigation-rail-item>
    </mat-navigation-rail>
    <div class="navigation-rail-app-example-content">
      <mat-switch v-model="active">
        {{ active ? '隐藏应用导航' : '显示应用导航' }}
      </mat-switch>
      <p>应用模式的 rail 位于 MatAppRoot 时自动登记起始侧，正文内容自动避让。</p>
    </div>
  </mat-app-root>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-rail-app-example {
  position: relative;
  block-size: 200px;
  overflow: hidden;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
  background: var(--mat-sys-color-surface-container-low);
}

.navigation-rail-app-example-content {
  padding: 16px;
}

.navigation-rail-app-example p {
  margin-block: 12px 0;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
