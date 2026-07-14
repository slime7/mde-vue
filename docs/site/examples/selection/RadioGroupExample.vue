<script setup>
import { ref } from 'vue';

const themeMode = ref('system');
</script>

<template>
  <div class="example-stack">
    <mat-radio-group v-model="themeMode" label="主题模式" color="#6750a4">
      <mat-radio value="system">
        跟随系统
      </mat-radio>
      <mat-radio value="light">
        亮色
      </mat-radio>
      <mat-radio value="dark">
        暗色
      </mat-radio>
      <mat-radio value="legacy" disabled>
        旧主题
      </mat-radio>
    </mat-radio-group>
    <span>当前值：{{ themeMode }}</span>
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
