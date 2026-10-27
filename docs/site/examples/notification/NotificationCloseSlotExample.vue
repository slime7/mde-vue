<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(true);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="notification-close-slot-example">
    <mat-btn variant="outlined" @click="open = true">
      重新显示
    </mat-btn>

    <mat-notification
      v-model="open"
      text="close Slot 提供自定义关闭控件。"
      title="自定义关闭按钮"
    >
      <template #close="{ close }">
        <button
          v-state-layer
          class="notification-close-slot-example__button"
          type="button"
          aria-label="关闭通知"
          @click="close"
        >
          <mat-icon icon="close" size="24px" />
        </button>
      </template>
    </mat-notification>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.notification-close-slot-example {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.notification-close-slot-example__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: 48px;
  block-size: 48px;
  padding: 0;
  color: var(--mat-sys-color-on-surface);
  background: transparent;
  border: 0;
  border-radius: var(--mat-sys-shape-corner-full);
}
</style>
<!-- #endregion style -->
