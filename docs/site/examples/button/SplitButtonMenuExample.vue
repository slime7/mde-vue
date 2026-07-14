<script setup>
import { ref } from 'vue';

const expanded = ref(false);
</script>

<template>
  <div class="example-stack">
    <mat-split-btn
      variant="filled"
      size="small"
      color="#6750a4"
      :expanded="expanded"
      controls="create-menu"
      @update:expanded="expanded = $event"
    >
      <template #leading>
        <mat-btn>新建</mat-btn>
      </template>
      <template #trailing>
        <mat-icon-btn id="split-create-trigger" label="更多新建方式">
          arrow_drop_down
        </mat-icon-btn>
      </template>
    </mat-split-btn>

    <mat-menu
      id="create-menu"
      v-model:open="expanded"
      anchor="split-create-trigger"
      color="#6750a4"
    >
      <mat-menu-item>新建文档</mat-menu-item>
      <mat-menu-item>新建文件夹</mat-menu-item>
    </mat-menu>
  </div>
</template>

<style scoped>
.example-stack {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}

</style>
