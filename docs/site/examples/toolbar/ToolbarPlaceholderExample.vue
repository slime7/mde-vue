<!-- #region script -->
<script setup>
import { ref } from 'vue';

const enabled = ref(true);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="toolbar-placeholder-example">
    <mat-btn variant="outlined" @click="enabled = !enabled">
      {{ enabled ? '关闭自然占位' : '开启自然占位' }}
    </mat-btn>
    <p v-for="index in 5" :key="index">
      页面内容 {{ index }}：开启占位后，滚动到底部时不会被固定 Toolbar 遮挡。
    </p>

    <mat-toolbar :placeholder="enabled">
      <mat-btn variant="standard">
        返回
      </mat-btn>
      <mat-spacer />
      <mat-btn variant="standard">
        完成
      </mat-btn>
    </mat-toolbar>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.toolbar-placeholder-example {
  min-block-size: 320px;
}

.toolbar-placeholder-example p {
  margin-block: 12px;
}
</style>
<!-- #endregion style -->
