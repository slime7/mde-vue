<!-- #region script -->
<script setup>
import { ref } from 'vue';

const expanded = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="navigation-rail-example-shell">
    <mat-navigation-rail
      v-model:expanded="expanded"
      collapsible
      hide-on-collapse
      layout="modal"
      aria-label="沉浸式导航"
    >
      <template #default="{ expanded: currentExpanded }">
        <mat-btn
          variant="standard"
          :icon="currentExpanded ? 'menu_open' : 'menu'"
          :label="currentExpanded ? '收起导航' : '展开导航'"
          @click="expanded = !expanded"
        />
        <mat-navigation-rail-item icon="home">
          首页
        </mat-navigation-rail-item>
        <mat-navigation-rail-item icon="settings">
          设置
        </mat-navigation-rail-item>
      </template>
    </mat-navigation-rail>

    <div class="navigation-rail-example-content">
      <mat-btn
        icon="menu"
        label="展开导航"
        @click="expanded = !expanded"
      >
        {{ expanded ? '收起' : '展开' }}导航
      </mat-btn>
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
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
}

.navigation-rail-example-content {
  display: grid;
  flex: 1 1 auto;
  min-inline-size: 0;
  place-items: center;
  color: var(--mat-sys-color-on-surface-variant);
  background: var(--mat-sys-color-surface-container-low);
}
</style>
<!-- #endregion style -->
