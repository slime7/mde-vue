<!-- #region script -->
<script setup>
import { ref } from 'vue';

const price = ref([20, 80]);
const depth = ref([10, 60]);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example">
    <mat-range-slider
      v-model="price"
      aria-label-end="价格上限"
      aria-label-start="价格下限"
      :max="100"
      :min="0"
    >
      <template #prepend>
        <span class="bound">0</span>
      </template>
      <template #append>
        <span class="bound">100</span>
      </template>
    </mat-range-slider>

    <mat-range-slider
      v-model="depth"
      aria-label-end="最大深度"
      aria-label-start="最小深度"
      :max="100"
      :min="0"
      orientation="vertical"
    >
      <template #prepend>
        <span class="bound">深</span>
      </template>
      <template #append>
        <span class="bound">浅</span>
      </template>
    </mat-range-slider>
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

.example > mat-range-slider:first-child {
  flex-grow: 1;
}

.bound {
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
