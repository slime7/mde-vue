<!-- #region script -->
<script setup>
import { ref } from 'vue';

const lastEvent = ref('无');
const isRevealed = ref(false);
const itemRef = ref(null);

function handleSwipeStart(payload) {
  lastEvent.value = `开始 ${payload.direction}`;
}

function handleSwipeEnd(payload) {
  isRevealed.value = payload.action === 'reveal';
  lastEvent.value = `结束 ${payload.direction}（${payload.action}）`;
}

function handlePrimary() {
  lastEvent.value = '全划触发主要操作：编辑';
  isRevealed.value = false;
}

function handleAction(name) {
  lastEvent.value = `点击操作：${name}`;
  itemRef.value?.close();
  isRevealed.value = false;
}

function toggleReveal() {
  if (isRevealed.value) {
    itemRef.value?.close();
    isRevealed.value = false;
  } else {
    itemRef.value?.reveal();
    isRevealed.value = true;
  }
}
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="list-swipeable-example">
    <mat-list interaction="none">
      <mat-list-item
        ref="itemRef"
        value="tacos"
        swipeable
        swipe-primary
        @swipestart="handleSwipeStart"
        @swipeend="handleSwipeEnd"
        @primary="handlePrimary"
      >
        <template #leading>
          <div
            class="list-swipeable-thumb"
            aria-hidden="true"
          >
            <mat-icon icon="lunch_dining" />
          </div>
        </template>

        Tacos

        <template #trailing>
          <mat-btn
            icon="more_horiz"
            variant="text"
            aria-label="更多操作"
            @click.stop="toggleReveal"
          />
        </template>

        <template #swipe-actions>
          <mat-btn
            icon="star"
            variant="filled-tonal"
            aria-label="收藏"
            @click="handleAction('收藏')"
          />
          <mat-btn
            icon="logout"
            variant="filled-tonal"
            aria-label="导出"
            @click="handleAction('导出')"
          />
          <mat-btn
            icon="edit"
            variant="filled"
            aria-label="编辑"
            @click="handleAction('编辑')"
          />
        </template>
      </mat-list-item>
    </mat-list>

    <p class="list-swipeable-state">
      操作状态：{{ lastEvent }}；触摸或手写笔向左滑出操作胶囊，全划触发主要操作（编辑）；PC 端点击「···」或调用 reveal() / close() 控制。
    </p>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.list-swipeable-example {
  inline-size: 100%;
}

.list-swipeable-thumb {
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: 48px;
  block-size: 48px;
  color: var(--mat-sys-color-primary);
  background: var(--mat-sys-color-primary-container);
  border-radius: var(--mat-sys-shape-corner-medium, 12px);
}

.list-swipeable-state {
  margin-block: 8px 0;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
