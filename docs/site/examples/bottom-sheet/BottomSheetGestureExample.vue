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
    打开可拖拽展开的面板
  </mat-btn>

  <mat-bottom-sheet
    v-model="open"
    v-model:expanded="expanded"
    variant="modal"
    aria-label="长列表内容"
  >
    <div class="bottom-sheet-gesture-example__body">
      <h2>长列表内容</h2>
      <p>当前高度：{{ expanded }}。在内容区向上拖动会跟手展开到 max，展开后继续拖动改为滚动内容；在内容顶部向下拖动收回面板，继续拖动可以关闭。鼠标滚轮向下与把手方向键同样可以在档位间切换。</p>
      <p v-for="index in 20" :key="index">
        第 {{ index }} 项内容：折叠时显示预览，向上拖动内容区或向下滚动滚轮自动展开，展开后继续滚动查看全部内容。
      </p>
    </div>
  </mat-bottom-sheet>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.bottom-sheet-gesture-example__body {
  padding: 24px;
}
</style>
<!-- #endregion style -->
