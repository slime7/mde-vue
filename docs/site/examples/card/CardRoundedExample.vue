<!-- #region script -->
<script setup>
import { computed, ref } from 'vue';

const roundedValues = [
  'none',
  'extra-small',
  'small',
  'medium',
  'large',
  'large-increased',
  'extra-large',
  'extra-large-increased',
  'extra-extra-large',
  'full',
];
const roundedIndex = ref(3);
const rounded = computed(() => roundedValues[roundedIndex.value]);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example">
    <mat-card
      variant="outlined"
      :rounded="rounded"
      class="example-card"
    >
      <mat-card-content>
        <strong>{{ rounded }}</strong>
        <p>拖动下方滑块查看圆角变化。</p>
      </mat-card-content>
    </mat-card>
    <mat-slider
      v-model="roundedIndex"
      aria-label="卡片圆角"
      :min="0"
      :max="roundedValues.length - 1"
      show-stop-indicator
    />
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example {
  display: flex;
  flex-direction: column;
  gap: 16px;
  inline-size: 100%;
}

.example-card {
  min-block-size: 160px;
}

p {
  margin-block: 8px 0;
}
</style>
<!-- #endregion style -->
