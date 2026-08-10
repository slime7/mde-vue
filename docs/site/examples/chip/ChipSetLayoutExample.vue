<!-- #region template -->
<template>
  <div class="layout-examples">
    <mat-chip-set class="chip-set" layout="wrap" aria-label="可换行标签">
      <mat-chip v-for="label in labels" :key="`wrap-${label}`">
        {{ label }}
      </mat-chip>
    </mat-chip-set>

    <mat-chip-set class="chip-set" layout="scroll" aria-label="横向滚动标签">
      <mat-chip v-for="label in labels" :key="`scroll-${label}`">
        {{ label }}
      </mat-chip>
    </mat-chip-set>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
const labels = ['设计', '开发', '测试', '发布', '文档', '运维'];
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.layout-examples {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chip-set {
  max-inline-size: 280px;
}
</style>
<!-- #endregion style -->
