<script setup>
import { ref } from 'vue';

const filters = ref(['offline']);
</script>

<template>
  <div class="example-stack">
    <mat-checkbox v-model="filters" value="offline">
      可离线使用
    </mat-checkbox>
    <mat-checkbox v-model="filters" value="shared">
      与我共享
    </mat-checkbox>
    <span>当前值：{{ filters.join('、') || '无' }}</span>
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
