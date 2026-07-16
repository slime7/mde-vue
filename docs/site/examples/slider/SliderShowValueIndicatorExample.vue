<script setup>
import { ref } from 'vue';

const temperature = ref(22);
</script>

<template>
  <div class="example">
    <mat-slider
      v-model="temperature"
      aria-label="温度"
      :max="30"
      :min="16"
      show-value-indicator
    />
    <output>聚焦或拖动手柄即可显示：{{ temperature }} ℃</output>
  </div>
</template>

<style scoped>
.example {
  display: grid;
  gap: 12px;
  inline-size: min(100%, 480px);
}
</style>
