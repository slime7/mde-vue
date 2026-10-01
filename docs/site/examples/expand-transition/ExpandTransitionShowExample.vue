<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(true);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example">
    <mat-switch v-model="open">显示详情</mat-switch>
    <mat-expand-transition>
      <div
        v-show="open"
        class="panel"
      >
        这段内容由外部状态经 <code>v-show</code> 驱动显隐，切换时在高度 0 与自然高度之间播放折叠过渡，内容始终保持挂载。
      </div>
    </mat-expand-transition>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example {
  display: flex;
  flex-direction: column;
  gap: 12px;
  inline-size: 100%;
}

.panel {
  padding: 16px;
  background: var(--mat-sys-color-surface-container-low);
  border-radius: var(--mat-sys-shape-corner-medium);
  color: var(--mat-sys-color-on-surface);
}
</style>
<!-- #endregion style -->
