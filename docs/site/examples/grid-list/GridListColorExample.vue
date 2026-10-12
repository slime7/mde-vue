<!-- #region script -->
<script setup>
import { ref } from 'vue';

const selected = ref('primary');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example-grid">
    <mat-grid-list
      interaction="single-select"
      :selected="selected"
      color="primary"
      active-color="tertiary-container"
      aria-label="配色方案"
      class="example-stage"
      @select="selected = $event.nextSelected"
    >
      <mat-list-item value="primary">
        primary 表面
      </mat-list-item>
      <mat-list-item value="surface">
        surface 表面
      </mat-list-item>
      <mat-list-item value="secondary">
        secondary 表面
      </mat-list-item>
      <mat-list-item value="tertiary">
        tertiary 表面
      </mat-list-item>
    </mat-grid-list>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-grid {
  inline-size: 100%;
}

.example-stage {
  inline-size: 100%;
}
</style>
<!-- #endregion style -->
