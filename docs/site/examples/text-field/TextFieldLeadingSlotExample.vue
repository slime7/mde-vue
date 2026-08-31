<!-- #region template -->
<template>
  <div class="example-stack">
    <mat-text-field label="邮箱" variant="outlined">
      <template #leading>
        <mat-icon icon="mail" aria-hidden="true" />
      </template>
    </mat-text-field>

    <mat-text-field label="邮箱" variant="filled">
      <template #leading>
        <mat-icon icon="mail" aria-hidden="true" />
      </template>
    </mat-text-field>
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
