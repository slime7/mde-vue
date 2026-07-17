<!-- #region script -->
<script setup>
import { ref } from 'vue';

const selected = ref('two');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-list
    interaction="single-select"
    :selected="selected"
    aria-label="项目值"
    class="example-list"
    @select="selected = $event.nextSelected"
  >
    <mat-list-item value="one">
      值为 one
    </mat-list-item>
    <mat-list-item value="two">
      值为 two
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
