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
    color="secondary"
    aria-label="配色列表"
    class="example-list"
    @select="selected = $event.nextSelected"
  >
    <mat-list-item value="primary">
      primary
    </mat-list-item>
    <mat-list-item value="secondary">
      secondary
    </mat-list-item>
  </mat-list>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-list {
  inline-size: min(100%, 420px);
}
</style>
<!-- #endregion style -->
