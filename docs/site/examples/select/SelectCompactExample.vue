<!-- #region script -->
<script setup>
const items = ['甲', '乙', '丙'];
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="select-example-grid">
    <mat-select
      density="compact"
      model-value="甲"
      label="Outlined compact"
      :items="items"
    />

    <mat-select
      density="compact"
      model-value="乙"
      label="Filled compact"
      variant="filled"
      :items="items"
    />
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.select-example-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: 24px;
  inline-size: 100%;
}
</style>
<!-- #endregion style -->
