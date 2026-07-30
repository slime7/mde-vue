<!-- #region script -->
<script setup>
import { ref } from 'vue';

const active = ref(false);
const placeholderEnabled = ref(true);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="toolbar-placeholder-example">
    <mat-btn variant="outlined" @click="active = !active">
      {{ active ? '隐藏 Toolbar' : '展示 Toolbar' }}
    </mat-btn>
    <mat-btn
      variant="text"
      @click="placeholderEnabled = !placeholderEnabled"
    >
      {{ placeholderEnabled ? '关闭自然占位' : '开启自然占位' }}
    </mat-btn>
    <p v-for="index in 5" :key="index">
      页面内容 {{ index }}：开启占位后，后续内容不会被绝对定位的 Toolbar 遮挡。
    </p>

    <mat-toolbar
      v-model="active"
      app
      :placeholder="placeholderEnabled"
    >
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
