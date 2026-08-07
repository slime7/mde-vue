<!-- #region template -->
<template>
  <div class="example-stack">
    <div class="example-toolbar">
      <button
        v-for="ratio in ratios"
        :key="ratio.value"
        type="button"
        :class="{ 'example-chip--active': ratio.value === selectedRatio }"
        class="example-chip"
        @click="selectedRatio = ratio.value"
      >
        {{ ratio.label }}
      </button>
      <button
        type="button"
        class="example-chip"
        @click="wide = !wide"
      >
        {{ wide ? '宽度 100%' : '宽度 60%' }}
      </button>
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

.example-chip {
  padding: 6px 14px;
  color: var(--mat-sys-color-on-surface);
  font: inherit;
  background: var(--mat-sys-color-surface-container);
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-full);
  cursor: pointer;
}

.example-chip--active {
  color: var(--mat-sys-color-on-primary);
  background: var(--mat-sys-color-primary);
  border-color: transparent;
}

.demo-image {
  align-self: flex-start;
}
</style>
<!-- #endregion style -->
