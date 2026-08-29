<!-- #region script -->
<script setup>
import { ref } from 'vue';

const disabled = ref(false);
const refreshing = ref(false);
let count = 0;

function createItem() {
  count += 1;

  return `占位列表项 ${count}`;
}

const items = ref(Array.from({ length: 8 }, () => createItem()));

async function onRefresh() {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  items.value.unshift(createItem());
  refreshing.value = false;
}
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="pull-to-refresh-disabled-example">
    <mat-scroll-area class="area">
      <mat-pull-to-refresh
        v-model="refreshing"
        :disabled="disabled"
        @refresh="onRefresh"
      />
      <ul class="list">
        <li v-for="item in items" :key="item">
          {{ item }}
        </li>
      </ul>
    </mat-scroll-area>
    <mat-switch v-model="disabled">
      禁用下拉刷新
    </mat-switch>
    <p class="hint">
      禁用后拖拽和滚轮都不会触发刷新，重新打开开关立即恢复。
    </p>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.pull-to-refresh-disabled-example {
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

.hint {
  margin: 0;
  color: var(--mat-sys-on-surface-variant);
}
</style>
<!-- #endregion style -->
