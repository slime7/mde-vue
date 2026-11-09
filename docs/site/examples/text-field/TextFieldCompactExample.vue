<!-- #region template -->
<template>
  <div class="example-stack">
    <mat-text-field
      density="compact"
      label="outlined compact"
      model-value="项目甲"
    />

    <mat-text-field
      density="compact"
      label="filled compact"
      model-value="已启用"
      variant="filled"
    />
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
  inline-size: 100%;
}
</style>
<!-- #endregion style -->
