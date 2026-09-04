<!-- #region template -->
<template>
  <div class="virtual-scroll-dynamic-example">
    <div class="virtual-scroll-dynamic-example__container">
      <mat-virtual-scroll
        :items="items"
        estimated-item-height="60"
      >
        <template #default="{ item, itemRef }">
          <div
            :ref="itemRef"
            class="virtual-scroll-dynamic-example__item"
          >
            <div class="virtual-scroll-dynamic-example__header">
              <strong>#{{ item.id }}</strong>
              <span>{{ item.title }}</span>
            </div>
            <p class="virtual-scroll-dynamic-example__desc">
              {{ item.content }}
            </p>
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

const contents = [
  '单行简短描述信息。',
  '这里包含较长的多行文本内容，用于演示动态高度测量与自适应计算机制。文本换行将改变元素实际占据的高度。',
  '中等长度的描述文案，展示在不同长度内容下的虚拟滚动流畅度。',
  '超长内容展示：虚拟滚动会在运行时通过 itemRef 收集 DOM 元素并使用 ResizeObserver 精确测量尺寸，无论内容如何变化都能准确定位与设置上下占位。',
];

const items = ref(
  Array.from({ length: 500 }, (_, index) => ({
    id: index + 1,
    title: `动态卡片 ${index + 1}`,
    content: contents[index % contents.length],
  })),
);
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.virtual-scroll-dynamic-example {
  inline-size: 100%;
}

.virtual-scroll-dynamic-example__container {
  block-size: 260px;
  overflow-y: auto;
}

.virtual-scroll-dynamic-example__item {
  padding: 12px 16px;
  border-bottom: 1px solid var(--mat-sys-color-outline-variant);
  box-sizing: border-box;
}

.virtual-scroll-dynamic-example__header {
  display: flex;
  gap: 8px;
  margin-bottom: 4px;
}

.virtual-scroll-dynamic-example__desc {
  margin: 0;
  color: var(--mat-sys-color-on-surface-variant);
  font-size: 14px;
  line-height: 1.5;
}
</style>
<!-- #endregion style -->
