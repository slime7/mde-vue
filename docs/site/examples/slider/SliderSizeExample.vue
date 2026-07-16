<template>
  <div class="example">
    <mat-slider
      aria-label="超小尺寸"
      model-value="20"
      size="extra-small"
    />
    <mat-slider
      aria-label="小尺寸"
      model-value="35"
      size="small"
    />
    <mat-slider
      aria-label="中等尺寸"
      model-value="50"
      size="medium"
    />
    <mat-slider
      aria-label="大尺寸"
      model-value="65"
      size="large"
    />
    <mat-slider
      aria-label="超大尺寸"
      model-value="80"
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
