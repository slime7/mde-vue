<!-- #region script -->
<script setup>
const locations = [
  { name: 'top-start', target: '#tooltip-location-top-start' },
  { name: 'top', target: '#tooltip-location-top' },
  { name: 'top-end', target: '#tooltip-location-top-end' },
  { name: 'left-start', target: '#tooltip-location-left-start' },
  null,
  { name: 'right-start', target: '#tooltip-location-right-start' },
  { name: 'left', target: '#tooltip-location-left' },
  null,
  { name: 'right', target: '#tooltip-location-right' },
  { name: 'left-end', target: '#tooltip-location-left-end' },
  null,
  { name: 'right-end', target: '#tooltip-location-right-end' },
  { name: 'bottom-start', target: '#tooltip-location-bottom-start' },
  { name: 'bottom', target: '#tooltip-location-bottom' },
  { name: 'bottom-end', target: '#tooltip-location-bottom-end' },
];
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="tooltip-location-grid">
    <div
      v-for="(item, index) in locations"
      :key="item?.name ?? `placeholder-${index}`"
      class="tooltip-location-item"
    >
      <template v-if="item">
        <mat-btn
          :id="item.target.slice(1)"
          variant="outlined"
        >
          {{ item.name }}
        </mat-btn>
        <mat-tooltip
          content="查看提示位置"
          :location="item.name"
          :target="item.target"
        />
      </template>
    </div>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.tooltip-location-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  inline-size: 100%;
}

.tooltip-location-item {
  display: flex;
  min-inline-size: 0;
  justify-content: center;
  align-items: center;
}

.tooltip-location-item :deep(.mat-btn) {
  flex-shrink: 0;
}
</style>
<!-- #endregion style -->
