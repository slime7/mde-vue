<!-- #region script -->
<script setup>
import { ref } from 'vue';

const expanded = ref(true);
const fullWidth = ref(false);
const selected = ref('inbox');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="navigation-rail-example-shell">
    <mat-navigation-rail
      v-model="selected"
      v-model:expanded="expanded"
      :full-width="fullWidth"
      collapsible
      aria-label="带 trailing 的导航"
    >
      <template #default="{ expanded: currentExpanded }">
        <mat-btn
          variant="standard"
          :icon="currentExpanded ? 'menu_open' : 'menu'"
          :label="currentExpanded ? '收起导航' : '展开导航'"
          @click="expanded = !expanded"
        />
        <mat-navigation-rail-item value="inbox" icon="inbox">
          收件箱
          <template #trailing="{ expanded: railExpanded, selected: itemSelected }">
            <span
              v-if="railExpanded"
              class="navigation-rail-trailing-badge"
            >
              {{ itemSelected ? '12' : '3' }}
            </span>
          </template>
        </mat-navigation-rail-item>
        <mat-navigation-rail-item value="archive" icon="archive">
          归档
          <template #trailing>
            <mat-icon icon="chevron_right" aria-hidden="true" />
          </template>
        </mat-navigation-rail-item>
      </template>
    </mat-navigation-rail>

    <div class="navigation-rail-example-content">
      <mat-switch v-model="fullWidth">
        full-width：{{ fullWidth ? '已激活（trailing 在高亮背景内）' : '未激活（trailing 位于行末）' }}
      </mat-switch>
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

.navigation-rail-trailing-badge {
  display: inline-grid;
  box-sizing: border-box;
  min-inline-size: 20px;
  block-size: 20px;
  place-items: center;
  padding-inline: 6px;
  color: var(--mat-sys-color-on-error-container);
  background: var(--mat-sys-color-error-container);
  border-radius: var(--mat-sys-shape-corner-full);
  font-size: 12px;
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
