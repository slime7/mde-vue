<!-- #region script -->
<script setup>
import { ref } from 'vue';

const expanded = ref(true);
const selected = ref('inbox');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="navigation-rail-example-shell">
    <mat-navigation-rail
      v-model="selected"
      v-model:expanded="expanded"
      collapsible
      aria-label="带扩展内容的导航"
    >
      <template #default="{ expanded: currentExpanded }">
        <mat-btn
          variant="standard"
          :icon="currentExpanded ? 'menu_open' : 'menu'"
          :label="currentExpanded ? '收起导航' : '展开导航'"
          @click="expanded = !expanded"
        />
        <mat-fab
          :expanded="currentExpanded"
          size="small"
          icon="add"
          label="新建"
          aria-label="新建"
        >
          新建
        </mat-fab>
        <mat-navigation-rail-item value="inbox" icon="inbox">
          收件箱
        </mat-navigation-rail-item>
        <mat-navigation-rail-item value="starred" icon="star">
          收藏
        </mat-navigation-rail-item>

        <mat-divider />

        <mat-text
          as="h3"
          type="headline"
          size="small"
          class="navigation-rail-example-headline"
        >
          快捷操作
        </mat-text>

        <mat-btn icon="notifications" label="通知" />
        <mat-fab size="small" icon="edit" label="编辑" />
        <mat-spacer />
        <mat-text class="navigation-rail-example-note">
          这些自定义内容仅在纵向展开态显示，并随中间区域滚动。
        </mat-text>
        <mat-btn icon="help" label="帮助" />
      </template>
    </mat-navigation-rail>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-rail-example-shell {
  display: flex;
  inline-size: 100%;
  block-size: 440px;
  overflow: hidden;
}

.navigation-rail-example-headline,
.navigation-rail-example-note {
  padding-inline: 16px;
}

.navigation-rail-example-note {
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
