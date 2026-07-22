<!-- #region script -->
<script setup>
import { ref } from 'vue';

const expanded = ref(['favorites']);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-list
    v-model:expanded="expanded"
    class="example-list"
  >
    <mat-list-item>
      最近使用
      <template #leading>
        <mat-icon>schedule</mat-icon>
      </template>
    </mat-list-item>

    <mat-list-group value="favorites">
      <template #activator="{ expanded: isExpanded }">
        <mat-list-item>
          收藏
          <template #leading>
            <mat-icon>star</mat-icon>
          </template>
          <template #trailing>
            <mat-icon>{{ isExpanded ? 'expand_less' : 'expand_more' }}</mat-icon>
          </template>
        </mat-list-item>
      </template>

      <mat-list-item>设计资料</mat-list-item>
      <mat-list-item>项目计划</mat-list-item>
    </mat-list-group>

    <mat-list-group>
      <template #activator="{ expanded: isExpanded }">
        <mat-list-item>
          本地分组
          <template #leading>
            <mat-icon>folder</mat-icon>
          </template>
          <template #trailing>
            <mat-icon>{{ isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</mat-icon>
          </template>
        </mat-list-item>
      </template>

      <mat-list-item>下载</mat-list-item>
      <mat-list-item>文档</mat-list-item>
    </mat-list-group>

    <mat-list-item>
      回收站
      <template #leading>
        <mat-icon>delete</mat-icon>
      </template>
    </mat-list-item>
  </mat-list>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-list {
  inline-size: min(100%, 420px);
}
</style>
<!-- #endregion style -->
