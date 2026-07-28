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
  justify-content: flex-end;
  gap: 8px;
  padding: 16px;
}
</style>
