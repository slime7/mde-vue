<script setup>
defineOptions({ name: 'MatCardHeadline' });
</script>

<template>
  <div class="mat-card-headline">
    <slot />
  </div>
</template>

<style scoped>
.mat-card-headline {
  overflow-wrap: anywhere;
  color: inherit;
  font-family: var(--mat-sys-typescale-title-large-font);
  font-size: var(--mat-sys-typescale-title-large-size);
  font-weight: var(--mat-sys-typescale-title-large-weight);
  line-height: var(--mat-sys-typescale-title-large-line-height);
  letter-spacing: var(--mat-sys-typescale-title-large-tracking);
}
</style>
