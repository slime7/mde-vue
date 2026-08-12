<!-- #region template -->
<template>
  <div class="example-row">
    <mat-avatar aria-label="张三">
      张三
    </mat-avatar>

    <mat-avatar aria-hidden="true">
      <mat-icon icon="star" aria-hidden="true" />
    </mat-avatar>

    <mat-avatar aria-label="插槽图片">
      <img :src="slotSource" alt="">
    </mat-avatar>

    <mat-avatar aria-label="超长用户名">
      超长用户名演示截断效果
    </mat-avatar>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
const slotSource = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">'
  + '<rect width="96" height="96" fill="#e8f5e9"/>'
  + '<circle cx="48" cy="36" r="18" fill="#2e7d32"/>'
  + '<path d="M16 96c0-20 14-32 32-32s32 12 32 32z" fill="#1b5e20"/>'
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
