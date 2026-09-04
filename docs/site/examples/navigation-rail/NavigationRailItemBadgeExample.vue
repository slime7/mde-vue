<!-- #region script -->
<script setup>
import { ref } from 'vue';

const expanded = ref(false);
const selected = ref('inbox');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="navigation-rail-badge-example-shell">
    <mat-navigation-rail
      v-model="selected"
      v-model:expanded="expanded"
      collapsible
      aria-label="带通知徽标的导航"
    >
      <mat-navigation-rail-item
        value="inbox"
        icon="inbox"
        :badge="expanded ? undefined : { content: 3, color: 'error', location: 'top-end' }"
      >
        收件箱
        <mat-badge
          v-if="expanded"
          content="3"
          color="error"
          location="inline"
        />
      </mat-navigation-rail-item>
      <mat-navigation-rail-item
        value="notifications"
        icon="notifications"
        :badge="expanded ? undefined : { dot: true, color: 'tertiary', location: 'top-start' }"
      >
        通知
        <mat-badge
          v-if="expanded"
          dot
          color="tertiary"
          location="inline"
        />
      </mat-navigation-rail-item>
      <mat-navigation-rail-item
        value="updates"
        icon="update"
        :badge="expanded ? undefined : { content: 0, color: 'secondary', location: 'bottom-end' }"
      >
        更新
        <mat-badge
          v-if="expanded"
          content="0"
          color="secondary"
          location="inline"
        />
      </mat-navigation-rail-item>
    </mat-navigation-rail>

    <div class="navigation-rail-badge-example-content">
      <span>{{ expanded ? '展开态 Badge 显示在标签后' : '收缩态 Badge 附着图标' }}</span>
      <span>当前页面：{{ selected }}</span>
    </div>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-rail-badge-example-shell {
  display: flex;
  inline-size: 100%;
  min-block-size: 280px;
  overflow: hidden;
}

.navigation-rail-badge-example-content {
  display: grid;
  flex: 1 1 auto;
  min-inline-size: 0;
  place-content: center;
  gap: 8px;
  color: var(--mat-sys-color-on-surface-variant);
  text-align: center;
}
</style>
<!-- #endregion style -->
