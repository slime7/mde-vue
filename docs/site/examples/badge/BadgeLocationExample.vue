<!-- #region template -->
<template>
  <div class="location-grid">
    <mat-badge
      v-for="location in locations"
      :key="location"
      :content="location"
      :location="location"
    >
      <span class="target">{{ location }}</span>
    </mat-badge>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
const locations = [
  'top-start',
  'top',
  'top-end',
  'start',
  'end',
  'bottom-start',
  'bottom',
  'bottom-end',
];
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.location-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(120px, 1fr));
  gap: 56px 40px;
  inline-size: 100%;
}

.target {
  display: inline-flex;
  min-inline-size: 96px;
  min-block-size: 48px;
  align-items: center;
  justify-content: center;
  color: var(--mat-sys-color-on-surface-variant);
  background: var(--mat-sys-color-surface-container);
  border-radius: var(--mat-sys-shape-corner-medium);
}
</style>
<!-- #endregion style -->
