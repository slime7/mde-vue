<script setup>
import { onBeforeUnmount, ref, watch } from 'vue';

const refreshing = ref(false);
let stopTimer;

watch(refreshing, (value) => {
  if (!value) {
    return;
  }
  window.pushEvent('refreshing-start');
  clearTimeout(stopTimer);
  stopTimer = setTimeout(() => {
    refreshing.value = false;
  }, 200);
});

onBeforeUnmount(() => {
  clearTimeout(stopTimer);
});

function record(name) {
  window.pushEvent(name);
}
</script>

<template>
  <section data-scene="pull-to-refresh" class="ptr-scene">
    <h1>下拉刷新场景</h1>

    <mat-scroll-area
      class="ptr-stage"
      data-testid="scroll-area"
    >
      <mat-pull-to-refresh
        v-model="refreshing"
        :trigger-distance="60"
        placeholder
        @refresh="record('refresh')"
      />
      <p
        v-for="i in 30"
        :key="i"
        class="ptr-row"
      >
        内容行 {{ i }}
      </p>
    </mat-scroll-area>
    <p>
      刷新状态：<span data-testid="refresh-state">{{ refreshing ? '刷新中' : '空闲' }}</span>
    </p>
  </section>
</template>

<style scoped>
.ptr-scene {
  min-block-size: 100vh;
}

.ptr-stage {
  block-size: 400px;
  inline-size: 480px;
}

.ptr-row {
  padding-block: 8px;
}
</style>
