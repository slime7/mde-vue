<template>
  <div class="example">
    <mat-range-slider
      aria-label-end="超小尺寸结束值"
      aria-label-start="超小尺寸起始值"
      :model-value="[15, 45]"
      size="extra-small"
    />
    <mat-range-slider
      aria-label-end="小尺寸结束值"
      aria-label-start="小尺寸起始值"
      :model-value="[20, 50]"
      size="small"
    />
    <mat-range-slider
      aria-label-end="中等尺寸结束值"
      aria-label-start="中等尺寸起始值"
      :model-value="[25, 55]"
      size="medium"
    />
    <mat-range-slider
      aria-label-end="大尺寸结束值"
      aria-label-start="大尺寸起始值"
      :model-value="[30, 60]"
      size="large"
    />
    <mat-range-slider
      aria-label-end="超大尺寸结束值"
      aria-label-start="超大尺寸起始值"
      :model-value="[35, 65]"
      size="extra-large"
    />
  </div>
</template>

<style scoped>
.example {
  display: grid;
  gap: 20px;
  inline-size: min(100%, 560px);
}
</style>
