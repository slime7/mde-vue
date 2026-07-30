<!-- #region script -->
<script setup>
import { ref } from 'vue';

const altitude = ref(85);
const brightness = ref(70);
const volume = ref(55);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example">
    <mat-slider
      aria-label="音量"
      inset-icon="volume_up"
      v-model="volume"
      size="medium"
    />
    <mat-slider
      aria-label="亮度"
      inset-icon="light_mode"
      v-model="brightness"
      size="large"
    />
    <mat-slider
      aria-label="飞行高度"
      inset-icon="flight"
      v-model="altitude"
      size="extra-large"
    />
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example {
  display: grid;
  gap: 20px;
  inline-size: 100%;
}
</style>
<!-- #endregion style -->
