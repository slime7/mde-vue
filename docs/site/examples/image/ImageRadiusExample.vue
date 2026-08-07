<!-- #region template -->
<template>
  <div class="example-row">
    <div class="example-item">
      <span class="example-label">默认 28px</span>
      <mat-image :src="source" alt="默认圆角" class="radius-image" />
    </div>
    <div class="example-item">
      <span class="example-label">radius="8"</span>
      <mat-image :src="source" radius="8" alt="8px 圆角" class="radius-image" />
    </div>
    <div class="example-item">
      <span class="example-label">radius="50%"</span>
      <mat-image :src="source" radius="50%" alt="百分比圆角" class="radius-image" />
    </div>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
const source = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="320" viewBox="0 0 640 320">'
  + '<rect width="640" height="320" fill="#cfeaff"/>'
  + '<rect x="0" y="240" width="640" height="80" fill="#9ed6ff"/>'
  + '<circle cx="200" cy="150" r="95" fill="#20a6fc"/>'
  + '<rect x="440" y="110" width="120" height="80" rx="16" fill="#20a6fc"/>'
  + '<circle cx="620" cy="60" r="45" fill="#ffb74d"/>'
  + '</svg>',
);
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.example-row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: flex-start;
}

.example-item {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  gap: 8px;
  min-inline-size: 180px;
}

.example-label {
  color: var(--mat-sys-color-on-surface-variant);
  font-size: 14px;
}
</style>
<!-- #endregion style -->
