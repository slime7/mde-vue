<script setup>
import { ref } from 'vue';

const selected = ref('analytics');
const expanded = ref(false);
const tab = ref('overview');
</script>

<template>
  <section data-scene="ripple-scope" class="ripple-scope-scene">
    <mat-navigation-rail
      v-model="selected"
      v-model:expanded="expanded"
      collapsible
      aria-label="涟漪范围导航"
    >
      <mat-navigation-rail-item
        value="overview"
        icon="dashboard"
        data-testid="ripple-nav-overview"
      >
        概览
      </mat-navigation-rail-item>
      <mat-navigation-rail-item
        value="analytics"
        icon="analytics"
        data-testid="ripple-nav-analytics"
      >
        分析
      </mat-navigation-rail-item>
    </mat-navigation-rail>

    <mat-list interaction="multi-action" aria-label="多操作列表" class="ripple-scope-list">
      <mat-list-item data-testid="ripple-list-multi">
        项目说明.pdf
        <template #trailing>
          <mat-btn icon="download" label="下载" />
        </template>
      </mat-list-item>
    </mat-list>

    <mat-list interaction="single-action" aria-label="单操作列表" class="ripple-scope-list">
      <mat-list-item data-testid="ripple-list-single">
        打开项目
      </mat-list-item>
    </mat-list>

    <mat-tabs v-model="tab" variant="secondary" class="ripple-scope-list" aria-label="涟漪范围标签页">
      <mat-tab-item value="overview" icon="dashboard" label="概览" data-testid="ripple-tab" />
      <mat-tab-item value="analytics" icon="analytics" label="分析" />
    </mat-tabs>
  </section>
</template>

<style scoped>
.ripple-scope-scene {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 24px;
}

.ripple-scope-list {
  inline-size: 420px;
}
</style>
