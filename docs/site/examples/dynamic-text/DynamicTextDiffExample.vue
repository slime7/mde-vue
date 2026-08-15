<!-- #region script -->
<script setup>
import { ref } from 'vue';

const diffValue = ref('价格 100 元');
const fullValue = ref('价格 100 元');

function toggleDiff() {
  diffValue.value = diffValue.value.includes('100') ? '价格 200 元' : '价格 100 元';
}

function toggleFull() {
  fullValue.value = fullValue.value.includes('100') ? '价格 200 元' : '价格 100 元';
}
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example">
    <div class="row">
      <span>diff（仅动画变化字符）</span>
      <mat-dynamic-text :text="diffValue" />
      <mat-btn @click="toggleDiff">
        切换
      </mat-btn>
    </div>

    <div class="row">
      <span>关闭 diff（全量动画）</span>
      <mat-dynamic-text :text="fullValue" :diff="false" />
      <mat-btn @click="toggleFull">
        切换
      </mat-btn>
    </div>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example {
  display: grid;
  gap: 24px;
  justify-items: start;
}

.row {
  display: grid;
  gap: 8px;
  justify-items: start;
}
</style>
<!-- #endregion style -->
