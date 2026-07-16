<script setup>
import { ref } from 'vue';

const value = ref(50);
</script>

<template>
  <div class="example">
    <mat-slider
      aria-label="超小尺寸"
      v-model="value"
      size="extra-small"
    />
    <mat-slider
      aria-label="小尺寸"
      v-model="value"
      size="small"
    />
    <mat-slider
      aria-label="中等尺寸"
      v-model="value"
      size="medium"
    />
    <mat-slider
      aria-label="大尺寸"
      v-model="value"
      size="large"
    />
    <mat-slider
      aria-label="超大尺寸"
      v-model="value"
      size="extra-large"
    />
  </div>
</template>

<style scoped>
.example {
  display: grid;
  gap: 20px;
  inline-size: min(100%, 560px);
}
</style>
