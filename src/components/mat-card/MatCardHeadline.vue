<script setup>
defineOptions({ name: 'MatCardHeadline' });
</script>

<template>
  <div class="mat-card-headline mat-sys-typescale-title-large">
    <slot />
  </div>
</template>

<style scoped>
.mat-card-headline {
  overflow-wrap: anywhere;
  color: inherit;
}
</style>
