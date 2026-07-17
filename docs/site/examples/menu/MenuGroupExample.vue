<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(true);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example-menu">
    <mat-btn id="group-menu-trigger" @click="open = !open">
      分组菜单
    </mat-btn>
    <mat-menu
      id="group-menu"
      v-model="open"
      anchor="group-menu-trigger"
    >
      <mat-menu-group label="编辑">
        <mat-menu-item>撤销</mat-menu-item>
        <mat-menu-item>重做</mat-menu-item>
      </mat-menu-group>
      <mat-menu-group label="剪贴板">
        <mat-menu-item>剪切</mat-menu-item>
        <mat-menu-item>复制</mat-menu-item>
        <mat-menu-item>粘贴</mat-menu-item>
      </mat-menu-group>
    </mat-menu>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-menu {
  min-block-size: 300px;
}
</style>
<!-- #endregion style -->
