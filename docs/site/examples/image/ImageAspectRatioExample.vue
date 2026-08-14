<!-- #region template -->
<template>
  <div class="example-stack">
    <div class="example-toolbar">
      <mat-chip
        v-for="ratio in ratios"
        :key="ratio.value"
        variant="filter"
        :selected="ratio.value === selectedRatio"
        @click="selectedRatio = ratio.value"
      >
        {{ ratio.label }}
      </mat-chip>
      <mat-chip
        variant="filter"
        :selected="wide"
        @click="wide = !wide"
      >
        {{ wide ? '宽度 100%' : '宽度 60%' }}
      </mat-chip>
    </div>
    <mat-image
      :src="source"
      :aspect-ratio="selectedRatio"
      :style="{ inlineSize: wide ? '100%' : '60%' }"
      alt="宽高比与宽度切换示例"
      class="demo-image"
    />
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const ratios = [
  { label: '16 / 9', value: '16 / 9' },
  { label: '4 / 3', value: '4 / 3' },
  { label: '1 / 1', value: '1 / 1' },
];
const selectedRatio = ref('16 / 9');
const wide = ref(true);
const source = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="320" viewBox="0 0 640 320">'
  + '<rect width="640" height="320" fill="#cfeaff"/>'
  + '<rect x="0" y="240" width="640" height="80" fill="#9ed6ff"/>'
  + '<circle cx="200" cy="150" r="95" fill="#20a6fc"/>'
  + '<rect x="440" y="110" width="120" height="80" rx="16" fill="#20a6fc"/>'
  + '<circle cx="620" cy="60" r="45" fill="#ffb74d"/>'
  + '</svg>',
);
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.example-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.example-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.demo-image {
  align-self: flex-start;
}
</style>
<!-- #endregion style -->
