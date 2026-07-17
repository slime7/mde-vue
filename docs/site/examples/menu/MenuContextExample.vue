<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
const position = ref([0, 0]);

function showContextMenu(event) {
  event.currentTarget.focus();
  position.value = [event.clientX, event.clientY];
  open.value = true;
}
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div
    class="context-target"
    tabindex="0"
    @contextmenu.prevent="showContextMenu"
  >
    在此区域点击鼠标右键
  </div>
  <mat-menu
    v-model="open"
    :anchor="position"
  >
    <mat-menu-item>复制</mat-menu-item>
    <mat-menu-item>查看详情</mat-menu-item>
  </mat-menu>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.context-target {
  display: grid;
  min-block-size: 160px;
  place-items: center;
  color: var(--mat-sys-color-on-surface-variant);
  background: var(--mat-sys-color-surface-container);
  border: 1px dashed var(--mat-sys-color-outline);
  border-radius: var(--mat-sys-shape-corner-large);
}
</style>
<!-- #endregion style -->
