<script setup>
import { ref } from 'vue';

const scrollArea = ref(null);

function record(name, payload) {
  window.pushEvent(name, payload.distance);
}

function scrollToMiddle() {
  const scroller = scrollArea.value?.getScroller?.();
  if (scroller) {
    scroller.scrollTop = (scroller.scrollHeight - scroller.clientHeight) / 2;
  }
}
</script>

<template>
  <section data-scene="scroll-area" class="scroll-scene">
    <h1>滚动区域场景</h1>

    <mat-scroll-area
      ref="scrollArea"
      class="scroll-stage"
      data-testid="scroll-area"
      :reach-threshold="40"
      @reach-start="record('reach-start', $event)"
      @reach-end="record('reach-end', $event)"
    >
      <p
        v-for="i in 40"
        :key="i"
        class="scroll-row"
      >
        内容行 {{ i }}
      </p>
    </mat-scroll-area>
    <mat-btn
      data-testid="jump-middle"
      @click="scrollToMiddle"
    >
      跳到中部
    </mat-btn>
  </section>
</template>

<style scoped>
.scroll-scene {
  min-block-size: 100vh;
}

.scroll-stage {
  block-size: 400px;
  inline-size: 480px;
}

.scroll-row {
  padding-block: 8px;
}
</style>
