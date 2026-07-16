<script setup>
const locations = [
  { name: 'top', target: '#tooltip-location-top' },
  { name: 'top-start', target: '#tooltip-location-top-start' },
  { name: 'top-end', target: '#tooltip-location-top-end' },
  { name: 'right', target: '#tooltip-location-right' },
  { name: 'right-start', target: '#tooltip-location-right-start' },
  { name: 'right-end', target: '#tooltip-location-right-end' },
  { name: 'bottom', target: '#tooltip-location-bottom' },
  { name: 'bottom-start', target: '#tooltip-location-bottom-start' },
  { name: 'bottom-end', target: '#tooltip-location-bottom-end' },
  { name: 'left', target: '#tooltip-location-left' },
  { name: 'left-start', target: '#tooltip-location-left-start' },
  { name: 'left-end', target: '#tooltip-location-left-end' },
];
</script>

<template>
  <div class="tooltip-location-grid">
    <div
      v-for="item in locations"
      :key="item.name"
      class="tooltip-location-item"
    >
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
    </div>
  </div>
</template>

<style scoped>
.tooltip-location-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.tooltip-location-item {
  display: flex;
  justify-content: center;
}
</style>
