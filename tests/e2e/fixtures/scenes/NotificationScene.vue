<script setup>
import { ref } from 'vue';

const positions = [
  'top-start',
  'top-center',
  'top-end',
  'bottom-start',
  'bottom-center',
  'bottom-end',
];
const open = ref(true);
const position = ref('top-start');
const actionOpen = ref(false);

function show(value) {
  position.value = value;
  open.value = true;
}

function recordAction({ action }) {
  window.pushEvent('notification-action', action.text);
}
</script>

<template>
  <section data-scene="notification" class="notification-scene">
    <h1>通知场景</h1>

    <div class="notification-scene__controls">
      <button
        v-for="item in positions"
        :key="item"
        type="button"
        :data-position="item"
        @click="show(item)"
      >
        {{ item }}
      </button>
      <button type="button" data-testid="notification-reopen" @click="open = true">
        重新显示
      </button>
    </div>

    <mat-layout data-testid="notification-stage" class="notification-scene__stage">
      <div data-testid="notification-positioned-host">
        <mat-notification
          v-model="open"
          data-testid="notification-positioned"
          :position="position"
          text="用于验证六个方位。"
          title="位置测试"
        />
      </div>
    </mat-layout>

    <div data-testid="notification-inline-host" class="notification-scene__inline-host">
      <mat-notification
        data-testid="notification-inline"
        :closable="false"
        :model-value="true"
        text="保持文档流位置。"
        title="自然布局"
      />
    </div>

    <button type="button" data-testid="notification-action-open" @click="actionOpen = true">
      打开操作通知
    </button>

    <mat-notification
      v-model="actionOpen"
      data-testid="notification-action"
      :actions="[{ text: '查看' }]"
      text="点击操作后关闭。"
      title="操作通知"
      @action="recordAction"
    />
  </section>
</template>

<style scoped>
.notification-scene {
  inline-size: 720px;
}

.notification-scene__controls {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-block-end: 16px;
}

.notification-scene__stage {
  block-size: 360px;
}

.notification-scene__inline-host {
  inline-size: 720px;
  margin-block: 16px;
}
</style>
