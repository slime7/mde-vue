<!-- #region template -->
<template>
  <div class="intersection-example">
    <p
      class="intersection-example__status"
      :class="{ 'intersection-example__status--active': isIntersecting }"
      aria-live="polite"
    >
      threshold 0.5：{{ isIntersecting ? '相交' : '未相交' }}
    </p>
    <div class="intersection-example__viewport">
      <p class="intersection-example__hint">
        向下滚动，使目标元素至少一半进入观察区域。
      </p>
      <div
        v-intersection="binding"
        class="intersection-example__target"
      >
        <strong>目标元素</strong>
        <span>一半以上进入观察区域才判定为相交。</span>
      </div>
      <p class="intersection-example__hint">
        继续滚动可以观察阈值变化。
      </p>
    </div>
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
.intersection-example {
  display: flex;
  flex-direction: column;
  gap: 12px;
  inline-size: 100%;
  block-size: 100%;
}

.intersection-example__status {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  min-block-size: 44px;
  margin: 0;
  padding: 8px 16px;
  color: var(--mat-sys-color-on-surface-variant);
  background: var(--mat-sys-color-surface-container-high);
  border-radius: var(--mat-sys-shape-corner-medium);
  transition: background-color 200ms ease, color 200ms ease;
}

.intersection-example__status--active {
  color: var(--mat-sys-color-on-primary-container);
  background: var(--mat-sys-color-primary-container);
}

.intersection-example__viewport {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  min-block-size: 0;
  padding: 16px;
  overflow-block: auto;
  overscroll-behavior: contain;
  background: var(--mat-sys-color-surface-container-low);
  border-radius: var(--mat-sys-shape-corner-medium);
}

.intersection-example__hint {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  min-block-size: 176px;
  margin: 0;
  color: var(--mat-sys-color-on-surface-variant);
  text-align: center;
}

.intersection-example__target {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: none;
  min-block-size: 120px;
  gap: 8px;
  color: var(--mat-sys-color-on-secondary-container);
  text-align: center;
  background: var(--mat-sys-color-secondary-container);
  border-radius: var(--mat-sys-shape-corner-medium);
}

.intersection-example__target span {
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
