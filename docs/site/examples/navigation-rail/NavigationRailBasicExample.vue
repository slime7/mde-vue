<!-- #region script -->
<script setup>
import { ref } from 'vue';

const selected = ref('home');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="navigation-rail-example-shell">
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
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-rail-example-shell {
  display: flex;
  inline-size: 100%;
  min-block-size: 280px;
  overflow: hidden;
}

.navigation-rail-example-content {
  display: grid;
  flex: 1 1 auto;
  min-inline-size: 0;
  place-items: center;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
