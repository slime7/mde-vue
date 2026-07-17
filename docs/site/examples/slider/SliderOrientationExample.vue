<!-- #region script -->
<script setup>
import { ref } from 'vue';

const horizontal = ref(40);
const vertical = ref(70);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example">
    <div class="example__horizontal">
      <mat-slider
        v-model="horizontal"
        aria-label="横向音量"
      />
      <output>{{ horizontal }}</output>
    </div>

    <div class="example__vertical">
      <mat-slider
        v-model="vertical"
        aria-label="纵向音量"
        orientation="vertical"
      />
      <output>{{ vertical }}</output>
    </div>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example {
  display: flex;
  align-items: center;
  gap: 32px;
  inline-size: min(100%, 480px);
}

.example__horizontal {
  display: grid;
  flex: 1;
  gap: 12px;
}

.example__vertical {
  display: grid;
  justify-items: center;
  gap: 12px;
}
</style>
<!-- #endregion style -->
