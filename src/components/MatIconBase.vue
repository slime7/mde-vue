<script setup>
import { inject } from 'vue';
import MAT_UI_KEY, { DEFAULT_MAT_UI_OPTIONS } from '../mat-ui-context';

defineOptions({
  name: 'MatIconBase',
  inheritAttrs: false,
});

const matUi = inject(MAT_UI_KEY, DEFAULT_MAT_UI_OPTIONS);
</script>

<template>
  <span
    v-bind="$attrs"
    class="mat-icon"
    :class="{ 'mat-icon--material-symbols': matUi.useMaterialSymbols }"
  >
    <slot />
  </span>
</template>

<style scoped>
.mat-icon {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  line-height: 1;
}
</style>
