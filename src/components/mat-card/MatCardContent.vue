<script setup>
defineOptions({ name: 'MatCardContent' });
</script>
<template>
  <div class="mat-card-content">
    <slot />
  </div>
</template>
<style scoped>.mat-card-content { padding: 16px; }</style>
