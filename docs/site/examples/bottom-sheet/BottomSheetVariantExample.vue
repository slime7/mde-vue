<!-- #region script -->
<script setup>
import { ref } from 'vue';

const standardOpen = ref(true);
const modalOpen = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="bottom-sheet-variant-example">
    <div class="bottom-sheet-variant-example__content">
      <p>主内容在 standard 打开时仍然可以操作。</p>
      <div class="bottom-sheet-variant-example__actions">
        <mat-btn variant="outlined" @click="standardOpen = !standardOpen">
          {{ standardOpen ? '收起 standard' : '打开 standard' }}
        </mat-btn>
        <mat-btn @click="modalOpen = true">
          打开 modal
        </mat-btn>
      </div>
    </div>

    <mat-bottom-sheet
      v-model="standardOpen"
      variant="standard"
    >
      <div class="bottom-sheet-variant-example__sheet-body">
        <h2>播放队列</h2>
        <p>Standard Bottom sheet 与主内容共存。</p>
      </div>
    </mat-bottom-sheet>
  </div>

  <mat-bottom-sheet
    v-model="modalOpen"
    variant="modal"
    aria-label="选择排序方式"
  >
    <div class="bottom-sheet-variant-example__sheet-body">
      <h2>选择排序方式</h2>
      <p>Modal Bottom sheet 会阻止背景交互。</p>
      <mat-btn variant="filled-tonal" @click="modalOpen = false">
        完成
      </mat-btn>
    </div>
  </mat-bottom-sheet>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.bottom-sheet-variant-example {
  display: flex;
  flex-direction: column;
  block-size: 360px;
  overflow: hidden;
}

.bottom-sheet-variant-example__content {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  min-block-size: 0;
}

.bottom-sheet-variant-example__content p {
  margin: 0;
}

.bottom-sheet-variant-example__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.bottom-sheet-variant-example__sheet-body {
  padding: 24px;
}
</style>
<!-- #endregion style -->
