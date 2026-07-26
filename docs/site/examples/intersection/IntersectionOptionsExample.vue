<!-- #region template -->
<template>
  <div
    v-intersection="binding"
    class="intersection-example__target"
  >
    threshold 0.5：{{ isIntersecting ? '相交' : '未相交' }}
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const isIntersecting = ref(false);
const binding = {
  handler(value) {
    isIntersecting.value = value;
  },
  options: {
    threshold: 0.5,
  },
};
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.intersection-example__target {
  display: grid;
  min-block-size: 120px;
  place-items: center;
  color: var(--mat-sys-color-on-secondary-container);
  background: var(--mat-sys-color-secondary-container);
  border-radius: var(--mat-sys-shape-corner-medium);
}
</style>
<!-- #endregion style -->
