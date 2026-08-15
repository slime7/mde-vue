<!-- #region script -->
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
<!-- #endregion script -->

<!-- #region template -->
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
      <mat-btn class="slot-action" variant="text" @click="undo(action)">
        恢复项目
      </mat-btn>
    </template>
  </mat-snackbar>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.slot-action {
  --mat-btn-label-text-color: var(--mat-sys-color-inverse-primary);
  --mat-btn-icon-color: var(--mat-sys-color-inverse-primary);
  --mat-button-state-color: var(--mat-sys-color-inverse-primary);
}
</style>
<!-- #endregion style -->
