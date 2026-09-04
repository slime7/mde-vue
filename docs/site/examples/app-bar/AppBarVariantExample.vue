<!-- #region template -->
<template>
  <div class="app-bar-variant-example">
    <mat-app-bar variant="search">
      <mat-search v-model="query" label="搜索项目" />
    </mat-app-bar>

    <mat-app-bar variant="small">
      小型应用栏
    </mat-app-bar>

    <mat-app-bar variant="medium-flexible">
      中型灵活应用栏
    </mat-app-bar>

    <mat-app-bar variant="large-flexible">
      大型灵活应用栏
    </mat-app-bar>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const query = ref('');
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.app-bar-variant-example {
  display: flex;
  inline-size: 100%;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
  overflow: hidden;
}

.app-bar-variant-example :deep(.mat-app-bar) {
  position: static;
}
</style>
<!-- #endregion style -->
