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
      <p>当前状态：{{ expanded }}。normal 状态保留 full 的面板高度，只显示底部预览区域；向下滚动或向上滑动内容区会请求 full。</p>
      <p v-for="index in 20" :key="index">
        第 {{ index }} 项内容：初始预览时滚动条按 full 高度计算，向下滚动或向上滑动时自动展开。
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
