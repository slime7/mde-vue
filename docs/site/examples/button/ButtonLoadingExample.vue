<!-- #region template -->
<template>
  <div class="example-row">
    <mat-btn :loading="searching" @click="search">
      搜索插件
    </mat-btn>
    <mat-btn
      prefix="download"
      variant="outlined"
      :loading="downloading"
      @click="download"
    >
      下载更新
    </mat-btn>
    <mat-btn
      icon="refresh"
      label="刷新日志"
      :loading="refreshing"
      @click="refresh"
    />
    <mat-btn loading>
      自定义指示器
      <template #loading>
        <mat-progress
          variant="circular"
          indeterminate
          :size="24"
        />
      </template>
    </mat-btn>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const LOADING_MS = 2000;

const searching = ref(false);
const downloading = ref(false);
const refreshing = ref(false);

function search() {
  searching.value = true;
  setTimeout(() => {
    searching.value = false;
  }, LOADING_MS);
}

function download() {
  downloading.value = true;
  setTimeout(() => {
    downloading.value = false;
  }, LOADING_MS);
}

function refresh() {
  refreshing.value = true;
  setTimeout(() => {
    refreshing.value = false;
  }, LOADING_MS);
}
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.example-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}
</style>
<!-- #endregion style -->
