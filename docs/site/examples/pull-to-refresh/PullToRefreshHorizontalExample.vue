<!-- #region script -->
<script setup>
import { ref } from 'vue';

const refreshing = ref(false);
let count = 0;

function createCard() {
  count += 1;

  return `卡片 ${count}`;
}

const cards = ref(['卡片 甲', '卡片 乙', '卡片 丙', '卡片 丁', '卡片 戊']);

async function onRefresh() {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  cards.value.unshift(createCard());
  refreshing.value = false;
}
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="pull-to-refresh-horizontal-example">
    <mat-scroll-area class="area" orientation="horizontal" no-scroll-padding>
      <mat-pull-to-refresh v-model="refreshing" placeholder @refresh="onRefresh" />
      <ul class="cards">
        <li v-for="card in cards" :key="card">
          {{ card }}
        </li>
      </ul>
    </mat-scroll-area>
    <p class="hint">
      滚动到最左端后继续向右拉动触发；组件与卡片列表保持行内布局，placeholder 变宽时把卡片推向右侧。
    </p>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.pull-to-refresh-horizontal-example {
  user-select: none;
  display: grid;
  justify-items: center;
  gap: 12px;
  inline-size: 100%;
}

.area {
  inline-size: min(100%, 480px);
  block-size: 160px;
}

.cards {
  margin: 0;
  padding: 0;
  list-style: none;
  display: inline-flex;
  gap: 12px;
  block-size: 100%;
  align-items: center;
  white-space: nowrap;
}

.cards li {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: 120px;
  block-size: 96px;
  border-radius: var(--mat-sys-shape-corner-medium);
  background: var(--mat-sys-surface-container);
}

.hint {
  margin: 0;
  color: var(--mat-sys-on-surface-variant);
}
</style>
<!-- #endregion style -->
