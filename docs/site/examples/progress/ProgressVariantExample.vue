<!-- #region template -->
<template>
  <p>线条形</p>
  <mat-progress
    :value=".6"
    aria-label="线条形进度 60%"
  />

  <p>环形</p>
  <mat-progress
    variant="circular"
    :value=".6"
    aria-label="环形进度 60%"
  />
</template>
<!-- #endregion template -->
