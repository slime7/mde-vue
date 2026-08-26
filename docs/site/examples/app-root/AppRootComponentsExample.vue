<!-- #region script -->
<script setup>
import { ref } from 'vue';

const snackbarOpen = ref(false);
const current = ref('home');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-app-root
    :fill-viewport="false"
    class="app-root-components-example"
  >
    <mat-navigation-rail
      v-model="current"
      app
    >
      <mat-navigation-rail-item value="home" icon="home">
        首页
      </mat-navigation-rail-item>
      <mat-navigation-rail-item value="settings" icon="settings">
        设置
      </mat-navigation-rail-item>
    </mat-navigation-rail>

    <mat-app-bar app>
      应用标题
    </mat-app-bar>

    <mat-scroll-area>
      <mat-container>
        <section class="app-root-components-example__content">
          <h3>组件自动接入与正文滚动</h3>
          <p>Navigation 与底部 docked Toolbar 自动登记边缘；正文使用 MatScrollArea 和 MatContainer 组合进行滚动，FAB、Snackbar 和 Tooltip 自动浮动于正文与 Toolbar 之上。</p>
          <mat-btn
            id="app-root-tooltip-target"
            @click="snackbarOpen = true"
          >
            显示 Snackbar
          </mat-btn>
          <mat-tooltip
            content="这个 Tooltip 属于当前 AppRoot"
            target="#app-root-tooltip-target"
          />

          <article
            v-for="item in 4"
            :key="item"
            class="app-root-components-example__card"
          >
            <h4>滚动列表项 {{ item }}</h4>
            <p>正文内容在 ScrollArea 内部滚动，Navigation 不会被滚动带走。</p>
          </article>
        </section>
      </mat-container>
    </mat-scroll-area>

    <mat-toolbar
      app
      variant="docked"
    >
      <mat-btn variant="standard">
        取消
      </mat-btn>
      <mat-spacer />
      <mat-btn variant="standard">
        保存
      </mat-btn>
    </mat-toolbar>

    <mat-fab
      app
      icon="add"
      label="新建"
      position="end"
      @click="snackbarOpen = true"
    />

    <mat-snackbar
      v-model="snackbarOpen"
      text="AppRoot 已自动排列浮动组件"
      closable
      position="right"
    />
  </mat-app-root>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.app-root-components-example {
  block-size: 440px;
  background: var(--mat-sys-color-surface-container-lowest);
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
}

.app-root-components-example__content {
  padding-block: 16px;
}

.app-root-components-example__content h3,
.app-root-components-example__content p {
  margin-block: 0 16px;
}

.app-root-components-example__card {
  margin-block: 12px;
  padding: 12px 16px;
  background: var(--mat-sys-color-surface-container);
  border-radius: var(--mat-sys-shape-corner-medium);
}

.app-root-components-example__card h4 {
  margin: 0 0 8px;
}

.app-root-components-example__card p {
  margin: 0;
}
</style>
<!-- #endregion style -->
