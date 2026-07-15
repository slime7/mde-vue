<script setup>
import { ref } from 'vue';

const expanded = ref(false);
</script>

<template>
  <mat-split-btn
    :expanded="expanded"
    @update:expanded="expanded = $event"
  >
    <template #leading>
      <mat-btn>主要操作</mat-btn>
    </template>
    <template #trailing>
      <mat-btn icon="arrow_drop_down" label="展开菜单" />
    </template>
  </mat-split-btn>
</template>
