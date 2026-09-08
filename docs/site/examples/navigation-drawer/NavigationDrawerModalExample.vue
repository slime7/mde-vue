<!-- #region script -->
<script setup>
import { ref } from 'vue';

const expanded = ref(false);
const selected = ref('home');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-layout class="navigation-drawer-example-shell">
    <mat-navigation-drawer
      v-model="selected"
      v-model:expanded="expanded"
      layout="modal"
      aria-label="模态导航抽屉"
    >
      <template #default="{ expanded: currentExpanded }">
        <mat-btn
          variant="standard"
          :icon="currentExpanded ? 'menu_open' : 'menu'"
          :label="currentExpanded ? '收起抽屉' : '展开抽屉'"
          @click="expanded = !expanded"
        />
        <mat-navigation-rail-item value="home" icon="home">
          首页
        </mat-navigation-rail-item>
        <mat-navigation-rail-item value="explore" icon="explore">
          探索
        </mat-navigation-rail-item>
        <mat-navigation-rail-item value="settings" icon="settings">
          设置
        </mat-navigation-rail-item>
      </template>
    </mat-navigation-drawer>

    <div class="navigation-drawer-example-content">
      <mat-btn
        icon="menu"
        label="打开模态抽屉"
        @click="expanded = true"
      >
        打开模态抽屉
      </mat-btn>
    </div>
  </mat-layout>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-drawer-example-shell {
  position: relative;
  inline-size: 100%;
  block-size: 320px;
  overflow: hidden;
}

.navigation-drawer-example-content {
  display: flex;
  align-items: center;
  justify-content: center;
  min-inline-size: 0;
  block-size: 320px;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
