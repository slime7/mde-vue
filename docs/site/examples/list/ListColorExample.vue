<!-- #region script -->
<script setup>
import { ref } from 'vue';

const selected = ref('primary');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-list
    interaction="single-select"
    :selected="selected"
    color="surface-container-high"
    active-color="primary"
    aria-label="通常与选中背景色示例"
    class="example-list"
    @select="selected = $event.nextSelected"
  >
    <mat-list-item value="primary">
      通常状态使用 color，选中项使用 activeColor
    </mat-list-item>
    <mat-list-item value="secondary">
      第二项
    </mat-list-item>
  </mat-list>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-list {
  inline-size: 100%;
}
</style>
<!-- #endregion style -->
