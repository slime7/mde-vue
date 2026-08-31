<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
const expanded = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-btn @click="open = true; expanded = false">
    打开虚拟全高 Modal
  </mat-btn>

  <mat-bottom-sheet
    v-model="open"
    v-model:expanded="expanded"
    variant="modal"
    virtual-expand
    title="长列表内容"
  >
    <p v-for="index in 20" :key="index">
      第 {{ index }} 项内容：开启 virtual-expand 时，打开默认处于25% 预览状态（expanded=false），内容按全高展开态计算并下移截断；向下滑动滚轮、上滑触控或上拉拖拽把手时自动展开到全高。
    </p>
  </mat-bottom-sheet>
</template>
<!-- #endregion template -->
