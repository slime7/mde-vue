<!-- #region script -->
<script setup>
import { ref } from 'vue';

const activateCount = ref(0);

function activate() {
  activateCount.value += 1;
}
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="state-layer-div-example">
    <div
      v-state-layer
      class="state-layer-div-example__tile"
      role="button"
      tabindex="0"
      @click="activate"
      @keydown.enter.prevent="activate"
      @keydown.space.prevent="activate"
    >
      普通 div 交互容器
    </div>
    <span>已激活 {{ activateCount }} 次；div 需要自行提供 role、tabindex、键盘激活和点击行为。</span>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.state-layer-div-example {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.state-layer-div-example__tile {
  position: relative;
  padding: 12px 20px;
  color: var(--mat-sys-color-on-surface);
  background: var(--mat-sys-color-surface-container);
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-medium);
  cursor: pointer;
  user-select: none;
}

.state-layer-div-example__tile:focus-visible {
  outline: 2px solid var(--mat-sys-color-primary);
  outline-offset: 2px;
}

.state-layer-div-example span {
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
