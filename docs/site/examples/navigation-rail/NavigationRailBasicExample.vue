<!-- #region script -->
<script setup>
import { ref } from 'vue';

const selected = ref('home');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-layout class="navigation-rail-example-shell">
    <mat-navigation-rail
      v-model="selected"
      aria-label="主导航"
    >
      <mat-navigation-rail-item value="home" icon="home">
        首页
      </mat-navigation-rail-item>
      <mat-navigation-rail-item value="projects" icon="folder">
        项目
      </mat-navigation-rail-item>
      <mat-navigation-rail-item value="settings" icon="settings">
        设置
      </mat-navigation-rail-item>
    </mat-navigation-rail>

    <div class="navigation-rail-example-content">
      当前页面：{{ selected }}
    </div>
  </mat-layout>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-rail-example-shell {
  inline-size: 100%;
  block-size: 280px;
  overflow: hidden;
}

.navigation-rail-example-content {
  display: flex;
  align-items: center;
  justify-content: center;
  min-inline-size: 0;
  block-size: 280px;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
