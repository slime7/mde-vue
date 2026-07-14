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
        <mat-icon-btn label="更多新建方式">
          arrow_drop_down
        </mat-icon-btn>
      </template>
    </mat-split-btn>

    <div v-if="expanded" id="create-menu" class="example-menu" role="menu">
      新建文档<br>
      新建文件夹
    </div>
  </div>
</template>

<style scoped>
.example-stack {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}

.example-menu {
  min-inline-size: 180px;
  padding: 12px;
  color: var(--mat-sys-color-on-surface);
  background: var(--mat-sys-color-surface-container);
  border-radius: var(--mat-sys-shape-corner-medium);
  box-shadow: var(--mat-sys-elevation-level2);
}
</style>
