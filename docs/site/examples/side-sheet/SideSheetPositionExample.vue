<!-- #region script -->
<script setup>
import { ref } from 'vue';

const startOpen = ref(false);
const endOpen = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="side-sheet-position-example">
    <mat-btn variant="outlined" @click="startOpen = true">
      从 start 打开
    </mat-btn>
    <mat-btn @click="endOpen = true">
      从 end 打开
    </mat-btn>
  </div>

  <mat-side-sheet
    v-model="startOpen"
    variant="modal"
    position="start"
    title="开始侧"
    content="position 使用逻辑方向，能随书写方向表达起始侧。"
  />

  <mat-side-sheet
    v-model="endOpen"
    variant="modal"
    position="end"
    title="结束侧"
    content="end 是默认位置。"
  />
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.side-sheet-position-example {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
<!-- #endregion style -->
