<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example-menu">
    <mat-btn id="item-default-slot-menu-trigger" @click="open = !open">
      项目标签
    </mat-btn>
    <mat-menu
      id="item-default-slot-menu"
      v-model="open"
      anchor="item-default-slot-menu-trigger"
    >
      <mat-menu-item>默认 Slot 提供操作标签</mat-menu-item>
    </mat-menu>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-menu {
  min-block-size: 160px;
}
</style>
<!-- #endregion style -->
