<!-- #region script -->
<script setup>
import { computed, ref } from 'vue';

const items = [
  {
    id: 'sync-status',
    tooltip: {
      subhead: '小陈',
      content: '面板顶部新增同步状态，失败时保留上次成功时间。',
    },
  },
  {
    id: 'filter',
    tooltip: {
      subhead: '阿青',
      content: '筛选栏改成两行布局，窄窗口下按钮会自动换行。',
    },
  },
  {
    id: 'search',
    tooltip: {
      subhead: '阿青',
      content: '搜索框支持按联系人和关键词同时过滤。',
    },
  },
  {
    id: 'empty-state',
    tooltip: {
      subhead: '小林',
      content: '没有消息时展示空状态，不再显示上次更新时间。',
    },
  },
  {
    id: 'cache',
    tooltip: {
      subhead: '小林',
      content: '本地缓存只保存最近一次同步时间，清理缓存不会影响草稿。',
    },
  },
];
const selectedIndex = ref(null);
const selectedItem = computed(() => items[selectedIndex.value] ?? null);

function handleClick({ index }) {
  selectedIndex.value = index;
}
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="chat-minimap-click">
    <mat-chat-minimap :items="items" @click="handleClick" />

    <div class="chat-minimap-click__panel">
      <p class="chat-minimap-click__title">
        {{ selectedItem ? `已选择第 ${selectedIndex + 1} 条` : '尚未选择条目' }}
      </p>
      <p class="chat-minimap-click__content">
        {{ selectedItem?.tooltip?.content ?? '点击左侧任意短横线，查看 click 事件载荷。' }}
      </p>
    </div>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.chat-minimap-click {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  padding: 24px;
}

.chat-minimap-click__panel {
  box-sizing: border-box;
  inline-size: 100%;
  padding: 20px;
  background: var(--mat-sys-color-surface-container);
  border-radius: var(--mat-sys-shape-corner-large);
}

.chat-minimap-click__title {
  margin: 0 0 8px;
  color: var(--mat-sys-color-on-surface);
  font-size: var(--mat-sys-typescale-title-medium-size);
  font-weight: var(--mat-sys-typescale-title-medium-weight);
  line-height: var(--mat-sys-typescale-title-medium-line-height);
}

.chat-minimap-click__content {
  margin: 0;
  color: var(--mat-sys-color-on-surface-variant);
  font-size: var(--mat-sys-typescale-body-medium-size);
  font-weight: var(--mat-sys-typescale-body-medium-weight);
  line-height: var(--mat-sys-typescale-body-medium-line-height);
}
</style>
<!-- #endregion style -->
