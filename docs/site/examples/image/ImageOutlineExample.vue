<!-- #region template -->
<template>
  <div class="example-grid">
    <mat-image
      :src="source"
      alt="默认 outline 描边"
      class="outline-image"
    />
    <mat-image
      :src="source"
      :outline="false"
      alt="关闭 outline 描边"
      class="outline-image"
    />
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
.example-grid {
  display: flex;
  gap: 16px;
}

.example-grid > :deep(*) {
  flex: 1 1 0;
  min-inline-size: 0;
}

.outline-image {
  background: var(--mat-sys-color-surface-container);
}
</style>
<!-- #endregion style -->
