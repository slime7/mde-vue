<!-- #region template -->
<template>
  <button
    v-ripple="{ target: pill }"
    class="ripple-target-host"
    type="button"
  >
    <span
      ref="pill"
      class="ripple-target-pill"
    >
      <span class="material-symbols-outlined">touch_app</span>
      涟漪范围
    </span>
  </button>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const pill = ref(null);
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.ripple-target-host {
  position: relative;
  display: flex;
  justify-content: flex-start;
  inline-size: 320px;
  padding: 12px;
  font: inherit;
  color: var(--mat-sys-color-on-surface);
  background: var(--mat-sys-color-surface-container);
  border: 0;
  border-radius: var(--mat-sys-shape-corner-medium);
  cursor: pointer;
}

.ripple-target-pill {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  padding: 8px 20px;
  background: var(--mat-sys-color-surface-container-high);
  border-radius: var(--mat-sys-shape-corner-full);
}

.ripple-target-pill .material-symbols-outlined {
  font-size: 20px;
}
</style>
<!-- #endregion style -->
