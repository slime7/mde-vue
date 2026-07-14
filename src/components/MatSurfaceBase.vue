<script setup>
import { ref } from 'vue';

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

const root = ref(null);

defineExpose({ root });
</script>

<template>
  <component
    :is="as"
    ref="root"
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
