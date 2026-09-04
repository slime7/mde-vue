<script setup>
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue';
import { useData, useRoute } from 'vitepress';
import VPContent from 'vitepress/dist/client/theme-default/components/VPContent.vue';
import { usePrevNext } from 'vitepress/dist/client/theme-default/composables/prev-next.js';
import { useMatTheme } from 'mde-vue';

const { site, theme, page, frontmatter } = useData();
const route = useRoute();
const matTheme = useMatTheme();
const control = usePrevNext();

const isWideScreen = ref(true);
const isDrawerOpen = ref(false);
const isPcDrawerOpen = ref(true);

/** @type {MediaQueryList | null} */
let mediaQuery = null;

function handleMediaChange(event) {
  isWideScreen.value = event.matches;
  if (event.matches) {
    isDrawerOpen.value = false;
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    mediaQuery = window.matchMedia('(min-width: 960px)');
    isWideScreen.value = mediaQuery.matches;
    mediaQuery.addEventListener('change', handleMediaChange);
  }
});

onUnmounted(() => {
  if (mediaQuery) {
    mediaQuery.removeEventListener('change', handleMediaChange);
  }
});

function normalizeNavPath(path) {
  if (!path) {
    return '';
  }
  return path
    .replace(/\.html$/, '')
    .replace(/\.md$/, '')
    .replace(/\/$/, '') || '/';
}

const activeNavValue = computed(() => normalizeNavPath(route.path));

watch(() => route.path, () => {
  if (!isWideScreen.value) {
    isDrawerOpen.value = false;
  }
});

const drawerExpanded = computed({
  get() {
    return isWideScreen.value ? isPcDrawerOpen.value : isDrawerOpen.value;
  },
  set(val) {
    if (isWideScreen.value) {
      isPcDrawerOpen.value = val;
    } else {
      isDrawerOpen.value = val;
    }
  },
});

const drawerLayout = computed(() => (isWideScreen.value ? 'standard' : 'modal'));

function toggleDrawer() {
  drawerExpanded.value = !drawerExpanded.value;
}

function handleNavItemClick() {
  if (!isWideScreen.value) {
    isDrawerOpen.value = false;
  }
}

const themeModeIcon = computed(() => {
  const mode = matTheme.mode.value;
  if (mode === 'light') {
    return 'light_mode';
  }
  if (mode === 'dark') {
    return 'dark_mode';
  }
  return 'brightness_auto';
});

const themeModeLabel = computed(() => {
  const mode = matTheme.mode.value;
  if (mode === 'light') {
    return '当前亮色模式（点击切换）';
  }
  if (mode === 'dark') {
    return '当前暗色模式（点击切换）';
  }
  return '当前跟随系统（点击切换）';
});

function cycleThemeMode() {
  const current = matTheme.mode.value;
  if (current === 'light') {
    matTheme.setMode('dark');
  } else if (current === 'dark') {
    matTheme.setMode('system');
  } else {
    matTheme.setMode('light');
  }
}

const sidebarGroups = computed(() => theme.value.sidebar || []);
const topNavLinks = computed(() => {
  const nav = theme.value.nav || [];
  return nav.filter((item) => normalizeNavPath(item.link) !== '/guide/theme');
});

const expandedGroups = ref({});

function isGroupExpanded(groupKey, groupItems) {
  if (expandedGroups.value[groupKey] !== undefined) {
    return expandedGroups.value[groupKey];
  }
  if (groupItems && groupItems.length) {
    const current = activeNavValue.value;
    const containsActive = groupItems.some((sub) => normalizeNavPath(sub.link) === current);
    if (containsActive) {
      return true;
    }
  }
  return true;
}

function toggleGroup(groupKey) {
  const current = expandedGroups.value[groupKey] ?? true;
  expandedGroups.value[groupKey] = !current;
}

watch(activeNavValue, (current) => {
  sidebarGroups.value.forEach((section, sIndex) => {
    section.items?.forEach((item, iIndex) => {
      if (item.items?.length) {
        const contains = item.items.some((sub) => normalizeNavPath(sub.link) === current);
        if (contains) {
          expandedGroups.value[`${sIndex}-${iIndex}`] = true;
        }
      }
    });
  });
}, { immediate: true });

function normalizeLink(link) {
  if (!link) {
    return '#';
  }
  const base = site.value.base || '/';
  if (link.startsWith('http://') || link.startsWith('https://')) {
    return link;
  }
  return (base + link.replace(/^\//, '')).replace(/\/+/g, '/');
}

const pageTitle = computed(() => page.value.title || frontmatter.value.title || '');
</script>

<template>
  <mat-app-root
    class="mde-docs-root"
    :fill-viewport="true"
  >
    <mat-app-bar
      app
      variant="small"
    >
      <template #leading>
        <mat-btn
          variant="standard"
          icon="menu"
          label="切换侧栏"
          @click="toggleDrawer"
        />
      </template>

      <div class="mde-docs-app-bar-brand-title">
        <a :href="normalizeLink('/')" class="mde-docs-brand">
          <mat-icon icon="interests" class="mde-docs-brand__icon" aria-hidden="true" />
          <span class="mde-docs-brand__title">mde-vue</span>
        </a>

        <span
          v-if="pageTitle && frontmatter.layout !== 'home'"
          class="mde-docs-page-title"
        >
          {{ pageTitle }}
        </span>
      </div>

      <template #trailing>
        <div v-if="isWideScreen" class="mde-docs-top-nav">
          <mat-btn
            v-for="(navItem, idx) in topNavLinks"
            :key="idx"
            variant="standard"
            :href="normalizeLink(navItem.link)"
          >
            {{ navItem.text }}
          </mat-btn>
        </div>

        <mat-btn
          variant="standard"
          :icon="themeModeIcon"
          :label="themeModeLabel"
          @click="cycleThemeMode"
        />

        <mat-btn
          variant="standard"
          icon="code"
          label="GitHub 仓库"
          href="https://github.com/slime7/mde-vue"
          target="_blank"
          rel="noopener noreferrer"
        />
      </template>
    </mat-app-bar>

    <mat-navigation-drawer
      v-model:expanded="drawerExpanded"
      :model-value="activeNavValue"
      app
      :layout="drawerLayout"
      :width="280"
    >
      <div class="mde-docs-drawer-nav">
        <template v-for="(section, sIndex) in sidebarGroups" :key="sIndex">
          <div class="mde-docs-section-title">
            {{ section.text }}
          </div>

          <template v-for="(item, iIndex) in section.items" :key="iIndex">
            <mat-navigation-group
              v-if="item.items && item.items.length"
              :model-value="isGroupExpanded(`${sIndex}-${iIndex}`, item.items)"
              :indent="16"
              @update:model-value="toggleGroup(`${sIndex}-${iIndex}`)"
            >
              <template #activator="{ expanded, toggle }">
                <mat-navigation-rail-item
                  icon="folder"
                  @click="toggle"
                >
                  {{ item.text }}
                  <template #trailing>
                    <mat-icon
                      :icon="expanded ? 'expand_less' : 'expand_more'"
                      aria-hidden="true"
                    />
                  </template>
                </mat-navigation-rail-item>
              </template>

              <mat-navigation-rail-item
                v-for="(subItem, subIndex) in item.items"
                :key="subIndex"
                :href="normalizeLink(subItem.link)"
                :value="normalizeNavPath(subItem.link)"
                @click="handleNavItemClick"
              >
                {{ subItem.text }}
              </mat-navigation-rail-item>
            </mat-navigation-group>

            <mat-navigation-rail-item
              v-else
              :href="normalizeLink(item.link)"
              :value="normalizeNavPath(item.link)"
              @click="handleNavItemClick"
            >
              {{ item.text }}
            </mat-navigation-rail-item>
          </template>
        </template>
      </div>
    </mat-navigation-drawer>

    <div class="mde-docs-content-wrapper">
      <VPContent>
        <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
          <slot :name="slotName" v-bind="slotProps" />
        </template>

        <template #doc-footer-before>
          <nav
            v-if="control.prev?.link || control.next?.link"
            class="mde-docs-pager"
            aria-label="页脚上下页导航"
          >
            <mat-card
              v-if="control.prev?.link"
              class="mde-docs-pager-card mde-docs-pager-card--prev"
              variant="outlined"
            >
              <mat-card-action-area
                class="mde-docs-pager-action-area"
                :href="normalizeLink(control.prev.link)"
              >
                <mat-card-content class="mde-docs-pager-content">
                  <div class="mde-docs-pager-direction">
                    <mat-icon icon="arrow_back" class="mde-docs-pager-arrow" aria-hidden="true" />
                    <span>{{ theme.docFooter?.prev || '上一页' }}</span>
                  </div>
                  <div class="mde-docs-pager-title" v-html="control.prev.text" />
                </mat-card-content>
              </mat-card-action-area>
            </mat-card>
            <div v-else class="mde-docs-pager-spacer" aria-hidden="true" />

            <mat-card
              v-if="control.next?.link"
              class="mde-docs-pager-card mde-docs-pager-card--next"
              variant="outlined"
            >
              <mat-card-action-area
                class="mde-docs-pager-action-area"
                :href="normalizeLink(control.next.link)"
              >
                <mat-card-content class="mde-docs-pager-content">
                  <div class="mde-docs-pager-direction">
                    <span>{{ theme.docFooter?.next || '下一页' }}</span>
                    <mat-icon icon="arrow_forward" class="mde-docs-pager-arrow" aria-hidden="true" />
                  </div>
                  <div class="mde-docs-pager-title" v-html="control.next.text" />
                </mat-card-content>
              </mat-card-action-area>
            </mat-card>
            <div v-else class="mde-docs-pager-spacer" aria-hidden="true" />
          </nav>
        </template>
      </VPContent>
    </div>
  </mat-app-root>
</template>

<style scoped>
@layer mde.components {
  .mde-docs-app-bar-brand-title {
    display: flex;
    align-items: center;
    gap: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .mde-docs-brand {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--mat-sys-color-on-surface);
    text-decoration: none;
    flex-shrink: 0;
  }

  .mde-docs-brand__icon {
    font-size: 24px;
    color: var(--mat-sys-color-primary);
  }

  .mde-docs-brand__title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--mat-sys-color-on-surface);
  }

  .mde-docs-page-title {
    font-family: var(--mat-ref-typeface-plain);
    font-size: 0.875rem;
    font-weight: 400;
    color: var(--mat-sys-color-on-surface-variant);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mde-docs-drawer-nav {
    display: flex;
    flex-direction: column;
    inline-size: 100%;
    gap: 2px;
    padding-block: 8px 16px;
  }

  .mde-docs-section-title {
    padding-inline: 16px;
    padding-block: 12px 6px;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--mat-sys-color-on-surface-variant);
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .mde-docs-top-nav {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-inline-end: 4px;
  }

  .mde-docs-content-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    inline-size: 100%;
    min-inline-size: 0;
  }

  .mde-docs-pager {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    margin-block-start: 32px;
  }

  @media (min-width: 640px) {
    .mde-docs-pager {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  .mde-docs-pager-card {
    display: flex;
    flex-direction: column;
    block-size: 100%;
    border-radius: var(--mat-sys-shape-corner-large);
    border-color: var(--mat-sys-color-outline-variant);
    transition: border-color var(--mat-sys-motion-spring-fast-effects);
  }

  .mde-docs-pager-card:hover {
    border-color: var(--mat-sys-color-primary);
  }

  .mde-docs-pager-action-area {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    inline-size: 100%;
    block-size: 100%;
    text-decoration: none;
  }

  .mde-docs-pager-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    inline-size: 100%;
  }

  .mde-docs-pager-card--next .mde-docs-pager-content {
    align-items: flex-end;
    text-align: end;
  }

  .mde-docs-pager-direction {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--mat-sys-color-on-surface-variant);
  }

  .mde-docs-pager-arrow {
    font-size: 1rem;
    color: var(--mat-sys-color-primary);
  }

  .mde-docs-pager-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--mat-sys-color-primary);
    line-height: 1.4;
  }

  .mde-docs-pager-spacer {
    display: none;
  }

  @media (min-width: 640px) {
    .mde-docs-pager-spacer {
      display: block;
    }
  }
}
</style>
