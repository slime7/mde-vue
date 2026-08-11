<script setup>
defineOptions({ name: 'MatCardSubhead' });
</script>

<template>
  <div class="mat-card-subhead mat-sys-typescale-body-medium">
    <slot />
  </div>
</template>

<style scoped>
.mat-card-subhead {
  overflow-wrap: anywhere;
  color: var(--mat-card-subhead-color, var(--mat-sys-color-on-surface-variant));
}
</style>
