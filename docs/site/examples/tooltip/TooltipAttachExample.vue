<script setup>
import { ref } from 'vue';

const attach = ref(null);
</script>

<template>
  <mat-btn id="tooltip-attach-example" variant="outlined">
    自定义挂载目标
  </mat-btn>

  <section ref="attach" class="tooltip-attach-target">
    Tooltip 的 DOM 会 Teleport 到这个区域。
  </section>

  <mat-tooltip
    :attach="attach"
    content="仍使用固定视口定位"
    target="#tooltip-attach-example"
  />
</template>

<style scoped>
.tooltip-attach-target {
  margin-block-start: 16px;
  padding: 16px;
  color: var(--mat-sys-color-on-surface-variant);
  border: 1px dashed var(--mat-sys-color-outline);
  border-radius: var(--mat-sys-shape-corner-medium);
}
</style>
