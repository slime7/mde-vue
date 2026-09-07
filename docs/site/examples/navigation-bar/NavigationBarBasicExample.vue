<!-- #region script -->
<script setup>
import { ref } from 'vue';

const selected = ref('home');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-layout class="navigation-bar-example-shell">
    <div class="navigation-bar-example-content">
      当前选中：{{ selected }}
    </div>

    <mat-navigation-bar
      v-model="selected"
      aria-label="底部导航"
    >
      <mat-navigation-bar-item value="home" icon="home">
        首页
      </mat-navigation-bar-item>
      <mat-navigation-bar-item value="chat" icon="chat">
        消息
      </mat-navigation-bar-item>
      <mat-navigation-bar-item value="profile" icon="person">
        我的
      </mat-navigation-bar-item>
    </mat-navigation-bar>
  </mat-layout>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-bar-example-shell {
  inline-size: 100%;
  min-block-size: 200px;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-medium);
  overflow: hidden;
}

.navigation-bar-example-content {
  display: grid;
  min-inline-size: 0;
  min-block-size: 200px;
  place-items: center;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
