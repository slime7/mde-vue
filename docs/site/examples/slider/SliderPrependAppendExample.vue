<!-- #region script -->
<script setup>
import { ref } from 'vue';

const volume = ref(30);
const brightness = ref(70);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example">
    <mat-slider
      v-model="volume"
      aria-label="音量"
      :max="100"
      :min="0"
    >
      <template #prepend>
        <span class="bound">0</span>
      </template>
      <template #append>
        <span class="bound">100</span>
      </template>
    </mat-slider>

    <mat-slider
      v-model="brightness"
      aria-label="亮度"
      :max="100"
      :min="0"
      orientation="vertical"
    >
      <template #prepend>
        <span class="bound">最多</span>
      </template>
      <template #append>
        <span class="bound">最少</span>
      </template>
    </mat-slider>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example {
  display: flex;
  align-items: center;
  gap: 48px;
  inline-size: 100%;
}

.example > mat-slider:first-child {
  flex-grow: 1;
}

.bound {
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
