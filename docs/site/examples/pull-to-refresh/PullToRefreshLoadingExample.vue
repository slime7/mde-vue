<!-- #region script -->
<script setup>
import { ref } from 'vue';

const refreshing = ref(false);
const items = ref(['透传 size 与 containment', '列表项 乙', '列表项 丙', '列表项 丁']);

async function onRefresh() {
  await new Promise((resolve) => setTimeout(resolve, 1400));

  items.value = [...items.value].reverse();
  refreshing.value = false;
}
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="pull-to-refresh-loading-example">
    <mat-scroll-area class="area">
      <mat-pull-to-refresh
        v-model="refreshing"
        placeholder
        containment
        size="60"
        color="tertiary"
        @refresh="onRefresh"
      />
      <ul>
        <li v-for="item in items" :key="item">
          {{ item }}
        </li>
      </ul>
    </mat-scroll-area>
    <p class="hint">
      containment、size、color 直接透传给内部的 mat-loading。
    </p>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.pull-to-refresh-loading-example {
  user-select: none;
  display: grid;
  justify-items: center;
  gap: 12px;
  inline-size: 100%;
}

.area {
  inline-size: min(100%, 420px);
  block-size: 220px;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

ul li {
  padding: 12px 16px;
  border-bottom: 1px solid var(--mat-sys-outline-variant);
}

.hint {
  margin: 0;
  color: var(--mat-sys-on-surface-variant);
}
</style>
<!-- #endregion style -->
