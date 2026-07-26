<!-- #region template -->
<template>
  <div class="hover-target-example">
    <button ref="target" type="button" class="hover-target-example__target">
      将鼠标移到这里
    </button>
    <mat-hover v-model="isHovering" :target="target" />
    <p>外部目标状态：{{ isHovering ? '悬停中' : '未悬停' }}</p>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const isHovering = ref(false);
const target = ref(null);
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.hover-target-example {
  display: grid;
  justify-items: start;
  gap: 12px;
}

.hover-target-example__target {
  padding: 10px 16px;
  color: var(--mat-sys-color-on-secondary-container);
  font: inherit;
  background: var(--mat-sys-color-secondary-container);
  border: 0;
  border-radius: var(--mat-sys-shape-corner-full);
}

.hover-target-example p {
  margin: 0;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
