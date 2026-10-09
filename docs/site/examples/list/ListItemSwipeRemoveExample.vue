<!-- #region script -->
<script setup>
import { ref } from 'vue';

const items = ref([
  { id: 'a', title: '第一条通知' },
  { id: 'b', title: '第二条通知' },
  { id: 'c', title: '第三条通知' },
]);
const itemRefs = ref({});
const lastEvent = ref('无');

function handleRemove(payload, id) {
  items.value = items.value.filter((item) => item.id !== id);
  lastEvent.value = `已移除 ${id}（${payload.direction}）`;
}

function triggerSwipe() {
  const firstId = items.value[0]?.id;
  if (firstId && itemRefs.value[firstId]) {
    itemRefs.value[firstId].swipe('start');
  }
}

function restore() {
  items.value = [
    { id: 'a', title: '第一条通知' },
    { id: 'b', title: '第二条通知' },
    { id: 'c', title: '第三条通知' },
  ];
  lastEvent.value = '已恢复列表';
}
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="list-swipe-remove-example">
    <mat-list interaction="none">
      <mat-list-item
        v-for="item in items"
        :key="item.id"
        :ref="(el) => { if (el) itemRefs[item.id] = el; }"
        :value="item.id"
        swipeable
        swipe-remove
        @remove="(payload) => handleRemove(payload, item.id)"
      >
        {{ item.title }}
      </mat-list-item>
    </mat-list>

    <p class="list-swipe-remove-state">
      最后一次操作：{{ lastEvent }}；剩余项目数：{{ items.length }}
    </p>

    <p class="list-swipe-remove-hint">
      触摸或手写笔越过提交阈值后，项目滑出并收拢，动画结束才发出 remove；未在事件中移除数据时自动恢复。
    </p>

    <div class="list-swipe-remove-actions">
      <mat-btn
        variant="outlined"
        :disabled="items.length === 0"
        @click="triggerSwipe"
      >
        swipe('start') 移除首项
      </mat-btn>
      <mat-btn
        variant="text"
        @click="restore"
      >
        恢复列表
      </mat-btn>
    </div>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.list-swipe-remove-example {
  inline-size: 100%;
}

.list-swipe-remove-state {
  margin-block: 8px 0;
  color: var(--mat-sys-color-on-surface-variant);
}

.list-swipe-remove-hint {
  margin-block: 4px 0;
  color: var(--mat-sys-color-on-surface-variant);
}

.list-swipe-remove-actions {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-block-start: 8px;
}
</style>
<!-- #endregion style -->
