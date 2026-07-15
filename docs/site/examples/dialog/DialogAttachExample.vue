<script setup>
import { ref } from 'vue';

const open = ref(false);
const target = ref(null);
</script>

<template>
  <mat-btn variant="outlined" @click="open = true">
    挂载到指定元素
  </mat-btn>

  <section ref="target" class="dialog-target">
    Dialog 的 DOM 会 Teleport 到这个区域。
  </section>

  <mat-dialog
    v-model="open"
    :attach="target"
    title="自定义挂载目标"
    content="原生模态层仍会阻止页面背景交互。"
  >
    <template #actions>
      <mat-btn variant="text" @click="open = false">
        关闭
      </mat-btn>
    </template>
  </mat-dialog>
</template>

<style scoped>
.dialog-target {
  margin-block-start: 16px;
  padding: 16px;
  color: var(--mat-sys-color-on-surface-variant);
  border: 1px dashed var(--mat-sys-color-outline);
  border-radius: var(--mat-sys-shape-corner-medium);
}
</style>
