<!-- #region script -->
<script setup>
import { ref } from 'vue';

const selected = ref('home');
const expanded = ref(true);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="navigation-bar-example-shell">
    <button
      class="navigation-bar-example-toggle"
      type="button"
      @click="expanded = !expanded"
    >
      {{ expanded ? '切换为图标在上的 Item' : '切换为图标在左的 Item' }}
    </button>

    <mat-navigation-rail
      v-model="selected"
      :expanded="expanded"
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
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  gap: 12px;
  overflow: hidden;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
}

.navigation-bar-example-toggle {
  align-self: flex-start;
  min-block-size: 40px;
  padding-inline: 12px;
  color: var(--mat-sys-color-primary);
  background: var(--mat-sys-color-secondary-container);
  border: 0;
  border-radius: var(--mat-sys-shape-corner-full);
}
</style>
<!-- #endregion style -->
