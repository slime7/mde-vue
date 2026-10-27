<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(true);
const position = ref('top-end');
const positions = [
  { label: '左上', value: 'top-start' },
  { label: '上方居中', value: 'top-center' },
  { label: '右上', value: 'top-end' },
  { label: '左下', value: 'bottom-start' },
  { label: '下方居中', value: 'bottom-center' },
  { label: '右下', value: 'bottom-end' },
];

function show(value) {
  position.value = value;
  open.value = true;
}
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="notification-position-example">
    <div class="notification-position-example__controls">
      <mat-btn
        v-for="item in positions"
        :key="item.value"
        :variant="position === item.value ? 'filled-tonal' : 'outlined'"
        @click="show(item.value)"
      >
        {{ item.label }}
      </mat-btn>
      <span>当前：{{ position }}</span>
    </div>

    <mat-layout class="notification-position-example__stage">
      <p class="notification-position-example__hint">
        通知会相对这个布局容器定位，并避让已登记的边缘栏。
      </p>

      <mat-notification
        v-model="open"
        :position="position"
        text="切换按钮可以改变通知方位。"
        title="布局通知"
      />
    </mat-layout>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.notification-position-example {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.notification-position-example__controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.notification-position-example__stage {
  block-size: 280px;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-medium);
}

.notification-position-example__hint {
  margin: 0;
  padding: 16px;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
