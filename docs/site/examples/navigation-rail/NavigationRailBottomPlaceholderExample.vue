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
    class="navigation-rail-bottom-placeholder-example"
  >
    <mat-navigation-rail
      v-if="active"
      app
      bottom-placeholder="48px"
      aria-label="底部安全区导航"
    >
      <mat-navigation-rail-item icon="home">
        首页
      </mat-navigation-rail-item>
      <mat-spacer />
      <mat-btn icon="settings" label="设置" />
    </mat-navigation-rail>
    <div class="navigation-rail-bottom-placeholder-example-content">
      <mat-switch v-model="active">
        {{ active ? '隐藏应用导航' : '显示应用导航' }}
      </mat-switch>
      <p>纵向 rail 的底部内容会在底部安全区上方保持可访问。</p>
    </div>
  </mat-app-root>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-rail-bottom-placeholder-example {
  position: relative;
  block-size: 220px;
  overflow: hidden;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
  background: var(--mat-sys-color-surface-container-low);
}

.navigation-rail-bottom-placeholder-example-content {
  padding: 16px;
}

.navigation-rail-bottom-placeholder-example p {
  margin-block: 12px 0;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
