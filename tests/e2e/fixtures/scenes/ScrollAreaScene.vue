<script setup>
import { ref } from 'vue';

const scrollArea = ref(null);
const snapArea = ref(null);

function record(name, payload) {
  window.pushEvent(name, payload.distance);
}

function recordSnapClick(event) {
  const item = event.target.closest?.('[data-snap-item]');
  // 拖拽后浏览器会把 click 合成到 pointer capture 的滚动元素上，只记录真正到达内容条目的点击。
  if (item) {
    window.pushEvent('snap-click', Number(item.dataset.snapItem));
  }
}

function scrollToMiddle() {
  const scroller = scrollArea.value?.getScroller?.();
  if (scroller) {
    scroller.scrollTop = (scroller.scrollHeight - scroller.clientHeight) / 2;
  }
}

window.readSnapAreaScrollLeft = () => snapArea.value?.getScroller?.()?.scrollLeft ?? null;
window.writeSnapAreaScrollLeft = (value) => {
  const scroller = snapArea.value?.getScroller?.();
  if (scroller) {
    scroller.scrollLeft = value;
  }
};
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

    <mat-scroll-area
      ref="snapArea"
      class="snap-drag-stage"
      data-testid="snap-drag-area"
      orientation="horizontal"
      drag-scroll
      snap="mandatory"
      :snap-padding="28"
      @click.capture="recordSnapClick"
    >
      <div class="snap-drag-track">
        <button
          v-for="i in 4"
          :key="i"
          type="button"
          class="snap-drag-item"
          :data-snap-item="i"
        >
          卡片 {{ i }}
        </button>
        <button
          type="button"
          class="snap-drag-item"
          data-snap-item="5"
        >
          <img
            class="snap-drag-item__img"
            src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='64'%3E%3Crect width='160' height='64' fill='%236750a4'/%3E%3C/svg%3E"
            alt="示例图片"
          >
          图片卡片
        </button>
      </div>
    </mat-scroll-area>
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

.snap-drag-stage {
  margin-block-start: 24px;
  inline-size: 340px;
  block-size: 120px;
}

.snap-drag-track {
  display: flex;
  gap: 12px;
  inline-size: max-content;
}

.snap-drag-item {
  box-sizing: border-box;
  flex-shrink: 0;
  inline-size: 224px;
  padding: 12px 16px;
  text-align: start;
  scroll-snap-align: start;
}

.snap-drag-item__img {
  display: block;
  inline-size: 100%;
  block-size: 64px;
}
</style>
