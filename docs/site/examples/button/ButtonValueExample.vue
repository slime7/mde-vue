<!-- #region script -->
<script setup>
import { ref } from 'vue';

const selected = ref(['bold']);

function updateSelection({ nextSelected }) {
  selected.value = nextSelected;
}
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-btn-group
    selection="multiple"
    :selected="selected"
    @select="updateSelection"
  >
    <mat-btn value="bold">
      粗体
    </mat-btn>
    <mat-btn value="italic">
      斜体
    </mat-btn>
  </mat-btn-group>
</template>
<!-- #endregion template -->
