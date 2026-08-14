<script setup>
defineOptions({ name: 'MatCardMedia' });
</script>

<template>
  <div class="mat-card-media">
    <slot />
  </div>
</template>

<style scoped>
@layer mde.components {
  .mat-card-media {
    display: block;
    inline-size: 100%;
    overflow: hidden;
  }

  .mat-card-media :deep(img),
  .mat-card-media :deep(video) {
    display: block;
    inline-size: 100%;
    max-inline-size: 100%;
    block-size: auto;
  }
}
</style>
