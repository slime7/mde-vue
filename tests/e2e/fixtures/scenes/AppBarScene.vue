<script setup>
import { ref } from 'vue';

const scrollTarget = ref(null);
const scrollTimeline = ref(false);

function toggleScrollTimeline() {
  scrollTimeline.value = !scrollTimeline.value;
}
</script>

<template>
  <section data-scene="app-bar" class="app-bar-scene">
    <button
      data-testid="toggle-scroll-timeline"
      type="button"
      @click="toggleScrollTimeline"
    >
      切换滚动时间线
    </button>

    <mat-layout
      ref="scrollTarget"
      class="app-bar-scene__scroller"
      data-testid="scroll-target"
      tabindex="0"
    >
      <mat-app-bar
        data-testid="app-bar"
        variant="large-flexible"
        :scroll-target="scrollTarget"
        :scroll-timeline="scrollTimeline"
      >
        最近项目

        <template #subtitle>
          验证滚动时间线的启用与关闭
        </template>
      </mat-app-bar>

      <main class="app-bar-scene__content">
        <article v-for="index in 12" :key="index">
          <strong>项目 {{ index }}</strong>
          <span>用于提供可以连续滚动的应用栏测试内容。</span>
        </article>
      </main>
    </mat-layout>
  </section>
</template>

<style scoped>
.app-bar-scene {
  display: grid;
  gap: 12px;
}

.app-bar-scene__scroller {
  block-size: 480px;
  overflow: auto;
  overscroll-behavior: contain;
}

.app-bar-scene__content {
  display: grid;
  gap: 12px;
  padding: 16px;
}

.app-bar-scene__content article {
  display: grid;
  min-block-size: 96px;
  gap: 8px;
  box-sizing: border-box;
  padding: 20px;
  color: var(--mat-sys-color-on-surface);
  background: var(--mat-sys-color-surface-container-low);
  border-radius: var(--mat-sys-shape-corner-medium);
}

.app-bar-scene__content span {
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
