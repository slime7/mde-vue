<script setup>
import { ref } from 'vue';

const newsletter = ref(true);
</script>

<template>
  <div class="example-stack">
    <mat-checkbox v-model="newsletter">
      接收更新邮件
    </mat-checkbox>
    <span>当前值：{{ newsletter }}</span>
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
