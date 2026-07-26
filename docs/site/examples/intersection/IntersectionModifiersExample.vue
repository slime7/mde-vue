<!-- #region template -->
<template>
  <div
    v-intersection.quiet.once="handleIntersection"
    class="intersection-example__target"
  >
    quiet + once：{{ count }} 次相交回调
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const count = ref(0);

function handleIntersection() {
  count.value += 1;
}
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.intersection-example__target {
  display: grid;
  min-block-size: 120px;
  place-items: center;
  color: var(--mat-sys-color-on-tertiary-container);
  background: var(--mat-sys-color-tertiary-container);
  border-radius: var(--mat-sys-shape-corner-medium);
}
</style>
<!-- #endregion style -->
