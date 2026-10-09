<script setup>
import { ref } from 'vue';

const active = ref('home');
const scrollActive = ref('tab-1');

function record(name, payload) {
  window.pushEvent(name, payload);
}
</script>

<template>
  <section
    data-scene="tabs"
    class="tabs-scene"
  >
    <h1>Tabs 场景</h1>

    <mat-tabs
      v-model="active"
      class="tabs-stage"
      data-testid="tabs"
      @update:model-value="(payload) => record('select', payload)"
    >
      <mat-tab-item
        value="home"
        label="首页"
      />
      <mat-tab-item
        value="photos"
        label="照片"
      />
      <mat-tab-item
        value="settings"
        label="设置"
      />
      <mat-tab-content value="home">
        <p class="tabs-page">
          首页内容
        </p>
      </mat-tab-content>
      <mat-tab-content value="photos">
        <p class="tabs-page">
          照片内容
        </p>
      </mat-tab-content>
      <mat-tab-content value="settings">
        <p class="tabs-page">
          设置内容
        </p>
      </mat-tab-content>
    </mat-tabs>

    <p>
      当前页：<span data-testid="active-page">{{ active }}</span>
    </p>

    <h2>滚动标签行与翻页按钮</h2>
    <mat-tabs
      v-model="scrollActive"
      scrollable
      scroll-buttons
      class="tabs-stage"
      data-testid="scroll-tabs"
    >
      <mat-tab-item
        v-for="i in 10"
        :key="i"
        :value="`tab-${i}`"
        :label="`长标签名称 ${i}`"
      />
      <mat-tab-content
        v-for="i in 10"
        :key="`c-${i}`"
        :value="`tab-${i}`"
      >
        <p class="tabs-page">
          页面内容 {{ i }}
        </p>
      </mat-tab-content>
    </mat-tabs>
  </section>
</template>

<style scoped>
.tabs-scene {
  padding: 24px;
}

.tabs-stage {
  inline-size: 480px;
}

.tabs-page {
  padding: 24px 16px;
}
</style>
