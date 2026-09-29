<!-- #region template -->
<template>
  <mat-btn
    v-ripple="{ color: 'var(--example-ripple-color)' }"
    variant="outlined"
    class="ripple-color-example"
  >
    使用主题令牌
  </mat-btn>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.ripple-color-example {
  --example-ripple-color: var(--mat-sys-color-primary);
}
</style>
<!-- #endregion style -->
