<!-- #region script -->
<script setup>
import { ref } from 'vue';

const selected = ref('home');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="navigation-bar-example-shell">
    <mat-navigation-rail
      v-model="selected"
      orientation="horizontal"
      aria-label="底部导航"
    >
      <mat-navigation-rail-item value="home" icon="home">
        首页
      </mat-navigation-rail-item>
      <mat-navigation-rail-item value="search" icon="search">
        搜索
      </mat-navigation-rail-item>
      <mat-navigation-rail-item value="profile" icon="person">
        我的
      </mat-navigation-rail-item>
    </mat-navigation-rail>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-bar-example-shell {
  display: flex;
  inline-size: 100%;
  min-block-size: 112px;
  align-items: end;
  overflow: hidden;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
}
</style>
<!-- #endregion style -->
