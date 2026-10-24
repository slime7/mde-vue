<!-- #region script -->
<script setup>
import { computed, ref } from 'vue';

const messages = [
  { id: 'sync', who: '小陈', text: '面板顶部新增同步状态，失败时保留上次成功时间。' },
  { id: 'filter', who: '阿青', text: '筛选栏改成两行布局，窄窗口下按钮会自动换行。' },
  { id: 'search', who: '阿青', text: '搜索框支持按联系人和关键词同时过滤。' },
  { id: 'empty', who: '小林', text: '没有消息时展示空状态，不再显示上次更新时间。' },
  { id: 'cache', who: '小林', text: '本地缓存只保存最近一次同步时间，清理缓存不影响草稿。' },
  { id: 'draft', who: '小陈', text: '切换会话时草稿自动暂存，回到会话后原样恢复。' },
  { id: 'pin', who: '阿青', text: '置顶会话最多保留五个，超出时最早的自动取消置顶。' },
  { id: 'mute', who: '小林', text: '会话静默后角标不再累加，提及仍然提醒。' },
];
const items = computed(() => messages.map((message) => ({ id: message.id })));
const current = ref(0);

function handleScroll({ target }) {
  const maxScroll = target.scrollHeight - target.clientHeight;
  const progress = maxScroll > 0 ? target.scrollTop / maxScroll : 0;

  current.value = Math.round(progress * (messages.length - 1));
}
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="chat-minimap-current">
    <mat-chat-minimap :items="items" :current="current" />

    <ul class="chat-minimap-current__list" @scroll.passive="handleScroll">
      <li v-for="message in messages" :key="message.id" class="chat-minimap-current__message">
        <span class="chat-minimap-current__who">{{ message.who }}</span>
        <span class="chat-minimap-current__text">{{ message.text }}</span>
      </li>
    </ul>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.chat-minimap-current {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  padding: 24px;
}

.chat-minimap-current__list {
  box-sizing: border-box;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 12px;
  inline-size: 320px;
  max-height: 240px;
  margin: 0;
  padding: 16px;
  overflow-y: auto;
  list-style: none;
  background: var(--mat-sys-color-surface-container);
  border-radius: var(--mat-sys-shape-corner-large);
}

.chat-minimap-current__message {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.chat-minimap-current__who {
  color: var(--mat-sys-color-on-surface);
  font-size: var(--mat-sys-typescale-label-large-size);
  font-weight: var(--mat-sys-typescale-label-large-weight);
  line-height: var(--mat-sys-typescale-label-large-line-height);
}

.chat-minimap-current__text {
  color: var(--mat-sys-color-on-surface-variant);
  font-size: var(--mat-sys-typescale-body-medium-size);
  line-height: var(--mat-sys-typescale-body-medium-line-height);
}
</style>
<!-- #endregion style -->
