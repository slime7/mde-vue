<!-- #region template -->
<template>
  <div class="loader-sizes">
    <div>
      <p>24px</p>
      <mat-loader
        variant="circular"
        :size="24"
        :value=".6"
        aria-label="24 像素环形进度 60%"
      />
    </div>

    <div>
      <p>默认 48px</p>
      <mat-loader
        variant="circular"
        :value=".6"
        aria-label="48 像素环形进度 60%"
      />
    </div>

    <div>
      <p>240px</p>
      <mat-loader
        variant="circular"
        :size="240"
        :value=".6"
        aria-label="240 像素环形进度 60%"
      />
    </div>
  </div>

  <div class="loader-sizes">
    <div>
      <p>24px 波浪形</p>
      <mat-loader
        shape="wavy"
        variant="circular"
        :size="24"
        :value=".6"
        aria-label="24 像素波浪环形进度 60%"
      />
    </div>

    <div>
      <p>默认 48px 波浪形</p>
      <mat-loader
        shape="wavy"
        variant="circular"
        :value=".6"
        aria-label="48 像素波浪环形进度 60%"
      />
    </div>

    <div>
      <p>240px 波浪形</p>
      <mat-loader
        shape="wavy"
        variant="circular"
        :size="240"
        :value=".6"
        aria-label="240 像素波浪环形进度 60%"
      />
    </div>
  </div>

  <p>线条形忽略 size="240"，仍填满可用宽度</p>
  <mat-loader
    :size="240"
    :value=".6"
    aria-label="线条进度 60%"
  />
</template>
<!-- #endregion template -->

<style scoped>
.loader-sizes {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: flex-start;
}
</style>
