<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
const expanded = ref('normal');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-btn @click="open = true; expanded = 'normal'">
    打开 virtualExpand Modal
  </mat-btn>

  <mat-bottom-sheet
    v-model="open"
    v-model:expanded="expanded"
    variant="modal"
    virtual-expand
    aria-label="长列表内容"
  >
    <div class="bottom-sheet-virtual-expand-example__body">
      <h2>长列表内容</h2>
      <p>当前状态：{{ expanded }}。normal 状态按 min(内容高度, full 高度) 布局面板，只显示上半部分，其余内容留在屏幕下方；向下滚动或向上滑动内容区会请求 max。</p>
      <p v-for="index in 20" :key="index">
        第 {{ index }} 项内容：初始预览时滚动条覆盖屏幕下方的内容，向下滚动或向上滑动时自动展开。
      </p>
    </div>
  </mat-bottom-sheet>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.bottom-sheet-virtual-expand-example__body {
  padding: 24px;
}
</style>
<!-- #endregion style -->
