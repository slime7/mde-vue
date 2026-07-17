<!-- #region script -->
<script setup>
import { ref } from 'vue';

const singleSelected = ref('day');
const multipleSelected = ref(['bold']);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example-stack">
    <mat-btn-group
      selection="single"
      :selected="singleSelected"
      @select="singleSelected = $event.nextSelected"
    >
      <mat-btn value="day">
        日间
      </mat-btn>
      <mat-btn value="night">
        夜间
      </mat-btn>
    </mat-btn-group>
    <mat-btn-group
      selection="multiple"
      :selected="multipleSelected"
      @select="multipleSelected = $event.nextSelected"
    >
      <mat-btn value="bold">
        粗体
      </mat-btn>
      <mat-btn value="italic">
        斜体
      </mat-btn>
    </mat-btn-group>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
}
</style>
<!-- #endregion style -->
