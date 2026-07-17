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
      id="variant-menu-trigger"
      aria-haspopup="menu"
      :aria-expanded="open"
      aria-controls="variant-menu"
      @click="open = !open"
    >
      variant
    </mat-btn>
    <mat-menu
      id="variant-menu"
      v-model="open"
      anchor="variant-menu-trigger"
      variant="vibrant"
    >
      <mat-menu-item>高强调菜单</mat-menu-item>
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
