<!-- #region script -->
<script setup>
import { ref } from 'vue';

const expanded = ref(false);
const selected = ref('overview');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-layout class="navigation-rail-example-shell">
    <mat-navigation-rail
      v-model="selected"
      v-model:expanded="expanded"
      collapsible
      aria-label="可展开导航"
    >
      <template #default="{ expanded: currentExpanded }">
        <mat-btn
          variant="standard"
          :icon="currentExpanded ? 'menu_open' : 'menu'"
          :label="currentExpanded ? '收起导航' : '展开导航'"
          @click="expanded = !expanded"
        />
        <mat-navigation-rail-item value="overview" icon="dashboard">
          概览
        </mat-navigation-rail-item>
        <mat-navigation-rail-item value="analytics" icon="analytics">
          分析
        </mat-navigation-rail-item>
      </template>
    </mat-navigation-rail>

    <div class="navigation-rail-example-content">
      {{ expanded ? '展开状态' : '折叠状态' }}
    </div>
  </mat-layout>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-rail-example-shell {
  inline-size: 100%;
  min-block-size: 280px;
  overflow: hidden;
}

.navigation-rail-example-content {
  display: grid;
  min-inline-size: 0;
  min-block-size: 280px;
  place-items: center;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
