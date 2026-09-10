<!-- #region script -->
<script setup>
import { ref } from 'vue';

const containerColor = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="bottom-sheet-container-color-example">
    <div class="bottom-sheet-container-color-example__content">
      <mat-btn
        variant="outlined"
        @click="containerColor = !containerColor"
      >
        {{ containerColor ? '恢复 standard 容器色' : '启用 modal 容器色' }}
      </mat-btn>
      <p>当前容器色：{{ containerColor ? 'modal 语义' : 'standard 语义' }}</p>
    </div>

    <mat-bottom-sheet
      model-value
      variant="standard"
      :container-color="containerColor"
    >
      <div class="bottom-sheet-container-color-example__sheet-body">
        <h2>容器配色面板</h2>
        <p>Standard Bottom sheet 可切换为 modal 容器语义色。</p>
      </div>
    </mat-bottom-sheet>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.bottom-sheet-container-color-example {
  display: flex;
  flex-direction: column;
  block-size: 360px;
  overflow: hidden;
}

.bottom-sheet-container-color-example__content {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  justify-content: center;
  min-block-size: 0;
}

.bottom-sheet-container-color-example__content p {
  margin: 0;
}

.bottom-sheet-container-color-example__sheet-body {
  padding: 24px;
}
</style>
<!-- #endregion style -->
