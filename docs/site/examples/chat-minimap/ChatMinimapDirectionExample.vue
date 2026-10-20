<!-- #region script -->
<script setup>
const items = [
  {
    id: 'plan',
    tooltip: {
      subhead: '小陈',
      content: '先确认首屏范围，再补齐窄窗口下的工具栏布局。',
    },
  },
  {
    id: 'toolbar',
    tooltip: {
      subhead: '阿青',
      content: '筛选栏拆成两行，常用筛选保留在第一行。',
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
    id: 'empty',
    tooltip: {
      subhead: '小林',
      content: '没有消息时展示空状态，不再显示上次更新时间。',
    },
  },
  {
    id: 'cache',
    tooltip: {
      subhead: '小林',
      content: '本地缓存只保存最近一次同步时间。',
    },
  },
  {
    id: 'sync',
    tooltip: {
      subhead: '小陈',
      content: '同步失败时保留当前列表，并在顶部提供重试入口。',
    },
  },
];
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="chat-minimap-direction">
    <div class="chat-minimap-direction__sample">
      <span class="chat-minimap-direction__label">direction="left"</span>
      <div class="chat-minimap-direction__stage chat-minimap-direction__stage--left">
        <mat-chat-minimap
          direction="left"
          :items="items"
        />
      </div>
    </div>

    <div class="chat-minimap-direction__sample">
      <span class="chat-minimap-direction__label">direction="right"</span>
      <div class="chat-minimap-direction__stage chat-minimap-direction__stage--right">
        <mat-chat-minimap
          direction="right"
          :items="items"
        />
      </div>
    </div>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.chat-minimap-direction {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
}

.chat-minimap-direction__sample {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chat-minimap-direction__label {
  color: var(--mat-sys-color-on-surface-variant);
  font-size: var(--mat-sys-typescale-label-large-size);
  font-weight: var(--mat-sys-typescale-label-large-weight);
  line-height: var(--mat-sys-typescale-label-large-line-height);
}

.chat-minimap-direction__stage {
  display: flex;
  box-sizing: border-box;
  inline-size: 100%;
  min-block-size: 104px;
  padding: 20px;
  border: 1px dashed var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-medium);
}

.chat-minimap-direction__stage--left {
  justify-content: flex-start;
}

.chat-minimap-direction__stage--right {
  justify-content: flex-end;
}
</style>
<!-- #endregion style -->
