<!-- #region template -->
<template>
  <div class="example-row">
    <mat-avatar :src="source" aria-label="示例用户头像" />
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
const source = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">'
  + '<rect width="96" height="96" fill="#cfeaff"/>'
  + '<circle cx="48" cy="36" r="18" fill="#20a6fc"/>'
  + '<path d="M16 96c0-20 14-32 32-32s32 12 32 32z" fill="#0b6bbf"/>'
  + '</svg>',
);
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.example-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}
</style>
<!-- #endregion style -->
