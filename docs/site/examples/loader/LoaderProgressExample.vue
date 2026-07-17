<!-- #region template -->
<template>
  <p>0 / 100</p>
  <mat-loader
    :max="100"
    :value="0"
    aria-label="文件上传进度 0%"
  />

  <p>环形 0 / 100</p>
  <mat-loader
    :max="100"
    :value="0"
    variant="circular"
    aria-label="环形文件上传进度 0%"
  />

  <p>80 / 100</p>
  <mat-loader
    :max="100"
    :value="80"
    aria-label="文件上传进度 80%"
  />
</template>
<!-- #endregion template -->
