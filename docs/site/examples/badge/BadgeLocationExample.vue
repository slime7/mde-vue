<!-- #region template -->
<template>
  <div class="location-grid">
    <template
      v-for="(location, index) in locations"
      :key="location ?? `empty-${index}`"
    >
      <mat-badge
        v-if="location"
        :content="index + 1"
        :location="location"
      >
        <mat-icon icon="notifications" />
      </mat-badge>

      <span v-else />
    </template>
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
  null,
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
  place-items: center;
}
</style>
<!-- #endregion style -->
