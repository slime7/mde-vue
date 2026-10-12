<script setup>
import { ref } from 'vue';

const toggleCols = ref(3);
</script>

<template>
  <section
    data-scene="grid-list"
    class="grid-list-scene"
  >
    <h1>Grid list 场景</h1>

    <h2>缺行末行（5 项、2 列）</h2>
    <mat-grid-list
      class="grid-stage"
      data-testid="ragged-grid"
      :cols="2"
      aria-label="缺行网格"
    >
      <mat-list-item
        v-for="i in 5"
        :key="i"
        :data-testid="`item-${i - 1}`"
      >
        项目 {{ i }}
      </mat-list-item>
    </mat-grid-list>

    <h2>动态列数（4 项）</h2>
    <mat-grid-list
      class="grid-stage"
      data-testid="toggle-grid"
      :cols="toggleCols"
      aria-label="动态列数网格"
    >
      <mat-list-item
        v-for="i in 4"
        :key="i"
        :data-testid="`toggle-item-${i - 1}`"
      >
        项目 {{ i }}
      </mat-list-item>
    </mat-grid-list>
    <button
      type="button"
      data-testid="toggle-cols"
      @click="toggleCols = toggleCols === 3 ? 2 : 3"
    >
      切换列数（当前 {{ toggleCols }}）
    </button>
  </section>
</template>

<style scoped>
.grid-list-scene {
  padding: 24px;
}

.grid-stage {
  inline-size: 360px;
  margin-block-end: 16px;
}
</style>
