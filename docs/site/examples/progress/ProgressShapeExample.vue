<!-- #region script -->
<script setup>
import { ref } from 'vue';

const shape = ref('flat');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-btn-group
    variant="connected"
    selection="single"
    required
    :selected="shape"
    @select="shape = $event.nextSelected"
  >
    <mat-btn value="flat">
      直线
    </mat-btn>
    <mat-btn value="wavy">
      波浪
    </mat-btn>
  </mat-btn-group>

  <p>线条形：{{ shape }}</p>
  <mat-progress
    :shape="shape"
    :value=".6"
    aria-label="线条形进度 60%"
  />

  <p>环形：{{ shape }}</p>
  <mat-progress
    :shape="shape"
    variant="circular"
    :value=".6"
    aria-label="环形进度 60%"
  />
</template>
<!-- #endregion template -->
