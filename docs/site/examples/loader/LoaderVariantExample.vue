<!-- #region template -->
<template>
  <p>线条形</p>
  <mat-loader
    :value=".6"
    aria-label="线条形进度 60%"
  />

  <p>环形</p>
  <mat-loader
    variant="circular"
    :value=".6"
    aria-label="环形进度 60%"
  />
</template>
<!-- #endregion template -->
