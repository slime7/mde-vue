<!-- #region script -->
<script setup>
import { ref } from 'vue';

const active = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <section
    id="navigation-rail-placeholder-example"
    class="navigation-rail-placeholder-example"
  >
    <mat-btn variant="outlined" @click="active = !active">
      {{ active ? '隐藏应用导航' : '显示应用导航' }}
    </mat-btn>
    <mat-navigation-rail
      v-if="active"
      app
      attach="#navigation-rail-placeholder-example"
      placeholder
      aria-label="占位导航"
    >
      <mat-navigation-rail-item icon="home">
        首页
      </mat-navigation-rail-item>
      <mat-navigation-rail-item icon="folder">
        项目
      </mat-navigation-rail-item>
    </mat-navigation-rail>
    <p>占位保留固定 rail 的宽度，正文不会从其声明位置穿过。</p>
  </section>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-rail-placeholder-example {
  display: flex;
  gap: 16px;
  min-block-size: 180px;
}

.navigation-rail-placeholder-example p {
  align-self: center;
  margin: 0;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
