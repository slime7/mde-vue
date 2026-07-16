<script setup>
import { ref } from 'vue';

const waveMotion = ref(false);
</script>

<template>
  <mat-switch v-model="waveMotion">
    播放波动效果
  </mat-switch>

  <p>线条形</p>
  <mat-loader
    shape="wavy"
    :value=".6"
    :wave-motion="waveMotion"
    aria-label="波浪线进度 60%"
  />

  <p>环形</p>
  <mat-loader
    shape="wavy"
    variant="circular"
    :value=".6"
    :wave-motion="waveMotion"
    aria-label="波浪环进度 60%"
  />
</template>
