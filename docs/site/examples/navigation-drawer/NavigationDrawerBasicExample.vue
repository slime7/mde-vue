<!-- #region script -->
<script setup>
import { ref } from 'vue';

const expanded = ref(true);
const selected = ref('inbox');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="navigation-drawer-example-shell">
    <mat-navigation-drawer
      v-model="selected"
      v-model:expanded="expanded"
      aria-label="基础导航抽屉"
    >
      <template #default="{ expanded: currentExpanded }">
        <mat-btn
          variant="standard"
          :icon="currentExpanded ? 'menu_open' : 'menu'"
          :label="currentExpanded ? '收起抽屉' : '展开抽屉'"
          @click="expanded = !expanded"
        />
        <mat-navigation-rail-item value="inbox" icon="inbox">
          收件箱
        </mat-navigation-rail-item>
        <mat-navigation-rail-item value="starred" icon="star">
          收藏夹
        </mat-navigation-rail-item>
        <mat-navigation-rail-item value="sent" icon="send">
          已发送
        </mat-navigation-rail-item>
      </template>
    </mat-navigation-drawer>

    <div class="navigation-drawer-example-content">
      <mat-btn
        v-if="!expanded"
        icon="menu"
        label="展开导航抽屉"
        @click="expanded = true"
      >
        展开导航抽屉
      </mat-btn>
      <span v-else>抽屉已展开，选中：{{ selected }}</span>
    </div>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-drawer-example-shell {
  display: flex;
  inline-size: 100%;
  min-block-size: 320px;
  overflow: hidden;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
}

.navigation-drawer-example-content {
  display: grid;
  flex: 1 1 auto;
  min-inline-size: 0;
  place-items: center;
  color: var(--mat-sys-color-on-surface-variant);
  background: var(--mat-sys-color-surface-container-low);
}
</style>
<!-- #endregion style -->
