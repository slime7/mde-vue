<!-- #region script -->
<script setup>
import { ref } from 'vue';

const chapters = [
  '第一章 起步入门', '第二章 核心概念', '第三章 设计令牌',
  '第四章 响应式断点', '第五章 动效指南', '第六章 组件扩展',
  '第七章 无障碍规范', '第八章 键盘导航', '第九章 性能调优', '第十章 工程分发',
];
const active = ref(chapters[0]);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="tabs-scrollable-example">
    <mat-tabs
      v-model="active"
      scrollable
      scroll-buttons
    >
      <mat-tab-item
        v-for="chapter in chapters"
        :key="chapter"
        :value="chapter"
        :label="chapter"
      />

      <mat-tab-content
        v-for="chapter in chapters"
        :key="chapter"
        :value="chapter"
      >
        <p class="tabs-scrollable-page">
          {{ chapter }}：滚动标签行按内容宽度排列，激活项自动平滑居中，支持鼠标滚轮横向滚动；开启 scroll-buttons 后溢出时显示两端翻页按钮与边缘渐变提示。
        </p>
      </mat-tab-content>
    </mat-tabs>

    <p class="tabs-scrollable-state">
      当前选中：{{ active }}
    </p>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.tabs-scrollable-example {
  inline-size: 100%;
}

.tabs-scrollable-page {
  padding: 20px 16px;
}

.tabs-scrollable-state {
  margin-block-start: 8px;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
