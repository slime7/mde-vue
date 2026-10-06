<!-- #region script -->
<script setup>
import { computed, ref } from 'vue';

const drawerOpen = ref(true);
const current = ref('home');

const titles = {
  home: '共享相册',
  albums: '相册归档',
  trash: '回收站',
};

const currentTitle = computed(() => titles[current.value] || titles.home);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-app-root
    :fill-viewport="false"
    scrollable
    class="layouts-app-shell-example"
  >
    <mat-navigation-drawer
      v-model="current"
      v-model:expanded="drawerOpen"
      bordered
      aria-label="主导航"
    >
      <template #header>
        <p class="layouts-app-shell-example__brand">
          拾光相册
        </p>
      </template>
      <mat-navigation-rail-item
        value="home"
        icon="photo_library"
      >
        共享相册
      </mat-navigation-rail-item>
      <mat-navigation-rail-item
        value="albums"
        icon="collections_bookmark"
      >
        相册归档
      </mat-navigation-rail-item>
      <mat-navigation-rail-item
        value="trash"
        icon="delete"
      >
        回收站
      </mat-navigation-rail-item>
    </mat-navigation-drawer>

    <mat-app-bar app>
      <template #leading>
        <mat-btn
          variant="standard"
          size="small"
          :icon="drawerOpen ? 'menu_open' : 'menu'"
          :label="drawerOpen ? '收起导航' : '展开导航'"
          @click="drawerOpen = !drawerOpen"
        />
      </template>
      {{ currentTitle }}
    </mat-app-bar>

    <mat-scroll-area>
      <mat-container>
        <section class="layouts-app-shell-example__content">
          <h3>{{ currentTitle }}</h3>
          <p>导航抽屉停靠在起始侧并占据完整高度，App bar 停靠在顶部、覆盖抽屉以外的宽度；正文在应用根的内部滚动容器中移动，导航与顶栏保持固定。</p>
          <article
            v-for="index in 4"
            :key="index"
            class="layouts-app-shell-example__card"
          >
            <h4>照片故事 {{ index }}</h4>
            <p>占位内容，用于演示正文的滚动与边缘避让。</p>
          </article>
        </section>
      </mat-container>
    </mat-scroll-area>
  </mat-app-root>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.layouts-app-shell-example {
  position: relative;
  block-size: 100%;
  overflow: hidden;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
}

.layouts-app-shell-example__brand {
  margin: 0;
  padding: 12px 16px 4px;
  color: var(--mat-sys-color-on-surface-variant);
  font-size: 13px;
  font-weight: 600;
}

.layouts-app-shell-example__content h3 {
  margin: 0 0 8px;
}

.layouts-app-shell-example__content p {
  margin: 0 0 16px;
}

.layouts-app-shell-example__card {
  margin-block: 12px;
  padding: 12px 16px;
  background: var(--mat-sys-color-surface-container);
  border-radius: var(--mat-sys-shape-corner-medium);
}

.layouts-app-shell-example__card h4 {
  margin: 0 0 8px;
}

.layouts-app-shell-example__card p {
  margin: 0;
}
</style>
<!-- #endregion style -->
