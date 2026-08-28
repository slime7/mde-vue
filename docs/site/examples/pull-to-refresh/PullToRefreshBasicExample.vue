<!-- #region script -->
<script setup>
import { ref } from 'vue';

const refreshing = ref(false);
const lastRefreshed = ref('');
let seed = 0;

function createItem() {
  seed += 1;
  const time = new Date().toLocaleTimeString('zh-CN', { hour12: false });

  return { id: seed, text: `新消息 ${seed}（${time}）` };
}

const items = ref([
  { id: -1, text: '周会同步：组件库周报' },
  { id: -2, text: '设计评审：形状令牌更新' },
  { id: -3, text: '通知：滚动区域组件已合入' },
]);

async function onRefresh() {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  items.value.unshift(createItem());
  lastRefreshed.value = new Date().toLocaleTimeString('zh-CN', { hour12: false });
  refreshing.value = false;
}
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="pull-to-refresh-basic-example">
    <mat-scroll-area class="area">
      <mat-pull-to-refresh v-model="refreshing" @refresh="onRefresh" />
      <ul class="list">
        <li v-for="item in items" :key="item.id">
          {{ item.text }}
        </li>
      </ul>
    </mat-scroll-area>
    <output>
      最近刷新：{{ lastRefreshed || '尚未刷新' }}
    </output>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.pull-to-refresh-basic-example {
  user-select: none;
  display: grid;
  justify-items: center;
  gap: 12px;
  inline-size: 100%;
}

.area {
  inline-size: min(100%, 420px);
  block-size: 240px;
}

.list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.list li {
  padding: 12px 16px;
  border-bottom: 1px solid var(--mat-sys-outline-variant);
}
</style>
<!-- #endregion style -->
