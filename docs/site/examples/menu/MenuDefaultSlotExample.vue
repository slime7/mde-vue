<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example-menu">
    <mat-btn id="default-slot-menu-trigger" @click="open = !open">
      默认 Slot
    </mat-btn>
    <mat-menu
      id="default-slot-menu"
      v-model="open"
      anchor="default-slot-menu-trigger"
    >
      <mat-menu-item>直接放置的项目</mat-menu-item>
      <mat-divider />
      <mat-menu-item>直接放置的分隔线</mat-menu-item>
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
