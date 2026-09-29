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
  <div class="ripple-div-example">
    <div
      v-ripple
      class="ripple-div-example__tile"
      role="button"
      tabindex="0"
      @click="activate"
      @keydown.enter.prevent="activate"
      @keydown.space.prevent="activate"
    >
      普通 div 交互容器
    </div>
    <span>已激活 {{ activateCount }} 次；涟漪只响应指针按压，键盘激活反馈由 v-state-layer 表达。</span>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.ripple-div-example {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.ripple-div-example__tile {
  position: relative;
  padding: 12px 20px;
  color: var(--mat-sys-color-on-surface);
  background: var(--mat-sys-color-surface-container);
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-medium);
  cursor: pointer;
  user-select: none;
}

.ripple-div-example__tile:focus-visible {
  outline: 2px solid var(--mat-sys-color-primary);
  outline-offset: 2px;
}

.ripple-div-example span {
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
