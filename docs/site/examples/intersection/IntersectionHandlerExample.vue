<!-- #region template -->
<template>
  <div class="intersection-example__viewport">
    <p class="intersection-example__hint">
      向下滚动，让目标元素进入观察区域。
    </p>
    <div
      v-intersection="handleIntersection"
      class="intersection-example__target"
    >
      <strong>{{ isIntersecting ? '元素正在视口内' : '元素不在视口内' }}</strong>
      <span>在此窗口内滚动会触发 handler。</span>
    </div>
    <p class="intersection-example__hint">
      目标元素离开此区域后状态会更新。
    </p>
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
