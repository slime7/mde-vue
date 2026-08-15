<!-- #region script -->
<script setup>
import { ref } from 'vue';

const active = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <section
    id="navigation-rail-bottom-placeholder-example"
    class="navigation-rail-bottom-placeholder-example"
  >
    <mat-switch v-model="active">
      {{ active ? '隐藏应用导航' : '显示应用导航' }}
    </mat-switch>
    <mat-navigation-rail
      v-if="active"
      app
      attach="#navigation-rail-bottom-placeholder-example"
      bottom-placeholder="env(safe-area-inset-bottom)"
      aria-label="底部安全区导航"
    >
      <mat-navigation-rail-item icon="home">
        首页
      </mat-navigation-rail-item>
      <template #end>
        <mat-btn icon="settings" label="设置" />
      </template>
    </mat-navigation-rail>
    <p>纵向 rail 的 end 内容会在底部安全区上方保持可访问。</p>
  </section>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-rail-bottom-placeholder-example {
  min-block-size: 160px;
}

.navigation-rail-bottom-placeholder-example p {
  margin-block: 12px 0;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
