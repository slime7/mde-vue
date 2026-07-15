<script setup>
import { ref } from 'vue';

const filled = ref(false);
</script>

<template>
  <div class="example-stack">
    <div class="example-row">
      <mat-icon icon="favorite" size="small" aria-hidden="true" />
      <mat-icon icon="favorite" size="medium" color="primary" aria-hidden="true" />
      <mat-icon icon="favorite" size="large" color="tertiary" aria-hidden="true" />
      <mat-icon icon="favorite" size="extra-large" font-color="rgb(196 38 80)" aria-hidden="true" />
    </div>

    <div class="example-row">
      <mat-icon
        icon="favorite"
        size="40px"
        :fill="filled ? 1 : 0"
        :grade="filled ? 100 : 0"
        :weight="filled ? 600 : 400"
        :optical-size="40"
        color="primary"
        aria-hidden="true"
      />
      <mat-btn variant="filled-tonal" @click="filled = !filled">
        切换字体轴
      </mat-btn>
    </div>
  </div>
</template>

<style scoped>
.example-stack {
  display: flex;
  gap: 24px;
  flex-direction: column;
}

.example-row {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
}
</style>
