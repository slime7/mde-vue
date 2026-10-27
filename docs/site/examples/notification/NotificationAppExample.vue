<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(true);
const app = ref(true);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="notification-app-example">
    <div class="notification-app-example__controls">
      <mat-switch v-model="app" label="自动定位" />
      <mat-btn variant="outlined" @click="open = true">
        重新显示
      </mat-btn>
    </div>

    <mat-layout class="notification-app-example__stage">
      <p class="notification-app-example__hint">
        开启自动定位时卡片吸附到布局角落；关闭后回到文档流。
      </p>

      <mat-notification
        v-model="open"
        :app="app"
        text="切换开关观察卡片位置。"
        title="自动定位开关"
      />
    </mat-layout>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.notification-app-example {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.notification-app-example__controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.notification-app-example__stage {
  min-block-size: 260px;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-medium);
}

.notification-app-example__hint {
  margin: 0;
  padding: 16px;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
