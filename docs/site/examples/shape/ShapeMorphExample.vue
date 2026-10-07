<!-- #region template -->
<template>
  <div class="shape-morph-stage">
    <mat-shape
      as="button"
      class="shape-morph-stage__preview"
      :name="activeShape"
      morph
      size="160"
      type="button"
      :aria-label="`切换到下一个形状，当前是${activeLabel}`"
      @click="selectNextShape"
    />

    <div
      class="shape-morph-stage__options"
      role="group"
      aria-label="形状选择"
    >
      <mat-shape
        v-for="shape in shapes"
        :key="shape.name"
        as="button"
        class="shape-morph-stage__option"
        :class="{ 'shape-morph-stage__option--active': shape.name === activeShape }"
        :name="shape.name"
        morph
        size="40"
        :color="shape.name === activeShape ? 'primary' : 'secondary-container'"
        type="button"
        :aria-label="shape.label"
        :aria-pressed="shape.name === activeShape"
        @click="activeShape = shape.name"
      />
    </div>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { computed, ref } from 'vue';

const shapes = [
  { name: '4-sided-cookie', label: '四角饼干' },
  { name: '6-sided-cookie', label: '六角饼干' },
  { name: '9-sided-cookie', label: '九角饼干' },
  { name: '12-sided-cookie', label: '十二角饼干' },
  { name: 'flower', label: '花朵' },
  { name: 'heart', label: '爱心' },
  { name: 'pill', label: '药丸' },
  { name: 'square', label: '方形' },
];
const activeShape = ref('9-sided-cookie');
const activeLabel = computed(() => (
  shapes.find((shape) => shape.name === activeShape.value)?.label ?? ''
));

function selectNextShape() {
  const currentIndex = shapes.findIndex((shape) => shape.name === activeShape.value);

  activeShape.value = shapes[(currentIndex + 1) % shapes.length].name;
}
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.shape-morph-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding-block: 8px;
}

.shape-morph-stage__preview,
.shape-morph-stage__option {
  padding: 0;
  border: 0;
  cursor: pointer;
}

.shape-morph-stage__options {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.shape-morph-stage__option {
  transition: transform var(--mat-sys-motion-spring-fast-spatial);
}

.shape-morph-stage__option--active {
  transform: scale(1.2);
}
</style>
<!-- #endregion style -->
