<script setup>
import { ref } from 'vue';

const items = ref([
  { id: 'a', title: '第一条通知' },
  { id: 'b', title: '第二条通知' },
  { id: 'c', title: '第三条通知' },
]);
const revealItem = ref(null);

function record(name, payload) {
  window.pushEvent(name, payload);
}

function handleRemove(payload, id) {
  window.pushEvent('remove', payload);
  const next = items.value.filter((item) => item.id !== id);

  items.value.splice(0, items.value.length, ...next);
}
</script>

<template>
  <section
    data-scene="list-swipe"
    class="list-swipe-scene"
  >
    <h1>List 滑动场景</h1>

    <mat-list
      data-testid="reveal-list"
      interaction="none"
    >
      <mat-list-item
        ref="revealItem"
        value="mail"
        swipeable
        @swipestart="(payload) => record('swipestart', payload)"
        @swipeend="(payload) => record('swipeend', payload)"
      >
        邮件通知
        <template #swipe-actions>
          <button
            data-testid="archive-action"
            type="button"
            class="list-swipe-action"
          >
            归档
          </button>
        </template>
      </mat-list-item>

      <mat-list-item
        value="tacos"
        swipeable
        swipe-primary
        data-testid="primary-swipe-item"
        @swipestart="(payload) => record('swipestart', payload)"
        @swipeend="(payload) => record('swipeend', payload)"
        @primary="(payload) => record('primary', payload)"
      >
        Tacos
        <template #swipe-actions>
          <button
            data-testid="fav-action"
            type="button"
            class="list-swipe-action"
          >
            收藏
          </button>
          <button
            data-testid="edit-action"
            type="button"
            class="list-swipe-action"
          >
            编辑
          </button>
        </template>
      </mat-list-item>
    </mat-list>

    <mat-list
      data-testid="dismiss-list"
      interaction="none"
      class="list-swipe-dismiss"
    >
      <mat-list-item
        v-for="item in items"
        :key="item.id"
        :value="item.id"
        swipeable
        swipe-remove
        @remove="(payload) => handleRemove(payload, item.id)"
      >
        {{ item.title }}
      </mat-list-item>
    </mat-list>

    <p>
      剩余项目：<span data-testid="item-count">{{ items.length }}</span>
    </p>
    <button
      data-testid="programmatic-swipe"
      type="button"
      @click="revealItem?.swipe('start')"
    >
      函数触发滑动
    </button>
  </section>
</template>

<style scoped>
.list-swipe-scene {
  padding: 24px;
}

.list-swipe-scene mat-list {
  inline-size: 420px;
}

.list-swipe-dismiss {
  margin-block-start: 16px;
}

.list-swipe-action {
  inline-size: 72px;
  block-size: 48px;
}
</style>
