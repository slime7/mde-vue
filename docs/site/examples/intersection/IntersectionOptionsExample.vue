<!-- #region template -->
<template>
  <div class="intersection-example__viewport">
    <p class="intersection-example__hint">
      向下滚动，使目标元素至少一半进入观察区域。
    </p>
    <div
      v-intersection="binding"
      class="intersection-example__target"
    >
      threshold 0.5：{{ isIntersecting ? '相交' : '未相交' }}
    </div>
    <p class="intersection-example__hint">
      继续滚动可以观察阈值变化。
    </p>
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
  color: var(--mat-sys-color-on-secondary-container);
  background: var(--mat-sys-color-secondary-container);
  border-radius: var(--mat-sys-shape-corner-medium);
}
</style>
<!-- #endregion style -->
