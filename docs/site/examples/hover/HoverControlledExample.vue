<!-- #region template -->
<template>
  <mat-hover
    v-model="isHovering"
    v-slot="{ isHovering: slotHovering, props }"
  >
    <button
      v-bind="props"
      class="hover-example__target"
      type="button"
    >
      {{ slotHovering ? '受控状态：开启' : '受控状态：关闭' }}
    </button>
  </mat-hover>

  <p>父级 modelValue：{{ isHovering ? 'true' : 'false' }}</p>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const isHovering = ref(false);
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.hover-example__target {
  min-inline-size: 180px;
  min-block-size: 48px;
  padding-inline: 20px;
  color: var(--mat-sys-color-on-tertiary-container);
  background: var(--mat-sys-color-tertiary-container);
  border: 0;
  border-radius: var(--mat-sys-shape-corner-medium);
  cursor: pointer;
}
</style>
<!-- #endregion style -->
