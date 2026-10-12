<!-- #region script -->
<script setup>
import { ref } from 'vue';

const selected = ref('files');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-grid-list
    interaction="single-select"
    :selected="selected"
    aria-label="选择位置"
    class="example-stage"
    @select="selected = $event.nextSelected"
  >
    <mat-list-item value="files">
      文件
      <template #trailing>
        <mat-radio
          :model-value="selected"
          value="files"
          inert
          aria-hidden="true"
        />
      </template>
    </mat-list-item>
    <mat-list-item value="images">
      图片
      <template #trailing>
        <mat-radio
          :model-value="selected"
          value="images"
          inert
          aria-hidden="true"
        />
      </template>
    </mat-list-item>
    <mat-list-item value="music">
      音乐
      <template #trailing>
        <mat-radio
          :model-value="selected"
          value="music"
          inert
          aria-hidden="true"
        />
      </template>
    </mat-list-item>
    <mat-list-item value="downloads">
      下载
      <template #trailing>
        <mat-radio
          :model-value="selected"
          value="downloads"
          inert
          aria-hidden="true"
        />
      </template>
    </mat-list-item>
  </mat-grid-list>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-stage {
  inline-size: 100%;
}
</style>
<!-- #endregion style -->
