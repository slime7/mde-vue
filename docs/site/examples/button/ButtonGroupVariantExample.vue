<!-- #region script -->
<script setup>
import { ref } from 'vue';

const selected = ref('one');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example-stack">
    <mat-btn-group>
      <mat-btn>standard</mat-btn>
      <mat-btn>组</mat-btn>
    </mat-btn-group>
    <mat-btn-group
      variant="connected"
      selection="single"
      :selected="selected"
      @select="selected = $event.nextSelected"
    >
      <mat-btn value="one">
        connected
      </mat-btn>
      <mat-btn value="two">
        组
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
