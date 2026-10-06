<!-- #region script -->
<script setup>
import { defineComponent, h, ref } from 'vue';
import { useMatApp } from 'mde-vue';

// useMatApp() 必须在 AppRoot 的后代组件中调用；这层包装把浮动组占用转成正文的底部留白。
const FabInset = defineComponent({
  name: 'FabInset',
  setup(_, { slots }) {
    const { layout } = useMatApp();

    return () => h('div', {
      style: { paddingBlockEnd: `${layout.floating.height}px` },
    }, slots.default?.());
  },
});

const tab = ref('ledger');

const tabTitles = {
  ledger: '本月支出',
  stats: '支出构成',
  mine: '我的账户',
};

let nextId = 4;
const records = ref([
  { id: 1, name: '周三十味食堂', meta: '今天 12:24', amount: '-28.50' },
  { id: 2, name: '地铁通勤', meta: '今天 08:41', amount: '-4.00' },
  { id: 3, name: '便利店早餐', meta: '昨天 07:55', amount: '-9.90' },
]);

const snackOpen = ref(false);

function addRecord() {
  records.value.unshift({
    id: nextId,
    name: '手冲咖啡',
    meta: '刚刚',
    amount: '-18.00',
  });
  nextId += 1;
  snackOpen.value = true;
}
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-app-root
    :fill-viewport="false"
    scrollable
    class="layouts-mobile-home-example"
  >
    <mat-app-bar app>
      <template #leading>
        <mat-btn
          variant="standard"
          size="small"
          icon="menu"
          label="打开菜单"
        />
      </template>
      {{ tabTitles[tab] }}
      <template #trailing>
        <mat-btn
          variant="standard"
          size="small"
          icon="search"
          label="搜索记录"
        />
      </template>
    </mat-app-bar>

    <mat-scroll-area>
      <mat-container>
        <FabInset>
          <mat-list
            v-if="tab === 'ledger'"
            aria-label="支出明细"
          >
            <mat-list-item
              v-for="record in records"
              :key="record.id"
            >
              {{ record.name }}
              <template #supporting>
                {{ record.meta }}
              </template>
              <template #trailing>
                <span class="layouts-mobile-home-example__amount">{{ record.amount }}</span>
              </template>
            </mat-list-item>
          </mat-list>

          <section
            v-else
            class="layouts-mobile-home-example__panel"
          >
            <p>{{ tabTitles[tab] }}是占位内容，切换底部导航即可更新正文。</p>
          </section>
        </FabInset>
      </mat-container>
    </mat-scroll-area>

    <mat-fab
      app
      icon="add"
      label="记一笔"
      position="end"
      @click="addRecord"
    />

    <mat-navigation-bar
      v-model="tab"
      app
      aria-label="底部导航"
    >
      <mat-navigation-bar-item
        value="ledger"
        icon="receipt_long"
      >
        明细
      </mat-navigation-bar-item>
      <mat-navigation-bar-item
        value="stats"
        icon="donut_small"
      >
        构成
      </mat-navigation-bar-item>
      <mat-navigation-bar-item
        value="mine"
        icon="person"
      >
        我的
      </mat-navigation-bar-item>
    </mat-navigation-bar>

    <mat-snackbar
      v-model="snackOpen"
      text="已记一笔：手冲咖啡"
    />
  </mat-app-root>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.layouts-mobile-home-example {
  position: relative;
  block-size: 100%;
  overflow: hidden;
  max-inline-size: 400px;
  margin-inline: auto;
  background: var(--mat-sys-color-surface);
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
}

/* FAB 悬浮于正文之上且不进入 padding；正文通过 layout.floating.height 取得浮动组占用并转为底部留白。 */
.layouts-mobile-home-example__amount {
  color: var(--mat-sys-color-on-surface-variant);
  font-variant-numeric: tabular-nums;
}

.layouts-mobile-home-example__panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 16px;
  color: var(--mat-sys-color-on-surface-variant);
  background: var(--mat-sys-color-surface-container);
  border-radius: var(--mat-sys-shape-corner-medium);
}

.layouts-mobile-home-example__panel p {
  margin: 0;
  text-align: center;
}
</style>
<!-- #endregion style -->
