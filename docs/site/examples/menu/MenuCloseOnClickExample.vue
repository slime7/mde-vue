<!-- #region script -->
<script setup>
import { ref } from 'vue';

const persistentRootOpen = ref(false);
const nestedOpen = ref(false);
const lastAction = ref('尚未点击项目');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example-menu">
    <mat-btn
      id="persistent-root-menu-trigger"
      variant="outlined"
      aria-haspopup="menu"
      :aria-expanded="persistentRootOpen"
      aria-controls="persistent-root-menu"
      @click="persistentRootOpen = !persistentRootOpen"
    >
      保持根菜单开启
    </mat-btn>
    <mat-menu
      id="persistent-root-menu"
      v-model="persistentRootOpen"
      anchor="persistent-root-menu-trigger"
      :close-on-click="false"
    >
      <mat-menu-item @click="lastAction = '根菜单保持开启'">
        根菜单保持开启
      </mat-menu-item>
    </mat-menu>

    <mat-btn
      id="nested-persistent-menu-trigger"
      variant="outlined"
      aria-haspopup="menu"
      :aria-expanded="nestedOpen"
      aria-controls="nested-persistent-menu"
      @click="nestedOpen = !nestedOpen"
    >
      打开子菜单示例
    </mat-btn>
    <mat-menu
      id="nested-persistent-menu"
      v-model="nestedOpen"
      anchor="nested-persistent-menu-trigger"
    >
      <mat-menu-item>
        导出
        <template #submenu>
          <mat-menu :close-on-click="false">
            <mat-menu-item @click="lastAction = '子菜单保持开启'">
              子菜单保持开启
            </mat-menu-item>
          </mat-menu>
        </template>
      </mat-menu-item>
    </mat-menu>

    <p class="example-menu__status">
      最近操作：{{ lastAction }}
    </p>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-menu {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  min-block-size: 220px;
}

.example-menu__status {
  flex-basis: 100%;
  margin: 0;
}
</style>
<!-- #endregion style -->
