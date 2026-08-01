<script setup>
defineOptions({ name: 'MatCardSubhead' });
</script>

<template>
  <div class="mat-card-subhead">
    <slot />
  </div>
</template>

<style scoped>
.mat-card-subhead {
  overflow-wrap: anywhere;
  color: var(--mat-card-subhead-color, var(--mat-sys-color-on-surface-variant));
  font-family: var(--mat-sys-typescale-body-medium-font);
  font-size: var(--mat-sys-typescale-body-medium-size);
  font-weight: var(--mat-sys-typescale-body-medium-weight);
  line-height: var(--mat-sys-typescale-body-medium-line-height);
  letter-spacing: var(--mat-sys-typescale-body-medium-tracking);
}
</style>
