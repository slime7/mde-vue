<!-- #region script -->
<script setup>
import { ref } from 'vue';

const expanded = ref(true);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="fab-expanded-example">
    <mat-switch v-model="expanded">
      显示标签
    </mat-switch>

    <mat-fab
      :expanded="expanded"
      size="small"
      icon="add"
      label="新建"
    >
      新建
    </mat-fab>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.fab-expanded-example {
  display: flex;
  align-items: center;
  gap: 24px;
}
</style>
<!-- #endregion style -->
