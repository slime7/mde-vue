<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(true);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example-menu">
    <mat-btn id="submenu-slot-menu-trigger" @click="open = !open">
      submenu
    </mat-btn>
    <mat-menu
      id="submenu-slot-menu"
      v-model="open"
      anchor="submenu-slot-menu-trigger"
    >
      <mat-menu-item>
        导出
        <template #submenu>
          <mat-menu>
            <mat-menu-item>PDF</mat-menu-item>
            <mat-menu-item>SVG</mat-menu-item>
          </mat-menu>
        </template>
      </mat-menu-item>
    </mat-menu>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-menu {
  min-block-size: 180px;
}
</style>
<!-- #endregion style -->
