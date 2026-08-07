<!-- #region template -->
<template>
  <div class="example-stack">
    <mat-image
      :src="source"
      img-class="image-frame"
      alt="img-class 示例"
      class="demo-image"
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
.example-stack {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

.demo-image {
  max-inline-size: 480px;
}

.example-stack :deep(.image-frame) {
  outline: 4px solid var(--mat-sys-color-primary);
  outline-offset: -4px;
}
</style>
<!-- #endregion style -->
