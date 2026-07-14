<script setup>
defineOptions({ name: 'MatCardActions' });
</script>
<template>
  <div class="mat-card-actions">
    <slot />
  </div>
</template>
<style scoped>
.mat-card-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding: 8px;
}
</style>
