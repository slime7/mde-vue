<script setup>
defineOptions({
  name: 'MatSpacer',
  inheritAttrs: false,
});
</script>

<template>
  <span
    v-bind="$attrs"
    class="mat-spacer"
    aria-hidden="true"
  />
</template>

<style scoped>
@layer mde.components {
  .mat-spacer {
    display: block;
    flex-grow: 1;
    min-inline-size: 0;
    min-block-size: 0;
  }
}
</style>
