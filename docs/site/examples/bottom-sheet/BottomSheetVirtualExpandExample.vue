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
    <h2>长列表内容</h2>
    <p>当前状态：{{ expanded }}。向下滚动或向上滑动内容区会请求 full。</p>
    <p v-for="index in 20" :key="index">
      第 {{ index }} 项内容：normal 状态按内容和最大高度布局，向下滚动或向上滑动时自动展开。
    </p>
  </mat-bottom-sheet>
</template>
<!-- #endregion template -->
