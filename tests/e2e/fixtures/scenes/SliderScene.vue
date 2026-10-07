<script setup>
import { ref } from 'vue';

const value = ref(0);
const disabledValue = ref(30);
const extraLargeValue = ref(30);
const rangeValue = ref([20, 80]);
</script>

<template>
  <section data-scene="slider" class="slider-scene">
    <h1>滑块场景</h1>

    <div
      class="slider-zone"
      data-testid="slider-zone"
    >
      <mat-slider
        v-model="value"
        aria-label="示例滑块"
        :min="0"
        :max="100"
        :step="10"
      />
    </div>
    <div
      class="slider-zone"
      data-testid="extra-large-zone"
    >
      <mat-slider
        v-model="extraLargeValue"
        aria-label="大尺寸滑块"
        :min="0"
        :max="100"
        size="extra-large"
      />
    </div>
    <div
      class="slider-zone"
      data-testid="range-extra-large-zone"
    >
      <mat-range-slider
        v-model="rangeValue"
        aria-label="范围滑块"
        :min="0"
        :max="100"
        size="extra-large"
      />
    </div>
    <p>
      当前值：<span data-testid="slider-value">{{ value }}</span>
    </p>

    <div
      class="slider-zone"
      data-testid="disabled-zone"
    >
      <mat-slider
        v-model="disabledValue"
        aria-label="禁用滑块"
        disabled
      />
    </div>
  </section>
</template>

<style scoped>
.slider-scene {
  min-block-size: 100vh;
}

.slider-zone {
  inline-size: 280px;
  padding-block: 16px;
}
</style>
