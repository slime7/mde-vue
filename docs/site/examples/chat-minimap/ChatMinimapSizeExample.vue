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
  <div class="chat-minimap-size">
    <div class="chat-minimap-size__samples">
      <div class="chat-minimap-size__sample">
        <span class="chat-minimap-size__label">默认尺寸</span>
        <mat-chat-minimap :items="items" />
      </div>

      <div class="chat-minimap-size__sample">
        <span class="chat-minimap-size__label">
          item-width=24 / item-height=4 / item-gap=12
        </span>
        <mat-chat-minimap
          :items="items"
          :item-width="24"
          :item-height="4"
          :item-gap="12"
        />
      </div>
    </div>

    <p class="chat-minimap-size__hint">
      item-width 是静止宽度，悬停时会展开到两倍；item-height 是短横线厚度；item-gap
      是相邻短横线之间的间距。
    </p>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.chat-minimap-size {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
}

.chat-minimap-size__samples {
  display: flex;
  align-items: flex-start;
  gap: 48px;
}

.chat-minimap-size__sample {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chat-minimap-size__label {
  color: var(--mat-sys-color-on-surface-variant);
  font-size: var(--mat-sys-typescale-label-large-size);
  font-weight: var(--mat-sys-typescale-label-large-weight);
  line-height: var(--mat-sys-typescale-label-large-line-height);
}

.chat-minimap-size__hint {
  margin: 0;
  color: var(--mat-sys-color-on-surface-variant);
  font-size: var(--mat-sys-typescale-body-medium-size);
  font-weight: var(--mat-sys-typescale-body-medium-weight);
  line-height: var(--mat-sys-typescale-body-medium-line-height);
}
</style>
<!-- #endregion style -->
