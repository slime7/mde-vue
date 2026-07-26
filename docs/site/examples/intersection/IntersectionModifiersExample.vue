<!-- #region template -->
<template>
  <div class="intersection-example__viewport">
    <p class="intersection-example__hint">
      向下滚动，让目标元素首次进入观察区域。
    </p>
    <div
      v-intersection.quiet.once="handleIntersection"
      class="intersection-example__target"
    >
      quiet + once：{{ count }} 次相交回调
    </div>
    <p class="intersection-example__hint">
      再次滚动不会增加回调次数。
    </p>
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
.intersection-example__viewport {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  inline-size: min(100%, 480px);
  block-size: 240px;
  padding: 16px;
  overflow-block: auto;
  overscroll-behavior: contain;
  background: var(--mat-sys-color-surface-container-low);
  border-radius: var(--mat-sys-shape-corner-medium);
}

.intersection-example__hint {
  display: grid;
  flex: none;
  min-block-size: 176px;
  margin: 0;
  place-items: center;
  color: var(--mat-sys-color-on-surface-variant);
  text-align: center;
}

.intersection-example__target {
  display: grid;
  flex: none;
  min-block-size: 120px;
  place-items: center;
  color: var(--mat-sys-color-on-tertiary-container);
  background: var(--mat-sys-color-tertiary-container);
  border-radius: var(--mat-sys-shape-corner-medium);
}
</style>
<!-- #endregion style -->
