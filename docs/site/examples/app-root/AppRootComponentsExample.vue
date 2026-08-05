<!-- #region script -->
<script setup>
import { ref } from 'vue';

const snackbarOpen = ref(false);
const current = ref('home');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-app-root
    :fill-viewport="false"
    scrollable
    class="app-root-components-example"
  >
    <mat-navigation-rail
      v-model="current"
      app
    >
      <mat-navigation-rail-item value="home" icon="home">
        首页
      </mat-navigation-rail-item>
      <mat-navigation-rail-item value="settings" icon="settings">
        设置
      </mat-navigation-rail-item>
    </mat-navigation-rail>

    <section class="app-root-components-example__content">
      <h3>组件自动接入</h3>
      <p>Navigation 登记侧边；floating Toolbar、FAB、Snackbar 和 Tooltip 自动进入对应浮动层。</p>
      <mat-btn
        id="app-root-tooltip-target"
        @click="snackbarOpen = true"
      >
        显示 Snackbar
      </mat-btn>
      <mat-tooltip
        content="这个 Tooltip 属于当前 AppRoot"
        target="#app-root-tooltip-target"
      />
    </section>

    <mat-toolbar
      app
      placeholder
      variant="floating-top"
    >
      <mat-btn variant="standard">
        取消
      </mat-btn>
      <mat-spacer />
      <mat-btn variant="standard">
        保存
      </mat-btn>
    </mat-toolbar>

    <mat-fab
      app
      icon="add"
      label="新建"
      position="end"
      @click="snackbarOpen = true"
    />

    <mat-snackbar
      v-model="snackbarOpen"
      text="AppRoot 已自动排列浮动组件"
      closable
      position="right"
    />
  </mat-app-root>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.app-root-components-example {
  block-size: 440px;
  background: var(--mat-sys-color-surface-container-lowest);
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
}

.app-root-components-example__content {
  min-block-size: 520px;
  padding: 112px 24px 24px;
}

.app-root-components-example__content h3,
.app-root-components-example__content p {
  margin-block: 0 16px;
}
</style>
<!-- #endregion style -->
