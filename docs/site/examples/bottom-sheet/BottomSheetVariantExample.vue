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
      title="播放队列"
      content="Standard Bottom sheet 与主内容共存。"
      closable
    />
  </div>

  <mat-bottom-sheet
    v-model="modalOpen"
    variant="modal"
    title="选择排序方式"
    content="Modal Bottom sheet 会阻止背景交互。"
    closable
  />
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.bottom-sheet-variant-example {
  display: flex;
  flex-direction: column;
  min-block-size: 360px;
  overflow: hidden;
  background: var(--mat-sys-color-surface-container-lowest);
  border-radius: var(--mat-sys-shape-corner-large);
}

.bottom-sheet-variant-example__content {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  min-block-size: 0;
  padding: 24px;
}

.bottom-sheet-variant-example__content p {
  margin: 0;
}

.bottom-sheet-variant-example__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
<!-- #endregion style -->
