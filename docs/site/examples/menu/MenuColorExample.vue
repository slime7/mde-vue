<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example-menu">
    <mat-btn
      id="color-menu-trigger"
      aria-haspopup="menu"
      :aria-expanded="open"
      aria-controls="color-menu"
      @click="open = !open"
    >
      color
    </mat-btn>
    <mat-menu
      id="color-menu"
      v-model="open"
      anchor="color-menu-trigger"
      color="#6750a4"
      variant="vibrant"
    >
      <mat-menu-item>局部种子色菜单</mat-menu-item>
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
