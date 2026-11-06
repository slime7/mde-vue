<!-- #region script -->
<script setup>
import { computed, ref, watch } from 'vue';

const sections = {
  inspire: {
    label: '灵感',
    icon: 'lightbulb',
    pages: [
      { id: 'saved', label: '我的收藏', icon: 'bookmark' },
      { id: 'discover', label: '发现', icon: 'explore' },
    ],
  },
  projects: {
    label: '项目',
    icon: 'folder',
    pages: [
      { id: 'ongoing', label: '进行中', icon: 'rocket_launch' },
      { id: 'archived', label: '已归档', icon: 'inventory_2' },
    ],
  },
  team: {
    label: '团队',
    icon: 'group',
    pages: [
      { id: 'members', label: '成员', icon: 'person' },
      { id: 'activity', label: '最近动态', icon: 'timeline' },
    ],
  },
};

const drawerOpen = ref(true);
const section = ref('inspire');
const page = ref('saved');

const sectionMeta = computed(() => sections[section.value] || sections.inspire);

const pageTitle = computed(() => {
  const matched = sectionMeta.value.pages.find((item) => item.id === page.value);
  return matched ? matched.label : sectionMeta.value.pages[0].label;
});

// 切换一级目的地时重置二级选中并展开抽屉，让抽屉始终展示当前目的地的子菜单。
watch(section, () => {
  page.value = sectionMeta.value.pages[0].id;
  drawerOpen.value = true;
});
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-app-root
    :fill-viewport="false"
    scrollable
    class="layouts-rail-drawer-example"
  >
    <mat-navigation-rail
      v-model="section"
      bordered
      aria-label="一级导航"
    >
      <mat-btn
        variant="standard"
        :icon="drawerOpen ? 'menu_open' : 'menu'"
        :label="drawerOpen ? '收起子菜单' : '展开子菜单'"
        @click="drawerOpen = !drawerOpen"
      />
      <mat-navigation-rail-item
        v-for="(meta, key) in sections"
        :key="key"
        :value="key"
        :icon="meta.icon"
      >
        {{ meta.label }}
      </mat-navigation-rail-item>
    </mat-navigation-rail>

    <mat-navigation-drawer
      v-model="page"
      v-model:expanded="drawerOpen"
      :width="280"
      bordered
      aria-label="子菜单"
    >
      <template #header>
        <p class="layouts-rail-drawer-example__subtitle">
          {{ sectionMeta.label }}
        </p>
      </template>
      <mat-navigation-rail-item
        v-for="item in sectionMeta.pages"
        :key="item.id"
        :value="item.id"
        :icon="item.icon"
      >
        {{ item.label }}
      </mat-navigation-rail-item>
    </mat-navigation-drawer>

    <mat-app-bar app>
      {{ sectionMeta.label }} · {{ pageTitle }}
    </mat-app-bar>

    <mat-scroll-area>
      <mat-container>
        <section class="layouts-rail-drawer-example__content">
          <h3>{{ pageTitle }}</h3>
          <p>导航栏常驻起始侧承载一级目的地，抽屉作为它的子菜单紧随其后展开；收起抽屉后正文与顶栏自动回流，导航栏保持固定。</p>
          <article
            v-for="index in 4"
            :key="index"
            class="layouts-rail-drawer-example__card"
          >
            <h4>{{ pageTitle }} · 条目 {{ index }}</h4>
            <p>占位内容，用于演示抽屉开合时的正文回流。</p>
          </article>
        </section>
      </mat-container>
    </mat-scroll-area>
  </mat-app-root>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.layouts-rail-drawer-example {
  position: relative;
  block-size: 100%;
  overflow: hidden;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
}

.layouts-rail-drawer-example__subtitle {
  margin: 0;
  padding: 12px 16px 4px;
  color: var(--mat-sys-color-on-surface-variant);
  font-size: 13px;
  font-weight: 600;
}

.layouts-rail-drawer-example__content h3 {
  margin: 0 0 8px;
}

.layouts-rail-drawer-example__content p {
  margin: 0 0 16px;
}

.layouts-rail-drawer-example__card {
  margin-block: 12px;
  padding: 12px 16px;
  background: var(--mat-sys-color-surface-container);
  border-radius: var(--mat-sys-shape-corner-medium);
}

.layouts-rail-drawer-example__card h4 {
  margin: 0 0 8px;
}

.layouts-rail-drawer-example__card p {
  margin: 0;
}
</style>
<!-- #endregion style -->
