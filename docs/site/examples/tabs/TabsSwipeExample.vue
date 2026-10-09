<!-- #region script -->
<script setup>
import { ref } from 'vue';

const active = ref('first');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="tabs-swipe-example">
    <mat-tabs v-model="active">
      <mat-tab-item
        value="first"
        label="第一页"
      />
      <mat-tab-item
        value="second"
        label="第二页"
      />
      <mat-tab-item
        value="third"
        label="第三页"
      />

      <mat-tab-content value="first">
        <p class="tabs-swipe-page">
          在触摸设备上向左滑动进入下一页；鼠标指针只能点击标签切换。
        </p>
      </mat-tab-content>
      <mat-tab-content value="second">
        <p class="tabs-swipe-page">
          滑动过程完全跟手，越过半页宽度或快速甩动才会翻页，否则回弹。
        </p>
      </mat-tab-content>
      <mat-tab-content value="third">
        <p class="tabs-swipe-page">
          首尾两端带阻尼回弹，减少动态效果偏好下直接切换。
        </p>
      </mat-tab-content>
    </mat-tabs>

    <p class="tabs-swipe-state">
      当前选中：{{ active }}
    </p>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.tabs-swipe-example {
  inline-size: 100%;
}

.tabs-swipe-page {
  padding: 20px 16px;
}

.tabs-swipe-state {
  margin-block-start: 8px;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
