<!-- #region script -->
<script setup>
import { ref } from 'vue';

const altitude = ref(85);
const brightness = ref(70);
const verticalVolume = ref(8);
const volume = ref(8);
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
    <mat-slider
      class="vertical-slider"
      aria-label="纵向音量"
      inset-icon="volume_up"
      v-model="verticalVolume"
      orientation="vertical"
      size="large"
    />
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 20px;
  inline-size: 100%;
}

.example > :not(.vertical-slider) {
  grid-column: 1;
}

.vertical-slider {
  grid-column: 2;
  grid-row: 1 / span 3;
}
</style>
<!-- #endregion style -->
