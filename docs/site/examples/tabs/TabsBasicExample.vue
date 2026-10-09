<!-- #region script -->
<script setup>
import { ref } from 'vue';

const active = ref('home');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="tabs-example">
    <mat-tabs v-model="active">
      <mat-tab-item
        value="home"
        label="首页"
      />
      <mat-tab-item
        value="albums"
        label="相册"
      />
      <mat-tab-item
        value="settings"
        label="设置"
      />

      <mat-tab-content value="home">
        <p class="tabs-example-page">
          首页内容：触摸或手写笔可以在内容区左右滑动翻页，鼠标点击标签切换。
        </p>
      </mat-tab-content>
      <mat-tab-content value="albums">
        <p class="tabs-example-page">
          相册内容：跨多页点击也只播放相邻一页的过渡。
        </p>
      </mat-tab-content>
      <mat-tab-content value="settings">
        <p class="tabs-example-page">
          设置内容：v-model 始终反映当前选中的标签页。
        </p>
      </mat-tab-content>
    </mat-tabs>

    <p class="tabs-example-state">
      当前选中：{{ active }}
    </p>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.tabs-example {
  inline-size: 100%;
}

.tabs-example-page {
  padding: 20px 16px;
}

.tabs-example-state {
  margin-block-start: 8px;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
