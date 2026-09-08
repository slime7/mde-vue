<!-- #region template -->
<template>
  <div class="example-row">
    <mat-fab
      v-for="color in colors"
      :key="color"
      :color="color"
      icon="palette"
    >
      {{ color }}
    </mat-fab>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
const colors = [
  'primary',
  'secondary',
  'tertiary',
  'primary-container',
  'secondary-container',
  'tertiary-container',
  'error',
  'error-container',
];
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.example-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
</style>
<!-- #endregion style -->
