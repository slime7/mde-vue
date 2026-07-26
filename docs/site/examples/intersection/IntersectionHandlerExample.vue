<!-- #region template -->
<template>
  <div
    v-intersection="handleIntersection"
    class="intersection-example__target"
  >
    <strong>{{ isIntersecting ? '元素正在视口内' : '元素不在视口内' }}</strong>
    <span>滚动文档可以触发 handler。</span>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const isIntersecting = ref(false);

function handleIntersection(value) {
  isIntersecting.value = value;
}
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.intersection-example__target {
  display: grid;
  min-block-size: 120px;
  place-content: center;
  gap: 8px;
  color: var(--mat-sys-color-on-primary-container);
  text-align: center;
  background: var(--mat-sys-color-primary-container);
  border-radius: var(--mat-sys-shape-corner-medium);
}

.intersection-example__target span {
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
