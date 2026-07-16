<template>
  <p>线条形：4px 与 8px</p>
  <mat-loader
    shape="wavy"
    :value=".6"
    aria-label="4 像素波浪线进度 60%"
  />
  <mat-loader
    shape="wavy"
    :thickness="8"
    :value=".6"
    aria-label="8 像素波浪线进度 60%"
  />

  <p>环形：4px 与 8px</p>
  <mat-loader
    shape="wavy"
    variant="circular"
    :value=".6"
    aria-label="4 像素波浪环进度 60%"
  />
  <mat-loader
    shape="wavy"
    :thickness="8"
    variant="circular"
    :value=".6"
    aria-label="8 像素波浪环进度 60%"
  />
</template>
