<script setup>
import { ref } from 'vue';

const open = ref(false);
const result = ref('尚未执行操作');

/**
 * @param {() => void} action
 */
function undo(action) {
  result.value = '已撤销删除';
  action();
}
</script>

<template>
  <mat-btn @click="open = true">
    自定义 action Slot
  </mat-btn>

  <span>{{ result }}</span>

  <mat-snackbar
    v-model="open"
    action-text="属性操作会被忽略"
    :duration="0"
    text="项目已删除。"
  >
    <template #action="{ action }">
      <mat-btn variant="text" @click="undo(action)">
        恢复项目
      </mat-btn>
    </template>
  </mat-snackbar>
</template>

<style scoped>
.slot-action {
  box-sizing: border-box;
  min-inline-size: 48px;
  min-block-size: 48px;
  padding-inline: 12px;
  color: var(--mat-sys-color-inverse-primary);
  font: var(--mat-sys-typescale-label-large-weight) var(--mat-sys-typescale-label-large-size) / var(--mat-sys-typescale-label-large-line-height) var(--mat-sys-typescale-label-large-font);
  letter-spacing: var(--mat-sys-typescale-label-large-tracking);
  background: transparent;
  border: 0;
}
</style>
