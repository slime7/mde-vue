<template>
  <div class="example">
    <mat-slider
      aria-label="音量"
      inset-icon="volume_up"
      model-value="55"
      size="medium"
    />
    <mat-slider
      aria-label="亮度"
      inset-icon="light_mode"
      model-value="70"
      size="large"
    />
    <mat-slider
      aria-label="飞行高度"
      inset-icon="flight"
      model-value="85"
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
