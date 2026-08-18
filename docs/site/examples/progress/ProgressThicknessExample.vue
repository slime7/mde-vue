<!-- #region script -->
<script setup>
import { ref } from 'vue';

const thickness = ref('default');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-btn-group
    variant="connected"
    selection="single"
    required
    :selected="thickness"
    @select="thickness = $event.nextSelected"
  >
    <mat-btn value="default">
      default
    </mat-btn>
    <mat-btn value="heavy">
      heavy
    </mat-btn>
  </mat-btn-group>

  <p>线条形：{{ thickness }}</p>
  <mat-progress
    shape="wavy"
    :thickness="thickness"
    :value=".6"
    aria-label="波浪线进度 60%"
  />

  <p>48px 波浪环：{{ thickness }}</p>
  <mat-progress
    shape="wavy"
    size="48"
    :thickness="thickness"
    variant="circular"
    :value=".6"
    aria-label="波浪环进度 60%"
  />
</template>
<!-- #endregion template -->
