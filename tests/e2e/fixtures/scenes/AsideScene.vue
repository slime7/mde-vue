<script setup>
import { ref } from 'vue';

const startOpen = ref(true);
const topAOpen = ref(true);
const topBOpen = ref(true);
const railExpanded = ref(false);
</script>

<template>
  <section data-scene="aside" class="aside-scene">
    <div class="aside-scene__controls">
      <button type="button" data-testid="close-start" @click="startOpen = false">
        关闭起始侧栏
      </button>
      <button type="button" data-testid="close-top-a" @click="topAOpen = false">
        关闭外侧顶栏
      </button>
      <button type="button" data-testid="close-top-b" @click="topBOpen = false">
        关闭内侧顶栏
      </button>
      <button
        type="button"
        data-testid="toggle-rail"
        @click="railExpanded = !railExpanded"
      >
        切换 Rail 展开
      </button>
    </div>

    <mat-layout data-testid="start-layout" class="aside-scene__layout">
      <mat-aside
        v-model="startOpen"
        data-testid="start-aside"
        location="start"
        :block-size="160"
        class="aside-scene__start"
      />
      <div data-testid="start-content" class="aside-scene__content">
        起始侧栏正文
      </div>
    </mat-layout>

    <mat-layout data-testid="stack-layout" class="aside-scene__layout">
      <mat-aside
        v-model="topAOpen"
        data-testid="top-a"
        location="top"
        :block-size="44"
        class="aside-scene__top-a"
      />
      <mat-aside
        v-model="topBOpen"
        data-testid="top-b"
        location="top"
        :block-size="36"
        class="aside-scene__top-b"
      />
      <div data-testid="stack-content" class="aside-scene__content">
        堆叠顶栏正文
      </div>
    </mat-layout>

    <mat-layout data-testid="rail-layout" class="aside-scene__layout">
      <mat-navigation-rail
        data-testid="rail-aside"
        :expanded="railExpanded"
        aria-label="导航栏"
      >
        <mat-navigation-rail-item value="home">
          首页
        </mat-navigation-rail-item>
      </mat-navigation-rail>
      <div data-testid="rail-content" class="aside-scene__content">
        Rail 正文
      </div>
    </mat-layout>
  </section>
</template>

<style scoped>
.aside-scene {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}

.aside-scene__controls {
  display: flex;
  gap: 8px;
}

.aside-scene__layout {
  inline-size: 480px;
  block-size: 200px;
  overflow: hidden;
  background: var(--mat-sys-color-outline-variant);
}

.aside-scene__start {
  background: var(--mat-sys-color-primary-container);
}

.aside-scene__top-a {
  background: var(--mat-sys-color-secondary-container);
}

.aside-scene__top-b {
  background: var(--mat-sys-color-tertiary-container);
}

.aside-scene__content {
  min-block-size: 100%;
  background: var(--mat-sys-color-surface-container);
}
</style>
