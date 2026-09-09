<!-- #region script -->
<script setup>
import { ref } from 'vue';

const containerColor = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="side-sheet-container-color-example">
    <main class="side-sheet-container-color-example__content">
      <mat-btn
        variant="outlined"
        @click="containerColor = !containerColor"
      >
        {{ containerColor ? '恢复 standard 容器色' : '启用 modal 容器色' }}
      </mat-btn>
      <p>当前容器色：{{ containerColor ? 'modal 语义' : 'standard 语义' }}</p>
    </main>

    <mat-side-sheet
      model-value
      variant="standard"
      :container-color="containerColor"
      :width="280"
      title="容器配色面板"
      content="Standard Side sheet 可切换为 modal 容器语义色。"
    />
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.side-sheet-container-color-example {
  display: flex;
  block-size: 360px;
  overflow: hidden;
}

.side-sheet-container-color-example__content {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  justify-content: center;
  min-inline-size: 0;
}

.side-sheet-container-color-example__content p {
  margin: 0;
}
</style>
<!-- #endregion style -->
