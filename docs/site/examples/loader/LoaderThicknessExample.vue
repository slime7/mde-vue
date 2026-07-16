<script setup>
import { ref } from 'vue';

const thickness = ref(4);
</script>

<template>
  <mat-btn-group
    variant="connected"
    selection="single"
    required
    :selected="thickness"
    @select="thickness = $event.nextSelected"
  >
    <mat-btn :value="4">
      4px
    </mat-btn>
    <mat-btn :value="8">
      8px
    </mat-btn>
  </mat-btn-group>

  <p>线条形：{{ thickness }}px</p>
  <mat-loader
    shape="wavy"
    :thickness="thickness"
    :value=".6"
    aria-label="波浪线进度 60%"
  />

  <p>环形：{{ thickness }}px</p>
  <mat-loader
    shape="wavy"
    :thickness="thickness"
    variant="circular"
    :value=".6"
    aria-label="波浪环进度 60%"
  />
</template>
