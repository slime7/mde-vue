<!-- #region script -->
<script setup>
import { ref } from 'vue';

const expanded = ref(true);
const position = ref('start');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="navigation-rail-position-example-shell">
    <div class="navigation-rail-position-example-controls">
      <button
        type="button"
        @click="expanded = !expanded"
      >
        {{ expanded ? '收回导航' : '展开导航' }}
      </button>

      <button
        type="button"
        @click="position = position === 'start' ? 'end' : 'start'"
      >
        对齐到{{ position === 'start' ? '末尾侧' : '起始侧' }}
      </button>
    </div>

    <div class="navigation-rail-position-example-layout">
      <mat-navigation-rail
        v-model:expanded="expanded"
        :position="position"
        aria-label="固定侧导航"
      >
        <mat-navigation-rail-item icon="home">
          首页
        </mat-navigation-rail-item>
        <mat-navigation-rail-item icon="folder">
          项目
        </mat-navigation-rail-item>
      </mat-navigation-rail>

      <div class="navigation-rail-position-example-content">
        Item 会保持在{{ position === 'start' ? '起始' : '末尾' }}侧。
      </div>
    </div>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-rail-position-example-shell {
  display: flex;
  inline-size: 100%;
  flex-direction: column;
  gap: 12px;
}

.navigation-rail-position-example-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.navigation-rail-position-example-controls button {
  min-block-size: 40px;
  padding-inline: 12px;
  color: var(--mat-sys-color-primary);
  background: var(--mat-sys-color-secondary-container);
  border: 0;
  border-radius: var(--mat-sys-shape-corner-full);
}

.navigation-rail-position-example-layout {
  display: flex;
  inline-size: 100%;
  min-block-size: 240px;
  overflow: hidden;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
}

.navigation-rail-position-example-content {
  display: grid;
  flex: 1 1 auto;
  min-inline-size: 0;
  place-items: center;
  color: var(--mat-sys-color-on-surface-variant);
  background: var(--mat-sys-color-surface-container-low);
}
</style>
<!-- #endregion style -->
