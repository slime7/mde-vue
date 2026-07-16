<script setup>
import { ref } from 'vue';

const horizontal = ref([25, 70]);
const vertical = ref([30, 85]);
</script>

<template>
  <div class="example">
    <div class="example__horizontal">
      <mat-range-slider
        v-model="horizontal"
        aria-label-end="横向结束值"
        aria-label-start="横向起始值"
      />
      <output>{{ horizontal[0] }} — {{ horizontal[1] }}</output>
    </div>

    <div class="example__vertical">
      <mat-range-slider
        v-model="vertical"
        aria-label-end="纵向结束值"
        aria-label-start="纵向起始值"
        orientation="vertical"
      />
      <output>{{ vertical[0] }} — {{ vertical[1] }}</output>
    </div>
  </div>
</template>

<style scoped>
.example {
  display: flex;
  align-items: center;
  gap: 32px;
  inline-size: min(100%, 480px);
}

.example__horizontal {
  display: grid;
  flex: 1;
  gap: 12px;
}

.example__vertical {
  display: grid;
  justify-items: center;
  gap: 12px;
}
</style>
