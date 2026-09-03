<!-- #region script -->
<script setup>
import { ref } from 'vue';

const expanded = ref(true);
const groupExpanded = ref(true);
const selected = ref('file-1');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="navigation-drawer-example-shell">
    <mat-navigation-drawer
      v-model="selected"
      v-model:expanded="expanded"
      aria-label="二级分组抽屉"
    >
      <template #default="{ expanded: currentExpanded }">
        <mat-btn
          variant="standard"
          :icon="currentExpanded ? 'menu_open' : 'menu'"
          :label="currentExpanded ? '收起抽屉' : '展开抽屉'"
          @click="expanded = !expanded"
        />
        <mat-navigation-rail-item value="dashboard" icon="dashboard">
          仪表盘
        </mat-navigation-rail-item>

        <mat-navigation-group v-model:expanded="groupExpanded">
          <template #activator="{ expanded: isGroupOpen, toggle }">
            <mat-navigation-rail-item
              icon="folder"
              @click="toggle"
            >
              工作空间
              <template #trailing>
                <mat-icon
                  :icon="isGroupOpen ? 'expand_less' : 'expand_more'"
                  aria-hidden="true"
                />
              </template>
            </mat-navigation-rail-item>
          </template>

          <mat-navigation-rail-item value="file-1" icon="description">
            设计规范.pdf
          </mat-navigation-rail-item>
          <mat-navigation-rail-item value="file-2" icon="description">
            组件架构.md
          </mat-navigation-rail-item>
        </mat-navigation-group>

        <mat-spacer />

        <mat-btn
          variant="standard"
          icon="help"
          label="帮助与支持"
        />
      </template>
    </mat-navigation-drawer>

    <div class="navigation-drawer-example-content">
      当前选中目的地：{{ selected }}
    </div>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-drawer-example-shell {
  display: flex;
  inline-size: 100%;
  min-block-size: 380px;
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
