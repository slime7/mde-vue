<template>
  <p>直线</p>
  <mat-loader
    :value=".6"
    aria-label="直线形进度 60%"
  />

  <p>波浪线</p>
  <mat-loader
    shape="wavy"
    :value=".6"
    aria-label="波浪形进度 60%"
  />

  <p>波浪环</p>
  <mat-loader
    shape="wavy"
    variant="circular"
    :value=".6"
    aria-label="波浪环形进度 60%"
  />
</template>
