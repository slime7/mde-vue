<!-- #region script -->
<script setup>
import { ref } from 'vue';

const selected = ref('dashboard');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-app-root
    :fill-viewport="false"
    class="navigation-bar-app-example"
  >
    <main class="navigation-bar-app-content">
      <h4>应用级底部导航</h4>
      <p>开启 app 后自动向 MatAppRoot 注册底部边缘避让与安全区。</p>
    </main>

    <mat-navigation-bar
      v-model="selected"
      app
      aria-label="应用导航"
    >
      <mat-navigation-bar-item value="dashboard" icon="dashboard">
        看板
      </mat-navigation-bar-item>
      <mat-navigation-bar-item value="notifications" icon="notifications">
        通知
      </mat-navigation-bar-item>
      <mat-navigation-bar-item value="settings" icon="settings">
        设置
      </mat-navigation-bar-item>
    </mat-navigation-bar>
  </mat-app-root>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-bar-app-example {
  position: relative;
  block-size: 200px;
  overflow: hidden;
}

.navigation-bar-app-content {
  padding: 16px;
}

.navigation-bar-app-content h4,
.navigation-bar-app-content p {
  margin: 0;
}

.navigation-bar-app-content p {
  margin-block-start: 8px;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
