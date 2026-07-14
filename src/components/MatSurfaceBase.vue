<script setup>
defineOptions({
  name: 'MatSurfaceBase',
  inheritAttrs: false,
});

defineProps({
  as: {
    type: String,
    default: 'div',
  },
});
</script>

<template>
  <component
    :is="as"
    v-bind="$attrs"
    class="mat-surface-base"
  >
    <slot />
  </component>
</template>

<style scoped>
.mat-surface-base {
  box-sizing: border-box;
}
</style>
