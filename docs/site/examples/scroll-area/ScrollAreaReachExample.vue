<!-- #region template -->
<template>
  <div class="scroll-area-reach-example">
    <p>{{ status }}</p>

    <mat-scroll-area
      class="scroll-area-reach-example__area"
      :reach-threshold="{ start: 24, end: 48 }"
      aria-label="无限滚动消息"
      tabindex="0"
      @reach-start="status = '已回到列表开头'"
      @reach-end="loadMore"
    >
      <p v-for="item in items" :key="item">
        消息 {{ item }}
      </p>
    </mat-scroll-area>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const items = ref(Array.from({ length: 12 }, (_, index) => index + 1));
const status = ref('向下滚动以加载更多');

function loadMore({ distance }) {
  const start = items.value.length + 1;
  items.value.push(...Array.from({ length: 6 }, (_, index) => start + index));
  status.value = `距末端 ${Math.round(distance)}px，已加载 6 条`;
}
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.scroll-area-reach-example {
  inline-size: 100%;
}

.scroll-area-reach-example__area {
  block-size: 220px;
  padding-inline: 16px;
  background: var(--mat-sys-color-surface-container-low);
  border-radius: var(--mat-sys-shape-corner-large);
}
</style>
<!-- #endregion style -->
