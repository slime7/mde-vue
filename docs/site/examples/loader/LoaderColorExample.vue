<!-- #region template -->
<template>
  <p>语义 tertiary 色</p>
  <mat-loader
    color="tertiary"
    :value=".6"
    aria-label="tertiary 色进度 60%"
  />

  <p>局部种子色</p>
  <mat-loader
    color="#6750a4"
    variant="circular"
    :value=".6"
    aria-label="紫色进度 60%"
  />
</template>
<!-- #endregion template -->
