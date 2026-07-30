<!-- #region template -->
<template>
  <div class="example-stack">
    <mat-text-field label="primary" color="primary" />
    <mat-text-field label="secondary" color="secondary" />
    <mat-text-field label="tertiary" color="tertiary" />
    <mat-text-field label="error" color="error" />
    <mat-text-field label="局部种子色" color="#6750a4" />
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
