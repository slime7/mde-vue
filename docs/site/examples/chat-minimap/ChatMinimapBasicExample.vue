<!-- #region script -->
<script setup>
const items = [
  {
    id: 'update-time',
    tooltip: {
      subhead: '小陈',
      content: '最近更新时间已改为直接显示原始值，不再做本地化格式化。',
    },
  },
  {
    id: 'dashboard-index',
    tooltip: {
      subhead: '小陈',
      content: '相关代码位于 dashboard/index.vue 的 lastWechatModifiedText。',
    },
  },
  {
    id: 'date-format',
    tooltip: {
      subhead: '小林',
      content: '日期列的格式化逻辑已经移到表格单元格中统一处理。',
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
    id: 'toolbar',
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
    id: 'pagination',
    tooltip: {
      subhead: '小陈',
      content: '分页组件保留每页条数，切换筛选条件后回到第一页。',
    },
  },
  {
    id: 'local-cache',
    tooltip: {
      subhead: '小林',
      content: '本地缓存只保存最近一次同步时间，清理缓存不会影响草稿。',
    },
  },
  {
    id: 'sync',
    tooltip: {
      subhead: '阿青',
      content: '同步失败时会保留当前列表，并在顶部提供重试入口。',
    },
  },
];
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="chat-minimap-basic">
    <mat-chat-minimap :items="items" />

    <div class="chat-minimap-basic__panel">
      <p class="chat-minimap-basic__title">
        对话缩略图
      </p>
      <p class="chat-minimap-basic__hint">
        悬停左侧任意短横线，查看对应消息的 Rich tooltip。
      </p>
    </div>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.chat-minimap-basic {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 24px;
}

.chat-minimap-basic__panel {
  flex: 1;
  min-inline-size: 0;
  padding: 20px;
  background: var(--mat-sys-color-surface-container);
  border-radius: var(--mat-sys-shape-corner-large);
}

.chat-minimap-basic__title {
  margin: 0 0 8px;
  color: var(--mat-sys-color-on-surface);
  font-size: var(--mat-sys-typescale-title-medium-size);
  font-weight: var(--mat-sys-typescale-title-medium-weight);
  line-height: var(--mat-sys-typescale-title-medium-line-height);
}

.chat-minimap-basic__hint {
  margin: 0;
  color: var(--mat-sys-color-on-surface-variant);
  font-size: var(--mat-sys-typescale-body-medium-size);
  font-weight: var(--mat-sys-typescale-body-medium-weight);
  line-height: var(--mat-sys-typescale-body-medium-line-height);
}
</style>
<!-- #endregion style -->
