<script setup>
import { ref } from 'vue';

const items = ['甲', '乙', '丙'];
const defaultSelect = ref(null);
const compactSelect = ref(null);
const compactFilledSelect = ref(null);
const placeholderSelect = ref(null);
</script>

<template>
  <section data-scene="density" class="density-scene">
    <h1>文本输入与选择器密度</h1>

    <div class="density-grid">
      <div data-testid="text-default-outlined">
        <mat-text-field label="默认浮动标签" />
      </div>

      <div data-testid="text-compact-outlined">
        <mat-text-field density="compact" label="紧凑浮动标签" />
      </div>

      <div data-testid="text-compact-outlined-placeholder">
        <mat-text-field density="compact" placeholder="请输入内容" />
      </div>

      <div data-testid="text-default-filled">
        <mat-text-field label="默认填充标签" variant="filled" />
      </div>

      <div data-testid="text-compact-filled">
        <mat-text-field density="compact" label="紧凑填充标签" variant="filled" />
      </div>

      <div data-testid="select-default">
        <mat-select v-model="defaultSelect" label="默认选择器" :items="items" />
      </div>

      <div data-testid="select-compact">
        <mat-select v-model="compactSelect" density="compact" label="紧凑选择器" :items="items" />
      </div>

      <div data-testid="select-compact-outlined-placeholder">
        <mat-select
          v-model="placeholderSelect"
          density="compact"
          placeholder="请选择项目"
          :items="items"
        />
      </div>

      <div data-testid="select-compact-filled">
        <mat-select
          v-model="compactFilledSelect"
          density="compact"
          label="紧凑填充选择器"
          variant="filled"
          :items="items"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.density-scene {
  padding: 24px;
}

.density-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(240px, 320px));
  gap: 24px;
  align-items: start;
}
</style>
