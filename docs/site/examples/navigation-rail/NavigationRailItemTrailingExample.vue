<!-- #region script -->
<script setup>
import { ref } from 'vue';

const expanded = ref(true);
const selected = ref('inbox');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="navigation-rail-example-shell">
    <mat-navigation-rail
      v-model="selected"
      v-model:expanded="expanded"
      collapsible
      aria-label="带 trailing 的导航"
    >
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
    </mat-navigation-rail>

    <div class="navigation-rail-example-content">
      {{ expanded ? '展开状态' : '折叠状态' }}
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
  background: var(--mat-sys-color-surface-container-low);
}
</style>
<!-- #endregion style -->
