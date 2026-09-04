<!-- #region template -->
<template>
  <div class="virtual-scroll-scroll-to-index-example">
    <div class="virtual-scroll-scroll-to-index-example__actions">
      <mat-btn
        size="small"
        variant="outlined"
        @click="scrollTo(0)"
      >
        滚动到顶部 (0)
      </mat-btn>
      <mat-btn
        size="small"
        variant="outlined"
        @click="scrollTo(250)"
      >
        滚动到 #250
      </mat-btn>
      <mat-btn
        size="small"
        variant="outlined"
        @click="scrollTo(500)"
      >
        滚动到底部 (500)
      </mat-btn>
    </div>

    <div class="virtual-scroll-scroll-to-index-example__container">
      <mat-virtual-scroll
        ref="virtualScrollRef"
        :items="items"
        item-height="40"
      >
        <template #default="{ item }">
          <div class="virtual-scroll-scroll-to-index-example__item">
            <strong>#{{ item.id }}</strong>
            <span>{{ item.text }}</span>
          </div>
        </template>
      </mat-virtual-scroll>
    </div>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const virtualScrollRef = ref(null);
const items = ref(
  Array.from({ length: 500 }, (_, index) => ({
    id: index + 1,
    text: `数据行项 ${index + 1}`,
  })),
);

function scrollTo(index) {
  virtualScrollRef.value?.scrollToIndex(index, { align: 'start', behavior: 'smooth' });
}
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.virtual-scroll-scroll-to-index-example {
  display: flex;
  flex-direction: column;
  gap: 16px;
  inline-size: 100%;
}

.virtual-scroll-scroll-to-index-example__actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.virtual-scroll-scroll-to-index-example__container {
  block-size: 200px;
  overflow-y: auto;
}

.virtual-scroll-scroll-to-index-example__item {
  display: flex;
  align-items: center;
  gap: 12px;
  block-size: 40px;
  padding-inline: 16px;
  box-sizing: border-box;
  border-bottom: 1px solid var(--mat-sys-color-outline-variant);
}
</style>
<!-- #endregion style -->
