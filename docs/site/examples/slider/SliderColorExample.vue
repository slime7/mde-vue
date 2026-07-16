<script setup>
import { ref } from 'vue';

const semanticValue = ref(45);
const seededValue = ref(70);
</script>

<template>
  <div class="example">
    <mat-slider
      v-model="semanticValue"
      aria-label="三级语义色"
      color="tertiary"
    />
    <mat-slider
      v-model="seededValue"
      aria-label="局部种子色"
      color="#6750a4"
    />
  </div>
</template>

<style scoped>
.example {
  display: grid;
  gap: 16px;
  inline-size: min(100%, 480px);
}
</style>
